export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });


    return User;
}