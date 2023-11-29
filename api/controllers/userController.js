const bcrypt = require('bcrypt'); // For password hashing
const { client } = require('../db'); // Import the 'client' from server.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { ObjectId } = require('mongodb');

require('dotenv').config(); // Load environment variables from a .env file


// Controller function for user registration
const register = async (req, res) => {
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
const login = async (req, res, next) => {
  try {
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
    const isLocalhost = req.hostname === 'localhost';
    //const secureOption = isLocalhost ? false : true;
    const sameSiteOption = isLocalhost ? 'Lax' : 'None';

     // Set the cookie with HttpOnly flag, secure option, and sameSite option
     res.cookie('myAppCookie', JSON.stringify({ token, userId: user._id }), { httpOnly: false, secure: false, sameSite: sameSiteOption });
     const jsonString = JSON.stringify(user.session);
     const sizeInBytes = new TextEncoder().encode(jsonString).length;
     console.log('Size of the item in bytes:', sizeInBytes);

     // Include the session array in the response
     const response = { message: 'Login successful', token, session: user.session };

     res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
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

// Controller function for user logout
const logout = async (req, res) => {
  try {
    // Extract the selectedItems from the request body
    const { selectedItems } = req.body;
    console.log(req.body)
    // Extract userId from the token in the cookie
    const tokenCookie = req.cookies.myAppCookie;
    const { token } = JSON.parse(tokenCookie);

    try {
      // Verify the token
      const decodedToken = jwt.verify(token, process.env.MY_APP_SECRET_KEY);
      const userId = decodedToken.userId;
      console.log("DECODED: ", userId);
      // Check if userId is present
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required for logout.' });
      }
      const objectIdUserId = new ObjectId(userId);

      // Connect to the database

      // Your logic to handle the selectedItems, e.g., update the user's session
      const collection = client.db('katalog').collection('_users');
      await collection.updateOne({ _id: objectIdUserId }, { $set: { session: selectedItems } });
      console.log(selectedItems)
      // Clear the cookie on the client side
      res.cookie('myAppCookie', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'None' });

      res.status(200).json({ message: 'Logout successful' });
    } catch (tokenError) {
      console.error('Token verification failed:', tokenError);
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ message: 'Logout failed' });
  } finally {
    // Close the database connection
  }
};

module.exports = { register, login, logout, updateSession };