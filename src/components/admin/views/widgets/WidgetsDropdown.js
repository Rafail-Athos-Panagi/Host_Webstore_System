import React, { useEffect, useState } from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { useDispatch } from "react-redux";
import { adminActions } from "../../../store/adminSlice";

const WidgetsDropdown = () => {
  const [monthlyCustomers, setMonthlyCustomers] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [allUsers, setAllUsers] = useState(0);
  const [minUsers, setMinUsers] = useState(0);
  const [maxUsers, setMaxUsers] = useState(0);

  const [monthlyIncome, setMonthlyIncome] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [allIncome, setAllIncome] = useState(0);
  const [minIncome, setMinIncome] = useState(0);
  const [maxIncome, setMaxIncome] = useState(0);

  const [averageOrderValue, setAverageOrderValue] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [monthCounter, setMonthCounter] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [totalAverageOrderValue, setTotalAverageOrderValue] = useState(0);
  /*   const [minAverageOrderValue, setMinAverageOrderValue] = useState(0);
  const [maxAverageOrderValue, setMaxAverageOrderValue] = useState(0); */

  const [offerCounter, setOfferCounter] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [totalOffers, setTotalOffers] = useState(0);

  /* const offers = useSelector((state)=>state.menu.menuItems);
  console.log(offers); */

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const dispatch = useDispatch();

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

          const minUser = Math.min(...newMonthlyCustomers);
          const maxUser = Math.max(...newMonthlyCustomers);
          setMinUsers(minUser);
          setMaxUsers(maxUser);
          setAllUsers(count);
          setMonthlyCustomers(newMonthlyCustomers);

          dispatch(
            adminActions.adminStats({
              usersStatistics: newMonthlyCustomers,
              totalUsers: count,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });

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
          const newAverageOrderValue = [...averageOrderValue];
          const newMonthCounter = [...monthCounter];
          const newOffersCounter = [...offerCounter];
          const offerItems = filteredData.filter(
            (item) => item.itemCategory === "Offers"
          );

          filteredData.map((newData, i) => {
            let date = new Date(newData.orderDate);
            let monthIndex = date.getMonth();
            newMonthlyIncome[monthIndex] += newData.orderPrice;
            newMonthCounter[monthIndex] += 1;
            newOffersCounter[monthIndex] += 1;
          });

          let totalAverage = 0;
          for (let i = 0; i < newMonthCounter.length; i++) {
            if (newMonthlyIncome[i] === 0) {
              continue;
            }
            newAverageOrderValue[i] = newMonthlyIncome[i] / newMonthCounter[i];
            console.log(newAverageOrderValue[i]);
            newAverageOrderValue[i] = Math.round(newAverageOrderValue[i]);
            totalAverage = totalAverage + newAverageOrderValue[i];
          }

          if (totalAverage !== 0) {
            totalAverage = totalAverage / currentMonth;
            totalAverage = Math.round(totalAverage);
          } else totalAverage = 0;

          let sum = 0;
          for (let i = 0; i < newMonthlyIncome.length; i++) {
            sum = sum + newMonthlyIncome[i];
          }

          let offerSum = 0;
          for (let i = 0; i < newOffersCounter.length; i++) {
            offerSum = offerSum + newOffersCounter[i];
          }

          const minIncome = Math.min(...newMonthlyIncome);
          const maxIncome = Math.max(...newMonthlyIncome);

          /* const minAverage = Math.min(...newAverageOrderValue);
          const maxAverage = Math.max(...newAverageOrderValue); */

          setMinIncome(minIncome);
          setMaxIncome(maxIncome);
          setAllIncome(sum);
          setMonthlyIncome(newMonthlyIncome);

          /* setMinAverageOrderValue(minAverage);
          setMaxAverageOrderValue(maxAverage); */
          setTotalAverageOrderValue(totalAverage);
          setAverageOrderValue(newAverageOrderValue);

          dispatch(
            adminActions.adminStats({
              incomeStatistics: newMonthlyIncome,
              totalIncome: sum,
              averageOrderValueStatistics: newAverageOrderValue,
              totalAverageOrderValue: totalAverage,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });

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

          dispatch(
            adminActions.adminStats({
              offerSalesStatistics: newOffersCounter,
              totalOffers: offerSum,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={<>{allUsers} </>}
          title="Users"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [
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
                ],
                datasets: [
                  {
                    label: "Customers",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-primary"),
                    data: monthlyCustomers,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: minUsers,
                    max: maxUsers,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<>€{allIncome.toFixed(2)} </>}
          title="Income"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [
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
                ],
                datasets: [
                  {
                    label: "Income",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-info"),
                    data: monthlyIncome,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: minIncome,
                    max: maxIncome,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              €{totalAverageOrderValue.toFixed(2)}{" "}
              {/*  <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title="Average Order Price"
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [
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
                ],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: averageOrderValue,
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={totalOffers}
          title="Offer Sales"
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [
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
                ],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: offerCounter,
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
