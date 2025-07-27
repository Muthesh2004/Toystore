import React, { useEffect, useState } from 'react';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} × {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
