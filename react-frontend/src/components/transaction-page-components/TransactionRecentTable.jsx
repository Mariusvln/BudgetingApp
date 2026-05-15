import { useCallback, useEffect, useMemo, useState } from "react";

function TransactionRecentTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatMobileDate = (dateValue) => {
    const date = new Date(dateValue);
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (left, right) =>
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate();

    if (Number.isNaN(date.getTime())) {
      return "Today";
    }

    if (isSameDay(date, today)) {
      return "Today";
    }

    if (isSameDay(date, yesterday)) {
      return "Yesterday";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatAmount = (amount, type) => {
    const numericAmount = Number(amount) || 0;
    const prefix = type === "INCOME" ? "+" : "-";
    return `${prefix}$${numericAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const fetchTransactions = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "/api/app/expenses/transactions-overview",
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching dashboard transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === "ALL") {
      return transactions;
    }

    return transactions.filter(
      (transaction) => transaction.transactionType === activeTab,
    );
  }, [activeTab, transactions]);

  const getCategoryName = (transaction) =>
    transaction.categoryName ||
    (transaction.transactionType === "INCOME"
      ? "Income"
      : "Expense");

  const getMobileIconType = (transaction) => {
    const text =
      `${getCategoryName(transaction)} ${transaction.description || ""}`.toLowerCase();

    if (transaction.transactionType === "INCOME") return "income";
    if (
      text.includes("food") ||
      text.includes("drink") ||
      text.includes("coffee")
    ) {
      return "food";
    }
    if (
      text.includes("transport") ||
      text.includes("uber") ||
      text.includes("trip")
    ) {
      return "transport";
    }

    return "calendar";
  };

  const MobileTransactionIcon = ({ type }) => {
    if (type === "income") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="6" width="18" height="13" rx="2.5" />
          <path d="M7 9.5h10" />
          <rect x="8" y="11" width="8" height="5" rx="1.5" />
          <circle cx="12" cy="13.5" r="1.2" />
        </svg>
      );
    }

    if (type === "food") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 4v7" />
          <path d="M5 4v7" />
          <path d="M9 4v7" />
          <path d="M5 11h4" />
          <path d="M7 11v9" />
          <path d="M16 4v16" />
          <path d="M16 4c2.2 1.3 3.2 3 3.2 5.4 0 1.9-.9 3.2-3.2 3.2" />
        </svg>
      );
    }

    if (type === "transport") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12l1.6-4.2A2 2 0 0 1 8.5 6.5h7a2 2 0 0 1 1.9 1.3L19 12" />
          <path d="M5 12h14v5H5z" />
          <path d="M7 17v1.5" />
          <path d="M17 17v1.5" />
          <circle cx="8" cy="14.5" r="1" />
          <circle cx="16" cy="14.5" r="1" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="5" width="14" height="16" rx="2" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M8 10h8" />
      </svg>
    );
  };

  const mobileTransactions = filteredTransactions.slice(0, 10);

  return (
    <>
      <section className="transactions-mobile lg:hidden">
        <div className="transactions-mobile__header">
          <h2>Recent Transactions</h2>
          <button type="button">See All</button>
        </div>

        <div className="transactions-mobile__list">
          {loading ? (
            <div className="transactions-mobile__empty">Loading transactions...</div>
          ) : mobileTransactions.length === 0 ? (
            <div className="transactions-mobile__empty">No transactions found</div>
          ) : (
            mobileTransactions.map((transaction) => {
              const categoryName = getCategoryName(transaction);
              const iconType = getMobileIconType(transaction);
              const isIncome = transaction.transactionType === "INCOME";

              return (
                <article
                  className="transactions-mobile__item"
                  key={transaction.id}
                >
                  <div
                    className={`transactions-mobile__icon transactions-mobile__icon--${iconType}`}
                  >
                    <MobileTransactionIcon type={iconType} />
                  </div>

                  <div className="transactions-mobile__details">
                    <h3>{transaction.description || "No description"}</h3>
                    <p>
                      {categoryName} <span>&middot;</span>{" "}
                      {formatMobileDate(transaction.date)}
                    </p>
                  </div>

                  <p
                    className={`transactions-mobile__amount ${
                      isIncome ? "transactions-mobile__amount--income" : ""
                    }`}
                  >
                    {formatAmount(transaction.amount, transaction.transactionType)}
                  </p>
                </article>
              );
            })
          )}
        </div>
      </section>

      <div className="card hidden border border-base-200 bg-base-100 lg:block">
      <div className="card-body">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <p className="text-sm text-gray-500">
              {loading
                ? "Loading transactions..."
                : `You have ${filteredTransactions.length} transactions`}
            </p>
          </div>

          <div
            className="flex w-fit space-x-1 overflow-x-auto rounded-xl bg-base-200 p-1"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            {["ALL", "INCOME", "EXPENSE"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`btn btn-sm rounded-xl border-none px-4 ${
                  activeTab === tab
                    ? "bg-green-700 text-white"
                    : "bg-transparent"
                }`}
                aria-selected={activeTab === tab}
              >
                {tab === "ALL"
                  ? "All"
                  : tab === "INCOME"
                    ? "Income"
                    : "Expenses"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-sm text-gray-500">
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>

                    <td className="font-medium">
                      {transaction.description || "No description"}
                    </td>

                    <td>
                      <span className="badge badge-soft badge-primary text-xs">
                        {transaction.categoryName}
                      </span>
                    </td>

                    <td
                      className={`text-right font-medium ${
                        transaction.transactionType === "INCOME"
                          ? "text-green-500"
                          : "text-red-600"
                      }`}
                    >
                      {formatAmount(
                        transaction.amount,
                        transaction.transactionType,
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {loading
              ? "Loading..."
              : `Showing ${filteredTransactions.length} results`}
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default TransactionRecentTable;
