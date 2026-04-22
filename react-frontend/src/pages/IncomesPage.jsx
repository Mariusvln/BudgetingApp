import React, { useState, useEffect, useCallback } from 'react';
import TransactionNav from "../components/TransactionNav";
import IncomeHeader from "../components/incomes-page-components/IncomeHeader";
import IncomeRecentTable from "../components/incomes-page-components/IncomeRecentTable";
import IncomeAddPanel from "../components/incomes-page-components/IncomeAddPanel";
import ExportIncomeButton from '../components/incomes-page-components/ExportIncomeButton';

function IncomesPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Centralize date state here
  const [dateStart, setDateStart] = useState("2026-03-23");
  const [dateEnd, setDateEnd] = useState("2026-03-26");

  // Updated fetch function to use dynamic dates
  const fetchIncomes = useCallback(async (start = dateStart, end = dateEnd) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/app/fetchIncomesFromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
        { credentials: "include" }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setTransactions(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [dateStart, dateEnd]);

  // Re-fetch whenever dates change for /incomes page
  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

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
            />

            <div className="mt-4">
              <ExportIncomeButton />
            </div>

          </div>

          <IncomeAddPanel onTransactionAdded={fetchIncomes} />

        </div>

      </div>
    </div>
  );
}

export default IncomesPage;