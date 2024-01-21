import { execute } from '../services/mysql.connector'; 
import { User } from './users.model';
import * as usersQueries from './users.queries';

// DAO functions for users

/**
 * Get all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
export const getAllUsers = async (): Promise<User[]> => {
  const users = await execute<User[]>(usersQueries.getAllUsersQuery, []);
  return users;
};

/**
 * Get a user by ID from the database.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<User | null>} A promise that resolves to the user or null if not found.
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  const users = await execute<User[]>(usersQueries.getUserByIdQuery, [userId]);
  return users.length > 0 ? users[0] : null;
};

/**
 * Create a new user in the database.
 * @param {User} newUser - The user object to be created.
 * @returns {Promise<void>} A promise that resolves when the user is created.
 */
export const createUser = async (newUser: User): Promise<void> => {
  await execute<void>(usersQueries.createUserQuery, [
    newUser.id,
    newUser.firstName,
    newUser.lastName,
    newUser.email,
    newUser.userName,
    newUser.password,
    newUser.membership_status,
    newUser.membership_expiration,
    newUser.created_at,
    newUser.updated_at,
    newUser.role,
  ]);
};

/**
 * Update an existing user in the database.
 * @param {User} updatedUser - The updated user object.
 * @returns {Promise<void>} A promise that resolves when the user is updated.
 */
export const updateUser = async (updatedUser: User): Promise<void> => {
  await execute<void>(usersQueries.updateUserQuery, [
    updatedUser.firstName,
    updatedUser.lastName,
    updatedUser.email,
    updatedUser.userName,
    updatedUser.password,
    updatedUser.membership_status,
    updatedUser.membership_expiration,
    updatedUser.updated_at,
    updatedUser.role,
    updatedUser.id,
  ]);
};

/**
 * Delete a user from the database.
 * @param {string} userId - The ID of the user to be deleted.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await execute<void>(usersQueries.deleteUserQuery, [userId]);
};
