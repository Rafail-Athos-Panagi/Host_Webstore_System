import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HostLogo from "../../../assets/img/Logo.webp";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const ProfileNavBar = () => {
  return (
    <div className="profile_nav_bar">
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            <img src={HostLogo} alt="host_logo" width="50px" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Stack direction="row" spacing={2}>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Stack>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default ProfileNavBar;
