import TransactionNav from "../components/TransactionNav";
import React, { useEffect, useState } from "react";

const getMonthStart = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const hasDataForMonth = (items, monthDate) =>
  items.some((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === monthDate.getFullYear() &&
      itemDate.getMonth() === monthDate.getMonth()
    );
  });

const filterItemsByMonth = (items, monthDate) =>
  items.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === monthDate.getFullYear() &&
      itemDate.getMonth() === monthDate.getMonth()
    );
  });

const formatMonthLabel = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);


const ProgressBar = ({ value, limit, over }) => {
  const safeLimit = Number(limit) || 0;
  const safeValue = Number(value) || 0;
  const percent =
    safeLimit > 0 ? Math.min((safeValue / safeLimit) * 100, 100) : 0;

  return (
    <div className="w-full h-[10px] rounded-full bg-[#edf0f2]">
      <div
        className={`h-[10px] rounded-full ${over ? "bg-[#e5484d]" : "bg-[#1db954]"}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};


const AddCategoryModal = ({ open, onClose, categories, onCategoryAdded }) => {
  const [limit, setLimit] = useState("");
  const [selected, setSelected] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleClose = () => {
    setLimit("");
    setSelected("");
    setError("");
    setSubmitting(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!selected) {
      setError("Please select a category");
      return;
    }

    if (!limit || Number(limit) <= 0) {
      setError("Please enter a valid limit");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/app/budget/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          category: Number(selected),
          maxLimit: Number(limit),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category limit");
      }

      await onCategoryAdded();
      handleClose();
    } catch (submitError) {
      console.error("Error adding category limit:", submitError);
      setError("Failed to add category limit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-[420px] rounded-[16px] bg-white p-6">
        <h3 className="text-[18px] font-semibold text-[#101828] mb-4">
          Add Category
        </h3>

        <div className="mb-4">
          <label className="text-[12px] text-[#98a2b3] mb-1 block">
            Category Type
          </label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-[10px] px-3 py-2 text-[14px]"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="text-[12px] text-[#98a2b3] mb-1 block">
            Limit
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Enter limit"
            className="w-full border border-[#e5e7eb] rounded-[10px] px-3 py-2 text-[14px]"
          />
        </div>

        {error ? (
          <p className="mb-4 text-[12px] text-[#e5484d]">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-[13px] text-[#667085]"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#1db954] text-white rounded-[10px] text-[13px]"
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};


const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value) || 0);

const BudgetSummary = ({ totalEarned, totalSpent, totalLimit }) => {
  const usedPercent =
    totalLimit > 0 ? Math.min((totalSpent / totalLimit) * 100, 100) : 0;
  const remainingBalance = totalEarned - totalSpent;
  const remainingBudget = totalLimit - totalSpent;

  return (
    <div className="rounded-[16px] border border-[#edf0f2] bg-white px-10 py-7">
      <p className="text-[11px] text-center font-medium tracking-[0.08em] text-[#98a2b3]">
        REMAINING BALANCE
      </p>
      <h2
        className={`mt-2 text-center text-[34px] font-semibold tracking-tight ${
          remainingBalance < 0 ? "text-[#e5484d]" : "text-[#101828]"
        }`}
      >
        {formatCurrency(remainingBalance)}
      </h2>
      <p className="mt-1 text-center text-[13px] text-[#98a2b3]">
        out of {formatCurrency(totalEarned)} income earned
      </p>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-[0.08em] text-[#98a2b3]">
            BUDGET USAGE
          </p>
          <p className="text-[13px] text-[#667085]">
            {formatCurrency(totalSpent)} of {formatCurrency(totalLimit)}
          </p>
        </div>
        <ProgressBar
          value={totalSpent}
          limit={totalLimit}
          over={totalSpent > totalLimit}
        />
      </div>

      <div className="mt-3 flex justify-between text-[12px] text-[#98a2b3]">
        <span>{formatCurrency(0)}</span>
        <span>
          {usedPercent.toFixed(0)}% Used, Remaining from planned budget{" "}
          {formatCurrency(remainingBudget)}
        </span>
        <span>{formatCurrency(totalLimit)}</span>
      </div>

    </div>
  );
};

const EditLimitModal = ({ open, onClose, category, onLimitUpdated }) => {
  const [limit, setLimit] = useState(category?.maxLimit ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setLimit(category?.maxLimit ?? "");
      setError("");
      setSubmitting(false);
    }
  }, [category, open]);

  if (!open || !category) return null;

  const handleClose = () => {
    setError("");
    setSubmitting(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!limit || Number(limit) <= 0) {
      setError("Please enter a valid limit");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/app/budget/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            category: Number(category.categoryId),
            maxLimit: Number(limit),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update category limit");
      }

      await onLimitUpdated();
      handleClose();
    } catch (submitError) {
      console.error("Error updating category limit:", submitError);
      setError("Failed to update category limit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-[420px] rounded-[16px] bg-white p-6">
        <h3 className="mb-4 text-[18px] font-semibold text-[#101828]">
          Edit Limit
        </h3>

        <div className="mb-4">
          <label className="mb-1 block text-[12px] text-[#98a2b3]">
            Category
          </label>
          <input
            type="text"
            value={category.categoryName}
            disabled
            className="w-full rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[14px] text-[#667085]"
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-[12px] text-[#98a2b3]">
            Limit
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Enter new limit"
            className="w-full rounded-[10px] border border-[#e5e7eb] px-3 py-2 text-[14px]"
          />
        </div>

        {error ? (
          <p className="mb-4 text-[12px] text-[#e5484d]">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-[13px] text-[#667085]"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-[10px] bg-[#1db954] px-4 py-2 text-[13px] text-white"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteLimitModal = ({ open, onClose, category, onLimitDeleted }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setSubmitting(false);
      setError("");
    }
  }, [open]);

  if (!open || !category) return null;

  const handleDelete = async () => {
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/app/budget/${category.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete category limit");
      }

      await onLimitDeleted();
      onClose();
    } catch (submitError) {
      console.error("Error deleting category limit:", submitError);
      setError("Failed to delete category limit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[420px] rounded-[20px] bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.18)]">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f2] text-[#e5484d]">
          !
        </div>

        <h3 className="text-[20px] font-semibold text-[#101828]">
          Delete Limit
        </h3>
        <p className="mt-2 text-[14px] leading-6 text-[#667085]">
          Are you sure you want to delete "{category.categoryName}" limit?
        </p>

        {error ? (
          <p className="mt-4 text-[12px] text-[#e5484d]">{error}</p>
        ) : null}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] border border-[#d0d5dd] px-4 py-2 text-[14px] font-medium text-[#344054]"
            disabled={submitting}
          >
            No
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-[12px] bg-[#e5484d] px-4 py-2 text-[14px] font-medium text-white"
            disabled={submitting}
          >
            {submitting ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};


const CategoryCard = ({ category, onEdit, onDelete }) => {
  const { categoryName, spent, maxLimit } = category;
  const amount = spent;
  const limit = maxLimit;
  const over = spent > limit;

  return (
    <div className="bg-white rounded-[16px] px-6 py-5 border border-[#edf0f2] mb-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[15px] font-semibold text-[#101828]">{categoryName}</p>
        </div>

        <div className="text-right">
          <p
            className={`text-[15px] font-semibold ${
              over ? "text-[#e5484d]" : "text-[#101828]"
            }`}
          >
            {formatCurrency(amount)}
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onEdit(category)}
              className="cursor-pointer text-[12px] font-medium text-[#1db954]"
            >
              EDIT LIMIT
            </button>
            <button
              type="button"
              onClick={() => onDelete(category)}
              className="cursor-pointer text-[12px] font-medium text-[#e5484d]"
            >
              DELETE LIMIT
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar value={spent} limit={limit} over={over} />
      </div>

      <div className="flex justify-between text-[12px] mt-3">
        <span className={over ? "text-[#e5484d]" : "text-[#98a2b3]"}>
          Spent: {formatCurrency(spent)}
        </span>
        <span className="text-[#98a2b3]">Limit: {formatCurrency(limit)}</span>
      </div>

      {over && (
        <p className="text-[#e5484d] text-[12px] mt-2 text-right">
          Over budget by {formatCurrency(spent - limit)}
        </p>
      )}
    </div>
  );
};


const Categories = ({
  categories,
  modalCategories,
  loading,
  onCategoryAdded,
  onLimitUpdated,
  onLimitDeleted,
}) => {
  const [active, setActive] = useState("expenses");
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  return (
    <div className="mt-10">
      <h2 className="text-[20px] font-semibold text-[#101828] mb-5 text-center">
        Categories
      </h2>

      <div className="mb-6 flex w-full rounded-[12px] bg-[#f2f4f7] p-2">
        <button
          onClick={() => setActive("expenses")}
          className={`flex-1 rounded-[10px] py-3.5 text-[13px] font-medium transition ${
            active === "expenses"
              ? "bg-white text-[#1db954] shadow-sm"
              : "text-[#98a2b3]"
          }`}
        >
          Expenses
        </button>
      </div>

      {active === "expenses" &&
        (loading ? (
          <div className="text-center text-[#98a2b3] text-sm py-6">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-[#98a2b3] text-sm py-6">
            No expenses categories yet
          </div>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={setEditingCategory}
              onDelete={setDeletingCategory}
            />
          ))
        ))}

      <button
        onClick={() => setOpen(true)}
        className="w-full mt-5 py-3 border border-[#e5e7eb] rounded-[14px] text-[#667085] text-[14px] font-medium"
      >
        + Add New Category
      </button>

      <AddCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        categories={modalCategories}
        onCategoryAdded={onCategoryAdded}
      />
      <EditLimitModal
        open={Boolean(editingCategory)}
        onClose={() => setEditingCategory(null)}
        category={editingCategory}
        onLimitUpdated={onLimitUpdated}
      />
      <DeleteLimitModal
        open={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        category={deletingCategory}
        onLimitDeleted={onLimitDeleted}
      />
    </div>
  );
};

const BudgetingPage = () => {
  const [limits, setLimits] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(() =>
    getMonthStart(new Date()),
  );

  const fetchBudgetData = async () => {
    setLoading(true);

    try {
      const [limitsResponse, expensesResponse, incomesResponse, categoriesResponse] =
        await Promise.all([
          fetch("http://localhost:8080/api/app/budget/", {
            credentials: "include",
          }),
          fetch("http://localhost:8080/api/app/expenses/", {
            credentials: "include",
          }),
          fetch("http://localhost:8080/api/app/incomes/", {
            credentials: "include",
          }),
          fetch("http://localhost:8080/api/categories", {
            credentials: "include",
          }),
        ]);

      if (!limitsResponse.ok) {
        throw new Error("Failed to fetch category limits");
      }

      if (!expensesResponse.ok) {
        throw new Error("Failed to fetch expenses");
      }

      if (!incomesResponse.ok) {
        throw new Error("Failed to fetch incomes");
      }

      if (!categoriesResponse.ok) {
        throw new Error("Failed to fetch categories");
      }

      const [limitsData, expensesData, incomesData, categoriesData] = await Promise.all([
        limitsResponse.json(),
        expensesResponse.json(),
        incomesResponse.json(),
        categoriesResponse.json(),
      ]);

      setLimits(Array.isArray(limitsData) ? limitsData : []);
      setExpenses(Array.isArray(expensesData) ? expensesData : []);
      setIncomes(Array.isArray(incomesData) ? incomesData : []);
      setAllCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error("Error fetching budgeting data:", error);
      setLimits([]);
      setExpenses([]);
      setIncomes([]);
      setAllCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const handleMonthChange = (direction) => {
    const nextMonth = addMonths(selectedMonth, direction);

    if (
      hasDataForMonth(expenses, nextMonth) ||
      hasDataForMonth(incomes, nextMonth)
    ) {
      setSelectedMonth(nextMonth);
    }
  };

  const visibleExpenses = filterItemsByMonth(expenses, selectedMonth);
  const visibleIncomes = filterItemsByMonth(incomes, selectedMonth);

  const expenseTotalsByCategory = visibleExpenses.reduce((totals, expense) => {
    const categoryId = Number(expense.category);
    const amount = Number(expense.amount) || 0;
    totals[categoryId] = (totals[categoryId] || 0) + amount;
    return totals;
  }, {});

  const expenseCategories = limits
    .filter((limit) => limit.categoryType === "EXPENSE")
    .map((limit) => {
      const maxLimit = Number(limit.maxLimit) || 0;
      const spent = expenseTotalsByCategory[Number(limit.categoryId)] || 0;

      return {
        ...limit,
        maxLimit,
        spent,
      };
    });

  const expenseModalCategories = allCategories.filter(
    (category) => category.type === "EXPENSE",
  );

  const totalSpent = expenseCategories.reduce(
    (sum, category) => sum + category.spent,
    0,
  );

  const totalEarned = visibleIncomes.reduce(
    (sum, income) => sum + (Number(income.amount) || 0),
    0,
  );

  const totalLimit = expenseCategories.reduce(
    (sum, category) => sum + category.maxLimit,
    0,
  );

  return (
    <div className="flex min-h-screen bg-base-200">
      <div className="w-64">
        <TransactionNav />
      </div>

      <div className="flex-1 bg-[#f6f7fb] py-14 px-6 flex justify-center">
        <div className="w-[65%]">
          <h1 className="text-[36px] font-semibold text-[#15803d] text-center mb-10 tracking-tight">
            Budgeting
          </h1>
          <div className="mb-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleMonthChange(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d0d5dd] bg-white text-[#344054]"
            >
              {"<"}
            </button>
            <p className="min-w-[180px] text-center text-[22px] font-medium text-[#101828]">
              {formatMonthLabel(selectedMonth)}
            </p>
            <button
              type="button"
              onClick={() => handleMonthChange(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d0d5dd] bg-white text-[#344054]"
            >
              {">"}
            </button>
          </div>

          <BudgetSummary
            totalEarned={totalEarned}
            totalSpent={totalSpent}
            totalLimit={totalLimit}
          />
          <Categories
            categories={expenseCategories}
            modalCategories={expenseModalCategories}
            loading={loading}
            onCategoryAdded={fetchBudgetData}
            onLimitUpdated={fetchBudgetData}
            onLimitDeleted={fetchBudgetData}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetingPage;
