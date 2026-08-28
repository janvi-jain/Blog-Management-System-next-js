import Link from "next/link";
import "@/app/globals.css";

export default function NotFound() {
  return (
    <div className="container d-flex justify-content-center align-items-center not-found-container">
      <div className="text-center p-5 shadow rounded-4 not-found-card">
        <div className="mx-auto mb-4 d-flex justify-content-center align-items-center rounded-circle not-found-icon">
          📄
        </div>

        <h1 className="fw-bold text-primary mb-2 not-found-title">
          404
        </h1>

        <h3 className="fw-bold">
          Oops! Page Not Found
        </h3>

        <p className="text-muted mt-3">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link href="/" className="btn btn-primary px-4">
            Dashboard
          </Link>

          <Link href="/blogs" className="btn btn-outline-primary px-4">
            All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}