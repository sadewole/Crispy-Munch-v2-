"use strict";

var _passportJwt = require("passport-jwt");

var _passportLocal = require("passport-local");

var _passport = _interopRequireDefault(require("passport"));

var _helper = _interopRequireDefault(require("./middlewares/helper"));

var _models = _interopRequireDefault(require("./models"));

require("dotenv/config");

var _passportGoogleOauth = require("passport-google-oauth");

var _passportFacebookToken = _interopRequireDefault(require("passport-facebook-token"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _models["default"].User,
    FbAuth = _models["default"].FbAuth,
    LocalAuth = _models["default"].LocalAuth,
    GoogleAuth = _models["default"].GoogleAuth; // init passport JWTStrategy

_passport["default"].use('jwt', new _passportJwt.Strategy({
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, function _callee(payload, done) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              id: payload.sub
            }
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", done(null, false));

        case 6:
          if (!(user.active === false)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", done(null, false));

        case 8:
          return _context.abrupt("return", done(null, user));

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          done(_context.t0, null);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
})); // init passport JWTStrategy for forgot password


_passport["default"].use('forgot', new _passportJwt.Strategy({
  jwtFromRequest: _passportJwt.ExtractJwt.fromUrlQueryParameter('active_token'),
  secretOrKey: process.env.JWT_SECRET
}, function _callee2(payload, done) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(LocalAuth.findOne({
            where: {
              id: payload.sub
            }
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", done(null, false));

        case 6:
          return _context2.abrupt("return", done(null, user));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          done(_context2.t0, null);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
})); // init passport facebook strategy


_passport["default"].use('facebookToken', new _passportFacebookToken["default"]({
  clientID: process.env.FB_OAUTH_ID,
  clientSecret: process.env.FB_OAUTH_SECRET
}, function _callee3(accessToken, refreshToken, profile, done) {
  var existingUser, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_helper["default"].existEmail(profile.emails[0].value));

        case 3:
          existingUser = _context3.sent;

          if (!existingUser) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", done(null, existingUser));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(User.create({
            id: (0, _v["default"])(),
            email: profile.emails[0].value,
            name: profile.displayName
          }));

        case 8:
          user = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(FbAuth.create({
            id: (0, _v["default"])(),
            facebook_id: profile.id,
            email: profile.emails[0].value,
            user_id: user.id,
            role: 'CLIENT'
          }));

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(LocalAuth.create({
            id: (0, _v["default"])(),
            email: profile.emails[0].value,
            user_id: user.id
          }));

        case 13:
          return _context3.abrupt("return", done(null, user));

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          done(_context3.t0, false, _context3.t0.message);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
})); // init passport localStrategy


_passport["default"].use('local', new _passportLocal.Strategy({
  usernameField: 'email'
}, function _callee4(email, password, done) {
  var user, comparePassword, gUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // confirm email
          email = email.toLowerCase().trim();
          _context4.next = 4;
          return regeneratorRuntime.awrap(_helper["default"].existLocalEmail(email));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", done(null, false));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(_helper["default"].comparePassword(password, user.password));

        case 9:
          comparePassword = _context4.sent;

          if (comparePassword) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", done(null, false));

        case 12:
          _context4.next = 14;
          return regeneratorRuntime.awrap(_helper["default"].existEmail(user.email));

        case 14:
          gUser = _context4.sent;
          return _context4.abrupt("return", done(null, gUser));

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", done(_context4.t0, null));

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 18]]);
}));