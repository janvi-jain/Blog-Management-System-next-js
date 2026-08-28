"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiFileText, FiPlusCircle, FiFolder, FiSun, FiMoon, } from "react-icons/fi";

export default function Sidebar({ darkMode, toggleDarkMode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <div>
        <h4 className="text-white text-center fw-bold mb-4 px-3">
          DevJournal
        </h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/dashboard" className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}>
              <FiHome className="me-2" />
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/blogs" className={`nav-link ${pathname === "/blogs" ? "active" : ""}`}>
              <FiFileText className="me-2" />
              All Blogs
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/categories" className={`nav-link ${pathname === "/categories" ? "active" : ""}`}>
              <FiFolder className="me-2" />
              Categories
            </Link>
          </li>

          <li className="nav-item">
            <button className="nav-link text-start w-100 border-0 bg-transparent" onClick={() => router.push("/blogs/add")}>
              <FiPlusCircle className="me-2" />
              Create Blog
            </button>
          </li>
        </ul>
      </div>
      <div className="px-3 mb-4">
        <button onClick={toggleDarkMode} className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2">
          {darkMode ? <FiSun /> : <FiMoon />}
          {darkMode ? " Light Mode" : " Dark Mode"}
        </button>
      </div>
    </div>
  );
}