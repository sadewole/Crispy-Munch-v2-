export default (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        orderedDate: DataTypes.DATE,
        phone: DataTypes.STRING,
        status: DataTypes.STRING,
        payment: DataTypes.STRING,
    })

    Order.associate = models => {
        Order.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })
        Order.belongsTo(models.Menu, {
            foreignKey: 'menu_id',
            onDelete: 'CASCADE'
        })
    }

    return Order
}