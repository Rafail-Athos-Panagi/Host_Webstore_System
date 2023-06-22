import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import menuSlice from "./menu-slice";
import adminSlice from './adminSlice';


// this is the setup for redux store
const store = configureStore({
    reducer:{cart:cartSlice.reducer, menu:menuSlice.reducer , admin:adminSlice.reducer}
});

//exporting the store so it can be used by other components
export default store;