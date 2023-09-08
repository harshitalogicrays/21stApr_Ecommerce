import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{shippingAddress: localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{}},
    reducers:{
        store_address(state,action){
            state.shippingAddress=action.payload
            console.log(action.payload)
            localStorage.setItem("shippingAddress",JSON.stringify(state.shippingAddress))
        }
    }
})
export const {store_address}=checkoutSlice.actions
export default checkoutSlice.reducer

export const selectShippingAddress=state=>state.checkout.shippingAddress