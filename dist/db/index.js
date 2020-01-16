"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectionString; // Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
} else {
  // local connection string
  connectionString = "postgresql://".concat(process.env.PGUSER, ":").concat(process.env.PGPASSWORD, "@").concat(process.env.PGHOST, ":").concat(process.env.PGPORT, "/").concat(process.env.PGDATABASE);
} // connect to pg


var sequelize = new _sequelize["default"](connectionString, {
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