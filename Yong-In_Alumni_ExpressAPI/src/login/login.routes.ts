const express = require("express");
const router = express.Router();
const loginController = require('../login/login.controller');

// Render login page
router.get('/', loginController.renderLogin);

// Handle login form submission
router.post('/', loginController.loginUser);

export default router;
