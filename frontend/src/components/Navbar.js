import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const getInitials = name => name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2) : '?';

const Navbar = ({ user, onLogout, cartCount }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdown(false);
    };
    if (dropdown) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdown]);

  return (
    <nav className="navbar sticky-navbar gradient-bg">
      <div className="navbar-left">
        <Link to="/menu" className="brand">FoodieExpress</Link>
      </div>
      {user && (
        <div className="navbar-right">
          <Link to="/menu" className="nav-btn menu-btn" title="Menu">
            <span className="menu-icon" aria-label="menu">🍽️</span>Menu
          </Link>
          <Link to="/cart" className="nav-btn">Cart ({cartCount})</Link>
          <Link to="/orders" className="nav-btn">Orders</Link>
          <div className="user-avatar-group" ref={dropdownRef}>
            <div className="user-avatar" onClick={() => setDropdown(v => !v)}>
              {getInitials(user.fullname)}
            </div>
            {dropdown && (
              <div className="user-dropdown">
                <div className="user-dropdown-name">{user.fullname}</div>
                <button className="user-dropdown-btn" onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
