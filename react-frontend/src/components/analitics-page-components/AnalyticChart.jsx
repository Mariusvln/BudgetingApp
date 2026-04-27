import React, { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";

function AnalyticChart({ dateStart, dateEnd }) {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);

    try {
      const [incomeResponse, expenseResponse] = await Promise.all([
        fetch(
          `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${dateStart}&dateEnd=${dateEnd}`,
          { credentials: "include" },
        ),
        fetch(
          `http://localhost:8080/api/app/expenses/fromDateStartToDateFinish?dateStart=${dateStart}&dateEnd=${dateEnd}`,
          { credentials: "include" },
        ),
      ]);

      if (!incomeResponse.ok || !expenseResponse.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      const [incomes, expenses] = await Promise.all([
        incomeResponse.json(),
        expenseResponse.json(),
      ]);

      setIncomeData(incomes);
      setExpenseData(expenses);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setIncomeData([]);
      setExpenseData([]);
    } finally {
      setLoading(false);
    }
  }, [dateEnd, dateStart]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const dates = [];
  const currentDate = new Date(dateStart);
  const lastDate = new Date(dateEnd);

  while (currentDate <= lastDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const sumByDate = (transactions) => {
    return dates.map((date) => {
      return transactions
        .filter((transaction) => transaction.date === date)
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    });
  };

  const series = [
    {
      name: "Income",
      data: sumByDate(incomeData),
    },
    {
      name: "Expenses",
      data: sumByDate(expenseData),
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 400,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#13EC6D", "#EA580C"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: dates.map((date) => {
        const day = new Date(date).getDate();
        return `Day: ${day}`;
      }),
    },
    yaxis: {
      labels: {
        formatter: (val) => (val >= 1000 ? `${val / 1000}k` : val),
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
  };

  return (
    <div className="m-auto w-[95%] rounded-4xl bg-base-100 p-10">
      <div className="mb-6 flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          {dateStart} - {dateEnd}
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading analytics...</p>
      ) : (
        <Chart options={options} series={series} type="area" height={700} />
      )}
    </div>
  );
}

export default AnalyticChart;
