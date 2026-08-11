import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User as UserIcon, ArrowRight, Shield } from 'lucide-react';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
    department: 'Inventory Operations'
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      toast.success('Registration successful! Welcome to AI Inventory System.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark p-3">
      <div className="glass-card p-5 rounded-4 shadow-2xl border-secondary w-100" style={{ maxWidth: '480px' }}>
        
        <div className="text-center mb-4">
          <div className="d-inline-flex p-3 rounded-4 mb-3" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>
            <Sparkles size={28} className="text-white" />
          </div>
          <h4 className="fw-extrabold text-light mb-1">Create Account</h4>
          <p className="text-secondary small">Register for Role-Based Access Control</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Full Name</label>
            <div className="position-relative">
              <UserIcon size={18} className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary ps-5 rounded-3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Email Address</label>
            <div className="position-relative">
              <Mail size={18} className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary ps-5 rounded-3"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Password</label>
            <div className="position-relative">
              <Lock size={18} className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary ps-5 rounded-3"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Select System Role</label>
            <select 
              className="form-select bg-dark text-light border-secondary rounded-3"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Employee">Employee (Stock Operations)</option>
              <option value="Manager">Manager (Warehouse & Approvals)</option>
              <option value="Admin">Admin (Full System Controls)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary-gradient w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 mt-4"
            disabled={loading}
          >
            {loading ? 'Creating...' : <>Register <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="text-center mt-4 text-secondary small">
          Already registered? <Link to="/login" className="text-primary fw-bold text-decoration-none">Sign in here</Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
