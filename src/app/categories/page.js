"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "@/redux/features/categories/categoryThunk";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Pagination from "@/components/common/Pagination";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoryPerPage = 6;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      description: cat.description,
    });

    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      const res = await dispatch(deleteCategory(id));

      if (res) {
        toast.success("Category Deleted");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description) {
      return toast.error("Fill all fields");
    }

    if (editingId) {
      const res = await dispatch(updateCategory(editingId, form));

      if (res) {
        toast.success("Category Updated");
      }
    } else {
      const res = await dispatch(createCategory(form));

      if (res) {
        toast.success("Category Created");
      }
    }

    resetForm();
  };

  const filtered = useMemo(() => {
    let data = [...categories];

    data = data.filter(
      (cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.description.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "A-Z") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "Z-A") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    return data;
  }, [categories, search, sortBy]);

  const indexOfLast = currentPage * categoryPerPage;
  const indexOfFirst = indexOfLast - categoryPerPage;
  const currentCategories = filtered.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filtered.length / categoryPerPage);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            Manage Categories
          </h4>

          <button className="btn btn-primary btn-sm d-flex align-items-center gap-2"
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}>
            <FiPlus />
            {showForm ? "Cancel" : "Add New"}
          </button>
        </div>

        <div className="row mb-4">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search Category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Sort By</option>
              <option value="A-Z">A - Z</option>
              <option value="Z-A">Z - A</option>
            </select>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setSearch("");
                setSortBy("");
                setCurrentPage(1);
              }}
            >
              Reset
            </button>
          </div>

        </div>

        {/* Form */}
        {showForm && (
          <div className="card border-0 shadow-sm mb-4 p-3 bg-card">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="form-control"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder="Description"
                    className="form-control"
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-2">
                  <button
                    className="btn btn-success w-100"
                    type="submit"
                  >
                    {editingId ? "Update" : "Save"}
                  </button>
                </div>

              </div>
            </form>
          </div>
        )}

        <div className="row g-3">
          {currentCategories.length > 0 ? (
            currentCategories.map((cat) => (
              <div className="col-md-6" key={cat.id}>
                <div className="card border-0 shadow-sm h-100 bg-card">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold mb-1">
                        {cat.name}
                      </h6>

                      <small className="text-muted">
                        {cat.description}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <button onClick={() => handleEdit(cat)} className="btn btn-sm btn-outline-primary">
                        <FiEdit />
                      </button>

                      <button onClick={() => handleDelete(cat.id)} className="btn btn-sm btn-outline-danger">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h5>No Categories Found</h5>
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

      </div>
    </div>
  );
}