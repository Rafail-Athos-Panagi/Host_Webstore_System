import React from "react";
import OrderList from "./OrderList";
import { Container } from "react-bootstrap";
import Cart from "./Cart/Cart";
import { useEffect } from "react";

export default function Order() {
  const menu = Object.values(require("../../assets/menu.json"));
  const types = [...new Set(menu.map((s) => s.type))];

  const starterMenu = menu.filter((val) => {
    return val.type === "Starter";
  });

  const mainMenu = menu.filter((val) => {
    return val.type === "Main";
  });

  const saladMenu = menu.filter((val) => {
    return val.type === "Salad";
  });
  
  useEffect(()=>
  {
   document.body.style.backgroundColor='white';
  },[])

  return (
    <>
      <div className="WhiteSpace" style={{ height: "40px" }} />
      <div style={{ display: "flex" }}>
        {/*Filters*/}
        <div style={{ width: "10%" }}>
          {types.map((val, key) => {
            return (
              <div className="form-check" key={key}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {val}
                </label>
              </div>
            );
          })}
        </div>

        <div className="WhiteSpace" style={{ width: "40px" }} />
        <div className="Line" style={{ width: "2px", background: "gray" }} />
        <div className="WhiteSpace" style={{ width: "40px" }} />

        {/*Menu*/}

        <div className="box">
          <Container>
            <OrderList type="Starter" order={saladMenu}></OrderList>
          </Container>

          <Container>
            <OrderList type="Main" order={saladMenu}></OrderList>
          </Container>

          <Container>
            <OrderList type="Salad" order={saladMenu}></OrderList>
          </Container>
        </div>
        {/*End of Menu*/}

        <div className="WhiteSpace" style={{ width: "40px" }} />
        <div className="Line" style={{ width: "2px", background: "gray" }} />
        <div className="WhiteSpace" style={{ width: "40px" }} />

        {/*Cart*/}
        <div style={{ width: "10%" }}>
          <Cart></Cart>
        </div>
      </div>
    </>
  );
}
