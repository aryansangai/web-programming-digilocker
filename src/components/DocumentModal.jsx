import { useState, useRef } from 'react';
import { FiX, FiFileText, FiCheckCircle, FiClock, FiUploadCloud, FiFile } from 'react-icons/fi';

const CATEGORIES = ['Education', 'Identity', 'Finance', 'Health', 'Other'];

export default function DocumentModal({ mode, doc, onClose, onSave }) {
  const [name, setName] = useState(doc.name);
  const [category, setCategory] = useState(doc.category);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updates = { name, category };
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updates.fileData = reader.result;
        updates.fileType = file.type;
        updates.fileName = file.name;
        updates.fileSize = file.size;
        onSave(doc.id, updates);
      };
      reader.readAsDataURL(file);
    } else {
      onSave(doc.id, updates);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (mode === 'view') {
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Document Details</h2>
            <button type="button" className="modal-close" onClick={onClose}><FiX /></button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div className={`doc-icon ${doc.type}`} style={{ width: 56, height: 56, fontSize: 26 }}>
              <FiFileText />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>{doc.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{doc.category}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ padding: 14, background: 'var(--bg-primary)', borderRadius: 10, fontSize: 13 }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Status</p>
              <span className={`doc-status ${doc.verified ? 'verified' : 'pending'}`} style={{ margin: 0 }}>
                {doc.verified ? <><FiCheckCircle /> Verified</> : <><FiClock /> Pending</>}
              </span>
            </div>
            <div style={{ padding: 14, background: 'var(--bg-primary)', borderRadius: 10, fontSize: 13 }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Uploaded</p>
              <p style={{ fontWeight: 600 }}>{doc.uploadedAt}</p>
            </div>
            <div style={{ padding: 14, background: 'var(--bg-primary)', borderRadius: 10, fontSize: 13 }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Type</p>
              <p style={{ fontWeight: 600, textTransform: 'capitalize' }}>{doc.type}</p>
            </div>
            <div style={{ padding: 14, background: 'var(--bg-primary)', borderRadius: 10, fontSize: 13 }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Document ID</p>
              <p style={{ fontWeight: 600 }}>DL-{doc.id.slice(-6).toUpperCase()}</p>
            </div>
          </div>

          {doc.fileData ? (
            <div style={{ marginTop: 20 }}>
              <h4 style={{ marginBottom: 10, fontSize: 14, color: 'var(--text-secondary)' }}>Preview</h4>
              {doc.fileType?.startsWith('image/') ? (
                <img src={doc.fileData} alt={doc.name} style={{ maxWidth: '100%', borderRadius: 10 }} />
              ) : (
                <iframe src={doc.fileData} title={doc.name} style={{ width: '100%', height: 300, borderRadius: 10, border: '1px solid var(--border-color)' }} />
              )}
            </div>
          ) : (
            <div style={{ marginTop: 20, padding: 30, background: 'var(--bg-primary)', borderRadius: 12, textAlign: 'center' }}>
              <FiFileText style={{ fontSize: 32, color: 'var(--text-secondary)', opacity: 0.5, marginBottom: 8 }} />
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>No file attached yet</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Use the Edit button to upload a file for this document</p>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  // Edit mode
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Document</h2>
          <button type="button" className="modal-close" onClick={onClose}><FiX /></button>
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="edit-name">Document Name</label>
            <div className="input-wrapper">
              <input id="edit-name" type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-cat">Category</label>
            <select id="edit-cat" value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Replace File (optional)</label>
            <div
              className="upload-zone"
              style={{ padding: 24, marginBottom: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,image/*"
                style={{ display: 'none' }}
                onChange={e => { if (e.target.files[0]) setFile(e.target.files[0]); }}
              />
              {file ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FiFile style={{ fontSize: 22, color: 'var(--text-accent)' }} />
                  <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{file.name}</span>
                </div>
              ) : (
                <>
                  <FiUploadCloud style={{ fontSize: 28, color: 'var(--text-accent)', marginBottom: 6 }} />
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Click to select a new file</p>
                </>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-sm">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
