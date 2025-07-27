import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert('Please enter a shipping address.');
      return;
    }

    if (paymentMethod === 'UPI' && !upiId.trim()) {
      alert('Please enter your UPI ID.');
      return;
    }

    if (paymentMethod === 'Card') {
      const { number, expiry, cvv } = cardDetails;
      if (!number || !expiry || !cvv) {
        alert('Please fill in all card details.');
        return;
      }
    }

    const order = {
      items: cart,
      total,
      shippingAddress: address,
      paymentMethod,
      paymentDetails:
        paymentMethod === 'UPI' ? { upiId } :
        paymentMethod === 'Card' ? { ...cardDetails } : null,
      date: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');

    navigate('/confirmation');
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cart.map(item => (
                <li key={item._id}>
                  {item.name} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p><strong>Total: ₹{total.toFixed(2)}</strong></p>
          </div>

          <div className="shipping-form">
            <h3>Shipping Address</h3>
            <textarea
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your shipping address..."
            />

            <h3>Payment Method</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Card">Credit/Debit Card</option>
            </select>

            {paymentMethod === 'UPI' && (
              <input
                type="text"
                placeholder="Enter your UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            )}

            {paymentMethod === 'Card' && (
              <div className="card-inputs">
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength={16}
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Valid Thru (MM/YY)"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="CVV"
                  maxLength={3}
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            )}

            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
