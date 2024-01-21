import { getAllUsers } from './../users/users.dao';
const express = require('express');
const router = express.Router();
const adminEditUsersController = require('../admin/adminEditUsers.controller');

// Secure route for dashboard
router.get('/', adminEditUsersController.showAllUsers);

module.exports = router;