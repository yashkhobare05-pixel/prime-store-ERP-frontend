import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { toast } from 'react-toastify';

const fetchActivityLogs = async () => {
  const res = await API.get('/activity-logs');
  return res.data.logs || [];
};

const ActivityLogsPage = () => {
  const { data: logs = [] } = useQuery({
    queryKey: ['activity-logs'],
    queryFn: fetchActivityLogs,
    onError: () => toast.error('Failed to load activity logs.')
  });

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">System Audit Logs & Activity Trails</h3>
          <p className="text-secondary small font-mono">Immutable audit logging for security compliance and operations tracking (TanStack Query)</p>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-secondary font-mono small border-secondary">
                <th>USER</th>
                <th>ROLE</th>
                <th>ACTION</th>
                <th>MODULE</th>
                <th>DETAILS</th>
                <th>IP ADDRESS</th>
                <th>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-secondary">
                  <td className="fw-bold text-light">{log.userName}</td>
                  <td><span className="badge bg-secondary font-mono" style={{ fontSize: '0.7rem' }}>{log.userRole}</span></td>
                  <td className="text-info fw-semibold">{log.action}</td>
                  <td className="small text-secondary">{log.module}</td>
                  <td className="small">{log.details}</td>
                  <td className="font-mono small text-secondary">{log.ipAddress}</td>
                  <td className="font-mono small text-secondary">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsPage;
