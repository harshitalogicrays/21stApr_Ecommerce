import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:'filter',
    initialState:{filterProducts:[]},
    reducers:{
        filter_by_search(state,action){
            let {search,products}=action.payload
           let tempro= products.filter((product)=> product.name.includes(search)
           ||  product.category.includes(search))
            state.filterProducts=tempro
        }
    }
})
export const {filter_by_search}=filterSlice.actions
export default filterSlice.reducer

export const selectfilterProducts=state=>state.filter.filterProducts