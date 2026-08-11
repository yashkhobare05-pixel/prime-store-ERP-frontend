import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sliders, 
  ArrowLeftRight, 
  X
} from 'lucide-react';
import { toast } from 'react-toastify';

const fetchProducts = async () => (await API.get('/products')).data.products || [];
const fetchWarehouses = async () => (await API.get('/warehouses')).data.warehouses || [];
const fetchTransactions = async () => (await API.get('/inventory/transactions')).data.transactions || [];

const InventoryPage = () => {
  const queryClient = useQueryClient();
  const [actionType, setActionType] = useState(null); // 'in', 'out', 'adjust', 'transfer'
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
    warehouseId: '',
    sourceWarehouseId: '',
    destinationWarehouseId: '',
    newStockLevel: 0,
    batchNumber: '',
    serialNumber: '',
    reason: ''
  });

  // Queries
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: warehouses = [] } = useQuery({ queryKey: ['warehouses'], queryFn: fetchWarehouses });
  const { data: transactions = [], isLoading: loadingTransactions } = useQuery({ 
    queryKey: ['transactions'], 
    queryFn: fetchTransactions 
  });

  // Mutation for Stock Operations
  const transactionMutation = useMutation({
    mutationFn: ({ endpoint, payload }) => API.post(endpoint, payload),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(`Inventory operation '${actionType.toUpperCase()}' completed!`);
        setActionType(null);
        queryClient.invalidateQueries(['transactions']);
        queryClient.invalidateQueries(['products']);
        queryClient.invalidateQueries(['dashboard-data']);
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Operation failed.');
    }
  });

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    let endpoint = '';
    if (actionType === 'in') endpoint = '/inventory/stock-in';
    if (actionType === 'out') endpoint = '/inventory/stock-out';
    if (actionType === 'adjust') endpoint = '/inventory/adjust';
    if (actionType === 'transfer') endpoint = '/inventory/transfer';

    transactionMutation.mutate({ endpoint, payload: formData });
  };

  return (
    <div className="p-4">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Real-Time Inventory Operations</h3>
          <p className="text-secondary small font-mono">Stock Inbound, Outbound, Auditing Adjustments & Inter-Warehouse Transfers (TanStack Query)</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success rounded-pill px-3 d-flex align-items-center gap-2" onClick={() => setActionType('in')}>
            <ArrowDownLeft size={16} /> Stock In
          </button>
          <button className="btn btn-danger rounded-pill px-3 d-flex align-items-center gap-2" onClick={() => setActionType('out')}>
            <ArrowUpRight size={16} /> Stock Out
          </button>
          <button className="btn btn-warning rounded-pill px-3 d-flex align-items-center gap-2 text-dark" onClick={() => setActionType('adjust')}>
            <Sliders size={16} /> Adjust Stock
          </button>
          <button className="btn btn-info rounded-pill px-3 d-flex align-items-center gap-2 text-dark" onClick={() => setActionType('transfer')}>
            <ArrowLeftRight size={16} /> Transfer
          </button>
        </div>
      </div>

      {/* Transactions History Audit Table */}
      <div className="glass-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-light mb-0">Inventory Activity Audit Log</h5>
          <span className="badge bg-secondary font-mono">Real-Time Log</span>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-secondary font-mono small border-secondary">
                <th>REF NO</th>
                <th>TYPE</th>
                <th>PRODUCT</th>
                <th>QTY</th>
                <th>PREV → NEW</th>
                <th>BATCH / SERIAL</th>
                <th>PERFORMED BY</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id} className="border-secondary">
                  <td className="font-mono text-info fw-bold">{t.referenceNo || 'TRX-1092'}</td>
                  <td>
                    {t.type === 'Stock In' ? (
                      <span className="badge bg-success-subtle text-success border border-success rounded-pill">Stock In</span>
                    ) : t.type === 'Stock Out' ? (
                      <span className="badge bg-danger-subtle text-danger border border-danger rounded-pill">Stock Out</span>
                    ) : t.type === 'Adjustment' ? (
                      <span className="badge bg-warning-subtle text-warning border border-warning rounded-pill">Adjusted</span>
                    ) : (
                      <span className="badge bg-info-subtle text-info border border-info rounded-pill">Transferred</span>
                    )}
                  </td>
                  <td className="fw-semibold text-light">{t.product?.name || 'Item'}</td>
                  <td className="font-mono fw-bold">{t.quantity}</td>
                  <td className="font-mono small text-secondary">{t.previousStock} → <span className="text-light fw-bold">{t.newStock}</span></td>
                  <td className="font-mono small">{t.batchNumber || t.serialNumber || 'N/A'}</td>
                  <td className="small">{t.performedBy?.name || 'System'}</td>
                  <td className="font-mono small text-secondary">{new Date(t.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal */}
      {actionType && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border-secondary text-light p-4">
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title fw-bold text-gradient text-uppercase">Perform {actionType}</h5>
                <button className="btn btn-link text-secondary p-0" onClick={() => setActionType(null)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleTransactionSubmit}>
                
                <div className="mb-3">
                  <label className="form-label small text-secondary">Select Product</label>
                  <select 
                    className="form-select bg-dark text-light border-secondary"
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    required
                  >
                    <option value="">Choose item SKU</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.name} (Stock: {p.stockQuantity})</option>)}
                  </select>
                </div>

                {actionType !== 'adjust' ? (
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Quantity</label>
                    <input 
                      type="number" 
                      className="form-control bg-dark text-light border-secondary font-mono"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <label className="form-label small text-secondary">New Adjusted Stock Level</label>
                    <input 
                      type="number" 
                      className="form-control bg-dark text-light border-secondary font-mono"
                      value={formData.newStockLevel}
                      onChange={(e) => setFormData({ ...formData, newStockLevel: e.target.value })}
                      required
                    />
                  </div>
                )}

                {actionType === 'transfer' ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label small text-secondary">Source Warehouse</label>
                      <select 
                        className="form-select bg-dark text-light border-secondary"
                        value={formData.sourceWarehouseId}
                        onChange={(e) => setFormData({ ...formData, sourceWarehouseId: e.target.value })}
                        required
                      >
                        <option value="">Select Source</option>
                        {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small text-secondary">Destination Warehouse</label>
                      <select 
                        className="form-select bg-dark text-light border-secondary"
                        value={formData.destinationWarehouseId}
                        onChange={(e) => setFormData({ ...formData, destinationWarehouseId: e.target.value })}
                        required
                      >
                        <option value="">Select Destination</option>
                        {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Batch Number / Serial Number (Optional)</label>
                    <input 
                      type="text" 
                      className="form-control bg-dark text-light border-secondary font-mono"
                      placeholder="e.g. BATCH-2026-X9"
                      value={formData.batchNumber}
                      onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label small text-secondary">Reason / Reference Notes</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Reason for transaction"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setActionType(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary-gradient px-4" disabled={transactionMutation.isPending}>
                    {transactionMutation.isPending ? 'Executing...' : 'Execute Operation'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InventoryPage;
