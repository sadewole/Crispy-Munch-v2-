"use strict";

require('dotenv/config');

var fs = require('fs');

var path = require('path');

var Sequelize = require('sequelize');

var basename = path.basename(__filename);
var db = {};
var connectionString; // Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
} else {
  // local connection string
  connectionString = "postgresql://".concat(process.env.PGUSER, ":").concat(process.env.PGPASSWORD, "@").concat(process.env.PGHOST, ":").concat(process.env.PGPORT, "/").concat(process.env.PGDATABASE);
} // connect to pg


var sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))["default"](sequelize, Sequelize);

  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;