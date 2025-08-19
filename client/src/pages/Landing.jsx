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
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Secure Credential Manager</h1>
            <p className="tagline">Protect and access your passwords with bank-grade security.</p>
            <p className="hero-sub">Store login details, generate strong passwords, and share credentials securely when needed — all encrypted locally on your device.</p>
            <ul className="hero-highlights">
              <li>End-to-end encryption</li>
              <li>Zero-knowledge architecture</li>
              <li>Quick, cross-device access</li>
              <li>Secure sharing (optional)</li>
              <li>Built-in password generator</li>
            </ul>

            <div className="land-btn">
              <Link to="/register">
                <Button variant="primary" size="large">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="large">Login</Button>
              </Link>
            </div>
          </div>

          <div className="hero-illustration" aria-hidden>
            {/* decorative illustration: subtle dashboard mock */}
            <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" role="img">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#6dd3ff" />
                  <stop offset="100%" stopColor="#4b6cb7" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="400" rx="18" fill="url(#g1)" opacity="0.12" />
              <rect x="32" y="40" width="536" height="320" rx="12" fill="#ffffff" opacity="0.95" />
              <rect x="56" y="76" width="160" height="24" rx="6" fill="#eef3fb" />
              <rect x="56" y="110" width="460" height="12" rx="6" fill="#f6f9ff" />
              <rect x="56" y="134" width="460" height="12" rx="6" fill="#f6f9ff" />
              <rect x="56" y="158" width="460" height="12" rx="6" fill="#f6f9ff" />
              <rect x="56" y="196" width="220" height="120" rx="8" fill="#f2f6ff" />
              <rect x="292" y="196" width="220" height="120" rx="8" fill="#eef3fb" />
            </svg>
          </div>
        </div>
      </section>

      {/* about section */}
      <section id="about" className="about-section">
        <div className="section-content">
          <h2>Why Choose Secure-Creds?</h2>
          <p>
            In today's digital world, managing passwords securely is essential. SecureCreds provides a user-first
            experience with strong cryptography and convenient access when you need it.
          </p>
        </div>
      </section>

      {/* feature section */}
      <section id="features" className="features-section">
        <div className="features-content">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature accent">
              <div className="feature-icon">🔒</div>
              <div className="feature-body">
                <div className="feature-head">
                  <h3>End-to-End Encryption</h3>
                  <span className="badge">Popular</span>
                </div>
                <p>Your credentials are encrypted locally and never shared in plaintext.</p>
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
                <p>Only you can decrypt your data  we can't read it for you.</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">📱</div>
              <div className="feature-body">
                <h3>Cross-Platform</h3>
                <p>Access from desktop or mobile  your data follows you securely.</p>
                <div className="feature-actions">
                  <Link to="/register" className="feature-cta">Get started</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* security section */}
  <section id="security" className="security-section">
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

      {/* contact / CTA section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <div className="cta-card" role="region" aria-label="Start securing your passwords">
            <div className="cta-copy">
              <h2>Secure your passwords in minutes</h2>
              <p className="lead">Create an encrypted vault protected by your master password — only you can decrypt it.</p>

              <div className="cta-actions">
                <Link to="/register">
                  <Button variant="primary" size="large">Create free account</Button>
                </Link>

                <Link to="/login" className="cta-secondary" role="button">Learn more</Link>
              </div>

              <div className="trust-row">
                <span className="trust-badge"><strong>🔒</strong> AES-256</span>
                <span className="trust-badge"><strong>🔐</strong> Zero-knowledge</span>
                <span className="trust-badge"><strong>�</strong> Cross-platform</span>
              </div>
            </div>

            <div className="cta-visual" aria-hidden>
              <div className="mini-panel">
                <div className="mini-header">Vault preview</div>
                <div className="mini-rows">
                  <div className="mini-row">
                    <div className="mini-line" />
                    <div className="mini-dot small" />
                  </div>
                  <div className="mini-row">
                    <div className="mini-line short" />
                    <div className="mini-dot" />
                  </div>
                  <div className="mini-row">
                    <div className="mini-line" />
                    <div className="mini-dot" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
