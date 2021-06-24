"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getLocale;

var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));

var _ptBR = _interopRequireDefault(require("date-fns/locale/pt-BR"));

var _zhCN = _interopRequireDefault(require("date-fns/locale/zh-CN"));

var _ja = _interopRequireDefault(require("date-fns/locale/ja"));

var _es = _interopRequireDefault(require("date-fns/locale/es"));

function getLocale(locale) {
  switch (locale) {
    case 'en-US':
      return _enUS["default"];

    case 'pt-BR':
      return _ptBR["default"];

    case 'zh-CN':
      return _zhCN["default"];

    case 'ja':
      return _ja["default"];

    case 'es':
      return _es["default"];

    default:
      return _enUS["default"];
  }
}