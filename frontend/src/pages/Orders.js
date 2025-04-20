import React, { useState, useContext } from 'react';
import API from '../api';
import { UserContext } from '../context/UserContext';
import menuNameMap from '../utils/menuNameMap';
import Testimonial from '../components/Testimonial';

const Orders = () => {
  const { user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  const [phone, setPhone] = useState('');

  React.useEffect(() => {
    if (!user || !user.token) return;
    // Fetch all orders for this user
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(res.data);
      } catch (err) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user]);

  const searchOrders = async () => {
    if (!phone) {
      // If search is cleared, fetch all orders
      try {
        const res = await API.get('/orders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(res.data);
      } catch (err) {
        setOrders([]);
      }
      return;
    }
    try {
      const res = await API.get(`/orders?phone=${phone}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(res.data);
    } catch (err) {
      setOrders([]);
      alert(err.response?.data?.message || 'Failed to fetch orders');
    }
  };

  return (
    <div className="orders-page">
      <h2>Order History</h2>
      <div id="orders-search-bar">
        <input type="text" placeholder="Search with phone number" value={phone} onChange={e => setPhone(e.target.value)} />
        <button className="icon-btn" title="Search" onClick={searchOrders}>
          <span role="img" aria-label="search">🔍</span>
        </button>
        {phone && (
          <button className="icon-btn clear-btn" title="Clear" onClick={() => { setPhone(''); searchOrders(); }}>
            <span role="img" aria-label="clear">❌</span>
          </button>
        )}
      </div>

      <div>
        {orders.length === 0 ? <div>No orders found.</div> : (
          <ul className="order-list">
            {orders.map(order => (
              <li key={order.id} className="order-card">
                <div className="order-header">
                  <span>Order #{order.id}</span>
                  <span className="order-date">{new Date(order.created_at).toLocaleString()}</span>
                </div>
                <div className="order-items">
                  {order.OrderItems.map(item => (
                    <div key={item.id} className="order-item">{item.quantity} x <b>{item.menu_item?.name || item.menu_item_id}</b> <span style={{color:'#888'}}>@ ₹{item.price}</span></div>
                  ))}
                </div>
                <div className="order-total">Total: ₹{order.total_price}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Testimonial />
    </div>
  );
};

export default Orders;

