import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Select,
  Space,
} from "antd";
import { useEffect } from "react";
import { loadProduct } from "../../redux/actions/Services/getAllProductAction";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../../redux/actions/customer/addCustomerAciton";
import UploadMany from "../Card/UploadMany";
import styles from "./AddCust.module.css";

const idType = ["Passport", "NRC", "Drivers License"];
const billingDate = ["first", "middle", "last"];
const AddCust = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    // setLoading(true);
  };

  const service = useSelector((state) => state.products?.list);
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
  }, []);

  const onFinish = async (values) => {
    try {
      let formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("id_type", idType.at(values.id_type));
      formData.append("id_number", values.id_number);
      formData.append("billing_date", billingDate.at(values.billing_date));
      values.services.forEach((item) => formData.append("services[]", item));
      console.log(formData.getAll("services[]"));
      const resp = await dispatch(
        addCustomer({
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          billing_date: formData.get("billing_date"),
          id_type: formData.get("id_type"),
          id_number: formData.get("id_number"),
          services: formData.getAll("services[]"),
        })
      );

      if (resp.message === "success") {
        setLoading(false);
        form.resetFields();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Card bordered={false}>
        <Title level={4} className="m-2 text-center">
          Add Customer
        </Title>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input customer name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input customer name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input customer Phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input customer email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Id Type"
            name="id_type"
            rules={[
              {
                required: true,
                message: "Please input customer Id Type!",
              },
            ]}
          >
            <Select
              showSearch
              style={{
                width: 200,
              }}
              placeholder="Select Id Type"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {idType &&
                idType.map((acc, index) => (
                  <Select.Option key={index}>{acc}</Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Id Number"
            name="id_number"
            rules={[
              {
                required: true,
                message: "Please input Id number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Services"
            name="services"
            rules={[
              {
                required: true,
                message:
                  "Please input Services the customer would like to pay for!",
              },
            ]}
          >
            <Select
              mode="multiple"
              loading={!service}
              style={{
                width: "100%",
              }}
              placeholder="select services"
              optionLabelProp="label"
            >
              {service?.map((item) => (
                <Option
                  value={parseInt(item.id)}
                  label={item.name}
                  key={item.id}
                >
                  <Space>
                    <span>{item.name}</span>
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="billing Date"
            name="billing_date"
            rules={[
              {
                required: true,
                message:
                  "Please input billing Date the customer would like to pay for!",
              },
            ]}
          >
            <Select
              showSearch
              style={{
                width: 200,
              }}
              placeholder="Select billing Date"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {billingDate &&
                billingDate.map((acc, index) => (
                  <Select.Option key={index} value={acc}>
                    {acc}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          {/* Customer due droped */}

          <Form.Item
            style={{ marginBottom: "10px" }}
            className={styles.addCustomerBtnContainer}
          >
            <Button
              loading={loading}
              onClick={onClick}
              type="primary"
              htmlType="submit"
              shape="round"
            >
              Add Customer
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Fragment>
  );
};

export default AddCust;
