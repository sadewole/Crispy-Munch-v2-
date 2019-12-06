import { Pool } from 'pg';
import 'dotenv/config';

const isProduction = process.env.NODE_ENV || 'production';
// local connection string
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// connect to pg
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});
// check if connected
pool.on('connect', () => {
  console.log('connected to the db');
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
