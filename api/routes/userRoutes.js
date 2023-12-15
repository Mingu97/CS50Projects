const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkLoginAttempts = require('../controllers/checkLoginAttempts');
const { body, validationResult } = require('express-validator');

const registrationValidationRules = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('username').isAlphanumeric().withMessage('Username must be alphanumeric'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];

  const validate = async (req, res, next) => {
    console.log("Validating")
    console.log(req.body)
    const errors = await validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array()[0].msg });
  };
// Route for user registration
router.post('/register', registrationValidationRules, validate, userController.register);

// Route for user login
router.post('/login', checkLoginAttempts, userController.login);

router.post('/logout', userController.logout);


module.exports = router;
