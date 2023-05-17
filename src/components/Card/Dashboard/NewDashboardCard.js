import React, { Fragment } from "react";
import "./style.css";
import { Card, Space, Typography } from "antd";
import { Col, Row } from "antd";
import Title from "antd/lib/skeleton/Title";

const NewDashboardCard = ({ information }) => {
  const { Text, Title, Link } = Typography;
  const style = {
    background: "#0092ff",
    padding: "8px 0",
  };
  return (
    <Fragment
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 300,
          lg: 32,
        }}
        style={{
          marginLeft: 40,
        }}
      >
        <Col
          className="gutter-row"
          span={5}
          style={{
            margin: 10,
          }}
        >
          <Card
            bordered={true}
            style={{
              borderColor: "darkBlue",
              width: 300,
              // height:150,
              borderRadius: 15,
              borderWidth: 1,
            }}
          >
            <Row>
              <Col flex={2}>
                <Text strong>Total Outgoing Bills</Text>
              </Col>
              <Col flex={3}>
                <i className="icon-rocket font-medium-4 float-right"></i>
              </Col>
            </Row>
            <Row>
              <Col flex={2}>
                <h3
                  style={{
                    marginTop: 8,
                  }}
                >
                  {information?.purchase_total ? (
                    information?.purchase_total
                  ) : (
                    <Row>
                      <Title level={2}>
                        6{" "}
                        <span
                          style={{
                            fontSize: 15,
                          }}
                        >
                          bills
                        </span>
                      </Title>
                    </Row>
                  )}
                </h3>
              </Col>
              <Col flex={2}></Col>
            </Row>

            <Row>
              <Title level={4}>+ 15%</Title>
              <Col
                flex={3}
                style={{
                  justifyContent: "end",
                  display: "flex",
                }}
              >
                <Link
                  style={{
                    color: "#112D63",
                  }}
                >
                  <Text underline>view Report</Text>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col
          className="gutter-row"
          span={5}
          style={{
            margin: 10,
          }}
        >
          <Card
            bordered={true}
            style={{
              borderColor: "darkBlue",
              width: 300,
              // height:150,
              borderRadius: 15,
              borderWidth: 1,
            }}
          >
            <Row>
              <Col flex={2}>
                <Text strong>Total Outgoing Bills</Text>
              </Col>
              <Col flex={3}>
                <i className="icon-rocket font-medium-4 float-right"></i>
              </Col>
            </Row>
            <Row>
              <Col flex={2}>
                <h3
                  style={{
                    marginTop: 8,
                  }}
                >
                  {information?.purchase_total ? (
                    information?.purchase_total
                  ) : (
                    <Row>
                      <Title level={2}>
                        6{" "}
                        <span
                          style={{
                            fontSize: 15,
                          }}
                        >
                          bills
                        </span>
                      </Title>
                    </Row>
                  )}
                </h3>
              </Col>
              <Col flex={2}></Col>
            </Row>

            <Row>
              <Title level={4}>+ 15%</Title>
              <Col
                flex={3}
                style={{
                  justifyContent: "end",
                  display: "flex",
                }}
              >
                <Link
                  style={{
                    color: "#112D63",
                  }}
                >
                  <Text underline>view Report</Text>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col
          className="gutter-row"
          span={5}
          style={{
            margin: 10,
          }}
        >
          <Card
            bordered={true}
            style={{
              borderColor: "darkBlue",
              width: 300,
              // height:150,
              borderRadius: 15,
              borderWidth: 1,
            }}
          >
            <Row>
              <Col flex={2}>
                <Text strong>Total Outgoing Bills</Text>
              </Col>
              <Col flex={3}>
                <i className="icon-rocket font-medium-4 float-right"></i>
              </Col>
            </Row>
            <Row>
              <Col flex={2}>
                <h3
                  style={{
                    marginTop: 8,
                  }}
                >
                  {information?.purchase_total ? (
                    information?.purchase_total
                  ) : (
                    <Row>
                      <Title level={2}>
                        6{" "}
                        <span
                          style={{
                            fontSize: 15,
                          }}
                        >
                          bills
                        </span>
                      </Title>
                    </Row>
                  )}
                </h3>
              </Col>
              <Col flex={2}></Col>
            </Row>

            <Row>
              <Title level={4}>+ 15%</Title>
              <Col
                flex={3}
                style={{
                  justifyContent: "end",
                  display: "flex",
                }}
              >
                <Link
                  style={{
                    color: "#112D63",
                  }}
                >
                  <Text underline>view Report</Text>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col
          className="gutter-row"
          span={6}
          style={{
            margin: 10,
          }}
        >
          <Card
            bordered={true}
            style={{
              borderColor: "darkBlue",
              width: 300,
              // height:150,
              borderRadius: 15,
              borderWidth: 1,
            }}
          >
            <Row>
              <Col flex={2}>
                <Text strong>Total Outgoing Bills</Text>
              </Col>
              <Col flex={3}>
                <i className="icon-rocket font-medium-4 float-right"></i>
              </Col>
            </Row>
            <Row>
              <Col flex={2}>
                <h3
                  style={{
                    marginTop: 8,
                  }}
                >
                  {information?.purchase_total ? (
                    information?.purchase_total
                  ) : (
                    <Row>
                      <Title level={2}>
                        6{" "}
                        <span
                          style={{
                            fontSize: 15,
                          }}
                        >
                          bills
                        </span>
                      </Title>
                    </Row>
                  )}
                </h3>
              </Col>
              <Col flex={2}></Col>
            </Row>

            <Row>
              <Title level={4}>+ 15%</Title>
              <Col
                flex={3}
                style={{
                  justifyContent: "end",
                  display: "flex",
                }}
              >
                <Link
                  style={{
                    color: "#112D63",
                  }}
                >
                  <Text underline>view Report</Text>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="dark">
                        {information?.sale_total ? information?.sale_total : 0}
                      </h3>
                      <span className="dark">Total Sale</span>
                    </div>
                    <div className="align-self-center">
                      <i className="icon-rocket font-large-2 float-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="dark">
                        {information?.sale_profit
                          ? information?.sale_profit
                          : 0}
                      </h3>
                      <span className="dark">Total Profit</span>
                    </div>
                    <div className="align-self-center">
                      <i className="icon-wallet font-large-2 float-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="dark">
                        {information?.purchase_count
                          ? information?.purchase_count
                          : 0}
                      </h3>
                      <span
                        className="strong dark"
                        style={{ fontSize: "11px", fontWeight: "bold" }}
                      >
                        Purchase Invoice{" "}
                      </span>
                    </div>
                    <div className="media-body text-right">
                      <h3 className="dark">
                        {information?.sale_count ? information?.sale_count : 0}
                      </h3>
                      <span
                        className="strong dark"
                        style={{ fontSize: "11px", fontWeight: "bold" }}
                      >
                        Sale Invoice{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default NewDashboardCard;
