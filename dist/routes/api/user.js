"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _helper = _interopRequireDefault(require("../../middlewares/helper"));

var _userController = _interopRequireDefault(require("../../controller/userController"));

var _passport = _interopRequireDefault(require("passport"));

require("../../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// as strategy in ./passport.js needs passport object
// init Router
var router = (0, _express.Router)(); // Routes post signup
// Access public

router.route('/signup').post(_helper["default"].validateBody(_helper["default"].schemas.authSchema), _userController["default"].signup); // Route validate account
// Access private

router.route('/user/validate').put(_userController["default"].validate); // Routes post signin
// Access public

router.route('/signin').post(_passport["default"].authenticate('local', {
  session: false
}), _helper["default"].validateBody(_helper["default"].schemas.signSchema), _userController["default"].signin); // Routes 3rd party signin with google
// Access public

router.route('/oauth/google').post(_passport["default"].authenticate('googleToken', {
  session: false
}), _userController["default"].signin); // Routes 3rd party signin with facebook
// Access public

router.route('/oauth/facebook').post(_passport["default"].authenticate('facebookToken', {
  session: false
}), _userController["default"].signin); // Routes post signin
// Access private

router.route('/secret').get(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].secret); // Routes post forgot password
// Access private

router.route('/verify').post(_userController["default"].verifyEmail).put(_passport["default"].authenticate('forgot', {
  session: false
}), _userController["default"].changePassword);
var _default = router;
exports["default"] = _default;