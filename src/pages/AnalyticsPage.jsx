import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';

const AnalyticsPage = () => {
  const categoryData = [
    { name: 'Electronics', value: 45 },
    { name: 'Peripherals', value: 30 },
    { name: 'Networking', value: 25 }
  ];
  const COLORS = ['#6366F1', '#06B6D4', '#10B981'];

  const radarData = [
    { subject: 'Stock Accuracy', A: 98, fullMark: 100 },
    { subject: 'Lead Time Speed', A: 92, fullMark: 100 },
    { subject: 'Order Fulfillment', A: 96, fullMark: 100 },
    { subject: 'Supplier Quality', A: 95, fullMark: 100 },
    { subject: 'Health Score', A: 94, fullMark: 100 }
  ];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Visual Analytics & Heatmaps</h3>
          <p className="text-secondary small font-mono">Multi-dimensional inventory analysis using Bar, Pie, Radar, and Line charts</p>
        </div>
      </div>

      <div className="row g-4">
        
        {/* Category Share Pie Chart */}
        <div className="col-lg-6">
          <div className="glass-card p-4">
            <h5 className="fw-bold text-light mb-3">Category Inventory Distribution</h5>
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} fill="#8884d8" dataKey="value" label>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* System Radar Chart */}
        <div className="col-lg-6">
          <div className="glass-card p-4">
            <h5 className="fw-bold text-light mb-3">Operations Radar Evaluation</h5>
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius={80} data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" stroke="#94A3B8" />
                  <PolarRadiusAxis stroke="#94A3B8" />
                  <Radar name="Performance" dataKey="A" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsPage;
