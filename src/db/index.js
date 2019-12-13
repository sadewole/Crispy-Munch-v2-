import Sequelize from 'sequelize'

const isProduction = process.env.NODE_ENV || 'production';
// local connection string
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`


// connect to pg
const db = new Sequelize(connectionString, {
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default db