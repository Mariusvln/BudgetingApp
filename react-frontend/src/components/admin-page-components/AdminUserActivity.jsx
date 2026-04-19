import { useEffect, useState } from "react";

function AdminUserActivity() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

useEffect(() => {
  const delay = setTimeout(() => {
    if (search === "") {
      fetch("http://localhost:8080/api/activity")
        .then(res => res.json())
        .then(setData);
    } else {
      fetch(`http://localhost:8080/api/activity/search?query=${search}`)
        .then(res => res.json())
        .then(setData);
    }
  }, 300);

  return () => clearTimeout(delay);
}, [search]);

  return (
    <div className="card bg-base-100 border shadow-sm">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">User Activity</h2>

        <input
          type="text"
          placeholder="Search by ID, username, email..."
          className="input input-bordered mb-4 w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Username</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.timestamp}</td>
                  <td>{item.username}</td>
                  <td>{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUserActivity;