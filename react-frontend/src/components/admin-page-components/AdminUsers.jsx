import { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card bg-base-100 shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">User Directory</h2>

        <input
          type="text"
          placeholder="Find a User..."
          className="input input-bordered w-64 bg-[#F2F3FF] border-none rounded-xl"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Role</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>
                {/* <td>
                  <span className={`badge ${
                    user.role === "PREMIUM" ? "badge-success" : "badge-ghost"
                  }`}>
                    {user.role}
                  </span>
                </td> */}
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center opacity-60 py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;