import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DayItemDetails from "../ItemDetails/DayItemDetails";
import "./DayProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { updateCookie } from "../../../store/cart-actions";
import { useEffect, useState } from "react";
import UserID from "../../../hooks/userid";
import Login from "../../../Login/Login";
import Cookies from "js-cookie";

const DayMenuProductCard = (props) => {
  const dispatch = useDispatch();
  const { itemID, itemName, itemImage, itemPrice, itemIngredients } = props.item; // this takes as props the menu items
  const cartItems = useSelector((state) => state.cart.items);
  const address = useSelector((state)=>state.cart.address);
  const [showlogin, setShowLogin] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const { userID } = useContext(UserID);

  console.log(props.enabledButton);
  // this use effect triggers whenever items are added to the cart so it can update the cookie accordingly
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

  // add to cart handler for if the user clicked the add to cart button while on the menu page
  // add to cart handler for if the user clicked the add to cart button while on the menu page
  const addToCartHandler = () => {

    if(!userID){
      if(Cookies.get('address') === undefined){
        console.log("NO user i wont add userrrr");
        setShowLogin(true);
        return;
      }
    }

    const cartItemInfo = {
      id: itemID,
      image: itemImage,
      title: itemName,
      price: itemPrice, // quantity will be discussed later dld if we want the user to be able to add multiple from the menu page
      ingredients: itemIngredients,
      comment:""
    };

    const objectForCart = {
      newItem: cartItemInfo,
      extraIngredients: [],
    };

    dispatch(cartActions.addToCart(objectForCart));
  };

  //dont know what this is
  useEffect(() => {
    document.body.style.backgroundColor = "#e5e5e0";
  }, []);

  return (
    <>
    {showlogin && (
        <Login
          onClose={() => {
            setShowLogin(false);
          }}
        />
      )}
      <Card
        className="day-card-item"
        style={{ width: "18rem", borderWidth: "0.5px", borderColor: "#1d1d1d" }}
      >
        <Card.Img
          className="day-card-image"
          variant="top"
          src={"./uploads/menu/" + itemImage}
          onClick={() => {
            setShowItemModal(true);
          }}
        />
        <Card.Body>
          <Card.Title className="day-card-title" style={{ fontSize: "x-large",marginBottom:"10px" }}>
            {itemName}
          </Card.Title>
          <Card.Text>
            {showItemModal && (
              <DayItemDetails
                id={itemID}
                onClose={() => {
                  setShowItemModal(false);
                }}
                enabledButton={props.enabledButton}
              />
            )}
            <span className="day-card-price" style={{ fontSize: "x-large" }}>
              €{itemPrice.toFixed(2)}
            </span>
          </Card.Text>
          <button className="day-btn-add-to-cart"  style={props.enabledButton ? {opacity:'40%'} : {}} onClick={addToCartHandler} disabled={props.enabledButton}
           >
            Add to Cart
          </button>
          <hr />
          <label className="day-label-learn-more" onClick={() => {
            setShowItemModal(true);
          }}>Learn More</label>       
           </Card.Body>
      </Card>
    </>
  );
};

export default DayMenuProductCard;

/*<Card className="dark-mode-card resize-card-item-width" ></Card>
</Card>*/
