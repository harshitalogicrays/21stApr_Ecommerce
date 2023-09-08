import React from 'react'
import { useDispatch } from 'react-redux'
import {ADD_TO_CART} from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
const ProductItem = ({product}) => {
    const dispatch=useDispatch()
    let addtocart=()=>{
        dispatch(ADD_TO_CART(product))
    }
  return (
    <div class="card col-3 m-2">
      
        <Link to={`/productdetails/${product.id}`}>
            {product.imageURL.length !=0 ?
        <img class="card-img-top" src={product.imageURL} style={{height:'220px'}} alt="Title"/>
        :
        <div style={{height:'220px',fontSize:'30px'}}>Image Loading</div>}
        </Link>
        <div class="card-body">
            <h4 class="card-title">{product.name}</h4>
            <p class="card-text">{product.desc}</p>
            <p class="card-text">{product.price}</p>
            <p class="card-text">{product.category}</p>
            <p class="card-text">{product.brand}</p>
        </div>
        
        <div className="class-footer">
            <button type="button" class="btn btn-primary" onClick={addtocart}>Add to Cart</button>
        </div>
         </div>
  )
}

export default ProductItem
