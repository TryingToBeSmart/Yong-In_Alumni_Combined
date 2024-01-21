// Import necessary modules or define your users array/model
const users = require("../users/users.controller");

// Function to render the register page
const renderRegister = (req, res) => {
    res.render("register", {title: "Register"}); // Renders the register.pug file
};

// createUser with usersController
const registerUser = (req, res) => {
    users.createUser(req, res);
}

module.exports = {
  renderRegister,
  registerUser
};