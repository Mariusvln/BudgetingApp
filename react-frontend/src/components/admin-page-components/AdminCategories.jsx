import { useState, useEffect } from "react";
import { useAppAlert } from "../../contexts/useAppAlert";

const AdminCategories = () => {
  const appAlert = useAppAlert();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("INCOME");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/categories", {
          credentials: "include",
        });

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
        credentials: "include",
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
        credentials: "include",
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
    const newName = await appAlert.prompt("New category name:", cat.name, {
      placeholder: "Category name",
    });
    if (!newName) return;

    const newType = await appAlert.prompt("New type (INCOME / EXPENSE):", cat.type, {
      placeholder: "INCOME or EXPENSE",
    });

    if (!newName || !newType) return;

    try {
      const res = await fetch(`http://localhost:8080/api/categories/${cat.id}`, {
        method: "PUT",
        credentials: "include",
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

    const matchesType = filterType === "ALL" || cat.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 lg:gap-6">
      <div className="card rounded-2xl bg-base-100 p-5 shadow-sm sm:p-6 lg:col-span-1">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">Add Category</h2>

        <label className="mb-2 block text-sm uppercase text-[#64748B]">
          Category name
        </label>

        <input
          className="input input-bordered mb-3 w-full rounded-xl border-none bg-[#F2F3FF]"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mb-2 block text-sm uppercase text-[#64748B]">
          Type
        </label>

        <select
          className="select select-bordered mb-3 w-full rounded-xl border-none bg-[#F2F3FF]"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <button
          className="btn btn-primary mt-2 w-full rounded-xl border-none"
          onClick={handleCreate}
        >
          Create Category
        </button>
      </div>

      <div className="card rounded-2xl bg-base-100 p-5 shadow-sm sm:p-6 lg:col-span-3">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Categories List</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredCategories.length} categories
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Search categories..."
              className="input w-full rounded-xl border-none bg-[#F2F3FF] sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-3 rounded-xl bg-base-200 p-1">
              <button
                onClick={() => setFilterType("INCOME")}
                className={`btn btn-sm rounded-xl border-none px-3 sm:px-4 ${
                  filterType === "INCOME"
                    ? "bg-primary text-primary-content"
                    : "bg-transparent text-slate-600 hover:bg-base-100"
                }`}
              >
                Income
              </button>

              <button
                onClick={() => setFilterType("EXPENSE")}
                className={`btn btn-sm rounded-xl border-none px-3 sm:px-4 ${
                  filterType === "EXPENSE"
                    ? "bg-primary text-primary-content"
                    : "bg-transparent text-slate-600 hover:bg-base-100"
                }`}
              >
                Expense
              </button>

              <button
                onClick={() => setFilterType("ALL")}
                className={`btn btn-sm rounded-xl border-none px-3 sm:px-4 ${
                  filterType === "ALL"
                    ? "bg-primary text-primary-content"
                    : "bg-transparent text-slate-600 hover:bg-base-100"
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>

        <div className="hidden px-3 py-2 text-sm font-semibold uppercase text-gray-500 sm:flex">
          <div className="w-1/3">Name</div>
          <div className="w-1/3 text-center">Type</div>
          <div className="w-1/3 text-right">Actions</div>
        </div>

        <div className="mt-2 space-y-3">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col gap-3 rounded-xl bg-base-200 p-4 sm:flex-row sm:items-center"
            >
              <div className="font-medium sm:w-1/3">{cat.name}</div>

              <div className="flex sm:w-1/3 sm:justify-center">
                <span
                  className={`badge border-none px-3 py-3 ${
                    cat.type === "INCOME"
                      ? "bg-primary/15 text-primary"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {cat.type === "INCOME" ? "Income" : "Expense"}
                </span>
              </div>

              <div className="flex gap-3 sm:w-1/3 sm:justify-end">
                <button
                  className="btn btn-sm rounded-xl border-none bg-blue-50 text-blue-700 hover:bg-blue-100"
                  onClick={() => handleEdit(cat)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="btn btn-sm rounded-xl border-none bg-red-50 text-red-700 hover:bg-red-100"
                  onClick={() => handleDelete(cat.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="rounded-xl bg-base-200 p-6 text-center text-gray-400">
              No categories found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
