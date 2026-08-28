"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/common/Pagination"

export default function RecentPosts({ blogs }) {
  const [page, setPage] = useState(1);

  const perPage = 4;

  const recent = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.publishDate) -
        new Date(a.publishDate)
    );

  const totalPages = Math.ceil(recent.length / perPage);

  const start = (page - 1) * perPage;

  const currentBlogs = recent.slice(
    start,
    start + perPage
  );

  return (
    <div className="card border-0 shadow-sm bg-card">
      <div className="card-body">
        <h5 className="fw-bold mb-4">
          Recent Activity
        </h5>

        {currentBlogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`} className="text-decoration-none">
            <div className="d-flex gap-3 mb-3 pb-3 border-bottom">

              <img src={blog.image} alt={blog.title} width={60} height={60} className="rounded" style={{ objectFit: "cover" }} />

              <div className="flex-grow-1">
                <h6 className="mb-1 blog-content" style={{ fontSize: "15px" }}>
                  {blog.title}
                </h6>

                <small className="text-muted">
                  {new Date(
                    blog.publishDate
                  ).toLocaleDateString()}
                </small>
              </div>
            </div>
          </Link>
        ))}

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            setCurrentPage={setPage}
          />
        )}

      </div>
    </div>
  );
}