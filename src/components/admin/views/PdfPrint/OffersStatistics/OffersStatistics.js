import { useRef , useState , useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./OffersStatistics.css";
import OffersPrint from "./OffersPrint";
import Manual from "../../../Manual";

const OffersStatistics = () => {
  const [offerCounter, setOfferCounter] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [totalOffers, setTotalOffers] = useState(0);

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
      <Manual title="Offers manual" pageNumber={16}/>
        </div>
      <div style={{ display: "none" }}>
        <OffersPrint ref={componentRef} />
      </div>
      <div style={{ width: "100%", height: window.innerHeight }}>
        <h1 className="table_title">Annual Offer Sales</h1>
        <Table className="w-75 mx-auto" striped bordered hover>
          <thead>
            <th>No.</th>
            <th>Month</th>
            <th>Number Of Offers</th>
          </thead>
          <tbody>
            {offerCounter.map((item, i) => {
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
    </>
  );
};

export default OffersStatistics;
