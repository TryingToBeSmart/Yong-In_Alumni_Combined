export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    // User is authenticated
    return next();
  } else {
    // User is not authenticated, redirect to login or handle as needed
    res.redirect("/login");
  }
};

// Check if user is Admin
export const isAdminAuthenticated = (req, res, next) => {
  if (req.session && req.session.userRole === 1) {
    // User is authenticated
    return next();
  } else {
    // User is not admin, redirect to regular user dashboard
    res.redirect("/dashboard");
  }
};
