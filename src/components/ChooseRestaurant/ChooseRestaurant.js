import "./ChooseRestaurant.css";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Row from "react-bootstrap/Row";
import DayRestaurant from "../../assets/img/day_restaurant.png";
import NightRestaurant from "../../assets/img/night_restaurant.gif";
import { Button, Card } from "react-bootstrap";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ChooseRestaurant() {
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 550,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  return (
    <Paper elevation={5} className="main_box">
      <div className="restaurants">
        <Row className="Row_box">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageButton
              focusRipple
              style={{
                width: "48%",
                margin: "1rem 1rem",
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${DayRestaurant})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  <b>Host Larnaca (Day Mode)</b>
                  <br/>
                  Our menu available from 11:30-16:00
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
            
            <ImageButton
              focusRipple
              style={{
                width: "48%",
                
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${NightRestaurant})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  <b>Host Street Food (night mode)</b>
                  <br/>
                  Our menu available from 16:00-23:00
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          </Box>
        </Row>
      </div>
    </Paper>
  );
}
