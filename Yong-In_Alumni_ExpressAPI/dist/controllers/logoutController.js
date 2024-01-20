"use strict";
function getLogout(req, res, next) {
    req.session.userId = null;
    req.session.firstName = null;
    req.session.lastName = null;
    req.session.userName = null;
    req.session.userEmail = null;
    req.session.userPassword = null;
    req.session.user = null;
    res.redirect('/');
}
module.exports = {
    getLogout,
};
