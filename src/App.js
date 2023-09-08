import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin/Admin'
import AddProduct from './components/Admin/AddProduct';
import ViewProducts from './components/Admin/ViewProducts';
import Cart from './components/Cart'
import ProductDetails from './components/ProductDetails';
import CheckoutDetails from './components/CheckoutDetails';
import Checkout from './components/Checkout';
import CheckoutSucces from './components/CheckoutSucces';
import OrderHistory from './components/OrderHistory';
import Orders from './components/Admin/Orders';
import OrderDetails from './components/Admin/OrderDetails';
function App() {
  return (
    <>
    <ToastContainer autoClose={2000}></ToastContainer>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dash' element={<Admin/>}>
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='viewproducts' element={<ViewProducts/>}/>
          <Route path='editproduct/:id' element={<AddProduct/>}/>   
          <Route path='orders' element={<Orders/>}/>    
          <Route path='order-details/:id/:status' element={<OrderDetails/>}/> 
      </Route>

      <Route path='productdetails/:id' element={<ProductDetails/>}/>
      <Route path='checkout-details' element={<CheckoutDetails/>}/>
      <Route path='checkout-success' element={<CheckoutSucces/>}/>
      <Route path='order-history' element={<OrderHistory/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='checkout' element={<Checkout/>}/>
    </Routes>
    </>
  );
}

export default App;
