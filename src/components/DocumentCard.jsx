import { FiFileText, FiEye, FiEdit2, FiTrash2, FiCheckCircle, FiClock } from 'react-icons/fi';

export default function DocumentCard({ doc, onView, onEdit, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  const handleView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onView) onView();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  return (
    <div className="doc-card">
      <div className="doc-card-header">
        <div className={`doc-icon ${doc.type}`}>
          <FiFileText />
        </div>
        <div>
          <h3>{doc.name}</h3>
          <p className="doc-category">{doc.category}</p>
        </div>
      </div>

      <span className={`doc-status ${doc.verified ? 'verified' : 'pending'}`}>
        {doc.verified ? <><FiCheckCircle /> Verified</> : <><FiClock /> Pending</>}
      </span>

      <div className="doc-card-actions">
        <button type="button" className="doc-action-btn view" onClick={handleView}><FiEye /> View</button>
        <button type="button" className="doc-action-btn edit" onClick={handleEdit}><FiEdit2 /> Edit</button>
        <button type="button" className="doc-action-btn delete" onClick={handleDelete}><FiTrash2 /> Delete</button>
      </div>
    </div>
  );
}

