import { display } from "@mui/system";
import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WelcomeVideo from "../../assets/video/welcome_video.mp4";
import AboutUs from "../UI/AboutUs/AboutUs";
import ContactUs from "../UI/ContactUs/ContactUs";
import Footer from "../UI/Footer/Footer";
import BackToTop from "../UI/BackToTop/BackToTop";
import "./Home.css";
import HomeCarousel from "../UI/Carousel/Carousel";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = "#e5e5e0";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div style={{display:"flex", backgroundColor:"lightgray"}}>
        <div style={{width:"50%"}}>
        <video autoPlay muted loop>
          <source src={WelcomeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
        <div  style={{width:"50%"}} className="AboutUs">
          <div style={{display:"flex", alignItems:"center", marginTop:"50px"}}>
            <AboutUs />
          </div>
        </div>
      </div>
      <div className="container"><HomeCarousel /></div>
    </motion.div>
  );
}
