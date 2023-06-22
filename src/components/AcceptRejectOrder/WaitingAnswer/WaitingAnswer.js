import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import OrderInfo from "../OrderInfo/OrderInfo";
import { useState } from "react";

const WaitingAnswer = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [waitingAnswer, setWaitingAnswer] = useState(props.waiting);

  const date = new Date(waitingAnswer.orderFirstTime);
  const formattedDate = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

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
          answer={"Accept"}
          data={waitingAnswer}
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
              {waitingAnswer.firstName === "Guest"
                ? waitingAnswer.firstName + " - ID: " + waitingAnswer.orderID
                : waitingAnswer.firstName + " " + waitingAnswer.lastName + " - ID: " + waitingAnswer.orderID}
            </p>
            <p className="address">
              {waitingAnswer.streetName} , {waitingAnswer.area} ,{" "}
              {waitingAnswer.city}
            </p>
            <p className="status">
              <HourglassTopIcon
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
              {waitingAnswer.orderStatus}
            </p>
          </div>
        </div>

        <p>
          {formattedDate}
          <AccessAlarmsIcon
            sx={{
              margin: "0 10px 10px 0",
              width: "2rem",
              height: "2rem",
              textAlign: "center",
              lineHeight: "40px",
              borderRadius: "50%",
              color: "rgba(173, 169, 169, 0.9)",
              transition: "all 0.5s ease",
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default WaitingAnswer;
