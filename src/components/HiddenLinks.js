import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/slices/authSlice"

export const ShowOnLogin=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn)return children
    else return null
}

export const ShowOnLogout=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn==false)return children
    else return null
}