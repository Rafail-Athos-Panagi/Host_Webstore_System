import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import Button from "@mui/material/Button";
import Login from "../../Login/Login";
import CartButton from "../../Cart/CartButton";
import Logo from "../../../assets/logo/Logo.webp"
import PersonIcon from '@mui/icons-material/Person';
import UserID from "../../hooks/userid";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function MainNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { userID } = useContext(UserID);

  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/logout");
  };

  const handleAccount = () => {
    setAnchorEl(null);
    navigate("/myaccount");
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (userID === null)
      return;

    const options = {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      
      
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ select: "firstName", from: "customers", where: `userID=${userID}` })
    }

    fetch('/api/select', options).then(res => {
      res.json().then(data => {
        console.log(data);
        if (data[0].firstName) {
          setFirstName(data[0].firstName);
        }
      })
    });
  }, [userID])

  return (
    <header>
    <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container style={{ alignItems: "flex" }}>
          <Navbar.Brand> <img src={Logo} alt="Logo" style={{ width: "54px" }} /></Navbar.Brand>
          <Navbar.Brand onClick={() => { navigate("/") }}>HOST </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-1">
              <Nav.Link onClick={() => { navigate("/menu") }}>Menu</Nav.Link>
            </Nav>
            <Nav className="ms-1">
              <Nav.Link onClick={() => { navigate("/contact") }}>Contact</Nav.Link>
            </Nav>
            <Nav className="ms-1">
              <Nav.Link onClick={() => { navigate("/about") }}>About us</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Button variant="contained" onClick={() => { navigate("/menuhandling") }}>
                Admin test
              </Button>
            </Nav>
            <Nav>
              {!userID &&
                <div className="login"
                  onClick={() => { setShowLogin(true) }}
                >
                  <span>Login</span>
                  <PersonIcon />
                </div>
              }
              {userID &&
                <div className="login">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {firstName}
                    </Typography>
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleAccount}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              }
              {showLogin && <Login onClose={() => { setShowLogin(false) }} />}
              <Button variant="outline-success">
                <NavDropdown title="EN" id="collasible-nav-dropdown">
                  <NavDropdown.Item>ΕΛ</NavDropdown.Item>
                </NavDropdown>
              </Button>
              <CartButton onClick={() => { navigate("/cart") }} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    </header>
  );
}
