import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDocuments } from '../context/DocumentContext';
import { FiFileText, FiCheckCircle, FiClock, FiTrendingUp, FiUploadCloud, FiSearch, FiEye } from 'react-icons/fi';

export default function DashboardHome() {
  const { user } = useAuth();
  const { documents, stats } = useDocuments();

  const statCards = [
    { label: 'Total Documents', value: stats.total, icon: <FiFileText />, color: 'blue' },
    { label: 'Verified Docs', value: stats.verified, icon: <FiCheckCircle />, color: 'green' },
    { label: 'Pending Verification', value: stats.pending, icon: <FiClock />, color: 'orange' },
    { label: 'Recent Uploads', value: stats.recent, icon: <FiTrendingUp />, color: 'purple' },
  ];

  const recentDocs = [...documents].reverse().slice(0, 4);

  return (
    <>
      <div className="page-header">
        <h1>Welcome back, {user?.username || 'User'} 👋</h1>
        <p>Here&apos;s an overview of your digital document vault</p>
      </div>

      <div className="stats-grid">
        {statCards.map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <Link to="/dashboard/upload" className="quick-action-btn">
          <FiUploadCloud /> Upload Document
        </Link>
        <Link to="/dashboard/documents" className="quick-action-btn">
          <FiSearch /> Browse Documents
        </Link>
      </div>

      <div className="section-header">
        <h2>Recent Documents</h2>
        <Link to="/dashboard/documents">View All →</Link>
      </div>

      {recentDocs.length > 0 ? (
        <div className="docs-grid">
          {recentDocs.map(doc => (
            <div className="doc-card" key={doc.id}>
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
                <Link to="/dashboard/documents" className="doc-action-btn view"><FiEye /> View</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="icon"><FiFileText /></div>
          <h3>No documents yet</h3>
          <p>Upload your first document to get started</p>
        </div>
      )}
    </>
  );
}
