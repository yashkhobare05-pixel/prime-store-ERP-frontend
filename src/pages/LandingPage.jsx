import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  BrainCircuit, 
  TrendingUp, 
  Boxes, 
  ShieldCheck, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  BarChart3, 
  Clock, 
  Layers
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      
      {/* Landing Header / Navigation */}
      <nav className="navbar navbar-expand-lg glass-nav py-3 px-4 sticky-top">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>
              <Sparkles size={22} className="text-white" />
            </div>
            <span className="fw-extrabold text-light fs-5 tracking-tight">AI STOCK ACCURACY</span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-light rounded-pill px-4" onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button className="btn btn-primary-gradient rounded-pill px-4" onClick={() => navigate('/register')}>
              Get Started Free <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5 text-center position-relative overflow-hidden">
        <div className="container py-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4" style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <BrainCircuit size={16} className="text-info" />
              <span className="small font-mono text-info fw-bold">Next-Gen Predictive Stock Optimization</span>
            </div>

            <h1 className="display-4 fw-extrabold text-light mb-4">
              Eliminate Stockouts & Overstocking with <br />
              <span className="text-gradient">AI-Powered Demand Forecasting</span>
            </h1>

            <p className="lead text-secondary max-w-2xl mx-auto mb-5" style={{ maxWidth: '750px' }}>
              Maintain 99.4% stock accuracy, automate optimal reorder points, predict 30/90-day product demand, and streamline multi-warehouse operations with Scikit-learn & Prophet ML models.
            </p>

            <div className="d-flex justify-content-center gap-3 mb-5">
              <button className="btn btn-primary-gradient btn-lg rounded-pill px-5 d-flex align-items-center gap-2" onClick={() => navigate('/register')}>
                Launch Live System Demo <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline-secondary btn-lg rounded-pill px-4 text-light" onClick={() => navigate('/login')}>
                Admin Dashboard
              </button>
            </div>
          </motion.div>

          {/* Hero Mockup Preview */}
          <div className="glass-card p-2 rounded-4 mx-auto shadow-2xl border-secondary" style={{ maxWidth: '1000px' }}>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
              alt="Dashboard Preview" 
              className="img-fluid rounded-3 opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Key Metrics / Proof Stats */}
      <section className="py-5 bg-dark border-top border-bottom border-secondary">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <h2 className="display-5 fw-extrabold text-gradient-cyan font-mono">99.4%</h2>
              <div className="text-secondary small fw-semibold">Inventory Accuracy Score</div>
            </div>
            <div className="col-md-3">
              <h2 className="display-5 fw-extrabold text-gradient font-mono">-42%</h2>
              <div className="text-secondary small fw-semibold">Reduction in Holding Costs</div>
            </div>
            <div className="col-md-3">
              <h2 className="display-5 fw-extrabold text-gradient-gold font-mono">96%</h2>
              <div className="text-secondary small fw-semibold">AI Demand Prediction Confidence</div>
            </div>
            <div className="col-md-3">
              <h2 className="display-5 fw-extrabold text-gradient-cyan font-mono">&lt; 3 Days</h2>
              <div className="text-secondary small fw-semibold">Supplier Lead Time Optimization</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules & Features Grid */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-extrabold text-light mb-2">Industry-Grade Feature Stack</h2>
            <p className="text-secondary">Engineered for scalable enterprise logistics and modern supply chain operations</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <BrainCircuit size={32} className="text-info mb-3" />
                <h5 className="fw-bold text-light">Predictive Demand ML</h5>
                <p className="text-secondary small">Automatically forecasts 7-day, 30-day, and 90-day consumption velocity using historical sales trends.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <Boxes size={32} className="text-primary mb-3" />
                <h5 className="fw-bold text-light">Real-Time Stock Auditing</h5>
                <p className="text-secondary small">Instant Stock In, Stock Out, Warehouse Transfers, Batch/Expiry tracking, and Barcode/QR scanning.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <TrendingUp size={32} className="text-success mb-3" />
                <h5 className="fw-bold text-light">Reorder Point Automation</h5>
                <p className="text-secondary small">AI engine calculates optimal reorder dates and quantities based on supplier lead times and safety stock levels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-4 border-top border-secondary text-center text-secondary small">
        <div className="container">
          <p className="mb-0">© 2026 AI-Powered Stock Accuracy and Inventory Optimization System. Production-Ready Final Year Engineering Project.</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
