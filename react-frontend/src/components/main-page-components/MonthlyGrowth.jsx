import profitIcon from "../../assets/images/icons/profit-icon.svg";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "../../assets/styles/Dashboard.css";
import { useMemo } from "react";

const MonthlyGrowth = ({ incomes = [], expenses = [], formatCurrency }) => {
  const getMonths = () => {
    const today = new Date();
    const result = [];

    for (let i = 3; i >= 0; i--) {
      result.push(new Date(today.getFullYear(), today.getMonth() - i, 1));
    }

    return result;
  };

  const monthlySavings = useMemo(() => {
    return getMonths().map((monthDate) => {
      const isSameMonth = (item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getFullYear() === monthDate.getFullYear() &&
          itemDate.getMonth() === monthDate.getMonth()
        );
      };

      const incomeTotal = incomes
        .filter(isSameMonth)
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      const expenseTotal = expenses
        .filter(isSameMonth)
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      return Math.max(0, incomeTotal - expenseTotal);
    });
  }, [expenses, incomes]);

  const totalSavings = monthlySavings.reduce((sum, value) => sum + value, 0);
  const previousTotal = monthlySavings
    .slice(0, -1)
    .reduce((sum, value) => sum + value, 0);
  const currentMonthSavings = monthlySavings[monthlySavings.length - 1] || 0;

  const chartData = {
    labels: ["Month 1", "Month 2", "Month 3", "This Month"],
    datasets: [
      {
        label: "Money saved",
        data: monthlySavings,
        backgroundColor: ["#22c55e"],
        borderRadius: 10,
        maxBarThickness: 42,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      customCanvasBackgroundColor: {
        color: 'white',
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.92)",
        padding: 12,
        cornerRadius: 12,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.18)",
        },
        ticks: {
          color: "#94a3b8",
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-[260px] basis-[100px] grow rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
      <div className="flex justify-between">
        <p className="text-sm font-bold text-base-content/60">Monthly Growth</p>
        <p className="font-bold text-base-content/35">...</p>
      </div>
      <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-base-content">
        {formatCurrency
          ? formatCurrency(totalSavings)
          : `€${totalSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
      </h3>
      <div className="flex gap-1">
        <img src={profitIcon} alt="Profit Icon" className="pt-1" />
        <p className="font-bold text-success">
          {currentMonthSavings >= previousTotal / 3 ? "+" : ""}
          {currentMonthSavings >= previousTotal / 3 ? "12" : "0"}% this month
        </p>
      </div>
      <div className="mt-4 h-36">
        <Bar
          data={chartData} options={chartOptions}
        />
      </div>
    </div>
  );
};

export default MonthlyGrowth;
