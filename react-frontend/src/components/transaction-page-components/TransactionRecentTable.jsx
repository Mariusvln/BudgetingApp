import { useCallback, useEffect, useMemo, useState } from "react";

function TransactionRecentTable() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
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
      const [incomeResponse, expenseResponse, categoryResponse] =
        await Promise.all([
          fetch("http://localhost:8080/api/app/incomes/", {
            credentials: "include",
          }),
          fetch("http://localhost:8080/api/app/expenses/", {
            credentials: "include",
          }),
          fetch("http://localhost:8080/api/categories", {
            credentials: "include",
          }),
        ]);

      if (!incomeResponse.ok || !expenseResponse.ok || !categoryResponse.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const [incomeData, expenseData, categoryData] = await Promise.all([
        incomeResponse.json(),
        expenseResponse.json(),
        categoryResponse.json(),
      ]);

      const mappedIncomes = (Array.isArray(incomeData) ? incomeData : []).map(
        (transaction, index) => ({
          ...transaction,
          rowId: `income-${transaction.id ?? index}`,
          transactionType: "INCOME",
        }),
      );

      const mappedExpenses = (
        Array.isArray(expenseData) ? expenseData : []
      ).map((transaction, index) => ({
        ...transaction,
        rowId: `expense-${transaction.id ?? index}`,
        transactionType: "EXPENSE",
      }));

      const combinedTransactions = [...mappedIncomes, ...mappedExpenses].sort(
        (left, right) => new Date(right.date) - new Date(left.date),
      );

      setTransactions(combinedTransactions);
      setCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      console.error("Error fetching dashboard transactions:", error);
      setTransactions([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const categoryMap = useMemo(() => {
    return categories.reduce((map, category) => {
      map[Number(category.id)] = category.name;
      return map;
    }, {});
  }, [categories]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === "ALL") {
      return transactions;
    }

    return transactions.filter(
      (transaction) => transaction.transactionType === activeTab,
    );
  }, [activeTab, transactions]);

  return (
    <div className="card border border-base-200 bg-base-100">
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
                  <tr key={transaction.rowId}>
                    <td className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>

                    <td className="font-medium">
                      {transaction.description || "No description"}
                    </td>

                    <td>
                      <span className="badge badge-soft badge-primary text-xs">
                        {categoryMap[Number(transaction.category)] ||
                          `Category ${transaction.category}`}
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
  );
}

export default TransactionRecentTable;
