import "../assets/styles/MainPage.css";
import DashboardMobile from "../components/main-page-components/DashboardMobile";
import DashboardHeaderMobile from "../components/main-page-components/DashboardHeaderMobile"
import DashboardDesktop from "../components/main-page-components/DashboardDesktop";
import DashboardHeaderDesktop from "../components/main-page-components/DashboardHeaderDesktop";
import TransactionNav from "../components/TransactionNav";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { formatCurrency as formatMoney } from "../utils/currency";

const MainPage = () => {
    const { user } = useAuth();

    const [incomes, setIncomes] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [incomeItems, setIncomeItems] = useState([]);
    const [expenseItems, setExpenseItems] = useState([]);
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
          fetch(`http://localhost:8080/api/app/incomes/`, {
            credentials: "include",
          }),
          fetch(`http://localhost:8080/api/app/expenses/`, {
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
        const monthlyExpensesSum = expensesResponse
          .filter((expense) => expense.date >= dateStart && expense.date <= dateEnd)
          .reduce((partialSum, expense) => partialSum + expense.amount, 0);

        setIncomeItems(Array.isArray(incomesResponse) ? incomesResponse : []);
        setExpenseItems(Array.isArray(expensesResponse) ? expensesResponse : []);
        setIncomes(incomesSum)
        setExpenses(expensesSum)
        setBalance(incomesSum - expensesSum);
        setSpending(monthlyExpensesSum);
      } catch (error) {
        console.error("Error fetching incomes:", error);
        setIncomes(0);
        setExpenses(0);
        setIncomeItems([]);
        setExpenseItems([]);
        setSpending(0);
      }
    };
  
    const formatCurrency = (value) => formatMoney(value, user?.currency);
  
    useEffect(() => {
      fetchBalance();
    }, []);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <TransactionNav />

      <div className="min-h-screen pb-28 md:ml-64 md:pb-0">
        <DashboardHeaderMobile />
        <DashboardHeaderDesktop />

        <main className="main_layout">
          <DashboardMobile balance={formatCurrency(balance)} />
          <DashboardDesktop
            formatCurrency={formatCurrency}
            balance={balance}
            monthlySpending={monthlySpending}
            incomes={formatCurrency(incomes)}
            expenses={formatCurrency(expenses)}
            incomeItems={incomeItems}
            expenseItems={expenseItems}
          />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
