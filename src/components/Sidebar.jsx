import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Boxes,
  Package,
  Layers,
  Warehouse,
  Users,
  Building2,
  ShoppingCart,
  TrendingUp,
  BrainCircuit,
  FileText,
  PieChart,
  Bell,
  UserCheck,
  History,
  Settings,
  Sparkles
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Optimization', path: '/ai-optimization', icon: BrainCircuit, badge: 'AI' },
    { label: 'Products', path: '/products', icon: Package },
    { label: 'Inventory Operations', path: '/inventory', icon: Boxes },
    { label: 'Warehouses', path: '/warehouses', icon: Warehouse },
    { label: 'Suppliers', path: '/suppliers', icon: Building2 },
    { label: 'Customers', path: '/customers', icon: Users },
    { label: 'Purchases (PO)', path: '/purchases', icon: ShoppingCart },
    { label: 'Sales & Invoices', path: '/sales', icon: TrendingUp },
    { label: 'Analytics', path: '/analytics', icon: PieChart },
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Activity Logs', path: '/activity-logs', icon: History }
  ];

  if (user?.role === 'Admin') {
    navItems.push({ label: 'User Management', path: '/users', icon: UserCheck });
  }

  navItems.push({ label: 'Settings', path: '/settings', icon: Settings });

  return (
    <div 
      className="d-flex flex-column glass-nav p-3 border-end border-secondary"
      style={{ width: '260px', minHeight: '100vh', position: 'sticky', top: 0 }}
    >
      {/* Brand Header */}
      <div className="d-flex align-items-center gap-2 mb-4 px-2 pt-2">
        <div className="rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h6 className="fw-extrabold text-light mb-0 tracking-tight" style={{ fontSize: '1rem' }}>AI STOCK ACCURACY</h6>
          <span className="text-secondary font-mono" style={{ fontSize: '0.65rem' }}>Enterprise Edition v2.4</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="nav nav-pills flex-column gap-1 flex-grow-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center justify-content-between px-3 py-2 rounded-3 text-light transition-all ${
                  isActive ? 'bg-primary text-white fw-bold shadow-sm' : 'text-secondary opacity-75 hover-opacity-100'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' : 'transparent',
                fontSize: '0.88rem'
              })}
            >
              <div className="d-flex align-items-center gap-2">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="badge bg-info text-dark font-mono rounded-pill" style={{ fontSize: '0.65rem' }}>{item.badge}</span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* System Status Footer */}
      <div className="mt-4 p-3 rounded-3 border border-secondary bg-dark text-start" style={{ fontSize: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)' }}>
        <div className="d-flex align-items-center gap-2 mb-1">
          <span className="p-1 bg-success rounded-circle animate-ping"></span>
          <span className="fw-semibold text-light">AI Engine Active</span>
        </div>
        <div className="text-secondary font-mono">Model: XGBoost + Prophet v4</div>
      </div>

    </div>
  );
};

export default Sidebar;
