import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "../UI/Modal/Modal";
import Signup from "./Signup";
import ForgotPassword from "../Login/ForgotPassword";
import Guest from "../Login/Guest";
import "../mui-grid.css";
import "./login.css";
import UserID from '../hooks/userid';
import { notEmpty, validEmail } from "../Regex/Regex";
import useInput from "../hooks/use-input";
import Logo from "../../assets/img/Logo.webp";
import Cookies from "js-cookie";
import InputText from "../UI/InputText";




export default function Login(props) {
  const isNotEmpty = (value) => notEmpty.test(value); // isnot empty check using regex
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState("");
  const { setUserID } = useContext(UserID);

  


  const {
    value: usernameValue,
    isValid: userNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserName,
  } = useInput(isNotEmpty);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordValueChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

 

  const handleSubmit = (event) => {
    //setWrongCredentials(false);
    event.preventDefault();

    const email = usernameValue;
    const password = passwordValue;
    if (validEmail.test(email)) {
      // if email has right syntax
      try {
        const options = {
          method: "POST",
          credentials: "include",
          mode: "cors",
          
          
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        };

        fetch('/api/auth', options).then(res => {
          res.json().then(data => {
            if (data.userID) {
              setUserID(data.userID);

             
                const request = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                };
          
                fetch("/api/customer/getaddress", request).then(res=>{
                  res.json().then(data=>{
                    console.log(data);
                    const address = {
                      houseNumber: data[0].houseNumber,
                      streetName:data[0].streetName,
                      city: data[0].city,
                      postalCode: data[0].postalCode,
                      area: data[0].area,
                      phoneNumber: data[0].phoneNumber,
                      buildingName: data[0].buildingName,
                      flatNumber: data[0].flatNumber,
                      specialInstructions: data[0].specialInstructions,
                    };
                    Cookies.set("address",JSON.stringify(address),{expires:1});
                  })
                });
          
            
              props.onClose();
            } else {
              setWrongCredentials("Wrong email/password provided!")
            }
          })
        });

      } catch (error) { }
    }
  };
  

  return (
    <Modal onClose={props.onClose} styleOfTheModal={"modalLogin"} modalContent={'none'}>
      {isLogin && (
        <>
          <Container component="main" minWidth="xl">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "white", width: 100, height: 100 }}>
                <img src={Logo} alt="img" className="image-of-logo" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: "80%" }}
              >

                  <InputText
                  required="required"
                  margin="normal"
                  size="small"
                  label="Email Address"
                  type="email"
                  resize="100%"
                  value={usernameValue}
                  onChange={userNameChangeHandler}
                  onBlur={userNameBlurHandler}
                  hasError={userNameHasError}
                  placeholder={"example@email.com"}
                />
                <br />
                <InputText
                  required="required"
                  margin="normal"
                  size="small"
                  label="Password"
                  type="password"
                  resize="100%"
                  value={passwordValue}
                  onChange={passwordValueChangeHandler}
                  onBlur={passwordBlurHandler}
                  hasError={passwordHasError}
                  maxCharacters={16}
                  placeholder={"Password"}
                />
              
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsLogin(false);
                    setIsForgotPassword(true);
                    setIsGuest(false);
                  }}
                >
                  Forgot password?
                </Link>
                <br />
                <br />
                <p style={{color:"red"}}>
                  {wrongCredentials}
                </p>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  Log In
                </Button>
                <hr />
                <span className="justify-content-center-login">
                  Dont have an account?
                </span>
                <div style={{ textAlign: "center", paddingTop: "10px" }}>
                  <Link sx={{cursor:"pointer"}}
                    onClick={() => {
                      setIsLogin(false);
                      setIsForgotPassword(false);
                      setIsGuest(false);
                    }}
                  >
                    Sign up
                  </Link>
                  <span style={{ padding: "10px" }}>OR</span>
                  <Link sx={{cursor:"pointer"}}
                    onClick={() => {
                      setIsLogin(false);
                      setIsForgotPassword(true);
                      setIsGuest(true);
                    }}
                  >
                    Continue as guest
                  </Link>
                </div>
              </Box>
            </Box>
          </Container>
        </>
      )}

      {!isLogin && !isForgotPassword && !isGuest && (
        <Signup changeToLogin={() => setIsLogin(true)} />
      )}

      {!isLogin && isForgotPassword && !isGuest && (
        <ForgotPassword changeToLogin={() => setIsLogin(true)} />
      )}

      {!isLogin && isForgotPassword && isGuest && (
        <Guest changeToLogin={() => setIsLogin(true)} onClose={props.onClose} />
      )}
    </Modal>
  );
}
