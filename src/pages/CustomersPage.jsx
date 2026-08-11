import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Award, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

const fetchCustomers = async () => {
  const res = await API.get('/customers');
  return res.data.customers || [];
};

const CustomersPage = () => {
  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    onError: () => toast.error('Failed to load customers.')
  });

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Customer Accounts & Loyalty Tiers</h3>
          <p className="text-secondary small font-mono">Buying behavior, total order history, and VIP tier badges (TanStack Query)</p>
        </div>
      </div>

      <div className="row g-4">
        {customers.map((c) => (
          <div key={c._id} className="col-md-6 col-lg-4">
            <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-warning text-dark font-mono"><Award size={12} /> {c.tier} Tier</span>
                  <span className="text-info font-mono small">{c.loyaltyPoints} PTS</span>
                </div>
                <h5 className="fw-bold text-light mb-1">{c.name}</h5>
                <div className="text-secondary small mb-3"><Mail size={14} /> {c.email}</div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex justify-content-between align-items-center">
                <span className="text-secondary small">Total Lifetime Spent:</span>
                <span className="font-mono fw-bold text-success fs-5">${c.totalSpent.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
