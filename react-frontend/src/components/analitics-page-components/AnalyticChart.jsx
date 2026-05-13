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
    colors: ["#22c55e", "#ef4444"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(148, 163, 184, 0.18)",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: dates.map((date) => {
        const day = new Date(date).getDate();
        return `Day: ${day}`;
      }),
      labels: {
        style: {
          colors: "#94a3b8",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => (val >= 1000 ? `${val / 1000}k` : val),
        style: {
          colors: "#94a3b8",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
  };

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45">
            Selected period
          </p>
          <h2 className="mt-1 text-xl font-bold">
          {dateStart} - {dateEnd}
          </h2>
        </div>
      </div>

      {loading ? (
        <p className="py-20 text-center text-base-content/50">Loading analytics...</p>
      ) : (
        <Chart options={options} series={series} type="area" height={620} />
      )}
    </div>
  );
}

export default AnalyticChart;
