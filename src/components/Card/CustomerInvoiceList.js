import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Card,
  Button,
  Form,
  Modal,
  DatePicker,
  Select,
  Tag,
  Space,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadProduct } from "../../redux/actions/Services/getAllProductAction";
import { updateBilling } from "../../redux/actions/billing/billing.actions";
import { toast } from "react-toastify";

function CustomerInvoiceList({ list, linkTo, customer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector((state) => state.products.list);
  console.log()
  const columns = [
    {
      title: "Invoice ",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`${linkTo}/${id}`}>{id}</Link>,
    },
    {
      title: "Billing Date",
      dataIndex: "created_at",
      key: "date",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "Service",
      dataIndex: "service_id",
      key: "service",
      render: (service_id) => (
        <span>
          {services?.map((item) => {
            return service_id === item.id ? item.name : null;
          })}
        </span>
      ),
    },
    {
      title: "Due Amount",
      dataIndex: "due_amount",
      key: "price",
      responsive: ["md"],
    },
    {
      title: "service Type",
      dataIndex: "service_category",
      key: "category",
      responsive: ["md"],
      render: (_, service) => (
        <Tag color="green">
          {services?.map((item) =>
            service.service_id === item.id ? item.service_category.name : null
          )}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "paid_amount",
      responsive: ["md"],
      render: (record) => (
        <>
          <Tag color={record === "NOT_PAID" ? "warning" : "success"}>
            {record}
          </Tag>
        </>
      ),
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      key: "outstanding",
      responsive: ["md"],
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_2, record) => {
    //     <>
    //       {console.log({ _2: _2 })}
    //       <Space>
    //         <Link to={`/sale/${_2.id}`}>Pay</Link>
    //       </Space>
    //     </>;
    //   },
    // },
  ];
  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));
  const onFinish = async (values) => {
    try {
      let formData = new FormData();
      formData.append("gross_amount", values.gross_amount);
      formData.append("paid_amount", values.paid_amount);
      formData.append("discount", values.discount);
      formData.append("status", values.status);
      formData.append("last_paid", values.last_paid);
      formData.append("next_payment", values.next_payment);
      formData.append("due_amount", values.due_amount);
      formData.append("customer_id", values.customer_id);
      formData.append("user_id", values.user_id);
      formData.append("service_id", values.service_id);
      formData.append("note", values.note);

      const resp = await dispatch(updateBilling(formData));
    } catch (error) {
      toast.error("couldnt update billing");
      console.log({ error: error.message });
    }
    console.log("Success:", values);
  };
  const [reciept, setReciept] = useState({
    service_id: [],
    total_amount: null,
    customer_id: null,
  });
  const [billing, setbilling] = useState({
    gross_amount: 0,
    paid_amount: 0,
    discount: 0,
    status: "",
    last_paid: "",
    next_payment: "",
    due_amount: null,
    customer_id: null,
    user_id: null,
    billing_receipt_id: null,
    service_id: null,
    note: "",
  });
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
  }, []);

  return (
    <div className="mt-1">
      <div
        className="text-end"
        style={{
          marginRight: 20,
        }}
      >
        <Button
          style={{
            margin: 5,
          }}
          type="primary"
          onClick={() => navigate(`/sale/${customer?.id}`)}
        >
          Pay
        </Button>
        <Button
          style={{
            margin: 5,
          }}
        >
          Add Service
        </Button>
      </div>
      <Card
        className="header-solid h-full"
        bordered={false}
        title={[
          <h5 className="font-semibold m-0 text-center">
            Customer Invoice Information
          </h5>,
        ]}
        bodyStyle={{ paddingTop: "0" }}
      >
        <Table
          scroll={{ x: true }}
          loading={!list}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,

            onChange: (page, limit) => {
              dispatch();
            },
          }}
          columns={columns}
          dataSource={list ? addKeys(list) : []}
        />
      </Card>
    </div>
  );
}

export default CustomerInvoiceList;
