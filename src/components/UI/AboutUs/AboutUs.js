import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutUs.css";

export default function AboutUs() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("config/config.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <section id="about-us">
        <Container>
          <h2>Host Larnaca</h2>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Our Story</Card.Title>
                  <Card.Text>
                    <span style={{whiteSpace:"pre-wrap"}}>{data.dayaboutus}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Our Mission</Card.Title>
                  <Card.Text>
                  <span style={{whiteSpace:"pre-wrap"}}>{data.daymission}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="mt-5"/>
        <Container>
          <h2>Home of Street Food</h2>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Our Story</Card.Title>
                  <Card.Text>
                    <span style={{whiteSpace:"pre-wrap"}}>{data.nightaboutus}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Our Mission</Card.Title>
                  <Card.Text>
                  <span style={{whiteSpace:"pre-wrap"}}>{data.nightmission}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
  );
}


