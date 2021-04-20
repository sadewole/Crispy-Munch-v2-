"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _helper = _interopRequireDefault(require("../../middlewares/helper"));

var _userController = _interopRequireDefault(require("../../controller/userController"));

var _passport = _interopRequireDefault(require("passport"));

require("../../passport");

// as strategy in ./passport.js needs passport object
// init Router
var router = (0, _express.Router)(); // Routes get all users
// Access Private

router.route('/user/').get(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].getAllUser); // Routes post signup
// Access public

router.route('/user/signup').post(_helper["default"].validateBody(_helper["default"].schemas.authSchema), _userController["default"].signup); // Route validate account
// Access private
// code no longer use in this project
// router.route('/validate').put(userController.validate)
// Routes post signin
// Access public

router.route('/user/signin').post(_passport["default"].authenticate('local', {
  session: false
}), _helper["default"].validateBody(_helper["default"].schemas.signSchema), _userController["default"].signin); // Routes 3rd party signin with google
// Access public

router.route('/user/oauth/google').post(_userController["default"].googleSign); // Routes 3rd party signin with facebook
// Access public

router.route('/user/oauth/facebook').post(_passport["default"].authenticate('facebookToken', {
  session: false
}), _userController["default"].signin); // Routes post signin
// Access private

router.route('/user/secret').get(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].secret); // Routes post forgot password
// Access private

router.route('/user/verify').post(_userController["default"].verifyEmail).put(_passport["default"].authenticate('forgot', {
  session: false
}), _userController["default"].changePassword); // Routes @Desc single user
// Access Private

router.route('/user/:id').get(_userController["default"].getSingleUser).put(_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].upgradeUser)["delete"](_passport["default"].authenticate('jwt', {
  session: false
}), _userController["default"].deleteSingleUser);
var _default = router;
exports["default"] = _default;