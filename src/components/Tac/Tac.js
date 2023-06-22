import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import "./tac.css"
import { motion } from "framer-motion";

export default function Tac() {
    const [data, setData] = React.useState([]);

    fetch("/config/config.json").then((res) => res.json()).then((data) => setData(data));
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
            <section id="tac">
                <Container>
                <Row>
                        <h2>Terms and Conditions</h2>
                        <Col lg>

                            <Card>
                                <Card.Body>
                                    <Card.Text>
                                        <span style={{ whiteSpace: "pre-wrap" }}>{data.tac}</span>
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