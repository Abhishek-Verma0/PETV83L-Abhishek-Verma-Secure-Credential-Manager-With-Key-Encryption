import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../auth/AuthContext";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const handleLogout = () => {
    logout();
    setShowLogoutModal(false); // close modal
    navigate("/login"); // redirect to login page
  };
  
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>🔐 SecureCreds</Link>
        </div>

        <div className="nav-menu">
          {isAuthenticated ? (
            <div className="nav-authenticated">
              <ThemeToggle />
              <Link to="/mfa" className="nav-link">
                🔐 MFA Settings
              </Link>
              <Button onClick={() => setShowLogoutModal(true)} variant="secondary">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <ThemeToggle />
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
              
            </>
          )}
        </div>
      </nav>
      
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)} // click outside closes modal
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2>Are you sure you want to log out?</h2>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
     )}
    </>
  );
};

export default Navbar;
