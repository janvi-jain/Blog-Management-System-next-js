"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [today, setToday] = useState("");
  
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB")
    );
  }, []);

  return (
    <nav className="navbar shadow-sm px-4 d-flex justify-content-between align-items-center bg-card blog-content">
      <div>
        <h4 className="m-0 fw-bold blog-content">
          Dashboard
        </h4>

        <small className="text-muted">
          Manage your blogs
        </small>
      </div>

      <span className="badge bg-primary px-3 py-2">
        {today}
      </span>
    </nav>
  );
}