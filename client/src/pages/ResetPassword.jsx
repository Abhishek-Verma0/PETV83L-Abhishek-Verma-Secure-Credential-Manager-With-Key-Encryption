import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FormInput from '../components/forminput';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');
    
    if (!tokenParam || !emailParam) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }
    
    setToken(tokenParam);
    setEmail(emailParam);
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        email,
        newPassword: formData.newPassword,
      });

      setMessage(response.data.message);
      
      // Show MFA disabled notice if applicable
      if (response.data.mfaDisabled) {
        setMessage(prev => prev + ' Your Multi-Factor Authentication has been disabled for security purposes.');
      }

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Invalid Reset Link</h2>
          <div className="error-alert">
            This password reset link is invalid or has expired. Please request a new password reset.
          </div>
          <div className="auth-links">
            <Link to="/forgot-password" className="auth-link">
              Request New Reset Link
            </Link>
            <span className="auth-separator">•</span>
            <Link to="/login" className="auth-link">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        <p className="auth-description">
          Enter your new password below.
        </p>

        {error && <div className="error-alert">{error}</div>}
        {message && (
          <div className="success-alert">
            {message}
            <br />
            <small>Redirecting to login page...</small>
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit}>
            <FormInput
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Enter new password"
            />
            
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Confirm new password"
            />
            
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}

        <div className="auth-links">
          <Link to="/login" className="auth-link">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
