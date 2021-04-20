"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // middlewares

app.use((0, _morgan["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // routes

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
  return regeneratorRuntime.async(function runningDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_models["default"].sequelize.sync());

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
  }, null, null, [[0, 6]]);
}

runningDB();