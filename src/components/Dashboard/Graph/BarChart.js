import { Bar } from "@ant-design/plots";
import { useState } from "react";
import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

const BarChart = () => {
  // const data = useSelector((state) => state.dashboard.list?.customerSaleProfit);
  const fil = ["Year", "Month", "Day"];
  const [filter, setFilter] = useState();
  const optionsMixedChart = {
    legend: {
      position: "top",
      labels: {
        useSeriesColors: true,
      },
    },
    colors: ["#FF0000", "#053D00"],
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    fill: {
      colors: ["#FF0000", "#053D00"],
    },
    plotOptions: {
      bar: {
        columnWidth: "70%",
      },
    },
    stroke: {
      width: [2, 0, 0],
    },
    xaxis: {
      categories:
        filter === "Month"
          ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : filter === "Year"
          ? ["2023", "2022", "2021", "2020", "2019"]
          : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8,
      },
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: 100,
    },
  };
  const seriesMixedChart = [
    {
      name: "Recievable",
      type: "column",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
    {
      name: "Payable",
      type: "column",
      data: [23, 12, 54, 61, 32, 56, 81, 19],
    },
  ];
  return (
    <Chart
      options={optionsMixedChart}
      series={seriesMixedChart}
      type="line"
      width="700"
    />
  );
};

export default BarChart;
