// Controller for menu-related endpoints

const MenuItem = require('../models/menuItem');

exports.getMenu = async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { category } : {};
    console.log('[DEBUG] Menu fetch filter:', filter);
    // Check MongoDB connection state
    const mongoose = require('mongoose');
    console.log('[DEBUG] Mongoose connection readyState:', mongoose.connection.readyState); // 1 = connected
    const menu = await MenuItem.find(filter);
    console.log('[DEBUG] Menu items fetched:', menu.length, menu);
    res.json(menu);
  } catch (err) {
    console.error('[DEBUG] Error fetching menu:', err);
    res.status(500).json({ message: 'Error fetching menu', error: err.message, stack: err.stack });
  }
};

exports.getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item', error: err.message });
  }
};
