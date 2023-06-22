import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

import WaittingAnswer from "./WaitingAnswer/WaitingAnswer";
import InProgress from "./InProgress/InProgress";
import Ready from "./Ready/Ready";

import "./AcceptRejectOrder.css";
import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import UserID from "../hooks/userid";

const AcceptRejectOrder = () => {
  const [requests, setRequests] = useState([]);
  const [waitingAnswer, setWaitingAnswer] = useState([]);
  const [ready, setReady] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { setUserID } = useContext(UserID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = new Date().toLocaleString('en-US', { weekday: 'long' });


  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((refresh) => !refresh);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* console.log(today); */

  useEffect(() => {
    const fetchData = async () => {
      const waitingAnswerRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          select:
            "email , firstName , lastName , streetName , houseNumber , phoneNumber , city , area , postalCode , buildingName , orderStatus , orderPrice , orderDate , orderID , orderTimeOfStatus , orderFirstTime",
          from: "users natural join customers natural join address natural join orders",
        }),
      };
      fetch(`/api/select`, waitingAnswerRequest)
        .then((res) => res.json())
        .then((data1) => {
          if (data1.sqlMessage) {
            console.log(data1.sqlMessage);
          } else {
            setRequests(data1);

            const guestRequest = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                select:
                  " streetName , houseNumber , phoneNumber , city , area , postalCode , buildingName , orderStatus , orderPrice , orderDate , orderID , orderTimeOfStatus , orderFirstTime",
                from: "users natural join address natural join orders",
              }),
            };


            fetch(`/api/select`, guestRequest)
              .then((res) => res.json())
              .then((data2) => {
                if (data2.sqlMessage) {
                  console.log(data2.sqlMessage);
                } else {

                  console.log(data2);
                  const tempData = data2.map((item) => ({
                    ...item,
                    firstName: "Guest",
                    lastName: "Guest",
                    email: "Guest",
                  }));

                  /* const firstArray = data1.filter((item) => ) */
                  const firstArray = data1.filter((item) => {
                    const date = new Date(item.orderDate);
                    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
                    if (dayOfWeek === today) {
                      return true
                    }
                    else {
                      return false
                    }
                  })

                  const guestOrders = tempData.filter(
                    (obj2) =>
                      !data1.some((obj1) => obj1.orderID === obj2.orderID)
                  );
                  console.log(guestOrders);

                  console.log("today is");
                  console.log(today);

                  const secondArray = guestOrders.filter((item) => {
                    const date = new Date(item.orderDate);
                    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
                    console.log(dayOfWeek);
                    if (dayOfWeek === today) {
                      console.log("in true")
                      return true;
                      
                    }
                    else {
                      console.log("in false")
                      return false;
                    }
                  })

                  console.log(secondArray);

                  const mergedArray = [...firstArray, ...secondArray];

                  const filteredWaiting = mergedArray.filter(
                    (datas) => datas.orderStatus === "pending"
                  );
                  const filteredInProgress = mergedArray.filter(
                    (datas) => datas.orderStatus === "in Progress"
                  );
                  const filteredReady = mergedArray.filter(
                    (datas) => datas.orderStatus === "ready"
                  );

                  setWaitingAnswer(filteredWaiting);
                  setInProgress(filteredInProgress);
                  setReady(filteredReady);
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
    };

    fetchData();
  }, [refresh]);

  const proceedOrderHandler = () => {
    setRefresh((refresh) => !refresh);
  };

  const logOutHandler = () => {
    
    try {
      const options ={
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        
        
      }

      fetch('/api/auth/logout', options).then(()=>{
          setUserID(null);
          Cookies.remove('address');
          dispatch(cartActions.replaceCart({items: [], totalQuantity: 0}));
    });
      
    } catch(error){
      console.log(error);
    }
    navigate("/");
  } 

  return (
    <>
      <div className="main_wrapper">
        <div>
          <h2 className="title">Orders</h2>
          <Button
            variant="text"
            onClick={logOutHandler}  style={{ fontSize: "1.5rem" }}
          >
            Log Out
          </Button>
        </div>
        <Tabs
          variant="pills"
          defaultActiveKey="all"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="all" title="All">
            <div className="waiting">
              <p>Pending</p>
            </div>
            <div>
              {waitingAnswer.map((data) => {
                return <WaittingAnswer waiting={data} key={data.orderID} proceed={proceedOrderHandler}/>;
              })}
            </div>
            <div>
              <div className="in_progress">
                <p>In Progress</p>
              </div>
              <div>
                {inProgress.map((data) => {
                  return <InProgress inProgress={data} key={data.orderID} proceed={proceedOrderHandler}/>;
                })}
              </div>
              <div className="ready">
                <p>Ready</p>
              </div>
              <div>
                {ready.map((data) => {
                  return <Ready ready={data} key={data.orderID} proceed={proceedOrderHandler}/>;
                })}
              </div>
            </div>
          </Tab>
          <Tab eventKey="waiting_answer" title="Pending">
            <div>
              <div>
                {waitingAnswer.length > 0 ? waitingAnswer.map((data) => {
                  return <WaittingAnswer waiting={data} key={data.orderID} proceed={proceedOrderHandler}/>;
                }): <p style={{fontSize:'40px',textAlign:'center'}}>No pending orders</p>}
              </div>
            </div>
          </Tab>
          <Tab eventKey="in_progress" title="In Progress">
            <div>
              <div>
                {inProgress.length > 0 ? inProgress.map((data) => {
                  return <InProgress inProgress={data} key={data.orderID} proceed={proceedOrderHandler}/>;
                }) : <p style={{fontSize:'40px',textAlign:'center'}}>No in progress orders</p>}
              </div>
            </div>
          </Tab>
          <Tab eventKey="ready" title="Ready">
            <div>
              <div>
                {ready.length> 0 ? ready.map((data) => {
                  return <Ready ready={data} key={data.orderID} proceed={proceedOrderHandler}/>;
                }): <p style={{fontSize:'40px',textAlign:'center'}}>No ready orders</p>}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default AcceptRejectOrder;
