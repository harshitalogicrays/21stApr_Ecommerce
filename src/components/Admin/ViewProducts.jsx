import React, { useEffect, useState } from 'react'
import useFetchCollection from '../../customHook/useFetchCollection'
import Loader from '../Loader'
import { FaPenNib, FaPenSquare, FaTrashAlt } from 'react-icons/fa'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../../redux/slices/productSlice'

const ViewProducts = () => {
  const{data,isLoading}=useFetchCollection("products")  
  let products=useSelector(selectProducts)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_products(data))
  },[data])
  let handleDelete=(id,imageURL)=>{
    if(window.confirm("are you sure to delete this product??")){
      let docRef=doc(db,"products",id)
      deleteDoc(docRef)
      const storageRef=ref(storage,imageURL)
      deleteObject(storageRef)
    }
  }
  return (
    <div className='card shadow p-2'>
      {isLoading && <Loader/>}
      <h1>All Products</h1>
      <hr/>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length==0 && <tr><td colSpan={6}>No Product Found</td></tr>}
            {products.map((item,index)=>
            <tr class="" key={index}>
              <td scope="row">{index+1}</td>
              <td>{item.name}</td>
              <td>
                <img src={item.imageURL} style={{width:'50px',hegiht:'50px'}} />
                </td>
              <td scope="row">{item.price}</td>
              <td>{item.category}</td>
              <td>
                <Link to={`/dash/editproduct/${item.id}`} type="button" class="btn btn-success me-2"><FaPenNib/></Link>
                <button type="button" class="btn btn-danger" onClick={()=>handleDelete(item.id,item.imageURL)}><FaTrashAlt/></button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewProducts
