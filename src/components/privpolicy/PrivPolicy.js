import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import "./privpolicy.css"
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
            <section id="privpolicy">
                <Container>
                <Row>
                        <h2>Privacy Policy</h2>
                        <Col lg>

                            <Card>
                                <Card.Body>
                                    <Card.Text>
                                        <span style={{ whiteSpace: "pre-wrap" }}>{data.privacy}</span>
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