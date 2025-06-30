import React from "react";
import {Link} from "react-router-dom"
import '../styles/navbar.css';
const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">SecureCreds</Link>
        </div>

        <div className="nav-menu">
          <Link to="/login" className="btn login-btn">
            Login
          </Link>
          <Link to="/register" className="btn register-btn">
            Register
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
