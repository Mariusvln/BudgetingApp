import TransactionNav from "../components/TransactionNav";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  convertFromEuro,
  convertToEuro,
  formatCurrency as formatMoney,
  getCurrencyPlaceholder,
} from "../utils/currency";

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

  const [animatedPercent, setAnimatedPercent] = useState(0);

    useEffect(() => {
      const frame = requestAnimationFrame(() => {
        setAnimatedPercent(percent);
      });

      return () => cancelAnimationFrame(frame);
    }, [percent]);

  return (
    <div className="w-full h-[10px] rounded-full bg-base-300 overflow-hidden">
      <div
        className={`h-[10px] rounded-full transition-[width] duration-1000 ease-out ${over ? "bg-error" : "bg-primary"}`}
        style={{ width: `${animatedPercent}%` }}
      />
    </div>
  );
};


const AddCategoryModal = ({ open, onClose, categories, onCategoryAdded }) => {
  const { user } = useAuth();
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
          maxLimit: convertToEuro(limit, user?.currency),
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
      <div className="w-full max-w-[420px] rounded-[16px] bg-base-100 p-6 text-base-content shadow-xl">
        <h3 className="text-[18px] font-semibold text-base-content mb-4">
          Add Category
        </h3>

        <div className="mb-4">
          <label className="text-[12px] text-base-content/60 mb-1 block">
            Category Type
          </label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full border border-base-300 rounded-[10px] bg-base-100 px-3 py-2 text-[14px] text-base-content"
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
          <label className="text-[12px] text-base-content/60 mb-1 block">
            Limit
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder={getCurrencyPlaceholder(user?.currency)}
            className="w-full border border-base-300 rounded-[10px] bg-base-100 px-3 py-2 text-[14px] text-base-content"
          />
        </div>

        {error ? (
          <p className="mb-4 text-[12px] text-error">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-[13px] text-base-content/70"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-[10px] bg-primary px-4 py-2 text-[13px] text-primary-content"
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};


const formatCurrency = (value, currency) => formatMoney(value, currency);

const BudgetSummary = ({ totalEarned, totalSpent, totalLimit, currency }) => {
  const usedPercent =
    totalLimit > 0 ? Math.min((totalSpent / totalLimit) * 100, 100) : 0;
  const remainingBalance = totalEarned - totalSpent;
  const remainingBudget = totalLimit - totalSpent;

  return (
    <div className="rounded-[16px] border border-base-300 bg-base-100 px-10 py-7 text-base-content">
      <p className="text-[11px] text-center font-medium tracking-[0.08em] text-base-content/60">
        REMAINING BALANCE
      </p>
      <h2
        className={`mt-2 text-center text-[34px] font-semibold tracking-tight ${
          remainingBalance < 0 ? "text-error" : "text-base-content"
        }`}
      >
        {formatCurrency(remainingBalance, currency)}
      </h2>
      <p className="mt-1 text-center text-[13px] text-base-content/65">
        out of {formatCurrency(totalEarned, currency)} income earned
      </p>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-[0.08em] text-base-content/60">
            BUDGET USAGE
          </p>
          <p className="text-[13px] text-base-content/70">
            {formatCurrency(totalSpent, currency)} of {formatCurrency(totalLimit, currency)}
          </p>
        </div>
        <ProgressBar
          value={totalSpent}
          limit={totalLimit}
          over={totalSpent > totalLimit}
        />
      </div>

      <div className="mt-3 flex justify-between text-[12px] text-base-content/60">
        <span>{formatCurrency(0, currency)}</span>
        <span>
          {usedPercent.toFixed(0)}% Used, Remaining from planned budget{" "}
          {formatCurrency(remainingBudget, currency)}
        </span>
        <span>{formatCurrency(totalLimit, currency)}</span>
      </div>

    </div>
  );
};

const EditLimitModal = ({ open, onClose, category, onLimitUpdated }) => {
  const { user } = useAuth();
  const [limit, setLimit] = useState(
    convertFromEuro(category?.maxLimit, user?.currency) || "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setLimit(convertFromEuro(category?.maxLimit, user?.currency) || "");
      setError("");
      setSubmitting(false);
    }
  }, [category, open, user?.currency]);

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
            maxLimit: convertToEuro(limit, user?.currency),
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
      <div className="w-full max-w-[420px] rounded-[16px] bg-base-100 p-6 text-base-content shadow-xl">
        <h3 className="mb-4 text-[18px] font-semibold text-base-content">
          Edit Category Limit
        </h3>

        <div className="mb-4">
          <label className="mb-1 block text-[12px] text-base-content/60">
            Category
          </label>
          <input
            type="text"
            value={category?.categoryName ?? ""}
            disabled
            className="w-full rounded-[10px] border border-base-300 bg-base-200 px-3 py-2 text-[14px] text-base-content/70"
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-[12px] text-base-content/60">
            Limit
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder={getCurrencyPlaceholder(user?.currency)}
            className="w-full rounded-[10px] border border-base-300 bg-base-100 px-3 py-2 text-[14px] text-base-content"
          />
        </div>

        {error ? (
          <p className="mb-4 text-[12px] text-error">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-[13px] text-base-content/70"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-[10px] bg-primary px-4 py-2 text-[13px] text-primary-content"
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
      setError("");
      setSubmitting(false);
    }
  }, [open, category]);

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
      <div className="w-full max-w-[420px] rounded-[20px] bg-base-100 p-6 text-base-content shadow-xl">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-error">
          !
        </div>

        <h3 className="text-[20px] font-semibold text-base-content">
          Delete Limit
        </h3>
        <p className="mt-2 text-[14px] leading-6 text-base-content/70">
          Are you sure you want to delete "{category.categoryName}" limit?
        </p>

        {error ? (
          <p className="mt-4 text-[12px] text-error">{error}</p>
        ) : null}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] border border-base-300 px-4 py-2 text-[14px] font-medium text-base-content"
            disabled={submitting}
          >
            No
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-[12px] bg-error px-4 py-2 text-[14px] font-medium text-error-content"
            disabled={submitting}
          >
            {submitting ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE = 10;

const formatItemDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));

const CategoryCard = ({ category, onEdit, onDelete, expenses, currency }) => {
  const { categoryName, spent, maxLimit } = category;
  const amount = spent;
  const limit = maxLimit;
  const over = spent > limit;
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryItems = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  const pageCount = Math.max(1, Math.ceil(categoryItems.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const pageStart = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = categoryItems.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  return (
    <div className="bg-base-100 rounded-[16px] px-6 py-5 border border-base-300 mb-4 text-base-content">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[15px] font-semibold text-base-content">{categoryName}</p>
        </div>

        <div className="text-right">
          <p
            className={`text-[15px] font-semibold ${
              over ? "text-error" : "text-base-content"
            }`}
          >
            {formatCurrency(amount, currency)}
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onEdit(category)}
              className="cursor-pointer text-[12px] font-medium text-primary"
            >
              EDIT LIMIT
            </button>
            <button
              type="button"
              onClick={() => onDelete(category)}
              className="cursor-pointer text-[12px] font-medium text-error"
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
        <span className={over ? "text-error" : "text-base-content/60"}>
          Spent: {formatCurrency(spent, currency)}
        </span>
        <span className="text-base-content/60">Limit: {formatCurrency(limit, currency)}</span>
      </div>

      {over && (
        <p className="text-error text-[12px] mt-2 text-right">
          Over budget by {formatCurrency(spent - limit, currency)}
        </p>
      )}

      <button
        type="button"
        onClick={() => {
          setIsExpanded((prev) => !prev);
          setCurrentPage(1);
        }}
        className="mt-4 w-full rounded-[10px] border border-base-300 py-2 text-[12px] font-medium text-base-content/70 hover:bg-base-200"
      >
        {isExpanded ? "Hide details" : "Show details"}
      </button>

      {isExpanded && (
        <div className="mt-3 rounded-[10px] border border-base-300">
          {categoryItems.length === 0 ? (
            <p className="px-3 py-3 text-[12px] text-base-content/60">
              No expenses in this category for selected month.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-base-300">
                {paginatedItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between px-3 py-2">
                    <div>
                      <p className="text-[12px] font-medium text-base-content">
                        {item.description || item.note || item.title || "Expense"}
                      </p>
                      <p className="text-[11px] text-base-content/60">
                        {formatItemDate(item.date)}
                      </p>
                    </div>
                    <p className="text-[12px] font-semibold text-base-content">
                      {formatCurrency(item.amount, currency)}
                    </p>
                  </li>
                ))}
              </ul>

              {pageCount > 1 && (
                <div className="flex items-center justify-between border-t border-base-300 px-3 py-2 text-[12px]">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={safeCurrentPage === 1}
                    className="text-base-content/70 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-base-content/60">
                    Page {safeCurrentPage} of {pageCount}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(pageCount, page + 1))
                    }
                    disabled={safeCurrentPage === pageCount}
                    className="text-base-content/70 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};


const Categories = ({
  categories,
  modalCategories,
  expenses,
  loading,
  currency,
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
      <h2 className="text-[20px] font-semibold text-base-content mb-5 text-center">
        Categories
      </h2>

      <div className="mb-6 flex w-full rounded-[12px] bg-base-200 p-2">
        <button
          onClick={() => setActive("expenses")}
          className={`flex-1 rounded-[10px] py-3.5 text-[13px] font-medium transition ${
            active === "expenses"
              ? "bg-base-100 text-primary shadow-sm"
              : "text-base-content/60"
          }`}
        >
          Expenses
        </button>
      </div>

      {active === "expenses" &&
        (loading ? (
          <div className="text-center text-base-content/60 text-sm py-6">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-base-content/60 text-sm py-6">
            No expenses categories yet
          </div>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={setEditingCategory}
              onDelete={setDeletingCategory}
              expenses={expenses.filter(
                (expense) => Number(expense.category) === Number(category.categoryId),
              )}
              currency={currency}
            />
          ))
        ))}

      <button
        onClick={() => setOpen(true)}
        className="w-full mt-5 py-3 border border-base-300 rounded-[14px] text-base-content/70 text-[14px] font-medium hover:bg-base-100"
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
  const { user } = useAuth();
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

  const currentMonth = getMonthStart(new Date());

  const handleMonthChange = (direction) => {
    const nextMonth = addMonths(selectedMonth, direction);

    if (nextMonth > currentMonth) {
      return;
    }

    if (
      direction > 0 ||
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

  const totalSpent = visibleExpenses.reduce(
    (sum, expense) => sum + (Number(expense.amount) || 0),
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
    <div className="flex min-h-screen bg-base-200 lg:ml-64">
      <TransactionNav />

      <div className="flex-1 bg-base-200 px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="text-[36px] font-semibold text-primary text-center mb-10 tracking-tight">
            Budgeting
          </h1>
          <div className="mb-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleMonthChange(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content"
            >
              {"<"}
            </button>
            <p className="min-w-[180px] text-center text-[22px] font-medium text-base-content">
              {formatMonthLabel(selectedMonth)}
            </p>
            <button
              type="button"
              onClick={() => handleMonthChange(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content"
            >
              {">"}
            </button>
          </div>

          <BudgetSummary
            totalEarned={totalEarned}
            totalSpent={totalSpent}
            totalLimit={totalLimit}
            currency={user?.currency}
          />
          <Categories
            categories={expenseCategories}
            modalCategories={expenseModalCategories}
            expenses={visibleExpenses}
            loading={loading}
            currency={user?.currency}
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
