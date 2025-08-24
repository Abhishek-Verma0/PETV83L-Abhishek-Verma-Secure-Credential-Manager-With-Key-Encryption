import React from "react";
import "../styles/footer.css";

const Icon = ({ name, size = 20 }) => {
  const common = {
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": true,
  };
  switch (name) {
    case "github":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.8 1.9 1.2.6 1 .1 1.9 0 2.1a8.8 8.8 0 01-6.4-3.2c-.5-.8-.9-1.8-.9-3A8 8 0 017 6.7a7.6 7.6 0 01.2-1.6s.6-.2 2 0a7.1 7.1 0 014 0c1.4-.2 2-.1 2-.1a7.6 7.6 0 01.2 1.6 8 8 0 012.1 5.9c0 1.2-.4 2.2-.9 3a8.8 8.8 0 01-6.4 3.2c0 .3 0 .7 0 1v.7c0 .3.2.6.8.5A12 12 0 0012 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4.98 3.5a2.5 2.5 0 11.001 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.7-1.8 3.5-1.8 3.7 0 4.4 2.4 4.4 5.6V21H17v-5.1c0-1.2 0-2.7-1.6-2.7-1.6 0-1.8 1.2-1.8 2.6V21H9z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    default:
      return null;
  }
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Left column */}
        <div className="footer-brand">
          <h3 className="footer-logo">SecureCreds</h3>
          <p className="footer-tagline">
            Protecting your credentials with modern security.
          </p>
          <div className="social-icons">
            <a
              href="https://github.com/AbhishekRajput1601"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icon name="github" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" />
            </a>
            <a href="mailto:neeleshabhishek01@gmail.com" aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </div>

        {/* Middle column */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Right column */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>
            <a href="mailto:neeleshabhishek01@gmail.com">
              neeleshabhishek01@gmail.com
            </a>
          </p>
          <p><a href="tel:+911254567890">+91 12545 67890</a></p>
          <p>Lovely Professional University, Phagwara, Punjab</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>&copy; {year} SecureCreds. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#terms">Terms</a>
          <span className="sep">•</span>
          <a href="#privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
