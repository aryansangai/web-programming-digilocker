import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDocuments } from '../context/DocumentContext';
import { FiSave } from 'react-icons/fi';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { stats } = useDocuments();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!username.trim() || !email.trim()) { setError('All fields are required.'); return; }
    const res = updateProfile({ username: username.trim(), email: email.trim() });
    if (res.success) setSuccess('Profile updated successfully!');
    else setError(res.message);
  };

  return (
    <>
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account settings</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card profile-avatar-section">
          <div className="profile-avatar">{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
          <div className="profile-stats">
            <div>
              <h4>{stats.total}</h4>
              <span>Documents</span>
            </div>
            <div>
              <h4>{stats.verified}</h4>
              <span>Verified</span>
            </div>
            <div>
              <h4>{stats.pending}</h4>
              <span>Pending</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h3 className="profile-form">Edit Profile</h3>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="prof-user">Username</label>
              <div className="input-wrapper">
                <input id="prof-user" type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="prof-email">Email</label>
              <div className="input-wrapper">
                <input id="prof-email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label>Member Since</label>
              <div className="input-wrapper">
                <input type="text" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'} readOnly style={{ opacity: 0.7 }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: 8 }}>
              <FiSave style={{ marginRight: 6, verticalAlign: 'middle' }} /> Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
