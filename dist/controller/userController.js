"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

var _v = _interopRequireDefault(require("uuid/v4"));

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
  secret: function secret(req, res) {
    res.status(200).json({
      type: 'GET',
      data: req.user,
      secret: 'resource'
    });
  },
  // note: this code is no more used in this project
  validate: function validate(req, res) {
    var validate, checkSecret, user, token;
    return regeneratorRuntime.async(function validate$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            validate = req.query.validate;
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_helper["default"].activateSecret(validate));

          case 4:
            checkSecret = _context3.sent;

            if (checkSecret) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              msg: 'Authorisation error'
            }));

          case 7:
            _context3.next = 9;
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
            user = _context3.sent;
            // gen token
            token = _helper["default"].genToken(user);
            return _context3.abrupt("return", res.status(200).json({
              type: 'PUT',
              success: true,
              token: token,
              data: user[1][0],
              msg: 'User activated successfully'
            }));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(500).json({
              success: false,
              msg: _context3.t0
            }));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 14]]);
  },
  verifyEmail: function verifyEmail(req, res) {
    var email, checkEmail, id, token;
    return regeneratorRuntime.async(function verifyEmail$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            email = req.body.email;
            _context4.prev = 1;
            email = email.toLowerCase().trim();

            if (email) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: 'Email field cannot be empty'
            }));

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(_helper["default"].existLocalEmail(email));

          case 7:
            checkEmail = _context4.sent;

            if (checkEmail) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              msg: 'Error, email not found'
            }));

          case 10:
            id = checkEmail.id; // gen token

            token = _helper["default"].forgotPasswordToken(checkEmail);
            return _context4.abrupt("return", res.status(200).json({
              type: 'POST',
              success: true,
              msg: 'Verified successfully',
              data: {
                id: id,
                token: token
              }
            }));

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(500).json({
              success: false,
              msg: _context4.t0
            }));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 15]]);
  },
  changePassword: function changePassword(req, res) {
    var _req$query, id, active_token, password, hash, user, token;

    return regeneratorRuntime.async(function changePassword$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$query = req.query, id = _req$query.id, active_token = _req$query.active_token;
            password = req.body.password;
            _context5.prev = 2;
            _context5.next = 5;
            return regeneratorRuntime.awrap(_helper["default"].hashPassword(password));

          case 5:
            hash = _context5.sent;
            _context5.next = 8;
            return regeneratorRuntime.awrap(LocalAuth.update({
              password: hash
            }, {
              returning: true,
              where: {
                id: id
              }
            }));

          case 8:
            user = _context5.sent;
            // gen token
            token = _helper["default"].genToken(user);
            return _context5.abrupt("return", res.status(200).json({
              type: 'PUT',
              success: true,
              msg: 'Password changed successfully',
              data: user[1][0],
              token: token
            }));

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](2);
            return _context5.abrupt("return", res.status(500).json({
              msg: _context5.t0
            }));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[2, 13]]);
  },
  getAllUser: function getAllUser(req, res) {
    var user;
    return regeneratorRuntime.async(function getAllUser$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;

            if (!(req.user.role !== 'ADMIN')) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(401).json({
              msg: 'Unauthorised'
            }));

          case 3:
            _context6.next = 5;
            return regeneratorRuntime.awrap(User.findAll({}));

          case 5:
            user = _context6.sent;

            if (!(user.length < 1)) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              msg: 'No User yet'
            }));

          case 8:
            return _context6.abrupt("return", res.status(200).json({
              type: 'GET',
              success: true,
              msg: 'Request successfully',
              data: user
            }));

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json({
              msg: _context6.t0
            });

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 11]]);
  },
  getSingleUser: function getSingleUser(req, res) {
    var id, user;
    return regeneratorRuntime.async(function getSingleUser$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                id: id
              }
            }));

          case 4:
            user = _context7.sent;

            if (user) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              msg: 'User doesn\'t exist'
            }));

          case 7:
            return _context7.abrupt("return", res.status(200).json({
              type: 'GET',
              success: true,
              msg: 'Request successfully',
              data: user
            }));

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](1);
            return _context7.abrupt("return", res.status(500).json({
              success: false,
              msg: _context7.t0
            }));

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[1, 10]]);
  },
  upgradeUser: function upgradeUser(req, res) {
    var findUser;
    return regeneratorRuntime.async(function upgradeUser$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;

            if (!(req.user.role !== 'ADMIN')) {
              _context8.next = 3;
              break;
            }

            return _context8.abrupt("return", res.status(401).json({
              msg: 'Unauthorised'
            }));

          case 3:
            _context8.next = 5;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                id: req.params.id
              }
            }));

          case 5:
            findUser = _context8.sent;

            if (findUser) {
              _context8.next = 8;
              break;
            }

            return _context8.abrupt("return", res.status(404).json({
              msg: 'Error, No such user'
            }));

          case 8:
            _context8.next = 10;
            return regeneratorRuntime.awrap(User.update({
              role: 'ADMIN'
            }, {
              where: {
                id: req.params.id
              }
            }));

          case 10:
            return _context8.abrupt("return", res.status(200).json({
              TYPE: 'PUT',
              status: 200,
              msg: 'User now has the role of an admin'
            }));

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](0);
            res.status(500).json({
              msg: _context8.t0
            });

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  deleteSingleUser: function deleteSingleUser(req, res) {
    var id, user;
    return regeneratorRuntime.async(function deleteSingleUser$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id;
            _context9.prev = 1;

            if (!(req.user.role !== 'ADMIN')) {
              _context9.next = 4;
              break;
            }

            return _context9.abrupt("return", res.status(401).json({
              msg: 'Unauthorised'
            }));

          case 4:
            _context9.next = 6;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                id: id
              }
            }));

          case 6:
            user = _context9.sent;

            if (user) {
              _context9.next = 9;
              break;
            }

            return _context9.abrupt("return", res.status(403).json({
              msg: 'Bad request'
            }));

          case 9:
            _context9.next = 11;
            return regeneratorRuntime.awrap(User.destroy({
              where: {
                id: id
              }
            }));

          case 11:
            return _context9.abrupt("return", res.status(200).json({
              type: 'DELETE',
              success: true,
              msg: 'Deleted successfully'
            }));

          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9["catch"](1);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(500).json({
              success: false,
              msg: _context9.t0
            }));

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[1, 14]]);
  }
};
exports["default"] = _default;