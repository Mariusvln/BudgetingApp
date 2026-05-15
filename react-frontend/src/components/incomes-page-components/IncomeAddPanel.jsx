import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppAlert } from "../../contexts/useAppAlert";

function IncomeAddPanel({ onTransactionAdded, categories = [] }) {
  const appAlert = useAppAlert();
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const startDate = getTodayDate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      amount: "",
      date: startDate,
      category: "",
    },
  });

  useEffect(() => {
    if (categories.length > 0) {
      setValue("category", String(categories[0].id));
    } else {
      setValue("category", "");
    }
  }, [categories, setValue]);

  const selectedCategory = watch("category");

  const handleSave = async (formData) => {
    const { description, amount, date, category } = formData;

    if (!amount) {
      await appAlert.alert("Please fill in all fields", { type: "warning" });
      return;
    }

    if (!category) {
      await appAlert.alert("Please select a category", { type: "warning" });
      return;
    }

    setLoading(true);

    const income = {
      description: description,
      amount: parseFloat(amount),
      date: date,
      category: parseInt(category),
      processType: "SINGLE",
      id: null,
    };

    try {
      const response = await fetch("/api/app/incomes/", {
        method: "POST",
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

        reset({
          description: "",
          amount: "",
          date: startDate,
          category: categories.length > 0 ? String(categories[0].id) : "",
        });
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

  const handleInvalid = async (formErrors) => {
    if (formErrors.amount) {
      await appAlert.alert("Please fill in all fields", { type: "warning" });
      return;
    }

    if (formErrors.category) {
      await appAlert.alert("Please select a category", { type: "warning" });
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="card bg-base-100 border border-base-200">
        <div className="card-body">
          <h2 className="font-semibold text-lg">Quick Add</h2>
          <p className="mb-4 text-sm text-base-content/60">
            Easily log a new transaction
          </p>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(handleSave, handleInvalid)}
            noValidate
          >
            <input
              type="date"
              id="date"
              className="input input-bordered"
              {...register("date")}
            />

            <input
              type="number"
              id="amount"
              placeholder="$ 0.00"
              className="input input-bordered"
              {...register("amount", {
                required:
                  "Please input your income, letters and symbols not allowed",
                valueAsNumber: true,
                validate: (value) => {
                  if (isNaN(value)) {
                    return "Only numbers are allowed";
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
              {...register("description", {
                maxLength: { value: 50, message: "Description is too long" },
              })}
            />
            {errors.description?.message && (
              <p className="text-red-500">{errors.description?.message}</p>
            )}

            <select
              className="select select-bordered"
              {...register("category", {
                required: "Please select a category",
              })}
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
            {errors.category?.message && (
              <p className="text-red-500">{errors.category.message}</p>
            )}

            <button
              type="submit"
              disabled={loading || categories.length === 0}
              className={`btn btn-primary ${loading ? "opacity-50" : ""}`}
            >
              {loading ? "Saving..." : "Add Transaction"}
            </button>

            <button
              type="button"
              className="btn btn-neutral"
              onClick={() => {
                reset({
                  description: "",
                  amount: "",
                  date: startDate,
                  category:
                    categories.length > 0 ? String(categories[0].id) : "",
                });
              }}
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
