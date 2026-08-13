import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon: Icon, color = 'indigo', subtitle }) => {
  const colorMap = {
    indigo: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
    cyan: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)',
    emerald: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.25) 100%)',
    amber: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.25) 100%)',
    rose: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(225, 29, 72, 0.25) 100%)'
  };

  const iconColorMap = {
    indigo: '#818CF8',
    cyan: '#38BDF8',
    emerald: '#34D399',
    amber: '#FBBF24',
    rose: '#FB7185'
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-card p-4 h-100 d-flex flex-column justify-content-between"
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="text-secondary small fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
          {title}
        </span>
        <div 
          className="rounded-3 p-2.5 d-flex align-items-center justify-content-center border border-secondary"
          style={{ background: colorMap[color] || colorMap.indigo }}
        >
          {Icon && <Icon size={20} style={{ color: iconColorMap[color] || iconColorMap.indigo }} />}
        </div>
      </div>

      <div>
        <div className="stat-value font-mono mb-1">{value}</div>
        {subtitle && <div className="text-secondary small fw-semibold">{subtitle}</div>}
        {change && (
          <div className="d-flex align-items-center gap-1.5 mt-2" style={{ fontSize: '0.82rem' }}>
            <span className={change.startsWith('+') ? 'text-success fw-bold' : 'text-danger fw-bold'}>
              {change}
            </span>
            <span className="text-secondary opacity-75">vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
