"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var LocalAuth = sequelize.define('LocalAuth', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  LocalAuth.associate = function (models) {
    LocalAuth.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'cascade'
    });
  };

  return LocalAuth;
};

exports["default"] = _default;