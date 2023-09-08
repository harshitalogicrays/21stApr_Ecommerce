import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({products}) => {
  return (
    <div className='row'>
        {products.length==0 && <h1>No product found</h1>}
      {products.map((product,index)=>
      <ProductItem key={index} product={product}/>
      )}
    </div>
  )
}

export default ProductList
