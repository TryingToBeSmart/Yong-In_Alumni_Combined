"use strict";
const users = require("../controllers/usersController");
const renderRegister = (req, res) => {
    res.render("register");
};
const registerUser = (req, res) => {
    users.createUser(req, res);
};
module.exports = {
    renderRegister,
    registerUser
};
