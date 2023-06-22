import React from "react";
import { Button, Card } from "react-bootstrap";

export default function MiniCartItem(props) {
  const { id, title, quantity, totalPrice } = props.item;

  return (
    <div>
      <div style={{ color: "white" }}>
        {title}
        <div style={{display:"flex",width:"1rem"}}>
            <Button>-</Button>
            {quantity}</div>
            <Button>+</Button>
        </div>
        {totalPrice}
    </div>
  );
}
