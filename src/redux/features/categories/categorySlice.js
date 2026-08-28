import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },

    updateCategory: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );

      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },

    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setError,
} = categorySlice.actions;

export default categorySlice.reducer;