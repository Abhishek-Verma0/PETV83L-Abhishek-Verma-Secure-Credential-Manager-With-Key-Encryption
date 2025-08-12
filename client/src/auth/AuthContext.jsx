// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      setUser({ token, userId });
      if (["/", "/login", "/register"].includes(location.pathname) && location.pathname !== "/dashboard") {
        navigate("/dashboard");
      }
    } else if (location.pathname === "/dashboard") {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate, location]);

  const login = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setUser({ token, userId });
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Auth provider");
  }
  return context;
};

export default AuthContext;
