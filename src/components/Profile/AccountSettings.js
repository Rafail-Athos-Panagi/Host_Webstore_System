import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import UserID from '../hooks/userid';

export default function AccountSettings() {
  const [helperText, setHelperText] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [type, setType] = React.useState("password");
  const { userID } = React.useContext(UserID);


  function handleEdit(event) {
    event.preventDefault();
    setHelperText("");
    setErrorText("");
    if (password !== newPassword) {
      setErrorText("Passwords do not match!");
      return;
    }

    if(password.length < 8){
      setErrorText("Password must be at least 8 characters long!");
      return;
    }

    if(password === oldPassword){
      setErrorText("New password cannot be the same as your old password!");
      return;
    }

    const options = {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      
      
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ oldpassword: oldPassword ,password:password })
    }
    fetch('/api/customer/updateaccount', options).then(res => {
      if (res.status === 200)
        setHelperText("Password changed successfully");
      else if (res.status === 401)
        setErrorText("Incorrect password!");
      else
        setErrorText("Something went wrong!");
    });
    }


  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', height: "100%", width: "50ch" }}>
      <span>Account Settings</span>
      <hr />
      <span>Old Password</span>
      <br />
      <TextField onChange={(e)=>setOldPassword(e.target.value)}  type={type} variant="outlined"/>
      <br />
      <br />
      <span>New Password</span>
      <br />
      <TextField onChange={(e)=>setPassword(e.target.value)}  type={type} variant="outlined"/>
      <br />
      <br />
      <span>Re-enter New Password</span>
      <br />
      <TextField onChange={(e)=>setNewPassword(e.target.value)} type={type} variant="outlined"/>
      <br />
      <br />
      <Button onClick={handleEdit} variant="contained">Save changes</Button>
      <br />
      <br />
      <span style={{ color: "green" }}>{helperText}</span>
      <span style={{ color: "red" }}>{errorText}</span>
    </Box>
  )
}
