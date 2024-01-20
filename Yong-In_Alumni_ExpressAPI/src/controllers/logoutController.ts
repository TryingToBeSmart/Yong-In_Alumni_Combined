function getLogout(req, res, next) {
  // Remove user data in the session upon successful logout
  req.session.userId = null;
  req.session.firstName = null;
  req.session.lastName = null;
  req.session.userName = null;
  req.session.userEmail = null;
  req.session.userPassword = null;
  req.session.userRole == null;
  req.session.user = null;
  // Render the index view
  res.redirect('/');
}

module.exports = {
  getLogout, // Export the controller function
};
