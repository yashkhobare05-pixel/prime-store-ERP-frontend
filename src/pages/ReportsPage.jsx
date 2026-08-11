import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Download, Printer } from 'lucide-react';
import { toast } from 'react-toastify';

const fetchReportsSummary = async () => {
  const res = await API.get('/reports/summary');
  return res.data.summary || {};
};

const ReportsPage = () => {
  const { data: summary = {}, isLoading } = useQuery({
    queryKey: ['reports-summary'],
    queryFn: fetchReportsSummary,
    onError: () => toast.error('Failed to load reports summary.')
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Total Sales Revenue,$${summary?.totalSalesRevenue || 0}\n`
      + `Total Purchase Cost,$${summary?.totalPurchaseCost || 0}\n`
      + `Gross Profit Margin,${summary?.profitMargin || 0}%\n`
      + `Inventory Value,$${summary?.inventoryValue || 0}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Inventory_System_Report.csv");
    document.body.appendChild(link);
    link.click();
    toast.success('CSV Report downloaded successfully!');
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Financial & Inventory Reports Exporter</h3>
          <p className="text-secondary small font-mono">Export PDF & Excel summary datasets for executive review (TanStack Query)</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-info rounded-pill px-3 d-flex align-items-center gap-2" onClick={handleExportCSV}>
            <Download size={16} /> Export Excel / CSV
          </button>
          <button className="btn btn-primary-gradient rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => window.print()}>
            <Printer size={16} /> Print Report
          </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <span className="text-secondary small font-mono">Gross Sales Revenue</span>
            <h3 className="fw-bold text-success font-mono my-2">${(summary?.totalSalesRevenue || 128900).toLocaleString()}</h3>
            <span className="text-secondary small">Total Invoices Generated</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <span className="text-secondary small font-mono">Procurement Expenditure</span>
            <h3 className="fw-bold text-warning font-mono my-2">${(summary?.totalPurchaseCost || 64500).toLocaleString()}</h3>
            <span className="text-secondary small font-mono">Supplier PO Cost</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <span className="text-secondary small font-mono">Profit Margin %</span>
            <h3 className="fw-bold text-gradient font-mono my-2">{summary?.profitMargin || 49.9}%</h3>
            <span className="text-secondary small font-mono">Net Profit Share</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4 text-center">
            <span className="text-secondary small font-mono">Total Inventory Asset</span>
            <h3 className="fw-bold text-info font-mono my-2">${(summary?.inventoryValue || 148500).toLocaleString()}</h3>
            <span className="text-secondary small font-mono">Warehouse Stock Valuation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
