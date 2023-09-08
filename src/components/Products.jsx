import React, { useEffect } from 'react'
import useFetchCollection from '../customHook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../redux/slices/productSlice'
import ProductList from '../components/ProductList'
import { selectfilterProducts } from '../redux/slices/filterSlice'
const Products = () => {
  let {data,isLoading}=useFetchCollection("products")
  const dispatch=useDispatch()
  const products=useSelector(selectProducts)
  const filterProducts=useSelector(selectfilterProducts)
  useEffect(()=>{
    dispatch(store_products(data))
  },[data,dispatch])
  return (
    <div className='container'>
       <h1>Products</h1>
      <hr/>
      {filterProducts.length==0 ? <ProductList products={products}/>
      :
      <ProductList products={filterProducts}/>
  }
      
    </div>
  )
}

export default Products
