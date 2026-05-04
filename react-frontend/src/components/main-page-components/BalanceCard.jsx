import { useCallback, useEffect, useState } from "react";
import "../../assets/styles/Dashboard.css";

const BalanceCard = () => {

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([])

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
  const dateEnd = dateRange.end


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

        if (!incomeResponse.ok || !expenseResponse.ok) throw new Error("Network response was not okay");
        const [incomesResponse, expensesResponse] = await Promise.all([
          incomeResponse.json(),
          expenseResponse.json(),
        ]);
        setIncomes(incomesResponse);
        setExpenses(expensesResponse);
      } catch (error) {
        console.error("Error fetching incomes:", error)
      }
    }

  const fetchMonthlyExpenses = async () => {
    try {
      const expensesResponse = await fetch(
          `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${dateStart}&dateEnd=${dateEnd}`,
          { credentials: "include" },
      );
      if (!expensesResponse.ok) {
        throw new Error("Failed to fetch Monthly Expenses data")
      }
      const monthlyExpenses = await expensesResponse.json();
      setMonthlyExpenses(monthlyExpenses)
    } catch (error) {
      console.log("Error fetching Monthly Expenses data:", error)
      setMonthlyExpenses([])
    }
  }

  const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value) || 0);

  const calculateBalance = () => {
    let balance = 0
    const incomesSum = incomes.reduce((partialSum, a) => partialSum + a.amount, 0)
    const expensesSum = expenses.reduce((partialSum, a) => partialSum + a.amount, 0)
    balance = (incomesSum - expensesSum);
    return balance;
  }

  const calculateSpending = () => {
    let spending = 0
    spending = monthlyExpenses.reduce((partialSum, a) => partialSum + a.amount, 0)
    return spending
  }

  useEffect(() => {
    fetchBalance(), fetchMonthlyExpenses();
  }, [])

    return (
        <div className="balance-card-bg p-[32px] min-h-[240px] flex flex-col grow-30 basis-[600px] justify-center gap-[5%]">
          <div class="flex items-center gap-1.5 text-sm text-center black-text semibold bg-[#0000001a] pl-3 py-0.5 w-23 rounded-2xl">
          <span class="badge size-2 p-0 mt-0.5 bg-black"></span>
            SYNCED
          </div>
          <div>
          <p className="tracking-wide semibold text-[#0F172AB2]">Total Balance</p>
          <h1 className="bold-font text-6xl black-text tracking-tight">{formatCurrency(calculateBalance())}</h1>
          </div>
          <div>
          <h5 className="semibold text-lg mt-3 text-[#0F172AB2]">MONTHLY SPENDING</h5>
          <h4 className="black-text bold-font text-2xl">{formatCurrency(calculateSpending())}</h4>
          </div>
        </div>
    )
}

export default BalanceCard