import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { useAuth } from '../auth/AuthContext'
import { register } from '../service/auth'
import "../styles/register.css"
import "../styles/responsive.css"

const Popup = ({ contentType, onClose }) => {
  if (!contentType) return null;

  const content = {
    terms: (
      <>
        <h3>Terms & Conditions</h3>
        <h4>Acceptance of Terms</h4>
        <p>Users agree to your rules by using the platform.</p>

        <h4>Eligibility</h4>
        <p>Who can use the service? (age restrictions, legal capacity)</p>

        <h4>Account Responsibilities</h4>
        <p>User must keep login secure, not share credentials, accurate info only.</p>

        <h4>User Conduct</h4>
        <p>What is allowed/not allowed? No hacking, no harassment, no spam, etc.</p>

        <h4>Intellectual Property</h4>
        <p>What content do you own? What rights users have or don’t have on your content?</p>

        <h4>Service Availability</h4>
        <p>You don’t guarantee 100% uptime; you can modify or suspend the service.</p>

        <h4>Termination</h4>
        <p>When and how you can terminate user accounts.</p>

        <h4>Disclaimers and Limitation of Liability</h4>
        <p>You’re not responsible for damages caused by using your service, to the extent allowed by law.</p>

        <h4>Changes to Terms</h4>
        <p>How and when you can update the T&C, and how users are notified.</p>

        <h4>Governing Law</h4>
        <p>What jurisdiction governs the terms.</p>
      </>
    ),
    privacy: (
      <>
        <h3>Privacy Policy</h3>
        <h4>Data Collection</h4>
        <p>What data you collect (personal info, usage data, cookies, etc.)</p>

        <h4>Purpose of Data Collection</h4>
        <p>Why you collect it (authentication, analytics, marketing, support, etc.)</p>

        <h4>Data Sharing</h4>
        <p>Who else sees user data? (third parties, legal requests, affiliates)</p>

        <h4>Data Protection</h4>
        <p>How you protect data (encryption, access controls)</p>

        <h4>User Rights</h4>
        <p>Users can access, correct, delete their data, opt out of marketing.</p>

        <h4>Cookies and Tracking</h4>
        <p>Use of cookies or other tracking tech.</p>

        <h4>Data Retention</h4>
        <p>How long you keep data.</p>

        <h4>Children’s Privacy</h4>
        <p>Compliance with COPPA or local laws about minors.</p>

        <h4>International Transfers</h4>
        <p>If data crosses borders, how it’s protected.</p>

        <h4>Policy Changes</h4>
        <p>How you notify users about privacy policy updates.</p>
      </>
    ),
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-container"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          className="popup-close-btn"
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>
        {content[contentType]}
      </div>
    </div>
  );
};

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const [agreeTerms, setAgreeTerms]=useState(false);
    const [showContent, setShowContent] = useState(null); // null | 'terms' | 'privacy'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!agreeTerms) {
        setError("Please agree to the Terms of Use & Privacy Policy");
        return;
        }
        try {
            await register(formData.username, formData.email, formData.password);
            setSuccess("Registration successful! Redirecting to login...");
            //  wait 2 sec then redirect
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
        catch (err) {
            setError(err.message || "Failed to register");
        }
    };


  return (
      <div className='auth-container'>
          <div className='auth-box'>
              <div className="auth-header">
                <img src="/lock-icon.svg" alt="SecureCred" className="site-logo" />
                <div className="site-titles">
                  <h1 className="site-title">SecureCred</h1>
                  <p className="site-subtitle">Credential manager with key encryption</p>
                </div>
              </div>
              <h2>Create your account</h2>
              {error && <div className='error-alert'>{error}</div>}
              {success && <div className='success-alert'>{success}</div>}
              
              <form onSubmit={handleSubmit} >
                  <FormInput
                      label='Username at least 5 character long'
                      value={formData.username}
                      onChange={handleChange}
                      name="username"
                      required
                  />

                  <FormInput label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      required 
                  />

                  <FormInput label="Password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      required
                  />

                  <FormInput label="Confirm Password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      name="confirmPassword"
                      required
                  />

                  <Button type='submit' fullwidth>
                      Register
                  </Button>

              </form>

              <p className='auth-link'>
                  Already have an account? <Link to="/login">Login</Link>
              </p>

            <div className="termsandconditions">
                <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}/>
                <label className="terms">
                    By continuing, I agree to the
                    <button className="link" onClick={() => setShowContent('terms')}>Terms of Use</button>{' '}&{' '}
                    <button className="link" onClick={() => setShowContent('privacy')}>Privacy Policy</button>
                </label>
            </div>
          </div>
          <Popup contentType={showContent} onClose={() => setShowContent(null)} />
    </div>
  )
}

export default Register