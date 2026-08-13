import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { User, Lock, Moon, Sun, Shield } from 'lucide-react';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const { user, theme, toggleTheme } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put('/auth/change-password', { currentPassword, newPassword });
      if (res.data.success) {
        toast.success('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed.');
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">User Settings & Preferences</h3>
          <p className="text-secondary small font-mono">Profile management, security passwords, and UI theme toggles</p>
        </div>
      </div>

      <div className="row g-4">
        
        {/* Profile Card */}
        <div className="col-md-6">
          <div className="glass-card p-4">
            <h5 className="fw-bold text-light mb-3">User Profile Info</h5>
            <div className="d-flex align-items-center gap-3 mb-4">
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'} 
                alt="Avatar" 
                className="rounded-circle"
                style={{ width: '64px', height: '64px', objectFit: 'cover' }}
              />
              <div>
                <h5 className="fw-bold text-light mb-0">{user?.name}</h5>
                <div className="text-secondary font-mono small">{user?.email}</div>
                <span className="badge bg-primary mt-1 font-mono">{user?.role}</span>
              </div>
            </div>

            <div className="border-top border-secondary pt-3">
              <div className="d-flex justify-content-between align-items-center">
                <span>Interface Theme</span>
                <button className="btn btn-outline-secondary rounded-pill px-3 d-flex align-items-center gap-2" onClick={toggleTheme}>
                  {theme === 'dark' ? <><Sun size={16} className="text-warning" /> Light Mode</> : <><Moon size={16} className="text-primary" /> Dark Mode</>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="col-md-6">
          <div className="glass-card p-4">
            <h5 className="fw-bold text-light mb-3">Change Security Password</h5>
            <form onSubmit={handleChangePassword}>
              <div className="mb-3">
                <label className="form-label small text-secondary">Current Password</label>
                <input 
                  type="password" 
                  className="form-control text-light border-secondary"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-secondary">New Password</label>
                <input 
                  type="password" 
                  className="form-control text-light border-secondary"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary-gradient w-100 mt-2">Update Password</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
