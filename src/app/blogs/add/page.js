"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { createBlog } from "@/redux/features/blogs/blogThunk";

export default function AddBlog() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    author: "",
    category: "",
    description: "",
    content: "",
    image: "",
    publishDate: "",
    tags: "",
    status: "Draft",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const temp = {};

    if (!form.title.trim()) temp.title = "Title is required";
    if (!form.author.trim()) temp.author = "Author is required";
    if (!form.category.trim()) temp.category = "Category is required";
    if (!form.content.trim()) temp.content = "Content is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) {
    toast.error("Please fill all required fields");
    return;
  }

  const finalData = {
    ...form,
    id: Date.now().toString(),
    publishDate:
      form.publishDate || new Date().toISOString().split("T")[0],
    tags: form.tags
      ? form.tags.split(",").map((tag) => tag.trim())
      : [],
  };

  const result = await dispatch(createBlog(finalData));

  if (result) {
    toast.success("Blog Created Successfully");
    router.push("/blogs");
  } else {
    toast.error("Failed to create blog");
  }
};
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">

        <h4 className="fw-bold mb-4">
          Create New Blog
        </h4>

        <div className="card border-0 shadow-sm p-4 bg-card">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Title *
              </label>

              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter Blog Title"
                value={form.title}
                onChange={handleChange}
              />

              {errors.title && (
                <small className="text-danger">
                  {errors.title}
                </small>
              )}
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Slug
                </label>

                <input
                  type="text"
                  className="form-control bg-light"
                  value={form.slug}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Author *
                </label>

                <input
                  type="text"
                  name="author"
                  className="form-control"
                  placeholder="John Doe"
                  value={form.author}
                  onChange={handleChange}
                />

                {errors.author && (
                  <small className="text-danger">
                    {errors.author}
                  </small>
                )}
              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Category *
                </label>

                <input
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Technology"
                  value={form.category}
                  onChange={handleChange}
                />

                {errors.category && (
                  <small className="text-danger">
                    {errors.category}
                  </small>
                )}

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>

              </div>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Short Description
              </label>

              <textarea
                rows="2"
                name="description"
                className="form-control"
                placeholder="Short description..."
                value={form.description}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Content *
              </label>

              <textarea
                rows="6"
                name="content"
                className="form-control"
                placeholder="Write your blog..."
                value={form.content}
                onChange={handleChange}
              />

              {errors.content && (
                <small className="text-danger">
                  {errors.content}
                </small>
              )}

            </div>

            <div className="row">

              <div className="col-md-8 mb-3">

                <label className="form-label">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={handleChange}
                />

                {form.image && (
                  <img src={form.image} alt="Blog preview" className="img-fluid rounded mt-3 preview-image"/>
                )}

              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Publish Date
                </label>

                <input
                  type="date"
                  name="publishDate"
                  className="form-control"
                  value={form.publishDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                className="form-control"
                placeholder="React, Next.js, Redux"
                value={form.tags}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Save Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}