import React, { useEffect } from 'react'
import useFetchCollection from '../customHook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../redux/slices/orderSlice'
import { selectUserID } from '../redux/slices/authSlice'
import Loader from '../components/Loader'
const OrderHistory = () => {
    let {data,isLoading}=useFetchCollection("orders")
    let dispatch=useDispatch()
    let orders=useSelector(selectorders)
    let userID=useSelector(selectUserID)
    let filterOrders=orders.filter((order)=>order.userID==userID)

    useEffect(()=>{
        dispatch(store_orders(data))
    },[data])
  return (
    <div className='container shadow mt-3 p-3'>
    {isLoading && <Loader/>}
    <h1>My Orders</h1><hr/>
    {filterOrders.length == 0 ? 
      <>No Orders</>
    :
    <>
    <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>s/n</th>
               <th>Date</th>
               <th>Order ID</th>
               <th>Order Amount</th>
               <th>Order Status</th>
             </tr>
           </thead>
           <tbody>
             {filterOrders.map((order, index) => {
               const {
                 id, orderDate, orderTime, orderAmount, orderStatus,} = order;
               return (
                 <tr key={id}>
                   <td>{index + 1}</td>
                   <td> {orderDate} at {orderTime}
                   </td>
                   <td>{id}</td>
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

export default OrderHistory
