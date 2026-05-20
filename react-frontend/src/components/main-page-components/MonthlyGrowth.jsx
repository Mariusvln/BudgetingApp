import profitIcon from "../../assets/images/icons/profit-icon.svg";
import lossIcon from "../../assets/images/icons/loss-icon.svg"
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

const MonthlyGrowth = ({ incomes = [], expenses = [], formatCurrency }) => {
  const today = new Date();

  const getTsMonthDays = () => {
    let result = [];
    let j = 1;
    for (let i = 6; i <= 24; i += 6) {
      result.push({
        start: new Date(today.getFullYear(), today.getMonth(), j),
        end: new Date(today.getFullYear(), today.getMonth(), i),
      });
      j += 6;
    }
    result.push({
      start: new Date(today.getFullYear(), today.getMonth(), 25),
      end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    });
    return result;
  };

  const getPrevMonthDays = () => {
    let result = [];
    let j = 1;
    for (let i = 6; i <= 24; i += 6) {
      result.push({
        start: new Date(today.getFullYear(), today.getMonth() - 1, j),
        end: new Date(today.getFullYear(), today.getMonth() - 1, i),
      });
      j += 6;
    }
    result.push({
      start: new Date(today.getFullYear(), today.getMonth() - 1, 25),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    });
    return result;
  };

  const {tsMonthSavings, prevMonthSavings} = useMemo(() => {
    const calculateSavings = (dateRanges) => {
    return dateRanges.map((dayRange) => {
      const isInRange = (item) => {
        const itemDay = new Date(item.date);
        return (
          itemDay.getFullYear() === dayRange.start.getFullYear() &&
          (itemDay.getMonth() === dayRange.start.getMonth() ||
          itemDay.getMonth() === dayRange.end.getMonth()) &&
          itemDay.getDate() >= dayRange.start.getDate() &&
          itemDay.getDate() <= dayRange.end.getDate()
        );
      };

      const rangeIncomes = incomes.filter(isInRange).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
      const rangeExpenses = expenses.filter(isInRange).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
      return rangeIncomes - rangeExpenses;
    });
  };
  return {
    tsMonthSavings: calculateSavings(getTsMonthDays()),
    prevMonthSavings: calculateSavings(getPrevMonthDays())
  }
  }, [incomes, expenses]);

  const totalSavings = tsMonthSavings.reduce((sum, value) => sum + value, 0);
  const previousTotal = prevMonthSavings.reduce((sum, value) => sum + value, 0);
  const growthPercentage =
    previousTotal !== 0
      ? Math.round(
          ((totalSavings - previousTotal) / Math.abs(previousTotal)) * 100,
        )
      : totalSavings > 0
        ? 100
        : totalSavings < 0
          ? -100
        : 0;
  const growthPrefix = growthPercentage > 0 ? "+" : "";
  const growthTone = growthPercentage >= 0 ? "text-success" : "text-error";
  const totalTone = totalSavings >= 0 ? "text-base-content" : "text-error";
  const positiveBarColor = "#22c55e";
  const negativeBarColor = "#ef4444";

  const daysInThisMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  }

  const chartData = {
    labels: ["Days 1-6", "7-12", "13-18", "19-24", `25-${daysInThisMonth()}`],
    datasets: [
      {
        label: "Money saved this month",
        data: tsMonthSavings,
        backgroundColor: tsMonthSavings.map((value) =>
          value >= 0 ? positiveBarColor : negativeBarColor,
        ),
        barPercentage: 0.62,
        categoryPercentage: 0.96,
        borderRadius: 0,
        maxBarThickness: 31,
      },
      {
        label: "Money saved last month",
        data: prevMonthSavings,
        backgroundColor: ["#B2BEB5"],
        barPercentage: 0.62,
        categoryPercentage: 0.96,
        borderRadius: 0,
        maxBarThickness: 31,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      customCanvasBackgroundColor: {
        color: "white",
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
      <h3 className={`mt-2 text-3xl font-extrabold tracking-tight ${totalTone}`}>
        {formatCurrency
          ? formatCurrency(totalSavings)
          : `EUR ${totalSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
      </h3>
      <div className="flex gap-1">
        {growthPercentage > 0 && <img src={profitIcon} alt="Profit Icon" className="pt-1" />}
        {growthPercentage < 0 && <img src={lossIcon} alt="Loss Icon" className="pt-1"/>}
        <p className={`font-bold ${growthTone}`}>
          {growthPrefix}
          {growthPercentage}% this month
        </p>
      </div>
      <div className="mx-auto mt-4 h-36 w-[85%]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MonthlyGrowth;
