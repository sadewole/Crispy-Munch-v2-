"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _passport = _interopRequireDefault(require("passport"));

var _userRoute = _interopRequireDefault(require("./routes/api/userRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/api/orderRoute"));

var _menuRoute = _interopRequireDefault(require("./routes/api/menuRoute"));

var _models = _interopRequireDefault(require("./models"));

require("regenerator-runtime/runtime");

require("dotenv/config");

var app = (0, _express["default"])(); // middlewares

app.use((0, _morgan["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // routes

app.get('/api/v1/', function (req, res) {
  return res.json({
    message: 'Welcome to crispy munch API'
  }).status(200);
});
app.use('/api/v1', _userRoute["default"]);
app.use('/api/v1', _menuRoute["default"]);
app.use('/api/v1', _orderRoute["default"]); // Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../client/build')));
  app.get(/.*/, function (req, res) {
    res.sendFile(_path["default"].join(__dirname, '../client/build/index.html'));
  });
}

var PORT = process.env.PORT || 5000; // listen to server

app.listen(PORT, console.log("Server running on ".concat(PORT))); // test database

function runningDB() {
  return _runningDB.apply(this, arguments);
}

function _runningDB() {
  _runningDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].sequelize.sync();

          case 3:
            console.log('Connection has been established successfully.');
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error('Unable to connect to the database:', _context.t0.message);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _runningDB.apply(this, arguments);
}

runningDB();