import "./CartTest.css";
import { useSelector } from "react-redux";
import MiniCartItem from "./MiniCartItem";
const CartTest = () => {

  const cartItems = useSelector((state)=>state.cart.items);
  console.log(cartItems);
  return (
    <div className="head">
      <header style={{textAlign:"center"}}>
        <h5 style={{color:"white"}}>Your cart</h5>
      </header>
      <div className="content">
        <div className="category">
          <span>Name</span>
          <span>Quantity</span>
        </div>
        <hr className="line"></hr>
        <div>
        {cartItems.map((cartItemMap) => (
            <MiniCartItem
              key={cartItemMap.id}
              item={{
                id: cartItemMap.id,
                title: cartItemMap.title,
                quantity: cartItemMap.quantity,
                price: cartItemMap.price,
              }}
            />
          ))}
        </div>
      </div>
      <footer></footer>
    </div>
  );
};
export default CartTest;
