import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="home-hero">
      <div className="overlay"></div>
      <div className="animated-box">
        <h1>Welcome to our ToyStore!</h1>
        {user && <p className="user-greet">Hello, <span>{user.name || user.email}</span> !</p>}
        <p className="description">Discover fun, joy, and learning in every Toy !!</p>
        <Link to="/products">
          <button className="shop-btn">Shop Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
