const bcrypt = require('bcrypt'); // For password hashing
const { client } = require('../db'); // Import the 'client' from server.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

require('dotenv').config(); // Load environment variables from a .env file


// Controller function for user registration
const register = async (req, res) => {
  console.log('Registering')
  try {

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


};
// Controller function for user login
const login = async (req, res) => {
  try {
    const now = Date.now();
    const { username, password } = req.body;

    const collection = client.db('katalog').collection('_users');

    const user = await collection.findOne({ username });
    console.log('User password hash:', user.password);
    console.log('Provided password:', password);
    
    if (!user) {
      return res.status(404).json({errorType: 'userNotFound', message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      await collection.updateOne({ _id: user._id }, { $inc: { loginAttempts: 1 }, $set: { lastFailedAttempt: now } });
      return res.status(401).json({ errorType: 'incorrectPassword',  message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.MY_APP_SECRET_KEY, { expiresIn: '1h' });
    const isLocalhost = req.hostname === 'localhost';
    const sameSiteOption = isLocalhost ? 'Lax' : 'None';

    res.cookie('myAppCookie', JSON.stringify({ token, userId: user._id }), { httpOnly: false, secure: false, sameSite: sameSiteOption });

    const jsonString = JSON.stringify(user.session);
    const sizeInBytes = new TextEncoder().encode(jsonString).length;
    console.log('Size of the item in bytes:', sizeInBytes);

    const response = { message: 'Login successful', token, session: user.session, user: user.username };
    await collection.updateOne({ _id: user._id }, { $set: { lastFailedAttempt: 0, loginAttempts: 0 } });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed. Internal Server Error.' });
  }
};


// Function to update user session with selected items
const updateSession = async (userId, selectedItems) => {
  try {
    const collection = client.db('katalog').collection('_users');
    await collection.updateOne({ _id: userId }, { $set: { session: selectedItems } });
  } catch (error) {
    console.error('Update session failed:', error);
  } finally {
  }
};

const logout = async (req, res) => {
  try {
    // Extract the selectedItems from the request body
    const { selectedItems } = req.body;

    // Extract userId from the token in the cookie
    const tokenCookie = req.cookies.myAppCookie;

    if (!tokenCookie) {
      return res.status(200).json({ message: 'Already logged out or invalid token.' });
    }

    const { token } = JSON.parse(tokenCookie);

    try {
      // Verify the token
      const decodedToken = jwt.verify(token, process.env.MY_APP_SECRET_KEY);
      const userId = decodedToken.userId;

      // Check if userId is present
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required for logout.' });
      }

      // Your logic to handle the selectedItems, e.g., update the user's session
      const collection = client.db('katalog').collection('_users');
      await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { session: selectedItems } });

      // Clear the cookie on the client side
      res.cookie('myAppCookie', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'None' });

      res.status(200).json({ message: 'Logout successful' });
    } catch (tokenError) {
      // Check if the token is expired
      if (tokenError.name === 'TokenExpiredError') {
        return res.status(200).json({ message: 'Token expired. Already logged out.' });
      }

      console.error('Token verification failed:', tokenError);
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
};

module.exports = { register, login, logout, updateSession };