import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import "./faq.css"
import { motion } from "framer-motion";

export default function FAQ() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        document.body.style.backgroundColor = "#e5e5e0";
    }, []);

    fetch("/config/config.json").then((res) => res.json()).then((data) => setData(data));
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
            <section id="faq">
                <Container>
                    <Row>
                        <h2>FAQ</h2>
                        <Col lg>

                            <Card>
                                <Card.Body>
                                    <Card.Title>Host Larnaca</Card.Title>
                                    <Card.Text>
                                        <span style={{ whiteSpace: "pre-wrap" }}>{data.dayfaq}</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <div className="mt-5 d-block d-lg-none" />
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Home of Street Food</Card.Title>
                                    <Card.Text>
                                        <span style={{ whiteSpace: "pre-wrap" }}>{data.nightfaq}</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </motion.div>
    )
}