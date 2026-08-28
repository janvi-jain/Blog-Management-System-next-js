import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },

    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },

    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },

    updateBlog: (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );

      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },

    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog.id !== action.payload
      );
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
});

export const {
  setLoading,
  setBlogs,
  setSelectedBlog,
  addBlog,
  updateBlog,
  deleteBlog,
  setError,
  clearSelectedBlog,
} = blogSlice.actions;

export default blogSlice.reducer;