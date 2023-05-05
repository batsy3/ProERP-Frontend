import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload
} from "antd";
import { toast } from "react-toastify";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/Services/addProductAction";
import { loadAllProductCategory } from "../../redux/actions/servicesCategory/getProductCategoryAction";
import UploadMany from "../Card/UploadMany";
import styles from "./AddProd.module.css";
import { loadAllAccount } from "../../redux/actions/account/getAccountAction";
import Loader from "../loader/loader";
import { loadProduct } from "../../redux/actions/Services/getAllProductAction";

const AddProd = () => {
  const unitType = ["kg", "ltr", "pc"];
  const category = useSelector((state) => state.productCategories?.list);
  const accounts = useSelector((state) => state.accounts?.list)
  console.log(accounts)
  const dispatch = useDispatch();
  //useEffect for loading category list from redux
  useEffect(() => {
    dispatch(loadAllProductCategory({ page: 1, limit: 100 }));
    dispatch(loadAllAccount())
  }, [dispatch]);

  const { Title } = Typography;
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category_id", values.category_id);
      formData.append("account_id", values.account_id);
      console.log(formData.get("account_id"))
      console.log(formData.get("category_id"))
      formData.append("service_code", values.service_code);

      const resp = await dispatch(addProduct(formData));

      if (resp.message === "success") {
        form.resetFields();
        setFileList([]);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("error at creating");
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    toast.error("Something went wrong !");
    console.log("Failed:", errorInfo);
  };

  const handelChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onClickLoading = () => {
    setLoader(true);
  };

  return (
     
    <Fragment>
      <Card bordered={false}>
        <Title level={4} className="m-2 text-center">
          Add Service
        </Title>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 7,
          }}
          labelWrap
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
            style={{ marginBottom: "15px" }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input service name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            name="category_id"
            label="Select Category "
            rules={[
              {
                required: true,
                message: "Please select category!",
              },
            ]}
          >
            <Select
              name="category_id"
              loading={!category}
              showSearch
              placeholder="Select Category"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {category &&
                category.map((cate) => (
                  <Select.Option key={cate.id} value={cate.id}>
                    {cate.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "15px" }}
            name="account_id"
            label="Select Account "
            rules={[
              {
                required: true,
                message: "Please select Account!",
              },
            ]}
          >
            <Select
              name="account"
              loading={!accounts}
              showSearch
              placeholder="Select Account"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {accounts &&
                accounts.map((acc) => (
                  <Select.Option key={acc.id} value={acc.id}>
                    {acc.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input Purchase Price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Service Code"
            name="service_code"
            rules={[
              {
                required: true,
                message: "Please input Service Code!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            className={styles.addProductBtnContainer}
          >
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              // loading={setLoader(true)}
            >
              Add Service
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Fragment>
  );
};

export default AddProd;
