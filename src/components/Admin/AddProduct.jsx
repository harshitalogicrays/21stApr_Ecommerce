import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db, storage } from '../../firebase/config'
import './progress.css'
import Loader from '../Loader'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slices/productSlice'

let initialState={id:"",name:'',price:'',countInStock:'',brand:'',imageURL:'',desc:'',category:''}

let categories=["Men","Women","Kids","Electronics","Grocery"]

const AddProduct = () => {
    const {id}=useParams()
    let [product,setProduct]=useState({...initialState})
    let [uploadProgress,setUploadProgress]=useState(0)
    let [isLoading,setIsLoading]=useState(false)
    let navigate=useNavigate()
    let products=useSelector(selectProducts)
    let productEdit=products.find((item)=>item.id==id)
  useEffect(()=>{
    if(id){
      setProduct({...productEdit})
    }
    else{
      setProduct({...initialState})
    }
  },[id])

    let handleChange=(e)=>{
            setProduct({...product,[e.target.name]:e.target.value}) 
    }
    let handleImage=(e)=>{
       let file=e.target.files[0]
       const storageRef=ref(storage,`ecommerce-21stApr/${Date.now()}${file.name}`)
       const uploadTask=uploadBytesResumable(storageRef,file)
       uploadTask.on("state_changed",(snapshot)=>{
            const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
            setUploadProgress(progress)
       },(error)=>toast.error(error.message),
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=> setProduct({...product,imageURL:url}) ).catch(error=>console.log(error.message))
       }     
       )
    }
    let handleSubmit=(e)=>{
        e.preventDefault()
        if(!id){
        setIsLoading(true)
        try{
            addDoc(collection(db,"products"),{
                name:product.name,
                price:product.price,
                imageURL:product.imageURL,
                category:product.category,
                desc:product.desc,
                brand:product.brand,
                countInStock:product.countInStock,
                createdAt:Timestamp.now().toDate() 
            })
            setIsLoading(false)
            toast.success("Product added")
            navigate('/dash/viewproducts')
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
      }
      else{
        setIsLoading(true)
        try{
          if(productEdit.imageURL != product.imageURL){
            let sRef=ref(storage,productEdit.imageURL)
            deleteObject(sRef)
          }
            setDoc(doc(db,"products",id),{
                name:product.name,
                price:product.price,
                imageURL:product.imageURL,
                category:product.category,
                desc:product.desc,
                brand:product.brand,
                countInStock:product.countInStock,
                createdAt:productEdit.createdAt,
                updatedAt:Timestamp.now().toDate() 
            })
            setIsLoading(false)
            toast.success("Product updated")
            navigate('/dash/viewproducts')
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
      }
    }

  return (
    <div>
        {isLoading&&<Loader/>}
      <h1>{id?" Edit ": "Add "}Product</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
            <div className='row'>
            <div class="form-floating mb-3 col-6">
              <input
                type="text"
                class="form-control" name="name"  value={product.name}
                onChange={handleChange}/>
              <label for="formId1">Product Name</label>
            </div>
            <div class="form-floating mb-3 col-6">
              <input
                type="number"
                class="form-control" name="price" value={product.price}
                onChange={handleChange}/>
              <label for="formId1">Product Price</label>
            </div>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control" name="brand"  value={product.brand}
                onChange={handleChange}/>
              <label for="formId1">Product Brand</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control" name="countInStock" value={product.countInStock}
                onChange={handleChange}/>
              <label for="formId1">CountInStock</label>
            </div>

           {uploadProgress ==0 ?null :
           <div className='progress'>
            <div className='progress-bar' style={{width:`${uploadProgress}%`}} >
                {uploadProgress <100 ?`uploading ${uploadProgress}%`: `uploaded ${uploadProgress}%`}
            </div>
           </div>
            }

            <div class="form-floating mb-3 mt-2">
              <input
                type="file"
                class="form-control" name="imageURL"  accept="image/*" onChange={handleImage}/>
              <label for="formId1">Product Image</label>
            </div>

            {id && <img src={productEdit.imageURL} style={{width:'100px',height:'100px'}}/>}
            <div class="mb-3">
                <label for="" class="form-label">Select Category</label>
                <select class="form-select" name="category"  
                onChange={handleChange} value={product.category}>
                    <option selected>Select one</option>
                    {categories.map((c,index)=><option key={index}>{c}</option>)}
                </select>
            </div>
            <div class="mb-3">
            <label for="formId1">Product Description</label>
              <textarea class="form-control" name="desc" value={product.desc}
                onChange={handleChange}></textarea>
              
            </div>
            <div class="d-grid gap-2">
              <button type="submit" name="" id="" class="btn btn-primary">Save Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct
