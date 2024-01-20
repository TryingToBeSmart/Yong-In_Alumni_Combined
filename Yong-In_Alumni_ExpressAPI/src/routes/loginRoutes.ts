const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController');

// Render login page
router.get('/', loginController.renderLogin);

// Handle login form submission
router.post('/', loginController.loginUser);

module.exports = router;
