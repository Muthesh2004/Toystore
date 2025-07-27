import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Products.css';
import { CartContext } from '../context/CartContext';

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = search ? `?search=${search}` : '';
        const res = await axios.get(`http://localhost:5000/api/products${query}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, [search]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setFeedback(`✅ "${product.name}" added to cart!`);
    setTimeout(() => setFeedback(''), 2000);
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search toys..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {feedback && <div className="feedback-message">{feedback}</div>}

      <div className="product-list">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
