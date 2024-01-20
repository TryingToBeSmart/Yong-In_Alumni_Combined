// Import necessary modules or define your users array/model
const bcrypt = require("bcrypt");
const users = require("../models/usersModel");

// Function to render the login page
const renderLogin = (req, res) => {
  res.render("login", { error: req.query.error, title: "Login" }); // Renders the login.pug file with error message
};

// Function to handle login logic
const loginUser = async (req, res) => {
  // Extract email and password from request body
  const { userName, password } = req.body;

  // Find the user by userName
  const user = users.find((user) => user.userName === userName);

  if (!user) {
    // If user not found, render login page with error message
    return res.render('login', { error: 'User not found', title: "Login" });
  }

  // Compare the provided password with the hashed password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    // If password doesn't match, render login page with error message
    return res.render('login', { error: 'Invalid password', title: "Login" });
  }

  // Store user data in the session upon successful login
  req.session.user = user;
  req.session.userId = user.id;
  req.session.firstName = user.firstName;
  req.session.lastName = user.lastName;
  req.session.userName = user.userName;
  req.session.userEmail = user.email;
  req.session.userRole = user.role;

  // Passwords match, so send redirect to user dashboard

  //Check if admin
  if (user.role === 1) res.redirect('/admin/dashboard'); // if admin
  else res.redirect('/dashboard'); // if not admin
};

module.exports = {
  renderLogin,
  loginUser,
};