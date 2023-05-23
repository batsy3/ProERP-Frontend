import { Line } from "@ant-design/plots";
import { Card, Col, DatePicker, Row, Typography } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../../../redux/actions/dashboard/getDashboardDataAction";
import { loadAllPurchase } from "../../../redux/actions/purchase/getPurchaseAction";
import { loadAllSale } from "../../../redux/actions/sale/getSaleAction";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import Loader from "../../loader/loader";
import DemoPie from "./DemoPie";
import BarChart from "./BarChart";
import Title from "antd/lib/skeleton/Title";
const DemoLine = () => {
  //Date fucntinalities
  const [startdate, setStartdate] = useState(moment().startOf("month"));
  const [enddate, setEnddate] = useState(moment().endOf("month"));
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const cardInformation = useSelector(
    (state) => state.dashboard.list?.cardInfo
  );

  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(loadDashboardData({ startdate, enddate })).then((res) => {
      setData(res);
      console.log(res);
    });

    console.log(cardInformation);
    dispatch(
      loadAllPurchase({
        page: 1,
        limit: 10,
        startdate: startdate,
        enddate: enddate,
      })
    );
    // dispatch(
    //   loadAllSale({
    //     page: 1,
    //     limit: 10,
    //     startdate: startdate,
    //     enddate: enddate,
    //     user: "",
    //   })
    // );
  }, []);

  const onCalendarChange = (dates) => {
    const newStartdate = (dates?.[0]).format("YYYY-MM-DD");
    const newEnddate = (dates?.[1]).format("YYYY-MM-DD");

    setStartdate(newStartdate ? newStartdate : startdate);
    setEnddate(newEnddate ? newEnddate : enddate);
    dispatch(
      loadDashboardData({
        startdate: newStartdate,
        enddate: newEnddate,
      })
    );

    dispatch(
      loadAllPurchase({
        page: 1,
        limit: 10,
        startdate: newStartdate,
        enddate: newEnddate,
      })
    );

    dispatch(
      loadAllSale({
        page: 1,
        limit: 10,
        startdate: newStartdate,
        enddate: newEnddate,
        user: "",
      })
    );
  };

  const config = {
    data,
    xField: "date",
    yField: "amount",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v) => `${v / 1000} K`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return (
    <Fragment>
      <div className="mb-3 mt-3 w-full" style={{ maxWidth: "25rem" }}>
        <RangePicker
          onCalendarChange={onCalendarChange}
          defaultValue={[startdate, enddate]}
          className="range-picker"
        />
      </div>

      <NewDashboardCard information={cardInformation} data={data} />
      <Row
        style={{
          marginTop: 20,
        }}
      >
        <Col flex={3}>
          <Card
            title={
              <Typography.Title level={2}>Sales vs Profit</Typography.Title>
            }
            bordered={true}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              margin: 10,
              height: 500,
            }}
          >
            {<BarChart data={data} />}
          </Card>
        </Col>
        <Col flex={2}>
          <Card
            title={
              <Typography.Title level={2}>Expenses vs Income</Typography.Title>
            }
            bordered={true}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              margin: 10,
              height: 500,
            }}
          >
            {<DemoPie data={data} />}
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DemoLine;
