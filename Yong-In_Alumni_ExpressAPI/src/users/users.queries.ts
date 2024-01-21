export const getAllUsersQuery = 'SELECT * FROM users';

export const getUserByIdQuery = 'SELECT * FROM users WHERE id = ?';

export const createUserQuery = `
  INSERT INTO users 
  (id, firstName, lastName, email, userName, password, membership_status, membership_expiration, created_at, updated_at, role) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const updateUserQuery = `
  UPDATE users 
  SET firstName = ?, lastName = ?, email = ?, userName = ?, password = ?, 
      membership_status = ?, membership_expiration = ?, updated_at = ?, role = ? 
  WHERE id = ?
`;

export const deleteUserQuery = 'DELETE FROM users WHERE id = ?';
