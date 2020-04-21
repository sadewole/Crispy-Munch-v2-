"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = void 0;

var html = function html(token, id) {
  return "<h1>Password Reset</h1>\n<p>\nYou're receiving this e-mail because you requested a password reset for your user account on Crispy Munch.</p>\n<br>\n<p>\nIf you didn't request this changes, you can disregard thi email - we have not yet reset your password</p>\n<br>\n\n<a href=\"https://crispy-munch-v2.herokuapp.com/change-password?token=".concat(token, "&id=").concat(id, "\"}>\n<button style='color: red; padding: 10px'>Change my password</button>\n</a>\n");
};

exports.html = html;