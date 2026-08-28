import api from "@/services/api";

import {
  setLoading,
  setCategories,
  addCategory,
  updateCategory as updateCategoryAction,
  deleteCategory as deleteCategoryAction,
  setError,
} from "./categorySlice";

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const res = await api.get("/categories");
    dispatch(setCategories(res.data));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createCategory = (data) => async (dispatch) => {
  try {
    const res = await api.post("/categories", data);

    dispatch(addCategory(res.data));

    return true;
  } catch (err) {
    dispatch(setError(err.message));
    return false;
  }
};

export const updateCategory = (id, data) => async (dispatch) => {
  try {
    const res = await api.put(`/categories/${id}`, data);

    dispatch(updateCategoryAction(res.data));

    return true;
  } catch (err) {
    dispatch(setError(err.message));
    return false;
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await api.delete(`/categories/${id}`);

    dispatch(deleteCategoryAction(id));

    return true;
  } catch (err) {
    dispatch(setError(err.message));
    return false;
  }
};