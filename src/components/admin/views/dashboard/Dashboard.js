import React from "react";

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPeople } from "@coreui/icons";

import Charts from "../charts/Charts";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { useEffect } from "react";
import { useState, useRef } from "react";
import AdminPrintStatistics from "../PdfPrint/AdminPrintStatistics";
import { useDispatch } from "react-redux";
import { adminActions } from "../../../store/adminSlice";
import { useReactToPrint } from "react-to-print";
import { Button } from "react-bootstrap";
import Manual from "../../Manual";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();

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
    fetch(`/api/select`, waitingAnswerRequest)
      .then((res) => res.json())
      .then((data) => {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
        } else {
          const sortedData = [...data].sort(
            (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
          );
          const top10RecentData = sortedData.slice(0, 10);
          console.log(top10RecentData);
          setCustomers(top10RecentData);
          dispatch(
            adminActions.adminStats({
              recentlyAddedUsersStatistics: top10RecentData,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      size: landscape;
    }
  }
`,
  });

  const handleButtonClick = () => {
    handlePrint();
  };

  return (
    <>
      <div>
        <div className="d-flex">
        <Button style={{marginBottom: "2rem", marginRight:"1rem"}}variant="success" onClick={handleButtonClick}>Print Statistics</Button>
        <Manual title="Dashboard manual" pageNumber={7}/>
        </div>
        <div style={{ display: "none" }}>
          <AdminPrintStatistics ref={componentRef} />
        </div>
      </div>
      <WidgetsDropdown />
      <Charts />
      <br />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Recently Added Users</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Email
                    </CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Area
                    </CTableHeaderCell>
                    <CTableHeaderCell>City</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {customers.map((item, index) => {
                    console.log(item.dateCreated);
                    const formattedDate = new Date(
                      item.dateCreated
                    ).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });
                    return (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                          <CAvatar color="secondary">
                            {item.firstName.charAt(0)}
                            {item.lastName.charAt(0)}
                          </CAvatar>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>
                            <div>
                              {item.firstName} {item.lastName}
                            </div>
                            <div className="small text-medium-emphasis">
                              <span>New</span> | Registered: {formattedDate}
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <div>
                            <p>{item.email}</p>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>
                            <p>{item.streetName}</p>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <div>
                            <p>{item.area}</p>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>
                            <p>{item.city}</p>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
