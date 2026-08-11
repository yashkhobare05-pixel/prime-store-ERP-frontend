import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import BarcodeModal from '../components/BarcodeModal';
import QRScannerModal from '../components/QRScannerModal';
import { 
  Plus, 
  Search, 
  Barcode, 
  Trash2, 
  Camera,
  X
} from 'lucide-react';
import { toast } from 'react-toastify';

const fetchProducts = async ({ queryKey }) => {
  const [_, search, category, status] = queryKey;
  const res = await API.get(`/products?search=${search}&category=${category}&status=${status}`);
  return res.data.products || [];
};

const fetchCategories = async () => (await API.get('/categories')).data.categories || [];
const fetchSuppliers = async () => (await API.get('/suppliers')).data.suppliers || [];
const fetchWarehouses = async () => (await API.get('/warehouses')).data.warehouses || [];

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Modals state
  const [selectedProductBarcode, setSelectedProductBarcode] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    costPrice: '',
    sellingPrice: '',
    stockQuantity: '',
    minStockLevel: '10',
    category: '',
    supplier: '',
    warehouse: '',
    description: ''
  });

  // Queries
  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['products', search, selectedCategory, selectedStatus],
    queryFn: fetchProducts
  });

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: suppliers = [] } = useQuery({ queryKey: ['suppliers'], queryFn: fetchSuppliers });
  const { data: warehouses = [] } = useQuery({ queryKey: ['warehouses'], queryFn: fetchWarehouses });

  // Mutations
  const createProductMutation = useMutation({
    mutationFn: (newProduct) => API.post('/products', newProduct),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success('Product created successfully!');
        setShowCreateModal(false);
        setFormData({
          name: '',
          sku: '',
          costPrice: '',
          sellingPrice: '',
          stockQuantity: '',
          minStockLevel: '10',
          category: '',
          supplier: '',
          warehouse: '',
          description: ''
        });
        queryClient.invalidateQueries(['products']);
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Product creation failed.');
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id) => API.delete(`/products/${id}`),
    onSuccess: () => {
      toast.success('Product deleted.');
      queryClient.invalidateQueries(['products']);
    },
    onError: () => toast.error('Delete failed.')
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    createProductMutation.mutate(formData);
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    deleteProductMutation.mutate(id);
  };

  return (
    <div className="p-4">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-extrabold text-light mb-1">Product Catalog & SKU Master</h3>
          <p className="text-secondary small font-mono">Manage items, barcodes, QR codes, variants, and stock thresholds (TanStack Query)</p>
        </div>

        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-info rounded-pill px-3 d-flex align-items-center gap-2"
            onClick={() => setShowScanner(true)}
          >
            <Camera size={16} /> Camera Scanner
          </button>

          <button 
            className="btn btn-primary-gradient rounded-pill px-4 d-flex align-items-center gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-card p-3 mb-4 d-flex flex-wrap gap-3 align-items-center justify-content-between">
        <div className="d-flex align-items-center position-relative flex-grow-1" style={{ maxWidth: '400px' }}>
          <Search size={16} className="position-absolute start-0 ms-3 text-secondary" />
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary ps-5 rounded-pill"
            placeholder="Search by Product Name, SKU, Barcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2">
          <select 
            className="form-select bg-dark text-light border-secondary rounded-pill"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>

          <select 
            className="form-select bg-dark text-light border-secondary rounded-pill"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-secondary font-mono small border-secondary">
                <th>IMAGE</th>
                <th>PRODUCT NAME</th>
                <th>SKU</th>
                <th>CATEGORY</th>
                <th>COST / SELL</th>
                <th>STOCK QTY</th>
                <th>STATUS</th>
                <th>BARCODE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-secondary">
                  <td>
                    <img 
                      src={p.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=100&q=80'} 
                      alt={p.name}
                      className="rounded-3"
                      style={{ width: '42px', height: '42px', objectFit: 'cover' }}
                    />
                  </td>
                  <td className="fw-bold text-light">{p.name}</td>
                  <td className="font-mono text-info fw-semibold">{p.sku}</td>
                  <td className="small text-secondary">{p.category?.name || 'General'}</td>
                  <td className="font-mono small">
                    <span className="text-secondary">${p.costPrice}</span> / <span className="text-success fw-bold">${p.sellingPrice}</span>
                  </td>
                  <td className="font-mono fw-bold">{p.stockQuantity} {p.unit}</td>
                  <td>
                    {p.stockQuantity <= 0 ? (
                      <span className="badge-out-stock">Out of Stock</span>
                    ) : p.stockQuantity <= p.minStockLevel ? (
                      <span className="badge-low-stock">Low Stock</span>
                    ) : (
                      <span className="badge-in-stock">In Stock</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-secondary rounded-pill font-mono d-flex align-items-center gap-1"
                      onClick={() => setSelectedProductBarcode(p)}
                    >
                      <Barcode size={14} /> {p.barcode}
                    </button>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(p._id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Barcode Modal */}
      {selectedProductBarcode && (
        <BarcodeModal product={selectedProductBarcode} onClose={() => setSelectedProductBarcode(null)} />
      )}

      {/* QR Scanner Camera Modal */}
      {showScanner && (
        <QRScannerModal 
          onScanComplete={(code) => {
            setSearch(code);
            toast.info(`Scanned Code: ${code}`);
          }} 
          onClose={() => setShowScanner(false)} 
        />
      )}

      {/* Create Product Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content glass-card border-secondary text-light p-4">
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title fw-bold text-gradient">Create New Product</h5>
                <button className="btn btn-link text-secondary p-0" onClick={() => setShowCreateModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateProduct}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small text-secondary">Product Name</label>
                    <input 
                      type="text" 
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small text-secondary">SKU Code</label>
                    <input 
                      type="text" 
                      className="form-control bg-dark text-light border-secondary font-mono"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="e.g. HPP-16-ULTRA"
                      required 
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small text-secondary">Cost Price ($)</label>
                    <input 
                      type="number" 
                      className="form-control bg-dark text-light border-secondary font-mono"
                      value={formData.costPrice}
                      onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small text-secondary">Selling Price ($)</label>
                    <input 
                      type="number" 
                      className="form-control bg-dark text-light border-secondary font-mono"
                      value={formData.sellingPrice}
                      onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small text-secondary">Initial Stock Quantity</label>
                    <input 
                      type="number" 
                      className="form-control bg-dark text-light border-secondary font-mono"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small text-secondary">Category</label>
                    <select 
                      className="form-select bg-dark text-light border-secondary"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small text-secondary">Supplier</label>
                    <select 
                      className="form-select bg-dark text-light border-secondary"
                      value={formData.supplier}
                      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small text-secondary">Warehouse Location</label>
                    <select 
                      className="form-select bg-dark text-light border-secondary"
                      value={formData.warehouse}
                      onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                    >
                      <option value="">Select Warehouse</option>
                      {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
                    </select>
                  </div>

                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary-gradient px-4" disabled={createProductMutation.isPending}>
                    {createProductMutation.isPending ? 'Creating...' : 'Create Product'}
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

export default ProductsPage;
