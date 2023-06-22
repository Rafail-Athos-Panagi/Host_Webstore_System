import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import { addMenuItem, fetchPreviousExtraItemsGroup } from "../../store/menu-actions";
import classes from "./AddMenu.module.css";
import { notEmpty, validDescription, validPrice } from "../../Regex/Regex";
import InputText from "../../UI/InputText";
import InputSelect from "../../UI/InputSelect";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Swal from "sweetalert2";
import Manual from "../Manual";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/material";

export default function AddMenu() {
  const dispatch = useDispatch(); // standard dispatch action
  const isNotEmpty = (value) => notEmpty.test(value); // isnot empty check using regex
  const isValidEmptyText = (value) => validDescription.test(value); // isnot empty check using regex
  const isValidPrice = (value) => validPrice.test(value); // isnot empty check using regex
  const [image, setImage] = useState("default.jpg");
  const [imageName, setImageName] = useState("default.jpg");
  const recipeImageIsValid = useRef(false);
  const [extraItems, setExtraItems] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [repeatDays, setRepeatDays] = useState([]);
  const reader = new FileReader();
  const itemStatusArray = [["Available", "true"], ["Unavailable", "false"]];
  const itemCategoriesArrayDay = [
    "Dishes of The Day",
    "Sides",
    "Salads",
    "Hot Dishes",
    "A La Carte",
    "Cold Sandwiches",
    "Sweets",
    "Beverages",
  ];

  const itemCategoriesArrayNight = [
    "Burgers",
    "Sides",
    "Tasty Bites",
    "Cold Sandwiches",
    "Salads",
    "Kids Menu",
    "Sweets",
    "Beverages",
  ];
  const timeOfDay = ["Day", "Night", "Both"];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  // useinput hook setup for the fields of the form
  const {
    value: itemNameValue,
    isValid: itemNameIsValid,
    hasError: itemNameHasError,
    valueChangeHandler: itemNameChangeHandler,
    inputBlurHandler: itemNameBlurHandler,
    reset: resetItemName,
  } = useInput(isNotEmpty);

  const {
    value: itemPriceValue,
    isValid: itemPriceIsValid,
    hasError: itemPriceHasError,
    valueChangeHandler: itemPriceChangeHandler,
    inputBlurHandler: itemPriceBlurHandler,
    reset: resetPrice,
  } = useInput(isValidPrice);

  const {
    value: itemDescriptionValue,
    isValid: itemDescriptionIsValid,
    hasError: itemDescriptionHasError,
    valueChangeHandler: itemDescriptionChangeHandler,
    inputBlurHandler: itemDescriptionBlurHandler,
    reset: resetItemDescription,
  } = useInput(isNotEmpty);

  const {
    value: itemIngredientsValue,
    isValid: itemIngredientsIsValid,
    hasError: itemIngredientsHasError,
    valueChangeHandler: itemIngredientsChangeHandler,
    inputBlurHandler: itemIngredientsBlurHandler,
    reset: resetItemIngredients,
  } = useInput(isNotEmpty);

  const {
    value: itemStatusValue,
    isValid: itemStatusIsValid,
    hasError: itemStatusHasError,
    valueChangeHandler: itemStatusChangeHandler,
    inputBlurHandler: itemStatusBlurHandler,
    reset: resetItemStatus,
  } = useInput(isNotEmpty);

  const {
    value: itemCategoryValue,
    isValid: itemCategoryIsValid,
    hasError: itemCategoryHasError,
    valueChangeHandler: itemCategoryChangeHandler,
    inputBlurHandler: itemCategoryBlurHandler,
    reset: resetItemCategory,
  } = useInput(isNotEmpty);

  const {
    value: allergensValue,
    isValid: allergensIsValid,
    hasError: allergensHasError,
    valueChangeHandler: allergensChangeHandler,
    inputBlurHandler: allergensBlurHandler,
    reset: resetAllergens,
  } = useInput(isValidEmptyText, "");

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
  } = useInput(isValidPrice);

  const {
    value: timeOfDayMenuValue,
    isValid: timeOfDayMenuIsValid,
    hasError: timeOfDayHasError,
    valueChangeHandler: timeOfDayValueChangeChandler,
    inputBlurHandler: timeOfDayBlurHandler,
    reset: resetTimeOfDay,
  } = useInput(isNotEmpty);

  // bringing old copies of extra items
  useEffect(() => {

    dispatch(fetchPreviousExtraItemsGroup(itemCategoryValue)).then((result) => { setExtraItems(result); });
  }, [dispatch, itemCategoryValue]);



  let formIsValid = false; // formisvalid variable declaration
  let itemIsValid = false;

  if (
    // only if all of the fields are valid will the form be valid
    itemDescriptionIsValid &&
    itemNameIsValid &&
    timeOfDayMenuIsValid &&
    itemIngredientsIsValid &&
    itemCategoryIsValid &&
    itemPriceIsValid &&
    itemStatusIsValid
  )
    formIsValid = true;

  if (extraItemIsValid && extraItemPriceIsValid) {
    itemIsValid = true;
  }

  const onSubmitHandler = (event) => {
    // submit handler
    event.preventDefault(); // blocks refresh when form is submitted

    if (!formIsValid) return; // this is a precaution for if the user tries to change the variable from the browser

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

        const menuData = {
          // the menu data that will me added we make an object so we can send to the add menu action
          itemName: itemNameValue,
          itemImage: imageName,
          itemPrice: itemPriceValue,
          itemCategory: itemCategoryValue,
          itemDescription: itemDescriptionValue,
          itemIngredients: itemIngredientsValue,
          itemStatus: itemStatusValue,
          itemTimeOfDay: timeOfDayMenuValue,
        };

        const formdata = new FormData();
        formdata.set("image", image);
        formdata.set("table", "menuitems");
        formdata.set(
          "values",
          `(default,"${itemNameValue}","${imageName}",${itemPriceValue},"${itemCategoryValue}","${itemDescriptionValue}","${itemIngredientsValue}",${itemStatusValue},"${timeOfDayMenuValue}","${allergensValue}")`
        );

        dispatch(addMenuItem(formdata, menuData, extraItems, repeatDays)); // dispatch the addmenuitem action */

        // reset all the fields
        resetItemName("");
        resetItemDescription("");
        resetItemIngredients("");
        resetItemStatus("");
        resetImage();
        resetPrice("");
        resetItemCategory("");
        resetTimeOfDay("");
        resetAllergens("");
        setExtraItems([]);
        setRepeatDays([]);

        Swal.fire({
          title: "Success",
          text: "Menu Item Added Successfully",
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
    recipeImageIsValid.current = true;
  };

  const resetImage = () => {
    setImage("default.jpg");
    setImageName("default.jpg");
    setImagePreview(null);
    recipeImageIsValid.current = false;
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


  const handleDays = (e) => {
    const {
      target: { value },
    } = e;
    setRepeatDays(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  console.log(extraItems);




  return (
    <div style={{ padding: "40px", backgroundColor: "#dfdfdf" }}>
      <Box onSubmit={onSubmitHandler} sx={{ '& .MuiInputBase-root': { background: "white" }, '& .MuiSelect-select': { background: "white" } }} component="form" noValidate>
        <div className="d-flex mb-3 align-items-center"><h2>Add New Menu Item</h2><Manual title="Add item manual" pageNumber={19} /></div>
        <div className="d-flex flex-row">
          <div>
            <div className="d-flex flex-row">
              <InputText
                required
                label="Item Name"
                type="text"
                variant="filled"
                value={itemNameValue}
                onChange={itemNameChangeHandler}
                onBlur={itemNameBlurHandler}
                hasError={itemNameHasError}
              />
              <div className="me-5"></div>
              <InputText
                required
                label="Item Image"
                type="file"
                variant="filled"
                onChange={recipeImageChangeHandler}
              />
            </div>
            <div className="d-flex flex-row mt-3">
              <InputText
                required
                label="Item Price"
                type="number"
                variant="filled"
                value={itemPriceValue}
                onChange={itemPriceChangeHandler}
                onBlur={itemPriceBlurHandler}
                hasError={itemPriceHasError}
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
              />
              <div className="me-5"></div>
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
                value={itemStatusValue}
                onChange={itemStatusChangeHandler}
                onBlur={itemStatusBlurHandler}
              />
            </div>
            <div className="d-flex flex-row">
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
              <div className="me-5"></div>
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

            <div className="d-flex flex-row">
              <div className="d-flex flex-column">
                <InputSelect
                  enableResizing={false}
                  label="Day Category"
                  variant="filled"
                  selection={itemCategoriesArrayDay.map((data) => {
                    return {
                      label: data,
                      value: data,
                      disabled: timeOfDayMenuValue === 'Both' && data !== 'Sides' && data !== 'Sweets' && data !== 'Beverages' && data !== 'Cold Sandwiches' && data !== 'Salads'
                    };
                  })}
                  value={itemCategoryValue}
                  onChange={itemCategoryChangeHandler}
                  onBlur={itemCategoryBlurHandler}
                  required={timeOfDayMenuValue === "Day" || timeOfDayMenuValue === "Both"  ? true : false}
                  disabled={
                    timeOfDayMenuValue === "Day" || timeOfDayMenuValue === "Both"
                      ? false
                      : true
                  }
                />
                <InputSelect
                  enableResizing={false}
                  label="Night Category"
                  variant="filled"
                  selection={itemCategoriesArrayNight.map((data) => {
                    return {
                      label: data,
                      value: data,
                    };
                  })}
                  value={itemCategoryValue}
                  onChange={itemCategoryChangeHandler}
                  onBlur={itemCategoryBlurHandler}
                  required={timeOfDayMenuValue === "Night" ? true : false}
                  disabled={timeOfDayMenuValue === "Night" ? false : true}
                />
              </div>
              <div className="me-5"></div>
              <div className="d-flex align-items-center justify-content-center flex-column">
                <small>Only available for dishes of the day</small>
                <FormControl variant="filled" sx={{ m: 1, width: 220, marginBottom: '30px', }}>
                  <InputLabel id="repeat-select">Repeat on which days?</InputLabel>
                  <Select
                    labelId="repeat-select"
                    id="demo-multiple-checkbox"
                    multiple
                    value={repeatDays}
                    onChange={handleDays}
                    required={itemCategoryValue === "Dishes of The Day" ? true : false}
                    disabled={itemCategoryValue === "Dishes of The Day" ? false : true}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {daysOfWeek.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={repeatDays.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <br />
          <div className="d-flex flex-column align-items-center  w-100">
            <p>Image Selected:</p>
            <div style={{ border: "dashed", borderColor: "gray", borderRadius: "10px", padding: "10px", height: "70%" }}>
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
        <div className="d-flex flex-row">
          <InputText
            required
            label="Item Ingredients"
            type="text"
            variant="filled"
            value={itemIngredientsValue}
            onChange={itemIngredientsChangeHandler}
            onBlur={itemIngredientsBlurHandler}
            hasError={itemIngredientsHasError}
            multiline
            minRows={3}
            resize="50%"
          />
          <div className="me-5"></div>
          <InputText
            required
            label="Item Description"
            type="text"
            variant="filled"
            value={itemDescriptionValue}
            onChange={itemDescriptionChangeHandler}
            onBlur={itemDescriptionBlurHandler}
            hasError={itemDescriptionHasError}
            multiline
            minRows={3}
            resize="50%"
          />
        </div>
        <br />
        <div>
          <p>Enter any extra items</p>

          <InputText
            label="Extra Item Name"
            type="text"
            variant="filled"
            value={extraItemValue}
            onChange={extraItemValueChangeHandler}
            onBlur={extraItemBlurHandler}
          />
          <span style={{ marginLeft: "2rem" }}></span>
          <InputText
            label="Extra Item Price"
            type="number"
            variant="filled"
            value={extraItemPriceValue}
            onChange={extraItemPriceChangeHandler}
            onBlur={extraItemPriceBlurHandler}
          />
          <span style={{ marginLeft: "2rem" }}></span>
          <Button
            variant="success"
            type="button"
            disabled={!itemIsValid}
            onClick={extraItemArrayHandler}
          >
            {" "}
            Add extra item
          </Button>
        </div>

        <div>
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
                key={item.extraItemName}
              >
                {item.extraItemName} X
              </button>
            );
          })}
        </div>



        <Button variant="success" type="submit" disabled={!formIsValid}>
          Add Menu Item
        </Button>
      </Box>
    </div>
  );
}
