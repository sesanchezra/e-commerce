import { useEffect, useState } from 'react'
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Routes/Home/Home'
import ProductDetail from './components/Routes/Product/ProductDetail'
import Login from './components/Routes/Login/Login'
import Purchases from './components/Routes/Purchases/Purchases'
import Header from './components/shared/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './store/slices/products.slice'

function App() {
  
  //Link to design: https://dribbble.com/shots/15487383-Beauty-Product-Shop-App
  return (
    <div className="App">
        <Header />
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/purchases' element={ <Purchases /> }/>
        <Route path='/product/:id' element={ <ProductDetail /> }/>
      </Routes>
    </div>
  )
}

export default App
