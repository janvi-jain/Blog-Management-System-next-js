"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="app-layout">
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="main-content">
        <Navbar />
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}