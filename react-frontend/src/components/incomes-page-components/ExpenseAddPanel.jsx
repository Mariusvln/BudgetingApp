import React, { useState, useEffect } from 'react';

function ExpenseAddPanel({ onTransactionAdded, categories = [] }) {
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(getTodayDate());
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(String(categories[0].id));
    } else {
      setCategory("");
    }
  }, [categories]);

  const handleSave = async () => {
    if (!amount || !description) {
      alert("Please fill in all fields");
      return;
    }

    if (!category) {
      alert("Please select a category");
      return;
    }

    setLoading(true);

    const expense = {
      description: description,
      amount: parseFloat(amount),
      date: date,
      category: parseInt(category),
      processType: "SINGLE",
      id: null
    };

    try {
      const response = await fetch("http://localhost:8080/api/app/expenses/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (response.ok) {
        if (onTransactionAdded) {
          onTransactionAdded();
        }

        alert("Expense saved successfully!");

        setAmount("");
        setDescription("");
        setDate(getTodayDate());
        setCategory(categories.length > 0 ? String(categories[0].id) : "");
      } else {
        const errorData = await response.text();
        alert("Server error: " + errorData);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="card bg-base-100 border border-base-200">
        <div className="card-body">
          <h2 className="font-semibold text-lg">Quick Add</h2>
          <p className="text-sm text-gray-500 mb-4">Easily log a new expense</p>

          <div className="flex flex-col gap-3">
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="number"
              placeholder="$ 0.00"
              className="input input-bordered"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description (e.g. Grass cutting)"
              className="input input-bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.length === 0 ? (
                <option value="" disabled>
                  No expense categories available
                </option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>

            <button
              onClick={handleSave}
              disabled={loading || categories.length === 0}
              className={`btn bg-linear-to-r from-[#13EC6D] to-[#0BB855] hover:bg-linear-to-r hover:from-[#0BB855] hover:via-[#13EC6D] hover:to-[#0BB855] text-white ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? "Saving..." : "Add Expense"}
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => {
                setAmount("");
                setDescription("");
                setDate(getTodayDate());
                setCategory(categories.length > 0 ? String(categories[0].id) : "");
              }}
            >
              Clear Fields
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseAddPanel;