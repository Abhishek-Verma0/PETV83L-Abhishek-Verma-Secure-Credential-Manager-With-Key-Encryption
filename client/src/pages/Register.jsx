import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { useAuth } from '../auth/AuthContext'
import { register } from '../service/auth'
import "../styles/register.css"
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
              <h2>Register</h2>
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

          </div>
          
    </div>
  )
}

export default Register