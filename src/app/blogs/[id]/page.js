"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "@/redux/features/blogs/blogThunk";
import { clearSelectedBlog } from "@/redux/features/blogs/blogSlice";
import SkeletonCard from "@/components/common/SkeletonCard";

export default function BlogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBlog: blog, loading } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogById(id));
    return () => dispatch(clearSelectedBlog());
  }, [id, dispatch]);

  if (loading || !blog) return <SkeletonCard />;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <Link href="/blogs" className="btn btn-outline-secondary btn-sm mb-3">&larr; Back to Blogs</Link>
        <img src={blog.image} className="img-fluid rounded-4 mb-4 shadow blog-detail-image" alt={`${blog.title} cover image`}/>
        <div className="d-flex gap-3 mb-3 text-muted small">
          <span className="badge bg-primary">{blog.category}</span>
          <span>By {blog.author}</span>
          <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
        </div>
        <h1 className="fw-bold display-5 mb-4">{blog.title}</h1>
        <div className="d-flex gap-2 mb-4">
          {blog.tags.map(tag => <span key={tag} className="badge bg-light text-dark border">{tag}</span>)}
        </div>
        <div className="fs-5 lh-lg blog-content">{blog.content}</div>
      </div>
    </div>
  );
}