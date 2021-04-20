"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _models = _interopRequireDefault(require("../models"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

var Order = _models["default"].Order;
var logs = {
  getAllOrder: function () {
    var _getAllOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var orders, data, i, order, food, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(req.user.role !== 'ADMIN')) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                msg: 'Unauthorised'
              }));

            case 3:
              _context.next = 5;
              return Order.findAll({});

            case 5:
              orders = _context.sent;

              if (!(orders.length < 1)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(200).json({
                msg: 'Order history is empty'
              }));

            case 8:
              data = [];
              i = 0;

            case 10:
              if (!(i < orders.length)) {
                _context.next = 22;
                break;
              }

              order = orders[i].dataValues;
              _context.next = 14;
              return _helper["default"].checkMenu(order.menu_id);

            case 14:
              food = _context.sent;
              _context.next = 17;
              return _helper["default"].findUserById(order.user_id);

            case 17:
              user = _context.sent;
              data.push(Object.assign(order, {
                food: food,
                user: user
              }));

            case 19:
              i++;
              _context.next = 10;
              break;

            case 22:
              return _context.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                count: data.length,
                status: 200,
                msg: 'List of orders',
                data: data
              }));

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", res.status(500).json({
                msg: _context.t0
              }));

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 25]]);
    }));

    function getAllOrder(_x, _x2) {
      return _getAllOrder.apply(this, arguments);
    }

    return getAllOrder;
  }(),
  addNewOrder: function () {
    var _addNewOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var menuId, quantity, findMenu, data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              menuId = req.body.menuId;
              _context2.prev = 1;
              quantity = 1;

              if (menuId) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                msg: 'Field is not allowed to be empty'
              }));

            case 5:
              _context2.next = 7;
              return _helper["default"].checkMenu(menuId);

            case 7:
              findMenu = _context2.sent;

              if (findMenu) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(403).json({
                msg: 'Error, No such menu'
              }));

            case 10:
              _context2.next = 12;
              return Order.create({
                id: (0, _v["default"])(),
                menu_id: findMenu.id,
                user_id: req.user.id,
                quantity: quantity,
                email: req.user.email,
                amount: quantity * findMenu.price,
                payment: 'pending',
                status: 'new'
              });

            case 12:
              data = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                TYPE: 'POST',
                status: 200,
                msg: 'Order created successfully',
                data: data
              }));

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);
              res.status(500).json({
                msg: _context2.t0
              });

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 16]]);
    }));

    function addNewOrder(_x3, _x4) {
      return _addNewOrder.apply(this, arguments);
    }

    return addNewOrder;
  }(),
  getSingleOrder: function () {
    var _getSingleOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var id, data, findOne, order, food, user;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.prev = 1;
              data = [];
              _context3.next = 5;
              return Order.findOne({
                where: {
                  id: id
                }
              });

            case 5:
              findOne = _context3.sent;

              if (findOne) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                msg: 'Not Found'
              }));

            case 8:
              order = findOne.dataValues;
              _context3.next = 11;
              return _helper["default"].checkMenu(order.menu_id);

            case 11:
              food = _context3.sent;
              _context3.next = 14;
              return _helper["default"].findUserById(order.user_id);

            case 14:
              user = _context3.sent;
              data.push(Object.assign(order, {
                food: food,
                user: user
              }));
              return _context3.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                msg: 'Request successful',
                data: data
              }));

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](1);
              res.status(500).json({
                msg: _context3.t0
              });

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 19]]);
    }));

    function getSingleOrder(_x5, _x6) {
      return _getSingleOrder.apply(this, arguments);
    }

    return getSingleOrder;
  }(),
  updateQuantity: function () {
    var _updateQuantity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var id, quantity, findId, findMenu, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              quantity = req.body.quantity;
              _context4.prev = 2;

              if (quantity) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                msg: 'Field must not be empty'
              }));

            case 5:
              _context4.next = 7;
              return Order.findOne({
                where: {
                  id: id
                }
              });

            case 7:
              findId = _context4.sent;

              if (findId) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(403).json({
                msg: 'Error, No such order'
              }));

            case 10:
              _context4.next = 12;
              return _helper["default"].checkMenu(findId.menu_id);

            case 12:
              findMenu = _context4.sent;
              _context4.next = 15;
              return Order.update({
                quantity: quantity,
                amount: quantity * findMenu.price
              }, {
                returning: true,
                where: {
                  id: id
                }
              });

            case 15:
              data = _context4.sent;
              return _context4.abrupt("return", res.status(200).json({
                TYPE: 'PUT',
                status: 200,
                msg: 'Order updated successfully',
                data: data[1][0]
              }));

            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](2);
              res.status(400).json({
                msg: _context4.t0
              });

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 19]]);
    }));

    function updateQuantity(_x7, _x8) {
      return _updateQuantity.apply(this, arguments);
    }

    return updateQuantity;
  }(),
  updateStatus: function () {
    var _updateStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var id, status, findId, data;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              status = req.body.status;
              _context5.prev = 2;

              if (status === null || status === undefined) {
                status = 'new';
              }

              _context5.next = 6;
              return Order.findOne({
                where: {
                  id: id
                }
              });

            case 6:
              findId = _context5.sent;

              if (findId) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", res.status(403).json({
                msg: 'Error, No such order'
              }));

            case 9:
              _context5.next = 11;
              return Order.update({
                status: status
              }, {
                returning: true,
                where: {
                  id: id
                }
              });

            case 11:
              data = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                TYPE: 'PATCH',
                status: 200,
                msg: 'Order status updated successfully',
                data: data[1][0]
              }));

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](2);
              console.log(_context5.t0);
              res.status(400).json({
                msg: _context5.t0
              });

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 15]]);
    }));

    function updateStatus(_x9, _x10) {
      return _updateStatus.apply(this, arguments);
    }

    return updateStatus;
  }(),
  getUserHistory: function () {
    var _getUserHistory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var rows, data, i, row, food;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return Order.findAll({
                where: {
                  user_id: req.user.id
                }
              });

            case 3:
              rows = _context6.sent;

              if (rows) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", res.status(404).json({
                msg: 'Cart is empty'
              }));

            case 6:
              data = [];
              i = 0;

            case 8:
              if (!(i < rows.length)) {
                _context6.next = 17;
                break;
              }

              row = rows[i].dataValues;
              _context6.next = 12;
              return _helper["default"].checkMenu(row.menu_id);

            case 12:
              food = _context6.sent;
              data.push(Object.assign(row, {
                food: food
              }));

            case 14:
              i++;
              _context6.next = 8;
              break;

            case 17:
              return _context6.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                msg: 'Request successful',
                status: 200,
                data: data
              }));

            case 20:
              _context6.prev = 20;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(500).json({
                msg: _context6.t0
              }));

            case 23:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 20]]);
    }));

    function getUserHistory(_x11, _x12) {
      return _getUserHistory.apply(this, arguments);
    }

    return getUserHistory;
  }(),
  updateUserOrders: function () {
    var _updateUserOrders = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var _req$value$body, address, phone, status, data;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _req$value$body = req.value.body, address = _req$value$body.address, phone = _req$value$body.phone;
              _context7.prev = 1;
              status = req.body.status;

              if (status === null || status === undefined) {
                status = 'new';
              }

              _context7.next = 6;
              return Order.update({
                address: address,
                phone: phone,
                status: status,
                orderedDate: new Date(),
                payment: 'paid'
              }, {
                returning: true,
                where: {
                  user_id: req.user.id
                }
              });

            case 6:
              data = _context7.sent;
              return _context7.abrupt("return", res.status(200).json({
                TYPE: 'PUT',
                status: 200,
                msg: 'Thank you for shopping with us. Check the menu page to order for more',
                data: data[1]
              }));

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](1);
              console.log(_context7.t0);
              res.status(500).json({
                msg: _context7.t0
              });

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 10]]);
    }));

    function updateUserOrders(_x13, _x14) {
      return _updateUserOrders.apply(this, arguments);
    }

    return updateUserOrders;
  }(),
  deleteOrder: function () {
    var _deleteOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var id, findId;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = req.params.id;
              _context8.prev = 1;
              _context8.next = 4;
              return Order.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              findId = _context8.sent;

              if (findId) {
                _context8.next = 7;
                break;
              }

              return _context8.abrupt("return", res.status(403).json({
                msg: 'Error, No such order'
              }));

            case 7:
              _context8.next = 9;
              return Order.destroy({
                where: {
                  id: id
                }
              });

            case 9:
              return _context8.abrupt("return", res.status(200).json({
                TYPE: 'DELETE',
                status: 200,
                msg: 'Order Deleted successfully'
              }));

            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8["catch"](1);
              res.status(400).json({
                msg: _context8.t0
              });

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[1, 12]]);
    }));

    function deleteOrder(_x15, _x16) {
      return _deleteOrder.apply(this, arguments);
    }

    return deleteOrder;
  }(),
  totalPendingPayment: function () {
    var _totalPendingPayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var pending, paid, datas;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              pending = 0;
              paid = 0;
              _context9.next = 5;
              return Order.findAll({});

            case 5:
              datas = _context9.sent;

              if (datas) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", res.status(404).json({
                msg: 'No sale has been made'
              }));

            case 8:
              _context9.next = 10;
              return datas.map(function (data) {
                if (data.payment === 'pending') {
                  pending += data.amount;
                }

                if (data.payment === 'paid') {
                  paid += data.amount;
                }

                return;
              });

            case 10:
              return _context9.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                status: 200,
                total: {
                  pending: pending,
                  paid: paid
                },
                msg: 'Total sales update'
              }));

            case 13:
              _context9.prev = 13;
              _context9.t0 = _context9["catch"](0);
              console.log(_context9.t0);
              return _context9.abrupt("return", res.status(500).json({
                msg: _context9.t0
              }));

            case 17:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 13]]);
    }));

    function totalPendingPayment(_x17, _x18) {
      return _totalPendingPayment.apply(this, arguments);
    }

    return totalPendingPayment;
  }()
};
var _default = logs;
exports["default"] = _default;