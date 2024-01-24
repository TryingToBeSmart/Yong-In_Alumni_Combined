const bcrypt = require("bcrypt");
const usersDao = require("../users/users.dao");

// Function to render the login page
export const renderLogin = (req, res) => {
  res.render("login", { error: req.query.error, title: "Login" }); // Renders the login.pug file with error message
};

// Function to handle login logic
export const loginUser = async (req, res) => {
  // Extract email and password from request body
  const { userName, password } = req.body;

  try {
    // Get the user from the database based on the userName
    const user = await usersDao.getUserByUserName(userName);
    console.log(`User found: ${{userName}}`);
    if (!user) {
      // If user not found, render login page with error message
      return res.render('login', { error: 'User not found', title: "Login" });
    }

    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    console.log(`password found: ${{password}}`);

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

    // Check if admin
    if (user.role === 1) res.redirect('/admin/dashboard'); // if admin
    else res.redirect('/dashboard'); // if not admin
  } catch (error) {
    console.error('[loginUser][Error] ', error);
    res.status(500).render('error', { error: 'Internal Server Error', title: "Error" });
  }
};
