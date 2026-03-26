import React from "react";
import Chart from "react-apexcharts";

function AnalyticChart() {
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
        "1 March 2024",
        "1 April 2024",
        "1 May 2024",
        "1 June 2024",
        "1 July 2024",
        "1 August 2024",
        "1 September 2024",
        "1 October 2024",
        "1 November 2024",
        "1 December 2024",
        "1 January 2025",
        "1 February 2025",
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
      data: [18000, 32000, 50000, 45000, 60000, 85000, 78000, 92000, 86000, 89000, 95000, 102000],
    },
    {
      name: "Expenses",
      data: [10000, 20000, 30000, 38000, 42000, 55000, 49000, 70000, 66000, 72000, 75000, 78000],
    },
  ];

  return (
    <div className="w-[95%] bg-white rounded-4xl p-10 m-auto">
      <Chart options={options} series={series} type="area" height={700} />
    </div>
  );
}

export default AnalyticChart;