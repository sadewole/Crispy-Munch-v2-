"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isProduction = process.env.DATABASE_URL; // local connection string
// const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
// connect to pg

var sequelize = new _sequelize["default"](isProduction, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
var db = {
  User: sequelize["import"]('../model/user'),
  LocalAuth: sequelize["import"]('../model/localAuth'),
  FbAuth: sequelize["import"]('../model/fbAuth'),
  GoogleAuth: sequelize["import"]('../model/googleAuth'),
  Menu: sequelize["import"]('../model/menu'),
  Order: sequelize["import"]('../model/order')
};
Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
var _default = db;
exports["default"] = _default;