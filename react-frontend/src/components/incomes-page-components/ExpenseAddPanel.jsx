import React, { useState, useEffect } from 'react';
import { useAppAlert } from "../../contexts/useAppAlert";
import { useAuth } from "../../contexts/AuthContext";
import {
  MAX_TRANSACTION_AMOUNT,
  MIN_TRANSACTION_AMOUNT,
  convertToEuro,
  getApiErrorMessage,
  getCurrencyPlaceholder,
  validateCurrencyAmount,
} from "../../utils/currency";

function ExpenseAddPanel({ onTransactionAdded, categories = [] }) {
  const { user } = useAuth();
  const appAlert = useAppAlert();
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
    if (!amount) {
      await appAlert.alert("Please fill in all fields", { type: "warning" });
      return;
    }

    if (!category) {
      await appAlert.alert("Please select a category", { type: "warning" });
      return;
    }

    const amountValidation = validateCurrencyAmount(amount, "Expense");
    if (amountValidation !== true) {
      await appAlert.alert(amountValidation, { type: "warning" });
      return;
    }

    if (description.length > 50) {
      await appAlert.alert("Description is too long", { type: "warning" });
      return;
    }

    setLoading(true);

    const expense = {
      description: description,
      amount: convertToEuro(amount, user?.currency),
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

        await appAlert.alert("Expense saved successfully!", { type: "success" });

        setAmount("");
        setDescription("");
        setDate(getTodayDate());
        setCategory(categories.length > 0 ? String(categories[0].id) : "");
      } else {
        const errorData = await getApiErrorMessage(response);
        await appAlert.alert("Server error: " + errorData, { type: "error" });
      }
    } catch (error) {
      console.error("Connection error:", error);
      await appAlert.alert("Could not connect to the server.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="text-lg font-bold tracking-tight">Quick Add</h2>
          <p className="mb-4 text-sm text-base-content/60">Easily log a new expense</p>

          <div className="flex flex-col gap-3">
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="number"
              max={MAX_TRANSACTION_AMOUNT}
              min={MIN_TRANSACTION_AMOUNT}
              step="0.01"
              placeholder={getCurrencyPlaceholder(user?.currency)}
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
              className={`btn btn-primary rounded-xl ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? "Saving..." : "Add Expense"}
            </button>

            <button
              className="btn btn-neutral rounded-xl"
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
