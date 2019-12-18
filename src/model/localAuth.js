export default (sequelize, DataTypes) => {
    const LocalAuth = sequelize.define('local_auth', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        secretToken: DataTypes.STRING,
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    LocalAuth.associate = models => {
        LocalAuth.belongsTo(models.User, {
            foreignKey: 'user_id'
        })
    }

    return LocalAuth
}