// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { useAuth } from "../auth/AuthContext";
import {
  getCredentials,
  createCredential,
  deleteCredential,
  getCredential,
} from "../service/credentials";
import PasswordPrompt from '../components/PasswordPrompt';
import ScreenshotPrevention from "../components/ScreenshotPrevention";
import "../styles/screenshotPrevention.css";
import '../styles/dashboard.css';
import '../styles/responsive.css';

const Dashboard = () => {
  const [credentials, setCredentials] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [viewedCredential, setViewedCredential] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newCredential, setNewCredential] = useState({
    title: "",
    username: "",
    password: "",
    website: "",
  });

  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const data = await getCredentials();
      setCredentials(data);
    } catch (err) {
      setError("Failed to load credentials");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (password) => {
    try {
      const credentialData = {
        title: newCredential.title,
        fields: {
          username: newCredential.username || "",
          password: newCredential.password || "",
          website: newCredential.website || "",
        },
      };

      await createCredential(credentialData, password);
      setSuccess("Credential added successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setShowPasswordPrompt(false);
      setShowAddForm(false);
      setNewCredential({
        title: "",
        username: "",
        password: "",
        website: "",
      });
      loadCredentials();
    } catch (err) {
      throw new Error(err.message || "Failed to add credential");
    }
  };

  const handleDelete = async (password) => {
    try {
      await deleteCredential(selectedCredential._id, password);
      setSuccess("Credential deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setShowPasswordPrompt(false);
      setSelectedCredential(null);
      setDeleteMode(false);
      loadCredentials();
    } catch (err) {
      throw new Error(err.message || "Failed to delete credential");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = () => {
    if (!newCredential.title.trim()) {
      setError("Title is required");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setShowPasswordPrompt(true);
  };

  const handleView = async (password) => {
    try {
      const data = await getCredential(selectedCredential._id, password);
      setViewedCredential(data);
      setShowPasswordPrompt(false);
      // Clear viewed credential after 30 seconds for security
      setTimeout(() => setViewedCredential(null), 30000);
    } catch (err) {
      throw new Error(err.message || "Failed to view credential");
    }
  };

  const initiateView = (credential) => {
    setSelectedCredential(credential);
    setShowPasswordPrompt(true);
  };

  const initiateDelete = (credential) => {
    setSelectedCredential(credential);
    setDeleteMode(true);
    setShowPasswordPrompt(true);
  };

  return (
    <div className="dashboard-container">
      <ScreenshotPrevention />
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>Your Secure Credentials</h1>
          <p className="dashboard-subtitle">
            You're viewing your secure vault in {isDarkMode ? 'dark' : 'light'} mode
          </p>
        </div>
      </header>

      {/* Only show non-credential related errors in dashboard */}
      {error && !showPasswordPrompt && (
        <div className="alert alert-error">{error}</div>
      )}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="credentials-section">
        <div className="section-header">
          <h2>{showAddForm ? "Add New Credential" : "Stored Credentials"}</h2>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel" : "Add New"}
          </Button>
        </div>

        {showAddForm && (
          <div className="add-credential-form">
            <div className="form-header">
              <h3>Add New Credential</h3>
              <p>Enter your credential details below</p>
            </div>
            <FormInput
              label="Title"
              name="title"
              value={newCredential.title}
              onChange={handleChange}
              required
              placeholder="e.g., Gmail Account"
            />
            <FormInput
              label="Username/Email"
              name="username"
              value={newCredential.username}
              onChange={handleChange}
              placeholder="e.g., your.email@gmail.com"
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={newCredential.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <FormInput
              label="Website"
              name="website"
              value={newCredential.website}
              onChange={handleChange}
              placeholder="e.g., https://gmail.com"
            />

            <div className="button-group">
              <Button onClick={handleSave} variant="primary">
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setNewCredential({
                    title: "",
                    username: "",
                    password: "",
                    website: "",
                  });
                }}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {showPasswordPrompt && (
          <PasswordPrompt
            onSubmit={
              deleteMode
                ? handleDelete
                : selectedCredential
                ? handleView
                : handleSubmit
            }
            onCancel={() => {
              setShowPasswordPrompt(false);
              setSelectedCredential(null);
              setDeleteMode(false);
            }}
            action={
              deleteMode ? "delete" : selectedCredential ? "view" : "save"
            }
          />
        )}

        <div className="credentials-list">
          {credentials.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔐</div>
              <h3>No credentials stored yet</h3>
              <p>Click "Add New" to get started with SecureCreds!</p>
            </div>
          ) : (
            <div className="credentials-grid">
              {credentials.map((cred) => (
                <div key={cred._id} className="credential-card">
                  <div className="credential-header">
                    <h3>{cred.title}</h3>
                    <div className="credential-meta">
                      <small>Added: {new Date(cred.createdAt).toLocaleDateString()}</small>
                    </div>
                  </div>
                  
                  {viewedCredential && viewedCredential._id === cred._id ? (
                    <div className="credential-details">
                      <div className="detail-item">
                        <strong>Username:</strong>
                        <span>{viewedCredential.fields.username}</span>
                      </div>
                      <div className="detail-item">
                        <strong>Password:</strong>
                        <span className="password-field">{viewedCredential.fields.password}</span>
                      </div>
                      {viewedCredential.fields.website && (
                        <div className="detail-item">
                          <strong>Website:</strong>
                          <span>{viewedCredential.fields.website}</span>
                        </div>
                      )}
                      <div className="auto-hide-notice">
                        <small>This information will hide automatically in 30 seconds</small>
                      </div>
                    </div>
                  ) : null}
                  
                  <div className="button-group">
                    <Button className="btn1" variant="primary" onClick={() => initiateView(cred)}>
                      View
                    </Button>
                    <Button className="btn1" variant="danger" onClick={() => initiateDelete(cred)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
