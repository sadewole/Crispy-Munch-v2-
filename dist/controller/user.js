"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../model/index"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  signup: function signup(req, res) {
    var _req$value$body, name, email, password, hash, newUser, text, user, token;

    return regeneratorRuntime.async(function signup$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$value$body = req.value.body, name = _req$value$body.name, email = _req$value$body.email, password = _req$value$body.password;
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_helper["default"].hashPassword(password));

          case 4:
            hash = _context.sent;
            newUser = [(0, _v["default"])(), name, email, hash];
            text = "INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4) returning *";
            _context.next = 9;
            return regeneratorRuntime.awrap(_index["default"].query(text, newUser));

          case 9:
            user = _context.sent;
            token = _helper["default"].genToken(user.rows[0]);
            return _context.abrupt("return", res.status(200).json({
              type: 'POST',
              data: user.rows[0],
              token: token,
              msg: "You've successfully signed up"
            }));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);

            if (!(_context.t0.routine === '_bt_check_unique')) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              msg: 'User with that EMAIL already exist'
            }));

          case 18:
            return _context.abrupt("return", res.status(500).json({
              msg: _context.t0
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 14]]);
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
              data: user,
              token: token,
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
      data: req.user.rows[0],
      secret: 'resource'
    });
  }
};
exports["default"] = _default;