import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db} from '../firebase/config'
import { toast } from 'react-toastify'
const useFetchDocument = (collectionname,documentId) => {
    const [document,setdocument]=useState(null)
    useEffect(()=>{
        getDocumentdata()
    },[])
    let getDocumentdata=async()=>{
        const docRef= doc(db,collectionname,documentId)
           const docSnap= await getDoc(docRef)
           if(docSnap.exists()){
                const obj={
                    id:documentId,...docSnap.data()
                }
                setdocument(obj)
           }
           else{
            toast.error("Document not found")
           }
    }
  return (
   {document}
  )
}

export default useFetchDocument
