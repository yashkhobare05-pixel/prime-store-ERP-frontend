import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Mail, KeyRound, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/forgot-password', { email });
      if (res.data.success) {
        toast.info(`OTP generated: ${res.data.otp}`);
        setOtpSent(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/reset-password', { email, otp, newPassword });
      if (res.data.success) {
        toast.success('Password reset successfully. You can now login.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark p-3">
      <div className="glass-card p-5 rounded-4 shadow-2xl border-secondary w-100" style={{ maxWidth: '440px' }}>
        
        <div className="text-center mb-4">
          <h4 className="fw-extrabold text-light mb-1">Password Recovery</h4>
          <p className="text-secondary small">Verify OTP to reset your account password</p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
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
            <button type="submit" className="btn btn-primary-gradient w-100 py-2.5 rounded-3 fw-bold mt-3" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send Security OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">Enter 6-Digit OTP</label>
              <div className="position-relative">
                <KeyRound size={18} className="position-absolute top-50 translate-middle-y ms-3 text-secondary" />
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary ps-5 rounded-3 font-mono"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">New Password</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary rounded-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary-gradient w-100 py-2.5 rounded-3 fw-bold mt-3" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <Link to="/login" className="text-secondary small text-decoration-none">Back to Sign In</Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
