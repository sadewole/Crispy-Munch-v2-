export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: {
            type: DataTypes.STRING,
        }
        // method: {
        //     type: Sequelize.ENUM(['local', 'google', 'facebook']),
        //     allowNull: false
        // },
        // local: {
        //     email: Sequelize.STRING,
        //     password: Sequelize.STRING,
        //     name: Sequelize.STRING,
        //     secretToken: Sequelize.STRING,
        //     active: {
        //         type: Sequelize.BOOLEAN,
        //         allowNull: false
        //     }
        // },
        // google: {
        //     id: Sequelize.STRING,
        //     email: Sequelize.STRING
        // },
        // facebook: {
        //     id: Sequelize.STRING,
        //     email: Sequelize.STRING
        // }
    });

    return User;
}