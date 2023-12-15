
require('dotenv').config();
const { client } = require('../db'); // Import the 'client' from server.js

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 1 * 60 * 1000;

const checkLoginAttempts = async (req, res, next) => {
    try {
      const { username } = req.body;
      const collection = client.db('katalog').collection('_users');
  
      const user = await collection.findOne({ username });

      if (!user) {
        return res.status(404).json({ errorType: 'userNotFound', message: 'User not found' });
      }
  
      const now = Date.now();
      const lastFailedAttempt = user.lastFailedAttempt || 0;
  
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS && now - lastFailedAttempt < LOCKOUT_DURATION) {
        const remainingTime = LOCKOUT_DURATION - (now - lastFailedAttempt);
        return res.status(401).json({errorType: 'accountLocked', message: `Account locked. Try again in ${Math.ceil(remainingTime / 1000)} seconds` });
      }
  
      // If lockout duration has expired, reset login attempts
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS && lastFailedAttempt > 0 && now - lastFailedAttempt >= LOCKOUT_DURATION) {
        await collection.updateOne({ _id: user._id }, { $set: { loginAttempts: 0, lastFailedAttempt: null } });
      }
  
      req.loginUser = user; // Attach the user to the request for use in the next middleware (login function)
      next(); // Proceed to the next middleware (login function)
    } catch (error) {
      console.error('Error checking login attempts:', error);
      res.status(500).json({ message: 'Error checking login attempts' });
    }
  };

  
  module.exports = checkLoginAttempts;