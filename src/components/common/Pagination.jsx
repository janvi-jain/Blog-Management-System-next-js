"use client";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">

        <li
          className={`page-item ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
}