import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShield, FiEye, FiEyeOff } from 'react-icons/fi';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { getSecurityQuestion, resetPassword } = useAuth();

  const handleStep1 = (e) => {
    e.preventDefault();
    setError('');
    if (!identifier) { setError('Please enter your username or email.'); return; }
    const q = getSecurityQuestion(identifier);
    if (!q) { setError('No account found with that username or email.'); return; }
    setQuestion(q);
    setStep(2);
  };

  const handleStep2 = (e) => {
    e.preventDefault();
    setError('');
    if (!answer) { setError('Please enter your security answer.'); return; }
    setStep(3);
  };

  const handleStep3 = (e) => {
    e.preventDefault();
    setError('');
    if (!newPassword || newPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    const res = resetPassword(identifier, answer, newPassword);
    if (res.success) {
      setSuccess('Password reset successful! You can now sign in.');
      setStep(4);
    } else {
      setError(res.message);
      setStep(2);
      setAnswer('');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="icon"><FiShield /></div>
          <span>DigiLocker</span>
        </div>
        <h1>Reset Password</h1>
        <p className="subtitle">
          {step === 1 && 'Enter your username or email to get started'}
          {step === 2 && 'Answer your security question'}
          {step === 3 && 'Create a new password'}
          {step === 4 && 'All done!'}
        </p>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        {step === 1 && (
          <form onSubmit={handleStep1}>
            <div className="form-group">
              <label htmlFor="fp-id">Username or Email</label>
              <div className="input-wrapper">
                <input id="fp-id" type="text" placeholder="Enter your username or email" value={identifier} onChange={e => setIdentifier(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn-primary">Continue</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2}>
            <div className="form-group">
              <label>Security Question</label>
              <div className="input-wrapper">
                <input type="text" value={question} readOnly style={{ opacity: 0.7, cursor: 'default' }} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="fp-ans">Your Answer</label>
              <div className="input-wrapper">
                <input id="fp-ans" type="text" placeholder="Enter your answer" value={answer} onChange={e => setAnswer(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn-primary">Verify Answer</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleStep3}>
            <div className="form-group">
              <label htmlFor="fp-npw">New Password</label>
              <div className="input-wrapper">
                <input id="fp-npw" type={showPw ? 'text' : 'password'} placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <button type="button" className="toggle-password" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary">Reset Password</button>
          </form>
        )}

        <div className="auth-footer" style={{ marginTop: 24 }}>
          Remember your password?<Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
