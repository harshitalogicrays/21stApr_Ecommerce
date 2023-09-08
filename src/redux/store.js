import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";
import orderSlice from "./slices/orderSlice";
import filterSlice from "./slices/filterSlice";


const store=configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        cart:cartSlice,
        checkout:checkoutSlice,
        order:orderSlice,
        filter:filterSlice
    }
})
export default store