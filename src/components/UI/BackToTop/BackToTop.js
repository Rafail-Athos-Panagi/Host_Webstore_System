import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import "./BackToTop.css";

export default function BackToTop(){
    const [isVisible, setVisible] = useState(false);

    const handleScroll = () =>{
        const scrollTop = document.documentElement.scrollTop;
        setVisible(scrollTop > 0);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () =>{
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = () =>{
        window.scrollTo({
            top: 0,
            //behavior: 'smooth'
        })
    }

    return (
        <Button
        variant="primary"
        className={isVisible? "d-block" : "d-none"}
        onClick={handleClick}
        style={{position: "-webkit-sticky"}}
        >
            BackToTop
        </Button>
    );
}