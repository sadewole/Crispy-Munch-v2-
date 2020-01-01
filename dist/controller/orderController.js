"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

var _helper = _interopRequireDefault(require("../middlewares/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Order = _db["default"].Order;
var logs = {
  getAllOrder: function getAllOrder(req, res) {
    var orders, data, i, order, food, user;
    return regeneratorRuntime.async(function getAllOrder$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Order.findAll({}));

          case 3:
            orders = _context.sent;

            if (orders) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              msg: 'Order history is empty'
            }));

          case 6:
            data = [];
            i = 0;

          case 8:
            if (!(i < orders.length)) {
              _context.next = 20;
              break;
            }

            order = orders[i].dataValues;
            _context.next = 12;
            return regeneratorRuntime.awrap(_helper["default"].checkMenu(order.menu_id));

          case 12:
            food = _context.sent;
            _context.next = 15;
            return regeneratorRuntime.awrap(_helper["default"].findUserById(order.user_id));

          case 15:
            user = _context.sent;
            data.push(Object.assign(order, {
              food: food,
              user: user
            }));

          case 17:
            i++;
            _context.next = 8;
            break;

          case 20:
            return _context.abrupt("return", res.status(200).json({
              TYPE: 'GET',
              count: data.length,
              status: 200,
              msg: 'List of orders',
              data: data
            }));

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              msg: _context.t0
            }));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 23]]);
  },
  addNewOrder: function addNewOrder(req, res) {
    var menuId, quantity, findMenu, data;
    return regeneratorRuntime.async(function addNewOrder$(_context2) {
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
            return regeneratorRuntime.awrap(_helper["default"].checkMenu(menuId));

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
            return regeneratorRuntime.awrap(Order.create({
              id: (0, _v["default"])(),
              menu_id: findMenu.id,
              user_id: req.user.id,
              quantity: quantity,
              amount: quantity * findMenu.price,
              payment: 'pending',
              status: 'new'
            }));

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
    }, null, null, [[1, 16]]);
  },
  getSingleOrder: function getSingleOrder(req, res) {
    var id, data, findOne, order, food, user;
    return regeneratorRuntime.async(function getSingleOrder$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            data = [];
            _context3.next = 5;
            return regeneratorRuntime.awrap(Order.findOne({
              where: {
                id: id
              }
            }));

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
            return regeneratorRuntime.awrap(_helper["default"].checkMenu(order.menu_id));

          case 11:
            food = _context3.sent;
            _context3.next = 14;
            return regeneratorRuntime.awrap(_helper["default"].findUserById(order.user_id));

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
    }, null, null, [[1, 19]]);
  },
  updateQuantity: function updateQuantity(req, res) {
    var id, quantity, findId, findMenu, data;
    return regeneratorRuntime.async(function updateQuantity$(_context4) {
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
            return regeneratorRuntime.awrap(Order.findOne({
              where: {
                id: id
              }
            }));

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
            return regeneratorRuntime.awrap(_helper["default"].checkMenu(findId.menu_id));

          case 12:
            findMenu = _context4.sent;
            _context4.next = 15;
            return regeneratorRuntime.awrap(Order.update({
              quantity: quantity,
              amount: quantity * findMenu.price
            }, {
              returning: true,
              where: {
                id: id
              }
            }));

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
    }, null, null, [[2, 19]]);
  },
  updateStatus: function updateStatus(req, res) {
    var id, status, findId, data;
    return regeneratorRuntime.async(function updateStatus$(_context5) {
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
            return regeneratorRuntime.awrap(Order.findOne({
              where: {
                id: id
              }
            }));

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
            return regeneratorRuntime.awrap(Order.update({
              status: status
            }, {
              returning: true,
              where: {
                id: id
              }
            }));

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
    }, null, null, [[2, 15]]);
  },
  getUserHistory: function getUserHistory(req, res) {
    var rows, data, i, row, food;
    return regeneratorRuntime.async(function getUserHistory$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(Order.findAll({
              where: {
                user_id: req.user.id
              }
            }));

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
            return regeneratorRuntime.awrap(_helper["default"].checkMenu(row.menu_id));

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
    }, null, null, [[0, 20]]);
  },
  updateUserOrders: function updateUserOrders(req, res) {
    var _req$value$body, address, email, phone, status, data;

    return regeneratorRuntime.async(function updateUserOrders$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$value$body = req.value.body, address = _req$value$body.address, email = _req$value$body.email, phone = _req$value$body.phone;
            _context7.prev = 1;
            status = req.body.status;

            if (status === null || status === undefined) {
              status = 'new';
            }

            _context7.next = 6;
            return regeneratorRuntime.awrap(Order.update({
              address: address,
              email: email,
              phone: phone,
              status: status,
              orderedDate: new Date(),
              payment: 'paid'
            }, {
              returning: true,
              where: {
                user_id: req.user.id
              }
            }));

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
            res.status(500).json({
              msg: _context7.t0
            });

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[1, 10]]);
  },
  deleteOrder: function deleteOrder(req, res) {
    var id, findId;
    return regeneratorRuntime.async(function deleteOrder$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return regeneratorRuntime.awrap(Order.findOne({
              where: {
                id: id
              }
            }));

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
            return regeneratorRuntime.awrap(Order.destroy({
              where: {
                id: id
              }
            }));

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
    }, null, null, [[1, 12]]);
  },
  totalPendingPayment: function totalPendingPayment(req, res) {
    var pending, paid, datas;
    return regeneratorRuntime.async(function totalPendingPayment$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            pending = 0;
            paid = 0;
            _context9.next = 5;
            return regeneratorRuntime.awrap(Order.findAll({}));

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
            return regeneratorRuntime.awrap(datas.map(function (data) {
              if (data.payment === 'pending') {
                pending += data.amount;
              }

              if (data.payment === 'paid') {
                paid += data.amount;
              }

              return;
            }));

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
    }, null, null, [[0, 13]]);
  }
};
var _default = logs;
exports["default"] = _default;