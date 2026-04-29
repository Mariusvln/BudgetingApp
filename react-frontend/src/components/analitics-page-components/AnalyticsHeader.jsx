import React, { useCallback, useEffect, useState } from "react";

function AnalyticsHeader({ dateStart, dateEnd }) {
  const [growthPercent, setGrowthPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchRangeData = async (start, end) => {
    const [incomeResponse, expenseResponse] = await Promise.all([
      fetch(
        `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
        { credentials: "include" },
      ),
      fetch(
        `http://localhost:8080/api/app/expenses/fromDateStartToDateFinish?dateStart=${start}&dateEnd=${end}`,
        { credentials: "include" },
      ),
    ]);

    if (!incomeResponse.ok || !expenseResponse.ok) {
      throw new Error("Failed to fetch analytics header data");
    }

    const [incomes, expenses] = await Promise.all([
      incomeResponse.json(),
      expenseResponse.json(),
    ]);

    const totalIncome = incomes.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0,
    );
    const totalExpenses = expenses.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0,
    );

    return totalIncome - totalExpenses;
  };

  const fetchGrowthPercent = useCallback(async () => {
    setLoading(true);

    try {
      const currentStartDate = new Date(dateStart);
      const currentEndDate = new Date(dateEnd);
      const rangeLength =
        Math.round(
          (currentEndDate.getTime() - currentStartDate.getTime()) /
            (1000 * 60 * 60 * 24),
        ) + 1;
      const previousEndDate = new Date(currentStartDate);
      previousEndDate.setDate(previousEndDate.getDate() - 1);
      const previousStartDate = new Date(previousEndDate);
      previousStartDate.setDate(previousStartDate.getDate() - (rangeLength - 1));

      const [currentWealth, previousWealth] = await Promise.all([
        fetchRangeData(dateStart, dateEnd),
        fetchRangeData(
          previousStartDate.toISOString().split("T")[0],
          previousEndDate.toISOString().split("T")[0],
        ),
      ]);

      let percent = 0;

      if (previousWealth !== 0) {
        percent =
          ((currentWealth - previousWealth) / Math.abs(previousWealth)) * 100;
      } else if (currentWealth > 0) {
        percent = 100;
      }

      setGrowthPercent(percent);
    } catch (error) {
      console.error("Error calculating growth percent:", error);
    } finally {
      setLoading(false);
    }
  }, [dateEnd, dateStart]);

  useEffect(() => {
    fetchGrowthPercent();
  }, [fetchGrowthPercent]);

  const isPositive = growthPercent >= 0;

  return (
    <div className="ml-5 p-10">
      {/* <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex</h1> */}

      {/* <p className="mt-1 text-gray-500">
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
            compared to the previous period.
          </>
        )}
      </p> */}
    </div>
  );
}

export default AnalyticsHeader;
