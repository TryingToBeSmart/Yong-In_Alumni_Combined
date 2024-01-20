const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET users
router.get('/', usersController.getUsers);

// GET user by ID
router.get('/:id', usersController.getUserById);

//login user by email and password
router.post('/login', usersController.loginUser);

// POST create user
router.post('/', usersController.createUser);

// PUT update user
router.put('/:id', usersController.updateUser);

// DELETE user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
