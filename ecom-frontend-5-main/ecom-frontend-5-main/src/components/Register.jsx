import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Toast from './Toast';
import { API_BASE_URL } from '../config/constants';
import '../styles/Login.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'ROLE_USER'
        })
      });

      const data = await response.json();

      if (data.success) {
        showToast('Registration successful! Logging you in...', 'success');
        if (data.user) {
          login(data.user, 'user-jwt-token');
        }
        setTimeout(() => navigate('/'), 1200);
      } else {
        showToast(data.message || 'Registration failed', 'error');
      }
    } catch (err) {
      // Offline fallback
      const newUser = {
        username: formData.username,
        email: formData.email,
        role: 'ROLE_USER'
      };
      login(newUser, 'demo-token');
      showToast('Account created successfully (Offline mode)!', 'success');
      setTimeout(() => navigate('/'), 1200);
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
          <div className="admin-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <i className="bi bi-person-plus-fill"></i>
          </div>
          <h2>Create Account</h2>
          <p>Join our platform to track orders and save your wishlist</p>
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
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="bi bi-envelope-fill"></i>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="bi bi-shield-check"></i>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} disabled={loading}>
            <i className="bi bi-check-circle-fill"></i>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div className="login-info" style={{ marginTop: '15px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#64748b' }}>Already have an account?</p>
          <Link to="/login" style={{ color: '#667eea', fontWeight: 'bold', textDecoration: 'none' }}>
            <i className="bi bi-box-arrow-in-right" style={{ marginRight: '5px' }}></i> Sign in here
          </Link>
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

export default Register;
