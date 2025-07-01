import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // see if token exsist or is valid

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      setUser({ token, userId });
      // if user logged in and on anyother route redirect him to dashboard
      if (["/", "/login", "/register"].includes(location.pathname)) {
        navigate("/dashboard");
      }
    } else if (location.pathname === "/dashboard") {
      // if no any token or it is expired then send to login page
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

  //prevent rendder till authorisation is done
  if (loading) {
    return <div className="loading">Loading...</div>;
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
}

export default AuthContext