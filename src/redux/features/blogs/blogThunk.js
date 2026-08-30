import api from "@/services/api";

import {
  setLoading,
  setBlogs,
  setSelectedBlog,
  addBlog,
  updateBlog as updateBlogAction,
  deleteBlog as deleteBlogAction,
  setError,
} from "./blogSlice";

export const fetchBlogs = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const res = await api.get("/blogs");

    const blogs = Array.isArray(res.data)
      ? res.data
      : res.data.blogs || [];

    dispatch(setBlogs(blogs));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBlogById = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const res = await api.get(`/blogs/${id}`);
    dispatch(setSelectedBlog(res.data));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createBlog = (data) => async (dispatch) => {
  try {
    const res = await api.post("/blogs", data);

    dispatch(addBlog(res.data));

    return true;
  } catch (err) {
    dispatch(setError(err.message));
    return false;
  }
};

export const updateBlog = (id, data) => async (dispatch) => {
  try {
    const res = await api.put(`/blogs/${id}`, data);

    dispatch(updateBlogAction(res.data));

    return true;
  } catch (err) {
    dispatch(setError(err.message));
    return false;
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await api.delete(`/blogs/${id}`);

    dispatch(deleteBlogAction(id));

    return true;
  } catch (err) {
    dispatch(setError(err.message));
    return false;
  }
};