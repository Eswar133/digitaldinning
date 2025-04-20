import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingCartButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/cart')}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 1000,
        background: '#fff',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
      }}
      aria-label="Go to cart"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b57f1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
      </svg>
    </button>
  );
};

export default FloatingCartButton;
