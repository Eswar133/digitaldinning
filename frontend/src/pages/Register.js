import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await API.post('/auth/register', { fullname, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={fullname} onChange={e => setFullname(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button type="submit">Register</button>
      </form>
      <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
        <span>Already have an account? </span>
        <button type="button" className="link-btn" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Register;
