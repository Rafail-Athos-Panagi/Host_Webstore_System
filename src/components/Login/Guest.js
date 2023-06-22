import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { notEmpty,validPositiveInteger,validPositiveIntegerAllowedEmpty,validPhoneNumber } from "../Regex/Regex";
import Logo from "../../assets/img/Logo.webp";
import "../mui-grid.css";
import "./login.css";
import { postalCodes,cities } from "./postalCodes";
import { useState } from "react";
import InputSelect from "../UI/InputSelect";
import InputText from "../UI/InputText";
import useInput from "../hooks/use-input";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import Cookies from "js-cookie";


const theme = createTheme();

export default function Guest(props) {


  // Regex
  const isNotEmpty = (value) => notEmpty.test(value); // isnot empty check using regex
  const isInteger = (value) => validPositiveInteger.test(value); // is integer check using regex
  const isIntegerAllowedEmpty = (value) => validPositiveIntegerAllowedEmpty.test(value); // is integer check using regex
  const isPhoneNumber = (value) => validPhoneNumber.test(value); // is integer check using regex

  // Redux
  const dispatch = useDispatch();

  // State
  const [checked,setChecked] = useState(false);  // this is used for the checkbox to add or remove items from the extra items array



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
      },
    },
  };

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
  } = useInput(isPhoneNumber,"");

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
  } = useInput(isIntegerAllowedEmpty, "");

  const {
    value: specialInstructionsValue,
    isValid: specialInstructionsIsValid,
    hasError: specialInstructionsHasError,
    valueChangeHandler: specialInstructionsChangeHandler,
    inputBlurHandler: specialInstructionsBlurHandler,
    reset: resetSpecialInstruction,
  } = useInput(isNotEmpty, "");

  let formIsValid = false;
  if (
    houseNumberIsValid &&
    streetNameIsValid &&
    cityIsValid &&
    postalCodeIsValid &&
    areaIsValid &&
    phoneNumberIsValid &&
    checked/* &&
    buildingNameIsValid &&
    flatNumberIsValid &&
    specialInstructionsIsValid */
  )
    formIsValid = true;

    const addressSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

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

    dispatch(cartActions.addAddress(address));
    Cookies.set("address",JSON.stringify(address),{expires:1});
    
    props.onClose();
  };

  const TOCButton = (e) =>{
    setChecked(e.target.checked);
  }


  return (
    // <Modal onClose={props.onClose}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "white", width: 100, height: 100 }}>
            {/* <LockOutlinedIcon /> */}
            <img src={Logo} alt="img" className="image-of-logo" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Order As Guest
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
                <form onSubmit={addressSubmitHandler}>
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
                        size="small"
                        label="House Number"
                        type="text"
                        value={houseNumberValue}
                        onChange={houseNumberChangeHandler}
                        onBlur={houseNumberBlurHandler}
                        hasError={houseNumberHasError}
                        resize="80%"
                        style={{ backgroundColor: "black" }}
                        placeholder={" 2"}
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
                        size="small"
                        label="Street Name"
                        type="text"
                        value={streetNameValue}
                        onChange={streetNameChangeHandler}
                        onBlur={streetNameBlurHandler}
                        hasError={streetNameHasError}
                        resize="100%"
                        placeholder={" Athenon"}
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

                        size="small"
                        enableResizing={true}
                        label="City"
                        selection={cities.map((data) => {
                          return {
                            label: data,
                            value: data,
                          };
                        })}
                        value={cityValue}
                        onChange={cityChangeHandler}
                        onBlur={cityBlurHandler}
                        resize="80%"
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
                        size="small"
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
                        size="small"
                        label="Area"
                        type="text"
                        value={areaValue}
                        onChange={areaChangeHandler}
                        onBlur={areaBlurHandler}
                        hasError={areaHasError}
                        resize="100%"
                        placeholder={" Skala"}
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
                        size="small"
                        label="Phone number"
                        type="text"
                        value={phoneNumberValue}
                        onChange={phoneNumberChangeHandler}
                        onBlur={phoneNumberBlurHandler}
                        hasError={phoneNumberHasError}
                        resize="80%"
                        placeholder={" 99887766"}
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
                        size="small"
                        label="Building Name"
                        type="text"
                        value={buildingNameValue}
                        onChange={buildingNameChangeHandler}
                        onBlur={buildingNameBlurHandler}
                        resize="100%"
                        placeholder={" South beach gardens"}
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
                        size="small"
                        label="Flat Number"
                        type="text"
                        value={flatNumberValue}
                        onChange={flatNumberChangeHandler}
                        onBlur={flatNumberBlurHandler}
                        hasError={flatNumberHasError}
                        resize="80%"
                        placeholder={" 1"}
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
                        size="small"
                        label="Special Instructions"
                        type="text"
                        value={specialInstructionsValue}
                        onChange={specialInstructionsChangeHandler}
                        onBlur={specialInstructionsBlurHandler}
                        multiline
                        minRows={3}
                        resize="100%"
                      />
                    </div>
                  </div>
                </form>
            <Box sx={{ mt: 1, textAlign: "center" }} className="box1">
              <FormControlLabel
                control={<Checkbox value={checked} onChange={(e)=>TOCButton(e)} color="primary" />}
                label="I have read and I agreed to the"
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
              onClick={addressSubmitHandler}
              disabled={!formIsValid}
            >
             Save address information
            </Button>

            <Grid container sx={{ mt: 2 }}>
              <Grid className="col1" item xs>
                {/* <Link>Continue as guest</Link> */}
              </Grid>
              <Grid className="col1" item xs="10">
                <Link
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
    </ThemeProvider>
    // </Modal>
  );
}

//   const onSubmit =(data)=>{
//     console.log(data);
//   }

//   return (<div
//   style={{
//     margin: "auto",
//     background: "lightgray",
//     width: "fit-content",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: "20px",
//     marginTop:"20px"
//   }}
// >
// <form >
// <div style={{display:"flex"}}>
//   <div className="div-form-container">

//         <div className="form-group">
//           <label>Name</label>
//           <input type="text" className="form-control" id="signUpName" ></input>
//           <p/>
//           <label>Street name</label>
//           <input type="text" className="form-control" id="signUpAddress" ></input>
//           <p/>
//           <label>Postal code</label>
//           <input type="text" className="form-control" id="signUpAddress" ></input>
//           <p/>
//           <label htmlFor="emailtype">Password: </label>
//           <input type="password" className="form-control" id="password" />
//           <p />
//         </div>
//     </div>
//     <div className="div-form-container">
//         <div className="form-group">
//           <label>Surname</label>
//           <input type="text" className="form-control" id="signUpSurname"  />
//           <p/>
//           <label>City</label>
//           <input type="text" className="form-control" id="signUpAddress"  />
//           <p />
//           <label htmlFor="contactemail">Your Email Address: </label>
//           <input
//             type="email"
//             className="form-control"
//             id="contactemail"
//             placeholder="name@example.com"
//           />
//           <p />
//           <label >Confirm Password:</label>
//           <input type="password" className="form-control" id="confirmPassword"/>
//         </div>

//     </div>
//   </div>
//   <div style={{margin:"auto",textAlign:"center"}}>
//   <a href = "/login"> If you already have an account,login here</a>
//     <p/>
//     <input type="submit" value="Sign up">
//     </input>
//   </div>
//   </form>
// </div>);
// }
