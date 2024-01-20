const express = require('express');
const router = express.Router();
const { isAdminAuthenticated } = require('../middleware/authMiddleware');
const adminDashboardController = require('../controllers/adminDashboardController');

// Secure route for dashboard
router.get('/', isAdminAuthenticated, adminDashboardController);

module.exports = router;