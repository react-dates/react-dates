"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addModifier = addModifier;
exports.deleteModifier = deleteModifier;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _subMonths = _interopRequireDefault(require("date-fns/subMonths"));

var _isDayVisible = _interopRequireDefault(require("./isDayVisible"));

var _toISODateString = _interopRequireDefault(require("./toISODateString"));

var _toISOMonthString = _interopRequireDefault(require("./toISOMonthString"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function addModifier(updateddays, day, modifier, props, state) {
  var numberOfVisibleMonths = props.numberOfMonths,
      enableOutsideDays = props.enableOutsideDays,
      orientation = props.orientation;
  var firstVisibleMonth = state.currentMonth,
      visibleDays = state.visibleDays;
  var currentMonth = firstVisibleMonth;
  var numberOfMonths = numberOfVisibleMonths;

  if (orientation === _constants.VERTICAL_SCROLLABLE) {
    numberOfMonths = Object.keys(visibleDays).length;
  } else {
    currentMonth = (0, _subMonths["default"])(currentMonth, 1);
    numberOfMonths += 2;
  }

  if (!day || !(0, _isDayVisible["default"])(day, currentMonth, numberOfMonths, enableOutsideDays)) {
    return updateddays;
  }

  var iso = (0, _toISODateString["default"])(day);

  var updateddaysAfterAddition = _objectSpread({}, updateddays);

  if (enableOutsideDays) {
    var monthsToUpdate = Object.keys(visibleDays).filter(function (monthKey) {
      return Object.keys(visibleDays[monthKey]).indexOf(iso) > -1;
    });
    updateddaysAfterAddition = monthsToUpdate.reduce(function (acc, monthIso) {
      var month = updateddays[monthIso] || visibleDays[monthIso];

      if (!month[iso] || !month[iso].has(modifier)) {
        var modifiers = new Set(month[iso]);
        modifiers.add(modifier);
        acc[monthIso] = _objectSpread(_objectSpread({}, month), {}, (0, _defineProperty2["default"])({}, iso, modifiers));
      }

      return acc;
    }, updateddaysAfterAddition);
  } else {
    var monthIso = (0, _toISOMonthString["default"])(day);
    var month = updateddays[monthIso] || visibleDays[monthIso] || {};

    if (!month[iso] || !month[iso].has(modifier)) {
      var modifiers = new Set(month[iso]);
      modifiers.add(modifier);
      updateddaysAfterAddition[monthIso] = _objectSpread(_objectSpread({}, month), {}, (0, _defineProperty2["default"])({}, iso, modifiers));
    }
  }

  return updateddaysAfterAddition;
}

function deleteModifier(updateddays, day, modifier, props, state) {
  var numberOfVisibleMonths = props.numberOfMonths,
      enableOutsideDays = props.enableOutsideDays,
      orientation = props.orientation;
  var firstVisibleMonth = state.currentMonth,
      visibleDays = state.visibleDays;
  var currentMonth = firstVisibleMonth;
  var numberOfMonths = numberOfVisibleMonths;

  if (orientation === _constants.VERTICAL_SCROLLABLE) {
    numberOfMonths = Object.keys(visibleDays).length;
  } else {
    currentMonth = (0, _subMonths["default"])(currentMonth, 1);
    numberOfMonths += 2;
  }

  if (!day || !(0, _isDayVisible["default"])(day, currentMonth, numberOfMonths, enableOutsideDays)) {
    return updateddays;
  }

  var iso = (0, _toISODateString["default"])(day);

  var updateddaysAfterDeletion = _objectSpread({}, updateddays);

  if (enableOutsideDays) {
    var monthsToUpdate = Object.keys(visibleDays).filter(function (monthKey) {
      return Object.keys(visibleDays[monthKey]).indexOf(iso) > -1;
    });
    updateddaysAfterDeletion = monthsToUpdate.reduce(function (acc, monthIso) {
      var month = updateddays[monthIso] || visibleDays[monthIso];

      if (month[iso] && month[iso].has(modifier)) {
        var modifiers = new Set(month[iso]);
        modifiers["delete"](modifier);
        acc[monthIso] = _objectSpread(_objectSpread({}, month), {}, (0, _defineProperty2["default"])({}, iso, modifiers));
      }

      return acc;
    }, updateddaysAfterDeletion);
  } else {
    var monthIso = (0, _toISOMonthString["default"])(day);
    var month = updateddays[monthIso] || visibleDays[monthIso] || {};

    if (month[iso] && month[iso].has(modifier)) {
      var modifiers = new Set(month[iso]);
      modifiers["delete"](modifier);
      updateddaysAfterDeletion[monthIso] = _objectSpread(_objectSpread({}, month), {}, (0, _defineProperty2["default"])({}, iso, modifiers));
    }
  }

  return updateddaysAfterDeletion;
}