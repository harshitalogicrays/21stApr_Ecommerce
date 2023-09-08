import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalAmount, selectTotalAmount } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
const CheckoutSummary = () => {
  const cartItems=useSelector(selectCartItems)
  const totalAmount=useSelector(selectTotalAmount)
  return (
    <div>
      {cartItems.length==0 ? <>
        No item in cart
        <Link to='/'><FaArrowLeft/>Back to Home</Link>
      </>
    :
      <div class="card shadow p-2"><h4>Cart Items : ({cartItems.length})</h4>
      <h4>Cart Total :{totalAmount}</h4>
        {cartItems.map((item,index)=>
        <div className='card p-2 mb-2'>
          <h4>Item Name :{item.name}</h4>
          <h4>Item Unit Price :{item.price}</h4>
          <h4>Item Total Quantity :{item.cartQuantity}</h4>
        </div>
        )}
        </div>
    }
    </div>
  )
}

export default CheckoutSummary
