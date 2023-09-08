import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:'order',
    initialState:{orders:[]},
    reducers:{
        store_orders(state,action){ state.orders=action.payload }
    }
})
export const {store_orders}=orderSlice.actions
export default orderSlice.reducer

export const selectorders=state=>state.order.orders