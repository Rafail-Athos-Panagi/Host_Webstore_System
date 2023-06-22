//day
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./DayItemDetails.css";
import Modal from "../../../UI/Modal/Modal";
import useInput from "../../../hooks/use-input";
import { cartActions } from "../../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { updateCookie } from "../../../store/cart-actions";
import classes from "../../../Cart/CartItem.module.css";
import { FormControlLabel, Checkbox } from "@mui/material";
import { notEmpty } from "../../../Regex/Regex";
import { TextField } from "@mui/material";
import UserID from "../../../hooks/userid";
import Cookies from "js-cookie";
import Login from "../../../Login/Login";
import { Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
// const relatedProduct = NightMenu.filter((item) => category === item.category);

// useEffect(()=>
// {
//  document.body.style.backgroundColor='#2b2b2b';
// },[])

// useEffect(()=>
// {
//  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
// },[image])

const DayItemDetails = (props) => {

  //Regex for input validation
  const isNotEmpty = (value) => notEmpty.test(value); // regex check for is not empty
  
  const cartItems = useSelector((state) => state.cart.items); // we get the cart items using the useSelector hook from redux toolkit. we access the state of the cart and we want the items array from it
  const allMenuitems = useSelector((state) => state.menu.menuItems); // menuitems of the night menu
  const items = allMenuitems.find((item) => item.itemID == props.id); // we get an id from the prop which is when the user actually selects to see more about hte menu item so we need to find the same id in our menu items array so we can only get that information
  const {itemID,itemName,itemImage,itemPrice,itemIngredients,itemDescription,itemAllergens} = items; // image not done yet.Destructuring the object
  const allExtraMenuItems = useSelector((state) => state.menu.extraItems);
  const thisItemExtra = allExtraMenuItems.filter((item) => item.itemID === itemID); // this item's extra items if there are any
  const dispatch = useDispatch(); // dispatch actions to the cart using data
  
  //State Variables
  const [checked, setChecked] = useState(false); // this is used for the checkbox to add or remove items from the extra items array
  const [orderExtra, setOrderExtra] = useState([]);
  const [showlogin, setShowLogin] = useState(false);

  //Use context variables
  const { userID } = useContext(UserID);

  const {
    value: quantityValue,
    valueChangeHandler: quantityChangeHandler,
    reset: resetQuantity,
  } = useInput(isNotEmpty, 1);


  const {
    value: commentToKitchen,
    valueChangeHandler: commentToKitchenChangeHandler,
    reset: resetCommentToKitchen,
  } = useInput(isNotEmpty, "");

  // add item to cart function we dispatch the cart addto cart function which gets the needed information about the item and pushes them into the cart
  const addItemToCart = () => {
    if(!userID)
    {
      if(Cookies.get("address")===undefined)
      {
        console.log("NO user i wont add user");
        setShowLogin(true);
        return ;
      }
    } 

     async function getTime() {
      const response = await fetch("/api/time");
      const data = await response.json();
      if (1) {
        const cartItemInfo = {
          id: props.id,
          title: itemName,
          image: itemImage,
          price: itemPrice, // quantity will be discussed later dld if we want the user to be able to add multiple from the menu page
          ingredients: itemIngredients,
          quantity: quantityValue,
          comment: commentToKitchen,
        };

        const objectForCart = {
          newItem: cartItemInfo,
          extraIngredients: orderExtra,
          fromCart:false,
        };

        console.log(objectForCart);
        // add to cart action
       dispatch(cartActions.addToCart(objectForCart));
      }
    }

    getTime();
    props.onClose()
  };

  // updating cookie
  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < cartItems.length; i++) {
      newArray.push({
        id: cartItems[i].id,
        quantity: cartItems[i].quantity,
        extraItems: cartItems[i].extraItems,
      });
    }
    dispatch(updateCookie(newArray));
  }, [cartItems, dispatch]);

  const removeQuantity = () => {
    if (quantityValue > 1) resetQuantity(quantityValue - 1);
    else console.log("sorry this isnt possible");
  };

  const addQuantity = () => {
    resetQuantity(quantityValue + 1);
  };

  const handleChange = (e, item) => {
    if (e.target.checked) {
      setOrderExtra((prevValue) => [
        ...prevValue,
        {
          extraItemName: item.extraItemName,
          extraItemPrice: item.extraItemPrice,
          extraItemQuantity: 1,
        },
      ]);
    }
    if (!e.target.checked) {
      const ar = orderExtra.filter(
        (val) => val.extraItemName != item.extraItemName
      );
      setOrderExtra(ar);
    }
    setChecked(e.target.checked);
  };

  const addExtraQuantity = (e,item) => {
    console.log(e);
    console.log(item);

    const array = orderExtra.map((val) => { 
      if(val.extraItemName === item.extraItemName)
      {
        val.extraItemQuantity = parseInt(e);
      }
      return val;
    }
    );
    setOrderExtra(array);
  };

  return (
<>
    
    <Modal
      className="day-modal-box"
      onClose={props.onClose}
      styleOfTheModal={"modalLightMenu"}
      modalContent={"none"}
      centered
    >
      {showlogin && (
      <Login
        onClose={() => {
          setShowLogin(false);
        }}
      />
    )}
      <Container className="details-of-the-item">
        <Row className="day-upper-row">
          <h1 className="center-title">
            <b>{itemName}</b>
          </h1>
        </Row>
        <Row className="day-middle-top-row row1">
          <Col className="col1" sm="12" md="6" lg="5" xl="5">
            <Row className="row1 center-items">
              <img
                className="img-main"
                src={"/uploads/menu/" + itemImage}
                alt={itemName}
                style={{ borderRadius: "0" }}
              />

              <span
                className="day-ingredients-text"
                style={{
                  marginTop: "15px",
                  color: "#1d1d1d",
                }}
              >
                <b>
                  <u>Ingredients:</u>
                </b>{" "}
                {itemIngredients}
              </span>
              <span style={{ color: "#800808" }}>Allergens: {itemAllergens ? itemAllergens : "No allergens"}</span>
            </Row>
          </Col>
          <Col className="col1" sm="0" md="6" lg="7" xl="7">
            <Row style={{margin:"auto"}} className="row1">
              <span className="day-product-name">Description</span>
              <span
                className="paragraph-scroll"
                style={{
                  backgroundColor: "#fff",
                  color: "#1d1d1d",
                  width: "100%",
                  marginBottom: "5px",
                  borderRadius:5
                }}
              >
                {itemDescription}
              </span>
            </Row>

            {thisItemExtra.length > 0 ? (
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                {" "}
                <span className="day-extra-ingredients-title">              
                    Add extra Ingredients
                </span>
                <Row
                  className="div-scroll-items "
                  style={{ fontSize: "large" }}
                >
                  {thisItemExtra.map((item, index) => (
                    <Col lg="6" className="col1">
                      <Checkbox
                        className="checkbox-tick"
                        value={checked}
                        onChange={(e) => handleChange(e, item)}
                        color="primary"
                        key={index}
                      />
                      <span
                        style={{
                          color: "#1d1d1d",
                        }}
                      >
                        {item.extraItemName}&nbsp;&nbsp;&nbsp;&nbsp;
                        {item.extraItemPrice.toFixed(2)}€
                      </span>

                      {orderExtra.find(val => val.extraItemName === item.extraItemName) && <Dropdown onSelect={(e)=>addExtraQuantity(e,item)} style={{ display: 'inline-block',maxWidth: "50px",marginLeft:"20px"}}>
                        <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor:"lightgray",borderColor:"black",color:"black",maxWidth:"50px"}}>
                        {orderExtra.find(val => val.extraItemName === item.extraItemName)?.extraItemQuantity ?? 1}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{maxWidth:"50px"}}>
                          <Dropdown.Item eventKey="1" style={{maxWidth:"50px"}}>1</Dropdown.Item>
                          <Dropdown.Item eventKey="2" style={{maxWidth:"50px"}}>2</Dropdown.Item>
                          <Dropdown.Item eventKey="3" style={{maxWidth:"50px"}}>3</Dropdown.Item>
                          <Dropdown.Item eventKey="4" style={{maxWidth:"50px"}}>4</Dropdown.Item>
                          <Dropdown.Item eventKey="5" style={{maxWidth:"50px"}}>5</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>}
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              <div>
                <p className="day-extra-ingredients-title">No extra ingredients</p>
              </div>
            )}

            <Row className="col1">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={commentToKitchen}
                  onChange={commentToKitchenChangeHandler}
                  placeholder="Write a comment for the kitchen"
                  style={{ width: "100%" }}
                />
              </Form.Group>
            </Row>
          </Col>
        </Row>

        <Row className="row1 border-line-top margin-top-row">
          <Col className="col1 center-div margin-top-col" lg="5">
            <div style={{marginTop:"3px"}} className="d-flex justify-content-evenly">
              <b className="day-quantity-label">Quantity</b>
            <Button
              variant="light"
              className="day-minus-plus-btn"
              onClick={removeQuantity}
            >
              -
            </Button>
            <TextField
              className={classes.quantityField}
              value={quantityValue}
              style={{
                borderWidth: "0",
                background: "white",
              }}
              InputProps={{
                readOnly: true,
              }}
              size="small"
            />
            <Button
              variant="light"
              className="day-minus-plus-btn"
              onClick={addQuantity}
            >
              +
            </Button>
            </div>
          </Col>
          <Col
            className="col1 center-div"
            lg="3"
            style={{ marginTop: "10px", marginLeft:"auto" }}
          >
            <div
              className=""
              style={{
                fontSize: "x-large",
                fontWeight: "700",
                marginTop: "5px",
                textAlign: "center", 
              }}
            >
              Price:&nbsp;{(quantityValue * ( itemPrice + orderExtra.reduce((acc, item) => acc + item.extraItemQuantity*item.extraItemPrice, 0) ) ).toFixed(2)}€
            </div>
          </Col>
          <Col
            className="col1 center-div margin-top-col"
            lg="4"
            md="12"
            xs="12"
            style={{marginLeft:"auto"}}
          >
            <button
              className="day-btn-add-to-cart-modal"
              onClick={addItemToCart}
              disabled={props.enabledButton}
              style={props.enabledButton ? {opacity:'40%'} : {}}
            >
              Add to Cart
            </button>
          </Col>
        </Row>
      </Container>
    </Modal>
    </>);
};

export default DayItemDetails;
