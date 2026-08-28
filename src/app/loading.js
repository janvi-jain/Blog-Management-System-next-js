import SkeletonCard from "@/components/common/SkeletonCard";

export default function Loading() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} role="status" aria-label="Loading"></div>
        <h2 className="fw-bold">Loading DevJournal...</h2>
        <p className="text-muted">
          Please wait while we fetch your latest blogs.
        </p>
      </div>

      <div className="row">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <SkeletonCard />
          </div>
        ))}
      </div>
    </div>
  );
}