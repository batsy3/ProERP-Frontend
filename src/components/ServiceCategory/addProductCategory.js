import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import styles from "./AddProdCat.module.css";

import { Fragment, useState } from "react";

import { useDispatch } from "react-redux";
import { addProductCategory } from "../../redux/actions/servicesCategory/addProductCategoryAciton";
import UploadMany from "../Card/UploadMany";

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
  };

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addProductCategory(values));
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
      <Card bordered={false} className="criclebox h-full">
        <Title level={4} className="m-2 text-center">
          Add Service Category
        </Title>
        <Form
          form={form}
          className=""
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input category Dname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className={styles.addProdCatBtnContainer}
          >
            <Button
              loading={loading}
              onClick={onClick}
              type="primary"
              htmlType="submit"
              shape="round"
            >
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Fragment>
  );
};

export default AddProductCategory;
