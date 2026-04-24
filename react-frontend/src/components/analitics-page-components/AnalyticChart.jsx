import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function AnalyticChart() {
  const today = new Date();

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (year, month, day) => {
    const realMonth = String(month + 1).padStart(2, "0");
    const realDay = String(day).padStart(2, "0");

    return `${year}-${realMonth}-${realDay}`;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

  const dateStart = formatDate(selectedYear, selectedMonth, 1);
  const dateEnd = formatDate(selectedYear, selectedMonth, daysInMonth);

  const dates = Array.from({ length: daysInMonth }, (_, index) => {
    return formatDate(selectedYear, selectedMonth, index + 1);
  });

  const fetchAnalyticsData = async () => {
    setLoading(true);

    try {
      const incomeResponse = await fetch(
        `http://localhost:8080/api/app/fetchIncomesFromDateStartToDateFinish?dateStart=${dateStart}&dateEnd=${dateEnd}`,
        { credentials: "include" },
      );

      const expenseResponse = await fetch(
        `http://localhost:8080/api/app/fetchExpensesFromDateStartToDateFinish?dateStart=${dateStart}&dateEnd=${dateEnd}`,
        { credentials: "include" },
      );

      if (!incomeResponse.ok || !expenseResponse.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      const incomes = await incomeResponse.json();
      const expenses = await expenseResponse.json();

      setIncomeData(incomes);
      setExpenseData(expenses);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedYear, selectedMonth]);

  const sumByDate = (transactions, dates) => {
    return dates.map((date) => {
      return transactions
        .filter((transaction) => transaction.date === date)
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    });
  };

  const series = [
    {
      name: "Income",
      data: sumByDate(incomeData, dates),
    },
    {
      name: "Expenses",
      data: sumByDate(expenseData, dates),
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
      categories: dates.map((_, index) => `Day: ${index + 1}`),
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

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <div className="w-[95%] bg-base-100 rounded-4xl p-10 m-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Previous month
        </button>

        <h2 className="text-xl font-semibold">
          {dateStart} — {dateEnd}
        </h2>

        <button
          onClick={goToNextMonth}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Next month
        </button>
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
