"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import SkeletonCard from "@/components/common/SkeletonCard";
import FilterBar from "@/components/blog/FilterBar";
import Pagination from "@/components/common/Pagination";

import {
  fetchBlogs,
  deleteBlog,
} from "@/redux/features/blogs/blogThunk";

export default function Blogs() {
  const dispatch = useDispatch();

  const { blogs, loading } = useSelector((state) => state.blogs);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      const res = await dispatch(deleteBlog(id));

      if (res) {
        toast.success("Blog deleted");
      }
    }
  };

  const filtered = useMemo(() => {
    let data = [...blogs];

    // Search
    data = data.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase())
    );

    // Status Filter
    if (statusFilter !== "All") {
      data = data.filter((blog) => blog.status === statusFilter);
    }

    // Sorting
    switch (sortBy) {
      case "Newest":
        data.sort(
          (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
        );
        break;

      case "Oldest":
        data.sort(
          (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
        );
        break;

      case "A-Z":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "Z-A":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;

      default:
        break;
    }

    return data;
  }, [blogs, search, statusFilter, sortBy]);

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = filtered.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  const totalPages = Math.ceil(filtered.length / blogsPerPage);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">All Blogs</h4>

        <Link
  href="/blogs/add"
  className="btn btn-primary btn-sm px-3"
>
  + New Blog
</Link>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setCurrentPage={setCurrentPage}
        placeholder="Search by title or author..."
      />

      <div className="row">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div className="col-md-4" key={index}>
              <SkeletonCard />
            </div>
          ))
        ) : currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.id}>
              <div className="card post-card h-100 d-flex flex-column">
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.title}
                />

                <div className="card-body d-flex flex-column">

                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-primary bg-opacity-10 text-primary">
                      {blog.category}
                    </span>

                    <span
                      className={`badge ${blog.status === "Published"
                        ? "bg-success"
                        : "bg-warning"
                        }`}
                    >
                      {blog.status}
                    </span>
                  </div>

                  <h5 className="card-title fw-bold">
                    {blog.title}
                  </h5>

                  <p className="card-text text-muted small flex-grow-1">
                    {blog.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">

                    <Link
                      href={`/blogs/${blog.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Read
                    </Link>

                    <div className="d-flex gap-2">

                      <Link
  href={`/blogs/edit/${blog.id}`}
  className="btn btn-sm btn-outline-secondary"
>
  <FiEdit />
</Link>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <h5>No Blogs Found</h5>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}