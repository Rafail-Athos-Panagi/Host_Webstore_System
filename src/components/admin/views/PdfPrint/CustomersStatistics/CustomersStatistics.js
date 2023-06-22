import { useRef , useState , useEffect} from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./CustomersStatistics.css";
import CustomerPrint from "./CustomerPrint";
import Manual from "../../../Manual";

const CustomersStatistics = () => {
  const [customers, setCustomers] = useState([]);


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
      <div className="d-flex align-items-center">
      <Button style={{marginRight:4}} onClick={handleButtonClick} variant="success">
        Print Statistics
      </Button>
      <Manual title="Customers manual" pageNumber={17}/>
        </div>
      <div style={{ display: "none" }}>
        <CustomerPrint ref={componentRef} />
      </div>
      <div style={{ width: "100%", height: window.innerHeight }}>
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
};

export default CustomersStatistics;
