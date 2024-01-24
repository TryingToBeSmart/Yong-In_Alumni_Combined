//Can probably delete this file

import { RequestHandler, Request, Response } from "express";
import * as UsersController from '../users/users.controller';

// Return all users using the getUsers from the usersController.ts 
export const showAllUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users = await UsersController.getUsers(req, res);

        res.status(200).json(users);
    } catch (error) {
        console.error('[adminEditUsersController][showAllUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users'
        });
    }
};

// Get user by id
export const getUserById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user = await UsersController.getUserById(req, res);

        res.status(200).json(user);
    } catch (error) {
        console.error('[adminEditUsersController][getUserById][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching the user'
        });
    }
};

// Edit user
export const editUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const updatedUser = await UsersController.updateUser(req, res);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('[adminEditUsersController][editUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating the user'
        });
    }
};

// Delete user
export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await UsersController.deleteUser(req, res);

        res.status(200).json(result);
    } catch (error) {
        console.error('[adminEditUsersController][deleteUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting the user'
        });
    }
};
