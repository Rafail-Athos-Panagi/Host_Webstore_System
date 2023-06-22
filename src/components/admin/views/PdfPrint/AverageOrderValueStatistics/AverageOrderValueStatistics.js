import { useRef , useState , useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./AverageOrderValueStatistics.css";
import AverageOrderPrint from "./AverageOrderPrint";
import Manual from "../../../Manual";

const AverageOrderValueStatistics = () => {
  const [averageOrderValue, setAverageOrderValue] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [monthlyIncome, setMonthlyIncome] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [monthCounter, setMonthCounter] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [totalAverageOrderValue, setTotalAverageOrderValue] = useState(0);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

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

          filteredData.map((newData, i) => {
            let date = new Date(newData.orderDate);
            let monthIndex = date.getMonth();
            newMonthlyIncome[monthIndex] += newData.orderPrice;
            newMonthCounter[monthIndex] += 1;
          });

          let totalAverage = 0;
          for (let i = 0; i < newMonthCounter.length; i++) {
            if (newMonthlyIncome[i] === 0) {
              continue;
            }
            newAverageOrderValue[i] = newMonthlyIncome[i] / newMonthCounter[i];
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
          setTotalAverageOrderValue(totalAverage);
          setAverageOrderValue(newAverageOrderValue);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  return (
    <>
      <div className="d-flex align-items-center">
      <Button style={{marginRight:4}} onClick={handleButtonClick} variant="success">
        Print Statistics
      </Button>
      <Manual title="Average order manual" pageNumber={15}/>
        </div>
      <div style={{ display: "none" }}>
        <AverageOrderPrint ref={componentRef} />
      </div>
      <div style={{ width: "100%", height: window.innerHeight }}>
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
    </>
  );
};

export default AverageOrderValueStatistics;
