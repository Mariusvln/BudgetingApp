import { useEffect, useState } from "react";

function AdminUserActivity() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      const loadActivity = async () => {
        try {
          setLoading(true);

          const trimmedSearch = search.trim();
          const url = trimmedSearch
            ? `http://localhost:8080/api/activity/search?query=${encodeURIComponent(trimmedSearch)}`
            : "http://localhost:8080/api/activity";

          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(`Activity request failed: ${res.status}`);
          }

          const result = await res.json();
          setData(Array.isArray(result) ? result : []);
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

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold">User Activity</h2>
            <p className="text-sm text-gray-500">
              {loading ? "Loading..." : `Showing ${data.length} entries`}
            </p>
          </div>

          <input
            type="text"
            placeholder="Search by ID, username, email, description..."
            className="input input-bordered w-full md:w-80 bg-[#F2F3FF] border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table">
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
                  <td colSpan="5" className="text-center py-8">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
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
                  <td colSpan="5" className="text-center py-8 text-gray-400">
                    No activity found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUserActivity;