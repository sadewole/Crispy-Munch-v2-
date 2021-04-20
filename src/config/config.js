require('dotenv/config');

const {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
  PGDATABASE,
  DATABASE_URL,
} = process.env;

const databaseEnvDetails = {
  username: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  dialect: 'postgres',
  port: PGPORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
};

const config = {
  development: {
    ...databaseEnvDetails,
    database: PGDATABASE,
  },
  test: {
    ...databaseEnvDetails,
    database: PGDATABASE,
  },
  production: {
    ...databaseEnvDetails,
    database: DATABASE_URL,
  },
  ...databaseEnvDetails,
};

module.exports = config;
