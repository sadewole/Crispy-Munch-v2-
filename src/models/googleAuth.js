export default (sequelize, DataTypes) => {
  const GoogleAuth = sequelize.define('GoogleAuth', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    google_id: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  GoogleAuth.associate = (models) => {
    GoogleAuth.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
  };

  return GoogleAuth;
};
