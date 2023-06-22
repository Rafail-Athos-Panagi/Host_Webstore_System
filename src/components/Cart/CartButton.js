import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
    const totalQuantity = useSelector((state)=>state.cart.totalQuantity)
      
    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon color="#0C777F"/> </span>
            <span style={{marginLeft:"5px", fontSize:"25px", marginRight:"25px", color:"#0C777F"}}>{totalQuantity}</span>
        </button>
    )
}

export default CartButton;