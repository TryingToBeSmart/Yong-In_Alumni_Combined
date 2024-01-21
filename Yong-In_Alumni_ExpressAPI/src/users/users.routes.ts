const express = require("express");
const router = express.Router();
const usersController = require('../users/users.controller');

// GET users
router.get('/', usersController.getUsers);

// GET user by ID
router.get('/:id', usersController.getUserById);

// POST create user
router.post('/', usersController.createUser);

// PUT update user
router.put('/:id', usersController.updateUser);

// DELETE user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
