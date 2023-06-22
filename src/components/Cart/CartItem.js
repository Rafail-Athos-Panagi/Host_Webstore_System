import { useDispatch,useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { updateCookie } from "../store/cart-actions";
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import classes from './CartItem.module.css';

const CartItem = (props) => {
    const {id,title,quantity,price,ingredients,image,extraItems} = props.item;
    const cartItems = useSelector((state)=>state.cart.items);
    const dispatch = useDispatch(); // dispatch actions to the cart using data

   useEffect(()=>{
    const newArray = [];
    for(let i=0;i<cartItems.length;i++)
    {   
        newArray.push({
            id:cartItems[i].id,
            quantity:cartItems[i].quantity,
            extraItems:cartItems[i].extraItems
        });
    }
    dispatch(updateCookie(newArray));
   },[cartItems,dispatch]);
   

   const addItemHandler = () =>{

    const iteminfo ={
        id:id,
        title:title,
        price:price, // quantity will be discussed later dld if we want the user to be able to add multiple from the menu page
        ingredients:ingredients,
    }

    const object={
        newItem:iteminfo,
        extraIngredients:extraItems
    }

    dispatch(cartActions.addToCart(object));
   };

   const removeItemhandler = () =>{ 
    const object = {
        id:id,
        extraItems:extraItems
    };

    dispatch(cartActions.removeFromCart(object));
   };



    return (
       <Card className={classes.item}>    
        <div className={classes.cardContent}>
        <Card.Img className={classes.image} variant='left' src={require("../../assets/uploads/"+image)}/>
            <Card.Body className={classes.details}>  
                <h3>{title}</h3>
                <div className={classes.ingredientsContainer}>
                    <h5 className={classes.ingredients}>{ingredients}</h5>
                </div>
                {(extraItems !== undefined && extraItems.length!==0) && <span>Extra items:{extraItems.map((val)=>{
                    return <span key={val.extraItemName}>{val.extraItemName}&nbsp;&nbsp;x{val.extraItemQuantity},&nbsp;</span>
                })}</span>}
              
                    <div style={{width:"100%",marginTop:"2.3rem"}}>
                        <Button onClick={removeItemhandler} style={{marginRight:"0.4cm"}} className={classes.buttonQuantity}>-</Button>
                            <TextField
                            className={classes.quantityField}
                            value={quantity}
                            InputProps={{
                                readOnly: true
                            }}
                            variant="outlined"
                            size="small"/>
                        <Button onClick={addItemHandler} style={{marginLeft:"0.4cm"}} className={classes.buttonQuantity}>+</Button>
                        <div style={{float:"right"}}>
                            <span className={classes.itemPrice}>{price.toFixed(2)}€</span><br/>
                            <span className={classes.itemPriceTotal}>{(price*quantity).toFixed(2)}€</span>
                        </div>
                    </div>
              
            </Card.Body>
        </div>   
        </Card>
    )
}

export default CartItem;