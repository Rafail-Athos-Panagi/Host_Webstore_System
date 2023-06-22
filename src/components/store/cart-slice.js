import { createSlice } from "@reduxjs/toolkit";


// this is the cart handling and the cart items handling.
const cartSlice = createSlice({
    name:'cart', // we just set a name for the slice
    initialState:{ // this is the initial state of the cart thingy
        items:[], // array containing the items
        totalQuantity:0, // total quantity of items in the cart
        totalAmount:0, // total amount to be payed
        changed:false, // this will be used so it doesnt do some stuff at the start
        address:[]
    },
    reducers:{
        addToCart (state,action) { 
            const {newItem,extraIngredients,fromCart }= action.payload; // payload is basically an object containing the information of the item
            
          
            const array =[];
            let extraItemsPrice = 0;
            let price = 0;
            if(extraIngredients !== undefined)
            {
                if(extraIngredients.length>0){
                    extraIngredients.forEach((val)=>{
                    array.push({
                        extraItemName:val.extraItemName,
                        extraItemPrice:val.extraItemPrice,
                        extraItemQuantity:val.extraItemQuantity
                    })
                    extraItemsPrice=extraItemsPrice+ val.extraItemPrice*val.extraItemQuantity;
                });
                }
            }

            console.log(extraItemsPrice);
            

            array.sort((a,b)=>a.extraItemName.localeCompare(b.extraItemName));
            
            const existingItem = state.items.find((itemSearch)=> itemSearch.id===newItem.id && JSON.stringify(itemSearch.extraItems)=== JSON.stringify(array)); // check if there is an item in the cart which has the same id.If there is we get a reference to it and store it to existingItem
            
            //console.log(existingItem);
            state.totalQuantity=state.totalQuantity+(newItem.quantity?newItem.quantity:1);// increase quantity of cart by 1      
            state.changed=true; // change status

            if(fromCart){
                state.totalAmount=state.totalAmount+parseFloat(newItem.price); // change the total amount to be payed by 1
            }else{
                state.totalAmount=state.totalAmount+(newItem.quantity? newItem.price*newItem.quantity+extraItemsPrice*newItem.quantity:newItem.price+extraItemsPrice); // change the total amount to be payed by 1
            }

            state.changed=false;

            if(!existingItem){ // this will execute if this item that got added to the cart is a new item that doesnt exist in the cart
                state.items.push({ // we push an object containing the state item attributes
                    id:newItem.id, // the id of the product
                    title:newItem.title, // the name of hte product
                    price:newItem.price+extraItemsPrice, // the price of the product
                    quantity:newItem.quantity? newItem.quantity : 1, // we set it to 1 cause its a new thing in the cart
                    image:newItem.image,
                    ingredients:newItem.ingredients,
                    extraItems:array,
                    comment:newItem.comment
                })
            } else{
                existingItem.quantity=newItem.quantity? existingItem.quantity + newItem.quantity :  existingItem.quantity+1;
            } 

        },
        removeFromCart(state,action){

            const {id,extraItems} = action.payload;
            
            const existingItem = state.items.find((itemSearch)=> itemSearch.id===id && JSON.stringify(itemSearch.extraItems)=== JSON.stringify(extraItems)); // check if there is an item in the cart which has the same id.If there is we get a reference to it and store it to existingItem
            state.totalQuantity--; // remove one quantity from the badge
            state.totalAmount=state.totalAmount-existingItem.price// remove the existing item price from the total amount 

            if(state.totalQuantity=== -0.00) // precaution idk why it happens
                state.totalQuantity=0;

            if(existingItem.quantity===1) // if its the last record of the item then it will have to be removed from teh cart completely
            {
                state.items=state.items.filter(item=> !(item.id===id && JSON.stringify(item.extraItems) === JSON.stringify(extraItems))); // u filter out all the items that dont have id the same with the one that got selected and then return a new array
            }else {
                existingItem.quantity=existingItem.quantity-1; // remove 1 from the existing quantity of the item
            }

            if(state.items.length===0)
                state.changed=true; // this is used so the cart doesnt bug and keep one itme always on refresh */ 
        },
        replaceCart(state,action){
            const receivedItems = action.payload.items;
            
            receivedItems.forEach((val)=>{val.price=val.price+val.extraItems.reduce((accumulator,product)=>{return accumulator + product.extraItemPrice*product.extraItemQuantity },0)})// set the total price});
            
            state.totalQuantity = action.payload.totalQuantity; // this is the total quantity of the cart that will be showing in the badge of the cart
            state.items = receivedItems;  // this is the cart items array
            state.totalAmount = action.payload.items.reduce((accumulator,product)=>{ // set the total price
                return accumulator + (product.quantity * product.price);; 
            },0);
        },
        addAddress(state,action){
            const array = [];
            array.push(action.payload);
           state.address = array;
        }
    }
});

export const cartActions = cartSlice.actions; // export so we can use the reducer functions in other functions by putting the reducer in the store
export default cartSlice;