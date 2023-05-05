import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddUser from "./addUser";
import GetAllUser from "./GetAllUser";
import React, { useState } from "react";
import { Button, Modal, Row, Col } from "antd";

const UserList = (props) => {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

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
            Onboard New Staff
          </Button>
        </Col>
      </Row>
      <Modal
        open={isSecondModalOpen}
        onCancel={handleSecondCancel}
        footer={null}
        width={"30%"}
      >
        <AddUser />
      </Modal>

      <GetAllUser />
    </div>
  );
};

export default UserList;
