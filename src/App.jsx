import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import AiOptimizationPage from './pages/AiOptimizationPage';
import ProductsPage from './pages/ProductsPage';
import InventoryPage from './pages/InventoryPage';
import WarehousesPage from './pages/WarehousesPage';
import SuppliersPage from './pages/SuppliersPage';
import CustomersPage from './pages/CustomersPage';
import SalesPage from './pages/SalesPage';
import PurchasesPage from './pages/PurchasesPage';
import ReportsPage from './pages/ReportsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotificationsPage from './pages/NotificationsPage';
import UserManagementPage from './pages/UserManagementPage';
import ActivityLogsPage from './pages/ActivityLogsPage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      retry: 1
    }
  }
});

const ProtectedLayout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center text-light">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex min-vh-100 bg-dark text-light">
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <Navbar />
        <div className="flex-grow-1 overflow-auto p-2" style={{ backgroundColor: 'var(--bg-main)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <ToastContainer position="top-right" theme="dark" autoClose={3000} />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Protected Application Routes */}
              <Route path="/dashboard" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
              <Route path="/ai-optimization" element={<ProtectedLayout><AiOptimizationPage /></ProtectedLayout>} />
              <Route path="/products" element={<ProtectedLayout><ProductsPage /></ProtectedLayout>} />
              <Route path="/inventory" element={<ProtectedLayout><InventoryPage /></ProtectedLayout>} />
              <Route path="/warehouses" element={<ProtectedLayout><WarehousesPage /></ProtectedLayout>} />
              <Route path="/suppliers" element={<ProtectedLayout><SuppliersPage /></ProtectedLayout>} />
              <Route path="/customers" element={<ProtectedLayout><CustomersPage /></ProtectedLayout>} />
              <Route path="/sales" element={<ProtectedLayout><SalesPage /></ProtectedLayout>} />
              <Route path="/purchases" element={<ProtectedLayout><PurchasesPage /></ProtectedLayout>} />
              <Route path="/reports" element={<ProtectedLayout><ReportsPage /></ProtectedLayout>} />
              <Route path="/analytics" element={<ProtectedLayout><AnalyticsPage /></ProtectedLayout>} />
              <Route path="/notifications" element={<ProtectedLayout><NotificationsPage /></ProtectedLayout>} />
              <Route path="/users" element={<ProtectedLayout><UserManagementPage /></ProtectedLayout>} />
              <Route path="/activity-logs" element={<ProtectedLayout><ActivityLogsPage /></ProtectedLayout>} />
              <Route path="/settings" element={<ProtectedLayout><SettingsPage /></ProtectedLayout>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
