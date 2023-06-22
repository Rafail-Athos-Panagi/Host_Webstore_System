//day
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
import OtherDishesIcon from "@mui/icons-material/DinnerDining";
import BeveragesIcon from "@mui/icons-material/LocalBar";
import "./DayMenu.css";
import DayMenuProductCard from "../ProductCard/DayMenuProductCard";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Card from 'react-bootstrap/Card';
import classes from "../../../Cart/CartItem.module.css";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cart from "../../../Cart/Cart";
import Swal from "sweetalert2";


let firstTime = false;

const DayMenu = () => {

  //Redux
  const menuItems = useSelector((state) => state.menu.menuItems);
  const dayMenuItems = menuItems.filter((item)=> (item.itemTimeOfDay === "Day" || item.itemTimeOfDay === "Both"  ) && item.itemStatus===1);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const itemsRepeatDays = useSelector((state) => state.menu.repeatDays);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  //console.log(itemsRepeatDays);
  
  
  //Use states
  const [type, setType] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [allItems, setAllItems] = useState(dayMenuItems);
  const [showEmptyMenu,setShowEmptyMenu]= useState(false);
  const [emptyMenuMessage,setEmptyMenuMessage] = useState("");
  const [addToCartButton,setAddToCartButton] = useState(null);
  const [sidebar, setSideBar] = useState(true);
  const [categorisedItems, setAllCategorisedItems] = useState([]);
  const [todayDay, setTodayDay] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [configdata, setConfigData] = useState([]);


  console.log(categorisedItems);
  //Use Navigate
  const nav = useNavigate();

  //Arrays
    const categoryDayOrder = ['Offers', 'Dishes of the day', 'Sides','Salads','Hot dishes','Salads','A La Carte','Cold sandwiches', 'Sweets', 'Beverages'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


   /*  console.log(todayDay);*/
   // console.log(itemsRepeatDays);



   // In this use effect we get all the menu items and categorise them, also we check which dish of the day should be displayed or not
    useEffect(()=>{
      if(allItems.length !== 0){
        const test = allItems.reduce((acc, item) => {
          if(!acc[item.itemCategory]){
            acc[item.itemCategory] = [];
          }

          if(itemsRepeatDays.length !== 0 && item.itemCategory === 'Dishes of The Day'){
            const test = itemsRepeatDays.find((val)=> val.itemID === item.itemID && val.dayOfTheWeek === todayDay);
            console.log(test);
            if(typeof test !== "undefined" && test !== null){
              acc[item.itemCategory].push(item);      
            }
            return acc;
          }
          
          acc[item.itemCategory].push(item);
          return acc;
        }, {});
        


        const result = Object.entries(test).map(([category, items]) => ({
          category,
          items
        }));

        console.log(result);
  
        result.sort((a, b) => categoryDayOrder.indexOf(a.category) - categoryDayOrder.indexOf(b.category));
       setAllCategorisedItems(result);
      }
    
    },[allItems,itemsRepeatDays,todayDay]);

    useEffect(() => {
      fetch("config/config.json").then((res) => res.json()).then((data) =>setConfigData(data));
    }, []);
  

    // This use effect gets the time and day and checks if u should be able to add to cart or not and also provided the day for the dish of the day items
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
      if(data===null){
        return;
      }
      setTodayDay(daysOfWeek[data.day]);
      
      if(((data.hours===11 && data.mins>=30) || (data.hours>=12 && data.hours<17)) && data.day!==0)
      {
        setAddToCartButton(false);
      }
      else{
        setAddToCartButton(true);
      }

      if(1){
        setAddToCartButton(false);
      }
    }

    getTime();
  },[]);



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

  // This use effect gets the menu items from the database and checks if some sections wont have itmes in them so they can give the feedback needed
  useEffect(() => {
    if (menuItems.length !== 0) {
      setIsLoading(true);
    }

    if (menuItems.length === 0 && firstTime) {
      setIsLoading(false);
    }

    
    if(allItems.length === 0 && (type==="All" || type==='Sides' || type==='Salads' || type==='Hot Dishes' || type==='Dishes of the day' || type==='A La Carte' || type==='Beverages' || type==='Cold sandwiches' || type==='Sweets' || type==='Offers')){
      console.log("this got called");
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

  useEffect(() => {
    document.body.style.backgroundColor = "#e5e5e0";
  }, []);


// This use effect is used for filtering the menuitems
  useEffect(() => {
    if (dayMenuItems.length > 0) {
      if (type === "All") {
        setAllItems(dayMenuItems);
      }

      if(type === "Offers"){
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "Offers"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Dishes of the day") {
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "Dishes of The Day"
        );

        setAllItems(filteredProducts);
      }


      if (type === "Sides") {
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "Sides"
        );

        setAllItems(filteredProducts);
      }

      if (type === "Salads") {
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "Salads"
        );
        setAllItems(filteredProducts);
      }
      
      if (type === "Hot Dishes") {
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "Hot Dishes"
        );
        setAllItems(filteredProducts);
      }

      if (type === "A La Carte") {
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "A La Carte"
        );
        setAllItems(filteredProducts);
      }
      if (type === "Cold sandwiches") {
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "Cold Sandwiches"
        );
        setAllItems(filteredProducts);
      }
    
      
      if (type === "Sweets") {
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "Sweets"
        );
        setAllItems(filteredProducts);
      }

      if (type === "Beverages") {
        const filteredProducts = dayMenuItems.filter(
          (item) => item.itemCategory === "Beverages"
        );
        setAllItems(filteredProducts);
      }
    }

    
  }, [type,dayMenuItems.length]);

  useEffect(() => {
    if(addToCartButton)
    { 
      Swal.fire({title:'This restaurant is currently closed',icon:'info', confirmButtonColor: "#349fdd",})
    }
  }, [addToCartButton]);

 
  // Function that is used to add an item to the cart
  const addItemHandler = (item) => {
    const iteminfo = {
      id: item.id,
      title: item.title,
      price: item.price.toFixed(2),
      ingredients: item.ingredients,
      quantity: 1,
    };

    const object = {
      newItem: iteminfo,
      extraIngredients: item.extraItems,
      fromCart:true
    };

    dispatch(cartActions.addToCart(object));
  };

  // Function that is used to remove an item from the cart
  const removeItemHandler = (item) => {
    const object = {
      id: item.id,
      extraItems: item.extraItems,
    };

    console.log(object);

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
            <div className="div-for-sideBar-top day-categories">
                <button
                  className={`btn ${type === "All" ? "day-btnActive" : ""} `}
                  onClick={() => setType("All")}
                  style={{width:"100%"}}
                >
                 
                  <AllIcon style={{ textAlign:"center"}} />
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
                  className={`btn ${type === "Dishes of the day" ? "day-btnActive" : ""} `}
                  onClick={() => setType("Dishes of the day")}
                  style={{width:"100%"}}
                >
                  <AllIcon style={{ textAlign:"center"}} />
                  <h6>Dishes of The Day</h6>
                </button>

                <button
                  className={`btn ${type === "Sides" ? "day-btnActive" : ""} `}
                  onClick={() => setType("Sides")}
                  style={{width:"100%"}}
                >
                  <SidesIcon style={{ textAlign:"center"}} />
                  <h6>Sides</h6>
                </button>
            
                <button
                  className={`btn ${type === "Salads" ? "day-btnActive" : ""} `} 
                  onClick={() => setType("Salads")}
                  style={{width:"100%"}}
                >
                 <SaladIcon style={{ textAlign:"center"}} />
                  <h6>Salads</h6>
                </button>

                <button
                  className={`btn ${
                    type === "Hot Dishes" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Hot Dishes")}
                  style={{width:"100%"}}
                >
                  <OtherDishesIcon style={{ textAlign:"center"}} />
                  <h6>Hot Dishes</h6>
                </button>

                <button
                  className={`btn ${
                    type === "A La Carte" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("A La Carte")}
                  style={{width:"100%"}}
                >
                  <FontAwesomeIcon icon="fa-solid fa-utensils" size="xl"/>
                  <h6>A La Carte</h6>
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
                    type === "Beverages" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Beverages")}
                  style={{width:"100%"}}
                >
                  <BeveragesIcon style={{ textAlign:"center"}}/>
                  <h6>Beverages</h6>
                </button>
            </div>
          </>
        )}
        <Box
          className="box1"
          sx={{ flexGrow: 1, display: "flex"}}
        >
          {sidebar && (
            <>
          <Box className="box1" sx={{marginLeft:"25px", marginTop:"10px", marginRight:"15px",position:'sticky',top:"0",height:"830px"}} >
            <h2><b>Filters</b></h2>
            <hr/>
            <h4>Category</h4>
            <br/>
            <Grid
              className="day-categories"
              container
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid item>
                <button
                  className={`btn ${type === "All" ? "day-btnActive" : ""} `}
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
                  className={`btn ${type === "Dishes of the day" ? "day-btnActive" : ""} `}
                  onClick={() => setType("Dishes of the day")}
                  style={{width:"100%"}}
                >
                  <AllIcon style={{ textAlign:"center"}} />
                  <h6>Dishes of The Day</h6>
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${type === "Sides" ? "day-btnActive" : ""} `}
                  onClick={() => setType("Sides")}
                  style={{width:"100%"}}
                >
                  
                  <SidesIcon style={{ textAlign: "center" }} />
                  <h6>Sides</h6>
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${type === "Salads" ? "day-btnActive" : ""} `} 
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
                    type === "Hot Dishes" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Hot Dishes")}
                  style={{width:"100%"}}
                >
                  <OtherDishesIcon style={{ textAlign:"center"}} />
                  <h6>Hot Dishes</h6>
                </button>
              </Grid>
              <Grid item>
                <button
                  className={`btn ${
                    type === "A La Carte" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("A La Carte")}
                  style={{width:"100%"}}
                >
                  <FontAwesomeIcon icon="fa-solid fa-utensils" size="xl"/>
                  <h6>A La Carte</h6>
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
                    type === "Beverages" ? "day-btnActive" : ""
                  } `}
                  onClick={() => setType("Beverages")}
                  style={{width:"100%"}}
                >
                  <BeveragesIcon style={{ textAlign:"center"}}/>
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
                    {items.length!==0 && <h2>{category}</h2>}               
                      <Row>
                      {items.map((item) => (
                        <Col key={items.itemID} className="mt-3 col1  center-div-items" lg='4' md='6'>
                          <DayMenuProductCard item={item} enabledButton={addToCartButton}/>
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
            }}
          >
             {cartItems.length > 0 ? (
              <Card style={{overflowY:"scroll"}}>
                <h3 style={{textAlign:"center",marginTop:"0.5rem"}}>Your Cart</h3>
                {cartItems.map((cartItemMap) => (
                  <Card.Body style={{ border: "inline-block",paddingBottom:"0cm" }}>
                    <span style={{ width: "80%" }}></span>
                    <span
                      style={{ fontFamily: "sans-serif", fontSize: "1rem" }}
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
                      style={{ marginLeft: "0.4cm" }}
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
                      <Button style={{ width: "80%",backgroundColor:"#0C777F",borderColor:"#0C777F"}} onClick={()=>{nav('/checkout')}}>Checkout</Button>
                    </div>
                </Card.Body>
              </Card>
            ) : (
              <Card>
                <Card.Body>
                <h5 style={{ fontSize: "2rem", textAlign: "center" }}>
               Your Cart
              </h5>
                </Card.Body>
                <Card.Img src={require("../../../../assets/img/test.png")} />
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

export default DayMenu;
