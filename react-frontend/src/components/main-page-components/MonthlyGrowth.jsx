import profitIcon from "../../assets/images/icons/profit-icon.svg";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "../../assets/styles/Dashboard.css";
import { useState } from "react";

const MonthlyGrowth = () => {
  
  const [monthMoney, setMonth1Money] = useState(0);
  const [month2Money, setMonth2Money] = useState(0);
  const [month3Money, setMonth3Money] = useState(0);
  const [month4Money, setMonth4Money] = useState(0);

  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getMonthsRanges = () => {
    const today = new Date();
    let result = [];
    for (let i = 3; i >= 0; i--) {
      result.push(
        {
          start: formatDate(new Date(today.getFullYear(), today.getMonth() - i, 1)),
          end: formatDate(new Date(today.getFullYear(), today.getMonth() - i + 1, 0)),
        }
      )
    }
    return result;
  };

  const fetchMonths = async () => {
    try {
      const [month1Income, month1Expense, month2Income, month2Expense, month3Income, month3Expense, month4Income, month4Expense] = await Promise.all([
        fetch(
          `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${getMonthsRanges[0].start}&dateEnd=${getMonthsRanges[0].end}`,
          { credentials: "include" },),
        fetch(
          `http://localhost:8080/api/app/expenses/fromDateStartToDateFinish?dateStart=${getMonthsRanges[0].start}&dateEnd=${getMonthsRanges[0].end}`,
          { credentials: "include" },),
        fetch(
          `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${getMonthsRanges[1].start}&dateEnd=${getMonthsRanges[1].end}`,
          { credentials: "include" },),
        fetch(
          `http://localhost:8080/api/app/expenses/fromDateStartToDateFinish?dateStart=${getMonthsRanges[1].start}&dateEnd=${getMonthsRanges[1].end}`,
          { credentials: "include" },),
        fetch(
          `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${getMonthsRanges[2].start}&dateEnd=${getMonthsRanges[2].end}`,
          { credentials: "include" },),
        fetch(
          `http://localhost:8080/api/app/expenses/fromDateStartToDateFinish?dateStart=${getMonthsRanges[2].start}&dateEnd=${getMonthsRanges[2].end}`,
          { credentials: "include" },),
        fetch(
          `http://localhost:8080/api/app/incomes/fromDateStartToDateFinish?dateStart=${getMonthsRanges[3].start}&dateEnd=${getMonthsRanges[3].end}`,
          { credentials: "include" },),
        fetch(
          `http://localhost:8080/api/app/expenses/fromDateStartToDateFinish?dateStart=${getMonthsRanges[3].start}&dateEnd=${getMonthsRanges[3].end}`,
          { credentials: "include" },)
      ])

      if(!month1Income.ok || !month1Expense.ok || !month2Income.ok || !month2Expense.ok || !month3Income.ok || !month3Expense.ok || !month4Income.ok || !month4Expense.ok) {
        throw new Error("Network response was not okay")
      }
      const [month1Incomes, month1Expenses, month2Incomes, month2Expenses, month3Incomes, month3Expenses, month4Incomes, Month4Expenses] = await Promise.all([
        month1Income.json(),
        month1Expense.json(),
        month2Income.json(),
        month2Expense.json(),
        month3Income.json(),
        month3Expense.json(),
        month4Income.json(),
        month4Expense.json(),
      ])
      const month1Savings = month1Incomes.reduce(
        (partialSum, a) => partialSum + a.ammount,
        0
      );
    }
  }

  const chartData = {
    labels: ["Month 1", "Month 2", "Month 3", "This Month"],
    datasets: [
      {
        label: "Last month saved",
        data: [50, 200, 100, 300],
        backgroundColor: ["#13EC6D33"],
      },
      {
        label: "This month saved",
        data: [100, 250, 150, 300],
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
