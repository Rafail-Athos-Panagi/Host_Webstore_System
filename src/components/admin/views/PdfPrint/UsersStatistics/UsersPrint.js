import React, { forwardRef , useState , useEffect } from "react";
import { Table } from "react-bootstrap";
import logo from "../../../../../assets/logo/Logo.webp";
import "./UsersStatistics.css";

const UsersPrint = forwardRef((props, ref) => {
  const [monthlyCustomers, setMonthlyCustomers] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [allUsers, setAllUsers] = useState(0);
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
    const customersRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ select: "*", from: "customers" }),
    };
    fetch(`/api/select`, customersRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          const filteredData = data.filter(item => {
            const date = new Date(item.dateCreated);
            return date.getFullYear() === currentYear;
          });
          const newMonthlyCustomers = [...monthlyCustomers];
          filteredData.map((newData, i) => {
            let date = new Date(newData.dateCreated);
            let monthIndex = date.getMonth();
            newMonthlyCustomers[monthIndex] += 1;
          });
          let count = 0;
          for (let i = 0; i < newMonthlyCustomers.length; i++) {
            count = count + newMonthlyCustomers[i];
          }
          setAllUsers(count);
          setMonthlyCustomers(newMonthlyCustomers);
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

        <h1 className="table_title">Annual Users</h1>
        <Table className="w-75 mx-auto" striped bordered hover>
          <thead>
            <th>No.</th>
            <th>Month</th>
            <th>Number Of Users</th>
          </thead>
          <tbody>
            {monthlyCustomers.map((item, i) => {
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
                <strong>Total: {allUsers}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
});

export default UsersPrint;
