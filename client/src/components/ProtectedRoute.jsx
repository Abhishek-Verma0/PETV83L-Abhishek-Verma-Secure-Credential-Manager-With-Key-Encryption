import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, authRequired = true }) => {
  const { isAuthenticated } = useAuth();

  //   if route requires the auth and user is not authenticated  redirect him to the login
  if (authRequired && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //  if route is for non authorised user  and user is authenticated then send him to the  dashboard page

  if (!authRequired && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
