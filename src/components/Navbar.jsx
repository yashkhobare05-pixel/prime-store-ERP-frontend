import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Mic, 
  Bell, 
  Sun, 
  Moon, 
  User as UserIcon, 
  LogOut, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice Search is not supported on this browser version. Try Chrome or Edge.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setSearchTerm(transcript);
      if (onSearch) onSearch(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg glass-nav sticky-top px-4 py-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* Global Search Bar */}
        <div className="d-flex align-items-center position-relative me-3" style={{ minWidth: '320px', maxWidth: '480px', flex: 1 }}>
          <Search className="position-absolute start-0 ms-3 text-secondary" size={18} />
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary ps-5 pe-5 rounded-pill shadow-none"
            placeholder="Global Search (Products, SKUs, Barcodes, Suppliers...)"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ fontSize: '0.9rem', height: '42px', backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
          />
          <button 
            type="button"
            className={`btn btn-link position-absolute end-0 me-2 p-1 ${isListening ? 'text-danger animate-pulse' : 'text-secondary'}`}
            onClick={handleVoiceSearch}
            title="Voice Search"
          >
            <Mic size={18} />
          </button>
        </div>

        {/* Action Controls */}
        <div className="d-flex align-items-center gap-3">
          
          {/* AI Accuracy Pill */}
          <div 
            className="d-none d-md-flex align-items-center gap-2 px-3 py-1 rounded-pill"
            style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
          >
            <Sparkles size={16} className="text-info" />
            <span className="small font-mono text-info fw-bold">Stock Accuracy: 98.4%</span>
          </div>

          {/* Theme Toggle Button */}
          <button 
            className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center"
            onClick={toggleTheme}
            style={{ width: '40px', height: '40px' }}
          >
            {theme === 'dark' ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-primary" />}
          </button>

          {/* Notifications Button */}
          <button 
            className="btn btn-outline-secondary rounded-circle p-2 position-relative d-flex align-items-center justify-content-center"
            onClick={() => navigate('/notifications')}
            style={{ width: '40px', height: '40px' }}
          >
            <Bell size={18} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="dropdown">
            <button 
              className="btn btn-dark d-flex align-items-center gap-2 border-secondary rounded-pill px-3 py-1"
              type="button" 
              data-bs-toggle="dropdown"
            >
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'} 
                alt="Avatar" 
                className="rounded-circle"
                style={{ width: '32px', height: '32px', objectFit: 'cover' }}
              />
              <div className="text-start d-none d-sm-block">
                <div className="fw-bold small text-light lead-none" style={{ lineHeight: '1' }}>{user?.name || 'Demo User'}</div>
                <div className="text-secondary small font-mono" style={{ fontSize: '0.7rem' }}>{user?.role || 'Admin'}</div>
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark glass-card p-2">
              <li>
                <button className="dropdown-item d-flex align-items-center gap-2 rounded text-light" onClick={() => navigate('/settings')}>
                  <UserIcon size={16} /> Profile & Settings
                </button>
              </li>
              {user?.role === 'Admin' && (
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2 rounded text-light" onClick={() => navigate('/users')}>
                    <ShieldCheck size={16} /> Admin User Management
                  </button>
                </li>
              )}
              <li><hr className="dropdown-divider border-secondary" /></li>
              <li>
                <button className="dropdown-item d-flex align-items-center gap-2 rounded text-danger" onClick={logout}>
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
