import React, { useRef, useImperativeHandle } from "react";
import { InputAdornment, TextField } from "@mui/material";
import "./InputText.module.css";

const InputText = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  const customError=props.errorMessage ? props.errorMessage :<p>Please enter a valid {props.label}</p> // you can put your own error message with the prop errorMessage 
  const resize = props.resize ? props.resize : "25ch";
  const errorMessage =  props.hasError  ? customError : "";
  const maxCharacters = props.maxCharacters ? props.maxCharacters : "";

  return (
    
      <TextField
        disabled={props.disable}
        sx={{ width: resize }}

        size={props.size}
        margin={props.margin}
        bgcolor={props.bgcolor || "white"}
        placeholder={props.placeholder}
        required={props.required || false}
        error={props.hasError}
        helperText={errorMessage}
        label={props.label || "Put a label"}
        variant={props.variant || "outlined"}
        ref={inputRef}
        type={props.type || "text"}
        name={props.name || props.id}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        minRows={props.minRows}
        multiline={props.multiline}
        inputProps={{ maxLength: maxCharacters,readOnly:props.shouldBeReadOnly || false }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {props.startAdornment}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{props.endAdornment}</InputAdornment>
          ),
          style: props.styles , // Add this line to set background color to white
        }}
        InputLabelProps={{ shrink: props.labelSticky }}
      />
  );
});

export default InputText;