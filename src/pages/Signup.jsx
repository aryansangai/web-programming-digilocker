import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShield, FiEye, FiEyeOff } from 'react-icons/fi';

const SECURITY_QUESTIONS = [
  'What is your pet\'s name?',
  'What city were you born in?',
  'What is your mother\'s maiden name?',
  'What was your first school name?',
  'What is your favorite book?',
];

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', securityQuestion: SECURITY_QUESTIONS[0], securityAnswer: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const update = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (Object.values(form).some(v => !v)) { setError('Please fill in all fields.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    const res = signup(form.username, form.email, form.password, form.securityQuestion, form.securityAnswer);
    if (res.success) navigate('/');
    else setError(res.message);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="icon"><FiShield /></div>
          <span>DigiLocker</span>
        </div>
        <h1>Create Account</h1>
        <p className="subtitle">Join DigiLocker to securely store your documents</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="su-user">Username</label>
            <div className="input-wrapper">
              <input id="su-user" type="text" placeholder="Choose a username" value={form.username} onChange={e => update('username', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="su-email">Email Address</label>
            <div className="input-wrapper">
              <input id="su-email" type="email" placeholder="Enter your email" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="su-pw">Password</label>
            <div className="input-wrapper">
              <input id="su-pw" type={showPw ? 'text' : 'password'} placeholder="Create a password" value={form.password} onChange={e => update('password', e.target.value)} />
              <button type="button" className="toggle-password" onClick={() => setShowPw(!showPw)}>
                {showPw ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="su-cpw">Confirm Password</label>
            <div className="input-wrapper">
              <input id="su-cpw" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="su-sq">Security Question</label>
            <select id="su-sq" value={form.securityQuestion} onChange={e => update('securityQuestion', e.target.value)}>
              {SECURITY_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="su-sa">Security Answer</label>
            <div className="input-wrapper">
              <input id="su-sa" type="text" placeholder="Your answer" value={form.securityAnswer} onChange={e => update('securityAnswer', e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn-primary">Create Account</button>
        </form>

        <div className="auth-footer">
          Already have an account?<Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
