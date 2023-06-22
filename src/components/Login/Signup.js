import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import useInput from "../hooks/use-input";
import { notEmpty, validEmail, validPhoneNumber } from "../Regex/Regex";
import InputText from "../UI/InputText";
import Logo from "../../assets/img/Logo.webp";
import InputSelect from "../UI/InputSelect";
import "../mui-grid.css";
import "./login.css";
import { postalCodes } from "./postalCodes";
import { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from '@mui/icons-material/Info';
import Swal from "sweetalert2";



export default function Signup(props) {
  const isNotEmpty = (value) => notEmpty.test(value); // isnot empty check using regex
  const isValidEmail = (value) => validEmail.test(value); // isnot empty check using regex
  const isValidPhoneNumber = (value) => validPhoneNumber.test(value); // isnot empty check using regex
  const [isRegistered, setIsRegistered] = useState(false);
  const [codeTimer, setCodeTimer] = useState(0);
  const [code, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState("");
  const [tac, setTac] = useState(false);

  


  React.useEffect(() => {
    if (codeTimer > 0) {
      setTimeout(() => setCodeTimer(codeTimer - 1), 1000);
    }
  }, [codeTimer]);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: surnameValue,
    isValid: surnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: streetNameValue,
    isValid: streetNameIsValid,
    hasError: streetNameHasError,
    valueChangeHandler: streetNameValueChangeHandler,
    inputBlurHandler: streetNameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: streetNumberValue,
    isValid: streetNumberIsValid,
    hasError: streetNumberHasError,
    valueChangeHandler: streetNumberChangeHandler,
    inputBlurHandler: streetNumberBlurHandler,
  } = useInput(isNotEmpty);

  /* const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty); */

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: areaValue,
    isValid: areaIsValid,
    hasError: areaHasError,
    valueChangeHandler: areaChangeHandler,
    inputBlurHandler: areaBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: buildingNameValue,
    isValid: buildingNameIsValid,
    hasError: buildingNameHasError,
    valueChangeHandler: buildingNameChangeHandler,
    inputBlurHandler: buildingNameBlurHandler,
  } = useInput(isNotEmpty, "");

  const {
    value: flatNumberValue,
    isValid: flatNumberIsValid,
    hasError: flatNumberHasError,
    valueChangeHandler: flatNumberChangeHandler,
    inputBlurHandler: flatNumberBlurHandler,
  } = useInput(isNotEmpty, "");

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isValidEmail);

  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
  } = useInput(isValidPhoneNumber);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: specialInstructionsValue,
    isValid: specialInstructionsIsValid,
    hasError: specialInstructionsHasError,
    valueChangeHandler: specialInstructionsChangeHandler,
    inputBlurHandler: specialInstructionsBlurHandler,
  } = useInput(isNotEmpty, "");

  let formIsValid = false;
  let passwordsAreTheSame = false;

  if (passwordValue === confirmPasswordValue)
    passwordsAreTheSame = true;

  if (
    nameIsValid &&
    surnameIsValid &&
    emailIsValid &&
    phoneNumberIsValid &&
    streetNumberIsValid &&
    streetNameIsValid &&
    postalCodeIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    tac
  ) {
    formIsValid = true;
  }


  const handleValidation = (event) => {
    if (typeof event === "object") 
      event.preventDefault();

      if (typeof passwordValue === "undefined" || passwordValue === null) {
        Swal.fire({
          title: "Error!",
          text: "Password is required",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }
  
      if(passwordValue !== confirmPasswordValue){
        Swal.fire({
          title: "Error!",
          text: "Passwords do not match",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }
  
      if(passwordValue.length < 8) {
        Swal.fire({
          title: "Error!",
          text: "Password must be at least 8 characters long",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }

    // Send email request to server
    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      
      
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailValue })
    };
    fetch("/api/auth/confirmemail", options).then((res) => {
      if(res.status !== 202)
        Swal.fire({
          title: "Error!",
          text: "Email already exists",
          icon: "error",
          confirmButtonText: "Ok"
        });
      if(res.status === 202)
        setIsRegistered(true);
    });
  };

  const resendCode = () => {
    if(codeTimer !== 0){
      return;
    }
    else handleValidation();
  }

  const handleSubmit = () => {
    if(!formIsValid)
      return;

    

    try {
      const options = {
        method: "POST",
        credentials: "include",
        mode: "cors",
        
        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue, password: passwordValue, firstName: nameValue, lastName: surnameValue,
          city: "Larnaca", area: areaValue, street: streetNameValue, streetNumber: streetNumberValue, postal: postalCodeValue,
          phone: phoneNumberValue, code: code, buildingName: buildingNameValue, flatNumber: flatNumberValue, specialInstructions: specialInstructionsValue
        })
      };

      fetch('/api/auth/registration', options).then(res => {    
          if(res.status === 504){
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again later.",
              icon: "error",
              confirmButtonText: "Ok"
            })
          }   
          if(res.status === 200)
            Swal.fire({
              title: "Success!",
              text: "You have successfully registered! Please sign in with your account details.",
              icon: "success",
              confirmButtonText: "Ok"
            });
            props.changeToLogin();      
      });

    } catch (error) {

    }
  };

  const checkThing = (event) => {
    setTac(event.target.checked);
  };

  return (
    <div className="d-flex">
      {!isRegistered && <><div style={{ opacity: 0.2, position: "absolute" }}></div>
        <Container maxWidth="sm" sx={{ opacity: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "1rem"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "white", width: 100, height: 100 }}>
                <img src={Logo} alt="img" className="image-of-logo" />
              </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleValidation}
              noValidate
              sx={{ mt: 1, '& .MuiTextField-root': { m: 1 } }}
            >
              <div style={{textAlign:"center"}}>
                <InputText
                  size="small"
                  label="Name"
                  type="text"
                  value={nameValue}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  hasError={nameHasError}
                  placeholder={"John"}
                />
                <InputText
                  size="small"
                  label="Surname"
                  type="text"
                  value={surnameValue}
                  onChange={surnameChangeHandler}
                  onBlur={surnameBlurHandler}
                  hasError={surnameHasError}
                  placeholder={"Doe"}
                />
                <InputText
                  size="small"
                  errorMessage='Password must be 8 or more characters'
                  label="Password"
                  type="password"
                  value={passwordValue}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  hasError={passwordHasError}
                  maxCharacters={16}
                  placeholder={"Password"}
                />
                <InputText
                  size="small"
                  errorMessage='Please confirm your password'
                  label="Confirm Password"
                  type="password"
                  value={confirmPasswordValue}
                  onChange={confirmPasswordChangeHandler}
                  onBlur={confirmPasswordBlurHandler}
                  hasError={confirmPasswordHasError && "Passwords do not match"}
                  maxCharacters={16}
                  placeholder={"Confirm password"}
                />
                <InputText
                  size="small"
                  label="Email"
                  type="email"
                  value={emailValue}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  hasError={emailHasError}
                  placeholder={"example@email.com"}
                />
                <InputText
                  size="small"
                  label="Phone Number"
                  type="number"
                  value={phoneNumberValue}
                  onChange={phoneNumberChangeHandler}
                  onBlur={phoneNumberBlurHandler}
                  hasError={phoneNumberHasError}
                  placeholder={"99887766"}
                />
                <InputText
                  size="small"
                  label="Street Number"
                  type="number"
                  value={streetNumberValue}
                  onChange={streetNumberChangeHandler}
                  onBlur={streetNumberBlurHandler}
                  hasError={streetNumberHasError}
                  placeholder={"79"}
                />
                <InputText
                  size="small"
                  label="Street Name"
                  type="text"
                  value={streetNameValue}
                  onChange={streetNameValueChangeHandler}
                  onBlur={streetNameBlurHandler}
                  hasError={streetNameHasError}
                  placeholder={"Athenon"}
                />
               
                  <InputSelect
                  enableResizing={false}
                  size="small"
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
                />            
                <InputText
                  size="small"
                  label="City"
                  type="text"
                  value="Larnaca"
                  disable
                  endAdornment={<Tooltip title="We only deliver in Larnaca"><InfoIcon /></Tooltip>}
                />
              <InputText
                  size="small"
                  label="Area"
                  type="text"
                  value={areaValue}
                  onChange={areaChangeHandler}
                  onBlur={areaBlurHandler}
                  hasError={areaHasError}
                  placeholder={"Airport"}
                />
                <InputText
                  size="small"
                  label="Building Name"
                  type="text"
                  value={buildingNameValue}
                  onChange={buildingNameChangeHandler}
                  onBlur={buildingNameBlurHandler}
                  required={false}
                  hasError={buildingNameHasError}
                  placeholder={"South beach gardens"}
                /> 
                <InputText
                  size="small"
                  label="Flat Number"
                  type="text"
                  value={flatNumberValue}
                  onChange={flatNumberChangeHandler}
                  onBlur={flatNumberBlurHandler}
                  required={false}
                  hasError={flatNumberHasError}
                  placeholder={"103"}
                /> 
                <InputText
                  size="small"
                  label="Special Instructions"
                  type="text"
                  value={specialInstructionsValue}
                  onChange={specialInstructionsChangeHandler}
                  onBlur={specialInstructionsBlurHandler}
                  multiline
                  required={false}
                  minRows={3}
                  placeholder={"Next to the big red boat"}
                  resize="100%"
                />
              </div>
              <Box sx={{ mt: 1, textAlign: "center" }} className="box1">
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="I have read and I agree to the"
                  onChange={checkThing}
                />
                <Link className="justify-content-center-login">
                  Terms and Conditions
                </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formIsValid}
              >
                Sign Up
              </Button>

              <Grid container sx={{ mt: 2 }}>
                <Grid className="col1" item xs>
                  {/* <Link>Continue as guest</Link> */}
                </Grid>
                <Grid className="col1" item xs="10">
                  <Link sx={{marginBottom:3}}
                    className="justify-content-center-login"
                    onClick={props.changeToLogin}
                  >
                    Login here
                  </Link>
                </Grid>
                <Grid className="col1" item xs></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>}
      {isRegistered && 
        <div className="d-flex flex-column justify-content-evenly align-items-center gap-3 m-5  ">
          <EmailIcon style={{ fontSize: 100 }} />
          <h1>Verify it's you.</h1>
          <span>We sent a verification code to {emailValue}.</span>
          <span>Please check your inbox (or your spam folder) and enter the code below</span>

          <TextField label="Verification Code" variant="outlined" onChange={(e)=>setCode(e.target.value)}/>
          <p style={{color:"red"}}>{codeStatus}</p>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Code</Button>

          <a href="#" onClick={resendCode}>Resend Code</a>
          {codeTimer ? <span>Please wait {codeTimer} seconds before requesting another code.</span> : ""}
        </div>
      }
    </div>
  );
}
