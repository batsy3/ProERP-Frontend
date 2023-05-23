import React, { Fragment } from "react";
import "./style.css";
import { Card, Space, Typography } from "antd";
import { Col, Row } from "antd";
import Title from "antd/lib/skeleton/Title";

const NewDashboardCard = ({ information, data }) => {
  console.log(data);
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
                  {data ? (
                    <Title>{data?.cardInfo.purchase_count}</Title>
                  ) : (
                    <Row>
                      <Title level={2}>
                        0{" "}
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
                <Text strong>Total Incoming Bills</Text>
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
                    <Title>{information?.purchase_total}</Title>
                  ) : (
                    <Row>
                      <Title level={2}>
                        0{" "}
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
                <Text strong>Total Incoming Payments</Text>
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
                  {information?.sale_count ? (
                    <Title>{information?.sale_count}</Title>
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
                <Text strong>Total Outgoing Payments</Text>
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
                    <Title>{information?.purchase_total}</Title>
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

    </Fragment>
  );
};

export default NewDashboardCard;
