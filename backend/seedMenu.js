// Script to seed menu items into MongoDB
const mongoose = require('mongoose');
const MenuItem = require('./models/menuItem');
require('dotenv').config();

const menuItems = [
  { name: 'Spring Rolls', category: 'Appetizers', description: 'Crispy vegetable spring rolls', price: 120, image: '' },
  { name: 'Chicken Wings', category: 'Appetizers', description: 'Spicy grilled chicken wings', price: 180, image: '' },
  { name: 'Paneer Tikka', category: 'Appetizers', description: 'Grilled paneer cubes with spices', price: 150, image: '' },
  { name: 'Veg Biryani', category: 'Main Courses', description: 'Aromatic rice with mixed vegetables', price: 220, image: '' },
  { name: 'Butter Chicken', category: 'Main Courses', description: 'Creamy tomato chicken curry', price: 260, image: '' },
  { name: 'Dal Makhani', category: 'Main Courses', description: 'Slow-cooked black lentils', price: 200, image: '' },
  { name: 'Chocolate Brownie', category: 'Desserts', description: 'Warm brownie with chocolate sauce', price: 100, image: '' },
  { name: 'Gulab Jamun', category: 'Desserts', description: 'Soft fried dough balls in syrup', price: 90, image: '' },
  { name: 'Ice Cream Sundae', category: 'Desserts', description: 'Vanilla ice cream with toppings', price: 110, image: '' },
  { name: 'Mango Lassi', category: 'Drinks', description: 'Sweet mango yogurt drink', price: 70, image: '' },
  { name: 'Cold Coffee', category: 'Drinks', description: 'Chilled coffee with ice cream', price: 90, image: '' },
  { name: 'Fresh Lime Soda', category: 'Drinks', description: 'Refreshing lime soda', price: 60, image: '' }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(menuItems);
  console.log('Menu items seeded!');
  mongoose.disconnect();
}

seed();
