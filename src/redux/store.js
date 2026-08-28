import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "@/redux/features/blogs/blogSlice";
import categoryReducer from "@/redux/features/categories/categorySlice";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    categories: categoryReducer,
  },
});