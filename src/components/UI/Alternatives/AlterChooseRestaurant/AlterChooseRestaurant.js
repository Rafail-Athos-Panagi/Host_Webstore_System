import "./AlterChooseRestaurant.css";
import React from "react";
import Row from "react-bootstrap/Row";
import EachRestaurant from "./EachRestaurant";
import { Button, Card } from "react-bootstrap";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function ChooseRestaurant() {
  const [data ,setData] = React.useState([]);
  
  const navigate = useNavigate();
  React.useEffect(() => {
    fetch("config/config.json").then((res) => res.json()).then((data) =>setData(data));
  }, []);

  function handleDay(e) {
    e.preventDefault();
    navigate("/menu");
  }

  function handleNight(e) {
    e.preventDefault();
    navigate("/nightmenu");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
    <Paper elevation={3} className="main_box">
      <div className="restaurants">
        <Row className="Row_box">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: "lightgray"
            }}
          >
            <Card onClick={handleDay} style={{width:'500px',margin:'2rem 0 2rem 0', cursor:"pointer"}}>
              <Card.Body>
                <Card.Img variant="top" src={'home/'+data.dayhomeimage} style={{transition: 'opacity 1s ease-in-out'}}/>
                <Card.Title>Host Larnaca</Card.Title>
                <Card.Text>Our menu is available from 11:30-16:00</Card.Text>
              </Card.Body>
            </Card>
            <Card onClick={handleNight} style={{width:'500px',margin:'2rem 0 2rem 0', cursor:"pointer"}}>
              <Card.Body>
                <Card.Img variant="top" src={'home/'+data.nighthomeimage} />
                <Card.Title>Host Street Food</Card.Title>
                <Card.Text>Our menu is available from 16:00-23:00</Card.Text>
              </Card.Body>
            </Card>
          </Box>
        </Row>
      </div>
    </Paper>
    </motion.div>
  );
}

