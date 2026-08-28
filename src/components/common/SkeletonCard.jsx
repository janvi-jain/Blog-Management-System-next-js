"use client";

export default function SkeletonCard() {
  return (
    <div className="card post-card mb-4">
      <div className="skeleton skeleton-image"></div>
      <div className="card-body">
        <div className="skeleton mb-2 skeleton-meta"></div>
        <div className="skeleton mb-3 skeleton-title"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line-short mt-2"></div>
      </div>
    </div>
  );
}