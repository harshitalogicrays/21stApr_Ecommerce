import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div class="container-fluid">
    <div class="row">
        <div class="col-2 bg-light sticky-top">
            <div class="d-flex flex-column flex-row flex-nowrap bg-light align-items-center sticky-top">
               
                <a href="/" class="d-block p-3 link-dark text-decoration-none text-center" title="">
                <FaUserCircle size={40} /><br/>
                  Dashboard
                </a>
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                    <li class="nav-item">
                        <Link to='addproduct' class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">Add Product</Link>
                        
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home" to='viewproducts'>
                        View Products
                        </Link>
                    </li>
                    <li>
                        <a href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                           Add User
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                           View Users
                        </a>
                    </li>
                    <li>
                    <Link class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home" to='orders'>
                        View Orders
                        </Link>
                    </li>
                </ul>
              
            </div>
        </div>
        <div class="col-10 p-5">
          <Outlet/>
        </div>
    </div>
</div>
  )
}

export default Admin
