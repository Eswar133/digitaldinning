import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Testimonial from './components/Testimonial';
import { UserContext, UserProvider } from './context/UserContext';
import { CartProvider, CartContext } from './context/CartContext';
import FloatingCartButton from './components/FloatingCartButton';

const AppRoutes = () => {
  const { user, setUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  return (
    <Router>
      {window.location.pathname !== '/login' && window.location.pathname !== '/register' && user && (
        <Navbar user={user} onLogout={handleLogout} cartCount={cart.length} />
      )}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={user ? <Menu /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/menu" />} />
      </Routes>
      {/* Show floating cart button except on cart page */}
      {window.location.pathname !== '/cart' && user && <FloatingCartButton />}
    </Router>
  );
};

const App = () => (
  <UserProvider>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </UserProvider>
);

export default App;
