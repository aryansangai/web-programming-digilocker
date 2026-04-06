import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../context/DocumentContext';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';

const CATEGORIES = ['Education', 'Identity', 'Finance', 'Health', 'Other'];
const TYPE_MAP = { Education: 'cert', Identity: 'id', Finance: 'pdf', Health: 'cert', Other: 'pdf' };

export default function UploadDocument() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Education');
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef(null);
  const { addDocument } = useDocuments();
  const navigate = useNavigate();

  const handleFile = (f) => {
    if (!f) return;
    const valid = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!valid.includes(f.type)) { setError('Only PDF and image files are allowed.'); return; }
    if (f.size > 10 * 1024 * 1024) { setError('File size must be under 10MB.'); return; }
    setError('');
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter a document name.'); return; }
    if (!file) { setError('Please select a file.'); return; }

    // Read file as data URL for preview
    const reader = new FileReader();
    reader.onload = () => {
      addDocument({
        name: name.trim(),
        category,
        type: TYPE_MAP[category] || 'pdf',
        fileData: reader.result,
        fileType: file.type,
        fileName: file.name,
        fileSize: file.size,
      });
      setSuccess('Document uploaded successfully!');
      setTimeout(() => navigate('/dashboard/documents'), 1200);
    };
    reader.readAsDataURL(file);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <>
      <div className="page-header">
        <h1>Upload Document</h1>
        <p>Add a new document to your digital vault</p>
      </div>

      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}

      <div
        className={`upload-zone ${dragOver ? 'dragover' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept=".pdf,image/*" hidden onChange={e => handleFile(e.target.files[0])} />
        <div className="upload-icon"><FiUploadCloud /></div>
        <h3>Drag & drop your file here</h3>
        <p>or click to browse • PDF, JPG, PNG up to 10MB</p>
      </div>

      {file && (
        <div className="file-preview">
          <div className="file-icon"><FiFile /></div>
          <div>
            <p className="file-name">{file.name}</p>
            <p className="file-size">{formatSize(file.size)}</p>
          </div>
          <button className="remove-file" onClick={() => setFile(null)}><FiX /></button>
        </div>
      )}

      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="up-name">Document Name</label>
            <div className="input-wrapper">
              <input id="up-name" type="text" placeholder="e.g. Aadhaar Card" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="up-cat">Category</label>
            <select id="up-cat" value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn-primary" style={{ marginTop: 12 }}>Upload Document</button>
      </form>
    </>
  );
}
