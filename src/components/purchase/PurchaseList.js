import React from "react";
import { List } from "antd";
import { Link } from "react-router-dom";
const PurchaseList = ({ data }) => {
  return (
    <div>
      <h5 className="text-center m-4">Invoice Service List :</h5>
      <List
        bordered
        style={{ marginTop: "20px" }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={
                <Link to={`/service/${item.service.id}`}>
                  {item.service.name}
                </Link>
              }
            />
            <div>
              <p>
                {" "}
                Purchase Price : <strong>{item.product_purchase_price} </strong>
              </p>
              <p>
                {" "}
                Purchase Quantity : <strong>{item.product_quantity} </strong>
              </p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PurchaseList;
