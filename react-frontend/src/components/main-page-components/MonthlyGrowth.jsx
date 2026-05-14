import profitIcon from "../../assets/images/icons/profit-icon.svg";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "../../assets/styles/Dashboard.css";
import { useEffect, useState } from "react";

const MonthlyGrowth = ({formatCurrency}) => {
  
  const [thisMonthMoney, setThisMonthMoney] =useState([]);
  const [previousMonthMoney, setPreviousMonthMoney] =useState([]);
  const [growthPercentage, setGrowthPercentage] = useState(0);

  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getThisMonthRanges = () => {
    const today = new Date();
    let result = [];
    let j = 1;
    for (let i = 6; i <= 24; i += 6) {
      result.push(
        {
          start: formatDate(new Date(today.getFullYear(), today.getMonth(), j)),
          end: formatDate(new Date(today.getFullYear(), today.getMonth(), i)),
        }
      )
      j += 6;
    }
    result.push(
      {
        start: formatDate(new Date(today.getFullYear(), today.getMonth(), 25)),
        end: formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
      }
    )
    return result;
  }

  const getPreviousMonthsRanges = () => {
    const today = new Date();
    let result = [];
    let j = 1;
    for (let i = 6; i <= 24; i += 6) {
      result.push(
        {
          start: formatDate(new Date(today.getFullYear(), today.getMonth() - 1, j)),
          end: formatDate(new Date(today.getFullYear(), today.getMonth() - 1, i)),
        }
      )
      j += 6;
    }
    result.push(
      {
        start: formatDate(new Date(today.getFullYear(), today.getMonth() - 1, 25)),
        end: formatDate(new Date(today.getFullYear(), today.getMonth(), 0)),
      }
    )
    return result;
  }

  const fetchMonths = async () => {
    try {
      const thisMonthRanges = getThisMonthRanges();
      const previousMonthRanges = getPreviousMonthsRanges();
      const BASE_URL = "http://localhost:8080/api/app";
      const includeCredentials = { credentials: "include" };

      const thisMonthResponse = await Promise.all(
        thisMonthRanges.flatMap(range => [
          fetch(
            `${BASE_URL}/incomes/fromDateStartToDateFinish?dateStart=${range.start}&dateEnd=${range.end}`,
            includeCredentials
          ),
          fetch(
            `${BASE_URL}/expenses/fromDateStartToDateFinish?dateStart=${range.start}&dateEnd=${range.end}`,
            includeCredentials
          )
        ])
      )

      const previousMonthResponse = await Promise.all(
        previousMonthRanges.flatMap(range => [
          fetch(
            `${BASE_URL}/incomes/fromDateStartToDateFinish?dateStart=${range.start}&dateEnd=${range.end}`,
            includeCredentials
          ),
          fetch(
            `${BASE_URL}/expenses/fromDateStartToDateFinish?dateStart=${range.start}&dateEnd=${range.end}`,
            includeCredentials
          )
        ])
      )

      if(thisMonthResponse.some(res => !res.ok) || previousMonthResponse.some(res => !res.ok)) {
        throw new Error("Network response was not okay")
      }
      const thisMonthData = await Promise.all(
        thisMonthResponse.map(res => res.json())
      )
      const previousMonthData = await Promise.all(
        previousMonthResponse.map(res => res.json())
      )
      let thisMonthSavings = [];
      let trueThisMonthSav = [];
      let previousMonthSavings = [];
      let truePrevMonthSav = [];
      for (let i = 0; i < thisMonthData.length; i += 2) {
        const incomesSum = thisMonthData[i].reduce(
        (partialSum, a) => partialSum + a.amount, 0)
        const expensesSum = thisMonthData[i + 1].reduce(
        (partialSum, a) => partialSum + a.amount, 0)
        
        trueThisMonthSav.push(incomesSum - expensesSum);
        thisMonthSavings.push(Math.max(0, incomesSum - expensesSum));
      }
      for (let i = 0; i < previousMonthData.length; i += 2) {
        const incomesSum = previousMonthData[i].reduce(
        (partialSum, a) => partialSum + a.amount, 0)
        const expensesSum = previousMonthData[i + 1].reduce(
        (partialSum, a) => partialSum + a.amount, 0)

        truePrevMonthSav.push(incomesSum - expensesSum);
        previousMonthSavings.push(Math.max(0, incomesSum - expensesSum));
      }

      const currentEarnings = trueThisMonthSav.reduce((partialSum, a) => partialSum + a, 0);
      const previousEarnings = truePrevMonthSav.reduce((partialSum, a) => partialSum + a, 0);
      if (previousEarnings === 0) {
        setGrowthPercentage(0)
      } else {
        setGrowthPercentage((((currentEarnings - previousEarnings) / previousEarnings) * 100).toFixed(0));
      }

      setThisMonthMoney(thisMonthSavings)
      setPreviousMonthMoney(previousMonthSavings)
    } catch (error) {
      console.log("Error fetching Monthly Growth data:", error);
      setThisMonthMoney([]);
    }
  }

  function daysInThisMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  }

  useEffect(() => {
    (fetchMonths());
  }, [])

  
  const chartData = {
    labels: ["1-6", "7-12", "13-18", "19-24", `25-${daysInThisMonth()}`],
    datasets: [
      {
        label: "Money saved this month",
        data: [thisMonthMoney[0], thisMonthMoney[1], thisMonthMoney[2], thisMonthMoney[3], thisMonthMoney[4]],
        backgroundColor: ["#13EC6D"],
      },
      {
        label: "Money saved previous month",
        data: [previousMonthMoney[0], previousMonthMoney[1], previousMonthMoney[2], previousMonthMoney[3], previousMonthMoney[4]],
        backgroundColor: ["#C5F3DD"],
      }
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
      <h3 className="h3_style bold-font black-text tracking-wide">{formatCurrency((thisMonthMoney.reduce((partialSum, a) => partialSum + a, 0)) - (previousMonthMoney.reduce((partialSum, a) => partialSum + a, 0)))}</h3>
      <div className="flex gap-1">
        <img src={profitIcon} alt="Profit Icon" className="pt-1" />
        <p className="text-[#13EC6D] font-bold">+{growthPercentage}% this month</p>
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
