export const getAllUsersQuery = 'SELECT * FROM users';

export const getUserByIdQuery = 'SELECT * FROM users WHERE id = ?';

export const getUserByUserNameQuery = 'SELECT * FROM users WHERE userName = ?';

export const createUserQuery = `
  INSERT INTO users 
  (id, firstName, lastName, email, userName, password, membershipStatus, membershipExpiration, createdAt, updatedAt, role) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const updateUserQuery = `
  UPDATE users 
  SET firstName = ?, lastName = ?, email = ?, userName = ?, password = ?, 
      membershipStatus = ?, membershipExpiration = ?, updatedAt = ?, role = ? 
  WHERE id = ?
`;

export const deleteUserQuery = 'DELETE FROM users WHERE id = ?';
