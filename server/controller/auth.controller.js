const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ firstName, lastName, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ token });
  } catch (error) {
    console.log("error: ", error)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    } else if (error.name === 'MongoError') {
      return res.status(500).json({ message: 'Database error', error: error.message });
    } else {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`
        },
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    } else if (error.name === 'MongoError') {
      return res.status(500).json({ message: 'Database error', error: error.message });
    } else {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
};
