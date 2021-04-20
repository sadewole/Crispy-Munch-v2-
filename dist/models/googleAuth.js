"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var GoogleAuth = sequelize.define('GoogleAuth', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    google_id: DataTypes.STRING,
    email: DataTypes.STRING
  });

  GoogleAuth.associate = function (models) {
    GoogleAuth.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'cascade'
    });
  };

  return GoogleAuth;
};

exports["default"] = _default;