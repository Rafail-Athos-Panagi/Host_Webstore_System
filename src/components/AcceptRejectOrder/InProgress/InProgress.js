import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import OrderInfo from "../OrderInfo/OrderInfo";
import { useState } from "react";

const InProgress = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [inProgress, setInProgress] = useState(props.inProgress);

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const timeString = formattedHours + ":" + formattedMinutes + " " + ampm;

  const showOrderHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {openModal && (
        <OrderInfo
          onClose={closeModalHandler}
          answer={"Proceed To Packaging"}
          data={inProgress}
          proceed={props.proceed}
        />
      )}
      <div className={"order_wrapper"} onClick={showOrderHandler}>
        <div className="inside">
          <div>
            <DeliveryDiningIcon
              sx={{
                backgroundColor: "rgba(176, 173, 173, 0.2)",
                margin: "0 20px 20px 0",
                width: "calc(4rem + 20px)",
                height: "calc(4rem + 20px)",
                textAlign: "center",
                lineHeight: "40px",
                borderRadius: "50%",
                color: "rgb(58, 57, 57)",
                transition: "all 0.5s ease",
                padding: "20px",
              }}
            />
          </div>
          <div>
            <p className="username">
              {inProgress.firstName === "Guest"
                ? inProgress.firstName + " - ID:" + inProgress.orderID
                : inProgress.firstName + " " + inProgress.lastName + " - ID: " + inProgress.orderID}
            </p>
            <p className="address">
              {inProgress.streetName} , {inProgress.area} , {inProgress.city}
            </p>
            <p className="status">
              <MenuBookIcon
                sx={{
                  margin: "0 10px 10px 0",
                  width: "1.5rem",
                  height: "1.5rem",
                  textAlign: "center",
                  lineHeight: "40px",
                  borderRadius: "50%",
                  color: "rgba(173, 169, 169, 0.9)",
                  transition: "all 0.5s ease",
                }}
              />
              {inProgress.orderStatus}
            </p>
          </div>
        </div>

        <p>
          {timeString}
          <AccessAlarmsIcon
            sx={{
              margin: "0 10px 10px 0",
              width: "2rem",
              height: "2rem",
              textAlign: "center",
              lineHeight: "40px",
              borderRadius: "50%",
              transition: "all 0.5s ease",
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default InProgress;
