// src/main.jsx
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext"; // Make sure this import is correct

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
