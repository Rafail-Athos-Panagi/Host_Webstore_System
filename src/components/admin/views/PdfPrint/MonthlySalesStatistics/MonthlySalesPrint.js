import React, { forwardRef , useEffect , useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from "../../../../../assets/logo/Logo.webp";
import "./MonthlySalesStatistics.css";

const MonthlySalesPrint = forwardRef((props, ref) => {
  const [monthlySales, setMonthlySales] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

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
    const orderRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ select: "*", from: "orders" }),
    };
    fetch(`/api/select`, orderRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
            const filteredData = data.filter(item => {
              const date = new Date(item.orderDate);
              return date.getFullYear() === currentYear;
            });
          const newMonthlySales = [...monthlySales];
          filteredData.map((newData, i) => {
            let date = new Date(newData.orderDate);
            let monthIndex = date.getMonth();
            newMonthlySales[monthIndex] += 1;
          });
          setMonthlySales(newMonthlySales);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } , [])

  let sum = 0;

  for (let i = 0; i < monthlySales.length; i++) {
    sum += monthlySales[i];
  }

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
        <h1 className="table_title">Annual Monthly Sales</h1>
        <Table className="w-75 mx-auto" striped bordered hover>
          <thead>
            <th>No.</th>
            <th>Month</th>
            <th>Number Of Monthly Sales</th>
          </thead>
          <tbody>
            {monthlySales.map((item, i) => {
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
                <strong>Total: {sum}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
});

export default MonthlySalesPrint;
