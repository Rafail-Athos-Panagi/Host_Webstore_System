import { Table } from "react-bootstrap";
import React, { forwardRef  , useState , useEffect} from "react";
import { useSelector } from "react-redux";
import logo from "../../../../../assets/logo/Logo.webp";
import "./IncomeStatistics.css";

const IncomePrint = forwardRef((props, ref) => {
  const [monthlyIncome, setMonthlyIncome] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [allIncome, setAllIncome] = useState(0);

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
    const monthlyIncomeRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ select: "*", from: "orders" }),
    };
    fetch(`/api/select`, monthlyIncomeRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          const filteredData = data.filter(item => {
              const date = new Date(item.orderDate);
              return date.getFullYear() === currentYear;
            });
          const newMonthlyIncome = [...monthlyIncome];


          filteredData.map((newData, i) => {
            let date = new Date(newData.orderDate);
            let monthIndex = date.getMonth();
            newMonthlyIncome[monthIndex] += newData.orderPrice;
          });

          let sum = 0;
          for (let i = 0; i < newMonthlyIncome.length; i++) {
            sum = sum + newMonthlyIncome[i];
          }

          setAllIncome(sum);
          setMonthlyIncome(newMonthlyIncome);
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
        <h1 className="table_title">Annual Income</h1>
        <Table className="w-75 mx-auto" striped bordered hover>
          <thead>
            <th>No.</th>
            <th>Month</th>
            <th>Income</th>
          </thead>
          <tbody>
            {monthlyIncome.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{months[i % 12]}</td>
                  <td>€{item}</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td className="text-right">
                <strong>Total: €{allIncome}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
});

export default IncomePrint;
