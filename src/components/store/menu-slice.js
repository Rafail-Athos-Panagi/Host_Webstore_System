import { createSlice } from "@reduxjs/toolkit"; // needed for the things to work

const menuSlice = createSlice({
    name:'menu', // we just set a name for the slice
    initialState:{ // this is the initial state of the cart thingy
        menuItems:[], // array containing the menu items
        extraItems:[],
        repeatDays:[] // array containing the repeatDays
    },
    reducers:{
        fillMenuItems (state,action) {  // makes the menu appear we can reuse thsi for day menu too. State is the current state of our slice
                                                // in this case the menu state whic hhas menuItems. action.payload is the parameters given when this function is called
            state.menuItems = action.payload;
        },
        fillExtraItems(state,action) {
            state.extraItems = action.payload;
        },
        fillRepeatDays(state,action) {
            state.repeatDays = action.payload;
        },
        addToMenu(state,action){ // add item to menu
            const {reduxData,extraItemData,data} = action.payload;

             for(let i=0;i<extraItemData.length;i++){ 
                state.extraItems.push({
                extraItemName:extraItemData[i].extraItemName,
                extraItemPrice:extraItemData[i].extraItemPrice,
                itemID:data
            })}
               
            
            state.menuItems.push({ // push to the array of menu items the new menu item
                itemID:data, // not sure what else we can use for getting ids.When it comes from the databse it will reset to the correct one but until then its like this
                itemName:reduxData.itemName, // item name set
                itemImage:reduxData.itemImage, // item image set
                itemPrice:reduxData.itemPrice, // item price set
                itemCategory:reduxData.itemCategory, // item category
                itemDescription:reduxData.itemDescription, //item description
                itemIngredients:reduxData.itemIngredients, // item ingredients 
                itemStatus:reduxData.itemStatus, // item status not sure hwat it is tbh xd
                itemTimeOfDay:reduxData.itemTimeOfDay
            }); 

        },
        editMenuItem(state,action){
            const changedItem = action.payload; // we get the information of the menu item that changed in the form of an object with all its attibutes
            const index = state.menuItems.findIndex((item)=>item.itemID===changedItem.itemID); // we find hte index that corresponds to this item in the state.menuItems array so we can change it correctly
            state.menuItems[index]={ // we change at the correct position the information about the menu item
                itemID:changedItem.itemID, // the menu ID can never hcange but we need it i think maybe not
                itemName:changedItem.itemName, // the menu item name .If changed then it will get a new one if not then not
                itemImage:changedItem.itemImage, // the image of the menu item
                itemPrice:changedItem.itemPrice, // the new price of hte menu item
                itemCategory:changedItem.itemCategory,
                itemDescription:changedItem.itemDescription, // the item description of the changed item
                itemIngredients:changedItem.itemIngredients, // the ingredients of the item changed
                itemStatus:changedItem.itemStatus, // the status
                itemTimeOfDay:changedItem.itemTimeOfDay
            }
        },
    }
});

export const menuActions = menuSlice.actions; // this export is the thing that allows us to call the above reducer functions
export default menuSlice; // we export the menu slice so we can use it in the redux store and have the reducers in our store