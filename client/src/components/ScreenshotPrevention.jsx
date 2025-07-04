import React, { useEffect } from "react";

const ScreenshotPrevention = () => {
  // Prevention logic temporarily disabled for testing
  /*
  useEffect(() => {
    // Prevent screen capture
    const style = document.createElement("style");
    style.textContent = `
      .screenshot-protected {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      
      .screenshot-protected * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
    `;
    document.head.appendChild(style);

    // Add meta tag to prevent screen capture
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, user-scalable=no";
    document.head.appendChild(meta);

    // Prevent print screen
    const handleKeyDown = (e) => {
      if (
        (e.key === "PrintScreen") ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "p") ||
        (e.ctrlKey && e.shiftKey && e.key === "P")
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(meta);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  */

  return null;
};

export default ScreenshotPrevention;
