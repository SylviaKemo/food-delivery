import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {
    const {url,token} = useContext(StoreContext)
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data);
        
    }

    useEffect(()=>{
        if(token) {
            fetchOrders();
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="">
            {data.map((order,i) => {
                return (
                    <div className="my-orders-order" key={i}>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index) => {
                            if(index === order.items.length-1) {
                                return item.name+" x "+item.quantity
                            }
                            else {
                                return item.name+" x "+item.quantity+", "
                            }
                        })}</p>
                        <p>Kes{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span>{order.status}</p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default MyOrders
