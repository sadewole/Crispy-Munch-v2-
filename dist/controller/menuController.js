"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _models = _interopRequireDefault(require("../models"));

var _cloudinaryConfig = _interopRequireDefault(require("../middlewares/cloudinaryConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Menu = _models["default"].Menu;
var logs = {
  getAllMenu: function getAllMenu(req, res) {
    var data;
    return regeneratorRuntime.async(function getAllMenu$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Menu.findAll({}));

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
    }, null, null, [[0, 9]]);
  },
  getSingleFood: function getSingleFood(req, res) {
    var id, data;
    return regeneratorRuntime.async(function getSingleFood$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Menu.findOne({
              where: {
                id: id
              }
            }));

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
    }, null, null, [[1, 10]]);
  },
  addFood: function addFood(req, res) {
    var _req$body, name, price, image, returnImage, data;

    return regeneratorRuntime.async(function addFood$(_context3) {
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
            return regeneratorRuntime.awrap(_cloudinaryConfig["default"].v2.uploader.upload(image));

          case 9:
            returnImage = _context3.sent;
            _context3.next = 12;
            return regeneratorRuntime.awrap(Menu.create({
              id: (0, _v["default"])(),
              name: name,
              price: price,
              image: returnImage.secure_url
            }));

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
    }, null, null, [[1, 16]]);
  },
  updateFood: function updateFood(req, res) {
    var id, image, returnImage, data;
    return regeneratorRuntime.async(function updateFood$(_context4) {
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
            return regeneratorRuntime.awrap(_cloudinaryConfig["default"].uploader.upload(image));

          case 6:
            returnImage = _context4.sent;
            _context4.next = 9;
            return regeneratorRuntime.awrap(Menu.update({
              name: req.body.name,
              price: Number(req.body.price),
              image: returnImage.secure_url
            }, {
              returning: true,
              where: {
                id: id
              }
            }));

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
    }, null, null, [[1, 13]]);
  },
  deleteFood: function deleteFood(req, res) {
    var id, findId;
    return regeneratorRuntime.async(function deleteFood$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return regeneratorRuntime.awrap(Menu.findOne({
              where: {
                id: id
              }
            }));

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
            return regeneratorRuntime.awrap(Menu.destroy({
              where: {
                id: id
              }
            }));

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
    }, null, null, [[1, 12]]);
  }
};
var _default = logs;
exports["default"] = _default;