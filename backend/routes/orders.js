const express = require('express');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Place a new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    const newOrder = new Order({
      user: req.userId,
      items,
      total,
      shippingAddress,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Get order history for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
