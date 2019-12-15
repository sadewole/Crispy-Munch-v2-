import Sequelize from 'sequelize'
import db from '../db'

const User = db.define('users', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secretToken: Sequelize.STRING,
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

export default User