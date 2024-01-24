const express = require('express');
const router = express.Router();
const adminDashboardController = require('../admin/adminDashboard.controller');

// Secure route for dashboard
router.get('/', adminDashboardController);

export default router;