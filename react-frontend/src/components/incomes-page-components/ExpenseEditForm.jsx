import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import { useAppAlert } from "../../contexts/useAppAlert";

const ExpenseEditForm = ({
  id,
  description,
  category,
  amount,
  date,
  show,
  onTransactionAdded,
  categories = [],
}) => {
  const appAlert = useAppAlert();
  const formId = id;
  const [formDate, setDate] = useState(date);
  const [formAmount, setAmount] = useState(amount);
  const [formDescription, setDescription] = useState(description);
  const [formCategory, setCategory] = useState(String(category ?? ""));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDate(date);
    setAmount(amount);
    setDescription(description);
    setCategory(String(category ?? ""));
  }, [date, amount, description, category]);

  const handleSubmit = async () => {
    if (!formAmount || !formDescription) {
      await appAlert.alert("Please fill in all fields", { type: "warning" });
      return;
    }

    if (!formCategory) {
      await appAlert.alert("Please select a category", { type: "warning" });
      return;
    }

    setLoading(true);

    const expense = {
      description: formDescription,
      amount: parseFloat(formAmount),
      date: formDate,
      category: parseInt(formCategory),
      processType: "SINGLE",
      id: formId
    };

    try {
      const response = await fetch("http://localhost:8080/api/app/expenses/", {
        method: "PUT",
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
      } else {
        const errorData = await response.text();
        await appAlert.alert("Server error: " + errorData, { type: "error" });
      }
    } catch (error) {
      console.error("Connection error:", error);
      await appAlert.alert("Could not connect to the server.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return ReactDom.createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-[2px]">
      <form
        className="w-full max-w-[560px] rounded-[20px] bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.18)]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-6">
          <h3 className="text-[22px] font-semibold text-[#101828]">
            Edit Expense
          </h3>
          <p className="mt-1 text-sm text-[#667085]">Transaction #{formId}</p>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-[#344054]">
            Date
          </span>
          <input
            type="date"
            value={formDate}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-[#d0d5dd] px-3 py-2.5 text-[#101828] focus:border-[#86efac] focus:outline-none"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-[#344054]">
            Description
          </span>
          <input
            type="text"
            value={formDescription}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-[#d0d5dd] px-3 py-2.5 text-[#101828] focus:border-[#86efac] focus:outline-none"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-[#344054]">
            Category
          </span>
          <select
            className="w-full rounded-xl border border-[#d0d5dd] px-3 py-2.5 text-[#101828] focus:border-[#86efac] focus:outline-none"
            value={formCategory}
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
        </label>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-[#344054]">
            Amount
          </span>
          <input
            type="number"
            value={formAmount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-[#d0d5dd] px-3 py-2.5 text-[#101828] focus:border-[#86efac] focus:outline-none"
          />
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-xl border border-[#d0d5dd] px-4 py-2.5 text-sm font-medium text-[#344054] hover:bg-[#f9fafb]"
            onClick={show}
          >
            Cancel
          </button>
          <button
            className="rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#15803d]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("portal"),
  );
};

export default ExpenseEditForm;
