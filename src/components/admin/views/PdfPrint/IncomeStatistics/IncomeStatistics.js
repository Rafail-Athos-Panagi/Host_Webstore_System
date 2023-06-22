import { useRef , useState , useEffect} from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import IncomePrint from "./IncomePrint";
import Manual from "../../../Manual";

import "./IncomeStatistics.css";

const IncomeStatistics = () => {
  const [monthlyIncome, setMonthlyIncome] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [allIncome, setAllIncome] = useState(0);
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
      <div className="d-flex align-items-center">
      <Button style={{marginRight:4}} onClick={handleButtonClick} variant="success">
        Print Statistics
      </Button>
      <Manual title="Income manual" pageNumber={15}/>
        </div>
      <div style={{ display: "none" }}>
        <IncomePrint ref={componentRef} />
      </div>
      <div style={{ width: "100%", height: window.innerHeight }}>
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
};

export default IncomeStatistics;
