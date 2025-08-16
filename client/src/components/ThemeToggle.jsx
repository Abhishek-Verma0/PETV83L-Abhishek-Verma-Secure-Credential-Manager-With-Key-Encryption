import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Set on both html and body for maximum compatibility
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Debug log
    console.log('Theme changed to:', isDark ? 'dark' : 'light');
    console.log('HTML data-theme:', document.documentElement.getAttribute('data-theme'));
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      aria-label="Toggle dark mode"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
