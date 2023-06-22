import { menuActions } from "./menu-slice"; 

// Fetch menu Data
export const fetchMenuDataNight = () => { // this is to fetch the menu of the night menu
    return async dispatch => { // dispatch is passsed as a parameter ish from the component its called in
    const fetchData = async () => { // just the function name
        

        const res = await fetch("/api/menu/get"); // this is the response and we use the fetch and the "link" to the query using the request
        
        if(!res.ok) // if the response was not okay which means something went wrong we throw an Error
        {
            throw new Error("Could not fetch menu items"); // error message
        }
      
        const data = await res.json(); // data fetched is in this and we convert it to json using the express function
        return data; // we return the data so we can actually set the menu
    }

    const fetchExtraItemsData = async () => {

        const res = await fetch("/api/menu/getextraitems");

        if(!res.ok)
        {
            throw new Error("Could not fetch extra menu items");
        }

        const data = await res.json();

        return data;
    }

    const fetchItemsRepeatDays = async () => {

        const res = await fetch("/api/menu/getrepeatdays");

        if(!res.ok)
        {
            throw new Error("Could not fetch menu items repeat days");
        }

        const data = await res.json();

        return data;
    }

    try{
        const menuItems =  await fetchData(); // async await so we have a promise and menuItems has the returned menu items from the databsae
        const extraMenuItems = await fetchExtraItemsData();
        const itemsRepeatDays = await fetchItemsRepeatDays();
        if(menuItems.code || extraMenuItems.code || itemsRepeatDays.code)
        {
            console.log("code exists");
        }
        else{
            dispatch(menuActions.fillMenuItems(menuItems)); // we call the fillmenuitems reducer function from our menu slice so we can fill the menu
            dispatch(menuActions.fillExtraItems(extraMenuItems));
            dispatch(menuActions.fillRepeatDays(itemsRepeatDays));
        }
       
    }catch(error){ // catch error
        console.log(error); // console.log it for now
        }
    };
};

// Add menu item
export const addMenuItem = (menuData,reduxData,extraItemData,repeatDays) => { // this action is for adding a new menu item to the menu
    return async dispatch => {
    

    const addItem = async () => { // async function
        let values="";

         const request = { // we set the request with the parameters
            method: "POST",
            credentials: 'include',
            mode: 'cors',
            body:  menuData
          };
    
          const res = await fetch(`/api/insert-menu-item`, request); // the response
         

          if(!res.ok){ // if the response is not okay throw an error
            throw new Error("Could not add menu item"); // error message
          }
          
          const data = await res.json();
          console.log("data is");
            console.log(data);
          
           if(extraItemData!== undefined){
            if(extraItemData.length>0) {
                extraItemData.forEach(value => { // make a big string of insert values based on the order 
                    values = values.concat(`("${value.extraItemName}",${value.extraItemPrice},${data},true),`)
                     });
          }
          
            

          values = values.substring(0, values.length - 1); // remove the last comma from the string
           
          const request2 = {
            method:"POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              table: "menuExtraItems",
              values: values
            }),
        };

        const res2 = await fetch(`/api/insert`, request2)

        if(!res2.ok){
            throw new Error("Could not add extra menu item");
        } 

        let repeatDaysValues='';
        if(repeatDays != null){
            if(repeatDays.length>0 && repeatDays!==undefined){
                repeatDays.forEach(value => { // make a big string of insert values based on the order 
                    repeatDaysValues = repeatDaysValues.concat(`(${data},"${value}"),`)
                     });


                repeatDaysValues=repeatDaysValues.substring(0, repeatDaysValues.length - 1); // remove the last comma from the string
                const request3 = {
                    method:"POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        table: "menuRepeatDays",
                        values: repeatDaysValues
                    }),
                };
                const res3 = await fetch(`/api/insert`, request3);
                console.log(res3);
    
                if(!res3.ok){
                    throw new Error("Could not add repeat days");
                }
    
                console.log(repeatDaysValues);
            }
        }
    
    } 
          

        return data; 
        }

        try{
            const data = addItem(); // just call the function so we can add it to the database if any error occurs thwn we console log the error
          
            data.then(result=>{
                if(result.code)
                    {
                        console.log(result.code);
                        console.log("There was an error adding the item");
                    }
                else{
                    console.log("im in the correct one");
                   
                    const object ={
                        data:result,
                        reduxData:reduxData,
                        extraItemData:extraItemData
                    }
                   
                   dispatch(menuActions.addToMenu(object)); // dispatch the menu action to add the item to the menu
                }
           }); 
           
        }catch(error){
            console.log(error);
        }
    }
    
};

// Edit menu item
export const editMenuItem = (changedMenuData,extraItemsAdd,firstSet,repeatDays) => { // function to edit the menu item information
    return async dispatch => {
        let values = "";

    const {itemID,itemName,itemImage,itemPrice,itemDescription,itemIngredients,itemStatus,itemTimeOfDay,itemCategory,itemAllergens} = changedMenuData; // destructure the variabels of the changed menu data
    
    const editItem = async () => {
        const request = { // set up our request
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ table: "menuitems",
                                  columns:`itemName="${itemName}",itemImage="${itemImage}",itemPrice=${itemPrice},itemDescription="${itemDescription}",itemIngredients="${itemIngredients}",itemStatus=${itemStatus},itemCategory="${itemCategory}",itemTimeOfDay="${itemTimeOfDay}",itemAllergens="${itemAllergens}"`,
                                where:`itemID=${itemID}`}),
          };
        
        const res = await fetch(`/api/update`, request); // get a response from trying to execute the query
         

          if(!res.ok){ // check if response is okay if not throw an error
            throw new Error("Could not save changes for menu item");  // error message
          }

          const a = [];
          extraItemsAdd.sort((a,b)=>a.extraItemName.localeCompare(b.extraItemName));
          firstSet.sort((a,b)=>a.extraItemName.localeCompare(b.extraItemName));


          if(extraItemsAdd.length > firstSet.length)
          {
            console.log("new items more");
            extraItemsAdd.forEach((val)=>{
                const t = firstSet.find((item)=>JSON.stringify(item)===JSON.stringify(val));
                console.log(t);
                if(t===undefined)
                {
                    values = values.concat(`("${val.extraItemName}",${val.extraItemPrice},${itemID},false),`)
                }
            });
            
            values = values.substring(0, values.length - 1); // remove the last comma from the string

            const request2 = {
                method:"POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  table: "menuExtraItems",
                  values: values
                }),
            };
    
            const res2 = await fetch(`/api/insert`, request2)
    
            if(!res2.ok){
                throw new Error("Could not add extra menu item");
            }  
        }
          
          if(firstSet.length >extraItemsAdd.length)
          {
            console.log("old items more");
            firstSet.forEach((val,index)=>{
                if(JSON.stringify(val)!==JSON.stringify(extraItemsAdd[index]))
                    a.push(val);
            })

            if(a.length>0)
            {
              for(let i = 0; i<a.length;i++){

                const request = { // set up our request
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ table: "menuExtraItems",
                                          columns:`extraItemStatus=1`,
                                        where:`itemID=${itemID} AND extraItemName="${a[i].extraItemName}"`}),
                  };
                
                const res = await fetch(`/api/update`, request); // get a response from trying to execute the query
                 
        
                  if(!res.ok){ // check if response is okay if not throw an error
                    throw new Error("Could not save changes for menu item");  // error message
                  }
              }
            }
          }

        }

        try{
            editItem(); // call the function for the database query
            dispatch(menuActions.editMenuItem(changedMenuData)); // dispatch action to edit the menu item in our redux store which will update the menu
        }catch(error){
            console.log(error);
        }
    }
    
};


export const fetchPreviousExtraItemsGroup = (itemCategory) => { // function to fetch the previous extra items group
    return async dispatch => {

        const fetchExtraGroupedItems = async () => {

            const request = { // set up our request
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ select: `distinct extraItemName,extraItemPrice`, 
                                        from: `menuExtraItems natural join menuitems`,
                                        where: `extraItemStatus=1 AND itemCategory="${itemCategory}"`}),
                };

            const res = await fetch(`/api/select`, request); // get a response from trying to execute the query

            if(!res.ok){ // check if response is okay if not throw an error
                throw new Error("Could not fetch grouped extra items");  // error message
            }

            const data = await res.json(); // get the data from the response

            console.log("the extra items are");

            return data;
        }


        try{
            const response = await fetchExtraGroupedItems(); // call the function to fetch the extra items
            if(response.code){
                console.log(response.code);
                console.log("There was an error fetching the extra items");
            }else{
                console.log(response);
                return response;
            }
        }catch(error){
            console.log(error);
        }

    }
};

