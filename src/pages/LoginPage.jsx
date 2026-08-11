import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@inventory.ai');
  const [password, setPassword] = useState('adminpassword123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! Authentication successful.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark p-3">
      <div className="glass-card p-5 rounded-4 shadow-2xl border-secondary w-100" style={{ maxWidth: '440px' }}>
        
        <div className="text-center mb-4">
          <div className="d-inline-flex p-3 rounded-4 mb-3" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>
            <Sparkles size={28} className="text-white" />
          </div>
          <h4 className="fw-extrabold text-light mb-1">Sign In to AI Inventory</h4>
          <p className="text-secondary small">Access stock accuracy metrics & predictive demand models</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Email Address</label>
            <div className="position-relative">
              <Mail size={18} className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary ps-5 rounded-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label small fw-semibold text-secondary mb-0">Password</label>
              <Link to="/forgot-password" className="text-info small text-decoration-none">Forgot Password?</Link>
            </div>
            <div className="position-relative">
              <Lock size={18} className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary ps-5 rounded-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary-gradient w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 mt-4"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="mt-4 p-3 rounded-3 bg-dark border border-secondary text-start" style={{ fontSize: '0.75rem' }}>
          <div className="fw-bold text-info mb-1 d-flex align-items-center gap-1">
            <ShieldCheck size={14} /> Quick Demo Accounts:
          </div>
          <div className="text-secondary font-mono">Admin: admin@inventory.ai / adminpassword123</div>
          <div className="text-secondary font-mono">Manager: manager@inventory.ai / managerpassword123</div>
        </div>

        <div className="text-center mt-4 text-secondary small">
          Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register here</Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
