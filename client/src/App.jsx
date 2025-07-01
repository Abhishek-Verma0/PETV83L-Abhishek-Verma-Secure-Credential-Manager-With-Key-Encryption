import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
const App = () => {
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
            <Route path="/register" element={
              <ProtectedRoute authRequired={false}>
                <Register />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute authRequired={true}>
                <Dashboard/>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
