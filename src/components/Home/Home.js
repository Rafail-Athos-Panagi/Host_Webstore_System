import { display } from "@mui/system";
import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WelcomeVideo from "../../assets/video/welcome_video.mp4";
import AboutUs from "../UI/AboutUs/AboutUs";
import ContactUs from "../UI/ContactUs/ContactUs";
import Footer from "../UI/Footer/Footer";
import BackToTop from "../UI/BackToTop/BackToTop";
import Carousel from "../UI/Carousel/Carousel"
import "./Home.css";

export default function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = "#e5e5e0";
  }, []);

  return (
    <div className="container">
    
 </div>
  );
}
