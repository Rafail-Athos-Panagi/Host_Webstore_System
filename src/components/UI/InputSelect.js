import React, { useRef, useImperativeHandle } from "react";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";

const InputSelect = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });


  const resize = props.resize ? props.resize : "25ch";
  const errorMessage = props.hasError ? (<p>Please choose a valid {props.label}</p>) : (" ");

  return (
      <TextField
        sx={{width: resize}}
        select
        size={props.size}
        required={props.required || false}
        error={props.hasError}
        helperText={errorMessage}
        label={props.label}
        variant={props.variant || "outlined"}
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        InputLabelProps={{ shrink: props.labelSticky }}
        disabled={props.disabled}
      >
        {props.selection.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
  );
});

export default InputSelect;