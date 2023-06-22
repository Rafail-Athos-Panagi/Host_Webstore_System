import React from 'react';
import { Carousel } from 'react-bootstrap';
import jsondata from "../../../config/carousel.json";

export default function HomeCarousel() {
    const data = JSON.parse(JSON.stringify(jsondata));
    return (
        <Carousel>
            {data.map((value,key) => (
            <Carousel.Item key={key}>
                <img
                    className="d-block"
                    src={require("../../../assets/uploads/carousel/" + value.image)}
                    alt={value.name}
                />
                <Carousel.Caption>
                    <h3>{value.name}</h3>
                    <p>{value.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
            ))}
        </Carousel>
    )
}
