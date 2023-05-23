import React from "react";

import { Pie } from "@ant-design/plots";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const DemoPie = ({ data }) => {
  // const data = useSelector((state) => state.dashboard.list?.SupplierVSCustomer);

  const optionsRadial = {
    plotOptions: {
      pie: {
        donut: {
          expandOnClick: true,
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "100",
              fontWeight: "600",
              color: "black",
            },
            value: {
              show: true,
            },
            total: {
              showAlways: true,
              show: true,
              fontSize: "60",
              fontWeight: "600",
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
    },
    labels: ["Income", "Expense"],
    colors: ["#FF0000", "#FF9900"],
    fill: {
      opacity: 0.8,
    },
  };

  const seriesRadial = [
    Number(data?.IncomeVsExpense.find((item) => item.type === "income").value),
    Number(
      data?.IncomeVsExpense.find((item) => item.type === "expenses").value
    ),
  ];
  return (
    <Chart
      options={optionsRadial}
      series={seriesRadial}
      type="donut"
      width="100%"
      height={400}
    />
  );
};

export default DemoPie;
