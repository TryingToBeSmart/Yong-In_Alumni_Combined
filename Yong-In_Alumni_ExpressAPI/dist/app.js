"use strict";
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
const dashboardRoute = require('./routes/dashboardRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const registerRoutes = require('./routes/registerRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const newsRoutes = require('./routes/newsRoutes');
const termsAndConditionsRoutes = require('./routes/termsAndConditionsRoutes');
const session = require('express-session');
const setUserLocals = require('./middleware/setUserLocalsMiddleware');
const { isAuthenticated } = require('./middleware/authMiddleware');
const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
app.use(setUserLocals);
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
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
app.use('/dashboard', isAuthenticated, dashboardRoute);
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
