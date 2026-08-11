import React from 'react';
import { X, Printer, QrCode, Barcode as BarcodeIcon } from 'lucide-react';

const BarcodeModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-card border-secondary text-light p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="modal-title fw-bold text-gradient">Barcode & QR Code Generator</h5>
            <button className="btn btn-link text-secondary p-0" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="text-center my-3 p-4 bg-white rounded-3 text-dark">
            <h6 className="fw-bold mb-1">{product.name}</h6>
            <div className="text-muted small font-mono mb-3">SKU: {product.sku}</div>
            
            {/* Visual Barcode Simulator */}
            <div className="my-3 d-flex justify-content-center align-items-center">
              <svg width="240" height="70">
                <rect x="10" y="5" width="4" height="50" fill="#000" />
                <rect x="18" y="5" width="2" height="50" fill="#000" />
                <rect x="24" y="5" width="6" height="50" fill="#000" />
                <rect x="34" y="5" width="2" height="50" fill="#000" />
                <rect x="40" y="5" width="8" height="50" fill="#000" />
                <rect x="52" y="5" width="4" height="50" fill="#000" />
                <rect x="60" y="5" width="2" height="50" fill="#000" />
                <rect x="66" y="5" width="6" height="50" fill="#000" />
                <rect x="76" y="5" width="10" height="50" fill="#000" />
                <rect x="90" y="5" width="4" height="50" fill="#000" />
                <rect x="98" y="5" width="2" height="50" fill="#000" />
                <rect x="104" y="5" width="6" height="50" fill="#000" />
                <rect x="114" y="5" width="8" height="50" fill="#000" />
                <rect x="126" y="5" width="4" height="50" fill="#000" />
                <rect x="134" y="5" width="2" height="50" fill="#000" />
                <rect x="140" y="5" width="6" height="50" fill="#000" />
                <rect x="150" y="5" width="10" height="50" fill="#000" />
                <rect x="164" y="5" width="4" height="50" fill="#000" />
                <rect x="172" y="5" width="2" height="50" fill="#000" />
                <rect x="178" y="5" width="6" height="50" fill="#000" />
                <rect x="188" y="5" width="4" height="50" fill="#000" />
                <rect x="196" y="5" width="8" height="50" fill="#000" />
                <rect x="208" y="5" width="4" height="50" fill="#000" />
                <rect x="216" y="5" width="6" height="50" fill="#000" />
              </svg>
            </div>
            <div className="font-mono fw-bold" style={{ letterSpacing: '3px' }}>{product.barcode}</div>

            <hr className="my-3" />

            <div className="d-flex justify-content-center align-items-center gap-3">
              <QrCode size={90} className="text-dark" />
              <div className="text-start">
                <div className="fw-bold small">{product.qrCode || `QR-${product.sku}`}</div>
                <div className="text-muted small">Scan for instant product lookup & stock transaction</div>
              </div>
            </div>

          </div>

          <div className="d-flex justify-content-end gap-2 mt-2">
            <button className="btn btn-secondary rounded-3" onClick={onClose}>Close</button>
            <button className="btn btn-primary-gradient d-flex align-items-center gap-2" onClick={() => window.print()}>
              <Printer size={16} /> Print Barcode Label
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BarcodeModal;
