# Digital Diner Frontend

This directory contains the React frontend for the Digital Diner restaurant ordering system.

---

## Overview
Digital Diner lets users browse a categorized menu, add items to a cart, and place pickup orders online. Users can view their order history by phone number. The frontend is built with React and communicates with a Node.js/Express backend (see backend/README.md for API and database details).

---

## Features
- Browse menu items by category (Appetizers, Main Courses, Desserts, Drinks)
- Add items to a shopping cart, view cart, and see total price
- Place pickup orders with contact info
- View order confirmation and past orders by phone number
- Responsive, user-friendly design

---

## Setup & Usage
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure API URL:**
   Create a `.env` file in `/frontend`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   (Change the URL if your backend is running elsewhere)
3. **Start the frontend:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`

---

## Deployment
- Deploy the `/frontend` directory to Netlify or your preferred static hosting.
- Ensure your backend API is accessible from the deployed site (update `REACT_APP_API_URL` if needed).

---

## Project Structure
- `src/pages/` — Main pages (Menu, Cart, Orders, etc.)
- `src/components/` — Shared UI components (Navbar, etc.)
- `src/styles/` — CSS styles

---

## Notes
- For API endpoints, database design, and backend setup, see the main [backend/README.md](../backend/README.md).
- For any issues or questions, contact [manikantapadala358@gmail.com].

