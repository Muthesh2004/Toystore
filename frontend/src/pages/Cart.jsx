import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const incrementQty = (id) => {
    const item = cartItems.find((item) => item._id === id);
    updateQuantity(id, item.quantity + 1);
  };

  const decrementQty = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="details">
                <h4>{item.name}</h4>
                <p>₹{item.price.toFixed(2)}</p>
                <div className="qty-controls">
                  <button onClick={() => decrementQty(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQty(item._id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
