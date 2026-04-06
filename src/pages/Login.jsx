import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShield, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!identifier || !password) { setError('Please fill in all fields.'); return; }
    const res = login(identifier, password);
    if (res.success) navigate('/dashboard');
    else setError(res.message);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="icon"><FiShield /></div>
          <span>DigiLocker</span>
        </div>
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to access your digital document vault</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-id">Username or Email</label>
            <div className="input-wrapper">
              <input id="login-id" type="text" placeholder="Enter your username or email" value={identifier} onChange={e => setIdentifier(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-pw">Password</label>
            <div className="input-wrapper">
              <input id="login-pw" type={showPw ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="toggle-password" onClick={() => setShowPw(!showPw)}>
                {showPw ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>

          <button type="submit" className="btn-primary">Sign In</button>
        </form>

        <div className="auth-footer">
          Don't have an account?<Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
