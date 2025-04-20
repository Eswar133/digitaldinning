// Mongoose model for menu items (MongoDB)

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
