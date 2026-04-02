import React from "react";
import Chart from "react-apexcharts";

function AnalyticChartMonthly() {
  const options = {
    chart: {
      type: "area",
      height: 400,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#13EC6D", "#EA580C"], // fallback if CSS vars fail
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: [
        "Day: 1",
"Day: 2",
"Day: 3",
"Day: 4",
"Day: 5",
"Day: 6",
"Day: 7",
"Day: 8",
"Day: 9",
"Day: 10",
"Day: 11",
"Day: 12",
"Day: 13",
"Day: 14",
"Day: 15",
"Day: 16",
"Day: 17",
"Day: 18",
"Day: 19",
"Day: 20",
"Day: 21",
"Day: 22",
"Day: 23",
"Day: 24",
"Day: 25",
"Day: 26",
"Day: 27",
"Day: 28",
"Day: 29",
"Day: 30"
      ],
    },
    yaxis: {
      labels: {
        formatter: (val) => (val >= 1000 ? `${val / 1000}k` : val),
      },
    },
    tooltip: {
      y: {
        formatter: (val) =>
          `$${val >= 1000 ? `${val / 1000}k` : val}`,
      },
    },
  };

  const series = [
    {
      name: "Revenue",
      data: [18000, 32000, 50000, 45000, 60000, 85000, 78000, 92000, 86000, 89000, 95000, 102000, 18000, 32000, 50000, 45000, 60000, 85000, 78000, 92000, 86000, 89000, 95000, 102000, 110000, 115000, 120000, 125000, 130000, 140000],
    },
    {
      name: "Expenses",
      data: [10000, 20000, 30000, 38000, 42000, 55000, 49000, 70000, 10000, 20000, 30000, 38000, 42000, 55000, 49000, 70000, 15000, 25000, 35000, 40000, 45000, 50000, 60000, 65000, 75000, 80000, 12000, 22000, 32000, 42000],
    },
  ];

  return (
    <div className="w-[95%] bg-white rounded-4xl p-10 m-auto">
      <Chart options={options} series={series} type="area" height={700} />
    </div>
  );
}

export default AnalyticChartMonthly;