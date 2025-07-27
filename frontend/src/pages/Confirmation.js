import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  return (
    <div className="confirmation-container">
      <h2>🎉 Order Confirmed!</h2>
      <p>Thank you for shopping with Toyfinity.</p>
      <Link to="/orders">
        <button className="view-orders-btn">View Orders</button>
      </Link>
    </div>
  );
}

export default Confirmation;
