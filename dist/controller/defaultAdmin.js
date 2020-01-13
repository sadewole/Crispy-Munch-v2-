"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _db["default"].User,
    LocalAuth = _db["default"].LocalAuth;

var hash = _helper["default"].hashPassword(process.env.DEFAULT_PASSWORD);

User.create({
  id: (0, _v["default"])(),
  name: process.env.DEFAULT_NAME,
  email: process.env.DEFAULT_EMAIL,
  role: process.env.DEFAULT_ROLE
}).then(function (user) {
  LocalAuth.create({
    id: (0, _v["default"])(),
    password: hash,
    email: process.env.DEFAULT_EMAIL,
    user_id: user.id
  }).then(function (defaultAdmin) {
    console.log(defaultAdmin);
  });
})["catch"](function (err) {
  console.log(err);
});