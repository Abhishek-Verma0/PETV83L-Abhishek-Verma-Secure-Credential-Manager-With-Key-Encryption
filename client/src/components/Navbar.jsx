// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../auth/AuthContext";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>🔐 SecureCreds</Link>
        </div>

        <div className="nav-menu">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
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
