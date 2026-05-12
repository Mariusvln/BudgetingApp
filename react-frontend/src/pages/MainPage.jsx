import "../assets/styles/MainPage.css";
import DashboardMobile from "../components/main-page-components/DashboardMobile";
import DashboardHeaderMobile from "../components/main-page-components/DashboardHeaderMobile"
import DashboardDesktop from "../components/main-page-components/DashboardDesktop";
import DashboardHeaderDesktop from "../components/main-page-components/DashboardHeaderDesktop";
import TransactionNav from "../components/TransactionNav";
import { useEffect, useState } from "react";

const MainPage = () => {

    const [incomes, setIncomes] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [balance, setBalance] = useState(0);
    const [monthlySpending, setSpending] = useState(0);
  
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  
    const getDateRange = () => {
      const today = new Date();
      return {
        start: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)),
        end: formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
      };
    };
  
    const dateRange = getDateRange();
    const dateStart = dateRange.start;
    const dateEnd = dateRange.end;
  
    const fetchBalance = async () => {
      try {
        const [incomeResponse, expenseResponse] = await Promise.all([
          fetch(`http://localhost:8080/api/app/incomes/showAllIncomes`, {
            credentials: "include",
          }),
          fetch(`http://localhost:8080/api/app/expenses/showAllExpenses`, {
            credentials: "include",
          }),
        ]);
  
        if (!incomeResponse.ok || !expenseResponse.ok)
          throw new Error("Network response was not okay");
        const [incomesResponse, expensesResponse] = await Promise.all([
          incomeResponse.json(),
          expenseResponse.json(),
        ]);
        const incomesSum = incomesResponse.reduce(
          (partialSum, a) => partialSum + a.amount,
          0,
        );
        const expensesSum = expensesResponse.reduce(
          (partialSum, a) => partialSum + a.amount,
          0,
        );
        setIncomes(incomesSum)
        setExpenses(expensesSum)
        setBalance(incomesSum - expensesSum);
      } catch (error) {
        console.error("Error fetching incomes:", error);
        setIncomes(0);
        setExpenses(0);
      }
    };
  
    const fetchMonthlyExpenses = async () => {
      try {
        const expensesResponse = await fetch(
          `http://localhost:8080/api/app/expenses/fromDateStartToDateFinish?dateStart=${dateStart}&dateEnd=${dateEnd}`,
          { credentials: "include" },
        );
        if (!expensesResponse.ok) {
          throw new Error("Failed to fetch Monthly Expenses data");
        }
        const monthlyExpense = await expensesResponse.json();
        setSpending(
          monthlyExpense.reduce((partialSum, a) => partialSum + a.amount, 0),);
      } catch (error) {
        console.log("Error fetching Monthly Expenses data:", error);
        setSpending(0);
      }
    };
  
    const formatCurrency = (value) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number(value) || 0);
  
    useEffect(() => {
      (fetchBalance(), fetchMonthlyExpenses());
    }, []);

  return (
    <div className="flex">
      <div className="w-64 nav-display">
      <TransactionNav/>
      </div>
      <div className="h-screen flex flex-col bg-[#f3f4f6] grow">
      <DashboardHeaderMobile/>
      <DashboardHeaderDesktop/>
    <main className="main_layout">
      <DashboardMobile balance={formatCurrency(balance)}/>
      <DashboardDesktop formatCurrency={formatCurrency} balance={balance} monthlySpending={monthlySpending} incomes={formatCurrency(incomes)} expenses={formatCurrency(expenses)}/>
    </main>
    </div>
    </div>
  );
};

export default MainPage;
