import React, { useState } from "react";
import { useForm } from "react-hook-form";

function IncomeAddPanel({ onTransactionAdded }) {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const startDate = getTodayDate();
  const [loading, setLoading] = useState(false);

  // 2. Function to send data to your Java Backend
  const handleSave = async (formData) => {
    const { description, amount, date, category } = formData;

    setLoading(true);

    // This matches the JSON structure your Java backend expects
    const income = {
      description: description,
      amount: parseFloat(amount),
      date: date,
      category: parseInt(category),
      processType: "SINGLE",
      id: null,
    };

    try {
      const response = await fetch("http://localhost:8080/api/app/addIncome", {
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

        // Reset fields
        reset()
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      amount: "",
      date: startDate,
      category: "1",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <div className="card bg-base-100 border border-base-200">
        <div className="card-body">
          <h2 className="font-semibold text-lg">Quick Add</h2>
          <p className="text-sm text-gray-500 mb-4">
            Easily log a new transaction
          </p>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(handleSave)}
            noValidate
          >
            <input
              type="date"
              id="date"
              className="input input-bordered"
              {...register("date", {
                valueAsDate: true,
              })}
            />

            <input
              type="number"
              id="amount"
              placeholder="$ 0.00"
              className="input input-bordered"
              {...register("amount", {
                required: "Please input your income, letters and symbols not allowed",
                valueAsNumber: true,
                validate: (value) => {
                  if (isNaN(value)) {
                    return "Only numbers are allowed"
                  } else if (value <= 0) {
                    return "Income cannot be 0 or less";
                  }
                  return true;
                },
              })}
            />
            {errors.amount?.message && (
              <p className="text-red-500">{errors.amount?.message}</p>
            )}

            <input
              type="text"
              id="description"
              placeholder="Description (e.g. Grass cutting)"
              className="input input-bordered"
              {...register("description")}
            />

            <select
              className="select select-bordered"
              {...register("category")}
            >
              <option value="1">Food</option>
              <option value="2">Rent</option>
              <option value="3">Salary</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className={`btn bg-linear-to-r from-[#13EC6D] to-[#0BB855] hover:bg-linear-to-r hover:from-[#0BB855] hover:via-[#13EC6D] hover:to-[#0BB855] text-white ${loading ? "opacity-50" : ""}`}
            >
              {loading ? "Saving..." : "Add Transaction"}
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => { reset() }}
            >
              Clear Fields
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IncomeAddPanel;
