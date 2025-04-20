// Controller for authentication endpoints

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  console.log('Register endpoint hit. Body:', req.body);
  try {
    const { fullname, password } = req.body;
    if (!fullname || !password) {
      console.log('Registration failed: Missing fields');
      return res.status(400).json({ message: 'Missing fields' });
    }
    const hash = await bcrypt.hash(password, 10);
    console.log('Password hashed:', hash);
    const user = await User.create({ fullname, password_hash: hash });
    console.log('User created:', user);
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { fullname, password } = req.body;
    const user = await User.findOne({ where: { fullname } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, fullname: user.fullname }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, fullname: user.fullname, id: user.id });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
