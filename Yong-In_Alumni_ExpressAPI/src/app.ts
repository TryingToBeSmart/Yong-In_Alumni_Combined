import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import { setUserLocals } from './middleware/setUserLocalsMiddleware';
import { isAuthenticated, isAdminAuthenticated } from './middleware/authMiddleware';
import { initializeMySqlConnector } from './services/mysql.connector';

// Import routes
import indexRouter from './routes/index';
import certificateRouter from './routes/certificateRoutes';
import usersRoutes from './users/users.routes';
import loginRoutes from './login/login.routes';
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import adminDashboardRoutes from './admin/adminDashboard.routes';
import adminEditUsersRoutes from './admin/adminEditUsers.routes';
import logoutRoutes from './logout/logout.routes';
import registerRoutes from './routes/registerRoutes';
import sponsorRoutes from './routes/sponsorRoutes';
import newsRoutes from './routes/newsRoutes';
import termsAndConditionsRoutes from './routes/termsAndConditionsRoutes';

const app = express();

// Configure express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    },
  })
);

// Use middleware to set user locals (logged in/out) for every view
app.use(setUserLocals);

// Bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session logging middleware
app.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});

// Initialize MySQL connector
initializeMySqlConnector().catch((error) => {
  console.error('[mysql.connector][Error]: ', error);
  process.exit(1); // Exit the app if MySQL initialization fails
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
app.use('/admin/dashboard', isAdminAuthenticated, adminDashboardRoutes);
app.use('/admin/editUsers', isAdminAuthenticated, adminEditUsersRoutes);
app.use('/dashboard', isAuthenticated, dashboardRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next({ status: 404, message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
