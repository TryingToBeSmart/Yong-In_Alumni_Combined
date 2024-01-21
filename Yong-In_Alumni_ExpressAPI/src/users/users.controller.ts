const { hash } = require('bcrypt');
const { v4: uuid } = require('uuid');
const usersDao = require('../users/users.dao');
import { User } from '../users/users.model';

/**
 * Controller function to get all users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await usersDao.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('[usersController][getUsers][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching users',
    });
  }
};

/**
 * Controller function to get a user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const user = await usersDao.getUserById(req.params.id);
    if (user.length > 0) {
      res.json(user[0]);
    } else {
      res.sendStatus(404); // User not found
    }
  } catch (error) {
    console.error('[usersController][getUserById][Error] ', error);
    res.status(500).json({
      message: 'There was an error when fetching the user',
    });
  }
};

/**
 * Controller function to create a new user
 */
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, userName, password } = req.body;
    const hashedPassword = await hash(password, 10);

    const newUser: User = {
      id: uuid(),
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword,
      membership_status: 'provisional',
      membership_expiration: null,
      created_at: new Date(),
      updated_at: new Date(),
      role: 2,
    };

    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.userName || !newUser.password) {
      return res.sendStatus(400); // Bad request if required fields are missing
    }

    await usersDao.createUser(newUser);
    res.redirect('/dashboard');
  } catch (error) {
    console.error('[usersController][createUser][Error] ', error);
    res.status(500).json({
      message: 'There was an error when creating the user',
    });
  }
};

/**
 * Controller function to update an existing user
 */
export const updateUser = async (req, res) => {
  try {
    const foundUser = await usersDao.getUserById(req.params.id);

    if (foundUser.length === 0) {
      return res.sendStatus(404); // User not found
    }

    const { firstName, lastName, email, userName, password } = req.body;
    const updatedUser: User = {
      id: req.params.id,
      firstName: firstName || foundUser[0].firstName,
      lastName: lastName || foundUser[0].lastName,
      email: email || foundUser[0].email,
      userName: userName || foundUser[0].userName,
      password: password ? await hash(password, 10) : foundUser[0].password,
      membership_status: foundUser[0].membership_status,
      membership_expiration: foundUser[0].membership_expiration,
      created_at: foundUser[0].created_at,
      updated_at: new Date(),
      role: foundUser[0].role,
    };

    await usersDao.updateUser(req.params.id, updatedUser);
    res.json({ msg: 'User updated', user: updatedUser });
  } catch (error) {
    console.error('[usersController][updateUser][Error] ', error);
    res.status(500).json({
      message: 'There was an error when updating the user',
    });
  }
};

/**
 * Controller function to delete an existing user
 */
export const deleteUser = async (req, res) => {
  try {
    const foundUser = await usersDao.getUserById(req.params.id);

    if (foundUser.length === 0) {
      return res.sendStatus(404); // User not found
    }

    await usersDao.deleteUser(req.params.id);
    res.json({ msg: 'User deleted', userId: req.params.id });
  } catch (error) {
    console.error('[usersController][deleteUser][Error] ', error);
    res.status(500).json({
      message: 'There was an error when deleting the user',
    });
  }
};
