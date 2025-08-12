// src/components/PasswordPrompt.jsx
import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import FormInput from "./FormInput";
import Button from "./Button";
import "../styles/passwordPrompt.css";

const PasswordPrompt = ({ onSubmit, onCancel, action = "save" }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { startCredentialViewTimer } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    setIsVerifying(true);
    setError("");
    try {
      await onSubmit(password);
      setPassword("");
      setSuccess(true);
      // close the prompt after showing success message
      setTimeout(() => {
        setSuccess(false);
        onCancel();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to verify password. Please try again.");
      // auto-clear error message after 3 sec
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCancel = () => {
    setPassword("");
    setError("");
    setSuccess(false);
    onCancel("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Enter Your Password</h3>
          <p>Please enter your password to {action} this credential securely.</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            Password verified successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="password-form">
          <FormInput
            label="Your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <div className="button-group">
            <Button
              type="submit"
              variant="primary"
              disabled={isVerifying || success}
            >
              {isVerifying ? "Verifying..." : "Confirm"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isVerifying || success}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPrompt;
