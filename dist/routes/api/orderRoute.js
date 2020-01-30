"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _helper = _interopRequireDefault(require("../../middlewares/helper"));

var _orderController = _interopRequireDefault(require("../../controller/orderController"));

require("../../passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var validateBody = _helper["default"].validateBody,
    schemas = _helper["default"].schemas;
router.route('/order').get(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].getAllOrder).post(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].addNewOrder);
router.route('/order/:id').get(_orderController["default"].getSingleOrder).put(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].updateQuantity).patch(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].updateStatus)["delete"](_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].deleteOrder);
router.route('/orders/user/').get(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].getUserHistory).put(_passport["default"].authenticate('jwt', {
  session: false
}), validateBody(schemas.updateUserOrdersSchema), _orderController["default"].updateUserOrders);
router.route('/total').get(_passport["default"].authenticate('jwt', {
  session: false
}), _orderController["default"].totalPendingPayment);
var _default = router;
exports["default"] = _default;