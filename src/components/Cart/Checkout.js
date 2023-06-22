import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCookie,updateAddress } from "../store/cart-actions";
import CartItem from "./CartItem";
import { Button, Card } from "react-bootstrap";
import { sendOrder } from "../store/cart-actions";
import { motion } from "framer-motion";
import classes from "./Cart.module.css";
import UserID from "../hooks/userid";
import InputText from "../UI/InputText";
import { notEmpty,validPositiveInteger } from "../Regex/Regex";
import useInput from "../hooks/use-input";
import { postalCodes, cities } from "../Login/postalCodes";
import InputSelect from "../UI/InputSelect";
import { useNavigate } from "react-router";
import { cartActions } from "../store/cart-slice";
import MoneyIcon from '@mui/icons-material/Money';
import Modal from "../UI/Modal/Modal";
import '../mui-grid.css'
let firstTime = false;

const Checkout = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const lastItemOut = useSelector((state) => state.cart.changed);
  const guestAddress = useSelector((state)=>state.cart.address);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyCart, setShowEmptyCart] = useState(false);
  const [showMoreAddress, setShowMoreAddress] = useState(false);
  const { userID } = useContext(UserID);
  const nav = useNavigate();
  const isNotEmpty = (value) => notEmpty.test(value); // isnot empty check using regex
  const isInteger = (value) => validPositiveInteger.test(value); // is integer check using regex

  useEffect(() => {
    document.body.style.backgroundColor = "#e5e5e0";
  }, []);

  useEffect(() => {
    if (userID) {

      if(guestAddress.length === 0){
      async function fetchAddress() {
        const request = {
          method: "POST",
          credentials: "include",
          mode: "cors",
        };

        const res = await fetch("/api/customer/getaddress", request);

        if (!res.ok) {
          throw new Error("Could not fetch extra menu items");
        }

        const data = await res.json();
        resetHouseNumber(data[0].houseNumber);
        resetStreetName(data[0].streetName);
        resetCity(data[0].city);
        resetPostalCode(data[0].postalCode);
        resetArea(data[0].area);
        resetPhoneNumber(data[0].phoneNumber);
        resetBuildingName(data[0].buildingName);
        resetFlatNumber(data[0].flatNumber);
        resetSpecialInstruction(data[0].specialInstructions);
      }
      fetchAddress();
    }
    else if(guestAddress.length>0)
    {
      resetHouseNumber(guestAddress[0].houseNumber);
      resetStreetName(guestAddress[0].streetName);
      resetCity(guestAddress[0].city);
      resetPostalCode(guestAddress[0].postalCode);
      resetArea(guestAddress[0].area);
      resetPhoneNumber(guestAddress[0].phoneNumber);
      resetBuildingName(guestAddress[0].buildingName);
      resetFlatNumber(guestAddress[0].flatNumber);
      resetSpecialInstruction(guestAddress[0].specialInstructions);
    }
    }


    if(!userID){
        if(guestAddress.length > 0){
            resetHouseNumber(guestAddress[0].houseNumber);
            resetStreetName(guestAddress[0].streetName);
            resetCity(guestAddress[0].city);
            resetPostalCode(guestAddress[0].postalCode);
            resetArea(guestAddress[0].area);
            resetPhoneNumber(guestAddress[0].phoneNumber);
            resetBuildingName(guestAddress[0].buildingName);
            resetFlatNumber(guestAddress[0].flatNumber);
            resetSpecialInstruction(guestAddress[0].specialInstructions);
        }
        if(guestAddress.length === 0){
          const getAddress = Cookies.get("address");
          const addressJSONForm = JSON.parse(getAddress);
          resetHouseNumber(addressJSONForm.houseNumber);
          resetStreetName(addressJSONForm.streetName);
          resetCity(addressJSONForm.city);
          resetPostalCode(addressJSONForm.postalCode);
          resetArea(addressJSONForm.area);
          resetPhoneNumber(addressJSONForm.phoneNumber);
          resetBuildingName(addressJSONForm.buildingName);
          resetFlatNumber(addressJSONForm.flatNumber);
          resetSpecialInstruction(addressJSONForm.specialInstructions);
        }
    }


  }, [userID,guestAddress]);

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCode,
  } = useInput(isNotEmpty);

  const {
    value: houseNumberValue,
    isValid: houseNumberIsValid,
    hasError: houseNumberHasError,
    valueChangeHandler: houseNumberChangeHandler,
    inputBlurHandler: houseNumberBlurHandler,
    reset: resetHouseNumber,
  } = useInput(isInteger,"");

  const {
    value: streetNameValue,
    isValid: streetNameIsValid,
    hasError: streetNameHasError,
    valueChangeHandler: streetNameChangeHandler,
    inputBlurHandler: streetNameBlurHandler,
    reset: resetStreetName,
  } = useInput(isNotEmpty,"");

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  const {
    value: areaValue,
    isValid: areaIsValid,
    hasError: areaHasError,
    valueChangeHandler: areaChangeHandler,
    inputBlurHandler: areaBlurHandler,
    reset: resetArea,
  } = useInput(isNotEmpty,"");

  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(isInteger,"");

  const {
    value: buildingNameValue,
    isValid: buildingNameIsValid,
    hasError: buildingNameHasError,
    valueChangeHandler: buildingNameChangeHandler,
    inputBlurHandler: buildingNameBlurHandler,
    reset: resetBuildingName,
  } = useInput(isNotEmpty, "");

  const {
    value: flatNumberValue,
    isValid: flatNumberIsValid,
    hasError: flatNumberHasError,
    valueChangeHandler: flatNumberChangeHandler,
    inputBlurHandler: flatNumberBlurHandler,
    reset: resetFlatNumber,
  } = useInput(isNotEmpty, "");

  const {
    value: specialInstructionsValue,
    isValid: specialInstructionsIsValid,
    hasError: specialInstructionsHasError,
    valueChangeHandler: specialInstructionsChangeHandler,
    inputBlurHandler: specialInstructionsBlurHandler,
    reset: resetSpecialInstruction,
  } = useInput(isNotEmpty, "");

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

  let formIsValid = false;
  let orderButtonIsValid = false;
  if (
    houseNumberIsValid &&
    streetNameIsValid &&
    cityIsValid &&
    postalCodeIsValid &&
    areaIsValid &&
    phoneNumberIsValid /* &&
    buildingNameIsValid &&
    flatNumberIsValid &&
    specialInstructionsIsValid */
  )
    formIsValid = true;

  const orderHandler = async () => {
    const addressInformation = {
      houseNumber: houseNumberValue,
      streetName: streetNameValue,
      city: cityValue,
      postalCode: postalCodeValue,
      area: areaValue,
      phoneNumber: phoneNumberValue,
      buildingName: buildingNameValue,
      flatNumber: flatNumberValue,
      specialInstructions: specialInstructionsValue,
    };

    const objectForOrder = {
      user: userID,
      cartItems: cartItems,
      totalPrice: totalPrice,
      address: addressInformation,
    };

    const blankObject = {
      items: [],
      totalQuantity: 0,
    };   

    try {
      const result = await dispatch(sendOrder(objectForOrder));
      if (result.success) {
        dispatch(updateCookie([]));
        dispatch(cartActions.replaceCart(blankObject));
        nav("/confirmation",{ state: { orderID: result.insertID } });
      }
    } catch (error) {
      console.log(error);
    } 
  };

  const addressHandler = ()=>{
    setShowMoreAddress(false);


    const address = {
      houseNumber: houseNumberValue,
      streetName: streetNameValue,
      city: cityValue,
      postalCode: postalCodeValue,
      area: areaValue,
      phoneNumber: phoneNumberValue,
      buildingName: buildingNameValue,
      flatNumber: flatNumberValue,
      specialInstructions: specialInstructionsValue,
    };

    console.log(address);


    dispatch(cartActions.addAddress(address));
    dispatch(updateAddress(address));
    Cookies.set("address",JSON.stringify(address),{expires:1});
  }

  return (
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
          <div className="row" style={{width:"80%",margin:"auto"}}>
            <div
              className="col-md-5 col-12"
              style={{ borderRight: "1px solid gray", textAlign: "center",padding:"0 2rem 0 2rem" }}
            >
              <h3 style={{ marginBottom: "2rem" }}>Customer information</h3>

              {!showMoreAddress && (<Card>
                <Card.Body >
                  <div style={{textAlign:"left",margin:"auto"}}>
                    <h5>Address Information</h5>
                  {houseNumberValue} {streetNameValue},<br/> 
                   {areaValue}, <br/>
                   {cityValue},{postalCodeValue} <br/>
                   Phone Number : {phoneNumberValue}<br/>
                  <Button onClick={()=>{setShowMoreAddress(true)}}>Change address Information</Button>
                  </div>
                  <div
                      style={{
                        borderBottom:"1px solid lightgrey",
                        width: "80%" ,
                        margin: "auto",
                        paddingTop:"1rem"
                      }}
                    />
                  <div style={{marginTop:"1rem",textAlign:"left"}}>
                   <h5>Billing Information</h5>
                   Choose a payment method <br/>
                   <Button  variant="outline-dark"><MoneyIcon/> Cash</Button>
                  </div>
                </Card.Body>
              </Card>)}
              {showMoreAddress && (
              <div>
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "30%",
                        textAlign: "left",
                      }}
                    >
                      <InputText
                      margin="normal"
                        label="House Number"
                        type="text"
                        value={houseNumberValue}
                        onChange={houseNumberChangeHandler}
                        onBlur={houseNumberBlurHandler}
                        hasError={houseNumberHasError}
                        resize="80%"
                        style={{ backgroundColor: "black" }}
                      />
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "70%",
                        textAlign: "right",
                      }}
                    >
                      <InputText
                      margin="normal"
                        label="Street Name"
                        type="text"
                        value={streetNameValue}
                        onChange={streetNameChangeHandler}
                        onBlur={streetNameBlurHandler}
                        hasError={streetNameHasError}
                        resize="100%"
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <InputSelect
                        enableResizing={true}
                        label="City"
                        type="text"
                        value={cityValue}
                        onChange={cityChangeHandler}
                        onBlur={cityBlurHandler}
                        hasError={cityHasError}
                        resize="100%"
                        selection={cities.map((data) => {
                          return {
                            label: data,
                            value: data,
                          };
                        })}
                      />
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "right",
                      }}
                    >
                      <InputSelect
                        
                        enableResizing={true}
                        label="Postal Code"
                        selection={postalCodes.map((data) => {
                          return {
                            label: data,
                            value: data,
                          };
                        })}
                        value={postalCodeValue}
                        onChange={postalCodeChangeHandler}
                        onBlur={postalCodeBlurHandler}
                        resize="80%"
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <InputText
                        margin="normal"
                        label="Area"
                        type="text"
                        value={areaValue}
                        onChange={areaChangeHandler}
                        onBlur={areaBlurHandler}
                        hasError={areaHasError}
                        resize="100%"
                      />
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "right",
                      }}
                    >
                      <InputText
                        margin="normal"
                        label="Phone number"
                        type="text"
                        value={phoneNumberValue}
                        onChange={phoneNumberChangeHandler}
                        onBlur={phoneNumberBlurHandler}
                        hasError={phoneNumberHasError}
                        resize="80%"
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <InputText
                        margin="normal"
                        label="Building Name"
                        type="text"
                        value={buildingNameValue}
                        onChange={buildingNameChangeHandler}
                        onBlur={buildingNameBlurHandler}
                        //hasError={buildingNameHasError}
                        resize="100%"
                      />
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "right",
                      }}
                    >
                      <InputText
                        margin="normal"
                        label="Flat Number"
                        type="text"
                        value={flatNumberValue}
                        onChange={flatNumberChangeHandler}
                        onBlur={flatNumberBlurHandler}
                        //hasError={flatNumberHasError}
                        resize="80%"
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        textAlign: "left",
                        width:"100%"
                      }}
                    >
                      <InputText
                        margin="normal"
                        label="Special Instructions"
                        type="text"
                        value={specialInstructionsValue}
                        onChange={specialInstructionsChangeHandler}
                        onBlur={specialInstructionsBlurHandler}
                        //hasError={specialInstructionsHasError}
                        multiline
                        minRows={3}
                        resize="100%"
                      />
                    </div>
                    <Button onClick={addressHandler} style={{float:"right"}}>Save Address Information</Button>
                  </div>
                 </div>)}
            </div>
            <div
              className="col-md-7 col-12"
              style={{
                height: "600px",
                paddingLeft:"2rem",
                overflowY: "scroll",
                scrollbarWidth: "thin",
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
            </div>
            <div>
                <span style={{ color: "black", fontSize: "1.5rem",float:"right",marginTop:"1rem"}}>
                  Total price is {totalPrice.toFixed(2)}€
                <Button
                 
                  style={{ marginLeft: "10px", marginBottom: "20px",backgroundColor:"#0C777F",borderColor:"#0C777F" }}
                  onClick={orderHandler}
                  disabled={!(formIsValid === true && showMoreAddress === false)}
                  >
                  Order
                </Button>
                </span>
              </div>
          </div>
        </div>
      )}
      {!isLoading && showEmptyCart && (
        <Card className={classes.emptyCart}>
          <h1 style={{ padding: "0.5cm" }}>Your cart is empty</h1>
        </Card>
      )}
    </motion.div>
  );
};
export default Checkout;
