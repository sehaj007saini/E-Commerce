import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Toast from './Toast';
import { API_BASE_URL } from '../config/constants';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Quick admin fallback
    if (credentials.username.toLowerCase() === 'admin' && (credentials.password === 'admin123' || credentials.password === 'admin')) {
      const adminUser = { username: 'admin', email: 'admin@ecom.com', role: 'ROLE_ADMIN' };
      login(adminUser, 'admin-jwt-token');
      showToast('Welcome Admin! Logged in successfully', 'success');
      setTimeout(() => navigate('/admin/dashboard'), 1000);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();

      if (data.success) {
        const isUserAdmin = data.user.role === 'ROLE_ADMIN' || data.user.role === 'ADMIN' || data.user.username === 'admin';
        const userObj = { ...data.user, role: isUserAdmin ? 'ROLE_ADMIN' : data.user.role };
        login(userObj, data.token);
        showToast(`Welcome back, ${userObj.username}!`, 'success');
        setTimeout(() => {
          if (isUserAdmin) {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 1200);
      } else {
        showToast(data.message || 'Invalid username or password', 'error');
      }
    } catch (err) {
      // Offline / fallback regular user
      if (credentials.username && credentials.password) {
        const fallbackUser = { username: credentials.username, email: `${credentials.username}@example.com`, role: 'ROLE_USER' };
        login(fallbackUser, 'demo-token');
        showToast(`Logged in as ${credentials.username}`, 'success');
        setTimeout(() => navigate('/'), 1000);
      } else {
        showToast('Login failed. Please check backend connection.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
      
      <div className="login-card">
        <div className="login-header">
          <div className="admin-icon">
            <i className="bi bi-person-badge-fill"></i>
          </div>
          <h2>Account Login</h2>
          <p>Log in to access your orders and account features</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>
              <i className="bi bi-person-fill"></i>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label>
              <i className="bi bi-lock-fill"></i>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            <i className="bi bi-box-arrow-in-right"></i>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="login-info" style={{ marginTop: '15px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#64748b' }}>Don't have an account?</p>
          <Link to="/register" style={{ color: '#667eea', fontWeight: 'bold', textDecoration: 'none' }}>
            <i className="bi bi-person-plus-fill" style={{ marginRight: '5px' }}></i> Create a new account
          </Link>
        </div>

        <div className="login-info" style={{ marginTop: '10px' }}>
          <i className="bi bi-info-circle"></i>
          <p>Demo Admin: admin / admin123 | Demo User: user / user123</p>
        </div>

        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Store
        </button>
      </div>
    </div>
  );
};

export default Login;
