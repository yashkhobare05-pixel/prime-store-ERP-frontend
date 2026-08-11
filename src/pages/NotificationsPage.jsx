import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Bell } from 'lucide-react';
import { toast } from 'react-toastify';

const fetchNotifications = async () => {
  const res = await API.get('/notifications');
  return res.data.notifications || [];
};

const NotificationsPage = () => {
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    onError: () => toast.error('Failed to load notifications.')
  });

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Notification & Alert Center</h3>
          <p className="text-secondary small font-mono">Stockout warnings, expiry alerts, and real-time AI reorder notifications (TanStack Query)</p>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="d-flex flex-column gap-3">
          {notifications.map((n) => (
            <div key={n._id} className="p-3 rounded-3 border border-secondary bg-dark d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-2 bg-primary-subtle text-info">
                  <Bell size={20} />
                </div>
                <div>
                  <h6 className="fw-bold text-light mb-0">{n.title}</h6>
                  <div className="text-secondary small">{n.message}</div>
                </div>
              </div>
              <span className="badge bg-secondary font-mono" style={{ fontSize: '0.7rem' }}>
                {new Date(n.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
