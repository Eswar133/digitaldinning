import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { CartContext } from '../context/CartContext';
import Testimonial from '../components/Testimonial';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    API.get('/menu').then(res => {
      setMenu(res.data);
      setCategories(['All', ...Array.from(new Set(res.data.map(item => item.category)))]);
    });
  }, []);

  useEffect(() => { setPage(1); }, [selected]); // Reset page when category changes

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.menu_item_id === item._id);
      if (exists) {
        return prev.map(i => i.menu_item_id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, { menu_item_id: item._id, name: item.name, price: item.price, quantity: 1 }];
      }
    });
  };

  const filtered = selected === 'All' ? menu : menu.filter(i => i.category === selected);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="menu-page">
      <h2>Menu</h2>
      <div className="categories">
        {categories.map(cat => (
          <button key={cat} className={selected === cat ? 'active' : ''} onClick={() => { setSelected(cat); setPage(1); }}>{cat}</button>
        ))}
      </div>
      <div className="menu-list">
        {paginated.map(item => (
          <div key={item._id} className="menu-item">
            <h4>{item.name}</h4>
            <div className="menu-desc">{item.description}</div>
            <div className="menu-price">₹{item.price}</div>
            <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(page-1)} disabled={page===1}>&laquo;</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i+1} className={page === i+1 ? 'active' : ''} onClick={() => setPage(i+1)}>{i+1}</button>
          ))}
          <button onClick={() => setPage(page+1)} disabled={page===totalPages}>&raquo;</button>
        </div>
      )}
      <Testimonial />
    </div>
  );
};

export default Menu;
