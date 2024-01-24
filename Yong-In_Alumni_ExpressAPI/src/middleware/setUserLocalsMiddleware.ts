// Middleware function to set user data for all views
// Probably won't need this
export const setUserLocals = (req, res, next) => {
  res.locals.userId = req.session.userId || null;
  res.locals.firstName = req.session.firstName || null;
  res.locals.lastName = req.session.lastName || null;
  res.locals.userName = req.session.userName || null;
  res.locals.userEmail = req.session.userEmail || null;
  res.locals.userRole = req.session.userRole || null;
//   res.locals.userPassword = req.session.userPassword || null;
  next();
};
