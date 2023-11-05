const bcrypt = require('bcrypt'); // For password hashing
const { client } = require('../db'); // Import the 'client' from server.js
const User = require('../models/User');

// Controller function for user registration
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const collection = client.db('katalog').collection('_users');

    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await collection.insertOne(newUser);

    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Controller function for user login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const collection = client.db('katalog').collection('_users');
  
    const user = await collection.findOne({username});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};
module.exports = { register, login };
