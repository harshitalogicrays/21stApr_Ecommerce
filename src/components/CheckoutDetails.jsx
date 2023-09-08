import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from './CheckoutSummary'
import { CountryDropdown } from 'react-country-region-selector'
import { selectShippingAddress, store_address } from '../redux/slices/checkoutSlice'
let intialState={name:"", line1:"", line2:"",mobile:"",city:"",state:"",postal_code:"",country:""}

const CheckoutDetails = () => {
  let [address,setAddress]=useState({...intialState})
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(store_address(address))
    navigate('/checkout')
  }

  const shippingaddress=useSelector(selectShippingAddress)
  useEffect(()=>{
    setAddress({...shippingaddress})
  },[shippingaddress])

  return (
    <div className='row m-2 p-2 shadow'>
    
    <div class="col-6">  <h1 >Checkout details</h1> <hr/>
    <form onSubmit={handleSubmit}>
      <div className='row'>
    <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="name" id="formId1"  value={address.name}
        onChange={(e)=>setAddress({...address,name:e.target.value})}/>
      <label for="formId1">Receipient Name</label>
    </div>  
    <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="line1" id="formId1"  value={address.line1}
        onChange={(e)=>setAddress({...address,line1:e.target.value})}/>
      <label for="formId1">Address Line 1 </label>
    </div>      
    </div>
    <div className='row'>
      <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="line2" id="formId1" value={address.line2}
        onChange={(e)=>setAddress({...address,line2:e.target.value})}/>
      <label for="formId1">Address Line 2</label>
    </div>      
    <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="mobile" id="formId1" value={address.mobile}
        onChange={(e)=>setAddress({...address,mobile:e.target.value})}/>
      <label for="formId1">Mobile </label>
    </div>     
    </div>
    <div class='row'>
      <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="city" id="formId1"  value={address.city}
        onChange={(e)=>setAddress({...address,city:e.target.value})}/>
      <label for="formId1">City</label>
    </div>      

      <div class="form-floating mb-3 col-6">
      <input

        type="text"
        class="form-control" name="state" id="formId1"  value={address.state}
        onChange={(e)=>setAddress({...address,state:e.target.value})}/>
      <label for="formId1">State</label>
    </div>      
    </div>
      <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control" name="pincode" id="formId1"  value={address.postal_code}
        onChange={(e)=>setAddress({...address,postal_code:e.target.value})}/>
      <label for="formId1">PinCode</label>
    </div>  
    <div className='mb-3'>
      <CountryDropdown class="form-control" valueType='short'
      value={address.country} onChange={(value)=>setAddress({...address,country:value})}></CountryDropdown>
    </div>
    
    <div class="d-grid gap-2">
      <button type="submit" name="" id="" class="btn btn-primary">Procced to checkout </button>
    </div>   
        
    </form>
    </div>
    <div class="col-6">
        <h1> Checkout Summary</h1> <hr/>
        <CheckoutSummary/>
      </div>
   
    
  </div>
  )
}

export default CheckoutDetails
