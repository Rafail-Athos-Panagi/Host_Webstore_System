import Cookies from "js-cookie";
import { cartActions } from "./cart-slice";

// when an item is added to the cart then the cookie gets updated with the new array of cart items
export const updateCookie = (cart) => {
  return () => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 1 });
  };
};

export const updateAddressCookie = (address) => {{
  return () => {
    Cookies.set("address",JSON.stringify(address),{expires:1});
  }
}}

export const setCart = (cart) => {  // this sets the cart based on the cookie that we receive before this is called
  return (dispatch) =>{
      const items = []; // set an empty array so if the cookie is empty then it will be set with an empty array

      if(cart.menuItems.length>0){ // if there is a menu then
        for(let i=0;i<cart.cartItems.length;i++) // here the cart.cartItems is what is in the cart of the cookie
        {
            const itemInCart = cart.menuItems.find((item)=>item.itemID === cart.cartItems[i].id); 
             if(itemInCart !== 'undefined'){
              items.push({ // push the item to the cart array
              id:itemInCart.itemID,
              title:itemInCart.itemName,
              price:itemInCart.itemPrice,
              image:itemInCart.itemImage,
              quantity:cart.cartItems[i].quantity,
              ingredients:itemInCart.itemIngredients,
              extraItems:cart.cartItems[i].extraItems
          });
        } 
        }
      }
      
      // this is the case that there is no menu so all carts get reset
       if(cart.menuItems.length ===0)
      {
        dispatch(updateCookie([]));
        cart.totalQuantity=0;
      } 
      
      const cartObject = { // the cart object to be pushed to the cart + the total quantity which is the badge that appears in the cart
          items:items,
          totalQuantity:cart.totalQuantity
      };

      dispatch(cartActions.replaceCart(cartObject)); // dispatch replace cart reducer action
  }
}

export const sendOrder = (cartInformation) => {
  
  return async (dispatch) => {
    // the dispatch will be used when the cart will be reset after successful payment
    const cartItems = cartInformation.cartItems;
    const extraItems = cartItems.extraItems;
    const totalPrice = cartInformation.totalPrice;
    const address = cartInformation.address;
    const user = cartInformation.user;
    const currentDate = new Date().toJSON().slice(0, 10);
    let insertID;
    let guestUserId;
    let values = [];
    let extraItemsValues = [];
    let result3;
    
    const orderQuery = async () => {

      if(user===null){

        const makeUser = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "users(userID)",
            values: `(default)`,
        } ),
        
      }
      const res = await fetch(`/api/insert`, makeUser); // the response

      if(!res.ok){
        throw new Error("Could not make user");
      }

      guestUserId = await res.json();

      const addGuestAddress = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table:"address",
          values:`(${guestUserId},"${address.streetName}",${address.houseNumber},"${address.city}","${address.area}",${address.postalCode},${address.phoneNumber},"${address.buildingName}","${address.flatNumber}","${address.specialInstructions}")`
        })
      }

      const res2 = await fetch(`/api/insert`,addGuestAddress);

      if(!res2.ok){
        throw new Error("Could not add guest address");
      }

    }


/* 
      const response = await fetch('/api/time');
      const timeData = await response.json();
      console.log(timeData);
   */
       
      if(user)
      {
        guestUserId = user;
      }


      console.log('current date is');
      console.log(currentDate);
      // async function
      const request = {
        // we set the request with the parameters
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: guestUserId,
          orderStatus: "pending",
          orderPrice: totalPrice.toFixed(2),
          orderDate: currentDate,
          orderTimeOfStatus: "default",
          orderFirstTime: "default",
        }),
      };

      const res = await fetch(`/api/order/new`, request); // the response

      if (!res.ok) {
        // if the response is not okay throw an error
        throw new Error("Could not send order"); // error message
      }
      
      insertID = await res.json(); // this is the orderID that got autoincremented and its the latest
      console.log(insertID);
      cartItems.forEach((value) => {
        // make a big string of insert values based on the order
        values.push(
          [insertID,value.id,value.price,value.quantity,value.comment?value.comment:null]
          );
        });
        console.log(values);
        const request2 = {
          // we set the request with the parameters
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            values: values, // put all the values in the insert query
          }),
        };
        
        const res2 = await fetch(`/api/order/newdetails`, request2); // the response

        
        if (!res2.ok) {
          // if the response is not okay throw an error
          throw new Error("Could not add menu item"); // error message
        }

        const selectRq ={
          // we set the request with the parameters
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({orderID: insertID})
        };

        const selectResponse = await fetch('/api/order/getids',selectRq);

        if(!selectResponse.ok){
          throw new Error ("Could not fetch ordered item ids");
        }

        const selectData = await selectResponse.json();
        
        for(let i=0;i<cartItems.length;i++)
        {
          cartItems[i].extraItems.forEach((item)=>{
            extraItemsValues.push([insertID, cartItems[i].id, item.extraItemName, item.extraItemPrice, item.extraItemQuantity, selectData[i].orderedItemID])
          })
          console.log(cartItems[i].extraItems);
        }

      if(extraItemsValues.length>0){
        const request3 = {
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            values: extraItemsValues, // put all the values in the insert query
          }),
        };
  
        const res3 = await fetch("/api/order/newextras",request3); 
  
        if(!res3.ok){
          throw new Error("Could not add extra item details");
        }

        result3=res3;
      }
      

      const data = await res2.json();

      if(insertID)
      {
        if(extraItemsValues.length>0){
            if(result3.ok)
              return data;
        }
        if(res2.ok)
          return data;
      }
    };

    try {
      const response = await orderQuery();
      if(response.code)
        {
          return {success:false};
        }
      else{
          return {success:true,insertID:insertID};
      }
      } catch (error) {
      console.log(error);
    }
  };
};

export const updateAddress = (address) => {
  return (dispatch) => {
    
    console.log(address);

    const request = {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       houseNumber:address.houseNumber ? address.houseNumber : "",
        streetName:address.streetName ? address.streetName : "",
        city:address.city ? address.city : "",
        area:address.area ? address.area : "",
        postalCode:address.postalCode ? address.postalCode : "",
        phoneNumber:address.phoneNumber ? address.phoneNumber : "",
        buildingName:address.buildingName ? address.buildingName : "",
        flatNumber:address.flatNumber ? address.flatNumber : "",
        specialInstructions:address.specialInstructions ? address.specialInstructions : "",
    }),
    }

    const res = fetch(`/api/customer/updateaddress`,request);

    if(res.status===200)
    {
      dispatch(updateAddressCookie(address));
    }

  }
}
