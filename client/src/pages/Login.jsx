import React, { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import MFAVerification from "../components/MFAVerification";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {login} from "../service/auth"
import "../styles/login.css"
import "../styles/responsive.css"

const Login = () => {
  
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
    const [error, setError] = useState("");
    const [showMFA, setShowMFA] = useState(false);
    const [mfaData, setMfaData] = useState(null);
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
      try {
        const response = await login(
          formData.username,
          formData.password
        );

        // Check if MFA is required
        if (response.requiresMFA) {
          setMfaData({
            preAuthToken: response.preAuthToken,
            mfaMethod: response.mfaMethod,
            destination: response.destination,
            username: formData.username,
            email: response.email || formData.username
          });
          setShowMFA(true);
        } else {
          // Direct login for users without MFA
          authLogin(response.token, response.user.id, response.user);
        }
      } catch (err) {
        setError(err.message || "Failed to login");
      }
    };

    const handleMFASuccess = (verificationResponse) => {
      authLogin(verificationResponse.token, verificationResponse.user.id, verificationResponse.user);
    };

    const handleMFACancel = () => {
      setShowMFA(false);
      setMfaData(null);
      setFormData({ username: "", password: "" });
    };

    if (showMFA && mfaData) {
      return (
        <MFAVerification
          preAuthToken={mfaData.preAuthToken}
          mfaMethod={mfaData.mfaMethod}
          destination={mfaData.destination}
          username={mfaData.username}
          email={mfaData.email}
          onVerificationSuccess={handleMFASuccess}
          onCancel={handleMFACancel}
        />
      );
    }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="btn-full" fullWidth>
            Login
          </Button>
        </form>
        
        <div className="auth-links">
          <Link to="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
          <span className="auth-separator">•</span>
          <Link to="/register" className="auth-link">
            Create Account
          </Link>
        </div>
        
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
