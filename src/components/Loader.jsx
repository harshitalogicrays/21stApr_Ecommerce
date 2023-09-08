import React from 'react'
import LoaderImg from '../assets/loader.gif'
import ReactDOM from 'react-dom'
import './loader.css'
const Loader = () => {
  return ( ReactDOM.createPortal(
    <div className='wrapper'>
    <div className='loader'>
        <img src={LoaderImg} alt='Loading'/>
    </div>
</div>,document.getElementById('loader')
  )
  )
}

export default Loader
