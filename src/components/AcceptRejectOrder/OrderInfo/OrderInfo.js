import Modal from "../../UI/Modal/Modal";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./OrderInfo.css";

import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const OrderInfo = (props) => {
  const [orderAnswer, setAnswer] = useState(props.answer);
  const [data, setDatas] = useState(props.data);
  const [products, setProducts] = useState([]);
  const [extra, setExtra] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const productsRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        select:
          "itemName , menuitems.itemPrice , quantity , orderdetails.itemID , comment",
        from: "orderdetails , menuitems",
        where: `orderdetails.orderID = ${data.orderID} and orderdetails.itemID = menuitems.itemID`,
      }),
    };
    fetch(`/api/select`, productsRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const totalPriceRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        select: "orderPrice",
        from: "orders",
        where: `orderID = ${data.orderID}`,
      }),
    };
    fetch(`/api/select`, totalPriceRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          const myNumber = data[0].orderPrice;
          console.log(data);
          setTotalPrice(myNumber);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const extraRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        select: "*",
        from: "extraItemsOrderDetails",
        where: `orderID=${data.orderID}`,
      }),
    };
    fetch(`/api/select`, extraRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          setExtra(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const ordersWithProducts = products.map((order) => {
    const date = new Date(order.orderDate);

    const orderProducts = extra.reduce((acc, product) => {
      if (product.itemID === order.itemID) {
        acc.push({
          extraItemName: product.extraItemName,
          extraItemProductPrice: product.extraItemPrice,
          extraItemQuantity: product.orderedQuantity,
        });
      }
      return acc;
    }, []);

    return {
      itemID: order.itemID,
      itemName: order.itemName,
      itemPrice: order.itemPrice,
      quantity: order.quantity,
      comment: order.comment,
      extraItems: orderProducts,
    };
  });

  const date = new Date(data.orderDate);

  const endDate = date.toLocaleString("en-us", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const date1 = new Date(data.orderTimeOfStatus);
  const formattedTime = date1.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const acceptHandler = async () => {
    let status = "";
    if (data.orderStatus === "pending") {
      status = "in Progress";
    } else if (data.orderStatus === "in Progress") {
      status = "ready";
    } else if (data.orderStatus === "ready") {
      status = "delivered";
    }

    const acceptRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: "orders",
        columns: `orderStatus="${status}" ,orderTimeOfStatus=default`,
        where: `orderID=${data.orderID}`,
      }),
    };

    const res = await fetch(`/api/update`, acceptRequest);

    if (!res.ok) {
      throw new Error("Could not save changes for menu item");
    }

    props.onClose();
    props.proceed();
  };

  const rejectHandler = async () => {
    let status = "";
    status = "cancelled";
    const rejectRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: "orders",
        columns: `orderStatus="${status}"`,
        where: `orderID=${data.orderID}`,
      }),
    };

    const res = await fetch(`/api/update`, rejectRequest);

    if (!res.ok) {
      throw new Error("Could not save changes for menu item");
    }

    try {
      rejectHandler();
    } catch (error) {
      console.log(error);
    }

    props.onClose();
    props.proceed();
  };

  return (
    <Modal onClose={props.onClose} styleOfTheModal={"modalWhite"}>
      <div className="main_wrap">
        <div className="order_info">
          <div>
            <p style={{ fontWeight: "bold" }}>Order ID</p>
            <p style={{ fontWeight: "bold" }}>Placed on:</p>
          </div>
          <div>
            <p>{data.orderID}</p>
            <p>
              {endDate} - {formattedTime}
            </p>
          </div>
        </div>
        <div className="order_user_info">
          <p className="username">
            {data.firstName === "Guest"
              ? data.firstName
              : data.firstName + " " + data.lastName}
          </p>
          <div className="inf">
            <PhoneIcon />
            <p>{data.phoneNumber}</p>
          </div>
          <div className="inf">
            <MailIcon />
            <p>{data.email === "Guest" ? " - " : data.email}</p>
          </div>
          <div className="inf">
            <LocationOnIcon />
            <p>
              {data.streetName} {data.postalCode} {data.houseNumber} ,{" "}
              {data.area} , {data.city}
            </p>
          </div>
        </div>

        <div className="order_menu_info">
          {ordersWithProducts.map((products, index) => {
            return (
              <div key={index}>
                <div className="order">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "left",
                    }}
                  >
                    <span>{products.quantity} x </span>
                    <span className="menu">{products.itemName}</span>
                  </div>
                  <div>
                    <span className="price">€{products.itemPrice}</span>
                  </div>
                </div>
                <div
                  style={{
                    padding: "1rem",
                  }}
                >
                  {products.comment ? <div><span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                    Comment
                  </span>
                  <span style={{ fontSize: "1.2rem", color: "grey" }}>
                    {products.comment}
                  </span></div> : ""}
                  
                </div>
                <hr></hr>
                <div>
                  {products.extraItems.map((extraItems, index) => {
                    return (
                      <div className="order_extra" key={index}>
                        <div style={{ display: "flex" }}>
                          {" "}
                          <p>{extraItems.extraItemQuantity} x</p>{" "}
                          <p className="menu">{extraItems.extraItemName}</p>
                        </div>
                        <p>€{extraItems.extraItemProductPrice}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="orderTotalPrice">
            <p>Total Price</p>
            <p>€{totalPrice}</p>
          </div>
        </div>
        {orderAnswer && (
          <div className="buttons">
            <Button
              variant="contained"
              color="error"
              className="reject"
              onClick={rejectHandler}
              sx={{ width: "30%", height: "3rem", margin: "1rem" }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="success"
              className="accept"
              onClick={acceptHandler}
              sx={{ width: "60%", height: "3rem", margin: "1rem" }}
            >
              {orderAnswer}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default OrderInfo;
