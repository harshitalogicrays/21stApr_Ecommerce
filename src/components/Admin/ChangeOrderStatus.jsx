import React from 'react'
import { useState } from 'react'
import useFetchDocument from '../../customHook/useFetchDocument'
import { useNavigate } from 'react-router-dom'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify'
const ChangeOrderStatus = ({id,orderStatus,order}) => {
    let [status,setStatus]=useState(orderStatus)
    let [isLoading,setIsLoading]=useState(false)
    let {document}=useFetchDocument("orders",id)
    let navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const orderConfig={
            userID:order.userID,userEmail:order.userEmail,
            orderDate:order.orderDate, orderTime:order.orderTime,
            orderAmount:order.orderAmount,
            cartItems:order.cartItems,
            orderStatus:status,
            shippingAddress:order.shippingAddress,
            createdAt:order.createdAt,
            editedAt:Timestamp.now().toDate()
          }
          try{
            setDoc(doc(db,"orders",id),orderConfig)
            setIsLoading(false)
            emailjs.send('service_bbdugt4', 'template_1cwjcxw', {user_email:orderConfig.userEmail,order_status:orderConfig.orderStatus,amount:orderConfig.orderAmount,date:orderConfig.orderDate}, 'ouyyULNr1Fl9QYxiJ')
            .then((result) => {
                toast.success("order status changed")
                navigate('/dash/orders')
            }, (error) => {
                console.log(error.text);
            });
      
            }
          catch(error){
            setIsLoading(false)
            toast.error(error.message)
          }
    }
  return (
    <div class="mb-3">
        <form onSubmit={handleSubmit}>
        <label for="" class="form-label">Order Status</label>
        <select class="form-select" name="status" id="" value={status}
        onChange={(e)=>setStatus(e.target.value)}>
            <option>Order Placed</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Cancelled</option>
            <option>Delivered</option>
        </select>
        <button type="submit" class="btn btn-primary mt-2">Update Status</button>
        </form>
    </div>
  )
}

export default ChangeOrderStatus
