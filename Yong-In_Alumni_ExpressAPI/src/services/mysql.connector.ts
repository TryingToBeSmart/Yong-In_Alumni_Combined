import { createPool, Pool } from 'mysql';

let pool: Pool | null = null;

/**
 * Initialize the MySQL connector and tables.
 */
export const initializeMySqlConnector = async (): Promise<void> => {
  try {
    if (pool === null) {
      pool = createPool(getPoolConfig());
    }
    await initializeAllTables();
    console.debug('MySQL Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][initializeMySqlConnector][Error]: ', error);
    throw new Error('Failed to initialize MySQL connector');
  }
};

/**
 * Execute a MySQL query.
 * @param query - The SQL query string.
 * @param params - Parameters for the query.
 * @returns A promise resolving to the query results.
 */
export const execute = async <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (pool === null) {
      // Initialize the pool if it doesn't exist
      pool = createPool(getPoolConfig());
      await initializeAllTables(); // Ensure tables are initialized
      console.debug('MySQL Adapter Pool generated successfully');
    }

    const results = await queryAsync(pool, query, params);
    return results;
  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('Failed to execute MySQL query');
  }
};

/**
 * Execute a MySQL query asynchronously using a specific pool.
 * @param pool - The MySQL connection pool.
 * @param query - The SQL query string.
 * @param params - Parameters for the query.
 * @returns A promise resolving to the query results.
 */
const queryAsync = (pool: Pool, query: string, params: string[] | Object): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

/**
 * Get the MySQL connection pool configuration.
 * @returns Connection pool configuration.
 */
const getPoolConfig = (): any => {
  return {
    connectionLimit: parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT || '10'),
    port: parseInt(process.env.MY_SQL_DB_PORT || '3306'),
    host: process.env.MY_SQL_DB_HOST || '127.0.0.1',
    user: process.env.MY_SQL_DB_USER || 'root',
    password: process.env.MY_SQL_DB_PASSWORD || 'root',
    database: process.env.MY_SQL_DB_DATABASE,
  };
};

/**
 * Create the MySQL database if it doesn't exist.
 * Not using this function
 */
const createDatabase = (): Promise<void> => {
  // SQL query to create the database
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.MY_SQL_DB_DATABASE}`;
  
  // Execute the query to create the database
  return new Promise<void>((resolve, reject) => {
    pool!.query(createDatabaseQuery, [], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Use the MySQL database.
 * Not using this function
 */
const useDatabase = (): Promise<void> => {
  // SQL query to use the database
  const useDatabaseQuery = `USE ${process.env.MY_SQL_DB_DATABASE}`;
  
  // Execute the query to use the database
  return new Promise<void>((resolve, reject) => {
    pool!.query(useDatabaseQuery, [], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Initialize the 'users' table.
 */
const initializeUsersTable = (): Promise<void> => {
  // SQL query to create the 'users' table if it doesn't exist
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      email VARCHAR(255),
      userName VARCHAR(255),
      password VARCHAR(255),
      membershipStatus VARCHAR(50),
      membershipExpiration DATETIME,
      createdAt DATETIME,
      updatedAt DATETIME,
      role INT
    );
  `;

  // Execute the query to create the 'users' table
  return new Promise<void>((resolve, reject) => {
    pool!.query(createUsersTableQuery, [], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Initialize the 'roles' table and insert role data.
 */
const initializeRolesTable = (): Promise<void> => {
  // SQL query to create the 'roles' table if it doesn't exist
  const createRolesTableQuery = `
    CREATE TABLE IF NOT EXISTS roles (
      id INT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  // SQL query to check if 'roles' table exists
  const checkRolesTableQuery = `
    SELECT 1 FROM roles LIMIT 1;
  `;

  // SQL query to insert roles
  const insertRolesQuery = `
    INSERT INTO roles (id, name)
    VALUES
      (1, 'Admin'),
      (2, 'User');
  `;

  // Execute the queries
  return new Promise<void>((resolve, reject) => {
    pool!.query(createRolesTableQuery, [], (error) => {
      if (error) {
        reject(error);
      } else {
        // Check if 'roles' table exists
        pool!.query(checkRolesTableQuery, [], (checkError, results) => {
          if (checkError) {
            reject(checkError);
          } else {
            // If the table does not exist, insert roles
            if (results.length === 0) {
              pool!.query(insertRolesQuery, [], (insertError) => {
                if (insertError) {
                  reject(insertError);
                } else {
                  resolve();
                }
              });
            } else {
              // 'roles' table already exists, resolve
              resolve();
            }
          }
        });
      }
    });
  });
};

/**
 * Initialize all tables.
 */
const initializeAllTables = (): Promise<void> => {
  return Promise.all([initializeUsersTable(), initializeRolesTable()]).then(() => {});
};
