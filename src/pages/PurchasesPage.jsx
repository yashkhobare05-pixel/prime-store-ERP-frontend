import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const fetchPurchases = async () => {
  const res = await API.get('/purchases');
  return res.data.purchases || [];
};

const PurchasesPage = () => {
  const queryClient = useQueryClient();

  const { data: purchases = [], isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: fetchPurchases,
    onError: () => toast.error('Failed to load purchase orders.')
  });

  const updateStatusMutation = useMutation({
    mutationFn: (id) => API.put(`/purchases/${id}/status`, { status: 'Completed' }),
    onSuccess: () => {
      toast.success('PO Completed and stock updated automatically!');
      queryClient.invalidateQueries(['purchases']);
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['dashboard-data']);
    },
    onError: () => toast.error('Status update failed.')
  });

  const handleMarkCompleted = (id) => {
    updateStatusMutation.mutate(id);
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Purchase Orders (PO)</h3>
          <p className="text-secondary small font-mono">Inbound replenishment tracking & automated stock updates (TanStack Query)</p>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-secondary font-mono small border-secondary">
                <th>PO NUMBER</th>
                <th>SUPPLIER</th>
                <th>TOTAL COST</th>
                <th>STATUS</th>
                <th>EXPECTED DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((po) => (
                <tr key={po._id} className="border-secondary">
                  <td className="font-mono text-info fw-bold">{po.poNumber}</td>
                  <td className="fw-semibold text-light">{po.supplier?.name || 'Nexus Silicon Supplies'}</td>
                  <td className="font-mono text-warning fw-bold">${po.totalAmount}</td>
                  <td>
                    <span className={`badge ${po.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="font-mono small text-secondary">
                    {po.expectedDeliveryDate ? new Date(po.expectedDeliveryDate).toLocaleDateString() : 'In 3 Days'}
                  </td>
                  <td>
                    {po.status !== 'Completed' && (
                      <button 
                        className="btn btn-sm btn-outline-success" 
                        onClick={() => handleMarkCompleted(po._id)}
                        disabled={updateStatusMutation.isPending}
                      >
                        <CheckCircle size={14} /> Receive & Stock In
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchasesPage;
