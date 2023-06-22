import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCookie } from "../store/cart-actions";
import CartItem from "./CartItem";
import { Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import classes from "./Cart.module.css";
import UserID from "../hooks/userid";
import { useNavigate } from "react-router";
import Modal from "../UI/Modal/Modal";
import '../mui-grid.css'
let firstTime = false;

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const lastItemOut = useSelector((state) => state.cart.changed);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyCart, setShowEmptyCart] = useState(false);
  const [enableOrder, setShowEnableOrder] = useState(false);
  const { userID } = useContext(UserID);
  const nav = useNavigate();
  
  //this use effect  checks if there is something in the cookie but the cart is empty then it should update the cookie to an empty array
  useEffect(() => {
    const test = Cookies.get("cart");
    if (test) {
      if (test.length > 0 && lastItemOut) {
        dispatch(updateCookie([]));
      }
    }
  }, [dispatch, lastItemOut]);

  useEffect(() => {
    if (cartItems.length !== 0) setIsLoading(true);

    if (cartItems.length === 0 && firstTime) {
      setIsLoading(false);
      setShowEmptyCart(true);
    }

    const timeout = setTimeout(() => {
      setShowEmptyCart(true);
      firstTime = true;
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [cartItems.length]);

  const orderHandler = async () => {

    props.onClose();
    nav("/checkout");
    /* try {
      const result = await dispatch(sendOrder(objectForOrder));
      console.log(result.success);
      if (result.success) {
        console.log("cart line 243");
        dispatch(updateCookie([]));
        dispatch(cartActions.replaceCart(blankObject));
        nav("/checkout");
      }
    } catch (error) {
      console.log(error);
    }  */
  }; 

  return (
    <Modal onClose={props.onClose} styleOfTheModal={"cart-modal"} modalContent={'cart-modal-content'}>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      {!isLoading && !showEmptyCart && (
        <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</h1>
      )}
      {isLoading && cartItems.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{textAlign:"center"}}>Your cart</h3>
          <div className="row" >
            <div
              className="col-12"
              style={{
                height: "100%",
                paddingLeft:"2rem",
                overflowY: "scroll",
                scrollbarWidth: "thin",
                width:"100%",
              }}
            >
              {cartItems.map((cartItemMap) => (
                <CartItem
                  key={cartItemMap.id}
                  item={{
                    id: cartItemMap.id,
                    image: cartItemMap.image,
                    ingredients: cartItemMap.ingredients,
                    title: cartItemMap.title,
                    quantity: cartItemMap.quantity,
                    price: cartItemMap.price,
                    extraItems: cartItemMap.extraItems,
                  }}
                />
              ))}
              <div>
                <span style={{ color: "black", fontSize: "1.5rem",float:"right",marginTop:"1rem"}}>
                  Total price is {totalPrice.toFixed(2)}€
                  <br/>
                <Button
                  variant="success"
                  style={{ marginLeft: "10px", marginBottom: "20px",float:"right" }}
                  onClick={orderHandler}
                >
                  Checkout
                </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && showEmptyCart && (
        <div className={classes.emptyCart}>
          <div style={{textAlign:"center"}}>
            <h1 style={{ padding: "0.5cm" }}>Your cart is empty</h1>
          </div>
        </div>
      )}
      </motion.div>
      </Modal>
  );
};
export default Cart;
