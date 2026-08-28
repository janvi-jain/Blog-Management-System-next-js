"use client";

export default function FilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  setCurrentPage,
  placeholder = "Search...",
}) {
  return (
    <div className="row mb-4">
      <div className="col-md-4 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="col-md-3 mb-2">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div className="col-md-3 mb-2">
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort By</option>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
          <option value="A-Z">Title A-Z</option>
          <option value="Z-A">Title Z-A</option>
        </select>
      </div>

      <div className="col-md-2 mb-2">
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => {
            setSearch("");
            setStatusFilter("All");
            setSortBy("");
            setCurrentPage(1);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}