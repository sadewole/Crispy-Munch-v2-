export default (sequelize, DataTypes) => {
  const FbAuth = sequelize.define('FbAuth', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    fb_id: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  FbAuth.associate = (models) => {
    FbAuth.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
  };

  return FbAuth;
};
