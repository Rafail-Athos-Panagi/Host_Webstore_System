import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AllIcon from "@mui/icons-material/MenuBook";
import BurgerIcon from "@mui/icons-material/LunchDining";
import SaladIcon from "@mui/icons-material/RiceBowl";
import SidesIcon from "@mui/icons-material/Bento";
import BeveragesIcon from "@mui/icons-material/LocalBar";
import OtherDishesIcon from "@mui/icons-material/DinnerDining";
import "./NightMenu.css";
import Card from "react-bootstrap/Card";
import NightMenuProductCard from "../ProductCard/NightMenuProductCard";
// import Compressor from "compressorjs";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Button from "react-bootstrap/Button";
import classes from "../../../Cart/CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Cart from "../../../Cart/Cart";
import Swal from "sweetalert2";
let firstTime = false;

const NightMenu = () => {
  const [type, setType] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const menuItems = useSelector((state) => state.menu.menuItems);
  const nightMenuItems = menuItems.filter((item) => (item.itemTimeOfDay === "Night" || item.itemTimeOfDay ==='Both')&& item.itemStatus === 1);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const [sidebar, setSideBar] = useState(true);
  const totalQuantity= useSelector((state)=>state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.items);
  const [allItems, setAllItems] = useState(nightMenuItems);
  const [showEmptyMenu, setShowEmptyMenu] = useState(false);
  const [addToCartButton, setAddToCartButton] = useState(null);
  const [categorisedItems, setAllCategorisedItems] = useState([]);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [emptyMenuMessage,setEmptyMenuMessage] = useState("");
  const categoryOrder = ['Offers', 'Burgers', 'Sides','Tasty bites','Cold sandwiches','Salads','Kids Menu', 'Sweets', 'Beverages'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [configdata, setConfigData] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(()=>{
    if(allItems.length !== 0){
      const test = allItems.reduce((acc, item) => {
        if(!acc[item.itemCategory]){
          acc[item.itemCategory] = [];
        }

        acc[item.itemCategory].push(item);
        return acc;
      }, {});

      const result = Object.entries(test).map(([category, items]) => ({
        category,
        items
      }));

      result.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
     setAllCategorisedItems(result);
    }
  
  },[allItems])

   useEffect(()=>{
    async function getTime(){

      //Check if restaurant is open
      const res = await fetch('/api/menu/isopen');
      const isopen = await res.json();
      if(isopen===null)
        return;

      if(!isopen.open){
        setAddToCartButton(true);
        return;
      }

      const response = await fetch('/api/time');
      const data = await response.json();

      console.log(data);
      if(data===null){
        return;
      }

      
      if(data.hours>=16 && data.hours<23  && data.day!==0)
      {
        setAddToCartButton(false);
      } else {
        setAddToCartButton(true);
      }

      /* if (1)
    {
      setAddToCartButton(false);
    } */
    }

    

    getTime();
  },[]);

  useEffect(() => {
    fetch("config/config.json").then((res) => res.json()).then((data) =>setConfigData(data));
  }, []);

  var width = window.innerWidth;
  useEffect(() => {
    if (width < "768") {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
    function handleResize() {
      width = window.innerWidth;
      if (width < "768") {
        setSideBar(false);
      } else {
        setSideBar(true);
      }
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (menuItems.length !== 0) setIsLoading(true);

    if (menuItems.length === 0 && firstTime) {
      setIsLoading(false);
    }

    if(allItems.length === 0 && (type==="All" || type==='Sides' || type==='Salads' || type==='Kids Menu' || type==='Burgers' || type==='Tasty bites' || type==='Beverages' || type==='Cold sandwiches' || type==='Sweets' || type==='Offers')){
      setEmptyMenuMessage(`There are no ${type==='All'?"items":type} on the menu`);
      setShowEmptyMenu(true);
      setIsLoading(false);
    }

    const timeout = setTimeout(() => {
      setShowEmptyMenu(true);
      firstTime = true;
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [menuItems.length,allItems.length,type]);

  useEffect(() => {
    if (menuItems.length > 0) {
      setIsLoading(true);
    }
  }, [menuItems]);

  /* useEffect(()=>
 {
  setAllItems(menuItems)
 },[]) */

  useEffect(() => {
    if (nightMenuItems.length > 0) {
      
      if (type === "All") {
        setAllItems(nightMenuItems);
      }

      if(type === "Offers"){
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Offers"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Burgers") {
        console.log("burgers");
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Burgers"
        );

        setAllItems(filteredProducts);
      }

      if (type === "Tasty bites") {
        console.log("Tasty bites");
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Tasty Bites"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Cold sandwiches") {
        console.log("Cold sandwiches");
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Cold Sandwiches"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Sweets") {
        console.log("Sweets");
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Sweets"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Sides") {
        console.log("Sides");
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Sides"
        );

        setAllItems(filteredProducts);
      }

     

      if (type === "Salads") {
        console.log("Salads");
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Salads"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Kids Menu") {
        console.log("Kids Menu");
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Kids Menu"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Beverages") {
        console.log("Beverages");
        const filteredProducts = nightMenuItems.filter(
          (item) => item.itemCategory === "Beverages"
        );
        setAllItems(filteredProducts);
      }
    }
  }, [type,nightMenuItems.length]);

  useEffect(() => {
    if(addToCartButton)
    { 
      Swal.fire({title:'This restaurant is currently closed',icon:'info', confirmButtonColor: "#349fdd",})
    }
  }, [addToCartButton]);

  const addItemHandler = (item) => {
    const iteminfo = {
      id: item.id,
      title: item.title,
      price: item.price.toFixed(2),
      ingredients: item.ingredients,
    };

    const object = {
      newItem: iteminfo,
      extraIngredients: item.extraItems,
      fromCart:true
    };

    dispatch(cartActions.addToCart(object));
  };

  const removeItemHandler = (item) => {
    const object = {
      id: item.id,
      extraItems: item.extraItems,
    };

    dispatch(cartActions.removeFromCart(object));
  };

  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <section>
      {!sidebar && (
          <>
            <div className="div-for-sideBar-top night-categories">
              <button
                className={`btn ${type === "All" ? "night-btnActive" : ""} `}
                onClick={() => setType("All")}
                style={{ width: "100%" }}
              >
                <AllIcon style={{ textAlign: "center" }} />
                <h6>All</h6>
              </button>

              <button
                  className={`btn ${
                    type === "Offers" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Offers")}
                  style={{width:"100%"}}
                >
                  <FontAwesomeIcon icon="fa-solid fa-tag" size="xl"/>
                  <h6>Offers</h6>
                </button>

              <button
                className={`btn ${
                  type === "Burgers" ? "night-btnActive" : ""
                } `}
                onClick={() => setType("Burgers")}
                style={{ width: "100%" }}
              >
                <BurgerIcon style={{ textAlign: "center" }} />
                <h6>Burgers</h6>
              </button>

              <button
                  className={`btn ${
                    type === "Tasty bites" ? "night-btnActive" : ""
                  } `}
                  onClick={() => setType("Tasty bites")}
                  style={{width:"100%"}}
                >
                  <RestaurantMenuIcon style={{ textAlign:"center"}}/>
                  <h6>Tasty bites</h6>
                </button>

                <button
                  className={`btn ${
                    type === "Cold sandwiches" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Cold sandwiches")}
                  style={{width:"100%"}}
                >
                  <FontAwesomeIcon icon="fa-solid fa-bread-slice" size="lg"/>
                  <h6>Cold sandwiches</h6>
                </button>
                
                
              <button
                className={`btn ${type === "Sides" ? "night-btnActive" : ""} `}
                onClick={() => setType("Sides")}
                style={{ width: "100%" }}
              >
                <SidesIcon style={{ textAlign: "center" }} />
                <h6>Sides</h6>
              </button>

              <button
                className={`btn ${type === "Salads" ? "night-btnActive" : ""} `}
                onClick={() => setType("Salads")}
                style={{ width: "100%" }}
              >
                <SaladIcon style={{ textAlign: "center" }} />
                <h6>Salads</h6>
              </button>

              <button
                  className={`btn ${
                    type === "Kids Menu" ? "night-btnActive" : ""
                  } `}
                  onClick={() => setType("Kids Menu")}
                  style={{width:"100%"}}
                >
                 <FontAwesomeIcon icon="fa-solid fa-child" size="xl"/>
                  <h6>Kids Menu</h6>
                </button>
                <button
                  className={`btn ${
                    type === "Sweets" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Sweets")}
                  style={{width:"100%"}}
                >
                  <FontAwesomeIcon icon="fa-solid fa-stroopwafel" size="xl"/>
                  <h6>Sweets</h6>    
                </button>
              <button
                className={`btn ${
                  type === "Beverages" ? "night-btnActive" : ""
                } `}
                onClick={() => setType("Beverages")}
                style={{ width: "100%" }}
              >
                <BeveragesIcon style={{ textAlign: "center" }} />
                <h6>Beverages</h6>
              </button>
            </div>
          </>
        )}
        <Box
          className="box1"
          sx={{ flexGrow: 1, display: "flex", marginBottom:"" }}
        >
          {sidebar && (
            <>
          <Box className="box1" sx={{marginLeft:"25px", marginTop:"10px", marginRight:"15px",position:'sticky',top:"0",height:"830px"}}>
            <h2 ><b>Filters</b></h2>
            <hr ></hr>
            <h4 >Category</h4>
            <br/>
            <Grid
              className="night-categories"
              container
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid item>
                <button
                  className={`btn ${type === "All" ? "night-btnActive" : ""} `}
                  onClick={() => setType("All")}
                  style={{width:"100%"}}
                >
                  <AllIcon style={{ textAlign:"center"}} />
                  <h6>All</h6>
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${
                    type === "Offers" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Offers")}
                  style={{width:"100%"}}
                >
                   <FontAwesomeIcon icon="fa-solid fa-tag" size="xl"/>
                  <h6>Offers</h6>
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${
                    type === "Burgers" ? "night-btnActive" : ""
                  } `}
                  onClick={() => setType("Burgers")}
                  style={{width:"100%"}}
                >
                  <BurgerIcon style={{ textAlign:"center"}} />
                  <h6>Burgers</h6>
                </button>
              </Grid>
             
              <Grid item>
                <button
                  className={`btn ${type === "Sides" ? "night-btnActive" : ""} `}
                  onClick={() => setType("Sides")}
                  style={{width:"100%"}}
                >
                  <SidesIcon style={{ textAlign:"center"}} />
                  <h6>Sides</h6>
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${
                    type === "Tasty bites" ? "night-btnActive" : ""
                  } `}
                  onClick={() => setType("Tasty bites")}
                  style={{width:"100%"}}
                >
                  <RestaurantMenuIcon style={{ textAlign:"center"}}/>
                  <h6>Tasty bites</h6>
                </button>
              </Grid>
              <Grid item>
              <button
                  className={`btn ${
                    type === "Cold sandwiches" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Cold sandwiches")}
                  style={{width:"100%"}}
                >
                   <FontAwesomeIcon icon="fa-solid fa-bread-slice" size="lg"/>
                  <h6>Cold sandwiches</h6>
                </button>
              </Grid>      
              <Grid item>
                <button
                  className={`btn ${type === "Salads" ? "night-btnActive" : ""} `}
                  onClick={() => setType("Salads")}
                  style={{width:"100%"}}
                >
                  <SaladIcon style={{ textAlign:"center"}} />
                  <h6>Salads</h6>
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${
                    type === "Kids Menu" ? "night-btnActive" : ""
                  } `}
                  onClick={() => setType("Kids Menu")}
                  style={{width:"100%"}}
                >
                  <OtherDishesIcon style={{ textAlign:"center"}} />
                  <h6>Kids Menu</h6>
                </button>
              </Grid>
              <Grid item>
              <button
                  className={`btn ${
                    type === "Sweets" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Sweets")}
                  style={{width:"100%"}}
                >
                  <FontAwesomeIcon icon="fa-solid fa-stroopwafel" size="xl"/>
                  <h6>Sweets</h6>
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${
                    type === "Beverages" ? "night-btnActive" : ""
                  } `}
                  onClick={() => setType("Beverages")}
                  style={{width:"100%"}}
                >
                  <BeveragesIcon style={{ textAlign:"center"}} />
                  <h6>Beverages</h6>
                </button>
              </Grid>
            </Grid>
          </Box>
          </>)}
        
          <Container>
          <Row className="row1">
               {(!isLoading && !showEmptyMenu)&&<h5 style={{fontSize:"2rem",textAlign:"center"}}>Loading Menu...</h5>}
               {(!isLoading && showEmptyMenu)&&<h5 style={{fontSize:"2rem",textAlign:"center"}}>{emptyMenuMessage}{emptyMenuMessage.length===0 ? "Menu is empty" : ""}<br/>Check back later!</h5>}   
                 {isLoading && categorisedItems.map(({category,items}) =>(
                   <div key={category}>
                      <h2>{category}</h2>
                      <Row>
                      {items.map((item) => (
                        <Col key={category} className="mt-3 col1  center-div-items" lg='4' md='6'>
                          <NightMenuProductCard item={item} enabledButton={addToCartButton}/>
                        </Col>
                      ))}
                      </Row>  
                      <br/>
                  </div>)
                 )}
                 <div className="m-auto d-block d-md-none" style={{position:'fixed',bottom:'20px',right:'0px !important'}}> 
                        <div className={classes.mobileCartButton} onClick={() => setShowCart(true)}>
                            <span className={classes.mobileCartCount} style={{padding:'2px 7px 2px 7px'}}>{totalQuantity}</span>
                            <span>Cart</span>
                            <span className={classes.mobileCartTotal}>€{totalPrice.toFixed(2)}</span>
                        </div>
                 </div>
            {showCart && (<Cart
              onClose={() => {
                setShowCart(false);
              }}
            />)}
             </Row>
            {/* </Box> */}
          </Container>
          <Box
            className="box1 d-none d-xl-block shadow-lg p-3 mb-5 bg-white rounded"
            sx={{
              width:400,
              height:"100%",
              marginRight:"25px",
              overflowY:"scroll",
              position:'sticky',
              top:"0",
              marginTop:"2rem"
            }}
          >
             {cartItems.length > 0 ? (
              <Card style={{overflowY:"scroll"}} >
                <h3 style={{textAlign:"center",marginTop:"0.5rem"}}>Your Cart</h3>
                {cartItems.map((cartItemMap) => (
                  <Card.Body style={{ border: "inline-block",paddingBottom:"0cm"}}>
                    <span style={{ width: "80%" }}></span>
                    <span
                      style={{ fontFamily: "sans-serif", fontSize: "1rem"}}
                    >
                      {cartItemMap.title}
                    </span>
                    {(cartItemMap.extraItems !== undefined && cartItemMap.extraItems.length!==0) && <span><br/>Extra items:{cartItemMap.extraItems.map((val)=>{
                    return <span key={val.extraItemName}>{val.extraItemName}&nbsp;&nbsp;x{val.extraItemQuantity},&nbsp;</span>
                })}</span>}
                    <br/>
                    <Button
                      style={{ marginRight: "0.4cm" }}
                      className={classes.buttonQuantity}
                      onClick={() => removeItemHandler(cartItemMap)}
                    >
                      -
                    </Button>
                    {cartItemMap.quantity}
                    <Button
                      style={{ marginLeft: "0.4cm"}}
                      className={classes.buttonQuantity}
                      onClick={() => addItemHandler(cartItemMap)}
                    >
                      +
                    </Button>
                    <div style={{ float: "right" }}>{cartItemMap.price.toFixed(2)}€</div>
                    <div
                      style={{
                        borderBottom:"1px solid lightgrey",
                        width: "80%" ,
                        margin: "auto",
                        paddingTop:"0.5rem"
                      }}
                    ></div>
                  </Card.Body>
                ))}
                <Card.Body>
                  <div style={{float:"right"}}>
                    <span  style={{fontSize:"1rem"}}>Subtotal: <span style={{margin:"auto",float:"right"}}>{totalPrice.toFixed(2)}€</span><br/></span>
                    <span style={{fontSize:"1.3rem"}}>Total: <span style={{margin:"auto"}}>{totalPrice.toFixed(2)}€</span></span>
                  </div>
                  <br/>
                  <br/>
                  <br/>
                    <div  style={{ justifyContent: "center", display: "flex" }}>
                      <Button style={{ width: "80%",backgroundColor:"#0C777F",borderColor:"#0C777F" }} onClick={()=>{nav('/checkout')}}>Checkout</Button>
                    </div>
                </Card.Body>
              </Card>
            ) : (
              <Card style={{height:350}}>
                <Card.Body>
                <h5 style={{ fontSize: "2rem", textAlign: "center"}}>
               Your Cart
              </h5>
                </Card.Body>
                <Card.Img style={{height:'60%',marginBottom: 60}} src={require("../../../../assets/img/test.png")} />
              </Card>
            )}
            <br/>
            <Card>
              <Card.Body>
                <p>Allergens</p>
                <span>{configdata.allergens}</span>
                </Card.Body>
            </Card>
          </Box>       
        </Box>
      </section>
    </motion.div>
  );
};

export default NightMenu;
