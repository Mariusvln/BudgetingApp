import { useState, useEffect } from "react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("INCOME");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const handleCreate = async () => {
    const newCategory = { name, type };

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });

    const data = await res.json();
    setCategories((prev) => [...prev, data]);
    setName("");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card bg-base-100 shadow p-4">
        <h2 className="font-bold mb-3 text-2xl">Add Category</h2>

        <label className="uppercase text-[#64748B]" for="Catname">
          category name
        </label>
        <input
          className="input input-bordered w-full mb-3 rounded-xl bg-base-300"
          placeholder="Category name"
          name="Catname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="uppercase text-[#64748B]" for="Cattype">
          type
        </label>
        <select
          className="select select-bordered w-full mb-3 rounded-xl bg-base-300"
          name="Cattype"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <button
          className="btn btn-success bg-[#006E2F] text-white border-none rounded-xl"
          onClick={handleCreate}
        >
          Create Category
        </button>
      </div>

      <div className="card bg-base-100 shadow p-4">
        <h2 className="font-bold mb-3 text-2xl">Categories</h2>

        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex justify-between">
              <span>{cat.name}</span>
              <span className="badge">{cat.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
