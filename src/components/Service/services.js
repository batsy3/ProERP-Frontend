import React, { useState } from "react";
import PageTitle from "../page-header/PageHeader";
import GetAllProd from "./getAllProd";
import styles from "./AddProd.module.css";
import { Navigate } from "react-router-dom";
import AddProd from "./addProd";
import { Button, Modal, Row, Col, Card, Typography, Upload } from "antd";
import UploadMany from "../Card/UploadMany";
import { useEffect } from "react";
import { loadProduct } from "../../redux/actions/Services/getAllProductAction";
import { useDispatch } from "react-redux";

const Product = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const { Title } = Typography;
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(loadProduct({}));
  },[]);

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  return (
    <>
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
            Add Service
          </Button>
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={"30%"}
      >
        <AddProd />
      </Modal>
      <Modal
        open={isSecondModalOpen}
        onCancel={handleSecondCancel}
        footer={null}
        width={"30%"}
      >
        <Card className={`${styles.importCsvCard} column-design`}>
          <Title level={4} className="m-2 text-center">
            Import From CSV
          </Title>
          <UploadMany urlPath={"service"} />
        </Card>
      </Modal>

      <GetAllProd />
    </>
  );
};

export default Product;
