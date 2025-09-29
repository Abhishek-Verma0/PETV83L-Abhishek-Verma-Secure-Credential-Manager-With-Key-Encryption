import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <label
      style={{
        position: "relative",
        display: "inline-block",
        width: "70px",
        height: "34px",
        cursor: "pointer",
    //    margin: "10px 10px",
      }}
    >
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode((prev) => !prev)}
        style={{ display: "none" }}
      />

      {/* Track */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: darkMode ? "#565368ff" : "#083055ff",
          borderRadius: "34px",
          transition: "0.4s",
        }}
      ></span>

      {/* Icons */}
      <span
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "1rem",
        }}
      >
        ☀️
      </span>
      <span
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "1rem",
        }}
      >
        🌙
      </span>

      {/* Knob */}
      <span
        style={{
          position: "absolute",
          top: "4px",
          left: darkMode ? "38px" : "4px",
          width: "26px",
          height: "26px",
          backgroundColor: "#51a8dbff", // blue knob
          borderRadius: "50%",
          transition: "0.3s",
        }}
      ></span>
    </label>
  );
};

export default ThemeToggle;