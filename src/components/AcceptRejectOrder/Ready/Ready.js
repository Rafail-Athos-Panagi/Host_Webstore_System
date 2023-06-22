import DoneIcon from "@mui/icons-material/Done";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import OrderInfo from "../OrderInfo/OrderInfo";
import { useState } from "react";

const Ready = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [ready, setReady] = useState(props.ready);

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
          answer={"Proceed To Delivery"}
          data={ready}
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
              {ready.firstName === "Guest"
                ? ready.firstName
                : ready.firstName + " " + ready.lastName}
            </p>
            <p className="address">
              {ready.streetName} , {ready.area} , {ready.city}
            </p>
            <p className="accepted">
              <DoneIcon
                sx={{
                  margin: "0 1px 10px 0",
                  width: "2rem",
                  height: "2rem",
                  textAlign: "center",
                  lineHeight: "40px",
                  borderRadius: "50%",
                  color: "green",
                  transition: "all 0.5s ease",
                }}
              />{" "}
              {ready.orderStatus}
            </p>
          </div>
        </div>

        <p className="price">€{ready.orderPrice}</p>
      </div>
    </div>
  );
};

export default Ready;
