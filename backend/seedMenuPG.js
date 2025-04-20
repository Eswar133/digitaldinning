// Script to seed menu items into PostgreSQL (menu_items table)
const { Sequelize } = require('sequelize');
const MenuItemPG = require('./models/menu_item_pg');
require('dotenv').config();

const menuItems = [
  { id: '6804801c6376861924c12152', name: 'Spring Rolls', category: 'Appetizers', description: 'Crispy vegetable spring rolls', price: 120, image: '' },
  { id: '6804655c33071207fe474449', name: 'Chicken Wings', category: 'Appetizers', description: 'Spicy grilled chicken wings', price: 180, image: '' },
  { id: '6804655c33071207fe47444a', name: 'Paneer Tikka', category: 'Appetizers', description: 'Grilled paneer cubes with spices', price: 150, image: '' },
  { id: '6804655c33071207fe47444b', name: 'Veg Biryani', category: 'Main Courses', description: 'Aromatic rice with mixed vegetables', price: 220, image: '' },
  { id: '6804655c33071207fe47444c', name: 'Butter Chicken', category: 'Main Courses', description: 'Creamy tomato chicken curry', price: 260, image: '' },
  { id: '6804655c33071207fe47444d', name: 'Dal Makhani', category: 'Main Courses', description: 'Slow-cooked black lentils', price: 200, image: '' },
  { id: '6804655c33071207fe47444e', name: 'Chocolate Brownie', category: 'Desserts', description: 'Warm brownie with chocolate sauce', price: 100, image: '' },
  { id: '6804655c33071207fe47444f', name: 'Gulab Jamun', category: 'Desserts', description: 'Soft fried dough balls in syrup', price: 90, image: '' },
  { id: '6804655c33071207fe474450', name: 'Ice Cream Sundae', category: 'Desserts', description: 'Vanilla ice cream with toppings', price: 110, image: '' },
  { id: '6804655c33071207fe474451', name: 'Mango Lassi', category: 'Drinks', description: 'Sweet mango yogurt drink', price: 70, image: '' },
  { id: '6804655c33071207fe474452', name: 'Cold Coffee', category: 'Drinks', description: 'Chilled coffee with ice cream', price: 90, image: '' },
  { id: '6804655c33071207fe474453', name: 'Fresh Lime Soda', category: 'Drinks', description: 'Refreshing lime soda', price: 60, image: '' }
];

async function seed() {
  await MenuItemPG.sync({ force: true }); // Recreate table and clear old data
  await MenuItemPG.bulkCreate(menuItems);
  console.log('Menu items seeded into PostgreSQL!');
  process.exit();
}

seed();
