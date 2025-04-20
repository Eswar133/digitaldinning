import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Testimonial from '../components/Testimonial';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [phone, setPhone] = useState('');
  const [modal, setModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    try {
      const res = await API.post('/orders', {
        userId: user.id,
        phone_number: phone,
        cart
      }, { headers: { Authorization: `Bearer ${user.token}` } });
      setOrderId(res.data.orderId);
      setModal(true);
      setCart([]);
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed');
    }
  };

  // Update quantity for a cart item
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart(cart.map(item => item.menu_item_id === id ? { ...item, quantity: newQty } : item));
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCart(cart.filter(item => item.menu_item_id !== id));
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <div>Cart is empty.</div> : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.menu_item_id}>
                {item.name} x {item.quantity} = ₹{item.price * item.quantity}
                <button onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <button onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}>+</button>
                <button onClick={() => removeItem(item.menu_item_id)} style={{marginLeft: '8px', color: 'red'}}>Remove</button>
              </li>
            ))}
          </ul>
          <div>Total: ₹{total}</div>
          <div>
            <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
            <button onClick={handleOrder}>Place Order</button>
          </div>
        </>
      )}
      {modal && (
        <div className="modal">
          <div>Order placed! Order ID: {orderId}</div>
          <button onClick={() => { setModal(false); navigate('/orders'); }}>Go to Orders</button>
        </div>
      )}
      <Testimonial />
    </div>
  );
};

export default Cart;
