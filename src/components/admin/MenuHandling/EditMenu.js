import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import Modal from "../../UI/Modal/Modal";
import useInput from "../../hooks/use-input";
import { Button, Col, Row } from "react-bootstrap";
import classes from "./AddMenu.module.css";
import { notEmpty, validDescription } from "../../Regex/Regex";
import { editMenuItem } from "../../store/menu-actions";
import InputText from "../../UI/InputText";
import InputSelect from "../../UI/InputSelect";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, TextField } from "@mui/material";
import Swal from "sweetalert2";
import Manual from "../Manual";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

export default function EditMenu() {
  //Redux
  const allMenuTableData = useSelector((state) => state.menu.menuItems); // menuItems array
  const allExtraMenuItemsData = useSelector((state) => state.menu.extraItems);
  const allRepeatDays = useSelector((state) => state.menu.repeatDays);
  const dispatch = useDispatch(); // standard setup
  const reader = new FileReader();

  //State
  const [isOpen, setIsOpen] = useState(false); // this is used for if the modal is open or not
  const [idRow, setIDRow] = useState(0); // this will get the value of the row when its selected to be edited
  const tableMenuData = allMenuTableData.filter(
    (item) => item.itemStatus === 1
  );
  const [firstSetOfEI, setFirstSetOfEI] = useState([]);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState();
  const [extraItems, setExtraItems] = useState([]);
  const [imagePreview, setImagePreview] = useState();
  const [repeatDays, setRepeatDays] = useState([]);
  const recipeImageIsValid = useRef(false);

  //Input Validation
  const isNotEmpty = (value) => notEmpty.test(value); // regex check for is not empty
  const isValidEmptyText = (value) => validDescription.test(value); // isnot empty check using regex

  //Arrays
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
    "Offers"
  ];

  const itemCategoriesArrayNight = [
    "Burgers",
    "Sides",
    "Tasty Sites",
    "Cold Sandwiches",
    "Salads",
    "Kids Menu",
    "Sweets",
    "Beverages",
    "Offers"
  ];
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const timeOfDay = ["Day", "Night"];

  const options = {
    // options for the mui database
    setRowProps: (row) => ({
      onDoubleClick: () => {
        // on double click of the array set the fields with the data
        setExtraItems(
          allExtraMenuItemsData.filter(
            (item) => item.itemID === row[0] && item.extraItemStatus === 1
          )
        );
        setFirstSetOfEI(
          allExtraMenuItemsData.filter(
            (item) => item.itemID === row[0] && item.extraItemStatus === 1
          )
        );

        setImage(row[1]);
        setImageName(row[1]);
        setIDRow(row[0]);
        setImagePreview("./uploads/menu/" + row[1]);
        resetItemName(row[2]);
        resetPrice(row[3]);
        resetItemIngredients(row[4]);
        resetItemDescription(row[5]);
        resetItemStatus(!!parseInt(row[6]));
        resetItemCategory(row[7]);
        resetTimeOfDay(row[8]);
        resetAllergens(row[9]);
        setRepeatDays(
          allRepeatDays
            .filter((item) => item.itemID === row[0])
            .map((item) => item.dayOfTheWeek)
        );
        setIsOpen(true);
      },
    }),
    onRowsDelete: (rowsDeleted, dataIndex) => {
      const deleted = rowsDeleted.data.map(
        (d) => tableMenuData[d.dataIndex].itemID
      );

      // changes the status to true so it can go to the deleted section
      try {
        deleted.forEach((i) => {
          const request = {
            method: "POST",
            credentials: "include",
            mode: "cors",

            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              table: "menuitems",
              columns: `itemStatus=true`,
              where: `itemID=${i}`,
            }),
          };

          fetch(`/api/update`, request).then(function (res) {
            res.json().then(function (data) {
              if (data.sqlMessage) {
                console.log(data.sqlMessage);
              }
            });
          });
        });
      } catch (error) {
        console.error(error);
      }

      // Setting status to true for each deleted item
      try {
        deleted.forEach((i) => {
          const request = {
            method: "POST",
            credentials: "include",
            mode: "cors",

            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              table: "menuExtraItems",
              columns: `extraItemStatus=true`,
              where: `itemID=${i}`,
            }),
          };

          fetch(`/api/update`, request).then(function (res) {
            res.json().then(function (data) {
              if (data.sqlMessage) {
                console.log(data.sqlMessage);
              }
            });
          });
        });
      } catch (error) {
        console.error(error);
      }
    },
  };

  // setting the columns of the table
  const columns = [
    {
      name: "itemID",
      label: "Item ID",
      options: {
        display: true,
        searchable: false,
        download: false,
        print: false,
        filter: false,
        sort: true,
      },
    },
    {
      name: "itemImage",
      label: "Image",
      options: { display: false, filter: false, sort: false },
    },
    {
      name: "itemName",
      label: "Item Name",
      options: { filter: true, sort: true },
    },
    {
      name: "itemPrice",
      label: "Price",
      options: { filter: true, sort: true },
    },
    {
      name: "itemIngredients",
      label: "Ingredients",
      options: { display: false, filter: false, sort: false },
    },
    {
      name: "itemDescription",
      label: "Description",
      options: { display: false, filter: false, sort: false },
    },
    {
      name: "itemStatus",
      label: "Status",
      options: { display: false, filter: false, sort: true },
    },
    {
      name: "itemCategory",
      label: "Category",
      options: { display: true, filter: true, sort: false },
    },
    {
      name: "itemTimeOfDay",
      label: "Day/Night",
      options: { display: true, filter: true, sort: false },
    },
    {
      name: "itemAllergens",
      label: "Allergens",
      options: { display: false, filter: false, sort: false },
    },
  ];

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
  } = useInput(isNotEmpty);

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
    valueChangeHandler: itemStatusChangeHandler,
    inputBlurHandler: itemStatusBlurHandler,
    reset: resetItemStatus,
  } = useInput(isNotEmpty);

  const {
    value: itemCategoryValue,
    isValid: itemCategoryIsValid,
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
    valueChangeHandler: extraItemValueChangeHandler,
    inputBlurHandler: extraItemBlurHandler,
    reset: resetExtraItem,
  } = useInput(isNotEmpty);

  const {
    value: extraItemPriceValue,
    isValid: extraItemPriceIsValid,
    valueChangeHandler: extraItemPriceChangeHandler,
    inputBlurHandler: extraItemPriceBlurHandler,
    reset: resetExtraItemPrice,
  } = useInput(isNotEmpty);

  const {
    value: timeOfDayMenuValue,
    isValid: timeOfDayMenuIsValid,
    valueChangeHandler: timeOfDayValueChangeChandler,
    inputBlurHandler: timeOfDayBlurHandler,
    reset: resetTimeOfDay,
  } = useInput(isNotEmpty);

  let formIsValid = false; // formisvalid variable declaration
  let itemIsValid = false;

  if (
    // only if all of the fields are valid will the form be valid
    itemDescriptionIsValid &&
    itemNameIsValid &&
    timeOfDayMenuIsValid &&
    (itemCategoryValue === "Offers" ? true : itemCategoryIsValid) &&
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
    event.preventDefault(); // prevent refresh when form is submitted

    if (!formIsValid) return; // prevents form being valid even if user changes it from browser or developer tools





    const menuData = {
      // we put all the information in an object so we can send it to the action
      itemID: idRow,
      itemName: itemNameValue,
      itemImage: imageName,
      itemPrice: itemPriceValue,
      itemDescription: itemDescriptionValue,
      itemIngredients: itemIngredientsValue,
      itemStatus: itemStatusValue,
      itemTimeOfDay: timeOfDayMenuValue,
      itemCategory: itemCategoryValue,
      itemAllergens: allergensValue,
    };

    dispatch(editMenuItem(menuData, extraItems, firstSetOfEI, repeatDays)); // dispatch the editmenu item action from the menu actions

    const imageFunction = () => {
      const formImage = new FormData();
      formImage.set("image", image);
      const req = {
        method: "POST",
        body: formImage,
      };

      fetch("/api/image", req).then((res) => {

        if (!res.ok) {
          throw new Error("Could not add menu image"); // error message
        }
      });
    };

    if (recipeImageIsValid.current)
      imageFunction();

    // reset all the fields
    resetItemName("");
    resetItemDescription("");
    resetItemIngredients("");
    resetItemStatus("");
    resetImage();
    resetPrice("");
    resetItemCategory("");
    resetTimeOfDay("");
    setExtraItems([]);
    resetAllergens("");
    setRepeatDays([]);

    setIsOpen(false); // close the modal not needed anymore
    Swal.fire({
      title: "Success!",
      text: "Menu item edited successfully!",
      icon: "success",
      showConfirmButton:false,
      timer: 1500
    }).then(()=>{
      window.location.reload(false);
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
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <MUIDataTable
        title={<div className="d-flex"><div className="me-2">Current Menu Items</div><Manual title="Edit item manual" pageNumber={24} /></div>}
        data={tableMenuData}
        columns={columns}
        options={options}
      />
      {isOpen && (
        <Modal
          onClose={() => {
            setIsOpen(false);
          }}
          styleOfTheModal={"modalWhiteEditMenu"}
          modalContent={""}
        >
          <div className="p-5" >
            <Box component="form" onSubmit={onSubmitHandler} sx={{ '& .MuiInputBase-root': { background: "white" }, '& .MuiSelect-select': { background: "white" } }} noValidate>
              <div className="d-flex mb-3 align-items-center"><h2>Edit Menu Item</h2></div>
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
                        required={
                          timeOfDayMenuValue === "Day" || timeOfDayMenuValue === "Both"
                            ? true
                            : false
                        }
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
                  required={itemCategoryValue === "Offers" ? false : true}
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
                Save Changes
              </Button>
            </Box>
          </div>
        </Modal>
      )}
    </div>
  );
}
