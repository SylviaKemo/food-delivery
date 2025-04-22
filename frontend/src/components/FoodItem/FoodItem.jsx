import React,{useContext} from 'react'
import "./FoodItem.css"
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'


const FoodItem = ({id,name,image,price,description}) => {

    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext)
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt="" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price">${price}</div>
        <div className='counter-container'>
          {!cartItems[id] ? (   
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItem
