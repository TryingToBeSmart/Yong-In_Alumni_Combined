// Importing required modules
var users = require("../models/usersModel");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const rolesModel = require('../models/rolesModel');

// Controller function to get all users
const getUsers = (req, res) => {
  // Sending all users as JSON response
  res.json(users);
};

// Controller function to get a user by ID
const getUserById = (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    // If user found, send the user details as JSON response
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    // If user not found, send 400 Bad Request status
    res.sendStatus(400);
  }
};

// Controller function to login a user by userName and password using bcrypt
const loginUser = (req, res) => {
  const { userName, password } = req.body;

  // Find the user by email
  const user = users.find((user) => user.userName === userName);

  if (!user) {
    // If user not found, send 400 Bad Request status
    return res.sendStatus(400);
  }

  // Compare the provided password with the hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      // If password doesn't match, send 400 Bad Request status
      return res.sendStatus(400);
    }

    // Passwords match, so send the user details as JSON response
    res.json(user);
  });
};

// //login user using plain text password
// // Only for testing
// const loginUser = (req, res) => {
//     const { email, password } = req.body;

//     const user = users.find((user) => user.email === email);

//     if (!user) {
//       return res.sendStatus(400);
//     }

//     if (user.password !== password) {
//       return res.sendStatus(400);
//     }

//     res.json(user); // Passwords match, send user details
// };

// Controller function to create a new user
const createUser = (req, res) => {
  const { firstName, lastName, email, userName, password } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.sendStatus(500); // Internal server error
    }

    const newUser = {
      id: uuid.v4(), // Generating a unique ID for the new user
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      password: hash, // Store the hashed password
      membership_status: 'provisional', // Set default membership status
      membership_expiration: null, // Initialize membership expiration
      created_at: new Date(), // Record creation timestamp
      updated_at: new Date(), // Record update timestamp
      role: 2,
    };

    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.userName || !newUser.password) {
      // If any required field is missing, send 400 Bad Request status
      return res.sendStatus(400);
    }

    // Adding the new user to the users array
    users.push(newUser);

    // Add functionality to add the new user to the database here



    // Store user data in the session upon successful register
    // pass all info for now, then change to only necessary info for security
    req.session.user = newUser;
    req.session.userId = newUser.id;
    req.session.firstName = newUser.firstName;
    req.session.lastName = newUser.lastName;
    req.session.userName = newUser.userName;
    req.session.userEmail = newUser.email;
    req.session.userRole = newUser.role;
    
    // Redirect to user dashboard; new user will not be admin
    res.redirect('/dashboard');
  });
};


// Controller function to update an existing user
const updateUser = (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;
    const { name, email, password } = updateUser;

    // Find the user by ID and update details if found
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        // Updating user details if provided in the request
        user.name = name || user.name;
        user.email = email || user.email;

        // Hash the password if included in the request
        if (password) {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              return res.sendStatus(500); // Internal server error
            }
            user.password = hash; // Update the hashed password
            res.json({ msg: "User updated", user });
          });
        } else {
          // Sending success message along with updated user details as JSON response
          res.json({ msg: "User updated", user });
        }
      }
    });
  } else {
    // If user not found, send 400 Bad Request status
    res.sendStatus(400);
  }
};

// Controller function to delete an existing user
const deleteUser = (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    // Filter out the user with the specified ID from the users array
    users = users.filter((user) => user.id !== parseInt(req.params.id));

    // Sending success message along with updated users array as JSON response
    res.json({
      msg: "User deleted",
      users,
    });
  } else {
    // If user not found, send 400 Bad Request status
    res.sendStatus(400);
  }
};

// Exporting controller functions
module.exports = {
  getUsers,
  getUserById,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
};
