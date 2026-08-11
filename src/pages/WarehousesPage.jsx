import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { MapPin } from 'lucide-react';
import { toast } from 'react-toastify';

const fetchWarehouses = async () => {
  const res = await API.get('/warehouses');
  return res.data.warehouses || [];
};

const WarehousesPage = () => {
  const { data: warehouses = [], isLoading } = useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchWarehouses,
    onError: () => toast.error('Failed to load warehouses.')
  });

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Multi-Warehouse Facilities</h3>
          <p className="text-secondary small font-mono">Manage regional hubs, storage capacities, and space utilization (TanStack Query)</p>
        </div>
      </div>

      <div className="row g-4">
        {warehouses.map((wh) => {
          const occupancyPercentage = Math.round((wh.occupiedUnits / wh.capacityUnits) * 100);
          return (
            <div key={wh._id} className="col-md-6 col-lg-4">
              <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary font-mono">{wh.code}</span>
                    <span className="badge bg-success">{wh.status}</span>
                  </div>
                  <h5 className="fw-bold text-light mb-1">{wh.name}</h5>
                  <div className="d-flex align-items-center gap-1 text-secondary small mb-3">
                    <MapPin size={14} /> {wh.location?.city}, {wh.location?.state}
                  </div>

                  <div className="mb-2">
                    <div className="d-flex justify-content-between small font-mono mb-1">
                      <span className="text-secondary">Capacity Usage</span>
                      <span className="text-info fw-bold">{occupancyPercentage}% ({wh.occupiedUnits}/{wh.capacityUnits} units)</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className={`progress-bar ${occupancyPercentage > 85 ? 'bg-danger' : 'bg-info'}`} 
                        style={{ width: `${occupancyPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-top border-secondary text-secondary small">
                  Manager: <strong className="text-light">{wh.managerName || 'Operations Team'}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WarehousesPage;
