const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

// Secure route for dashboard
router.get('/', isAuthenticated, dashboardController);

module.exports = router;