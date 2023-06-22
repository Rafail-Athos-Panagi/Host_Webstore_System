import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import { Box, TextField } from "@mui/material";
import useInput from "../../hooks/use-input";
import { notEmpty } from "../../Regex/Regex";
import classes from "./CreateOffer.module.css";
import InputText from "../../UI/InputText";
import InputSelect from "../../UI/InputSelect";
import { useDispatch } from "react-redux";
import { addMenuItem } from "../../store/menu-actions";
import Manual from "../Manual";
import InputAdornment from "@mui/material/InputAdornment";
import Swal from "sweetalert2";

export default function CreateOffer() {
  const reader = new FileReader();
  const dispatch = useDispatch();
  const isNotEmpty = (value) => notEmpty.test(value); // regex check for is not empty
  const [image, setImage] = useState("default.jpg");
  const [imageName, setImageName] = useState("default.jpg");
  const [imagePreview, setImagePreview] = useState(null);
  const [extraItems, setExtraItems] = useState([]);
  const imageIsValid = useRef(false);
  const itemStatusArray = [["Available", "True"], ["Unavailable", "False"]];
  const timeOfDay = ["Day", "Night"];


  const {
    value: offerNameValue,
    isValid: offerNameIsValid,
    hasError: offerNameHasError,
    valueChangeHandler: offerNameChangeHandler,
    inputBlurHandler: offerNameBlurHandler,
    reset: resetOfferName,
  } = useInput(isNotEmpty);

  const {
    value: offerPriceValue,
    isValid: offerPriceIsValid,
    hasError: offerPriceHasError,
    valueChangeHandler: offerPriceChangeHandler,
    inputBlurHandler: offerPriceBlurHandler,
    reset: resetOfferPrice,
  } = useInput(isNotEmpty);

  const {
    value: offerStatusValue,
    isValid: offerStatusIsValid,
    hasError: offerStatusHasError,
    valueChangeHandler: offerStatusChangeHandler,
    inputBlurHandler: offerStatusBlurHandler,
    reset: resetOrderStatus,
  } = useInput(isNotEmpty);

  const {
    value: offerDescriptionValue,
    isValid: offerDescriptionIsValid,
    hasError: offerDescriptionHasError,
    valueChangeHandler: offerDescriptionChangeHandler,
    inputBlurHandler: offerDescriptionBlurHandler,
    reset: resetOrderDescription,
  } = useInput(isNotEmpty);

  const {
    value: timeOfDayMenuValue,
    isValid: timeOfDayMenuIsValid,
    hasError: timeOfDayHasError,
    valueChangeHandler: timeOfDayValueChangeChandler,
    inputBlurHandler: timeOfDayBlurHandler,
    reset: resetTimeOfDay,
  } = useInput(isNotEmpty);

  const {
    value: allergensValue,
    isValid: allergensIsValid,
    hasError: allergensHasError,
    valueChangeHandler: allergensChangeHandler,
    inputBlurHandler: allergensBlurHandler,
    reset: resetAllergens,
  } = useInput(isNotEmpty);

  const {
    value: extraItemValue,
    isValid: extraItemIsValid,
    hasError: extraItemHasError,
    valueChangeHandler: extraItemValueChangeHandler,
    inputBlurHandler: extraItemBlurHandler,
    reset: resetExtraItem,
  } = useInput(isNotEmpty);

  const {
    value: extraItemPriceValue,
    isValid: extraItemPriceIsValid,
    hasError: extraItemPriceHasError,
    valueChangeHandler: extraItemPriceChangeHandler,
    inputBlurHandler: extraItemPriceBlurHandler,
    reset: resetExtraItemPrice,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  let itemIsValid = false;

  if (offerDescriptionIsValid && offerNameIsValid && offerStatusIsValid && offerPriceIsValid && timeOfDayMenuIsValid && allergensIsValid) formIsValid = true;
  if (extraItemIsValid && extraItemPriceIsValid) {
    itemIsValid = true;
  }
  const offerSubmitHandler = (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Are you sure you want to add this menu item?',
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        const offerBundle = {
          itemName: offerNameValue,
          itemPrice: offerPriceValue,
          itemStatus: offerStatusValue,
          itemCategory: "Offer",
          itemDescription: offerDescriptionValue,
          itemImage: imageName,
          itemIngredients: ""
        }

        const formdata = new FormData();
        formdata.set("image", image);
        formdata.set("table", "menuitems");
        formdata.set(
          "values",
          `(default,"${offerNameValue}","${imageName}",${offerPriceValue},"Offers","${offerDescriptionValue}","",${offerStatusValue},"${timeOfDayMenuValue}","${allergensValue}")`
        );

        dispatch(addMenuItem(formdata, offerBundle, extraItems)); // dispatch the addmenuitem action

        resetOfferName("");
        resetOfferPrice("");
        resetOrderStatus("");
        resetOrderDescription("");
        resetTimeOfDay("");
        resetAllergens("");
        setExtraItems([]);
        resetImage();

        Swal.fire({
          title: "Success",
          text: "Offer Added Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton:"false"
        }).then(()=>{
          window.location.reload(false);
        });
      }
    });
  };

  const recipeImageChangeHandler = (event) => {
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setImage(event.target.files[0]);
    setImageName(event.target.files[0].name.replace(/ /g, "_"));
    imageIsValid.current = true;
  };

  const resetImage = () => {
    setImage("default.jpg");
    setImageName("default.jpg");
    imageIsValid.current = false;
  };

  const extraItemArrayHandler = () => {
    setExtraItems((prevValue) => [
      ...prevValue,
      { extraItemName: extraItemValue, extraItemPrice: extraItemPriceValue },
    ]);
    resetExtraItem("");
    resetExtraItemPrice("");
  };

  const onRemoveExtraItem = (item) => {
    const array = extraItems.filter((itemInArray) => itemInArray !== item);
    setExtraItems(array);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#dfdfdf" }}>
      <Box component="form" onSubmit={offerSubmitHandler} sx={{ '& .MuiInputBase-root': { background: "white" } }} noValidate>
        <div className="d-flex"><h5 className="pe-2">Please choose an image to be displayed as the offer</h5><Manual title="Add offer manual" pageNumber={27} /></div>
        <input type="file" onChange={recipeImageChangeHandler} required />
        <br />
        <br />
        <div className="d-flex flex-row">
          <div>
            <div className="d-flex flex-row">
              <InputText
                required
                margin="normal"
                label="Offer Name"
                type="text"
                variant="filled"
                sx={{ input: { color: 'red' } }}
                value={offerNameValue}
                onChange={offerNameChangeHandler}
                onBlur={offerNameBlurHandler}
                hasError={offerNameHasError}
              />
              <div className="me-5"></div>
              <InputText
                required
                margin="normal"
                label="Price"
                type="text"
                variant="filled"
                value={offerPriceValue}
                onChange={offerPriceChangeHandler}
                onBlur={offerPriceBlurHandler}
                hasError={offerPriceHasError}
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
              />
            </div>


            <div className="d-flex flex-row">
              <InputSelect
                required
                enableResizing={false}
                label="Available?"
                variant="filled"
                selection={itemStatusArray.map((data) => {
                  return {
                    label: data[0],
                    value: data[1],
                  };
                })}
                value={offerStatusValue}
                onChange={offerStatusChangeHandler}
                onBlur={offerStatusBlurHandler}
                hasError={offerStatusHasError}
              />
              <div className="me-5"></div>
              <InputSelect
                required
                enableResizing={false}
                label="Day or Night Menu"
                variant="filled"
                selection={timeOfDay.map((data) => {
                  return {
                    label: data,
                    value: data,
                  };
                })}
                value={timeOfDayMenuValue}
                onChange={timeOfDayValueChangeChandler}
                onBlur={timeOfDayBlurHandler}
              />
            </div>
            <div>
            <InputText
                required
                label="Allergens"
                type="text"
                variant="filled"
                value={allergensValue}
                onChange={allergensChangeHandler}
                onBlur={allergensBlurHandler}
                hasError={allergensHasError}
              />
            </div>

            <div>
              <InputText
                required
                margin="normal"
                label="Description"
                type="text"
                variant="filled"
                resize="65ch"
                value={offerDescriptionValue}
                onChange={offerDescriptionChangeHandler}
                onBlur={offerDescriptionBlurHandler}
                hasError={offerDescriptionHasError}
                multiline
                minRows={3}
              />
            </div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            <p>Image Selected:</p>
            <div style={{ border: "dashed", borderColor: "gray", borderRadius: "10px", padding: "10px", height: "90%" }}>
              {!imagePreview && (<div style={{ width: "400px", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>Image Preview</div>)}
              {imagePreview && (<>

                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", maxWidth: "400px", height: "100%" }}
                />
              </>
              )}</div>
          </div>
        </div>
        <br />

        <div className="d-flex flex-column">
          <div>Enter any extra items</div>
          <div className="d-flex flex-row mt-2">
            <InputText

              label="Extra Item Name"
              type="text"
              variant="filled"
              value={extraItemValue}
              onChange={extraItemValueChangeHandler}
              onBlur={extraItemBlurHandler}
            />
            <span style={{ marginLeft: '2rem' }}></span>
            <InputText
              variant="filled"
              label="Extra Item Price"
              type="number"
              value={extraItemPriceValue}
              onChange={extraItemPriceChangeHandler}
              onBlur={extraItemPriceBlurHandler}
              startAdornment={<InputAdornment position="start">€</InputAdornment>}
            />
            <div className="me-2" />
            <Button
              variant="success"
              type="button"
              disabled={!itemIsValid}
              onClick={extraItemArrayHandler}
            >
              Add extra item
            </Button>
          </div>
        </div>

        <div className="mt-2">
          <p>Current extra items</p>
          {extraItems.map((item) => {
            return (
              <button
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "3rem",
                  border: "1px solid black",
                  marginRight: " 1rem",
                  padding: "0.5rem",
                }}
                onClick={() => onRemoveExtraItem(item)}
              >
                {item.extraItemName} X
              </button>
            );
          })}
        </div>

        <Button variant="success" type="submit" disabled={!formIsValid} style={{ marginTop: "2rem" }}>
          Create Offer
        </Button>
      </Box>
    </div>
  );
}
