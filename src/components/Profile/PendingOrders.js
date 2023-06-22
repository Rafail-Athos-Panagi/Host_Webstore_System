import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import UserID from "../hooks/userid";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PendingOrders() {
  const { userID } = React.useContext(UserID);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getOrders() {
      const req = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };

      const res = await fetch(`/api/customer/getpending`, req);

      if (!res.ok) {
        console.log("error");
      }
      const data = await res.json();
      console.log(data);
      setOrders(data);


  }

    getOrders();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        height: "100%",
        width: "50ch",
      }}
    >
      <span>Pending Orders</span>
      <hr />
      {orders.length === 0 && <span>No pending orders</span>}
      {orders.length>0 && orders.map((order) => {
        return (
          <div>
            <Accordion
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <AccordionSummary
               expandIcon={<ExpandMoreIcon />}>
              ID : {order.orderID}&nbsp;&nbsp;&nbsp;&nbsp;
              Date : {order.orderDate.substring(0,10)}
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <hr/>
                  <span>Order ID: {order.orderID}</span><span onClick={() => {
                        navigate('/confirmation', { state: { orderID: order.orderID,orderStatusProp:order.orderStatus } });
                      }} style={{cursor: 'pointer',
                        color: '#0000EE',
                        textDecoration: 'underline',marginLeft:'15rem',float:'right'}}>Track</span>
                  <br/>
                  <span>Order Date: {order.orderDate.substring(0,10)}</span>
                  <br/>
                  <span>Price:{order.orderPrice}</span>
                  <br/>
                  <span>Order Status: {order.orderStatus==='in Progress' || 'ready' ? "In Progress" : order.orderStatus}</span>
                </div>
              </AccordionDetails>
            </Accordion>
            <br />
          </div>
        );
      })}
    </Box>
  );
}

/*
onClick={() => {
                        navigate('/confirmation', { state: { orderID: order.orderID } });
                      }}
  <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */
