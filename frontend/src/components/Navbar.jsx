import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    const action = window.prompt("Type 'delete' to delete your account or 'logout' to logout:");

    if (action === 'delete') {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.filter(u => u.email !== currentUser.email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
      localStorage.removeItem('currentUser');
      alert('Account deleted.');
      setUser(null);
      navigate('/register');
    } else if (action === 'logout') {
      localStorage.removeItem('currentUser');
      alert('Logged out.');
      setUser(null);
      navigate('/login');
    } else {
      alert("Invalid input. Please type 'delete' or 'logout'.");
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUZiUiKZj3XBKNMbOGFToMj4DANwz9gDPuw&s" alt="Logo" className="logo-img" />
        Toyfinity
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart ({cartCount})</Link></li>
        {user ? (
          <>
            <li><Link to="/orders">Order History</Link></li>
            <li className="welcome-box">Welcome, <span>{user.name || user.email}</span>!</li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
