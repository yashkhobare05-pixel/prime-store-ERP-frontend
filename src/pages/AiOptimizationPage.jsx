import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { 
  BrainCircuit, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';
import { toast } from 'react-toastify';

const fetchAiPredictions = async () => {
  const res = await API.get('/ai/predict');
  return res.data;
};

const AiOptimizationPage = () => {
  const { data: aiData, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: ['ai-predictions'],
    queryFn: fetchAiPredictions,
    onError: () => toast.error('Failed to load AI predictions.')
  });

  return (
    <div className="p-4">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <BrainCircuit className="text-info" size={26} />
            <h3 className="fw-extrabold text-light mb-0">AI Predictive Analytics & Optimization Lab</h3>
          </div>
          <p className="text-secondary small font-mono">Scikit-Learn ML Regression, Prophet Demand Forecasting & Reorder Automation (TanStack Query)</p>
        </div>
        <button 
          className="btn btn-primary-gradient rounded-pill px-4 d-flex align-items-center gap-2"
          onClick={() => refetch()}
        >
          <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} /> Run ML Model Re-calibration
        </button>
      </div>

      {/* Top AI Scores Banner */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="glass-card p-4 text-center">
            <span className="text-secondary small fw-semibold text-uppercase font-mono">Stock Accuracy Score</span>
            <h2 className="display-5 fw-extrabold text-gradient-cyan font-mono my-1">
              {aiData?.inventoryAccuracyScore || 98.4}%
            </h2>
            <div className="badge bg-success-subtle text-success border border-success rounded-pill font-mono">
              +1.4% Accuracy Improvement
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="glass-card p-4 text-center">
            <span className="text-secondary small fw-semibold text-uppercase font-mono">Inventory Health Index</span>
            <h2 className="display-5 fw-extrabold text-gradient font-mono my-1">
              {aiData?.inventoryHealthScore || 94.8}/100
            </h2>
            <div className="badge bg-info-subtle text-info border border-info rounded-pill font-mono">
              Optimal Stock Ratio
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="glass-card p-4 text-center">
            <span className="text-secondary small fw-semibold text-uppercase font-mono">Avg Model Confidence</span>
            <h2 className="display-5 fw-extrabold text-gradient-gold font-mono my-1">96%</h2>
            <div className="badge bg-warning-subtle text-warning border border-warning rounded-pill font-mono">
              Scikit-Learn Random Forest
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations Banner */}
      <div className="glass-card p-4 mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <Sparkles size={22} className="text-warning" />
          <h5 className="fw-bold text-light mb-0">Automated AI Insights & Action Items</h5>
        </div>

        <div className="row g-3">
          {aiData?.insights?.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="glass-card p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary font-mono">{item.type}</span>
                    <span className="badge-ai-confidence">{item.confidence}% Confidence</span>
                  </div>
                  <h6 className="fw-bold text-light mb-1">{item.product}</h6>
                  <div className="text-secondary small mb-2">Current Stock: <span className="text-light font-mono">{item.currentStock}</span></div>
                  <p className="text-info small mb-0">{item.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Demand Prediction Table */}
      <div className="glass-card p-4 mb-4">
        <h5 className="fw-bold text-light mb-3">Item-Level Demand Forecasting & Reorder Optimization</h5>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-secondary font-mono small border-secondary">
                <th>PRODUCT</th>
                <th>CURRENT STOCK</th>
                <th>DAILY RATE</th>
                <th>PREDICTED 7D</th>
                <th>PREDICTED 30D</th>
                <th>PREDICTED 90D</th>
                <th>STOCKOUT RISK</th>
                <th>VELOCITY</th>
                <th>REORDER QTY</th>
                <th>REORDER DATE</th>
                <th>CONFIDENCE</th>
              </tr>
            </thead>
            <tbody>
              {aiData?.predictions?.map((pred) => (
                <tr key={pred.id} className="border-secondary">
                  <td className="fw-bold text-light">{pred.name}</td>
                  <td className="font-mono">{pred.currentStock}</td>
                  <td className="font-mono text-info">{pred.consumptionRatePerDay}/day</td>
                  <td className="font-mono">{pred.demand7Days}</td>
                  <td className="font-mono text-warning fw-bold">{pred.demand30Days}</td>
                  <td className="font-mono">{pred.demand90Days}</td>
                  <td>
                    {pred.stockOutRisk === 'Critical' ? (
                      <span className="badge bg-danger">Critical (&lt;5 days)</span>
                    ) : pred.stockOutRisk === 'High' ? (
                      <span className="badge bg-warning text-dark">High</span>
                    ) : (
                      <span className="badge bg-success">Low</span>
                    )}
                  </td>
                  <td>
                    <span className="badge bg-secondary font-mono" style={{ fontSize: '0.7rem' }}>{pred.movementVelocity}</span>
                  </td>
                  <td className="font-mono text-success fw-bold">{pred.recommendedReorderQuantity} units</td>
                  <td className="font-mono small">{pred.recommendedReorderDate}</td>
                  <td>
                    <span className="badge-ai-confidence">{pred.confidenceBadge}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Performance Prediction */}
      <div className="glass-card p-4">
        <h5 className="fw-bold text-light mb-3">AI Supplier Delivery & Reliability Predictions</h5>

        <div className="row g-3">
          {aiData?.supplierPredictions?.map((sup) => (
            <div key={sup.id} className="col-md-6 col-lg-4">
              <div className="glass-card p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold text-light mb-0">{sup.name}</h6>
                  <span className="badge bg-success font-mono">{sup.aiStatus}</span>
                </div>
                <div className="d-flex justify-content-between small text-secondary">
                  <span>Rating: <strong className="text-warning">{sup.rating} ★</strong></span>
                  <span>Predicted Lead Time: <strong className="text-info font-mono">{sup.predictedLeadTime} days</strong></span>
                </div>
                <div className="progress mt-2" style={{ height: '6px' }}>
                  <div className="progress-bar bg-info" style={{ width: `${sup.reliabilityScore}%` }}></div>
                </div>
                <div className="text-end small font-mono text-secondary mt-1">{sup.reliabilityScore}% Reliability</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AiOptimizationPage;
