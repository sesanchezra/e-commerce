import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Routes/Home/Home'
import ProductDetail from './components/Routes/Product/ProductDetail'
import Login from './components/Routes/Login/Login'
import Purchases from './components/Routes/Purchases/Purchases'
import Header from './components/shared/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './store/slices/products.slice'
import Footer from './components/shared/Footer'
import axios from 'axios'
import Cart from './components/shared/Cart/Cart'
import ProtectedRoutes from './components/Routes/ProtectedRoutes'

function App() {

  //Link to design: https://dribbble.com/shots/15487383-Beauty-Product-Shop-App


  //Crear usuario - token bearer 

  //Solo se usó una vez

  // useEffect(() => {
  //   const url = `https://ecommerce-api-react.herokuapp.com/api/v1/users`
  //   const user = {
  //     firstName: "Natalia",
  //     lastName: "Perez",
  //     email: "nataliaperez@gmail.com",
  //     password: "1234567890",
  //     phone: "3333333333",
  //     role: "admin"
  //   }
  //   axios.post(url,user)
  //     .then(res => console.log(res.data))
  //     .catch(error => console.log(error))
  // }, [])



  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/purchases' element={<Purchases />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App
