"use strict";
var users = require("../models/usersModel");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const rolesModel = require('../models/rolesModel');
const getUsers = (req, res) => {
    res.json(users);
};
const getUserById = (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter((user) => user.id === parseInt(req.params.id)));
    }
    else {
        res.sendStatus(400);
    }
};
const loginUser = (req, res) => {
    const { userName, password } = req.body;
    const user = users.find((user) => user.userName === userName);
    if (!user) {
        return res.sendStatus(400);
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.sendStatus(400);
        }
        res.json(user);
    });
};
const createUser = (req, res) => {
    const { firstName, lastName, email, userName, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.sendStatus(500);
        }
        const newUser = {
            id: uuid.v4(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            password: hash,
            membership_status: 'provisional',
            membership_expiration: null,
            created_at: new Date(),
            updated_at: new Date(),
            role: 1,
        };
        if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.userName || !newUser.password) {
            return res.sendStatus(400);
        }
        users.push(newUser);
        req.session.user = newUser;
        req.session.userId = newUser.id;
        req.session.firstName = newUser.firstName;
        req.session.lastName = newUser.lastName;
        req.session.userName = newUser.userName;
        req.session.userEmail = newUser.email;
        res.redirect('/dashboard');
    });
};
const updateUser = (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));
    if (found) {
        const updateUser = req.body;
        const { name, email, password } = updateUser;
        users.forEach((user) => {
            if (user.id === parseInt(req.params.id)) {
                user.name = name || user.name;
                user.email = email || user.email;
                if (password) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            return res.sendStatus(500);
                        }
                        user.password = hash;
                        res.json({ msg: "User updated", user });
                    });
                }
                else {
                    res.json({ msg: "User updated", user });
                }
            }
        });
    }
    else {
        res.sendStatus(400);
    }
};
const deleteUser = (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));
    if (found) {
        users = users.filter((user) => user.id !== parseInt(req.params.id));
        res.json({
            msg: "User deleted",
            users,
        });
    }
    else {
        res.sendStatus(400);
    }
};
module.exports = {
    getUsers,
    getUserById,
    loginUser,
    createUser,
    updateUser,
    deleteUser,
};
