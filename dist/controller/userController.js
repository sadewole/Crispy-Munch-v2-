"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _nodemailer = _interopRequireDefault(require("../middlewares/nodemailer"));

var _mailTemplate = require("../middlewares/mailTemplate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _db["default"].User,
    LocalAuth = _db["default"].LocalAuth;
var _default = {
  signup: function signup(req, res) {
    var _req$value$body, name, email, password, checkEmail, hash, user, localUser, token;

    return regeneratorRuntime.async(function signup$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$value$body = req.value.body, name = _req$value$body.name, email = _req$value$body.email, password = _req$value$body.password;
            _context.prev = 1;
            email = email.toLowerCase().trim();
            _context.next = 5;
            return regeneratorRuntime.awrap(_helper["default"].existEmail(email));

          case 5:
            checkEmail = _context.sent;

            if (!checkEmail) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              msg: 'Email already exist'
            }));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(_helper["default"].hashPassword(password));

          case 10:
            hash = _context.sent;
            _context.next = 13;
            return regeneratorRuntime.awrap(User.create({
              id: (0, _v["default"])(),
              name: name,
              email: email,
              role: 'CLIENT'
            }));

          case 13:
            user = _context.sent;
            _context.next = 16;
            return regeneratorRuntime.awrap(LocalAuth.create({
              id: (0, _v["default"])(),
              password: hash,
              email: email,
              user_id: user.id
            }));

          case 16:
            localUser = _context.sent;
            _context.next = 19;
            return regeneratorRuntime.awrap(_helper["default"].genToken(localUser));

          case 19:
            token = _context.sent;
            _context.next = 22;
            return regeneratorRuntime.awrap(res.status(201).json({
              status: 201,
              type: 'POST',
              success: true,
              data: user,
              token: "Bearer ".concat(token),
              msg: "Thank you for registering. Check your email to verify account."
            }));

          case 22:
            return _context.abrupt("return", _context.sent);

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(500).json({
              msg: _context.t0
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 25]]);
  },
  signin: function signin(req, res) {
    var user, token;
    return regeneratorRuntime.async(function signin$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = req.user; // gen token

            token = _helper["default"].genToken(user);
            res.status(200).json({
              type: 'POST',
              success: true,
              data: user,
              token: "Bearer ".concat(token),
              msg: "You've successfully signed in"
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  },

  /**
   * Make use of (raect - google - login) to fetch data
   *  at the front-end
   */
  googleSign: function googleSign(req, res) {
    var _req$body$profile, email, name, googleId, existingUser, _token, user, token;

    return regeneratorRuntime.async(function googleSign$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body$profile = req.body.profile, email = _req$body$profile.email, name = _req$body$profile.name, googleId = _req$body$profile.googleId;
            _context3.prev = 1;

            if (!(!email || !name || !googleId)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              msg: "Fields is not allowed to be empty"
            }));

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(_helper["default"].existEmail(email));

          case 6:
            existingUser = _context3.sent;

            if (!existingUser) {
              _context3.next = 12;
              break;
            }

            _context3.next = 10;
            return regeneratorRuntime.awrap(_helper["default"].genToken(existingUser));

          case 10:
            _token = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              type: 'POST',
              success: true,
              data: existingUser,
              token: "Bearer ".concat(_token),
              msg: "You've successfully signed in"
            }));

          case 12:
            _context3.next = 14;
            return regeneratorRuntime.awrap(User.create({
              id: (0, _v["default"])(),
              email: email,
              name: name,
              role: 'CLIENT'
            }));

          case 14:
            user = _context3.sent;
            _context3.next = 17;
            return regeneratorRuntime.awrap(GoogleAuth.create({
              id: (0, _v["default"])(),
              google_id: googleId,
              email: email,
              user_id: user.id
            }));

          case 17:
            _context3.next = 19;
            return regeneratorRuntime.awrap(LocalAuth.create({
              id: (0, _v["default"])(),
              email: email,
              user_id: user.id
            }));

          case 19:
            _context3.next = 21;
            return regeneratorRuntime.awrap(_helper["default"].genToken(user));

          case 21:
            token = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              type: 'POST',
              success: true,
              data: user,
              token: "Bearer ".concat(token),
              msg: "You've successfully signed in"
            }));

          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(400).json({
              success: false,
              msg: _context3.t0.message
            }));

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 25]]);
  },
  secret: function secret(req, res) {
    res.status(200).json({
      type: 'GET',
      data: req.user,
      secret: 'resource'
    });
  },
  // note: this code is no more used in this project
  validate: function validate(req, res) {
    var validate, checkSecret, user, data, token;
    return regeneratorRuntime.async(function validate$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            validate = req.query.validate;
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(_helper["default"].activateSecret(validate));

          case 4:
            checkSecret = _context4.sent;

            if (checkSecret) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: 'Authorization error'
            }));

          case 7:
            _context4.next = 9;
            return regeneratorRuntime.awrap(LocalAuth.update({
              secretToken: '',
              active: true
            }, {
              returning: true,
              where: {
                id: checkSecret.id
              }
            }));

          case 9:
            user = _context4.sent;
            _context4.next = 12;
            return regeneratorRuntime.awrap(User.findOne({
              email: user.email
            }));

          case 12:
            data = _context4.sent;
            // gen token
            token = _helper["default"].genToken(user);
            return _context4.abrupt("return", res.status(200).json({
              type: 'PUT',
              success: true,
              token: "Bearer ".concat(token),
              data: data,
              msg: 'User activated successfully'
            }));

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(500).json({
              success: false,
              msg: _context4.t0
            }));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 17]]);
  },
  verifyEmail: function verifyEmail(req, res) {
    var email, checkEmail, id, token;
    return regeneratorRuntime.async(function verifyEmail$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            email = req.body.email;
            _context5.prev = 1;
            email = email.toLowerCase().trim();

            if (email) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              msg: 'Email field cannot be empty'
            }));

          case 5:
            _context5.next = 7;
            return regeneratorRuntime.awrap(_helper["default"].existLocalEmail(email));

          case 7:
            checkEmail = _context5.sent;

            if (checkEmail) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              success: false,
              msg: 'Error, email not found'
            }));

          case 10:
            id = checkEmail.id; // gen token

            token = _helper["default"].forgotPasswordToken(checkEmail);
            _context5.next = 14;
            return regeneratorRuntime.awrap(_nodemailer["default"].sendEmail('admin@crispymunch.com', email, 'Reset Password', (0, _mailTemplate.html)(token, id)));

          case 14:
            return _context5.abrupt("return", res.status(200).json({
              type: 'POST',
              success: true,
              msg: 'Verified successfully'
            }));

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](1);
            return _context5.abrupt("return", res.status(500).json({
              success: false,
              msg: _context5.t0
            }));

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[1, 17]]);
  },
  changePassword: function changePassword(req, res) {
    var id, password, findId, hash, data, token;
    return regeneratorRuntime.async(function changePassword$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.query.id;
            password = req.body.password;
            _context6.prev = 2;
            _context6.next = 5;
            return regeneratorRuntime.awrap(LocalAuth.findOne({
              where: {
                id: id
              }
            }));

          case 5:
            findId = _context6.sent;

            if (findId) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              msg: 'Not found'
            }));

          case 8:
            _context6.next = 10;
            return regeneratorRuntime.awrap(_helper["default"].hashPassword(password));

          case 10:
            hash = _context6.sent;
            _context6.next = 13;
            return regeneratorRuntime.awrap(LocalAuth.update({
              password: hash
            }, {
              returning: true,
              where: {
                id: id
              }
            }));

          case 13:
            _context6.next = 15;
            return regeneratorRuntime.awrap(_helper["default"].existEmail(findId.email));

          case 15:
            data = _context6.sent;
            // gen token
            token = _helper["default"].genToken(data);
            return _context6.abrupt("return", res.status(200).json({
              type: 'PUT',
              success: true,
              msg: 'Password changed successfully',
              data: data,
              token: "Bearer ".concat(token)
            }));

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](2);
            return _context6.abrupt("return", res.status(500).json({
              msg: _context6.t0.message
            }));

          case 23:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[2, 20]]);
  },
  getAllUser: function getAllUser(req, res) {
    var user;
    return regeneratorRuntime.async(function getAllUser$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;

            if (!(req.user.role !== 'ADMIN')) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt("return", res.status(401).json({
              msg: 'Unauthorised'
            }));

          case 3:
            _context7.next = 5;
            return regeneratorRuntime.awrap(User.findAll({}));

          case 5:
            user = _context7.sent;

            if (!(user.length < 1)) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              msg: 'No User yet'
            }));

          case 8:
            return _context7.abrupt("return", res.status(200).json({
              type: 'GET',
              success: true,
              msg: 'Request successfully',
              data: user
            }));

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            res.status(500).json({
              msg: _context7.t0
            });

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 11]]);
  },
  getSingleUser: function getSingleUser(req, res) {
    var id, user;
    return regeneratorRuntime.async(function getSingleUser$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                id: id
              }
            }));

          case 4:
            user = _context8.sent;

            if (user) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.status(404).json({
              msg: 'User doesn\'t exist'
            }));

          case 7:
            return _context8.abrupt("return", res.status(200).json({
              type: 'GET',
              success: true,
              msg: 'Request successfully',
              data: user
            }));

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            return _context8.abrupt("return", res.status(500).json({
              success: false,
              msg: _context8.t0
            }));

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[1, 10]]);
  },
  upgradeUser: function upgradeUser(req, res) {
    var findUser;
    return regeneratorRuntime.async(function upgradeUser$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;

            if (!(req.user.role !== 'ADMIN')) {
              _context9.next = 3;
              break;
            }

            return _context9.abrupt("return", res.status(401).json({
              msg: 'Unauthorised'
            }));

          case 3:
            _context9.next = 5;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                id: req.params.id
              }
            }));

          case 5:
            findUser = _context9.sent;

            if (findUser) {
              _context9.next = 8;
              break;
            }

            return _context9.abrupt("return", res.status(404).json({
              msg: 'Error, No such user'
            }));

          case 8:
            _context9.next = 10;
            return regeneratorRuntime.awrap(User.update({
              role: 'ADMIN'
            }, {
              where: {
                id: req.params.id
              }
            }));

          case 10:
            return _context9.abrupt("return", res.status(200).json({
              TYPE: 'PUT',
              status: 200,
              msg: 'User now has the role of an admin'
            }));

          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9["catch"](0);
            res.status(500).json({
              msg: _context9.t0
            });

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  deleteSingleUser: function deleteSingleUser(req, res) {
    var id, user;
    return regeneratorRuntime.async(function deleteSingleUser$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id;
            _context10.prev = 1;

            if (!(req.user.role !== 'ADMIN')) {
              _context10.next = 4;
              break;
            }

            return _context10.abrupt("return", res.status(401).json({
              msg: 'Unauthorised'
            }));

          case 4:
            _context10.next = 6;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                id: id
              }
            }));

          case 6:
            user = _context10.sent;

            if (user) {
              _context10.next = 9;
              break;
            }

            return _context10.abrupt("return", res.status(403).json({
              msg: 'Bad request'
            }));

          case 9:
            _context10.next = 11;
            return regeneratorRuntime.awrap(User.destroy({
              where: {
                id: id
              }
            }));

          case 11:
            return _context10.abrupt("return", res.status(200).json({
              type: 'DELETE',
              success: true,
              msg: 'Deleted successfully'
            }));

          case 14:
            _context10.prev = 14;
            _context10.t0 = _context10["catch"](1);
            console.log(_context10.t0);
            return _context10.abrupt("return", res.status(500).json({
              success: false,
              msg: _context10.t0
            }));

          case 18:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[1, 14]]);
  }
};
exports["default"] = _default;