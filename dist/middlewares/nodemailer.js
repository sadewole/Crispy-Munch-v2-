"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

require("dotenv/config");

var transport = _nodemailer["default"].createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

var _default = {
  sendEmail: function sendEmail(from, to, subject, html) {
    return new Promise(function (resolve, reject) {
      transport.sendMail({
        from: from,
        subject: subject,
        to: to,
        html: html
      }, function (err, info) {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
};
exports["default"] = _default;