const express = require('express');
const cors = require('cors');
const { connectMongo, sequelize } = require('./config/db');
require('dotenv').config();

const menuRoutes = require('./routes/menu');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: '*' })); // Set to Netlify URL in production
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

// Connect databases
connectMongo();
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    return sequelize.sync();
  })
  .then(() => {
    console.log('PostgreSQL tables synced');
  })
  .catch(console.error);

module.exports = app;
