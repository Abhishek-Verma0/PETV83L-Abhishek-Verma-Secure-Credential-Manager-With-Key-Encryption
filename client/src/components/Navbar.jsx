import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../auth/AuthContext";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleScroll = (id) => {
    // If already on landing page, scroll to section
    if (location.pathname === '/' || location.pathname === '/landing') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMobileOpen(false);
        return;
      }
    }

    // Otherwise, navigate to landing and pass the id in state so landing can scroll
    navigate('/', { state: { scrollTo: id } });
    setMobileOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <div className="nav-logo">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="brand">
            <span className="brand-icon" aria-hidden>
              <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1a4 4 0 00-4 4v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-2V5a4 4 0 00-4-4zm-2 7V5a2 2 0 114 0v3h-4z" />
              </svg>
            </span>
            <span className="brand-text">SecureCreds</span>
          </Link>
        </div>

        <button
          className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
          aria-controls="primary-navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className="hamburger" />
        </button>

        <div ref={menuRef} className={`nav-menu ${mobileOpen ? 'open' : ''}`} id="primary-navigation">
          <div className="nav-left">
            <ThemeToggle />
            {!isAuthenticated && (
              <>
                <button type="button" className="nav-link" onClick={() => handleScroll('security')}>Security</button>
                <button type="button" className="nav-link" onClick={() => handleScroll('about')}>Features</button>
              </>
            )}
          </div>

          <div className="nav-right">
            {isAuthenticated ? (

                <div className="nav-authenticated">
                  <div className="nav-authenticated-actions">
                    <NavLink to="/dashboard" className="nav-link" onClick={() => setMobileOpen(false)}>Dashboard</NavLink>
                    <NavLink to="/mfa" className="nav-link" onClick={() => setMobileOpen(false)}>MFA Settings</NavLink>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
            ) : (
              <div className="nav-unauthenticated">
                <Link to="/login" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-secondary" onClick={() => setMobileOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
