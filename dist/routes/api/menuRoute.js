"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _menuController = _interopRequireDefault(require("../../controller/menuController"));

var _multer = _interopRequireDefault(require("../../middlewares/multer"));

require("../../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/menu').get(_menuController["default"].getAllMenu).post(_passport["default"].authenticate('jwt', {
  session: false
}), _multer["default"].single('image'), _menuController["default"].addFood);
router.route('/menu/:id').get(_passport["default"].authenticate('jwt', {
  session: false
}), _menuController["default"].getSingleFood).put(_passport["default"].authenticate('jwt', {
  session: false
}), _multer["default"].single('image'), _menuController["default"].updateFood)["delete"](_passport["default"].authenticate('jwt', {
  session: false
}), _menuController["default"].deleteFood);
var _default = router;
exports["default"] = _default;