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

var _cloudinaryConfig = _interopRequireDefault(require("../middlewares/cloudinaryConfig"));

var Menu = _models["default"].Menu;
var logs = {
  getAllMenu: function () {
    var _getAllMenu = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Menu.findAll({});

            case 3:
              data = _context.sent;

              if (!(data.length < 1)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(200).json({
                msg: 'Menu is empty',
                data: []
              }));

            case 6:
              return _context.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                status: 200,
                count: data.length,
                msg: 'List of foods in cart',
                data: data
              }));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                msg: _context.t0
              }));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    function getAllMenu(_x, _x2) {
      return _getAllMenu.apply(this, arguments);
    }

    return getAllMenu;
  }(),
  getSingleFood: function () {
    var _getSingleFood = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var id, data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return Menu.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              data = _context2.sent;

              if (data) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                msg: 'Not Found'
              }));

            case 7:
              return _context2.abrupt("return", res.status(200).json({
                TYPE: 'GET',
                status: 200,
                msg: 'Request successful',
                data: data
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(500).json({
                msg: _context2.t0
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }));

    function getSingleFood(_x3, _x4) {
      return _getSingleFood.apply(this, arguments);
    }

    return getSingleFood;
  }(),
  addFood: function () {
    var _addFood = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var _req$body, name, price, image, returnImage, data;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, price = _req$body.price;
              _context3.prev = 1;
              price = Number(price);

              if (!(!name || !price)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                msg: 'Fields is not allowed to be empty'
              }));

            case 5:
              image = null;

              if (!req.file) {
                image = req.imagepath;
              } else {
                image = req.file.path;
              }

              _context3.next = 9;
              return _cloudinaryConfig["default"].v2.uploader.upload(image);

            case 9:
              returnImage = _context3.sent;
              _context3.next = 12;
              return Menu.create({
                id: (0, _v["default"])(),
                name: name,
                price: price,
                image: returnImage.secure_url
              });

            case 12:
              data = _context3.sent;
              return _context3.abrupt("return", res.status(201).json({
                TYPE: 'POST',
                status: 201,
                msg: 'Food added successfully',
                data: data
              }));

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(500).json({
                msg: _context3.t0
              }));

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 16]]);
    }));

    function addFood(_x5, _x6) {
      return _addFood.apply(this, arguments);
    }

    return addFood;
  }(),
  updateFood: function () {
    var _updateFood = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var id, image, returnImage, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              _context4.prev = 1;
              image = null;

              if (!req.file) {
                image = req.imagepath;
              } else {
                image = req.file.path;
              }

              _context4.next = 6;
              return _cloudinaryConfig["default"].uploader.upload(image);

            case 6:
              returnImage = _context4.sent;
              _context4.next = 9;
              return Menu.update({
                name: req.body.name,
                price: Number(req.body.price),
                image: returnImage.secure_url
              }, {
                returning: true,
                where: {
                  id: id
                }
              });

            case 9:
              data = _context4.sent;
              return _context4.abrupt("return", res.status(201).json({
                TYPE: 'PUT',
                status: 201,
                msg: 'Food updated successfully',
                data: data[1][0]
              }));

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(500).json({
                msg: _context4.t0
              }));

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 13]]);
    }));

    function updateFood(_x7, _x8) {
      return _updateFood.apply(this, arguments);
    }

    return updateFood;
  }(),
  deleteFood: function () {
    var _deleteFood = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var id, findId;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.prev = 1;
              _context5.next = 4;
              return Menu.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              findId = _context5.sent;

              if (findId) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.status(403).json({
                msg: 'Unknown request'
              }));

            case 7:
              _context5.next = 9;
              return Menu.destroy({
                where: {
                  id: id
                }
              });

            case 9:
              return _context5.abrupt("return", res.status(200).json({
                TYPE: 'DELETE',
                status: 200,
                msg: 'Food Deleted successfully'
              }));

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(500).json({
                msg: _context5.t0
              }));

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 12]]);
    }));

    function deleteFood(_x9, _x10) {
      return _deleteFood.apply(this, arguments);
    }

    return deleteFood;
  }()
};
var _default = logs;
exports["default"] = _default;