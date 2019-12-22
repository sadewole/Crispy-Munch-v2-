import Sequelize from 'sequelize'
import 'dotenv/config'

const isProduction = process.env.NODE_ENV || 'production';
// local connection string
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

// connect to pg
const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {
    User: sequelize.import('../model/user'),
    LocalAuth: sequelize.import('../model/localAuth'),
    FbAuth: sequelize.import('../model/fbAuth'),
    GoogleAuth: sequelize.import('../model/googleAuth'),
    Menu: sequelize.import('../model/menu'),
    Order: sequelize.import('../model/order')
}

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize

export default db