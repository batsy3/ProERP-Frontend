import React from "react";

import { Pie } from "@ant-design/plots";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const DemoPie = () => {
  // const data = useSelector((state) => state.dashboard.list?.SupplierVSCustomer);

  const optionsRadial = {
    plotOptions: {
      pie: {
        donut: {
          expandOnClick: true,
          legend: {
            position:"left"
          },
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
              fontWeight:"600"
            },
          },
        },
      },
    },
    colors: ["#FF0000", "#FF9900"],
    fill: {
      opacity: 0.8,
    },
  };
  const seriesRadial = [44, 76];
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
