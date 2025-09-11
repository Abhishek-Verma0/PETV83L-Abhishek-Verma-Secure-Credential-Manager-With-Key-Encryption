import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MFAPage from "./pages/MFAPage";
import QRCodeTest from "./components/QRCodeTest";
import SimpleQRTest from "./components/SimpleQRTest";
import MFATestPage from "./components/MFATestPage";
import QuickLogin from "./components/QuickLogin";
import './styles/responsive.css'
import BackToTopButton from "./components/BackToTopButton";

const App = () => {
  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute authRequired={false}>
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute authRequired={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute authRequired={false}>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute authRequired={false}>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute authRequired={false}>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute authRequired={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mfa"
              element={
                <ProtectedRoute authRequired={true}>
                  <MFAPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test-qr"
              element={<QRCodeTest />}
            />
            <Route
              path="/simple-qr"
              element={<SimpleQRTest />}
            />
            <Route
              path="/mfa-test"
              element={<MFATestPage />}
            />
            <Route
              path="/quick-login"
              element={<QuickLogin />}
            />
            {/* redirecting all unknown route to dashboard if logged in  if not logged in redirect to landing */}
            <Route
              path="*"
              element={
                <ProtectedRoute authRequired={false}>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              }
            />
          </Routes>
           {/* <-- Floating Back to Top button for all pages --> */}
          <BackToTopButton />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
