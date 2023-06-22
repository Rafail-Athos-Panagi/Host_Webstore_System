import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NightItemDetails from "../ItemDetails/NightItemDetails";
import "./NightProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { updateCookie } from "../../../store/cart-actions";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "../../../Login/Login";
import UserID from "../../../hooks/userid";

const NightMenuProductCard = (props) => {
  const dispatch = useDispatch();
  const { itemID, itemName, itemImage, itemPrice, itemIngredients } =
    props.item; // this takes as props the menu items
  const cartItems = useSelector((state) => state.cart.items);
  const address = useSelector((state) => state.cart.address);
  const [showlogin, setShowLogin] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const { userID } = useContext(UserID);

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
  const addToCartHandler = () => {

    if(!userID){
      if(Cookies.get('address') === undefined){
        setShowLogin(true);
        return;
      }
    }

    console.log(Cookies.get('address'));

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
    document.body.style.backgroundColor = "#";
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
        className="night-card-item"
        style={{ width: "18rem", borderWidth: "0.5px", borderColor: "#1d1d1d" }}
      >
        <Card.Img
          className="night-card-image"
          variant="top"
          src={"/uploads/menu/" + itemImage}
          onClick={() => {
            setShowItemModal(true);
          }}
        />
        <Card.Body>
          <Card.Title className="night-card-title" style={{ fontSize: "x-large",marginBottom:"10px" }}>
            {itemName}
          </Card.Title>
          <Card.Text>
            {showItemModal && (
              <NightItemDetails
                id={itemID}
                onClose={() => {
                  setShowItemModal(false);
                }}
                enabledButton={props.enabledButton}
              />
            )}
            <span className="night-card-price" style={{ fontSize: "x-large" }}>
              €{itemPrice.toFixed(2)}
            </span>
          </Card.Text>
          <button className="night-btn-add-to-cart" style={props.enabledButton ? {opacity:'40%'} : {}} onClick={addToCartHandler} disabled={props.enabledButton}
           >
            Add to Cart
          </button>
          <hr />
          <label className="night-label-learn-more" onClick={() => {
            setShowItemModal(true);
          }}>Learn More</label>
        </Card.Body>
      </Card>
    </>
  );
};

export default NightMenuProductCard;
