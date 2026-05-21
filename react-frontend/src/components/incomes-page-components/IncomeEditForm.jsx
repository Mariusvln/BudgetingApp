import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppAlert } from "../../contexts/useAppAlert";
import { useAuth } from "../../contexts/AuthContext";
import {
  MAX_TRANSACTION_AMOUNT,
  MIN_TRANSACTION_AMOUNT,
  convertFromEuro,
  convertToEuro,
  getApiErrorMessage,
  getCurrencyPlaceholder,
  validateCurrencyAmount,
} from "../../utils/currency";

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
  const { user } = useAuth();
  const appAlert = useAppAlert();
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
      amount: convertFromEuro(amount, user?.currency) || "",
      date: date ?? "",
      category: String(category ?? ""),
    },
  });

  useEffect(() => {
    setValue("description", description ?? "");
    setValue("amount", convertFromEuro(amount, user?.currency) || "");
    setValue("date", date ?? "");
    setValue("category", String(category ?? ""));
  }, [description, amount, date, category, setValue, user?.currency]);

  const selectedCategory = watch("category");

  const handleSave = async (formData) => {
    const { description, amount, date, category } = formData;

    const parsedAmount = Number(amount);
    const parsedCategory = Number(category);

    setLoading(true);

    const income = {
      description: description.trim(),
      amount: convertToEuro(parsedAmount, user?.currency),
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
        await appAlert.alert("Income saved successfully!", { type: "success" });
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

  return ReactDom.createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-[2px]">
      <form
        className="w-full max-w-[560px] rounded-[20px] border border-base-300 bg-base-100 p-6 text-base-content shadow-[0_20px_60px_rgba(16,24,40,0.18)]"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-[22px] font-semibold text-base-content">
              Edit Income
            </h3>
            <p className="mt-1 text-sm text-base-content/60">Transaction #{id}</p>
          </div>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-base-content/70">
            Date
          </span>
          <input
            type="date"
            id="date"
            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2.5 text-base-content focus:border-primary focus:outline-none"
            {...register("date")}
          />
        </label>

        <label className="mb-2 block">
          <span className="mb-2 block text-sm font-medium text-base-content/70">
            Description
          </span>
          <input
            type="text"
            id="description"
            className={`w-full rounded-xl border bg-base-100 px-3 py-2.5 text-base-content focus:outline-none ${
              errors.description?.message
                ? "border-error focus:border-error"
                : "border-base-300 focus:border-primary"
            }`}
            {...register("description", {
              maxLength: {value: 50, message: "Description is too long"}
            })
            }
          />
        </label>

        {errors.description?.message && (
          <p className="mb-3 text-xs text-error">{errors.description?.message}</p>
        )}

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-base-content/70">
            Category
          </span>
          <select
            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2.5 text-base-content focus:border-primary focus:outline-none"
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
          <span className="mb-2 block text-sm font-medium text-base-content/70">
            Amount
          </span>
          <input
            type="number"
            id="amount"
            max={MAX_TRANSACTION_AMOUNT}
            min={MIN_TRANSACTION_AMOUNT}
            step="0.01"
            placeholder={getCurrencyPlaceholder(user?.currency)}
            className={`w-full rounded-xl border bg-base-100 px-3 py-2.5 text-base-content placeholder:text-base-content/45 focus:outline-none ${
              errors.amount?.message
                ? "border-error focus:border-error"
                : "border-base-300 focus:border-primary"
            }`}
            {...register("amount", {
              required: "Please input your income amount, letters and symbols not allowed",
              validate: (value) => validateCurrencyAmount(value, "Income"),
            })}
          />
        </label>

        {errors.amount?.message && (
          <p className="mb-3 text-xs text-error">{errors.amount?.message}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-xl border border-base-300 bg-base-100 px-4 py-2.5 text-sm font-medium text-base-content/75 hover:bg-base-200"
            onClick={show}
          >
            Cancel
          </button>
          <button
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-content hover:bg-primary/90"
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
