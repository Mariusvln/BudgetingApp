import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const IncomeEditForm = ({
  id,
  description,
  category,
  amount,
  date,
  show,
  onTransactionAdded,
  categories = [],
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: description ?? "",
      amount: amount ?? "",
      date: date ?? "",
      category: String(category ?? ""),
    },
  });

  useEffect(() => {
    setValue("description", description ?? "");
    setValue("amount", amount ?? "");
    setValue("date", date ?? "");
    setValue("category", String(category ?? ""));
  }, [description, amount, date, category, setValue]);

  const selectedCategory = watch("category");

  const handleSave = async (formData) => {
    const { description, amount, date, category } = formData;

    const parsedAmount = Number(amount);
    const parsedCategory = Number(category);

    setLoading(true);

    const income = {
      description: description.trim(),
      amount: parsedAmount,
      date: date,
      category: parsedCategory,
      processType: "SINGLE",
      id,
    };

    try {
      const response = await fetch("http://localhost:8080/api/app/incomes/", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(income),
      });

      if (response.ok) {
        if (onTransactionAdded) {
          onTransactionAdded();
        }
        alert("Income saved successfully!");
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

  return ReactDom.createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-[2px]">
      <form
        className="w-full max-w-[560px] rounded-[20px] bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.18)]"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-[22px] font-semibold text-[#101828]">
              Edit Income
            </h3>
            <p className="mt-1 text-sm text-[#667085]">Transaction #{id}</p>
          </div>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-[#344054]">
            Date
          </span>
          <input
            type="date"
            id="date"
            className="w-full rounded-xl border border-[#d0d5dd] px-3 py-2.5 text-[#101828] focus:border-[#86efac] focus:outline-none"
            {...register("date")}
          />
        </label>

        <label className="mb-2 block">
          <span className="mb-2 block text-sm font-medium text-[#344054]">
            Description
          </span>
          <input
            type="text"
            id="description"
            className={`w-full rounded-xl border px-3 py-2.5 text-[#101828] focus:outline-none ${
              errors.description?.message
                ? "border-[#e5484d] focus:border-[#e5484d]"
                : "border-[#d0d5dd] focus:border-[#86efac]"
            }`}
            {...register("description", {
              maxLength: {value: 50, message: "Description is too long"}
            })
            }
          />
        </label>

        {errors.description?.message && (
          <p className="mb-3 text-xs text-[#e5484d]">{errors.description?.message}</p>
        )}

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-[#344054]">
            Category
          </span>
          <select
            className="w-full rounded-xl border border-[#d0d5dd] px-3 py-2.5 text-[#101828] focus:border-[#86efac] focus:outline-none"
            {...register("category")}
            value={selectedCategory || ""}
          >
            {categories.length === 0 ? (
              <option value="" disabled>
                No income categories available
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

        <label className="mb-2 block">
          <span className="mb-2 block text-sm font-medium text-[#344054]">
            Amount
          </span>
          <input
            type="number"
            id="amount"
            className={`w-full rounded-xl border px-3 py-2.5 text-[#101828] focus:outline-none ${
              errors.amount?.message
                ? "border-[#e5484d] focus:border-[#e5484d]"
                : "border-[#d0d5dd] focus:border-[#86efac]"
            }`}
            {...register("amount", {
              required: "Please input your income amount, letters and symbols not allowed",
              validate: (value) => {
                if (isNaN(value)) return "Only numbers are allowed";
                if (Number(value) <= 0) return "Income cannot be 0 or less";
                return true;
              },
            })}
          />
        </label>

        {errors.amount?.message && (
          <p className="mb-3 text-xs text-[#e5484d]">{errors.amount?.message}</p>
        )}

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
    document.getElementById("portal")
  );
};

export default IncomeEditForm;
