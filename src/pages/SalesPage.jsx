import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import { Plus, X } from 'lucide-react';
import { toast } from 'react-toastify';

const fetchSales = async () => (await API.get('/sales')).data.sales || [];
const fetchProducts = async () => (await API.get('/products')).data.products || [];
const fetchCustomers = async () => (await API.get('/customers')).data.customers || [];

const SalesPage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    customerId: '',
    productId: '',
    quantity: 1,
    paymentMethod: 'Credit Card'
  });

  // Queries
  const { data: sales = [], isLoading: loadingSales } = useQuery({ queryKey: ['sales'], queryFn: fetchSales });
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: customers = [] } = useQuery({ queryKey: ['customers'], queryFn: fetchCustomers });

  // Mutation
  const createSaleMutation = useMutation({
    mutationFn: (newSale) => API.post('/sales', newSale),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(`Sales invoice ${res.data.sale.invoiceNumber} created & inventory deducted!`);
        setShowModal(false);
        queryClient.invalidateQueries(['sales']);
        queryClient.invalidateQueries(['products']);
        queryClient.invalidateQueries(['dashboard-data']);
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to create sales order.');
    }
  });

  const handleCreateSale = (e) => {
    e.preventDefault();
    createSaleMutation.mutate({
      customer: formData.customerId || null,
      items: [{ productId: formData.productId, quantity: formData.quantity }],
      paymentMethod: formData.paymentMethod
    });
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Sales Orders & Digital Invoicing</h3>
          <p className="text-secondary small font-mono">Real-time revenue tracking & automated stock deduction (TanStack Query)</p>
        </div>

        <button className="btn btn-primary-gradient rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
          <Plus size={18} /> New Sales Order
        </button>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-secondary font-mono small border-secondary">
                <th>INVOICE NO</th>
                <th>CUSTOMER</th>
                <th>TOTAL AMOUNT</th>
                <th>PAYMENT</th>
                <th>STATUS</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s._id} className="border-secondary">
                  <td className="font-mono text-info fw-bold">{s.invoiceNumber}</td>
                  <td className="fw-semibold text-light">{s.customer?.name || 'Walk-in Customer'}</td>
                  <td className="font-mono text-success fw-bold">${s.totalAmount}</td>
                  <td><span className="badge bg-secondary font-mono">{s.paymentMethod}</span></td>
                  <td><span className="badge bg-success">{s.paymentStatus}</span></td>
                  <td className="font-mono small text-secondary">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border-secondary text-light p-4">
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title fw-bold text-gradient">Create Sales Invoice</h5>
                <button className="btn btn-link text-secondary p-0" onClick={() => setShowModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateSale}>
                <div className="mb-3">
                  <label className="form-label small text-secondary">Customer</label>
                  <select 
                    className="form-select bg-dark text-light border-secondary"
                    value={formData.customerId}
                    onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  >
                    <option value="">Walk-in / Direct Sale</option>
                    {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small text-secondary">Product Item</label>
                  <select 
                    className="form-select bg-dark text-light border-secondary"
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.name} (Available: {p.stockQuantity})</option>)}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small text-secondary">Quantity</label>
                  <input 
                    type="number" 
                    className="form-control bg-dark text-light border-secondary font-mono"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary-gradient px-4" disabled={createSaleMutation.isPending}>
                    {createSaleMutation.isPending ? 'Generating...' : 'Generate Sales Order'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SalesPage;
