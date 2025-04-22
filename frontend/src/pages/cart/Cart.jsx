import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />

                <h3>{item.name}</h3>
                <p>Ksh{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>Ksh{item.price * cartItems[item._id]}</p>
                <p
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  x
                </p>
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Ksh{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Ksh{getTotalCartAmount() === 0 ? 0 : 30}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                Ksh{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30}
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter promo code" />
              <button>APPLY</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart
