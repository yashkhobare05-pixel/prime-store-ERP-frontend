import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import { toast } from 'react-toastify';

const fetchUsers = async () => {
  const res = await API.get('/users');
  return res.data.users || [];
};

const UserManagementPage = () => {
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    onError: () => toast.error('Failed to load user accounts.')
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => API.put(`/users/${id}/role`, { role }),
    onSuccess: () => {
      toast.success('User role updated!');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => toast.error('Failed to update role.')
  });

  const handleRoleChange = (id, role) => {
    updateRoleMutation.mutate({ id, role });
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Admin User Management</h3>
          <p className="text-secondary small font-mono">Role-Based Access Control (Admin, Manager, Employee permissions - TanStack Query)</p>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-secondary font-mono small border-secondary">
                <th>NAME</th>
                <th>EMAIL</th>
                <th>DEPARTMENT</th>
                <th>SYSTEM ROLE</th>
                <th>CHANGE ROLE</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-secondary">
                  <td className="fw-bold text-light">{u.name}</td>
                  <td className="font-mono text-secondary small">{u.email}</td>
                  <td className="small">{u.department}</td>
                  <td>
                    <span className={`badge ${u.role === 'Admin' ? 'bg-danger' : u.role === 'Manager' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary rounded-pill font-mono"
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
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

export default UserManagementPage;
