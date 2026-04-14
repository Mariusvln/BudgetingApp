import React, { useState } from 'react';

function IncomeAddPanel({ onTransactionAdded }) {
  // Helper for today's date
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // 1. Create states for all form fields
  const [date, setDate] = useState(getTodayDate());
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("1"); // Defaulting to category ID 1
  const [loading, setLoading] = useState(false);

  // 2. Function to send data to your Java Backend
  const handleSave = async () => {
    if (!amount || !description) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    // This matches the JSON structure your Java backend expects
    const income = {
      description: description,
      amount: parseFloat(amount),
      date: date,
      category: parseInt(category),
      processType: "SINGLE",
      id: null
    };

    try {
      const response = await fetch("http://localhost:8080/api/app/addExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(income),
      });

      if (response.ok) {
        // --- THIS IS THE KEY ADDITION ---
        // Call the refresh function passed from IncomesPage
        if (onTransactionAdded) {
            onTransactionAdded();
        }
        
        alert("Income saved successfully!");
        
        // Reset fields
        setAmount("");
        setDescription("");
        setDate(getTodayDate());
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
          <p className="text-sm text-gray-500 mb-4">Easily log a new transaction</p>

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
              <option value="1">Food</option>
              <option value="2">Rent</option>
              <option value="3">Salary</option>
            </select>

            <button 
              onClick={handleSave}
              disabled={loading}
              className={`btn bg-linear-to-r from-[#13EC6D] to-[#0BB855] hover:bg-linear-to-r hover:from-[#0BB855] hover:via-[#13EC6D] hover:to-[#0BB855] text-white ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? "Saving..." : "Add Transaction"}
            </button>

            <button 
              className="btn btn-ghost"
              onClick={() => { setAmount(""); setDescription(""); setDate(getTodayDate()); }}
            >
              Clear Fields
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeAddPanel;
