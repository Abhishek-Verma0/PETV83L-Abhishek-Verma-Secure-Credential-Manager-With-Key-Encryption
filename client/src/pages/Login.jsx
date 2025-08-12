import React, { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {login} from "../service/auth"
import "../styles/login.css"
import "../styles/responsive.css"

const Login = () => {
  
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
    const [error, setError] = useState("");
    const { login: authLogin } = useAuth();
    const [agreeTerms, setAgreeTerms]=useState(false);
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
      if (!agreeTerms) {
        setError("Please agree to the Terms of Use & Privacy Policy");
        return;
      }
      try {
        const { token, userId } = await login(
          formData.username,
          formData.password
        );
        authLogin(token, userId);
      } catch (err) {
        setError(err.message || "Failed to login");
      }
    };
  

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <div class="termsandconditions">
           <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}/>
           <label for="terms">
              By continuing, I agree to the
              <span class="link">Terms of Use </span> &
              <span class="link"> Privacy Policy</span>
            </label> 
          </div>
      </div>
    </div>
  );
};

export default Login;
