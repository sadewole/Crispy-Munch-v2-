"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_index["default"].query("CREATE TABLE IF NOT EXISTS \n        users(\n        id UUID PRIMARY KEY,\n        email text NOT NULL UNIQUE,\n        name text NOT NULL,\n        password text NOT NULL\n        )").then(function (res) {
  console.log(res);

  _index["default"].end();
})["catch"](function (err) {
  console.log(err);

  _index["default"].end();
});