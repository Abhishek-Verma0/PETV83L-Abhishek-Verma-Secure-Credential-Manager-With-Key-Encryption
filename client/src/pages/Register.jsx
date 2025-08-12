// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useAuth } from '../auth/AuthContext';
import { register } from '../service/auth';
import "../styles/register.css";
import "../styles/responsive.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join SecureCreds to secure your digital life</p>
        </div>
        
        {error && <div className='alert alert-error'>{error}</div>}
        {success && <div className='alert alert-success'>{success}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label='Username (at least 5 characters)'
            value={formData.username}
            onChange={handleChange}
            name="username"
            placeholder="Choose a username"
            minLength={5}
            required
          />

          <FormInput 
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter your email address"
            required 
          />

          <FormInput 
            label="Password (minimum 8 characters)"
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="Create a strong password"
            minLength={8}
            required
          />

          <FormInput 
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            placeholder="Confirm your password"
            required
          />

          <Button 
            type='submit' 
            fullwidth 
            disabled={isLoading}
            className="auth-submit-btn"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="auth-footer">
          <p className='auth-link'>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
