"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _db["default"].User,
    FbAuth = _db["default"].FbAuth,
    LocalAuth = _db["default"].LocalAuth,
    GoogleAuth = _db["default"].GoogleAuth,
    Menu = _db["default"].Menu;
var helper = {
  // generate hashed password for user
  hashPassword: function hashPassword(password) {
    return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
  },
  // check password validation
  comparePassword: function comparePassword(password, hashPassword) {
    return _bcryptjs["default"].compareSync(password, hashPassword);
  },
  // check for exxisting email
  existEmail: function existEmail(email) {
    return User.findOne({
      where: {
        email: email
      }
    });
  },
  // find user by id
  findUserById: function findUserById(id) {
    return User.findOne({
      where: {
        id: id
      }
    });
  },
  //  Query menu
  checkMenu: function checkMenu(id) {
    return Menu.findOne({
      where: {
        id: id
      }
    });
  },
  existLocalEmail: function existLocalEmail(email) {
    return LocalAuth.findOne({
      where: {
        email: email
      }
    });
  },
  activateSecret: function activateSecret(secretToken) {
    return LocalAuth.findOne({
      where: {
        secretToken: secretToken
      }
    });
  },
  // generate forgot password token
  forgotPasswordToken: function forgotPasswordToken(user) {
    var token = _jsonwebtoken["default"].sign({
      iss: 'codeSecret',
      sub: user.id,
      iat: new Date().getTime()
    }, process.env.JWT_SECRET, {
      expiresIn: '5m'
    });

    return token;
  },
  // generate validation secret token
  activateToken: function activateToken(id) {
    var token = _jsonwebtoken["default"].sign({
      iss: 'codeSecret',
      sub: id,
      iat: new Date().getTime()
    }, process.env.JWT_SECRET);

    return token;
  },
  // generate token
  genToken: function genToken(user) {
    var token = _jsonwebtoken["default"].sign({
      iss: 'codeSecret',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.JWT_SECRET);

    return token;
  },

  /**Validate user schems */
  validateBody: function validateBody(schema) {
    return function (req, res, next) {
      var result = _joi["default"].validate(req.body, schema);

      if (result.error) return res.status(400).json({
        msg: result.error
      }); // check if req.value

      if (!req.value) req.value = {};
      req.value['body'] = result.value;
      next();
    };
  },
  schemas: {
    authSchema: _joi["default"].object().keys({
      name: _joi["default"].string().required(),
      email: _joi["default"].string().email().required(),
      password: _joi["default"].string().required()
    }),
    signSchema: _joi["default"].object().keys({
      email: _joi["default"].string().email().required(),
      password: _joi["default"].string().required()
    }),
    updateUserOrdersSchema: _joi["default"].object().keys({
      email: _joi["default"].string().email().required(),
      address: _joi["default"].string().required(),
      phone: _joi["default"].number().integer().required()
    })
  }
};
var _default = helper;
exports["default"] = _default;