import React from "react";
import "../styles/footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>SecureCreds</h3>
          <p>
            Your trusted partner in credential management. Keeping your digital
            life secure and organized.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧 neeleshabhishek01@gmail.com</p>
          <p>📱 +91 12545 67890</p>
          <p>🌍 Lovely Professional University ,Phagwara , Punjab</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} SecureCreds. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
