"use strict";
const users = require('../models/usersModel');
const dashboardController = (req, res) => {
    const userId = req.session.userId;
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render('dashboard', { user });
};
module.exports = dashboardController;
