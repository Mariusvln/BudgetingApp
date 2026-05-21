import { Fragment, useState } from "react";
import Transaction from "./Transaction";
import IncomeEditForm from "./IncomeEditForm";
import { useAuth } from "../../contexts/AuthContext";
import { useAppAlert } from "../../contexts/useAppAlert";
import { formatCurrency } from "../../utils/currency";

function IncomeRecentTable({
  transactions,
  loading,
  dateStart,
  dateEnd,
  setDateStart,
  setDateEnd,
  onTransactionAdded,
  categories = [],
  searchQuery = "",
  selectedCategory = "ALL",
  setSearchQuery,
  setSelectedCategory,
  totalCount,
}) {
  const { user } = useAuth();
  const appAlert = useAppAlert();
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [deletingTransactionId, setDeletingTransactionId] = useState(null);
  const formatMobileDate = (dateValue) => {
    const date = new Date(dateValue);
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (left, right) =>
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate();

    if (Number.isNaN(date.getTime())) return "Today";
    if (isSameDay(date, today)) return "Today";
    if (isSameDay(date, yesterday)) return "Yesterday";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatAmount = (amount) => `+${formatCurrency(amount, user?.currency)}`;

  const getCategoryName = (categoryId) =>
    categories.find((cat) => Number(cat.id) === Number(categoryId))?.name ||
    `Category #${categoryId}`;

  const mobileTransactions = transactions.slice(0, 10);
  const toggleMobileEdit = (transactionId) => {
    setEditingTransactionId((currentId) =>
      currentId === transactionId ? null : transactionId,
    );
  };

  const handleMobileDelete = async (transactionId) => {
    const confirmed = await appAlert.confirm("Delete this income?", {
      confirmText: "Delete",
      description: "This action cannot be undone.",
      type: "error",
    });

    if (!confirmed) {
      return;
    }

    setDeletingTransactionId(transactionId);

    try {
      const response = await fetch(
        `http://localhost:8080/api/app/incomes/?incomeId=${encodeURIComponent(transactionId)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete income");
      }

      if (editingTransactionId === transactionId) {
        setEditingTransactionId(null);
      }

      onTransactionAdded?.();
      await appAlert.alert("Income deleted successfully!", { type: "success" });
    } catch (error) {
      console.error("Error deleting income:", error);
      await appAlert.alert("Could not delete income.", { type: "error" });
    } finally {
      setDeletingTransactionId(null);
    }
  };

  const IncomeMobileIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M7 9.5h10" />
      <rect x="8" y="11" width="8" height="5" rx="1.5" />
      <circle cx="12" cy="13.5" r="1.2" />
    </svg>
  );

  return (
    <>
      <section className="transactions-mobile lg:hidden">
        <div className="transactions-mobile__header">
          <h2>Incomes</h2>
        </div>

        <div className="transactions-mobile__list">
          {loading ? (
            <div className="transactions-mobile__empty">Loading incomes...</div>
          ) : mobileTransactions.length === 0 ? (
            <div className="transactions-mobile__empty">No incomes found</div>
          ) : (
            mobileTransactions.map((transaction) => {
              const categoryName = getCategoryName(transaction.category);

              return (
                <Fragment key={transaction.id}>
                  <article className="transactions-mobile__item">
                    <div className="transactions-mobile__icon transactions-mobile__icon--income">
                      <IncomeMobileIcon />
                    </div>

                    <div className="transactions-mobile__details">
                      <h3>{transaction.description || "No description"}</h3>
                      <p>
                        {categoryName} <span>&middot;</span>{" "}
                        {formatMobileDate(transaction.date)}
                      </p>
                    </div>

                    <p className="transactions-mobile__amount transactions-mobile__amount--income">
                      {formatAmount(transaction.amount)}
                    </p>

                    <div className="transactions-mobile__actions">
                      <button
                        type="button"
                        className="transactions-mobile__edit-button"
                        onClick={() => toggleMobileEdit(transaction.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="transactions-mobile__delete-button"
                        onClick={() => handleMobileDelete(transaction.id)}
                        disabled={deletingTransactionId === transaction.id}
                      >
                        {deletingTransactionId === transaction.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </article>

                  {editingTransactionId === transaction.id && (
                    <IncomeEditForm
                      id={transaction.id}
                      description={transaction.description}
                      category={transaction.category}
                      amount={transaction.amount}
                      date={transaction.date}
                      show={() => toggleMobileEdit(transaction.id)}
                      onTransactionAdded={onTransactionAdded}
                      categories={categories}
                    />
                  )}
                </Fragment>
              );
            })
          )}
        </div>
      </section>

      <div className="card hidden border border-base-300 bg-base-100 shadow-sm lg:block">
      <div className="card-body">
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Cash flow
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Income History</h2>
            <p className="text-sm text-base-content/60">
              {loading
                ? "Loading..."
                : `Showing ${transactions.length} of ${totalCount ?? transactions.length} entries`}
            </p>
          </div>
            <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-bold text-success">
              Income
            </div>
          </div>

          <div className="rounded-2xl bg-base-200/60 p-3">
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 2xl:grid-cols-[minmax(240px,1fr)_210px_160px_160px_auto]">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                Search
              </span>
              <input
                type="text"
                className="input input-bordered h-11 rounded-xl border-base-300 bg-base-100 text-sm text-base-content placeholder:text-base-content/45"
                placeholder="Title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                Category
              </span>
              <select
                className="select select-bordered h-11 rounded-xl border-base-300 bg-base-100 text-sm text-base-content"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory?.(e.target.value)}
              >
                <option value="ALL">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                From
              </span>
              <input
                type="date"
                className="input input-bordered h-11 rounded-xl border-base-300 bg-base-100 text-sm text-base-content"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                To
              </span>
              <input
                type="date"
                className="input input-bordered h-11 rounded-xl border-base-300 bg-base-100 text-sm text-base-content"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="btn h-11 self-end rounded-xl border-base-300 bg-base-100 px-5 text-base-content/75 hover:bg-base-200 disabled:bg-base-200/80 disabled:text-base-content/45 disabled:opacity-100 xl:justify-self-start 2xl:justify-self-auto"
              onClick={() => {
                setSearchQuery?.("");
                setSelectedCategory?.("ALL");
              }}
              disabled={!searchQuery.trim() && selectedCategory === "ALL"}
            >
              Reset
            </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-sm text-base-content/55">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="text-right">Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <Transaction
                    key={t.id}
                    id={t.id}
                    description={t.description}
                    category={t.category}
                    amount={t.amount}
                    date={t.date}
                    onTransactionAdded={onTransactionAdded}
                    categories={categories}
                  />
                ))
              )}
            </tbody>
          </table>

          {!loading && transactions.length === 0 && (
            <div className="py-10 text-center text-base-content/40">
              No data found for this range
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default IncomeRecentTable;
