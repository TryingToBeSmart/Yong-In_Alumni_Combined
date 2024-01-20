const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const certificateRouter = require('./routes/certificateRoutes');
const usersRoutes = require('./routes/usersRoutes');
const loginRoutes = require('./routes/loginRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); 
const adminDashboardRoutes = require('./routes/adminDashboardRoutes'); 
const logoutRoutes = require('./routes/logoutRoutes');
const registerRoutes = require('./routes/registerRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const newsRoutes = require('./routes/newsRoutes');
const termsAndConditionsRoutes = require('./routes/termsAndConditionsRoutes');
const session = require('express-session');
const setUserLocals = require('./middleware/setUserLocalsMiddleware');
const { isAuthenticated, isAdminAuthenticated } = require('./middleware/authMiddleware'); // Import authMiddleware


const app = express();

// Configure express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, //add secret in .env file
    resave: false, // Forces the session to be saved back to the store
    saveUninitialized: false, // Does not save uninitialized sessions
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // timeout in 24 hours in milliseconds
    },
}));

// use middleware to set user locals (logged in/out) for every view
app.use(setUserLocals);

// Bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

// Jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});


// Use routes
app.use('/', indexRouter);
app.use('/certificate', certificateRouter);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/auth', authRoutes); 
app.use('/register', registerRoutes);
app.use('/sponsors', sponsorRoutes);
app.use('/news', newsRoutes);
app.use('/termsAndConditions', termsAndConditionsRoutes);
app.use('/admin/dashboard', isAdminAuthenticated, adminDashboardRoutes); // Use isAdminAuthenticated middleware for the dashboard
app.use('/dashboard', isAuthenticated, dashboardRoutes); // Use isAuthenticated middleware for the dashboard


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;