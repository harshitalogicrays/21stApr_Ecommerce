import React, { useEffect, useState } from 'react'
import spinnerImg from '../assets/spinner.jpg'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserEmail, selectUserID } from '../redux/slices/authSlice'
import { CLEAR_CART, selectCartItems, selectTotalAmount } from '../redux/slices/cartSlice'
import { selectShippingAddress } from '../redux/slices/checkoutSlice'
import CheckoutSummary from './CheckoutSummary'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import emailjs from '@emailjs/browser';
const CheckoutForm = () => {
  let [message,setMessage]=useState(null)
  let [isLoading,setIsLoading]=useState(false)
  const stripe=useStripe()
  const elements=useElements()
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const userID=useSelector(selectUserID)
  const userEmail=useSelector(selectUserEmail)
  const cartItems=useSelector(selectCartItems)
  const totalAmount=useSelector(selectTotalAmount)
  const shippingAddress=useSelector(selectShippingAddress)

  useEffect(()=>{
    const clientSecret=new URLSearchParams(window.location.search).get("payment_intent_client_secret")
  },[stripe])

  let handleSubmit=async(e)=>{
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)
    await stripe.confirmPayment({
      elements,
      confirmParams:{return_url:"http://localhost:3000/checkout-success"},
      redirect:"if_required"
    }).then(result=>{
        if(result.error){
          toast.error(result.error)
          setMessage(result.error)
          return 
        }
        if(result.paymentIntent){
          if(result.paymentIntent.status=="succeeded"){
            setIsLoading(false)
            toast.success("payment done")
            saveorder()
          }
        }
    })
  }

  let saveorder=()=>{
    let today=new Date()
    let date=today.toDateString();
    let time=today.toLocaleTimeString()
    const orderConfig={
      userID:userID,userEmail:userEmail,
      orderDate:date, orderTime:time,
      orderAmount:totalAmount,
      cartItems:cartItems,
      orderStatus:"Order Placed",
      shippingAddress:shippingAddress,
      createdAt:Timestamp.now().toDate()
    }
    try{
      addDoc(collection(db,"orders"),orderConfig)
      dispatch(CLEAR_CART())

      emailjs.send('service_bbdugt4', 'template_1cwjcxw', {user_email:orderConfig.userEmail,order_status:orderConfig.orderStatus,amount:orderConfig.orderAmount,date:orderConfig.orderDate}, 'ouyyULNr1Fl9QYxiJ')
      .then((result) => {
        toast.success("order placed")
        navigate('/checkout-success')
      }, (error) => {
          console.log(error.text);
      });

      }
    catch(error){
      toast.error(error.message)
    }
  }
  return (
    <div className='container shadow mt-5 p-3'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-6'>
          <h2>Checkout summary</h2><hr/>
            <CheckoutSummary/>
          </div>
          <div className='col-6'>
            <h2>Stripe Checkout</h2><hr/>
              <PaymentElement id="payment-element"></PaymentElement>
              <div class="d-grid gap-2">
              <button type="submit" name="" id="" class=" mt-2 btn btn-primary">
                {isLoading ? 
                  <img src={spinnerImg} alt="Loading" style={{width:'50px'}} />
                :
                <>(Pay Now)</>
                }
                </button>
              </div>
            </div>
        </div>
        </form>
    </div>
  )
}

export default CheckoutForm
