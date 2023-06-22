import React, { forwardRef , useState , useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from "../../../../../assets/logo/Logo.webp";
import "./OffersStatistics.css";

const OffersPrint = forwardRef((props, ref) => {
  const [offerCounter, setOfferCounter] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [totalOffers, setTotalOffers] = useState(0);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const currentDate = new Date();

  useEffect(() => {
    const offersRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        select: "*",
        from: "orders JOIN orderdetails ON orders.orderID = orderdetails.orderID JOIN menuitems on orderdetails.itemID = menuitems.itemID",
      }),
    };
    fetch(`/api/select`, offersRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          const filteredData = data.filter(item => {
                const date = new Date(item.orderDate);
                return date.getFullYear() === currentYear;
              });
          const newOffersCounter = [...offerCounter];
          const offerItems = filteredData.filter(
            (item) => item.itemCategory === "Offers"
          );

          offerItems.map((newData, i) => {
            let date = new Date(newData.orderDate);
            let monthIndex = date.getMonth();
            newOffersCounter[monthIndex] += 1;
          });

          let offerSum = 0;
          for (let i = 0; i < newOffersCounter.length; i++) {
            offerSum = offerSum + newOffersCounter[i];
          }

          setOfferCounter(newOffersCounter);
          setTotalOffers(offerSum);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } , [])

  return (
    <>
      <div ref={ref} style={{ width: "100%", height: window.innerHeight }}>
        <div>
          <h1 className="text-center my-3 border py-2">
            Online Food Ordering Statistics
          </h1>
          <div className="header_stats">
            <img src={logo} width="200px" height="200px"></img>
            <div>
              <p>
                <span className="emph">Current Date:</span>{" "}
                {currentDate.toLocaleDateString()}
              </p>
              <p>
                <span className="emph">Address:</span> Νικόδημου Μυλωνά 18-19
              </p>
              <p>
                <span className="emph">PostalCode:</span> 6050
              </p>
              <p>
                <span className="emph">City:</span> Λάρνακα
              </p>
              <p>
                <span className="emph">From:</span> 1/1/{currentYear}
                <span className="emph"> To:</span>{" "}
                {currentDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <hr></hr>
        </div>

        <h1 className="table_title">Annual Offers</h1>
        <Table className="w-75 mx-auto" striped bordered hover>
          <thead>
            <th>No.</th>
            <th>Month</th>
            <th>Number Of Offers</th>
          </thead>
          <tbody>
            {offerCounter.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{months[i % 12]}</td>
                  <td>{item}</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td className="text-right">
                <strong>Total: {totalOffers}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
});

export default OffersPrint;
