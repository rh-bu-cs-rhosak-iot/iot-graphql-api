import Knex from 'knex';
import config from '../config';

export function loadDBConfig() {
  return {
    client: config.DB_CLIENT,
    connection: {
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE,
      host: config.DB_HOST,
      port: config.DB_PORT
    },
    pool: { min: 5, max: 30 }
  };
}

export function connectDB() {
  const dbConfig = loadDBConfig();
  const db = Knex(dbConfig);

  return db;
}
