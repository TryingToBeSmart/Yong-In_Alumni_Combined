"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require("bcrypt");
const users = require("../models/usersModel");
const renderLogin = (req, res) => {
    res.render("login", { error: req.query.error });
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const user = users.find((user) => user.userName === userName);
    if (!user) {
        return res.render('login', { error: 'User not found' });
    }
    const match = yield bcrypt.compare(password, user.password);
    if (!match) {
        return res.render('login', { error: 'Invalid password' });
    }
    req.session.user = user;
    req.session.userId = user.id;
    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    req.session.userName = user.userName;
    req.session.userEmail = user.email;
    res.redirect('/dashboard');
});
module.exports = {
    renderLogin,
    loginUser,
};
