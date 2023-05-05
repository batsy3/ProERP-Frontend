import PageTitle from "../page-header/PageHeader";
import AddAccount from "./AddAccount";
import GetAllAccount from "./getAllAccount";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Modal, Row, Col, Card, Typography, Upload } from "antd";

const Account = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Title } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Back" />
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        justify="end"
        style={{ margin: 5 }}
      >
        <Col className="gutter-row" span={{ lg: 24, md: 20 }}>
          <Button
            onClick={showModal}
            style={{
              margin: 8,
              display: "flex",
            }}
          >
            Add Account
          </Button>
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={"30%"}
      >
        <AddAccount />
      </Modal>

      <GetAllAccount />
    </div>
  );
};

export default Account;
