import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalAmount } from '../redux/slices/cartSlice'
import { selectUserEmail } from '../redux/slices/authSlice'
import { selectShippingAddress } from '../redux/slices/checkoutSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

const stripePromise=loadStripe('pk_test_51MWzILSJqCDJ3ZovShOg1ilq2hxwZLPytjDlf4Y8sK7c3tdyVqTvSkvMElvXsUZ7yteLaiyp7FqdlSMLMfjX5sMz00ThusY7s3')

const Checkout = () => {
    const [message,setMessage]=useState("initializing checkout")
    const [clientSecret,setClientSecret]=useState('')

    const totalAmount=useSelector(selectTotalAmount)
    const userEmail=useSelector(selectUserEmail)
    const shippingAddress=useSelector(selectShippingAddress)
    const description="Ecommerce Site"

    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        fetch("http://localhost:2000/payment",{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({amount:totalAmount,email:userEmail,shipping:shippingAddress,description:description
            })
        }).then((res)=>{
            return res.json().then((data)=>{
                setClientSecret(data.clientSecret)
            })
        })
        .catch((error)=>{console.log(error)
            setMessage("Failed to initialize checkout")
            toast.error('something went wrong')})
    },[])
    const apperance={theme:'stripe'}
    const options={clientSecret,apperance}
  return (
    <div className='container'>
        {!clientSecret && <h3>{message}</h3>}
        {clientSecret && 
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
        }
    </div>
  )
}

export default Checkout
