"use strict";
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const users = require('../models/usersModel');
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(400).send('Invalid credentials');
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(400).send('Invalid credentials');
        }
        res.render('dashboard');
    });
});
module.exports = router;
