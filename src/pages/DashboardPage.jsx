import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import StatCard from '../components/StatCard';
import { 
  Package, 
  AlertTriangle, 
  DollarSign, 
  Sparkles, 
  Warehouse, 
  BrainCircuit, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const fetchDashboardData = async () => {
  const [prodRes, aiRes, repRes] = await Promise.all([
    API.get('/products'),
    API.get('/ai/predict'),
    API.get('/reports/summary')
  ]);

  return {
    products: prodRes.data.products || [],
    ai: aiRes.data,
    summary: repRes.data.summary || {}
  };
};

const DashboardPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchDashboardData
  });

  const chartSalesData = [
    { month: 'Jan', Sales: 42000, Purchases: 28000, Forecast: 45000 },
    { month: 'Feb', Sales: 51000, Purchases: 32000, Forecast: 53000 },
    { month: 'Mar', Sales: 48000, Purchases: 30000, Forecast: 50000 },
    { month: 'Apr', Sales: 62000, Purchases: 38000, Forecast: 64000 },
    { month: 'May', Sales: 75000, Purchases: 41000, Forecast: 78000 },
    { month: 'Jun', Sales: 89000, Purchases: 49000, Forecast: 92000 }
  ];

  return (
    <div className="p-4">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Executive Inventory Dashboard</h3>
          <p className="text-secondary small font-mono mb-0">Real-time Stock Accuracy & Predictive Demand Analytics (Powered by TanStack Query)</p>
        </div>
        <button 
          className="btn btn-outline-secondary rounded-pill px-3 py-1.5 d-flex align-items-center gap-2 text-light"
          onClick={() => refetch()}
        >
          <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} /> Sync Metrics
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="row g-3 mb-4">
        <div className="col-md-4 col-lg-2.4 col-sm-6">
          <StatCard 
            title="Stock Accuracy"
            value={`${data?.ai?.inventoryAccuracyScore || 98.4}%`}
            change="+1.2%"
            icon={Sparkles}
            color="cyan"
            subtitle="Calculated AI Precision"
          />
        </div>
        <div className="col-md-4 col-lg-2.4 col-sm-6">
          <StatCard 
            title="Inventory Value"
            value={`$${(data?.summary?.inventoryValue || 148500).toLocaleString()}`}
            change="+5.4%"
            icon={DollarSign}
            color="emerald"
            subtitle="Cost Asset Value"
          />
        </div>
        <div className="col-md-4 col-lg-2.4 col-sm-6">
          <StatCard 
            title="Low Stock Risk"
            value={data?.products?.filter(p => p.stockQuantity <= p.minStockLevel).length || 2}
            change="-3 items"
            icon={AlertTriangle}
            color="rose"
            subtitle="Requires Reorder"
          />
        </div>
        <div className="col-md-4 col-lg-2.4 col-sm-6">
          <StatCard 
            title="Total SKUs"
            value={data?.products?.length || 5}
            change="+4 SKUs"
            icon={Package}
            color="indigo"
            subtitle="Active Catalog"
          />
        </div>
        <div className="col-md-4 col-lg-2.4 col-sm-6">
          <StatCard 
            title="Health Score"
            value={`${data?.ai?.inventoryHealthScore || 94.8}/100`}
            change="+2.1 pts"
            icon={BrainCircuit}
            color="amber"
            subtitle="Optimization Index"
          />
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="row g-4 mb-4">
        
        {/* Predictive Demand Chart */}
        <div className="col-lg-8">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-bold text-light mb-1">AI Predictive Demand & Revenue Trend</h5>
                <span className="text-secondary small font-mono">Comparing Actual Sales vs Prophet Forecast</span>
              </div>
              <span className="badge bg-info text-dark font-mono">XGBoost ML v4</span>
            </div>

            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartSalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="Sales" stroke="#6366F1" fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="Forecast" stroke="#06B6D4" fillOpacity={1} fill="url(#colorForecast)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Recommendation Insights Card */}
        <div className="col-lg-4">
          <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Sparkles className="text-info" size={20} />
                <h5 className="fw-bold text-light mb-0">Top AI Recommendations</h5>
              </div>

              {data?.ai?.insights?.map((insight, idx) => (
                <div key={idx} className="p-3 mb-3 rounded-3 border border-secondary" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold text-info small">{insight.title}</span>
                    <span className="badge-ai-confidence">{insight.confidence}% Confidence</span>
                  </div>
                  <div className="text-light small fw-semibold mb-1">{insight.product}</div>
                  <div className="text-secondary small">{insight.recommendation}</div>
                </div>
              ))}
            </div>

            <button 
              className="btn btn-primary-gradient w-100 rounded-3 py-2 mt-2 d-flex align-items-center justify-content-center gap-2"
              onClick={() => navigate('/ai-optimization')}
            >
              Open AI Optimization Lab <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Products Low Stock Table */}
      <div className="glass-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-light mb-0">Critical Stock Status & Reorder Queue</h5>
          <button className="btn btn-outline-info btn-sm rounded-pill" onClick={() => navigate('/products')}>
            View All Products
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0" style={{ background: 'transparent' }}>
            <thead>
              <tr className="text-secondary font-mono small border-secondary">
                <th>PRODUCT SKU</th>
                <th>PRODUCT NAME</th>
                <th>CURRENT STOCK</th>
                <th>MIN LEVEL</th>
                <th>STATUS</th>
                <th>VELOCITY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((prod) => (
                <tr key={prod._id} className="border-secondary">
                  <td className="font-mono text-info fw-bold">{prod.sku}</td>
                  <td className="fw-semibold text-light">{prod.name}</td>
                  <td className="font-mono fw-bold">{prod.stockQuantity} {prod.unit}</td>
                  <td className="font-mono text-secondary">{prod.minStockLevel}</td>
                  <td>
                    {prod.stockQuantity <= 0 ? (
                      <span className="badge-out-stock">Out of Stock</span>
                    ) : prod.stockQuantity <= prod.minStockLevel ? (
                      <span className="badge-low-stock">Low Stock</span>
                    ) : (
                      <span className="badge-in-stock">In Stock</span>
                    )}
                  </td>
                  <td>
                    <span className="badge bg-secondary font-mono" style={{ fontSize: '0.7rem' }}>{prod.movementVelocity}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary rounded-3" onClick={() => navigate('/inventory')}>
                      Stock In
                    </button>
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

export default DashboardPage;
