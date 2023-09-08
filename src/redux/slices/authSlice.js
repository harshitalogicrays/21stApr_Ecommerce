import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{isLoggedIn:false,userID:null,userEmail:null,userName:'',userRole:null},
    reducers:{
        LoginUser(state,action){
           let {userID,userEmail,userRole,userName}=action.payload
            state.isLoggedIn=true
            state.userID=userID
            state.userEmail=userEmail
            state.userName=userName
            state.userRole=userRole
        },
        LogoutUser(state,action){
            state.isLoggedIn=false
            state.userID=null
            state.userEmail=null
            state.userName=null
            state.userRole=null
        }
    }
})
export const {LoginUser,LogoutUser}=authSlice.actions
export default authSlice.reducer

export const selectIsLoggedIn=state=>state.auth.isLoggedIn
export const selectUserID=state=>state.auth.userID
export const selectUserName=state=>state.auth.userName
export const selectUserEmail=state=>state.auth.userEmail
export const selectUserRole=state=>state.auth.userRole