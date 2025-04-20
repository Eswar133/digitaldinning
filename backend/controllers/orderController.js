// Controller for order-related endpoints
console.log('=== [DEBUG] orderController.js loaded ===');

const { Order, OrderItem } = require('../models/order');
const MenuItemPG = require('../models/menu_item_pg');
const User = require('../models/user');

exports.placeOrder = async (req, res) => {
  console.log('[ORDER][DEBUG] placeOrder called. req.body:', JSON.stringify(req.body));
  // Extra debug for table_number
  if (typeof req.body.table_number === 'undefined') {
    console.log('[ORDER][DEBUG][ALERT] table_number is MISSING in req.body!');
  } else {
    console.log('[ORDER][DEBUG] table_number in req.body:', req.body.table_number);
  }
  console.log('[ORDER] Incoming request body:', JSON.stringify(req.body, null, 2));
  try {
    const { userId, phone_number, cart, table_number } = req.body;
    if (!userId) {
      console.log('[ORDER][ERROR] Missing userId');
      return res.status(400).json({ message: 'Invalid order data: Missing userId' });
    }
    if (!phone_number || phone_number.trim() === '') {
      console.log('[ORDER][ERROR] Missing phone_number');
      return res.status(400).json({ message: 'Invalid order data: Missing phone_number' });
    }
    if (!Array.isArray(cart) || cart.length === 0) {
      console.log('[ORDER][ERROR] Cart is empty or not an array');
      return res.status(400).json({ message: 'Invalid order data: Cart is empty or not an array' });
    }
    if (typeof table_number !== 'number' || isNaN(table_number) || table_number < 1 || table_number > 30) {
      console.log('[ORDER][ERROR] Invalid table_number:', table_number);
      return res.status(400).json({ message: 'Invalid order data: Invalid table_number (must be 1-30)' });
    }
    console.log('[ORDER] Validation passed. Calculating total...');
    let total = 0;
    cart.forEach(item => { total += item.price * item.quantity; });
    console.log('[ORDER] Computed total:', total);
    try {
      console.log('[ORDER] Creating order in DB...');
      const order = await Order.create({ user_id: userId, phone_number, total_price: total, table_number });
      console.log('[ORDER][DEBUG] Order after creation:', order.toJSON());
      if (typeof order.table_number === 'undefined') {
        console.log('[ORDER][DEBUG][ALERT] table_number is MISSING in created order!');
      } else {
        console.log('[ORDER][DEBUG] table_number in created order:', order.table_number);
      }
      console.log('[ORDER] Order created. Creating order items...');
      const orderItems = await Promise.all(cart.map(item =>
        OrderItem.create({
          order_id: order.id,
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          price: item.price,
        })
      ));
      console.log('[ORDER] Order and items created successfully.');
      res.status(201).json({ message: 'Order placed', orderId: order.id });
    } catch (dbErr) {
      console.error('[ORDER][ERROR] DB operation failed:', dbErr.stack || dbErr);
      res.status(500).json({ message: 'Order failed', error: dbErr.message });
    }
  } catch (err) {
    console.error('[ORDER][ERROR] Unexpected failure:', err.stack || err);
    res.status(500).json({ message: 'Order failed', error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  console.log('[ORDER][DEBUG] getOrdersByUser called. req.user:', req.user, 'req.query:', req.query);
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
    // Debug: Log each order and its items
    orders.forEach(order => {
      console.log(`[ORDER][DEBUG] Order #${order.id} table_number:`, order.table_number);
      // Print the full order object for deep inspection
      console.log('[ORDER][DEBUG] Full order object:', order.toJSON());
      if (order.OrderItems) {
        order.OrderItems.forEach(item => {
          console.log(`  OrderItem id: ${item.id}, menu_item_id: ${item.menu_item_id}`);
          if (item.menu_item) {
            console.log(`    menu_item:`, item.menu_item);
          } else {
            console.log('    menu_item is undefined!');
          }
        });
      } else {
        console.log('  No OrderItems found for this order.');
      }
    });
    res.json(orders);
  } catch (err) {
    console.error('Error in getOrdersByUser:', err);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};
