import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import UserID from '../hooks/userid';


export default function PersonalInfo() {
  const { userID } = React.useContext(UserID);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    const options = {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
     
    }

    fetch('/api/customer/getinfo', options).then(res => {
      res.json().then(data => {
        if (data.length === 0)
          return;
        if (data[0].firstName) {
          setFirstName(data[0].firstName);
          setLastName(data[0].lastName);
        }
      })
    });
  }, [userID]);

  function handleEdit(event) {
    event.preventDefault();
    const options = {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',   
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName:firstName, lastName:lastName})
    }

    fetch('/api/customer/updateinfo', options).then(res => {
      if (res.status === 200)
        setHelperText("Changes saved!");
      else
        setHelperText("Something went wrong!");
    })
  }


  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', height: "100%" }}>
      <span>Personal Information</span>
      <hr />
      <span>First Name</span>
      <br />
      <TextField onChange={(e) => setFirstName(e.target.value)} value={firstName} variant="outlined" InputProps={{ endAdornment: <EditIcon /> }} />
      <br />
      <br />
      <span>Last Name</span>
      <br />
      <TextField onChange={(e) => setLastName(e.target.value)} value={lastName} variant="outlined" InputProps={{ endAdornment: <EditIcon /> }} />
      <br />
      <br />
      <Button onClick={handleEdit} variant="contained">Save changes</Button>
      <br/>
      <br/>
      <span style={{color:"green"}}>{helperText}</span>
    </Box>
  )
}
