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

const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <rect x="5" y="5" width="14" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M8 3v4M16 3v4M8 10h8M8 14h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M16 12h4v4h-4a2 2 0 0 1 0-4Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M7 5V4h9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TrendIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path d="M4 17 9 12l4 4 7-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 7h5v5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


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
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-base-300">
      <div
        className={`h-full rounded-full transition-[width] duration-1000 ease-out ${over ? "bg-error" : "bg-primary"}`}
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[420px] rounded-3xl border border-base-300 bg-base-100 p-6 text-base-content shadow-xl">
        <h3 className="mb-4 text-xl font-black text-base-content">
          Add Limit
        </h3>

        <div className="mb-4">
          <label className="text-[12px] text-base-content/60 mb-1 block">
            Category Type
          </label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2.5 text-sm text-base-content"
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
            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2.5 text-sm text-base-content placeholder:text-base-content/45"
          />
        </div>

        {error ? (
          <p className="mb-4 text-[12px] text-error">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="rounded-xl border border-base-300 px-4 py-2 text-sm font-semibold text-base-content/70 hover:bg-base-200"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-content hover:bg-primary/90"
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
  const overBudget = totalSpent > totalLimit;
  const healthLabel =
    totalLimit <= 0
      ? "No plan"
      : overBudget
        ? "Over budget"
        : usedPercent > 80
          ? "Close to limit"
          : "On track";

  const summaryCards = [
    {
      label: "Income earned",
      value: formatCurrency(totalEarned, currency),
      tone: "text-success",
      icon: <WalletIcon />,
    },
    {
      label: "Planned budget",
      value: formatCurrency(totalLimit, currency),
      tone: "text-base-content",
      icon: <BudgetIcon />,
    },
    {
      label: "Remaining plan",
      value: formatCurrency(remainingBudget, currency),
      tone: remainingBudget < 0 ? "text-error" : "text-primary",
      icon: <TrendIcon />,
    },
  ];

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-[radial-gradient(circle_at_12%_8%,color-mix(in_oklch,var(--color-primary-content)_28%,transparent),transparent_11rem),linear-gradient(145deg,color-mix(in_oklch,var(--color-primary)_88%,black),var(--color-primary))] p-6 text-primary-content shadow-[0_22px_50px_color-mix(in_oklch,var(--color-primary)_22%,transparent)] sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary-content/15 blur-2xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-content/70">
              Monthly Balance
            </p>
            <h2
              className={`mt-3 text-4xl font-black tracking-tight sm:text-5xl ${
                remainingBalance < 0 ? "text-error-content" : "text-primary-content"
              }`}
            >
              {formatCurrency(remainingBalance, currency)}
            </h2>
            <p className="mt-3 max-w-xl text-sm font-semibold text-primary-content/70">
              {formatCurrency(totalSpent, currency)} spent from {formatCurrency(totalEarned, currency)} earned this month.
            </p>
          </div>
          <div
            className={`rounded-2xl px-4 py-3 text-right backdrop-blur ${
              overBudget ? "bg-error-content/18 text-error-content" : "bg-primary-content/18 text-primary-content"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wide">Usage</p>
            <p className="mt-1 text-2xl font-black">{usedPercent.toFixed(0)}%</p>
            <p className="mt-1 text-xs font-bold opacity-75">{healthLabel}</p>
          </div>
        </div>

        <div className="relative mt-7 rounded-2xl bg-primary-content/14 p-4 backdrop-blur">
          <div className="mb-3 flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-primary-content">Budget usage</span>
            <span className="font-semibold text-primary-content/75">
              {formatCurrency(totalSpent, currency)} / {formatCurrency(totalLimit, currency)}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-primary-content/24">
            <div
              className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
                overBudget ? "bg-error-content" : "bg-primary-content"
              }`}
              style={{ width: `${usedPercent}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-semibold text-primary-content/65">
            <span>{formatCurrency(0, currency)}</span>
            <span>{formatCurrency(totalLimit, currency)}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="flex items-center gap-4 rounded-[1.6rem] border border-base-300 bg-base-100 p-5 shadow-sm"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-base-200 text-primary">
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-base-content/45">
                {card.label}
              </p>
              <p className={`mt-1 truncate text-2xl font-black ${card.tone}`}>
                {card.value}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[420px] rounded-3xl border border-base-300 bg-base-100 p-6 text-base-content shadow-xl">
        <h3 className="mb-4 text-xl font-black text-base-content">
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
            className="w-full rounded-xl border border-base-300 bg-base-200 px-3 py-2.5 text-sm text-base-content/70"
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
            className="w-full rounded-xl border border-base-300 bg-base-100 px-3 py-2.5 text-sm text-base-content placeholder:text-base-content/45"
          />
        </div>

        {error ? (
          <p className="mb-4 text-[12px] text-error">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="rounded-xl border border-base-300 px-4 py-2 text-sm font-semibold text-base-content/70 hover:bg-base-200"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-content hover:bg-primary/90"
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
    <article className="group rounded-[1.6rem] border border-base-300 bg-base-100 p-4 text-base-content shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_18px_38px_color-mix(in_oklch,var(--color-base-content)_8%,transparent)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
              over ? "bg-error/10 text-error" : "bg-primary/10 text-primary"
            }`}
          >
            <BudgetIcon />
          </div>
          <div className="min-w-0">
            <p className={`truncate text-lg font-black ${over ? "text-error" : "text-base-content"}`}>
              {categoryName}
            </p>
            <p className="mt-1 text-xs font-semibold text-base-content/45">
              {categoryItems.length} expenses this month
            </p>
          </div>
        </div>

        <div className="sm:text-right">
          <p
            className={`text-xl font-black ${
              over ? "text-error" : "text-base-content"
            }`}
          >
            {formatCurrency(amount, currency)}
          </p>
          <p className="mt-1 text-xs font-semibold text-base-content/50">
            of {formatCurrency(limit, currency)}
          </p>
          <div className="mt-3 flex items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => onEdit(category)}
              className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary/15"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(category)}
              className="rounded-xl border border-error/20 bg-error/10 px-3 py-1.5 text-xs font-bold text-error transition hover:bg-error/15"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar value={spent} limit={limit} over={over} />
      </div>

      <div className="mt-3 flex justify-between text-xs font-semibold">
        <span className={over ? "text-error" : "text-base-content/60"}>
          Spent: {formatCurrency(spent, currency)}
        </span>
        <span className="text-base-content/60">Limit: {formatCurrency(limit, currency)}</span>
      </div>

      {over && (
        <p className="mt-3 rounded-xl bg-error/10 px-3 py-2 text-right text-xs font-bold text-error">
          Over budget by {formatCurrency(spent - limit, currency)}
        </p>
      )}

      <button
        type="button"
        onClick={() => {
          setIsExpanded((prev) => !prev);
          setCurrentPage(1);
        }}
        className="mt-4 w-full rounded-2xl border border-base-300 bg-base-100 py-2.5 text-sm font-bold text-base-content/70 transition hover:bg-base-200"
      >
        {isExpanded ? "Hide details" : "Show details"}
      </button>

      {isExpanded && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-base-300 bg-base-200/45">
          {categoryItems.length === 0 ? (
            <p className="px-3 py-3 text-[12px] text-base-content/60">
              No expenses in this category for selected month.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-base-300">
                {paginatedItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 px-3 py-3">
                    <div>
                      <p className="text-sm font-bold text-base-content">
                        {item.description || item.note || item.title || "Expense"}
                      </p>
                      <p className="text-xs font-medium text-base-content/55">
                        {formatItemDate(item.date)}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-black text-base-content">
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
    </article>
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
    <section className="mt-6 rounded-[2rem] border border-base-300 bg-base-100 p-4 shadow-[0_16px_36px_color-mix(in_oklch,var(--color-base-content)_7%,transparent)] sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Limits
          </p>
          <h2 className="mt-1 text-2xl font-black text-base-content">
            Category limits
          </h2>
          <p className="mt-1 text-sm font-medium text-base-content/55">
            Track monthly spending against every planned category.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-content transition hover:bg-primary/90"
        >
          + Add limit
        </button>
      </div>

      <div className="mb-5 flex w-full rounded-2xl bg-base-200 p-1.5">
        <button
          onClick={() => setActive("expenses")}
          className={`flex-1 rounded-xl py-3 text-sm font-bold transition ${
            active === "expenses"
              ? "bg-base-100 text-primary shadow-sm"
              : "text-base-content/60 hover:text-base-content"
          }`}
        >
          Expenses
        </button>
      </div>

      <div className="max-h-[760px] overflow-y-auto pr-1">
        {active === "expenses" &&
        (loading ? (
          <div className="rounded-2xl bg-base-200 p-6 text-center text-sm font-semibold text-base-content/60">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl bg-base-200 p-8 text-center text-sm font-semibold text-base-content/60">
            No expenses categories yet
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
          {categories.map((category) => (
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
          ))}
          </div>
        ))}
      </div>

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
    </section>
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

      <div className="flex-1 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--color-primary)_10%,transparent),transparent_34rem),var(--color-base-200)] px-4 py-6 pb-28 md:px-6 lg:pb-8">
        <div className="mx-auto w-full max-w-7xl">
          <section className="mb-6 overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Budgeting
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-base-content sm:text-5xl">
                  Monthly plan
                </h1>
                <p className="mt-2 max-w-2xl text-sm font-medium text-base-content/60">
                  Compare income, planned limits and real spending category by category.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-base-300 bg-base-200/70 p-2 sm:justify-center">
                <button
                  type="button"
                  onClick={() => handleMonthChange(-1)}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-base-100 text-lg font-black text-base-content transition hover:bg-base-300"
                  aria-label="Previous month"
                >
                  {"<"}
                </button>
                <p className="min-w-44 text-center text-base font-black text-base-content sm:min-w-52 sm:text-lg">
                  {formatMonthLabel(selectedMonth)}
                </p>
                <button
                  type="button"
                  onClick={() => handleMonthChange(1)}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-base-100 text-lg font-black text-base-content transition hover:bg-base-300 disabled:opacity-45"
                  disabled={addMonths(selectedMonth, 1) > currentMonth}
                  aria-label="Next month"
                >
                  {">"}
                </button>
              </div>
            </div>
          </section>

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
