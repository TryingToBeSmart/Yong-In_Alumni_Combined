const users = require('../users/users.model'); 

const dashboardController = (req, res) => {
  const userId = req.session.userId;

  // Fetch the user data using the user ID
  const user = users.find((user) => user.id === userId);

  if (!user) {
    // Handle if user not found
    return res.status(404).send('User not found');
  }

  res.render('dashboard', {title: "Dashboard"}); // Pass user data to the view
};

module.exports = dashboardController;
