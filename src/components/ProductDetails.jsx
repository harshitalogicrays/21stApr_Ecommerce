import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDocument from '../customHook/useFetchDocument'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, DECREASE, selectCartItems } from '../redux/slices/cartSlice'
import ReactImageMagnify from 'react-image-magnify';
const ProductDetails = () => {
    const {id}=useParams()
    const {document}=useFetchDocument("products",id)
    let [product,setProduct]=useState(null)
    const cart=useSelector(selectCartItems)
    const isCartAdded=cart.findIndex((item)=>item.id == id)
    const cartdata=cart.find((item)=>item.id == id)
    const dispatch=useDispatch()
    useEffect(()=>{
        setProduct(document)
    },[document])
    // console.log(product)
    
  return (
    <div className='container mt-5'>
        <h2>Product Details</h2><hr/>
        {product &&
        <div className='row mt-3 p-4 shadow'>
            <div className='col-4'>
                {/* <img src={product.imageURL} style={{width:'300px',height:'300px',border:'2px solid black'}}/> */}
           
                <ReactImageMagnify
                 {...{
            smallImage: {
                alt: product.name,
                isFluidWidth: true,
                src: product.imageURL
            },
            largeImage: {
                src: product.imageURL,
                width: 1200,
                height: 1800
            }
        }} />
            </div>
            <div className='col-6'>
            <h4 class="card-title">{product.name}</h4>   
            <p class="card-text">{product.price}</p>
            <p class="card-text">{product.category}</p>
            <p class="card-text">{product.brand}</p>       
            <p class="card-text">{product.desc}</p>
{isCartAdded == -1 ?
                <button type="button" class="btn btn-primary" onClick={()=>dispatch(ADD_TO_CART(product))}>Add To cart</button>  
:
               <> <button onClick={()=>dispatch(DECREASE(product))}>-</button>
                    <input value={cartdata.cartQuantity} style={{width:'40px'}}class="text-center" readOnly />
                    <button onClick={()=>dispatch(ADD_TO_CART(product))}>+</button></> 
}
            </div>
        </div> 
    }
    </div>
  )
}

export default ProductDetails
