// Script to add new menu items: Appetizers, Drinks, Main Courses, Desserts
const { sequelize } = require('../config/db');
const MenuItemPG = require('../models/menu_item_pg');

const menuItems = [
  // Appetizers
  { id: '6804801c6376861924c12160', name: 'Spring Rolls', category: 'Appetizers', description: 'Crispy rolls stuffed with veggies', price: 120, image: '' },
  { id: '6804801c6376861924c12161', name: 'Paneer Tikka', category: 'Appetizers', description: 'Grilled paneer cubes with spices', price: 180, image: '' },
  { id: '6804801c6376861924c12162', name: 'Chicken 65', category: 'Appetizers', description: 'Spicy deep-fried chicken', price: 200, image: '' },

  // Drinks
  { id: '6804801c6376861924c12163', name: 'Mango Lassi', category: 'Drinks', description: 'Sweet mango yogurt drink', price: 80, image: '' },
  { id: '6804801c6376861924c12164', name: 'Masala Chai', category: 'Drinks', description: 'Spiced Indian tea', price: 50, image: '' },
  { id: '6804801c6376861924c12165', name: 'Cold Coffee', category: 'Drinks', description: 'Chilled coffee beverage', price: 90, image: '' },

  // Main Courses
  { id: '6804801c6376861924c12166', name: 'Veg Biryani', category: 'Main Course', description: 'Aromatic rice with mixed vegetables', price: 220, image: '' },
  { id: '6804801c6376861924c12167', name: 'Dal Makhani', category: 'Main Course', description: 'Rich and creamy lentil curry', price: 200, image: '' },
  { id: '6804801c6376861924c12168', name: 'Butter Chicken', category: 'Main Course', description: 'Classic chicken curry in creamy tomato sauce', price: 260, image: '' },

  // Desserts
  { id: '6804801c6376861924c12169', name: 'Gulab Jamun', category: 'Desserts', description: 'Sweet milk-solid balls in syrup', price: 90, image: '' },
  { id: '6804801c6376861924c1216a', name: 'Rasmalai', category: 'Desserts', description: 'Soft cheese patties in sweet milk', price: 110, image: '' },
  { id: '6804801c6376861924c1216b', name: 'Ice Cream Sundae', category: 'Desserts', description: 'Cold and creamy sundae', price: 110, image: '' }
];

async function seedMenuItems() {
  try {
    for (const item of menuItems) {
      // Upsert: create if not exists, update if exists
      await MenuItemPG.upsert(item);
      console.log(`Seeded: ${item.name}`);
    }
    console.log('Menu items seeding complete!');
  } catch (err) {
    console.error('Error seeding menu items:', err);
  } finally {
    await sequelize.close();
  }
}

seedMenuItems();
