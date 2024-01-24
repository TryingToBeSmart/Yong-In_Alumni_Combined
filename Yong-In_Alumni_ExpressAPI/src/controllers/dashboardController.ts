const dashboardController = (req, res) => {
  // Get the user data from the session
  const user = req.session.user;

  if (!user) {
    // Handle if user not found
    return res.status(404).send('User not found');
  }

  res.render('dashboard', { title: "Dashboard", user }); // Pass user data to the view
};

module.exports = dashboardController;
