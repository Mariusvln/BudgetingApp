import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 50;

function AdminUserActivity() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const delay = setTimeout(() => {
      const loadActivity = async () => {
        try {
          setLoading(true);

          const trimmedSearch = search.trim();
          const url = trimmedSearch
            ? `http://localhost:8080/api/activity/search?query=${encodeURIComponent(
                trimmedSearch
              )}`
            : "http://localhost:8080/api/activity";

          const res = await fetch(url, { credentials: "include" });

          if (!res.ok) {
            throw new Error(`Activity request failed: ${res.status}`);
          }

          const result = await res.json();
          setData(
            Array.isArray(result)
              ? [...result].sort((left, right) => {
                  const byDate = new Date(right.timestamp) - new Date(left.timestamp);
                  return byDate || Number(right.id) - Number(left.id);
                })
              : [],
          );
          setCurrentPage(1);
        } catch (error) {
          console.error("Error loading activity:", error);
          setData([]);
        } finally {
          setLoading(false);
        }
      };

      loadActivity();
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, data.length);
  const visibleData = useMemo(
    () => data.slice(pageStart, pageEnd),
    [data, pageEnd, pageStart],
  );

  return (
    <div className="card rounded-2xl bg-base-100 shadow-sm">
      <div className="card-body p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">User Activity</h2>
            <p className="text-sm text-base-content/60">
              {loading
                ? "Loading..."
                : `Showing ${data.length === 0 ? 0 : pageStart + 1}-${pageEnd} of ${data.length} entries`}
            </p>
          </div>

          <input
            type="text"
            placeholder="Search activity..."
            className="input input-bordered w-full rounded-xl border-base-300 bg-base-200 text-base-content placeholder:text-base-content/45 md:w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table min-w-[900px]">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Username</th>
                <th>Email</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </td>
                </tr>
              ) : visibleData.length > 0 ? (
                visibleData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                    <td>{item.username || "-"}</td>
                    <td>{item.email || "-"}</td>
                    <td>{item.action || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-base-content/50">
                    No activity found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {data.length > PAGE_SIZE ? (
          <div className="mt-4 flex flex-col gap-3 text-sm text-base-content/60 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Page {safePage} of {totalPages}
            </span>

            <div className="join">
              <button
                type="button"
                className="btn join-item btn-sm"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn join-item btn-sm"
                disabled={safePage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminUserActivity;
