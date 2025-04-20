import React, { useState, useContext } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { fullname, password });
      setUser({ fullname: res.data.fullname, token: res.data.token, id: res.data.id });
      navigate('/menu');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={fullname} onChange={e => setFullname(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
        <span>Don't have an account? </span>
        <button type="button" className="link-btn" onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default Login;
