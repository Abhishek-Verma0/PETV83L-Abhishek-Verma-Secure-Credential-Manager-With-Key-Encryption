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
    const userInfo = localStorage.getItem("userInfo");

    if (token && userId) {
      const parsedUserInfo = userInfo ? JSON.parse(userInfo) : {};
      setUser({ 
        token, 
        userId, 
        ...parsedUserInfo 
      });
      // if user logged in and on anyother route redirect him to dashboard
      if (["/", "/login", "/register"].includes(location.pathname) && location.pathname !== "/dashboard") {
        navigate("/dashboard");
      }
    } else if (location.pathname === "/dashboard" || location.pathname === "/mfa") {
      // if no any token or it is expired then send to login page
      navigate("/login");
    }
    setLoading(false);
  }, [navigate, location]);

  const login = (token, userId, userInfo = {}) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setUser({ 
      token, 
      userId, 
      ...userInfo 
    });
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const updateUserInfo = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setUser(prev => ({ ...prev, ...userInfo }));
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
    updateUserInfo,
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