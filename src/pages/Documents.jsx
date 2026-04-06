import { useState } from 'react';
import { useDocuments } from '../context/DocumentContext';
import { useOutletContext } from 'react-router-dom';
import DocumentCard from '../components/DocumentCard';
import DocumentModal from '../components/DocumentModal';
import { FiSearch, FiFileText, FiAlertTriangle, FiX } from 'react-icons/fi';

const CATEGORIES = ['All', 'Education', 'Identity', 'Finance', 'Health', 'Other'];

export default function Documents() {
  const { documents, updateDocument, deleteDocument } = useDocuments();
  const { globalSearch } = useOutletContext();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const query = (search || globalSearch || '').toLowerCase();

  const filtered = documents.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(query);
    const matchCat = category === 'All' || d.category === category;
    return matchSearch && matchCat;
  });

  const handleDeleteClick = (doc) => {
    setDeleteTarget(doc);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteDocument(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleEdit = (doc) => setModal({ mode: 'edit', doc });
  const handleView = (doc) => setModal({ mode: 'view', doc });

  const handleSave = (id, updates) => {
    updateDocument(id, updates);
    setModal(null);
  };

  return (
    <>
      <div className="page-header">
        <h1>My Documents</h1>
        <p>Manage and view all your uploaded documents</p>
      </div>

      <div className="docs-toolbar">
        <div className="docs-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="docs-filter">
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="docs-grid">
          {filtered.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onView={() => handleView(doc)}
              onEdit={() => handleEdit(doc)}
              onDelete={() => handleDeleteClick(doc)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="icon"><FiFileText /></div>
          <h3>No documents found</h3>
          <p>{query ? 'Try a different search term' : 'Upload your first document to get started'}</p>
        </div>
      )}

      {modal && (
        <DocumentModal mode={modal.mode} doc={modal.doc} onClose={() => setModal(null)} onSave={handleSave} />
      )}

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 420, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}><FiX /></button>
            </div>
            <div style={{ margin: '8px 0 18px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiAlertTriangle style={{ fontSize: 28, color: '#ef4444' }} />
              </div>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Delete Document</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
              Are you sure you want to delete <strong>"{deleteTarget.name}"</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
