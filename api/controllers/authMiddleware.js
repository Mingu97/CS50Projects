const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    console.log(req.headers)
    console.log("NO COOKIE UNAUTHORISED ATTEMPT")
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.MY_APP_SECRET_KEY);
    req.user = decoded;
    console.log("Authorised")
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log("JWT Token has expired");

      // Clear the cookie
      res.clearCookie('myAppCookie');

      // Redirect to /login
      return res.status(401).json({message: "Expired Token"});
    } else {
      console.log("UNAUTHORISED ATTEMPT", error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
};
  
module.exports = authenticate;
