import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./MenuHandle.css";
import AddMenu from "./AddMenu";
import EditMenu from "./EditMenu";
import CreateOffer from "./CreateOffer";

export default function MenuHandle() {
  const [showAddMenu, setShowAddMenu] = useState(false); // this is used so we can render the correct functions for our dashboard.In this case so we can show the add menu item
  const [showEditMenu, setShowEditMenu] = useState(false); // this is used so we can render the correct functions for our dashboard.In this case so we can show the edit menu item
  const [showCreateOffer,setShowCreateOffer] = useState(false);
  const [showbox,setshowbox] = useState(false);

  return (
    <div style={{display:'flex'}}>
      <div style={{ width: "30%",marginTop:"1cm"}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Menu</Typography>
          </AccordionSummary>
          <AccordionDetails
            onClick={() => {
              setShowAddMenu(true);
              setShowEditMenu(false);
              setShowCreateOffer(false);
              setshowbox(true);
            }}
          >
            <Typography>Add Menu Item</Typography>
          </AccordionDetails>
          <AccordionDetails
            onClick={() => {
              setShowEditMenu(true);
              setShowAddMenu(false);
              setShowCreateOffer(false);
              setshowbox(true);
            }}
          >
            <Typography>Edit Menu Information</Typography>
          </AccordionDetails>
          <AccordionDetails
            onClick={() => {
              setShowEditMenu(false);
              setShowAddMenu(false);
              setShowCreateOffer(true);
              setshowbox(true);
            }}
          >
            <Typography>Create an offer</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
            {showbox && <div style={{margin:"50px",borderRadius:'10px',backgroundColor:'lightgray',width:"70%", border:"1px solid black"}}>
        {showAddMenu && <AddMenu/>} {/* if true then show add to menu */}
        {showEditMenu && <EditMenu/>} {/* if true show edit menu */}
        {showCreateOffer && <CreateOffer/>}
      </div>}
      
    </div>
  );
}
