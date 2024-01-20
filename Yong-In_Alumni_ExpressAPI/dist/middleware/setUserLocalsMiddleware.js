"use strict";
const setUserLocals = (req, res, next) => {
    res.locals.userId = req.session.userId || null;
    res.locals.firstName = req.session.firstName || null;
    res.locals.lastName = req.session.lastName || null;
    res.locals.userName = req.session.userName || null;
    res.locals.userEmail = req.session.userEmail || null;
    next();
};
module.exports = setUserLocals;
