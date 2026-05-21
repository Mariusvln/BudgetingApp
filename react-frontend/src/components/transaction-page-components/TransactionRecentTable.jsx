import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { formatCurrency } from "../../utils/currency";

const tabs = [
  { value: "ALL", label: "All" },
  { value: "INCOME", label: "Income" },
  { value: "EXPENSE", label: "Expenses" },
];

const toNumber = (value) => Number(value) || 0;

function TransactionRecentTable() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "Unknown date";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatAmount = (amount, type) => {
    const prefix = type === "INCOME" ? "+" : "-";
    return `${prefix}${formatCurrency(amount, user?.currency)}`;
  };

  const fetchTransactions = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/app/expenses/transactions-overview",
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
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesTab =
        activeTab === "ALL" || transaction.transactionType === activeTab;

      if (!matchesTab) return false;
      if (!normalizedSearch) return true;

      return [
        transaction.description,
        transaction.categoryName,
        transaction.transactionType,
        transaction.date,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedSearch));
    });
  }, [activeTab, searchQuery, transactions]);

  const stats = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.transactionType === "INCOME")
      .reduce((sum, transaction) => sum + toNumber(transaction.amount), 0);
    const expenses = transactions
      .filter((transaction) => transaction.transactionType === "EXPENSE")
      .reduce((sum, transaction) => sum + toNumber(transaction.amount), 0);

    return [
      {
        label: "Total Income",
        value: formatCurrency(income, user?.currency),
        tone: "text-success",
      },
      {
        label: "Total Expenses",
        value: formatCurrency(expenses, user?.currency),
        tone: "text-error",
      },
      {
        label: "Balance",
        value: formatCurrency(income - expenses, user?.currency),
        tone: income - expenses >= 0 ? "text-primary" : "text-error",
      },
      {
        label: "Transactions",
        value: transactions.length.toLocaleString("en-US"),
        tone: "text-base-content",
      },
    ];
  }, [transactions, user?.currency]);

  const getCategoryName = (transaction) =>
    transaction.categoryName ||
    (transaction.transactionType === "INCOME" ? "Income" : "Expense");

  const visibleCountText = loading
    ? "Loading transactions..."
    : `Showing ${filteredTransactions.length.toLocaleString("en-US")} of ${transactions.length.toLocaleString("en-US")}`;

  return (
    <main className="mx-auto w-full max-w-[1440px]">
      <section className="mb-5 rounded-lg border border-base-300 bg-base-100 p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Transactions
            </p>
            <h1 className="mt-1 text-2xl font-bold text-base-content sm:text-3xl">
              Transaction history
            </h1>
            <p className="mt-2 text-sm font-medium text-base-content/60">
              Review income and expenses in one clean journal.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
            <label className="input input-bordered flex h-11 min-w-0 items-center gap-2 rounded-lg border-base-300 bg-base-100 sm:min-w-80">
              <span className="text-base-content/45">Search</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                type="search"
                className="grow text-sm text-base-content placeholder:text-base-content/40"
                placeholder="description, category, date..."
              />
            </label>

            <div
              className="flex w-full overflow-hidden rounded-lg border border-base-300 bg-base-200/60 p-1 sm:w-fit"
              aria-label="Transaction filters"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`h-9 flex-1 rounded-md px-4 text-sm font-semibold transition sm:flex-none ${
                    activeTab === tab.value
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-base-content/65 hover:bg-base-100 hover:text-base-content"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-base-content/55">{item.label}</p>
            <p className={`mt-2 text-2xl font-black ${item.tone}`}>{item.value}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
        <div className="flex flex-col gap-2 border-b border-base-300 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-base-content">Recent Transactions</h2>
            <p className="text-sm font-medium text-base-content/55">{visibleCountText}</p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/45">
            Newest first
          </p>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="table">
            <thead className="text-xs uppercase tracking-[0.14em] text-base-content/55">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center text-base-content/55">
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center text-base-content/55">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => {
                  const isIncome = transaction.transactionType === "INCOME";

                  return (
                    <tr
                      key={transaction.id}
                      className="border-base-200 hover:bg-base-200/45"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-base-content/65">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="max-w-[360px] px-5 py-4">
                        <p className="truncate font-semibold text-base-content">
                          {transaction.description || "No description"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge border-primary/15 bg-primary/10 text-primary">
                          {getCategoryName(transaction)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`badge ${
                            isIncome
                              ? "border-success/15 bg-success/10 text-success"
                              : "border-error/15 bg-error/10 text-error"
                          }`}
                        >
                          {isIncome ? "Income" : "Expense"}
                        </span>
                      </td>
                      <td
                        className={`px-5 py-4 text-right font-black ${
                          isIncome ? "text-success" : "text-error"
                        }`}
                      >
                        {formatAmount(transaction.amount, transaction.transactionType)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 p-4 lg:hidden">
          {loading ? (
            <div className="rounded-lg border border-base-300 p-6 text-center text-sm font-semibold text-base-content/55">
              Loading transactions...
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="rounded-lg border border-base-300 p-6 text-center text-sm font-semibold text-base-content/55">
              No transactions found
            </div>
          ) : (
            filteredTransactions.map((transaction) => {
              const isIncome = transaction.transactionType === "INCOME";

              return (
                <article
                  key={transaction.id}
                  className="rounded-lg border border-base-300 bg-base-100 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-bold text-base-content">
                        {transaction.description || "No description"}
                      </p>
                      <p className="mt-1 text-sm font-medium text-base-content/55">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <p
                      className={`shrink-0 font-black ${
                        isIncome ? "text-success" : "text-error"
                      }`}
                    >
                      {formatAmount(transaction.amount, transaction.transactionType)}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="badge border-primary/15 bg-primary/10 text-primary">
                      {getCategoryName(transaction)}
                    </span>
                    <span
                      className={`badge ${
                        isIncome
                          ? "border-success/15 bg-success/10 text-success"
                          : "border-error/15 bg-error/10 text-error"
                      }`}
                    >
                      {isIncome ? "Income" : "Expense"}
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default TransactionRecentTable;
