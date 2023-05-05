import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/user/loginUserAction";

import Logo from "../../assets/images/login.png";
import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";

//TODO : redirect to home

const Login = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { Title, Text } = Typography;

  const onFinish = async (values) => {
    const resp = await dispatch(addUser(values));
    if (resp === "success") {
      setLoader(false);
      window.location.href = "/dashboard";
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
    toast.error("Error at login Please try again");
  };

  return (
    <>
      <Row
        className="card-row"
        gutter={100}
        style={{
          backgroundColor: "#112D63",
          height: "100vh",
        }}
      >
        <Col span={10}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img src={Logo} />
          </div>
        </Col>
        <Col
          span={14}
          style={{
            borderRadius: 30,
            backgroundColor: "white",
          }}
        >
          <Card 
            bordered={false}
            // className={styles.card}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 150,
              marginRight: 150,
              marginTop: 100,
            }}
          >
            <div
              style={{
                marginBottom: 80,
              }}
            >
              <Title
                level={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Council ERP System
              </Title>
              <Text
                type="secondary"
                className="m-3 text-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Welcome Please Log Into Your Account
              </Text>
            </div>
            <div
              style={{
                marginBottom: 50,
              }}
            >
              <Divider plain>LOGIN FOR EXTERNAL USER</Divider>
            </div>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div
                style={{
                  marginBottom: 10,
                }}
              >
                <Text>Username or Email</Text>
              </div>
              <Form.Item
                className="mb-1"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
                wrapperCol={{ sm: 24 }}
                style={{ width: "100%", marginRight: 0 }}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <div
                style={{
                  marginTop: 50,
                  marginBottom: 10,
                }}
              >
                <Text>Password</Text>
              </div>

              <Form.Item
                className="mb-2"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                wrapperCol={{ sm: 24 }}
                style={{ width: "100%", marginRight: 0 }}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{ sm: 24 }}
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  marginTop: 70,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loader}
                  onClick={() => setLoader(true)}
                  style={{
                    backgroundColor: "red",
                    width: 400,
                  }}
                >
                  Submit
                </Button>
              </Form.Item>

              <Form.Item className={styles.loginTableContainer}>
                <Row>
                  <Col span={24}>
                    <LoginTable />
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
