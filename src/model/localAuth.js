export default (sequelize, DataTypes) => {
    const LocalAuth = sequelize.define('local_auth', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING
    })

    LocalAuth.associate = models => {
        LocalAuth.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'cascade'
        })
    }

    return LocalAuth
}