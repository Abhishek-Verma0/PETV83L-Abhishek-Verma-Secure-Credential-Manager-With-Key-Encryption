// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Button from "../components/Button";
import '../styles/landingPage.css';
import Footer from "../components/Footer";
import '../styles/responsive.css';

const Landing = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="landing-page">
      {/* hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Secure Credential Manager</h1>
          <p className="tagline">Keep your Password safe and secure</p>
          <div className="land-btn">
            <Link to="/register">
              <Button variant="primary" size="large">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="large">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* about section */}
      <section id="about" className="about-section">
        <div className="section-content">
          <h2>Why Choose Secure-Creds?</h2>
          <p>
            In today's digital world, managing passwords securely is more
            important than ever. SecureCreds provides a robust, user-friendly
            solution to keep your credentials safe while maintaining easy access
            when you need them.
          </p>
        </div>
      </section>

      {/* feature section */}
      <section id="features" className="features-section">
        <div className="features-content">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🔒 End-to-End Encryption</h3>
              <p>Your credentials are encrypted and only accessible by you</p>
            </div>
            <div className="feature">
              <h3>⚡ Quick Access</h3>
              <p>Securely access your credentials whenever you need them</p>
            </div>
            <div className="feature">
              <h3>🛡️ Zero Knowledge</h3>
              <p>We never store your master password or decrypted data</p>
            </div>
            <div className="feature">
              <h3>📱 Cross-Platform</h3>
              <p>Access your credentials from any device, anywhere</p>
            </div>
            <div className="feature">
              <h3>🌙 Dark Mode Support</h3>
              <p>
                Enjoy a comfortable viewing experience with our {isDarkMode ? 'beautiful dark' : 'sleek light'} theme. 
                Switch anytime with the toggle in the navbar!
              </p>
            </div>
            <div className="feature">
              <h3>🔄 Real-time Sync</h3>
              <p>Your data stays synchronized across all your devices</p>
            </div>
          </div>
        </div>
      </section>

      {/* security section */}
      <section className="security-section">
        <div className="security-content">
          <h2>Bank-Grade Security</h2>
          <div className="security-points">
            <div className="security-point">
              <h3>🔐 AES-256 Encryption</h3>
              <p>Military-grade encryption for your sensitive data</p>
            </div>
            <div className="security-point">
              <h3>🔍 Regular Security Audits</h3>
              <p>Continuous monitoring and security updates</p>
            </div>
            <div className="security-point">
              <h3>👤 Two-Factor Authentication - Coming Soon</h3>
              <p>Extra layer of security for your account</p>
            </div>
          </div>
        </div>
      </section>

      {/* contact section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <h2>Get in Touch</h2>
          <p>
            Have questions? We're here to help! Contact our support team for
            assistance.
          </p>
          <Link to="/register">
            <Button variant="primary" size="large">
              Start Securing Your Passwords
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
