import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setEmail(''); // Clear form on success
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <img src="/lock-icon.svg" alt="logo" className="site-logo" />
          <div className="site-titles">
            <p className="site-title">Secure Credential Manager</p>
            <p className="site-subtitle">Manage secrets safely</p>
          </div>
        </div>
        <h2>Forgot Password</h2>
        <p className="auth-description">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && <div className="error-alert">{error}</div>}
        {message && <div className="success-alert">{message}</div>}

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 8}}>
            <Button type="submit" className="btn-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>
        <div className="auth-links lr-links">
          <Link to="/login" className="auth-link left-link">
            ← Back to Login
          </Link>
          <Link to="/register" className="auth-link right-link">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
