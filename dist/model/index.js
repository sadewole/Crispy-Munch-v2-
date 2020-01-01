"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

require("dotenv/config");

var isProduction = process.env.NODE_ENV || 'production'; // local connection string

var connectionString = "postgresql://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/").concat(process.env.DB_DATABASE); // connect to pg

var pool = new _pg.Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString
}); // check if connected

pool.on('connect', function () {
  console.log('connected to the db');
});
var _default = {
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;