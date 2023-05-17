import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadAllbilling,
  getPendingNonBillables,
} from "../../redux/actions/billing/billing.actions";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Dropdown, Menu, Table, Tag } from "antd";
import PageTitle from "../page-header/PageHeader";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import "./table.module.css"
import "../card.css";

const Billing = () => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const dispatch = useDispatch();
  const billings = useSelector((state) => state.billing.pending);
  console.log(billings);
  useEffect(() => {
    dispatch(getPendingNonBillables());
    dispatch(loadAllCustomer());
  }, [dispatch]);
  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title="Back" />
      <CustomTable list={billings} />
    </>
  );
};

export default Billing;

function CustomTable({ list, total, status }) {
  console.log({ list: list });
  const dispatch = useDispatch();
  function getSum(total, num) {
    return total + num.due_amount;
  }
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => {
        return (
          <Link to={`/sale/${customer.id}`}>
            {customer.first_name} {customer.last_name}
          </Link>
        );
      },
    },
    {
      title: " service",
      dataIndex: "service",
      key: "service",
      responsive: ["md"],
      render: (serv) => <span>{serv.name}</span>,
    },
    {
      title: " category",
      dataIndex: "service",
      key: "service",
      responsive: ["md"],
      render: (serv) => <Tag color="red">{serv.service_category.name}</Tag>,
    },
    {
      title: "Total Amount",
      dataIndex: "service",
      key: "total",
      render: (service) => <span>{service.price}</span>,
    },
  ];

  useEffect(() => {
    dispatch(loadAllCustomer());
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>,
    };
  });

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div>
      <div>
        {list && (
          <div style={{ marginBottom: "30px" }}>
            <Dropdown
              overlay={
                <Menu onClick={colVisibilityClickHandler} items={columnItems} />
              }
              placement="bottomLeft"
            >
              <Button
                style={{
                  marginTop: "20px",
                }}
                className="column-visibility"
              >
                Column Visibility
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
      <div>
        <Table
          
          scroll={{ x: true }}
          loading={!list}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            total: total,

            onChange: (page, limit) => {
              dispatch(loadAllCustomer({ page, limit, status }));
            },
          }}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
        />
      </div>
    </div>
  );
}
