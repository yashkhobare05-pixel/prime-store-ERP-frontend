import React, { useState } from 'react';
import { X, Camera, ScanLine, CheckCircle2 } from 'lucide-react';

const QRScannerModal = ({ onScanComplete, onClose }) => {
  const [scanning, setScanning] = useState(true);
  const [scannedCode, setScannedCode] = useState('');

  const handleSimulateScan = () => {
    const demoBarcode = '8901234567891';
    setScannedCode(demoBarcode);
    setScanning(false);
    setTimeout(() => {
      if (onScanComplete) onScanComplete(demoBarcode);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-card border-secondary text-light p-4 text-center">
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="modal-title fw-bold text-gradient">Camera Barcode & QR Scanner</h5>
            <button className="btn btn-link text-secondary p-0" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div 
            className="position-relative mx-auto rounded-4 overflow-hidden d-flex align-items-center justify-content-center border border-info"
            style={{ width: '280px', height: '280px', background: '#000' }}
          >
            {scanning ? (
              <>
                <Camera size={48} className="text-secondary opacity-50" />
                <div 
                  className="position-absolute w-100 border-top border-2 border-info shadow-lg animate-pulse"
                  style={{ top: '50%', boxShadow: '0 0 15px #06B6D4' }}
                ></div>
                <div className="position-absolute bottom-0 mb-3 text-info font-mono small d-flex align-items-center gap-2">
                  <ScanLine size={16} className="animate-spin" /> Scanning for Barcode / QR...
                </div>
              </>
            ) : (
              <div className="text-success p-3">
                <CheckCircle2 size={54} className="mb-2" />
                <h6 className="fw-bold text-light">Scan Successful!</h6>
                <div className="font-mono text-info small">{scannedCode}</div>
              </div>
            )}
          </div>

          <p className="text-secondary small mt-3">
            Align the Barcode or QR Code within the frame to perform instant product lookup.
          </p>

          <div className="d-flex justify-content-center gap-2 mt-2">
            <button className="btn btn-primary-gradient px-4" onClick={handleSimulateScan}>
              Simulate Instant Barcode Read
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QRScannerModal;
