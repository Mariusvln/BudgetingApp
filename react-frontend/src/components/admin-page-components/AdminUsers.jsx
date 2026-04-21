import { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const[editingId, setEditingId] = useState(null);
  const [editFormData, seteditFormData] = useState({name: "", role: ""});

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users");

        if (!res.ok) {
          throw new Error(`Users request failed: ${res.status}`);
        }

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error loading users:", error);
        setUsers([]);
      }
    };

    loadUsers();
  }, []);

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditFormData({name: user.name, role: user.role});
  };

  const handleSaveUpdate = async (id) => {
    try{
      const res = await fetch('http://localhost:8080/api/admin/users/${id}',{
        method:"PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(editFormData),
      } );
      if (res.ok){
        setEditingId(null);
        loadUsers();
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDeleteUser = async(id) => {
    if(window.confirm("Are you sure you want to delete this user?")){
      try{
        const res = await fetch('http://localhost:8080/api/admin/users/${id}', {
          method: "DELETE",
        });
        if(res.ok) loadUsers();
      } catch(err){
        console.error("Delete failed", err);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const query = search.toLowerCase();

    return name.includes(query) || email.includes(query);
  });

  return (
    <div className="card bg-base-100 shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">User Directory</h2>

        <input
          type="text"
          placeholder="Find a User..."
          className="input input-bordered w-64 bg-[#F2F3FF] border-none rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover">
             <td>
                      <input
                        type="text"
                        className="input input-sm input-bordered w-full"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      />
                    </td>
                    <td>{user.email}</td>
                    <td>
                  <select 
                  className="select select-sm select-bordered w-full"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value})}>
                    <option value="USER"> Member</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td className="text-right space-x-2">
                  <button 
                  onClick={() => handleSaveUpdate(user.id)}
                  className="btn btn-sm btn-success text-white">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="btn btn-sm btn-ghost">
                    Cancel
                  </button>
                </td>
                <td className="font-medium">{user.name || "-"}</td>
                <td>{user.email || "-"}</td>

                <td>
                  <span className={`badge ${user.role === 'ADMIN' ? 'badge-success' : 'badge-ghost'}`}>{user.role}</span>
            
                </td>
                <td className="text-right space-x-2">
                  <button
                  onClick={() => startEdit(user)}
                  className="btn btn-sm btn-ghost bg-[#F2F3FF] normal-case">Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}
                  className="btn btn-sm  btn-circle btn-ghost text-error">

                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center  opacity-60 py-4">
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