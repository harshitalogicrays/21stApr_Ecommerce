import React, { useEffect } from 'react'
import useFetchCollection from '../../customHook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../../redux/slices/orderSlice'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    let {data,isLoading}=useFetchCollection("orders")
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let orders=useSelector(selectorders)
    useEffect(()=>{
        dispatch(store_orders(data))
    },[data])

    let handleClick=(id,orderStatus)=>{
      if(orderStatus == "Delivered")
        navigate('/dash/orders')
      else  
        navigate(`/dash/order-details/${id}/${orderStatus}`)
    }
  return (
    <div className='container shadow mt-3 p-3'>
    {isLoading && <Loader/>}
    <h1>My Orders</h1><hr/>
    {orders.length == 0 ? 
      <>No Orders</>
    :
    <>
    <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>s/n</th>
               <th>Date</th>
               <th>Order ID</th>
               <th>User</th>
               <th>Order Amount</th>
               <th>Order Status</th>
             </tr>
           </thead>
           <tbody>
             {orders.map((order, index) => {
               const {
                 id, orderDate, orderTime, orderAmount, orderStatus,userEmail} = order;
               return (
                 <tr key={id} onClick={()=>handleClick(id,orderStatus)}>
                   <td>{index + 1}</td>
                   <td> {orderDate} at {orderTime}
                   </td>
                   <td>{id}</td>
                   <td>{userEmail}</td>
                   <td> {"$"}{orderAmount} </td>
                   <td>
                     <p className={
                         orderStatus !== "Delivered"
                           ? "text-danger": "text-success"  } >
                       {orderStatus}
                     </p>
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>   
   </>
    }
  </div>
  )
}

export default Orders
