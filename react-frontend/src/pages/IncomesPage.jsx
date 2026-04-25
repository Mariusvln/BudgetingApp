import React, { useState, useEffect, useCallback } from "react";
import TransactionNav from "../components/TransactionNav";
import IncomeHeader from "../components/incomes-page-components/IncomeHeader";
import IncomeRecentTable from "../components/incomes-page-components/IncomeRecentTable";
import IncomeAddPanel from "../components/incomes-page-components/IncomeAddPanel";
import ExportIncomeButton from "../components/incomes-page-components/ExportIncomeButton";

function IncomesPage() {
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

  const fetchIncomes = useCallback(
    async (start = dateStart, end = dateEnd) => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
          { credentials: "include" },
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching incomes:", error);
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
    fetchIncomes();
  }, [fetchIncomes]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const incomeCategories = categories.filter((cat) => cat.type === "INCOME");

  return (
    <div className="flex bg-base-200 min-h-screen">
      <TransactionNav />

      <div className="flex-1 p-6">
        <input
          type="text"
          placeholder="Search incomes"
          className="w-full max-w-xl px-4 py-2 mb-4 border border-gray-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <IncomeHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <IncomeRecentTable
              transactions={transactions}
              loading={loading}
              dateStart={dateStart}
              dateEnd={dateEnd}
              setDateStart={setDateStart}
              setDateEnd={setDateEnd}
              onTransactionAdded={fetchIncomes}
              categories={incomeCategories}
            />

            <div className="mt-4">
              <ExportIncomeButton />
            </div>
          </div>

          <IncomeAddPanel
            onTransactionAdded={fetchIncomes}
            categories={incomeCategories}
          />
        </div>
      </div>
    </div>
  );
}

export default IncomesPage;
