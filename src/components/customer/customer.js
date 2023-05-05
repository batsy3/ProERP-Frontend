import React, { useState } from "react";
import styles from "./AddCust.module.css";
import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddCust from "./addCust";
import { Button, Modal, Row, Col, Card, Typography } from "antd";
import GetAllCust from "./getAllCust";
import UploadMany from "../Card/UploadMany";

const Customer = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const { Title } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const handleSecondCancel = () => {
    setIsSecondModalOpen(false);
  };
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
            onClick={showSecondModal}
            style={{
              margin: 8,
              display: "flex",
            }}
          >
            Upload From Csv
          </Button>
        </Col>
        <Col className="gutter-row" span={{ lg: 24, md: 20 }}>
          <Button
            onClick={showModal}
            style={{
              margin: 8,
              display: "flex",
            }}
          >
            Add Customer
          </Button>
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={"30%"}
      >
        <AddCust />
      </Modal>
      <Modal
        open={isSecondModalOpen}
        onCancel={handleSecondCancel}
        footer={null}
        width={"30%"}
      >
        <Card bordered={false} className={styles.importCsvCard}>
          <Title level={4} className="m-2 text-center">
            Import From CSV
          </Title>
          <UploadMany urlPath={"customer"} />
        </Card>
      </Modal>

      <GetAllCust />
    </div>
  );
};

export default Customer;
