import profitIcon from "../../assets/images/icons/profit-icon.svg";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "../../assets/styles/Dashboard.css";
import { useMemo } from "react";

const MonthlyGrowth = ({ incomes = [], expenses = [] }) => {
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

  const chartData = {
    labels: ["Month 1", "Month 2", "Month 3", "This Month"],
    datasets: [
      {
        label: "Money saved",
        data: monthlySavings,
        backgroundColor: ["#13EC6D"],
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
      }
    },
  };

  return (
    <div className="bg-white rounded-xl grow p-[24px] basis-[100px] min-h-[240px]">
      <div className="flex justify-between">
        <p className="text-sm bold-font gray-text">Monthly Growth</p>
        <p className="bold-font gray-text">...</p>
      </div>
      <h3 className="h3_style bold-font black-text tracking-wide">$1,840.00</h3>
      <div className="flex gap-1">
        <img src={profitIcon} alt="Profit Icon" className="pt-1" />
        <p className="text-[#13EC6D] font-bold">+12% these months</p>
      </div>
      <div>
        <Bar
          data={chartData} options={chartOptions}
        />
      </div>
    </div>
  );
};

export default MonthlyGrowth;
