import { motion } from "framer-motion";

import React, { Suspense, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../mui-grid.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Loading from '../UI/Loading/Loading';
import PersonalInfo from './PersonalInfo';
import AccountSettings from './AccountSettings';
import OrderHistory from './OrderHistory';
import PendingOrders from "./PendingOrders";

const theme = createTheme();

function VerticalTabPanel(props) {
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

function HorizontalTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

HorizontalTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

VerticalTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function horizontalA11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function verticalA11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className="container d-none d-md-block" style={{ paddingTop: "30px"  }}>
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            visibleScrollbar
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Personal Info" {...verticalA11yProps(0)} sx={{alignItems: 'flex-end'}}/>
            <Tab label="Account Settings" {...verticalA11yProps(1)} sx={{alignItems: 'flex-end'}}/>
            <Tab label="Order History" {...verticalA11yProps(2)} sx={{alignItems: 'flex-end'}}/>
            <Tab label="Track your orders" {...verticalA11yProps(3)} sx={{alignItems: 'flex-end'}}/>
            </Tabs>
          <VerticalTabPanel value={value} index={0}>
            <PersonalInfo />
          </VerticalTabPanel>
          <VerticalTabPanel value={value} index={1}>
            <AccountSettings/>
          </VerticalTabPanel>
          <VerticalTabPanel value={value} index={2}>
            <OrderHistory/>
          </VerticalTabPanel>
          <VerticalTabPanel value={value} index={3}>
            <PendingOrders/>
          </VerticalTabPanel>
          
        </Box>
      </div>
      <div className="container d-block d-md-none" style={{ paddingTop: "30px"  }}>
        <Box
          sx={{bgcolor: 'background.paper'}}
        >
          <Tabs
            variant="scrollable"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Personal Info" {...horizontalA11yProps(0)} />
            <Tab label="Account Settings" {...horizontalA11yProps(1)}/>
            <Tab label="Order History" {...horizontalA11yProps(2)}/>
            <Tab label="Track your orders" {...horizontalA11yProps(3)}/>
            </Tabs>
          <HorizontalTabPanel value={value} index={0}>
            <PersonalInfo />
          </HorizontalTabPanel>
          <HorizontalTabPanel value={value} index={1}>
            <AccountSettings/>
          </HorizontalTabPanel>
          <HorizontalTabPanel value={value} index={2}>
            <OrderHistory/>
          </HorizontalTabPanel>
          <HorizontalTabPanel value={value} index={3}>
            <PendingOrders/>
          </HorizontalTabPanel>
          
        </Box>
      </div>
    </motion.div>
  );
};

export default Profile;
