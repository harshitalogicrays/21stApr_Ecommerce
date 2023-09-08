import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice=createSlice({
    name:"cart",
    initialState:{cartItems: localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],cartTotalAmount:0,previousURL:''},
    reducers:{
        ADD_TO_CART(state,action){
        let productIndex=state.cartItems.findIndex((item)=>item.id === action.payload.id)
       if(productIndex == -1){
            state.cartItems.push({...action.payload, cartQuantity:1})
            // toast.success(`${action.payload.name} added to cart`)
       }
       else{
            if(state.cartItems[productIndex].cartQuantity < action.payload.countInStock){
                state.cartItems[productIndex].cartQuantity+=1
                // toast.info(`${action.payload.name} increased by 1`)
            }
       }
       localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        DECREASE(state,action){
            let productIndex=state.cartItems.findIndex((item)=>item.id === action.payload.id)
            if(state.cartItems[productIndex].cartQuantity > 1){
                state.cartItems[productIndex].cartQuantity-=1}
        
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },

        REMOVE_FROM_CART(state,action){
            state.cartItems.splice(action.payload,1)
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        CLEAR_CART(state,action){
            state.cartItems=[]
            localStorage.removeItem('cartItems')
        },
        CALCULATE_SUBTOTAL(state,action){
            let total=state.cartItems.reduce((prev,item)=>{return prev += item.price*item.cartQuantity},0)
           state.cartTotalAmount=total
        },
        SAVE_URL(state,action){
            state.previousURL=action.payload
        }
    }
})

export const {ADD_TO_CART,DECREASE,REMOVE_FROM_CART,CLEAR_CART,CALCULATE_SUBTOTAL,SAVE_URL}=cartSlice.actions
export default cartSlice.reducer

export const selectCartItems=state=>state.cart.cartItems
export const selectTotalAmount=state=>state.cart.cartTotalAmount
export const selectURL=state=>state.cart.previousURL
