const express = require("express");
const router = express.Router();
const registerController = require('../controllers/registerController');

// Render register page
router.get('/', registerController.renderRegister);

// Handle register form submission
router.post('/', registerController.registerUser);

export default router;