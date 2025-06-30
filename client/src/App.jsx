import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Landing from "./pages/Landing";
const App = () => {
  return (
    <Router>
      <div className="app">

        
        <Navbar />
        <Landing/>
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
