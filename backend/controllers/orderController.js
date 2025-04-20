// Controller for order-related endpoints

const { Order, OrderItem } = require('../models/order');
const MenuItemPG = require('../models/menu_item_pg');
const User = require('../models/user');

exports.placeOrder = async (req, res) => {
  console.log('Place order endpoint hit. Body:', req.body);
  try {
    const { userId, phone_number, cart } = req.body;
    if (!userId || !phone_number || !Array.isArray(cart) || cart.length === 0) {
      console.log('Invalid order data:', { userId, phone_number, cart });
      return res.status(400).json({ message: 'Invalid order data' });
    }
    let total = 0;
    cart.forEach(item => { total += item.price * item.quantity; });
    const order = await Order.create({ user_id: userId, phone_number, total_price: total });
    const orderItems = await Promise.all(cart.map(item =>
      OrderItem.create({
        order_id: order.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: item.price,
      })
    ));
    res.status(201).json({ message: 'Order placed', orderId: order.id });
  } catch (err) {
    res.status(500).json({ message: 'Order failed', error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const phone = req.query.phone;
    let whereClause = { user_id: userId };
    if (phone) {
      whereClause.phone_number = phone;
    }
    const orders = await Order.findAll({
      where: whereClause,
      include: [{
        model: OrderItem,
        include: [{
          model: MenuItemPG,
          as: 'menu_item',
          attributes: ['name']
        }]
      }],
      order: [['created_at', 'DESC']]
    });
    console.log('Fetched orders with items:', JSON.stringify(orders, null, 2));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};
