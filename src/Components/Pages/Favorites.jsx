import React, { useContext } from 'react'
import { FavoriteContext } from '../../assets/API/FavoriteContext'
import ProductCard from '../product card/Productcard'
import { RiDeleteBin2Fill } from "react-icons/ri";
import Notfound from '../Nothing found/Notfound';
import './Favorites.css';

const Favorites = () => {
    const {FavoriteItems, addToFavorite, removeFromFavorite}=useContext(FavoriteContext)
  return (
   <>
   <center><h1>Your Favorites</h1></center>
   <hr />
   <section className='addedlist'>
   {FavoriteItems.length === 0 ? (
        <Notfound/>
      ) :
    (FavoriteItems.map((item)=>{
      return(
        <div className='cart-product' key={item.id}>
            <img src={item.image3} height='100px' alt={item.name} />
            <div className="info">
            <h3>{item.product_name}</h3>
            <p>PKR <del>{item.oldprice}</del></p>
            <p>PKR {item.price}</p>
            </div>
            <button className='remove-btn' onClick={() => removeFromFavorite(item.id)}><RiDeleteBin2Fill /></button>
          </div>
      )
    }))}
    </section>
    <center><h1>More products for you</h1></center>
    <br />
    <hr />
    <br />
    <ProductCard/>
   </>
  )
}

export default Favorites
