import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Login from './components/Login/Login'

import { Route, Routes } from 'react-router-dom'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/myOrders/MyOrders'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin? <Login setShowLogin={setShowLogin}/> : <></>}
   
    <div className='App'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
      </Routes>
      
    </div>
    </>
  )
}

export default App
