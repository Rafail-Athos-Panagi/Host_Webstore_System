import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./AwaitConfirmation.css";
import ProgressWidget from "./ProgressWidget/ProgressWidget";
import WaitingBanner from "./WaitingBanner/WaitingBanner";
import UserID from "../hooks/userid";
import { useLocation } from "react-router";
//import { ProgressBar, Step } from "react-step-progress-bar";

export default function AwaitConfirmation() {
  const [orderStatus, setOrderStatus] = useState("pending")
  const userIDOrder = React.useContext(UserID);
  const {setUserID} = React.useContext(UserID);
  const location = useLocation();
  const { orderID,orderStatusProp } = location.state;

  console.log("Order Status Prop");
  console.log(orderStatusProp);


  useEffect(() => {
    let intervalid;
    
  if(userIDOrder.userID == null && orderID!==null){

    const fetchUserIDGuest = async () => {
      const request ={
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          select:"userID",
          from:"orders",
          where:`orderID = ${orderID}`,
        }),
      }

      const fetchuserid= await fetch('/api/select', request);

      if(!fetchuserid.ok){
        throw new Error("Could not retrieve user");
      }

      const data = await fetchuserid.json();
      setUserID(data[0].userID);
    }
    

    fetchUserIDGuest();
   
  }

    if(userIDOrder.userID !== null && orderID!==null){
        intervalid = setInterval(async () => {

          const checkOrderStatus = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderID:orderID,
            }),
          };

          const res = await fetch(`/api/order/status`, checkOrderStatus)

          if(!res.ok){
            throw new Error("Could not retrieve order");
          }

          const data = await res.json();
          setOrderStatus(data[0].orderStatus);
          
        }, 15000);  
  }

    return () => {
      clearInterval(intervalid);
    };
    
  },[orderID, userIDOrder.userID]);
  
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#a5d3d6" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard
                className="card-stepper text-black"
                style={{ borderRadius: "16px" }}
              >
                {orderStatus==='pending' && <WaitingBanner/>}
                {orderStatus==='cancelled' && <div className="text-center" style={{marginTop:'10px'}}>
                  <MDBTypography tag="h1" variant="h1" className="mb-4" style={{color:"#DF3737  ", fontWeight:"600", textShadow:"1px 1px #000"}}>
                    Order Cancelled
                  </MDBTypography>
                  <MDBTypography tag="h4" variant="h4" className="mb-4" style={{color:"#DF3737  ", fontWeight:"600", textShadow:"1px 1px #000"}}>
                    Please contact us if you have any questions or try again
                  </MDBTypography>
                  </div>}
                <MDBCardBody className="p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <MDBTypography tag="h4" className="mb-0" style={{color:"#0C777F", fontWeight:"600", textShadow:"1px 1px #000"}}>
                        Order Number{" "}
                        <span className="font-weight-bold" style={{color:"#F58C23"}}>
                         #{orderID}
                        </span>
                      </MDBTypography>
                    </div>
                    <div className="text-end">
                      <p className="mb-0">
                        Order Total:{" "}
                        <span className="font-weight-bold">
                          
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <ProgressWidget orderStatus={orderStatusProp? orderStatusProp : orderStatus}/>
                    <br />
                    <br />
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon
                        style={{ color: "#2b2b2b" }}
                        fas
                        icon="clipboard-list me-lg-4 mb-3 mb-lg-0"
                        size="3x"
                      />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Sent</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon
                        style={{ color: "#2b2b2b" }}
                        fas
                        icon="box-open me-lg-4 mb-3 mb-lg-0"
                        size="3x"
                      />
                      <div>
                        <p className="fw-bold mb-1">In</p>
                        <p className="fw-bold mb-0">Progress</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon
                        style={{ color: "#2b2b2b" }}
                        fas
                        icon="shipping-fast me-lg-4 mb-3 mb-lg-0"
                        size="3x"
                      />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Ready</p>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
