# Digital Diner - Mini Restaurant Ordering System

## Overview
Digital Diner is a full-stack web application for a restaurant to manage online menu browsing and pickup orders. Built with the MERN stack + PostgreSQL, it demonstrates modern web development, clear database design, and seamless user experience.

---

## Table of Contents
- [Features](#features)
- [Database Design & Justification](#database-design--justification)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Assumptions & Challenges](#assumptions--challenges)

---

## Features
- **Menu Display**: Browse categorized menu items (Appetizers, Main Courses, Desserts, Drinks).
- **Shopping Cart**: Add items, view cart, see total price, adjust quantities.
- **Order Placement**: Place pickup orders with phone number and cart contents.
- **Order History**: Search and view past orders by phone number.
- **User Authentication**: (Bonus) Register/login for personalized experience.

---

## Database Design & Justification
- **MongoDB**: Used for menu items. Menu data is flexible (can add fields, change categories easily), and doesn't require complex relations—MongoDB's schema-less nature is ideal.
- **PostgreSQL**: Used for users and orders. Orders and users are highly structured and relational (orders reference users, order items reference menu items by ID), making PostgreSQL the best fit for data integrity and query efficiency.

**Models:**
- `MenuItem` (MongoDB): name, category, description, price, image
- `User` (PostgreSQL): id, fullname, password_hash
- `Order` (PostgreSQL): id, user_id, phone_number, total_price, created_at
- `OrderItem` (PostgreSQL): id, order_id, menu_item_id, quantity, price

---

## Backend Setup
1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Configure environment:**
   Create a `.env` file in `/backend`:
   ```
   PG_URI=postgres://postgres:YOUR_PASSWORD@localhost:5432/foodapp
   MONGO_URI=mongodb://localhost:27017/foodapp
   JWT_SECRET=your_jwt_secret
   ```
3. **Start backend server:**
   ```bash
   npm run dev
   ```
4. **Seed menu items:**
   ```bash
   node seedMenu.js
   ```
5. **(Optional) Change ports or DB settings in `.env` as needed.**

---

## Frontend Setup
1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Configure API URL:**
   Create `.env` in `/frontend`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
3. **Start frontend:**
   ```bash
   npm start
   ```

---

## API Endpoints

### Menu
- `GET /api/menu` — Get all menu items (optionally by category)
- `GET /api/menu/:id` — Get details for a single menu item

### Orders
- `POST /api/orders` — Place a new order
  - Body: `{ userId, phone_number, cart }`
- `GET /api/orders?phone=9573621176` — Get orders by phone number
- `GET /api/orders` — Get all orders (admin/staff view)

### Auth (Bonus)
- `POST /api/auth/register` — Register a user
- `POST /api/auth/login` — Login and receive JWT

---

## Deployment
- **Frontend:** Deploy `/frontend` to Netlify. Example: [https://digital-diner.netlify.app](https://digital-diner.netlify.app)
- **Backend:** Deploy `/backend` to Render, Fly.io, or run locally for demo/testing.
- **CORS:** Ensure backend allows requests from your Netlify domain.

---

## Assumptions & Challenges
- **Assumptions:**
  - Menu rarely changes, so seeded via script.
  - Orders are for pickup, not delivery.
  - No payment integration.
  - User authentication is optional but included for bonus.
- **Challenges:**
  - Integrating two databases (MongoDB & PostgreSQL) in one Node.js app.
  - Ensuring seamless UX across both desktop and mobile.
  - Deployment and CORS configuration.

---

## Author & Contact
Built by [Your Name]. For any queries, contact [manikantapadala358@gmail.com].

---

## How to Run Locally
1. Start MongoDB and PostgreSQL locally.
2. Follow Backend and Frontend setup instructions above.
3. Access the app at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend API).

---

## Assessment Mapping
- All requirements are met: menu, cart, order, order history, DB design, API, deployment, and code quality.
- See README sections above for mapping to each assessment criterion.

---

**Please see code comments and commit history for further documentation.**

---

**[Replace placeholder links and contact info with your own before submission.]**

