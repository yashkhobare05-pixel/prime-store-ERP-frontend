import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Clock, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

const fetchSuppliers = async () => {
  const res = await API.get('/suppliers');
  return res.data.suppliers || [];
};

const SuppliersPage = () => {
  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers,
    onError: () => toast.error('Failed to load suppliers.')
  });

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Supplier Directory & Delivery Analytics</h3>
          <p className="text-secondary small font-mono">Performance ratings, lead time predictions, and payment terms (TanStack Query)</p>
        </div>
      </div>

      <div className="row g-4">
        {suppliers.map((sup) => (
          <div key={sup._id} className="col-md-6 col-lg-4">
            <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-info font-mono">{sup.paymentTerms}</span>
                  <span className="badge bg-success font-mono">{sup.deliveryPerformanceScore}% Reliability</span>
                </div>
                <h5 className="fw-bold text-light mb-1">{sup.name}</h5>
                <div className="text-secondary small mb-3">{sup.companyName}</div>

                <div className="d-flex align-items-center gap-2 mb-2 text-secondary small">
                  <Mail size={14} /> {sup.email}
                </div>
                <div className="d-flex align-items-center gap-2 mb-3 text-secondary small">
                  <Clock size={14} /> Lead Time: <strong className="text-info font-mono">{sup.leadTimeDays} Days</strong>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex justify-content-between align-items-center">
                <span className="text-warning fw-bold fs-5">{sup.rating} ★</span>
                <span className="text-secondary small">Preferred Vendor</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuppliersPage;
