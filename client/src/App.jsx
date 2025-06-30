import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
const App = () => {
  return (
    <Router>
      <div className="app">

        
        <Navbar />
        <Routes>
          <Route path="/" />
          {/* <Route path="/login" />
          <Route path="/register" /> */}
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
