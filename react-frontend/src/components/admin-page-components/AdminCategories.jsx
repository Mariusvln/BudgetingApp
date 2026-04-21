import { useState, useEffect } from "react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("INCOME");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");

useEffect(() => {
  const loadCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/categories");

      if (!res.ok) {
        throw new Error(`Categories request failed: ${res.status}`);
      }

      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
    }
  };

  loadCategories();
}, []);

  const handleCreate = async () => {
  if (!name.trim()) return;

  const newCategory = { name: name.trim(), type };

  try {
    const res = await fetch("http://localhost:8080/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });

    if (!res.ok) {
      throw new Error(`Create category failed: ${res.status}`);
    }

    const data = await res.json();
    setCategories((prev) => [...prev, data]);
    setName("");
    setType("INCOME");
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

 const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:8080/api/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Delete category failed: ${res.status}`);
    }

    setCategories((prev) => prev.filter((c) => c.id !== id));
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

  const handleEdit = async (cat) => {
  const newName = prompt("New category name:", cat.name);
  const newType = prompt("New type (INCOME / EXPENSE):", cat.type);

  if (!newName || !newType) return;

  try {
    const res = await fetch(`http://localhost:8080/api/categories/${cat.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName.trim(),
        type: newType.trim().toUpperCase(),
      }),
    });

    if (!res.ok) {
      throw new Error(`Update category failed: ${res.status}`);
    }

    const updated = await res.json();
    setCategories((prev) => prev.map((c) => (c.id === cat.id ? updated : c)));
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "ALL" || cat.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="flex gap-6">
      {/* LEFT: CREATE */}
      <div className="card bg-base-100 shadow p-6 w-[25%] rounded-2xl">
        <h2 className="font-bold mb-3 text-2xl">Add Category</h2>

        <label className="uppercase text-[#64748B] text-sm mb-2">
          category name
        </label>
        <input
          className="input input-bordered w-full mb-3 rounded-xl bg-[#F2F3FF] border-none"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="uppercase text-[#64748B] mb-2 text-sm">type</label>
        <select
          className="select select-bordered w-full mb-3 rounded-xl bg-[#F2F3FF] border-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <button
          className="btn btn-success bg-[#006E2F] text-white border-none rounded-xl mt-2"
          onClick={handleCreate}
        >
          Create Category
        </button>
      </div>

      {/* RIGHT: LIST */}
      <div className="card bg-base-100 shadow p-6 w-full rounded-2xl">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-2xl">Categories List</h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search categories..."
              className="input w-64 bg-[#F2F3FF] border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex bg-base-200 rounded-xl p-1">
              <button
                onClick={() => setFilterType("INCOME")}
                className={`btn btn-sm rounded-xl border-none px-4 ${
                  filterType === "INCOME"
                    ? "bg-green-700 text-white"
                    : "bg-transparent"
                }`}
              >
                Income
              </button>

              <button
                onClick={() => setFilterType("EXPENSE")}
                className={`btn btn-sm rounded-xl border-none px-4 ml-1 ${
                  filterType === "EXPENSE"
                    ? "bg-green-700 text-white"
                    : "bg-transparent"
                }`}
              >
                Expense
              </button>

              <button
                onClick={() => setFilterType("ALL")}
                className={`btn btn-sm rounded-xl border-none px-4 ml-1 ${
                  filterType === "ALL"
                    ? "bg-green-700 text-white"
                    : "bg-transparent"
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="flex px-3 py-2 text-sm font-semibold text-gray-500 uppercase">
          <div className="w-1/3">Name</div>
          <div className="w-1/3 text-center">Type</div>
          <div className="w-1/3 text-right">Actions</div>
        </div>

        {/* LIST */}
        <div className="space-y-3 mt-2">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center p-4 rounded-xl bg-base-200"
            >
              <div className="w-1/3 font-medium">{cat.name}</div>

              <div className="w-1/3 flex justify-center">
                <span
                  className={`badge px-3 py-3 ${
                    cat.type === "INCOME"
                      ? "bg-green-100 text-green-700 border-none"
                      : "bg-red-100 text-red-700 border-none"
                  }`}
                >
                  {cat.type === "INCOME" ? "Income" : "Expense"}
                </span>
              </div>

              <div className="w-1/3 flex justify-end gap-3">
                <button
                  className="btn btn-xs btn-ghost bg-transparent border-none shadow-none hover:bg-transparent"
                  onClick={() => handleEdit(cat)}
                >
                  ✏️
                </button>

                <button
                  className="btn btn-xs btn-ghost bg-transparent border-none shadow-none hover:bg-transparent"
                  onClick={() => handleDelete(cat.id)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center opacity-60">No categories found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;