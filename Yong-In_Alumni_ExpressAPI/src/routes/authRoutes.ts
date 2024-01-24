const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const users = require('../users/users.model');

// Secure routes
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard'); // Renders a secure dashboard view
});

// Login route
router.get('/login', (req, res) => {
  res.render('login'); // Renders the login.pug file
});

router.post('/login', (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((user) => user.email === email);

  if (!user) {
    // If user not found, send 400 Bad Request status or redirect to login page
    return res.status(400).send('Invalid credentials');
  }

  // Compare the provided password with the hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      // If password doesn't match, send 400 Bad Request status or redirect to login page
      return res.status(400).send('Invalid credentials');
    }
    
    // Passwords match, so send redirect to user dashboard
    res.render('dashboard');
  });
});

export default router;
