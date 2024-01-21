const express = require("express");
const router = express.Router();
const logoutController = require('../logout/logout.controller');

// Logout
router.get('/', logoutController.getLogout);

module.exports = router;