import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {FaPen, FaPenAlt, FaPenSquare, FaShoppingCart, FaSignOutAlt, FaUserAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, LogoutUser, selectUserName, selectUserRole } from '../redux/slices/authSlice'
import { ShowOnLogin, ShowOnLogout } from './HiddenLinks'
import { doc, getDoc } from 'firebase/firestore'
import {selectCartItems  } from "../redux/slices/cartSlice";
import useFetchCollection from '../customHook/useFetchCollection'
import { selectProducts, store_products } from '../redux/slices/productSlice'
import { filter_by_search } from '../redux/slices/filterSlice'
const Header = () => {
    const cartItems=useSelector(selectCartItems)
    const username=useSelector(selectUserName)
    const navigate=useNavigate()
    let dispatch=useDispatch()
    let [search,setSearch]=useState('')
    let userrole=useSelector(selectUserRole)
    let handleLogout=()=>{
        signOut(auth).then(() => {
                toast.success("loggedOut")
                navigate('/')
          }).catch((error) => {
            toast.error(error.message)
          });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, async(user) => {
            if (user) {
           const uid = user.uid;
           const docRef=doc(db,"users",uid)
           const docSnap=await getDoc(docRef)
                dispatch(LoginUser({userID:uid,userEmail:docSnap.data().email,userRole:docSnap.data().role,userName:docSnap.data().username}))
            } else {
                dispatch(LogoutUser())
            }
          });
    },[auth])

    const{data,isLoading}=useFetchCollection("products") 
    useEffect(()=>{
        dispatch(store_products(data))
      },[data]) 
      let products=useSelector(selectProducts)

    // useEffect(()=>{
    //     dispatch(filter_by_search({search,products}))
    // },[search,products,dispatch])

    let handleSearch=()=>{
         dispatch(filter_by_search({search,products}))
    }
  return (
       <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src={require('../assets/logo.jpg')} style={{width:'50px',height:'50px'}}/>
        </a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <Link class="nav-link active" to='/' aria-current="page">Home <span class="visually-hidden">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/products'>Products</Link>
                </li>
                </ul>
            <form class="my-2 my-lg-0">
                <div className='input-group'>
                <input class="form-control" style={{width:'300px'}} type="text" placeholder="Search by Name or Category"
                value={search} onChange={(e)=>setSearch(e.target.value)}/> 
                <button type="button" class="btn btn-danger" onClick={handleSearch}>Search</button>     
                </div>       
            </form>
            <ul class="navbar-nav mt-2 mt-lg-0">
                {userrole !="admin" &&
            <li class="nav-item">
                    <Link class="nav-link" to='/cart' aria-current="page">
                        Cart<FaShoppingCart size={30}/>
                        <span class="badge rounded-pill text-bg-danger" style={{position:'relative',top:'-10px'}}>
                            {cartItems.length}
                            </span>
                        </Link> 
                </li>
        }
                <ShowOnLogin>
                {userrole =="user" &&
                <li class="nav-item">
                    <Link class="nav-link" to='/order-history'>My Orders</Link>
                </li>
                }
                <li class="nav-item">
                    <a class="nav-link"  aria-current="page">
                        Welcome {username}  </a> 
                </li>
                <li class="nav-item">
                    <button class="nav-link" onClick={handleLogout}><FaSignOutAlt/>Logout</button>
                </li>
                </ShowOnLogin>

                <ShowOnLogout>
                <li class="nav-item">
                    <Link class="nav-link" to='/register' aria-current="page">
                        <FaPen/>Register</Link> 
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='login'><FaUserAlt/>Login</Link>
                </li>
                </ShowOnLogout>
                </ul>
        </div>
     </div>
   </nav>
   
  )
}

export default Header
