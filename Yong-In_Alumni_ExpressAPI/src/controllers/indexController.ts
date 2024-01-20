// Controller function for handling the '/' route logic
function getIndex(req, res, next) {

  // Render the index view
  res.render('index', {title: "Home"});
}

module.exports = {
  getIndex, // Export the controller function
};
