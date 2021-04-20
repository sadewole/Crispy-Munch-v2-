"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var FbAuth = sequelize.define('FbAuth', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    fb_id: DataTypes.STRING,
    email: DataTypes.STRING
  });

  FbAuth.associate = function (models) {
    FbAuth.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'cascade'
    });
  };

  return FbAuth;
};

exports["default"] = _default;