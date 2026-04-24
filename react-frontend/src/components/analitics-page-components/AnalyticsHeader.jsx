import React, { useEffect, useState } from "react";

function AnalyticsHeader() {
  const [growthPercent, setGrowthPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  const formatDate = (year, month, day) => {
    const realMonth = String(month + 1).padStart(2, "0");
    const realDay = String(day).padStart(2, "0");

    return `${year}-${realMonth}-${realDay}`;
  };

  const getMonthRange = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return {
      start: formatDate(year, month, 1),
      end: formatDate(year, month, daysInMonth),
    };
  };

  const getTotalAmount = (transactions) => {
    return transactions.reduce((sum, transaction) => {
      return sum + Number(transaction.amount);
    }, 0);
  };

  const fetchMonthData = async (start, end) => {
    const incomeResponse = await fetch(
      `http://localhost:8080/api/app/fetchIncomesFromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
      { credentials: "include" }
    );

    const expenseResponse = await fetch(
      `http://localhost:8080/api/app/fetchExpensesFromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
      { credentials: "include" }
    );

    if (!incomeResponse.ok || !expenseResponse.ok) {
      throw new Error("Failed to fetch analytics header data");
    }

    const incomes = await incomeResponse.json();
    const expenses = await expenseResponse.json();

    const totalIncome = getTotalAmount(incomes);
    const totalExpenses = getTotalAmount(expenses);

    return totalIncome - totalExpenses;
  };

  const fetchGrowthPercent = async () => {
    setLoading(true);

    try {
      const today = new Date();

      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();

      const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
      const previousYear = previousMonthDate.getFullYear();
      const previousMonth = previousMonthDate.getMonth();

      const currentRange = getMonthRange(currentYear, currentMonth);
      const previousRange = getMonthRange(previousYear, previousMonth);

      const currentWealth = await fetchMonthData(
        currentRange.start,
        currentRange.end
      );

      const previousWealth = await fetchMonthData(
        previousRange.start,
        previousRange.end
      );

      let percent = 0;

      if (previousWealth !== 0) {
        percent = ((currentWealth - previousWealth) / Math.abs(previousWealth)) * 100;
      } else if (currentWealth > 0) {
        percent = 100;
      }

      setGrowthPercent(percent);
    } catch (error) {
      console.error("Error calculating growth percent:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrowthPercent();
  }, []);

  const isPositive = growthPercent >= 0;

  return (
    <div className="p-10 ml-5">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, Alex
      </h1>

      <p className="text-gray-500 mt-1">
        {loading ? (
          "Loading analytics..."
        ) : (
          <>
            Your wealth has {isPositive ? "grown" : "decreased"} by{" "}
            <span
              className={`font-semibold ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {growthPercent.toFixed(1)}%
            </span>{" "}
            since last month.
          </>
        )}
      </p>
    </div>
  );
}

export default AnalyticsHeader;