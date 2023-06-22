import React, { forwardRef , useState , useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from "../../../../../assets/logo/Logo.webp";
import "./CustomersStatistics.css";

const CustomerPrint = forwardRef((props, ref) => {
  const [customers, setCustomers] = useState([]);


  const currentYear = new Date().getFullYear();
  const currentDate = new Date();

  
  useEffect(() => {
    const waitingAnswerRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        select:
          "email , firstName , lastName , streetName , city , area , dateCreated",
        from: "users natural join customers natural join address",
      }),
    };
    fetch(`http://localhost:8080/api/select`, waitingAnswerRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          const sortedData = [...data].sort(
            (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
          );
          const top10RecentData = sortedData.slice(0, 10);
          setCustomers(top10RecentData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        <h1 className="table_title">Annual Customers</h1>
        <Table className="w-75 mx-auto" striped bordered hover>
          <thead>
            <th>No.</th>
            <th>Full Name</th>
            <th>Registered Date</th>
            <th>Email</th>
            <th>Address</th>
          </thead>
          <tbody>
            {customers.map((item, i) => {
              const formattedDate = new Date(item.dateCreated).toLocaleString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }
              );
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{formattedDate}</td>
                  <td>{item.email}</td>
                  <td>{item.streetName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
});

export default CustomerPrint;
