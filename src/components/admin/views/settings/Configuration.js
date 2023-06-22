import React, { useState } from 'react';
import { Button, TextField } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Manual from '../../Manual';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Configuration() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [dayAboutus, setDayAboutus] = useState("");
  const [nightAboutus, setNightAboutus] = useState("");
  const [dayMission, setDayMission] = useState("");
  const [nightMission, setNightMission] = useState("");
  const [phone, setPhone] = useState("");
  const [tac, setTac] = useState("");
  const [postals, setPostals] = useState("");
  const [dayfaq, setDayFAQ] = useState("");
  const [nightfaq, setNightFAQ] = useState("");
  const [allergens, setAllergens] = useState("");
  const [isOpen, setIsOpen] = useState(null);

  React.useEffect(() => {
    fetch("config/config.json").then((res) => res.json()).then((data) => setData(data));
    fetch("/api/menu/isopen").then((res) => res.json()).then((data) => setIsOpen(data.open));
  }, []);

  React.useEffect(() => {
    setDayAboutus(data.dayaboutus);
    setNightAboutus(data.nightaboutus);
    setDayMission(data.daymission);
    setNightMission(data.nightmission);
    setPhone(data.phone);
    setTac(data.tac);
    setPostals(data.postals);
    setDayFAQ(data.dayfaq);
    setNightFAQ(data.nightfaq);
    setAllergens(data.allergens);
  }, [data]);


  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleEdit = (key, value, key2, value2) => {
    let body;
    if (typeof key2 !== 'undefined' && typeof value2 !== 'undefined')
      body = JSON.stringify({ key: key, value: value, key2: key2, value2: value2 });
    else
      body = JSON.stringify({ key: key, value: value });

    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    fetch("/api/json/config", options).then((res) => {
      if (res.status === 202)
        Swal.fire({
          icon: 'success',
          title: 'Changes saved',
          showConfirmButton: false,
          timer: 1000
        });
      else if (res.status === 503)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong',
        });
    });
    
  }

  const handleRestaurant = (status) => {
    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ open: status }),
    };
    fetch("/api/editopen", options).then((res) => {
      if (res.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Changes saved',
          showConfirmButton: false,
          timer: 1000
        });
        setIsOpen(status);
      } else if (res.status === 500)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong',
        });
    });
  }


  return (
    <>
      <div className="container" style={{ paddingTop: "30px" }}>
        <div className="d-flex align-items-center">
        <h2 className="pe-2">Configuration</h2>
        <Manual title="Dashboard manual" pageNumber={7}/>
        </div>
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="About Us" {...a11yProps(0)} sx={{ alignItems: 'flex-end' }} />
            <Tab label="Our mission" {...a11yProps(1)} sx={{ alignItems: 'flex-end' }} />
            <Tab label="Telephone" {...a11yProps(2)} sx={{ alignItems: 'flex-end' }} />
            <Tab label="Terms & Con" {...a11yProps(3)} sx={{ alignItems: 'flex-end' }} />
            <Tab label="Privacy Policy" {...a11yProps(4)} sx={{ alignItems: 'flex-end' }} />
            <Tab label="Valid Postals" {...a11yProps(5)} sx={{ alignItems: 'flex-end' }} />
            <Tab label="FAQ" {...a11yProps(6)} sx={{ alignItems: 'flex-end' }} />
            <Tab label="Allergens" {...a11yProps(7)} sx={{ alignItems: 'flex-end' }} />
            <Tab label="Open/Close" {...a11yProps(8)} sx={{ alignItems: 'flex-end' }} />
          </Tabs>
          <TabPanel value={value} index={0} style={{ flex: "1 0 auto" }}>
            <div className='d-flex flex-column'>

              <TextField InputLabelProps={{ shrink: true }} defaultValue={dayAboutus} onChange={e => setDayAboutus(e.target.value)} label="Configure day about us section" variant='filled' multiline />
              <div className="mt-5" />
              <TextField InputLabelProps={{ shrink: true }} defaultValue={nightAboutus} onChange={e => setNightAboutus(e.target.value)} label="Configure night about us section" variant='filled' multiline />
              <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleEdit("dayaboutus", dayAboutus, "nightaboutus", nightAboutus)}>Save Changes</Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} style={{ flex: "1 0 auto" }}>
            <div className='d-flex flex-column'>
              <TextField defaultValue={dayMission} onChange={e => setDayMission(e.target.value)} label="Configure day our mission section" variant='filled' multiline />
              <div className="mt-5" />
              <TextField defaultValue={nightMission} onChange={e => setNightMission(e.target.value)} label="Configure night our mission section" variant='filled' multiline />
              <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleEdit("daymission", dayMission, "nightmission", nightMission)}>Save Changes</Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} style={{ flex: "1 0 auto" }}>
            <div className='d-flex flex-column'>
              <TextField defaultValue={phone} onChange={e => setPhone(e.target.value)} label="Configure telephone" variant='filled' multiline />
              <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleEdit("phone", phone)}>Save Changes</Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3} style={{ flex: "1 0 auto" }}>
            <div className='d-flex flex-column'>
              <TextField defaultValue={tac} onChange={e => setTac(e.target.value)} label="Configure Terms and Conditions" variant='filled' multiline />
              <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleEdit("tac", tac)}>Save Changes</Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={4} style={{ flex: "1 0 auto" }}>

          </TabPanel>

          <TabPanel value={value} index={5} style={{ flex: "1 0 auto" }}>
            <div className='d-flex flex-column'>
              <TextField defaultValue={postals} onChange={e => setPostals(e.target.value)} label="Configure Postals" variant='filled' multiline />
              <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleEdit("postals", postals)}>Save Changes</Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={6} style={{ flex: "1 0 auto" }}>
            <div className='d-flex flex-column'>
              <TextField defaultValue={dayfaq} onChange={e => setDayFAQ(e.target.value)} label="Configure Day FAQ" variant='filled' multiline />
              <div className="mt-5" />
              <TextField defaultValue={nightfaq} onChange={e => setNightFAQ(e.target.value)} label="Configure Night FAQ" variant='filled' multiline />
              <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleEdit("dayfaq", dayfaq, "nightfaq", nightfaq)}>Save Changes</Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={7} style={{ flex: "1 0 auto" }}>
            <div className='d-flex flex-column'>
              <TextField defaultValue={allergens} onChange={e => setAllergens(e.target.value)} label="Configure Allergens" variant='filled' multiline />
              <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleEdit("allergens", allergens)}>Save Changes</Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={8} style={{ flex: "1 0 auto" }}>
          <h1>{isOpen ? "Restaurant is open" : "Restaurant is closed"}</h1>
            <div className='d-flex flex-row'>
              
              {isOpen ?
              <Button variant="contained" disabled sx={{ marginTop: 2, width: "15%" }}>Open Restaurant</Button>
              : <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleRestaurant(true)}>Open Restaurant</Button>}
              <div className="mx-5 d-none d-md-block" />
              {isOpen ? 
              <Button variant="contained" sx={{ marginTop: 2, width: "15%" }} onClick={() => handleRestaurant(false)}>Close Restaurant</Button> :
              <Button variant="contained" disabled sx={{ marginTop: 2, width: "15%" }}>Close Restaurant</Button>
              }
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  )
}
