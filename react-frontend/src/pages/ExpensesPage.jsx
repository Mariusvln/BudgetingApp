import React, { useState, useEffect, useCallback } from 'react';
import TransactionNav from "../components/TransactionNav";
import IncomeHeader from "../components/incomes-page-components/IncomeHeader";
import ExpensesRecentTable from "../components/incomes-page-components/ExpensesRecentTable";
import ExpenseAddPanel from "../components/incomes-page-components/ExpenseAddPanel";
import ExportButton from "../components/profile-page-components/ExportButton";

function ExpensesPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Centralize date state here
  const [dateStart, setDateStart] = useState("2026-03-23");
  const [dateEnd, setDateEnd] = useState("2026-03-26");

  // Updated fetch function to use dynamic dates
  const fetchExpenses = useCallback(async (start = dateStart, end = dateEnd) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/app/fetchExpensesFromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
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
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="flex bg-base-200 min-h-screen">
      <TransactionNav />
      <div className="flex-1 p-6">
        <IncomeHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">

            <ExpensesRecentTable 
              transactions={transactions} 
              loading={loading} 
              dateStart={dateStart}
              dateEnd={dateEnd}
              setDateStart={setDateStart}
              setDateEnd={setDateEnd}
            />
            <div className="mt-4">
            <ExportButton />
           </div>
          </div>
          <ExpenseAddPanel onTransactionAdded={fetchExpenses} />
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;
