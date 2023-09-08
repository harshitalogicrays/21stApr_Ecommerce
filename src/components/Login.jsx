import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import { selectURL } from '../redux/slices/cartSlice'

const Login = () => {
    let [user,setUser]=useState({email:'',password:''})
    let [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const previousURL=useSelector(selectURL)
    let redirectURL=()=>{
        if(previousURL.includes('cart')){
          navigate('/cart')
        }
        else
          navigate('/')
    }

    let loginUser=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async(userCredential) => {
             const user = userCredential.user;
             const docRef=doc(db,"users",user.uid)
             const docSnap=await getDoc(docRef)
              let role=docSnap.data().role
            if(role=="admin"){
              setIsLoading(false)
              toast.success("loggedIn sucessfully")
              navigate('/dash')
            }
            else if(role=="user"){
              setIsLoading(false)
              toast.success("loggedIn sucessfully")
              // navigate('/')
              redirectURL()
            }
          
      })
      .catch((error) => {
        setIsLoading(false) 
        toast.error(error.message)
      });
    }
    const provider = new GoogleAuthProvider();
    let loginwithgoogle=()=>{
      signInWithPopup(auth, provider)
      .then(async(result) => {
          const user1 = result.user;
          console.log(user1)
          const docRef=doc(db,"users",user1.uid)
          await setDoc(docRef,{username:user1.displayName,email:user1.email,role:'role'})
          setIsLoading(false)
          toast.success("loggedIn sucessfully")
          // navigate('/')
          redirectURL()
        }).catch((error) => {
              setIsLoading(false) 
              toast.error(error.message)
      });
    }
  return (
    <div className='container mt-5'>
    {isLoading && <Loader/>}
  <div className='row border shadow'>
    <div className='col-4'>
    <img src={require('../assets/login.png')} style={{width:'300px',height:'400px'}}/>
    </div>
    <div className='col-6 mt-3'>
        <form onSubmit={loginUser}>
            <div class="mb-3">
              <label for="" class="form-label">Email</label>
              <input type="text" name="email" id="" class="form-control" placeholder="" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Password</label>
              <input type="password" name="password" id="" class="form-control" placeholder="" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
            </div>
            <div class="d-grid gap-2">
          <button type="submit" name="" id="" class="btn btn-info">Login  </button>
          </div>   
          </form>   
        <p>-------------------Or--------------------</p>
        <div class="d-grid gap-2">
          <button type="button" name="" id="" class="btn btn-danger" 
          onClick={loginwithgoogle}>Login with Google</button>
          <p>create account?? <Link to='/register'>SignUp</Link></p>
        </div>
    
    </div>
  </div>
</div>
  )
}

export default Login
