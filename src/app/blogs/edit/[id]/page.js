"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, updateBlog } from "@/redux/features/blogs/blogThunk";
import { clearSelectedBlog } from "@/redux/features/blogs/blogSlice";
import { fetchCategories } from "@/redux/features/categories/categoryThunk";
import { toast } from "react-toastify";
import SkeletonCard from "@/components/common/SkeletonCard";

export default function EditBlog() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBlog: blog, loading } = useSelector(state => state.blogs);
  const { categories } = useSelector(state => state.categories);

  const [form, setForm] = useState({ title: "", slug: "", author: "", category: "", description: "", content: "", image: "", publishDate: "", tags: "", status: "Draft" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBlogById(id));
    dispatch(fetchCategories());
    return () => dispatch(clearSelectedBlog());
  }, [id, dispatch]);

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title || "",
        slug: blog.slug || "",
        author: blog.author || "",
        category: blog.category || "",
        description: blog.description || "",
        content: blog.content || "",
        image: blog.image || "",
        publishDate: blog.publishDate || "",
        tags: blog.tags ? blog.tags.join(", ") : "",
        status: blog.status || "Draft",
      });
    }
  }, [blog]);

  const validate = () => {
    let temp = {};
    if (!form.title.trim()) temp.title = "Required";
    if (!form.author.trim()) temp.author = "Required";
    if (!form.content.trim()) temp.content = "Required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return toast.error("Fill required fields");
    const finalData = {
      ...form,
      tags: form.tags
        ? form.tags.split(",").map(t => t.trim())
        : []
    };
    const res = await dispatch(updateBlog(id, finalData));
    if (res) { toast.success("Blog updated"); router.push("/blogs"); }
  };

  if (loading || !blog) return <SkeletonCard />;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h4 className="fw-bold mb-4">Edit Blog</h4>
        <div className="card border-0 shadow-sm p-4 bg-card">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} className="form-control" />
              {errors.title && <small className="text-danger">{errors.title}</small>}
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label">Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Author *</label>
                <input name="author" value={form.author} onChange={handleChange} className="form-control" />
                {errors.author && <small className="text-danger">{errors.author}</small>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label fw-semibold">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} className="form-select">
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div className="col-6">
                <label className="form-label">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="form-select">
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Short Description</label>
              <textarea name="description" rows="2" value={form.description} onChange={handleChange} className="form-control"></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Content *</label>
              <textarea name="content" rows="6" value={form.content} onChange={handleChange} className="form-control"></textarea>
              {errors.content && <small className="text-danger">{errors.content}</small>}
            </div>
            <div className="row mb-3">
              <div className="col-8">
                <label className="form-label">Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-4">
                <label className="form-label">Date</label>
                <input type="date" name="publishDate" value={form.publishDate} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Tags (comma sep)</label>
              <input name="tags" value={form.tags} onChange={handleChange} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Blog</button>
          </form>
        </div>
      </div>
    </div>
  );
}