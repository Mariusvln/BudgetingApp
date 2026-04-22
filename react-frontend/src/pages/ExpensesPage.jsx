import React, { useState, useEffect, useCallback } from "react";
import TransactionNav from "../components/TransactionNav";
import IncomeHeader from "../components/incomes-page-components/IncomeHeader";
import ExpenseRecentTable from "../components/incomes-page-components/ExpenseRecentTable";
import ExpenseAddPanel from "../components/incomes-page-components/ExpenseAddPanel";
import ExportButton from "../components/profile-page-components/ExportButton";

function ExpensesPage() {
  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split("T")[0];
  };

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [dateStart, setDateStart] = useState(() => getDaysAgo(7));
  const [dateEnd, setDateEnd] = useState(() => getToday());

  const fetchExpenses = useCallback(
    async (start = dateStart, end = dateEnd) => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/app/fetchExpensesFromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
          { credentials: "include" },
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    },
    [dateStart, dateEnd],
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const expenseCategories = categories.filter((cat) => cat.type === "EXPENSE");

  return (
    <div className="flex bg-base-200 min-h-screen">
      <TransactionNav />

      <div className="flex-1 p-6">
        <input
          type="text"
          placeholder="Search expenses"
          className="w-full max-w-xl px-4 py-2 mb-4 border border-gray-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <IncomeHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ExpenseRecentTable
              transactions={transactions}
              loading={loading}
              dateStart={dateStart}
              dateEnd={dateEnd}
              setDateStart={setDateStart}
              setDateEnd={setDateEnd}
              onTransactionAdded={fetchExpenses}
              categories={expenseCategories}
            />

            <div className="mt-4">
              <ExportButton />
            </div>
          </div>

          <ExpenseAddPanel
            onTransactionAdded={fetchExpenses}
            categories={expenseCategories}
          />
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;
