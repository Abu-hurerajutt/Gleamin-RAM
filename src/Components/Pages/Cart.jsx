import React, { useContext, useCallback, useMemo } from 'react';
import { CartContext } from '../../assets/API/CartContext';
import "./Cart.css";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import Productcard from "../product card/Productcard";
import Notfound from '../Nothing found/Notfound';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useContext(CartContext);

  // Memoize groupedItems to avoid recalculation unless cartItems change
  const groupedItems = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const existingItem = acc.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
      } else {
        acc.push({ ...item, quantity: 1, totalPrice: item.price });
      }
      return acc;
    }, []);
  }, [cartItems]);

  // Memoize totals to avoid recalculation unless groupedItems change
  const totalItems = useMemo(() => 
    groupedItems.reduce((acc, item) => acc + item.quantity, 0), 
    [groupedItems]
  );

  const totalBill = useMemo(() => 
    groupedItems.reduce((acc, item) => acc + item.totalPrice, 0), 
    [groupedItems]
  );

  const navigate = useNavigate();

  // Use useCallback for event handlers to avoid recreating them on every render
  const handleCheckoutClick = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  const handleDecreaseQuantity = useCallback((id) => {
    decreaseQuantity(id);
  }, [decreaseQuantity]);

  const handleAddToCart = useCallback((item) => {
    addToCart(item);
  }, [addToCart]);

  const handleRemoveFromCart = useCallback((id) => {
    removeFromCart(id);
  }, [removeFromCart]);

  return (
    <div>
      <center><h1>Your Cart</h1></center>
      <hr />
      <section className="cart-section">
        <section className="addedlist">
          {groupedItems.length === 0 ? (
            <Notfound />
          ) : (
            groupedItems.map((item) => (
              <div className='cart-product' key={item.id}>
                <img src={item.image3} height='100px' alt={item.product_name} />
                <div className="info">
                  <h3>{item.product_name}</h3>
                  <p>Price per item: PKR {item.price}</p>
                  <label>
                    Quantity: 
                    <button 
                      onClick={() => handleDecreaseQuantity(item.id)} 
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span> {item.quantity} </span>
                    <button onClick={() => handleAddToCart(item)}>+</button>
                  </label>
                  <p>Total Price: PKR {item.totalPrice}</p>
                </div>
                <button 
                  className='remove-btn' 
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  <MdOutlineRemoveShoppingCart />
                </button>
              </div>
            ))
          )}
        </section>
        <section className="checkout">
          {groupedItems.length > 0 && (
            <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
              <h3>Checkout</h3>
              <p>Total Items: {totalItems}</p>
              <p>Total Bill: PKR {totalBill}</p>
              <div className="checkoutbutton" onClick={handleCheckoutClick}>
                <div className="container">
                  <div className="left-side">
                    <div className="card">
                      <div className="card-line"></div>
                      <div className="buttons"></div>
                    </div>
                    <div className="post">
                      <div className="post-line"></div>
                      <div className="screen">
                        <div className="dollar">$</div>
                      </div>
                      <div className="numbers"></div>
                      <div className="numbers-line2"></div>
                    </div>
                  </div>
                  <div className="right-side">
                    <div className="new">Checkout</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
      <center><h1>More products for you</h1></center>
      <Productcard />
    </div>
  );
};

export default Cart;
