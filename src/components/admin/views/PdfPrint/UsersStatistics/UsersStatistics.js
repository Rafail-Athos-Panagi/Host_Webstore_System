import { useEffect, useRef , useState} from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Table } from "react-bootstrap";
import "./UsersStatistics.css";
import UsersPrint from "./UsersPrint";
import Manual from "../../../Manual";

const UsersStatistics = () => {

   const [monthlyCustomers, setMonthlyCustomers] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [allUsers, setAllUsers] = useState(0);
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

  const handleButtonClick = () => {
    handlePrint();
  };

  return (
    <>
      <div className="d-flex align-items-center">
      <Button style={{marginRight:4}} onClick={handleButtonClick} variant="success">
        Print Statistics
      </Button>
      <Manual title="Users manual" pageNumber={14}/>
        </div>
      <div style={{ display: "none" }}>
        <UsersPrint ref={componentRef} />
      </div>
      <div style={{ width: "100%", height: window.innerHeight }}>
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
};

export default UsersStatistics;
