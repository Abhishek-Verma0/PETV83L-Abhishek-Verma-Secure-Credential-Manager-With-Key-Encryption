// src/pages/Login.jsx
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { login } from "../service/auth";
import "../styles/login.css";
import "../styles/responsive.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin } = useAuth();

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
    setIsLoading(true);
    
    try {
      const { token, userId } = await login(
        formData.username,
        formData.password
      );
      authLogin(token, userId);
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your SecureCreds account</p>
        </div>
        
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label="Username or Email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username or email"
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <Button 
            type="submit" 
            fullwidth 
            disabled={isLoading}
            className="auth-submit-btn"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        <div className="auth-footer">
          <p className="auth-link">
            Don't have an account? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
