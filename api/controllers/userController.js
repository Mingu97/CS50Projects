const bcrypt = require('bcrypt'); // For password hashing
const { client } = require('../db'); // Import the 'client' from server.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('dotenv').config(); // Load environment variables from a .env file


// Controller function for user registration
const register = async (req, res) => {
  try {
    await client.connect()
    const { username, email, password } = req.body;

    const collection = client.db('katalog').collection('_users');

    const existingUser = await collection.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (existingUser) {
      // Check which field is causing the duplicate
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already in use' });
      } else if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already in use' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await collection.insertOne(newUser);

    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
  await client.close();


};

// Controller function for user login
const login = async (req, res, next) => {
  try {
    await client.connect();
    const { username, password } = req.body;

    const collection = client.db('katalog').collection('_users');

    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.MY_APP_SECRET_KEY, { expiresIn: '1h' });
    // Determine if the connection is secure and set the appropriate options
    const isLocalhost = req.hostname === 'localhost';
    const secureOption = isLocalhost ? false : true;
    const sameSiteOption = isLocalhost ? 'Lax' : 'None';

    // Set the cookie with HttpOnly flag, secure option, and sameSite option
    res.cookie('myAppCookie', { token, userId: user._id }, { httpOnly: true, secure: secureOption, sameSite: sameSiteOption });
    res.status(200).json({ message: 'Login successful', token });
    await client.close();

  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { register, login };