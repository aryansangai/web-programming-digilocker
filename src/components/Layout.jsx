import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiGrid, FiFileText, FiUploadCloud, FiUser, FiLogOut, FiShield, FiMenu, FiX, FiSearch, FiSun, FiMoon, FiBell } from 'react-icons/fi';

export default function Layout() {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleLogout = () => { logout(); navigate('/'); };

  const navItems = [
    { to: '/dashboard', icon: <FiGrid />, label: 'Dashboard', end: true },
    { to: '/dashboard/documents', icon: <FiFileText />, label: 'Documents' },
    { to: '/dashboard/upload', icon: <FiUploadCloud />, label: 'Upload Document' },
    { to: '/dashboard/profile', icon: <FiUser />, label: 'Profile' },
  ];

  return (
    <div className="layout">
      {/* Mobile overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-icon"><FiShield /></div>
          <h2>DigiLocker</h2>
          <button className="hamburger" style={{ marginLeft: 'auto', color: 'white' }} onClick={() => setSidebarOpen(false)}><FiX /></button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setSidebarOpen(false)}>
              <span className="icon">{item.icon}</span>{item.label}
            </NavLink>
          ))}
          <div className="spacer" />
          <button className="logout-btn" onClick={handleLogout}>
            <span className="icon"><FiLogOut /></span>Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger" onClick={() => setSidebarOpen(true)}><FiMenu /></button>
            <div className="topbar-search">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search documents..." value={globalSearch} onChange={e => setGlobalSearch(e.target.value)} />
            </div>
          </div>
          <div className="topbar-right">
            <button className="topbar-btn" onClick={toggleTheme} title="Toggle theme">
              {dark ? <FiSun /> : <FiMoon />}
            </button>
            <button className="topbar-btn"><FiBell /></button>
            <div className="user-avatar">{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
          </div>
        </header>

        <div className="page-content">
          <Outlet context={{ globalSearch }} />
        </div>
      </div>
    </div>
  );
}
