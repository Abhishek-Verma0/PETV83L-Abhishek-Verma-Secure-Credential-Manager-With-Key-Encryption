import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../auth/AuthContext";
import Button from "./Button";
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const handleLogout = () => {
    logout();
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
              <Link to="/mfa" className="nav-link">
                🔐 MFA Settings
              </Link>
              <Button onClick={handleLogout} variant="secondary">
                Logout
              </Button>
            </div>
          ) : (
            <>
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
    </>
  );
};

export default Navbar;
