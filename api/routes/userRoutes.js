const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

const registrationValidationRules = [
    body('email').isEmail(),
    body('username').isAlphanumeric(),
    body('password').isLength({ min: 5 }),
  ];
  
  const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  };
// Route for user registration
router.post('/register', registrationValidationRules, validate, userController.register);

// Route for user login
router.post('/login', userController.login);

router.post('/logout', userController.logout);



module.exports = router;
