import profitIcon from "../../assets/images/icons/profit-icon.svg";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "../../assets/styles/Dashboard.css";

const MonthlyGrowth = () => {
  
  const chartData = {
    labels: ["W1", "W2", "W3", "W4"],
    datasets: [
      {
        label: "Last month saved",
        data: [50, 200, 100, 300],
        backgroundColor: ["#13EC6D"],
      },
      {
        label: "This month saved",
        data: [100, 250, 150, 300],
        backgroundColor: ["#13EC6D33"],
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
    <div className="bg-white rounded-xl p-[24px] w-[295px]">
      <div className="flex justify-between">
        <p className="text-sm bold-font gray-text">Monthly Growth</p>
        <p className="bold-font gray-text">...</p>
      </div>
      <h3 className="h3_style bold-font black-text tracking-wide">$1,840.00</h3>
      <div className="flex gap-1">
        <img src={profitIcon} alt="Profit Icon" className="pt-1" />
        <p className="text-[#13EC6D] font-bold">+12% this month</p>
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
