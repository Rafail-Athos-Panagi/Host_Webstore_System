import { useEffect, useRef , useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./MonthlySalesStatistics.css";
import MonthlySalesPrint from "./MonthlySalesPrint";
import Manual from "../../../Manual";

const MonthlySalesStatistics = () => {
  const [monthlySales, setMonthlySales] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const currentYear = new Date().getFullYear();


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

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    title: "Online System Statistics",
    pageStyle: `
  @media print {
    body {
      margin: 0;
      padding: 0;
    }
    .table-page-break {
      page-break-after: always;
    }
    @page {
      margin: 0;
    }
  }
`,
  });

  const handleButtonClick = () => {
    handlePrint();
  };

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
      <div className="d-flex align-items-center">
      <Button style={{marginRight:4}} onClick={handleButtonClick} variant="success">
        Print Statistics
      </Button>
      <Manual title="Monthly sales manual" pageNumber={16}/>
        </div>
      <div style={{ display: "none" }}>
        <MonthlySalesPrint ref={componentRef} />
      </div>
      <div style={{ width: "100%", height: window.innerHeight }}>
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
};

export default MonthlySalesStatistics;
