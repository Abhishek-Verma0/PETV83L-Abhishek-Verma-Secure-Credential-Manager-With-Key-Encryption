
import ReactDOM from "react-dom/client";
import  { StrictMode } from "react";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

<button 
    onClick={toggleTheme} 
    style={{ 
        padding: "8px 12px", 
        cursor: "pointer", 
        backgroundColor: theme === "light" ? "#3498db" : "#2c3e50", 
        color: "#fff", 
        border: "none", 
        borderRadius: "4px", 
        transition: "background-color 0.3s ease" 
    }}
>
    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>
