import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Login from "../../Login/Login";
import CartButton from "../../Cart/CartButton";
import PersonIcon from "@mui/icons-material/Person";
import UserID from "../../hooks/userid";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Logo from "../../../assets/logo/Logo.webp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./Navbar.css";
import Cart from "../../Cart/Cart";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavDropdown } from "react-bootstrap";

export default function MainNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
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
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (userID === null) return;

    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",
    };

    fetch("/api/customer/getinfo", options).then((res) => {
      res.json().then((data) => {
        if (data[0].firstName) {
          setFirstName(data[0].firstName);
        }
      });
    });
  }, [userID]);
  return (
    <div className="Navbar">
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand style={{ marginLeft: "40px" }}>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={Logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="H.O.ST. logo"
            />
          </button>
        </Navbar.Brand>
        <div className="d-inline slogan" style={{cursor:"pointer"}} onClick={()=>navigate("/")}>
          <span >Tastes like home.. </span>
          <br />
          <span className="m-5">Feels like home</span>
        </div>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
              style={{
                color: "#0C777F",
                fontSize: "20px",
              }}
              className="me-lg-4 m-auto"
              eventKey="2"
            >
              <b>Home</b>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/menu");
              }}
              style={{
                color: "#0C777F",
                fontSize: "20px",
              }}
              eventKey="2"
              className="me-lg-4 m-auto"
            >
              <b>Day Menu</b>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/nightmenu");
              }}
              style={{
                color: "#0C777F",
                fontSize: "20px",
              }}
              eventKey="2"
              className="me-lg-4 m-auto"
            >
              <b>Night Menu</b>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/aboutus");
              }}
              style={{
                color: "#0C777F",
                fontSize: "20px",
              }}
              eventKey="2"
              className="me-lg-4 m-auto"
            >
              <b>About Us</b>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/contact");
              }}
              style={{
                color: "#0C777F",
                fontSize: "20px",
              }}
              eventKey="2"
              className="me-lg-4 m-auto"
            >
              <b>Contact Us</b>
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {!userID && (
              <Nav.Link
                className="login"
                onClick={() => {
                  setShowLogin(true);
                }}
                style={{
                  color: "#0C777F",
                  marginRight: "35px",
                  fontSize: "20px",
                  margin: "auto"
                }}
              >
                <span>
                  <b>Login</b>
                </span>
                <PersonIcon style={{ width: "40px", height: "40px" }} />
              </Nav.Link>
            )}
            {userID && (
              <div className="login me-lg-4 m-auto">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ alignSelf: "center", flexGrow: 1 }}
                  >
                    {firstName}
                  </Typography>
                  <AccountCircle style={{ width: "30px", height: "30px" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleAccount}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
            {showLogin && (
              <Login
                onClose={() => {
                  setShowLogin(false);
                }}
              />
            )}
            <div className="m-auto">
            <CartButton
              onClick={() => { setShowCart(true) }}
            />
            </div>
            {showCart && (<Cart
              onClose={() => {
                setShowCart(false);
              }}
            />)}
          </Nav>
          {/* <div className="language-menu-container">
                <ul id="language-menu">
                  <li>
                    <a href="#">ΕΛ</a>
                  </li>
                  |
                  <li>
                    <a href="#">EN</a>
                  </li>
                </ul>
              </div> */}
      </Navbar.Collapse>
    </Navbar>
    </div >
  );
}
