import { createPool, Pool } from "mysql";

let pool: Pool | null = null;

const initializeMySqlConnector = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      if (!pool) {
        pool = createPool({
          connectionLimit: parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT || "10"),
          port: parseInt(process.env.MY_SQL_DB_PORT || "3306"),
          host: process.env.MY_SQL_DB_HOST || "127.0.0.1",
          user: process.env.MY_SQL_DB_USER || "root",
          password: process.env.MY_SQL_DB_PASSWORD || "root",
          database: process.env.MY_SQL_DB_DATABASE || "",
        });

        console.debug('MySql Adapter Pool generated successfully');
        console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, connection) => {
          if (err) {
            console.log('error MySql failed to connect');
            reject(new Error('Not able to connect to the database'));
          } else {
            console.log('connection made');
            connection.release();
            resolve();
          }
        });
      } else {
        resolve();
      }
    } catch (error) {
      console.error('[mysql.connector][initializeMySqlConnector][Error]: ', error);
      reject(new Error('Failed to initialize pool'));
    }
  });
};

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  return new Promise<T>(async (resolve, reject) => {
    try {
      await initializeMySqlConnector();

      pool!.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      console.error('[mysql.connector][execute][Error]: ', error);
      reject(new Error('Failed to execute MySQL query'));
    }
  });
};
