import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
<<<<<<<< HEAD:src/components/Menu/Menu.js
import "./Menu.css";
========
import "./NightMenu.css";
>>>>>>>> pr/26:src/components/Menu/NightMenu/Menu/Menu.js
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import GrassIcon from '@mui/icons-material/Grass';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useSelector } from "react-redux";
<<<<<<<< HEAD:src/components/Menu/Menu.js
import ProductCard from "./ProductCard";
========
import nightMenu from "../../../../assets/data/NightMenu";
import ProductCard from "../ProductCard/ProductCard";
import { Card } from "react-bootstrap";
>>>>>>>> pr/26:src/components/Menu/NightMenu/Menu/Menu.js
// import Compressor from "compressorjs";
import Box from "@mui/material/Box";
import { Card } from "react-bootstrap";
import { Grid } from "@mui/material";
<<<<<<<< HEAD:src/components/Menu/Menu.js
import CartTest from "../../referenceFiles/Cart/CartTest";
let firstTime=false;
import { Tune } from "@mui/icons-material";

let firstTime=false;

const Menu = () => {
  const [type, setType] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const menuItems = useSelector((state) => state.menu.menuItems);
  const [allItems, setAllItems] = useState(menuItems);
  const [showEmptyMenu,setShowEmptyMenu]= useState(false);


  useEffect(() => {
    if (menuItems.length !== 0)  // if its not 0
    {
    
      setIsLoading(true); // So itshouldnt be loading anymore
    }
    
    
    if(menuItems.length ===0 && firstTime) // if its 0 and its the first tim in the component
    {
    
      setIsLoading(false); // make it aflse
    }
     

    const timeout = setTimeout(() => { // so if setis loading is false
   
      setShowEmptyMenu(true);
      firstTime=true;
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [menuItems.length]);

  useEffect(() => {
 
    document.body.style.backgroundColor = "#2b2b2b";
  }, []);



  // Filtering process
  useEffect(() => {

    // If menu items length is actually > 0 then and only then go in
    if (menuItems.length > 0) {
      if (type === "All") { // if type is all then all items should be displayed
       
        setAllItems(menuItems);
      }

      if (type === "Burger") {
      
        const filteredProducts = menuItems.filter(
          (item) => item.itemCategory === "Burger"
        );

        setAllItems(filteredProducts);
      }

      if (type === "Side") {
     
        const filteredProducts = menuItems.filter(
          (item) => item.itemCategory === "Side"
        );

        setAllItems(filteredProducts);
      }

      if (type === "Other dishes") {
     
        const filteredProducts = menuItems.filter(
          (item) => item.itemCategory === "Other dishes"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Salads") {
    
        const filteredProducts = menuItems.filter(
          (item) => item.itemCategory === "Salad"
        );
        setAllItems(filteredProducts);
      }
      if (type === "Beverages") {
       
        const filteredProducts = menuItems.filter(
          (item) => item.itemCategory === "Beverages"
        );
        setAllItems(filteredProducts);
      }
      if(type==="Offer"){
        const filteredProducts = menuItems.filter(
          (item)=> item.itemCategory ==='Offer'
        );
        setAllItems(filteredProducts);
      }
    }
  }, [type,menuItems]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <section>
        <Box
          className="box1"
          sx={{ flexGrow: 1, bgcolor: "#2b2b2b", display: "flex"}}
        >
          {/* This code is the categories bar on the left */}
          <Box
            className="box1"
            sx={{
              
            }}
          >
            <Grid className="categories" container sx={{ display: "flex", flexDirection: "column" }}>
              <Grid item>
                <button
                  className={`btn ${type === "All" ? "btnActive" : ""} `}
                  onClick={() => setType("All")}
                >
                  All
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${type === "Burger" ? "btnActive" : ""} `}
                  onClick={() => setType("Burger")}
                >
                  <LunchDiningIcon />
                  Burger
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${type === "Side" ? "btnActive" : ""} `}
                  onClick={() => setType("Side")}
                >
                  <RestaurantIcon />
                  Side
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${
                    type === "Other dishes" ? "btnActive" : ""
                  } `}
                  onClick={() => setType("Other dishes")}
                >
                  <RestaurantMenuIcon />
                  Other Dishes
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${type === "Salads" ? "btnActive" : ""} `}
                  onClick={() => setType("Salads")}
                >
                  <GrassIcon />
                  Salads
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${type === "Beverages" ? "btnActive" : ""} `}
                  onClick={() => setType("Beverages")}
                >
                  <LocalBarIcon />
                  Beverages
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn`}
                  onClick={() => setType("Offer")}
                >
                  <LocalOfferIcon/>
                  Offers
                </button>
              </Grid>
            </Grid>
          </Box>


{/* Here is the center container */}
        
          <Container>
            <Row className="row1">
              {(!isLoading && !showEmptyMenu)&&<h5 style={{fontSize:"2rem",color:"white",textAlign:"center"}}>Loading Menu...</h5>}
              {(!isLoading && showEmptyMenu)&&<h5 style={{fontSize:"2rem",color:"white",textAlign:"center"}}>Menu is empty</h5>}
              {isLoading &&
                allItems.map((item) => 
                  <Col key={item.itemID} className="mt-3 col1  center-div-items" lg='4' md='6'>
                    <ProductCard item={item} />
                  </Col>
                )}
            </Row>
            {/* </Box> */}
          </Container>



          <Box
            className="box1 d-none d-xl-block"
            sx={{
             width:300
         
            }}
          >
            <Grid className="categories" container sx={{ display: "flex", flexDirection: "column" }}>
              <Grid item>
                   {/* <CartTest/> */}
              </Grid>
            </Grid>

          </Box>
        </Box>
      </section>
    </motion.div>
  );
};

<<<<<<<< HEAD:src/components/Menu/Menu.js
export default Menu;
========
export default Menu;
>>>>>>>> pr/26:src/components/Menu/NightMenu/Menu/Menu.js
