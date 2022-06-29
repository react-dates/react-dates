"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _moment = _interopRequireDefault(require("moment"));

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _CalendarMonth = _interopRequireDefault(require("../../lib/components/CalendarMonth"));

var _CalendarMonthGrid = _interopRequireDefault(require("../../lib/components/CalendarMonthGrid"));

var _getTransformStyles = _interopRequireDefault(require("../../lib/utils/getTransformStyles"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

describe('CalendarMonthGrid', function () {
  it('the number of CalendarMonths rendered matches props.numberOfMonths + 2', function () {
    var NUM_OF_MONTHS = 5;
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
      numberOfMonths: NUM_OF_MONTHS
    })).dive();
    (0, _chai.expect)(wrapper.find(_CalendarMonth["default"])).to.have.lengthOf(NUM_OF_MONTHS + 2);
  });
  it('has style equal to getTransformStyles(foo)', function () {
    var translationValue = 100;
    var transformStyles = (0, _getTransformStyles["default"])("translateX(".concat(translationValue, "px)"));
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
      translationValue: translationValue
    })).dive();
    Object.keys(transformStyles).forEach(function (key) {
      (0, _chai.expect)(wrapper.prop('style')[key]).to.equal(transformStyles[key]);
    });
  });
  it('does not generate duplicate months', function () {
    var initialMonth = (0, _moment["default"])();
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
      numberOfMonths: 12,
      initialMonth: initialMonth
    })).dive();
    wrapper.instance().componentWillReceiveProps({
      initialMonth: initialMonth,
      numberOfMonths: 24
    });

    var _wrapper$state = wrapper.state(),
        months = _wrapper$state.months;

    var collisions = months.map(function (m) {
      return m.format('YYYY-MM');
    }).reduce(function (acc, m) {
      return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, m, true));
    }, {});
    (0, _chai.expect)(Object.keys(collisions).length).to.equal(months.length);
  });
  it('does not setState if hasMonthChanged and hasNumberOfMonthsChanged are falsy', function () {
    var setState = _sinonSandbox["default"].stub(_CalendarMonthGrid["default"].prototype, 'setState');

    var initialMonth = (0, _moment["default"])();
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
      numberOfMonths: 12,
      initialMonth: initialMonth
    })).dive();
    wrapper.instance().componentWillReceiveProps({
      initialMonth: initialMonth,
      numberOfMonths: 12
    });
    (0, _chai.expect)(setState.callCount).to.eq(0);
  });
  it('works with the same number of months', function () {
    var initialMonth = (0, _moment["default"])();
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
      numberOfMonths: 12,
      initialMonth: initialMonth
    })).dive();
    wrapper.instance().componentWillReceiveProps({
      initialMonth: initialMonth,
      numberOfMonths: 12,
      firstVisibleMonthIndex: 0
    });

    var _wrapper$state2 = wrapper.state(),
        months = _wrapper$state2.months;

    var collisions = months.map(function (m) {
      return m.format('YYYY-MM');
    }).reduce(function (acc, m) {
      return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, m, true));
    }, {});
    (0, _chai.expect)(Object.keys(collisions).length).to.equal(months.length);
  });
  describe('#onMonthSelect', function () {
    it('calls onMonthChange', function () {
      var onMonthChangeSpy = _sinonSandbox["default"].spy();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
        onMonthChange: onMonthChangeSpy
      })).dive();
      var currentMonth = (0, _moment["default"])();
      var newMonthVal = (currentMonth.month() + 5) % 12;
      wrapper.instance().onMonthSelect(currentMonth, newMonthVal);
      (0, _chai.expect)(onMonthChangeSpy.callCount).to.equal(1);
    });
  });
  describe('#onYearSelect', function () {
    it('calls onYearChange', function () {
      var onYearChangeSpy = _sinonSandbox["default"].spy();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
        onYearChange: onYearChangeSpy
      })).dive();
      var currentMonth = (0, _moment["default"])();
      var newMonthVal = (currentMonth.month() + 5) % 12;
      wrapper.instance().onYearSelect(currentMonth, newMonthVal);
      (0, _chai.expect)(onYearChangeSpy.callCount).to.equal(1);
    });
  });
});