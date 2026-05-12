import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE = "http://localhost:8080";
const DEFAULT_ADMIN_EMAIL = "admin@gmail.com";

const AdminUsers = () => {
  const { user: currentUser, setUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("ROLE_USER");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createRole, setCreateRole] = useState("ROLE_USER");
  const [createError, setCreateError] = useState("");

  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/admin/users`, {
        credentials: "include",
      });

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
    setEditRole(user.role || "ROLE_USER");
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditName("");
    setEditEmail("");
    setEditRole("ROLE_USER");
  };

  const resetCreateForm = () => {
    setCreateName("");
    setCreateEmail("");
    setCreatePassword("");
    setCreateRole("ROLE_USER");
    setCreateError("");
  };

  const openCreateModal = () => {
    setSearch("");
    resetCreateForm();
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    resetCreateForm();
  };

  const handleCreateUser = async () => {
    const trimmedName = createName.trim();
    const trimmedEmail = createEmail.trim();

    if (!trimmedName || !trimmedEmail || !createPassword || !createRole) {
      setCreateError("Fill all fields");
      return;
    }

    try {
      setCreateError("");
      setActionLoadingId("create-user");

      const res = await fetch(`${API_BASE}/api/admin/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: createPassword,
          role: createRole,
        }),
      });

      if (!res.ok) {
        throw new Error(`Create failed: ${res.status}`);
      }

      const created = await res.json();
      setUsers((prev) => [...prev, created]);
      closeCreateModal();
    } catch (error) {
      console.error("Create user error:", error);
      setCreateError("Failed to create user");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `Delete account for ${user.email || user.name || "this user"}?`
    );

    if (!confirmed) return;

    try {
      setActionLoadingId(user.id);

      const res = await fetch(`${API_BASE}/api/admin/users/${user.id}`, {
        method: "DELETE",
        credentials: "include",
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
    const isDefaultAdmin = editingUser.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL;
    const isEditingSelf = editingUser.id === currentUser?.id;
    const isRemovingOwnAdminRole =
      isEditingSelf &&
      editingUser.role === "ROLE_ADMIN" &&
      editRole !== "ROLE_ADMIN";

    if (!trimmedName || !trimmedEmail || !editRole) {
      alert("Fill all fields");
      return;
    }

    if (isDefaultAdmin && editRole !== "ROLE_ADMIN") {
      alert("Default admin role cannot be changed.");
      return;
    }

    if (isRemovingOwnAdminRole) {
      const confirmed = window.confirm(
        "You are removing your own admin role. After saving, you can lose access to the Admin page. Are you sure?"
      );

      if (!confirmed) return;
    }

    try {
      setActionLoadingId(editingUser.id);

      const res = await fetch(`${API_BASE}/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        credentials: "include",
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
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...updated } : u))
      );

      if (isEditingSelf) {
        setUser((prev) => (prev ? { ...prev, ...updated } : prev));
      }

      closeEditModal();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update user");
    } finally {
      setActionLoadingId(null);
    }
  };

  const getRoleBadgeClass = (role) => {
    if (role === "ADMIN" || role === "ROLE_ADMIN") {
      return "bg-red-100 text-red-700 border-none";
    }

    return "bg-green-100 text-green-700 border-none";
  };

  return (
    <>
      <div className="card rounded-2xl bg-base-100 shadow-sm">
        <div className="card-body p-5 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div>
              <h2 className="text-xl font-semibold">User Directory</h2>
              <p className="text-sm text-gray-500">
                {loading ? "Loading..." : `Showing ${filteredUsers.length} users`}
              </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-10 ml-3 items-center justify-center rounded-xl bg-green-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Create User
              </button>
            </div>

            <input
              type="text"
              placeholder="Search name, email, role..."
              className="input w-full rounded-xl border-none bg-[#F2F3FF] md:w-80"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              name="admin-user-search"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="table min-w-190">
              <thead className="text-sm text-gray-500">
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
                    <td colSpan="5" className="py-8 text-center">
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
                            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            onClick={() => handleDeleteUser(user)}
                            disabled={actionLoadingId === user.id}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            {actionLoadingId === user.id
                              ? "Deleting..."
                              : "🗑 Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg sm:p-6">
            <h3 className="mb-4 text-lg font-semibold">Create User</h3>

            <div className="space-y-4">
              <input
                type="text"
                className="input input-bordered w-full"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder="Username"
                autoComplete="off"
                name="create-user-name"
              />

              <input
                type="email"
                className="input input-bordered w-full"
                value={createEmail}
                onChange={(e) => setCreateEmail(e.target.value)}
                placeholder="Email"
                autoComplete="new-email"
                name="create-user-email"
              />

              <input
                type="password"
                className="input input-bordered w-full"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
                name="create-user-password"
              />

              <div>
                <label className="mb-2 block text-sm font-medium">Role</label>
                <select
                  className="select select-bordered w-full"
                  value={createRole}
                  onChange={(e) => setCreateRole(e.target.value)}
                >
                  <option value="ROLE_USER">USER</option>
                  <option value="ROLE_ADMIN">ADMIN</option>
                </select>
              </div>
            </div>

            {createError && (
              <p className="mt-4 text-sm font-medium text-red-600">
                {createError}
              </p>
            )}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                className="btn rounded-xl bg-black text-white hover:bg-black/80"
                onClick={closeCreateModal}
                disabled={actionLoadingId === "create-user"}
              >
                Cancel
              </button>

              <button
                className="btn rounded-xl bg-green-600 text-white hover:bg-green-700"
                onClick={handleCreateUser}
                disabled={actionLoadingId === "create-user"}
              >
                {actionLoadingId === "create-user" ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg sm:p-6">
            <h3 className="mb-4 text-lg font-semibold">Edit User</h3>

            <div className="space-y-4">
              <input
                type="text"
                className="input input-bordered w-full"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Name"
                autoComplete="off"
                name="edit-user-name"
              />

              <input
                type="email"
                className="input input-bordered w-full"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Email"
                autoComplete="off"
                name="edit-user-email"
                disabled={editingUser.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL}
              />

              <div>
                <label className="mb-2 block text-sm font-medium">Role</label>
                <select
                  className="select select-bordered w-full"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  disabled={editingUser.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL}
                >
                  <option value="ROLE_USER">USER</option>
                  <option value="ROLE_ADMIN">ADMIN</option>
                </select>
                {editingUser.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL && (
                  <p className="mt-2 text-sm text-gray-500">
                    Default admin role cannot be changed.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                className="btn rounded-xl"
                onClick={closeEditModal}
                disabled={actionLoadingId === editingUser.id}
              >
                Cancel
              </button>

              <button
                className="btn rounded-xl bg-green-600 text-white hover:bg-green-700"
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
