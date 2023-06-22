import React, { forwardRef } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from "../../../../assets/logo/Logo.webp";
import "./AdminPrintStatistics.css";

const AdminPrintStatistics = forwardRef((props, ref) => {
  const users = useSelector((state) => state.admin.usersStatistics);
  const totalUsers = useSelector((state) => state.admin.totalUsers);
  const income = useSelector((state) => state.admin.incomeStatistics);
  const totalIncome = useSelector((state) => state.admin.totalIncome);
  const averageOrderValue = useSelector(
    (state) => state.admin.averageOrderValueStatistics
  );
  const totalAverageOrderValue = useSelector(
    (state) => state.admin.totalAverageOrderValue
  );
  const offerSales = useSelector((state) => state.admin.offerSalesStatistics);
  const totalOffers = useSelector((state) => state.admin.totalOffers);
  const monthlySales = useSelector(
    (state) => state.admin.monthlySalesStatistics
  );
  const mostPopularDishes = useSelector(
    (state) => state.admin.mostPopularDishesStatistics
  );
  const mostPopularDisheslabels = useSelector(
    (state) => state.admin.mostPopularDishesLabels
  );
  const recentlyAddedUsers = useSelector(
    (state) => state.admin.recentlyAddedUsersStatistics
  );
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

  let sum = 0;

  for (let i = 0; i < monthlySales.length; i++) {
    sum += monthlySales[i];
  }
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();

  return (
    <div ref={ref}>
      <div style={{ width: "100%", height: window.innerHeight }}>
        <h1 className="text-center my-3 border py-2">
          Online Food Ordering Statistics
        </h1>
        <div className="table-page-break">
          <div className="header_stats">
            <img src={logo} width="200px" height="200px"></img>
            <div>
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
          <div>
            <hr></hr>
          </div>
          <div className="details">
            <p>
              <span className="emph">Current Date:</span>{" "}
              {currentDate.toLocaleDateString()}
            </p>
            <p>
              Below is a current report statement of your Online Food Ordering
              System.
            </p>
            <p>It encompasses the following categories.</p>
          </div>
          <div>
            <Table>
              <thead>
                <th>Category</th>
                <th>Total Number</th>
              </thead>
              <tbody>
                <tr>
                  <td>Annual Users</td>
                  <td>{totalUsers}</td>
                </tr>
                <tr>
                  <td>Annual Income</td>
                  <td>{totalIncome}</td>
                </tr>
                <tr>
                  <td>Annual Average Order Value</td>
                  <td>{totalAverageOrderValue}</td>
                </tr>
                <tr>
                  <td>Annual Offers</td>
                  <td>{totalOffers}</td>
                </tr>
                <tr>
                  <td>Annual Monthly Sales</td>
                  <td>{sum}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div>
          <h1 style={{ textAlign: "center" }} className="table_title">
            Annual Users
          </h1>
          <Table className="w-75 mx-auto" striped bordered hover>
            <thead>
              <th>No.</th>
              <th>Month</th>
              <th>Number Of Users</th>
            </thead>
            <tbody>
              {users.map((item, i) => {
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
                  <strong>Total: {totalUsers}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="table-page-break">
          <h1 className="table_title push">Annual Income</h1>
          <Table className="w-75 mx-auto" striped bordered hover>
            <thead>
              <th>No.</th>
              <th>Month</th>
              <th>Income</th>
            </thead>
            <tbody>
              {income.map((item, i) => {
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
                  <strong>Total: €{totalIncome}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="table-page-break">
          <h1 className="table_title">Annual Average Order Value</h1>
          <Table className="w-75 mx-auto" striped bordered hover>
            <thead>
              <th>No.</th>
              <th>Month</th>
              <th>Average Order Value</th>
            </thead>
            <tbody>
              {averageOrderValue.map((item, i) => {
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
                  <strong>Total: €{totalAverageOrderValue}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="table-page-break">
          <h1 className="table_title">Annual Offers</h1>
          <Table className="w-75 mx-auto" striped bordered hover>
            <thead>
              <th>No.</th>
              <th>Month</th>
              <th>Number Of Offers</th>
            </thead>
            <tbody>
              {offerSales.map((item, i) => {
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
        <div className="table-page-break">
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
        <div className="table-page-break">
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
              {recentlyAddedUsers.map((item, i) => {
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
      </div>
    </div>
  );
});

export default AdminPrintStatistics;
