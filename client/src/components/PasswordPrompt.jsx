import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import FormInput from "./forminput";
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
      //  close the prompt after showin success message
      setTimeout(() => {
        setSuccess(false);
        onCancel();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to verify password. Pleaase try again.");
      //  auto-clear error message after 3 sec
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
        <h3>Enter Your Password</h3>
        <p>Please enter your password to {action} this credential securely. </p>
        {error && (
          <div
            className="error-alert"
            style={{
              margin: "10px 0",
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: "#ffebee",
              color: "#c62828",
              border: "1px solid #ffcdd2",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div className="success-alert">Password verified successfully!</div>
        )}

        <form onSubmit={handleSubmit}>
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