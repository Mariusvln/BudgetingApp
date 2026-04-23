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

    if (!description?.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!Number.isInteger(parsedCategory) || parsedCategory <= 0) {
      alert("Please select a valid category");
      return;
    }

    setLoading(true);

    const income = {
      description: description.trim(),
      amount: parsedAmount,
      date,
      category: parsedCategory,
      processType: "SINGLE",
      id,
    };

    try {
      const response = await fetch("http://localhost:8080/api/app/updateIncome", {
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
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#000000b3] z-1000]">
      <form
        className="fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 bg-[white] z-1000 inset-y-2/4 flex flex-col justify-center gap-5 border border-black py-40 px-30"
        onSubmit={handleSubmit(handleSave)}
      >
        <p>{id}</p>

        <label>
          Date:
          <input
            type="date"
            id="date"
            className="border border-black ml-2"
            {...register("date")}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            id="description"
            className="border border-black w-80 ml-2"
            {...register("description")}
          />
        </label>

        <label>
          Category:
          <select
            className="border border-black ml-2"
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

        <label>
          Amount:
          <input
            type="number"
            id="amount"
            className="border border-black w-80 ml-2"
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
          <p className="text-red-500">{errors.amount?.message}</p>
        )}

        <div className="flex gap-2 mt-2">
          <button
            className="bg-green-500 py-1 px-2 text-white rounded-lg font-bold hover:bg-green-600"
            type="submit"
            disabled={loading}
          >
            Submit
          </button>

          <button
            type="button"
            className="bg-red-500 py-1 px-2 text-white rounded-lg font-bold hover:bg-red-600"
            onClick={show}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("portal")
  );
};

export default IncomeEditForm;