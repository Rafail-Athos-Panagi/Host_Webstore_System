import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import "./OrderListItem.css";

const OrderListItem = (props) => {
  return (
    <Col md={4} sm={6}  lg={3} className="zoom">
      <Card className="card">
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Order</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default OrderListItem;
