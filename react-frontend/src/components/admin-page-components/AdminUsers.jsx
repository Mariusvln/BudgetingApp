import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:8080";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("USER");

  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/users`);

      if (!res.ok) {
        throw new Error(`Users request failed: ${res.status}`);
      }

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) => {
      const name = (user.name || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const role = (user.role || "").toLowerCase();
      return (
        name.includes(query) ||
        email.includes(query) ||
        role.includes(query)
      );
    });
  }, [users, search]);

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditName(user.name || "");
    setEditEmail(user.email || "");
    setEditRole(user.role || "USER");
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditName("");
    setEditEmail("");
    setEditRole("USER");
  };

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `Delete account for ${user.email || user.name || "this user"}?`
    );

    if (!confirmed) return;

    try {
      setActionLoadingId(user.id);

      const res = await fetch(`${API_BASE}/api/users/${user.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    const trimmedName = editName.trim();
    const trimmedEmail = editEmail.trim();

    if (!trimmedName || !trimmedEmail || !editRole) {
      alert("Fill all fields");
      return;
    }

    try {
      setActionLoadingId(editingUser.id);

      const res = await fetch(`${API_BASE}/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          role: editRole,
        }),
      });

      if (!res.ok) {
        throw new Error(`Update failed: ${res.status}`);
      }

      const updated = await res.json();

      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...updated } : u
        )
      );

      closeEditModal();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update user");
    } finally {
      setActionLoadingId(null);
    }
  };

  const getRoleBadgeClass = (role) => {
    if (role === "ADMIN") {
      return "bg-red-100 text-red-700 border-none";
    }

    return "bg-green-100 text-green-700 border-none";
  };

  return (
    <>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">User Directory</h2>
              <p className="text-sm text-gray-500">
                {loading
                  ? "Loading..."
                  : `Showing ${filteredUsers.length} users`}
              </p>
            </div>

            <input
              type="text"
              placeholder="Search (name, email, role...)"
              className="input w-64 bg-[#F2F3FF] border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead className="text-gray-500 text-sm">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8">
                      <span className="loading loading-spinner loading-md text-primary"></span>
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td className="font-medium">{user.name || "-"}</td>
                      <td>{user.email || "-"}</td>
                      <td>
                        <span
                          className={`badge px-3 py-3 ${getRoleBadgeClass(
                            user.role
                          )}`}
                        >
                          {user.role || "USER"}
                        </span>
                      </td>

                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(user)}
                            disabled={actionLoadingId === user.id}
                            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            onClick={() => handleDeleteUser(user)}
                            disabled={actionLoadingId === user.id}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            {actionLoadingId === user.id ? "Deleting..." : "🗑 Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>

            <div className="space-y-4">
              <input
                type="text"
                className="input input-bordered w-full"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Name"
              />

              <input
                type="email"
                className="input input-bordered w-full"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Email"
              />

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  className="select select-bordered w-full"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="btn"
                onClick={closeEditModal}
                disabled={actionLoadingId === editingUser.id}
              >
                Cancel
              </button>

              <button
                className="btn bg-green-600 text-white hover:bg-green-700"
                onClick={handleSaveEdit}
                disabled={actionLoadingId === editingUser.id}
              >
                {actionLoadingId === editingUser.id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsers;