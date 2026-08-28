"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/redux/features/blogs/blogThunk";
import { fetchCategories } from "@/redux/features/categories/categoryThunk";
import StatCard from "@/components/dashboard/StatCard";
import { FiFileText, FiCheckCircle, FiEdit, FiFolder, } from "react-icons/fi";
import Pagination from "@/components/common/Pagination";
import RecentPosts from "@/components/dashboard/RecentPosts"

export default function Dashboard() {
  const dispatch = useDispatch();
  const { blogs = [] } = useSelector((state) => state.blogs || {});
  const { categories = [] } = useSelector((state) => state.categories || {});

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchCategories());
  }, [dispatch]);

  const stats = [
    {
      title: "Total Blogs",
      value: blogs.length,
      icon: <FiFileText size={24} />,
      color: "#3b82f6",
    },
    {
      title: "Published",
      value: blogs.filter((b) => b.status === "Published").length,
      icon: <FiCheckCircle size={24} />,
      color: "#22c55e",
    },
    {
      title: "Drafts",
      value: blogs.filter((b) => b.status === "Draft").length,
      icon: <FiEdit size={24} />,
      color: "#f59e0b",
    },
    {
      title: "Categories",
      value: categories.length,
      icon: <FiFolder size={24} />,
      color: "#8b5cf6",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  const totalPages = Math.ceil(
    blogs.length / blogsPerPage
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
          <div className="card border-0 shadow-sm mt-2 bg-card">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Recent Blogs</h5>

              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0 blog-content">
                  <thead className="border-bottom">
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentBlogs.map((blog) => (
                      <tr key={blog.id}>
                        <td>{blog.title}</td>
                        <td>
                          <span className="badge bg-primary bg-opacity-10 text-primary">
                            {blog.category}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge ${blog.status === "Published"
                              ? "bg-success"
                              : "bg-warning"
                              }`}
                          >
                            {blog.status}
                          </span>
                        </td>

                        <td className="text-muted">
                          {new Date(blog.publishDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <RecentPosts blogs={blogs} />
        </div>
      </div>
    </div>
  );
}