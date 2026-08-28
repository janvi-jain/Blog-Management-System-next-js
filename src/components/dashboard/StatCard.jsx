"use client";

export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card stat-card h-100 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">{title}</small>
            <h2 className="fw-bold mt-2 mb-0">
              {value}
            </h2>
          </div>

          <div className="stat-icon rounded-circle d-flex align-items-center justify-content-center">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}