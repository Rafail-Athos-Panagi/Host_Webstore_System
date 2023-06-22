import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CCardHeader, CRow } from "@coreui/react";
import { CChartBar, CChartDoughnut } from "@coreui/react-chartjs";
import { useDispatch } from "react-redux";
import { adminActions } from '../../../store/adminSlice';

const Charts = () => {
  const [monthlySales, setMonthlySales] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [top4DishesCounter, setTop4DishesCounter] = useState([]);
  const [top4DishesLabel, setTop4DishesLabel] = useState([]);
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();

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
          dispatch(adminActions.adminStats({
            monthlySalesStatistics: newMonthlySales,
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const orderDetailsRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ select: "*", from: "orderdetails" }),
    };
    fetch(`/api/select`, orderDetailsRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          const flattenedItems = data.flatMap((detail) => detail.itemID);

          const countByItemID = flattenedItems.reduce((count, itemID) => {
            count[itemID] = (count[itemID] || 0) + 1;
            return count;
          }, {});

          const sortedItemIDs = Object.keys(countByItemID).sort(
            (a, b) => countByItemID[b] - countByItemID[a]
          );

          const top4ItemIDs = sortedItemIDs.slice(0, 4);

          const top4ItemsWithCount = top4ItemIDs.map((itemID) => {
            return { itemID: itemID, count: countByItemID[itemID] };
          });

          const itemIDs = top4ItemsWithCount.map((item) => {
            return { itemID: +item.itemID };
          });
          const counts = top4ItemsWithCount.map((item) => item.count);
          
          setTop4DishesCounter(counts);
          dispatch(adminActions.adminStats({
            mostPopularDishesStatistics: counts,
          }));

          const top4MenuDishesLabel = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ select: "*", from: "menuitems" }),
          };
          fetch(`/api/select`, top4MenuDishesLabel)
            .then((res) => res.json())
            .then((data) => {
              if (data.sqlMessage) {
                console.log(data.sqlMessage);
              } else {
                itemIDs.forEach((item) => {
                  const match = data.find((d) => d.itemID === item.itemID);
                  if (match) {
                    item.itemID = match.itemName.toUpperCase();;
                  }
                });
                const newLabels = itemIDs.map((item) => item.itemID);

                setTop4DishesLabel(newLabels);
                dispatch(adminActions.adminStats({
                  mostPopularDishesLabels: newLabels,
                }));
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Monthly Sales</CCardHeader>
          <CCardBody>
            <CChartBar
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
                    label: "Monthly Sales 2023",
                    backgroundColor: "#f87979",
                    data: monthlySales,
                  },
                ],
              }}
              labels="months"
              height={400} // add height property
              width={400} // add width property
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Most Popular Dishes</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels: top4DishesLabel,
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: top4DishesCounter,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Charts;
