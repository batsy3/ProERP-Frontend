import React, { useState } from "react";
import PageTitle from "../page-header/PageHeader";
import styles from "./AddProdCat.module.css";
import { Navigate } from "react-router-dom";
import { Button, Modal, Row, Col, Card, Typography } from "antd";
import UploadMany from "../Card/UploadMany";
import AddProductCategory from "./addProductCategory";
import GetAllProductCategory from "./getAllProductCategory";

const ProductCategory = (props) => {
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
            Import From Csv
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
            Add Service Category
          </Button>
        </Col>
      </Row>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <AddProductCategory />
      </Modal>
      <Modal
        open={isSecondModalOpen}
        onCancel={handleSecondCancel}
        footer={null}
      >
        <Card bordered={false} className={styles.importCsvCard}>
          <Title level={4} className="m-2 text-center">
            Import From CSV
          </Title>
          <UploadMany urlPath={"category"} />
        </Card>
      </Modal>

      <GetAllProductCategory />
    </div>
  );
};

export default ProductCategory;
