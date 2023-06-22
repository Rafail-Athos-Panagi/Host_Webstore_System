import React from "react";
import OrderListItem from "./OrderListItem";
import { Row } from "react-bootstrap";
import "./OrderList.css";
const OrderList = (props) => {
  return (
    <div>
      <h1 className="header">
        {props.type}
        <hr className="line"></hr>
      </h1>
      <div>
          <Row gy={3} my={3}>
            {props.order.map((val) => {
              return (
                <OrderListItem
                  key={val.key}
                  name={val.name}
                  image={val.image}
                ></OrderListItem>
              );
            })}
          </Row>
      </div>
    </div>
  );
};

export default OrderList;
