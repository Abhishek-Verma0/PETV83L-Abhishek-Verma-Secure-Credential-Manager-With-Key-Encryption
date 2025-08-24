import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Button from "../components/Button";
import '../styles/landingPage.css';
import Footer from "../components/Footer";
import '../styles/responsive.css'

const Landing = () => {
  const location = useLocation();

  useEffect(() => {
    // scroll after navigation if state was provided
    const scrollToId = location.state && location.state.scrollTo;
    const hash = location.hash ? location.hash.replace('#', '') : null;
    const id = scrollToId || hash;
    if (id) {
      // small timeout to allow rendering and layout
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // clear history state so repeated hits don't re-scroll
        try { window.history.replaceState({}, document.title, window.location.pathname + window.location.search); } catch(e) {}
      }, 120);
    }
  }, [location]);

  return (
    <div className="landing-page">
      {/* hero */}
      <section className="hero-section" style={{ background: "var(--hero-gradient)" }}>
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Secure Credential Manager</h1>
            <p className="tagline">Protect and access your passwords with bank-grade security.</p>
            <p className="hero-sub">Store login details, generate strong passwords, and share credentials securely when needed — all encrypted locally on your device.</p>
            <div className="land-btn">
              <Link to="/register">
                <Button variant="primary" size="large">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="large">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* about section */}
      <section id="about" className="about-section" style={{ background: "var(--hero-gradient)" }}>
        <div className="section-content">
          <h2>Why Choose Secure-Creds?</h2>
          <p>
            In today's digital world, managing passwords securely is essential. SecureCreds provides a user-first
            experience with strong cryptography and convenient access when you need it.
          </p>
        </div>
      </section>

      {/* feature section */}
      <section id="features" className="features-section" style={{ background: "var(--hero-gradient)" }}>
        <div className="features-content">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature accent">
              <div className="feature-icon">🔒</div>
              <div className="feature-body">
                <div className="feature-head">
                  <h3>Full Encryption</h3>
                  <span className="badge">Popular</span>
                </div>
                <p>Your credentials are encrypted locally and never shared</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">⚡</div>
              <div className="feature-body">
                <h3>Fast Access</h3>
                <p>Retrieve your credentials quickly with minimal friction.</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <div className="feature-body">
                <h3>Zero Knowledge</h3>
                <p>Only you can decrypt your data — we can't read it for you.</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">📱</div>
              <div className="feature-body">
                <h3>Cross-Platform</h3>
                <p>Access from desktop or mobile — your data follows you securely.</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* security section */}
      <section id="security" className="security-section" style={{ background: "var(--hero-gradient)" }}>
        <div className="security-content">
          <h2>Bank-Grade Security</h2>
          <div className="security-points">
            <div className="security-point">
              <div className="security-icon">🔐</div>
              <div className="security-body">
                <h3>AES-256 Encryption</h3>
                <p>Industry-standard AES-256 encryption applied to all stored credentials for strong confidentiality.</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>

            <div className="security-point">
              <div className="security-icon">🔍</div>
              <div className="security-body">
                <h3>Continuous Audits</h3>
                <p>Regular security reviews and updates ensure the protection mechanisms stay current and robust.</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>

            <div className="security-point">
              <div className="security-icon">🔑</div>
              <div className="security-body">
                <h3>Two-Factor Ready</h3>
                <p>Support for multi-factor authentication to add an extra layer of account protection when enabled.</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned contact / CTA section */}
      <section id="contact" className="contact-section" style={{ background: "var(--hero-gradient)" }}>
        <div className="contact-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "340px", padding: "2.5rem 1rem" }}>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.7rem", color: "var(--secondary-color)" }}>Ready to Secure Your Digital Life?</h2>
          <p className="lead" style={{ fontSize: "1.18rem", color: "var(--muted-text)", marginBottom: "1.5rem", maxWidth: 540, textAlign: "center" }}>
            Create your encrypted vault in minutes. Your passwords, notes, and credentials are protected with bank-grade security — and only you can access them.
          </p>
          <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link to="/register">
              <Button variant="primary" size="large">Create Free Account</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="large">Login</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );

};
export default Landing;
