"use strict";

var _passportJwt = require("passport-jwt");

var _passportLocal = require("passport-local");

var _passport = _interopRequireDefault(require("passport"));

var _helper = _interopRequireDefault(require("./middlewares/helper"));

var _db = _interopRequireDefault(require("./db"));

require("dotenv/config");

var _passportGooglePlusToken = _interopRequireDefault(require("passport-google-plus-token"));

var _passportFacebookToken = _interopRequireDefault(require("passport-facebook-token"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _db["default"].User,
    FbAuth = _db["default"].FbAuth,
    LocalAuth = _db["default"].LocalAuth,
    GoogleAuth = _db["default"].GoogleAuth; // init passport JWTStrategy

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
})); // init passport google strategy


_passport["default"].use('googleToken', new _passportGooglePlusToken["default"]({
  clientID: process.env.Google_ID,
  clientSecret: process.env.Google_SECRET,
  passReqToCallback: true
}, function _callee3(req, accessToken, refreshToken, profile, done) {
  var existingUser, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('profile', profile);
          console.log('accessToken', accessToken);
          console.log('profile', profile);
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(_helper["default"].existEmail(profile.emails[0].value));

        case 6:
          existingUser = _context3.sent;

          if (!existingUser) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", done(null, existingUser));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(User.create({
            id: (0, _v["default"])(),
            email: profile.emails[0].value,
            name: profile.displayName,
            role: 'CLIENT'
          }));

        case 11:
          user = _context3.sent;
          _context3.next = 14;
          return regeneratorRuntime.awrap(GoogleAuth.create({
            id: (0, _v["default"])(),
            google_id: profile.id,
            email: profile.emails[0].value,
            user_id: user.id
          }));

        case 14:
          _context3.next = 16;
          return regeneratorRuntime.awrap(LocalAuth.create({
            id: (0, _v["default"])(),
            email: profile.emails[0].value,
            user_id: user.id
          }));

        case 16:
          return _context3.abrupt("return", done(null, user));

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](3);
          done(_context3.t0, false, _context3.t0.message);

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 19]]);
})); // init passport facebook strategy


_passport["default"].use('facebookToken', new _passportFacebookToken["default"]({
  clientID: process.env.FB_OAUTH_ID,
  clientSecret: process.env.FB_OAUTH_SECRET
}, function _callee4(accessToken, refreshToken, profile, done) {
  var existingUser, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_helper["default"].existEmail(profile.emails[0].value));

        case 3:
          existingUser = _context4.sent;

          if (!existingUser) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", done(null, existingUser));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(User.create({
            id: (0, _v["default"])(),
            email: profile.emails[0].value,
            name: profile.displayName
          }));

        case 8:
          user = _context4.sent;
          _context4.next = 11;
          return regeneratorRuntime.awrap(FbAuth.create({
            id: (0, _v["default"])(),
            facebook_id: profile.id,
            email: profile.emails[0].value,
            user_id: user.id,
            role: 'CLIENT'
          }));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(LocalAuth.create({
            id: (0, _v["default"])(),
            email: profile.emails[0].value,
            user_id: user.id
          }));

        case 13:
          return _context4.abrupt("return", done(null, user));

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          done(_context4.t0, false, _context4.t0.message);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
})); // init passport localStrategy


_passport["default"].use('local', new _passportLocal.Strategy({
  usernameField: 'email'
}, function _callee5(email, password, done) {
  var user, comparePassword, gUser;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // confirm email
          email = email.toLowerCase().trim();
          _context5.next = 4;
          return regeneratorRuntime.awrap(_helper["default"].existLocalEmail(email));

        case 4:
          user = _context5.sent;

          if (user) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", done(null, false));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(_helper["default"].comparePassword(password, user.password));

        case 9:
          comparePassword = _context5.sent;

          if (comparePassword) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", done(null, false));

        case 12:
          _context5.next = 14;
          return regeneratorRuntime.awrap(_helper["default"].existEmail(user.email));

        case 14:
          gUser = _context5.sent;
          return _context5.abrupt("return", done(null, gUser));

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", done(_context5.t0, null));

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
}));