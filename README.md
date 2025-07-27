# Online Toy Store Web Application

## Project Overview
The **Online Toy Store** is a responsive e-commerce web application built using **React.js**, **Tailwind CSS**, and **Redux Toolkit**. It allows users to browse toys, add items to a cart, and 
place orders with payment options like **UPI** and **Cash on Delivery (COD)**. User details and cart data are stored locally using `localStorage`.

---

## Features
- User login with personal details (name, address, contact, payment method).
- Browse and add toys to a shopping cart.
- View cart with real-time total price updates.
- Checkout process with payment options (UPI or COD).
- Order confirmation page with personalized success message.
- Responsive and mobile-friendly UI.
- State management with **Redux Toolkit**.
- Persistent cart data using `localStorage`.

---

## Technology Stack
**Frontend:**
- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS

**Backend (Optional):**
- Node.js, Express.js
- MongoDB (via Mongoose)

**Tools:**
- Visual Studio Code
- npm (Node Package Manager)

---

## 📂 Project Structure
toystore/
│
├── backend/ # Node.js + Express (optional)
│ ├── models/ # Mongoose models (toys, users)
│ ├── routes/ # API routes
│ └── server.js # Main backend server file
│
└── frontend/ # React.js frontend
├── src/
│ ├── components/ # Reusable components (Navbar, ToyCard, etc.)
│ ├── pages/ # Pages (Home, Cart, Login, Success)
│ ├── redux/ # Redux store and slices
│ ├── App.js # Main app component
│ └── index.js # React entry point
└── package.json # Frontend dependencies

STEPS ON HOW TO RUN THE WEBSITE !!

1. Run Frontend.

bash
cd frontend
npm install
npm start

Your React app will run on http://localhost:3000.


2. Run Backend
bash
cd backend
npm install
npm start

Backend will run on http://localhost:5000.
