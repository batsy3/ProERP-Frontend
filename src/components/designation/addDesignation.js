import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addDesignation } from "../../redux/actions/designation/addDesignationAciton";
import UploadMany from "../Card/UploadMany";
import styles from "./AddDesignation.module.css";

const AddDesignation = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [loader, setLoader] = useState(false);
  const onClickLoading = () => {
    setLoader(true);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addDesignation(values));
      if (resp === "success") {
        setLoader(false);
        form.resetFields();
      }
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Add designation
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
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input designation name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.addDesignationBtnContainer}
              >
                <Button
                  onClick={onClickLoading}
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                >
                  Add designation
                </Button>
              </Form.Item>
            </Form>
          </Card>
    </Fragment>
  );
};

export default AddDesignation;
