// Script to automatically add missing menu items referenced in order_items
const { sequelize } = require('../config/db');
const MenuItemPG = require('../models/menu_item_pg');
const { OrderItem } = require('../models/order');

async function repairMenuItems() {
  try {
    // Find all menu_item_ids in order_items that are missing from menu_items
    const [results] = await sequelize.query(`
      SELECT oi.menu_item_id
      FROM order_items oi
      LEFT JOIN menu_items m ON oi.menu_item_id = m.id
      WHERE m.id IS NULL
      GROUP BY oi.menu_item_id
    `);

    if (!results.length) {
      console.log('No missing menu items found.');
      return;
    }

    for (const row of results) {
      const id = row.menu_item_id;
      // Insert a placeholder menu item for each missing id
      await MenuItemPG.create({
        id,
        name: `Unknown Item (${id})`,
        category: 'Unknown',
        description: 'Auto-added placeholder',
        price: 0,
        image: ''
      });
      console.log(`Added placeholder for missing menu item: ${id}`);
    }
    console.log('Repair complete.');
  } catch (err) {
    console.error('Error repairing menu items:', err);
  } finally {
    await sequelize.close();
  }
}

repairMenuItems();
