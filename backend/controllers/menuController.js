// Controller for menu-related endpoints

const MenuItem = require('../models/menuItem');

exports.getMenu = async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { category } : {};
    const menu = await MenuItem.find(filter);
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu', error: err.message });
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
