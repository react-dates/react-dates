"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _moment = _interopRequireDefault(require("moment"));

var _DayPicker = _interopRequireDefault(require("../../lib/components/DayPicker"));

var _DayPickerSingleDateController = _interopRequireDefault(require("../../lib/components/DayPickerSingleDateController"));

var _DayPickerNavigation = _interopRequireDefault(require("../../lib/components/DayPickerNavigation"));

var _toISODateString = _interopRequireDefault(require("../../lib/utils/toISODateString"));

var _toISOMonthString5 = _interopRequireDefault(require("../../lib/utils/toISOMonthString"));

var isDayVisible = _interopRequireWildcard(require("../../lib/utils/isDayVisible"));

var _getVisibleDays = _interopRequireDefault(require("../../lib/utils/getVisibleDays"));

var _constants = require("../../lib/constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Set to noon to mimic how days in the picker are configured internally
var today = (0, _moment["default"])().startOf('day').hours(12);

function getCallsByModifier(stub, modifier) {
  return stub.getCalls().filter(function (call) {
    return call.args[call.args.length - 1] === modifier;
  });
}

describe('DayPickerSingleDateController', function () {
  afterEach(function () {
    _sinonSandbox["default"].restore();
  });
  describe('#render', function () {
    it('renders a DayPicker', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: function onDateChange() {},
        onFocusChange: function onFocusChange() {},
        focused: true
      }));
      (0, _chai.expect)(wrapper.find(_DayPicker["default"])).to.have.lengthOf(1);
    });
  });
  describe('#componentWillReceiveProps', function () {
    var props = _objectSpread(_objectSpread({}, _DayPickerSingleDateController["default"].defaultProps), {}, {
      onDateChange: function onDateChange() {},
      onFocusChange: function onFocusChange() {}
    });

    describe('props.date changed', function () {
      describe('date is not visible', function () {
        it('setState gets called with new month', function () {
          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

          var date = today;
          var newDate = (0, _moment["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
            date: date
          })));
          (0, _chai.expect)(wrapper.state()).to.have.property('currentMonth', date);
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            date: newDate
          }));
          (0, _chai.expect)(wrapper.state()).to.have.property('currentMonth', newDate);
        });
      });
      describe('date is visible', function () {
        it('setState gets called with existing month', function () {
          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(true);

          var date = today;
          var newDate = (0, _moment["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
            date: date
          })));
          (0, _chai.expect)(wrapper.state()).to.have.property('currentMonth', date);
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            date: newDate
          }));
          (0, _chai.expect)(wrapper.state()).to.have.property('currentMonth', date);
        });
      });
    });
    describe('modifiers', function () {
      describe('selected modifier', function () {
        describe('props.date did not change', function () {
          it('does not call this.addModifier with `selected', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

            var date = today;
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
              date: date
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              date: date
            }));
            (0, _chai.expect)(getCallsByModifier(addModifierSpy, 'selected').length).to.equal(0);
          });
          it('does not call this.deleteModifier with `selected', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

            var date = today;
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
              date: date
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              date: date
            }));
            (0, _chai.expect)(getCallsByModifier(deleteModifierSpy, 'selected').length).to.equal(0);
          });
        });
        describe('props.date changed', function () {
          it('deleteModifier gets called with old date and `selected`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

            var date = today;
            var newDate = (0, _moment["default"])().add(1, 'day');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
              date: date
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              date: newDate
            }));
            var selectedCalls = getCallsByModifier(deleteModifierSpy, 'selected');
            (0, _chai.expect)(selectedCalls.length).to.equal(1);
            (0, _chai.expect)(selectedCalls[0].args[1]).to.equal(date);
          });
          it('addModifier gets called with new date and `selected-start`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

            var date = today;
            var newDate = (0, _moment["default"])().add(1, 'day');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
              date: date
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              date: newDate
            }));
            var selectedStartCalls = getCallsByModifier(addModifierSpy, 'selected');
            (0, _chai.expect)(selectedStartCalls.length).to.equal(1);
            (0, _chai.expect)(selectedStartCalls[0].args[1]).to.equal(newDate);
          });
        });
      });
      describe('blocked', function () {
        describe('props.focused did not change', function () {
          it('does not call isBlocked', function () {
            var isBlockedStub = _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            isBlockedStub.resetHistory();
            wrapper.instance().componentWillReceiveProps(_objectSpread({}, props));
            (0, _chai.expect)(isBlockedStub.callCount).to.equal(0);
          });
        });
        describe('props.focused changed', function () {
          var numVisibleDays = 3;
          var visibleDays;
          beforeEach(function () {
            var _toISOMonthString;

            var startOfMonth = today.clone().startOf('month');
            visibleDays = (0, _defineProperty2["default"])({}, (0, _toISOMonthString5["default"])(startOfMonth), (_toISOMonthString = {}, (0, _defineProperty2["default"])(_toISOMonthString, (0, _toISODateString["default"])(startOfMonth), new Set()), (0, _defineProperty2["default"])(_toISOMonthString, (0, _toISODateString["default"])(startOfMonth.clone().add(1, 'day')), new Set()), (0, _defineProperty2["default"])(_toISOMonthString, (0, _toISODateString["default"])(startOfMonth.clone().add(2, 'days')), new Set()), _toISOMonthString));
          });
          it('calls isBlocked for every visible day', function () {
            var isBlockedStub = _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            isBlockedStub.resetHistory();
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true
            }));
            (0, _chai.expect)(isBlockedStub.callCount).to.equal(numVisibleDays);
          });
          it('if isBlocked(day) is true calls addModifier with `blocked` for each day', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

            _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked').returns(true);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true
            }));
            var blockedOutOfRangeCalls = getCallsByModifier(addModifierSpy, 'blocked');
            (0, _chai.expect)(blockedOutOfRangeCalls.length).to.equal(numVisibleDays);
          });
          it('if isBlocked(day) is false calls deleteModifier with day and `blocked`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

            _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked').returns(false);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true
            }));
            var blockedOutOfRangeCalls = getCallsByModifier(deleteModifierSpy, 'blocked');
            (0, _chai.expect)(blockedOutOfRangeCalls.length).to.equal(numVisibleDays);
          });
        });
      });
      describe('blocked-out-of-range', function () {
        describe('props.focused did not change', function () {
          it('does not call isOutsideRange if unchanged', function () {
            var isOutsideRangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
              isOutsideRange: isOutsideRangeStub
            })));
            var prevCallCount = isOutsideRangeStub.callCount;
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              isOutsideRange: isOutsideRangeStub
            }));
            (0, _chai.expect)(isOutsideRangeStub.callCount).to.equal(prevCallCount);
          });
          it('calls isOutsideRange if changed', function () {
            var isOutsideRangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              isOutsideRange: isOutsideRangeStub
            }));
            (0, _chai.expect)(isOutsideRangeStub.callCount).to.not.equal(0);
          });
        });
        describe('props.focused changed', function () {
          var numVisibleDays = 3;
          var visibleDays;
          beforeEach(function () {
            var _toISOMonthString2;

            var startOfMonth = today.clone().startOf('month');
            visibleDays = (0, _defineProperty2["default"])({}, (0, _toISOMonthString5["default"])(startOfMonth), (_toISOMonthString2 = {}, (0, _defineProperty2["default"])(_toISOMonthString2, (0, _toISODateString["default"])(startOfMonth), new Set()), (0, _defineProperty2["default"])(_toISOMonthString2, (0, _toISODateString["default"])(startOfMonth.clone().add(1, 'day')), new Set()), (0, _defineProperty2["default"])(_toISOMonthString2, (0, _toISODateString["default"])(startOfMonth.clone().add(2, 'days')), new Set()), _toISOMonthString2));
          });
          it('calls isOutsideRange for every visible day', function () {
            var isOutsideRangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isOutsideRange: isOutsideRangeStub
            }));
            (0, _chai.expect)(isOutsideRangeStub.callCount).to.equal(numVisibleDays);
          });
          it('if isOutsideRange(day) is true calls addModifier with `blocked-out-of-range` for each day', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

            var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(true);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isOutsideRange: isOutsideRangeStub
            }));
            var blockedOutOfRangeCalls = getCallsByModifier(addModifierSpy, 'blocked-out-of-range');
            (0, _chai.expect)(blockedOutOfRangeCalls.length).to.equal(numVisibleDays);
          });
          it('if isOutsideRange(day) is false calls deleteModifier with day and `blocked-out-of-range`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

            var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(false);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isOutsideRange: isOutsideRangeStub
            }));
            var blockedOutOfRangeCalls = getCallsByModifier(deleteModifierSpy, 'blocked-out-of-range');
            (0, _chai.expect)(blockedOutOfRangeCalls.length).to.equal(numVisibleDays);
          });
        });
      });
      describe('blocked-calendar', function () {
        describe('props.focused did not change', function () {
          it('does not call isDayBlocked if unchanged', function () {
            var isDayBlockedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
              isDayBlocked: isDayBlockedStub
            })));
            var prevCallCount = isDayBlockedStub.callCount;
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              isDayBlocked: isDayBlockedStub
            }));
            (0, _chai.expect)(isDayBlockedStub.callCount).to.equal(prevCallCount);
          });
          it('calls isDayBlocked if changed', function () {
            var isDayBlockedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              isDayBlocked: isDayBlockedStub
            }));
            (0, _chai.expect)(isDayBlockedStub.callCount).to.not.equal(0);
          });
        });
        describe('props.focused changed', function () {
          var numVisibleDays = 3;
          var visibleDays;
          beforeEach(function () {
            var _toISOMonthString3;

            var startOfMonth = today.clone().startOf('month');
            visibleDays = (0, _defineProperty2["default"])({}, (0, _toISOMonthString5["default"])(startOfMonth), (_toISOMonthString3 = {}, (0, _defineProperty2["default"])(_toISOMonthString3, (0, _toISODateString["default"])(startOfMonth), new Set()), (0, _defineProperty2["default"])(_toISOMonthString3, (0, _toISODateString["default"])(startOfMonth.clone().add(1, 'day')), new Set()), (0, _defineProperty2["default"])(_toISOMonthString3, (0, _toISODateString["default"])(startOfMonth.clone().add(2, 'days')), new Set()), _toISOMonthString3));
          });
          it('calls isDayBlocked for every visible day', function () {
            var isDayBlockedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isDayBlocked: isDayBlockedStub
            }));
            (0, _chai.expect)(isDayBlockedStub.callCount).to.equal(numVisibleDays);
          });
          it('if isDayBlocked(day) is true calls addModifier with `blocked-calendar` for each day', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

            var isDayBlockedStub = _sinonSandbox["default"].stub().returns(true);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isDayBlocked: isDayBlockedStub
            }));
            var blockedCalendarCalls = getCallsByModifier(addModifierSpy, 'blocked-calendar');
            (0, _chai.expect)(blockedCalendarCalls.length).to.equal(numVisibleDays);
          });
          it('if isDayBlocked(day) is false calls deleteModifier with day and `blocked-calendar`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

            var isDayBlockedStub = _sinonSandbox["default"].stub().returns(false);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isDayBlocked: isDayBlockedStub
            }));
            var blockedCalendarCalls = getCallsByModifier(deleteModifierSpy, 'blocked-calendar');
            (0, _chai.expect)(blockedCalendarCalls.length).to.equal(numVisibleDays);
          });
        });
      });
      describe('highlighted-calendar', function () {
        describe('focusedInput did not change', function () {
          it('does not call isDayHighlighted if unchanged', function () {
            var isDayHighlightedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], (0, _extends2["default"])({}, props, {
              isDayHighlighted: isDayHighlightedStub
            })));
            var prevCallCount = isDayHighlightedStub.callCount;
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              isDayHighlighted: isDayHighlightedStub
            }));
            (0, _chai.expect)(isDayHighlightedStub.callCount).to.equal(prevCallCount);
          });
          it('calls isDayHighlighted if changed', function () {
            var isDayHighlightedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              isDayHighlighted: isDayHighlightedStub
            }));
            (0, _chai.expect)(isDayHighlightedStub.callCount).to.not.equal(0);
          });
        });
        describe('focusedInput changed', function () {
          var numVisibleDays = 3;
          var visibleDays;
          beforeEach(function () {
            var _toISOMonthString4;

            var startOfMonth = today.clone().startOf('month');
            visibleDays = (0, _defineProperty2["default"])({}, (0, _toISOMonthString5["default"])(startOfMonth), (_toISOMonthString4 = {}, (0, _defineProperty2["default"])(_toISOMonthString4, (0, _toISODateString["default"])(startOfMonth), new Set()), (0, _defineProperty2["default"])(_toISOMonthString4, (0, _toISODateString["default"])(startOfMonth.clone().add(1, 'day')), new Set()), (0, _defineProperty2["default"])(_toISOMonthString4, (0, _toISODateString["default"])(startOfMonth.clone().add(2, 'days')), new Set()), _toISOMonthString4));
          });
          it('calls isDayHighlighted for every visible day', function () {
            var isDayHighlightedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isDayHighlighted: isDayHighlightedStub
            }));
            (0, _chai.expect)(isDayHighlightedStub.callCount).to.equal(numVisibleDays);
          });
          it('if isDayHighlighted(day) is true calls addModifier with day and `highlighted-calendar`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

            var isDayHighlightedStub = _sinonSandbox["default"].stub().returns(true);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isDayHighlighted: isDayHighlightedStub
            }));
            var highlightedCalendarCalls = getCallsByModifier(addModifierSpy, 'highlighted-calendar');
            (0, _chai.expect)(highlightedCalendarCalls.length).to.equal(numVisibleDays);
          });
          it('if isDayHighlighted(day) is false calls deleteModifier with day and `highlighted-calendar`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

            var isDayHighlightedStub = _sinonSandbox["default"].stub().returns(false);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focused: true,
              isDayHighlighted: isDayHighlightedStub
            }));
            var highlightedCalendarCalls = getCallsByModifier(deleteModifierSpy, 'highlighted-calendar');
            (0, _chai.expect)(highlightedCalendarCalls.length).to.equal(numVisibleDays);
          });
        });
      });
      describe('today', function () {
        describe('this.today matches today', function () {
          it('does not call deleteModifier with `today`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.instance().today = today;
            wrapper.instance().componentWillReceiveProps(props);
            var todayCalls = getCallsByModifier(deleteModifierSpy, 'today');
            (0, _chai.expect)(todayCalls.length).to.equal(0);
          });
          it('does not call addModifier with `today`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.instance().today = today;
            wrapper.instance().componentWillReceiveProps(props);
            var todayCalls = getCallsByModifier(addModifierSpy, 'today');
            (0, _chai.expect)(todayCalls.length).to.equal(0);
          });
        });
        describe('this.today is no longer today', function () {
          it('calls deleteModifier with this.today and `today` modifier', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.instance().today = (0, _moment["default"])().subtract(1, 'day');
            wrapper.instance().componentWillReceiveProps(props);
            var todayCalls = getCallsByModifier(deleteModifierSpy, 'today');
            (0, _chai.expect)(todayCalls.length).to.equal(1);
          });
          it('calls addModifier with new today and `today` modifiers', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], props));
            wrapper.instance().today = (0, _moment["default"])().subtract(1, 'day');
            wrapper.instance().componentWillReceiveProps(props);
            var todayCalls = getCallsByModifier(addModifierSpy, 'today');
            (0, _chai.expect)(todayCalls.length).to.equal(1);
          });
        });
      });
    });
  });
  describe('#onDayClick', function () {
    describe('day arg is blocked', function () {
      it('props.onDateChange is not called', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {},
          isDayBlocked: function isDayBlocked() {
            return true;
          }
        }));
        wrapper.instance().onDayClick((0, _moment["default"])());
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(0);
      });
      it('props.onFocusChange is not called', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          isDayBlocked: function isDayBlocked() {
            return true;
          }
        }));
        wrapper.instance().onDayClick((0, _moment["default"])());
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
      });
      it('props.onClose is not called', function () {
        var onCloseStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          onClose: onCloseStub,
          isDayBlocked: function isDayBlocked() {
            return true;
          }
        }));
        wrapper.instance().onDayClick((0, _moment["default"])());
        (0, _chai.expect)(onCloseStub.callCount).to.equal(0);
      });
      it('calls props.onClose with { date } as arg', function () {
        var date = (0, _moment["default"])();

        var onCloseStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          date: null,
          onDateChange: function onDateChange() {},
          focused: true,
          onFocusChange: function onFocusChange() {},
          onClose: onCloseStub
        }));
        wrapper.instance().onDayClick(date);
        (0, _chai.expect)(onCloseStub.getCall(0).args[0].date).to.equal(date);
      });
    });
    describe('day arg is not blocked', function () {
      it('props.onDateChange is called', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.instance().onDayClick((0, _moment["default"])());
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
      });
      it('props.onDateChange receives undefined when day selected', function () {
        var date = (0, _moment["default"])();

        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {},
          date: date,
          allowUnselect: true
        })); // Click same day as the provided date.

        wrapper.instance().onDayClick(date);
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
        (0, _chai.expect)(onDateChangeStub.getCall(0).args[0]).to.equal(undefined);
      });
      it('props.onDateChange receives day when allowUnselect is disabled', function () {
        var date = (0, _moment["default"])();

        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {},
          date: date,
          allowUnselect: false
        })); // Click same day as the provided date.

        wrapper.instance().onDayClick(date);
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
        (0, _chai.expect)(onDateChangeStub.getCall(0).args[0]).to.equal(date);
      });
      describe('props.keepOpenOnDateSelect is false', function () {
        it('props.onFocusChange is called', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
            onDateChange: function onDateChange() {},
            onFocusChange: onFocusChangeStub,
            keepOpenOnDateSelect: false
          }));
          wrapper.instance().onDayClick((0, _moment["default"])());
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
        });
        it('props.onClose is called', function () {
          var onCloseStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            onClose: onCloseStub,
            keepOpenOnDateSelect: false
          }));
          wrapper.instance().onDayClick((0, _moment["default"])());
          (0, _chai.expect)(onCloseStub.callCount).to.equal(1);
        });
      });
      describe('props.keepOpenOnDateSelect is true', function () {
        it('props.onFocusChange is not called', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
            onDateChange: function onDateChange() {},
            onFocusChange: onFocusChangeStub,
            keepOpenOnDateSelect: true
          }));
          wrapper.instance().onDayClick((0, _moment["default"])());
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
        });
        it('props.onClose is not called', function () {
          var onCloseStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            onClose: onCloseStub,
            keepOpenOnDateSelect: true
          }));
          wrapper.instance().onDayClick((0, _moment["default"])());
          (0, _chai.expect)(onCloseStub.callCount).to.equal(0);
        });
      });
    });
  });
  describe('#onDayMouseEnter', function () {
    it('sets state.hoverDate to day arg', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: function onDateChange() {},
        onFocusChange: function onFocusChange() {}
      }));
      wrapper.instance().onDayMouseEnter(today);
      (0, _chai.expect)(wrapper.state().hoverDate).to.equal(today);
    });
    describe('modifiers', function () {
      it('calls addModifier', function () {
        var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'addModifier');

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub()
        }));
        wrapper.setState({
          hoverDate: null
        });
        addModifierSpy.resetHistory();
        wrapper.instance().onDayMouseEnter(today);
        (0, _chai.expect)(addModifierSpy.callCount).to.equal(1);
        (0, _chai.expect)(addModifierSpy.getCall(0).args[1]).to.equal(today);
        (0, _chai.expect)(addModifierSpy.getCall(0).args[2]).to.equal('hovered');
      });
      it('calls deleteModifier', function () {
        var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub()
        }));
        wrapper.setState({
          hoverDate: today
        });
        deleteModifierSpy.resetHistory();
        wrapper.instance().onDayMouseEnter((0, _moment["default"])().add(10, 'days'));
        (0, _chai.expect)(deleteModifierSpy.callCount).to.equal(1);
        (0, _chai.expect)(deleteModifierSpy.getCall(0).args[1]).to.equal(today);
        (0, _chai.expect)(deleteModifierSpy.getCall(0).args[2]).to.equal('hovered');
      });
    });
  });
  describe('#onDayMouseLeave', function () {
    it('sets state.hoverDate to null', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: function onDateChange() {},
        onFocusChange: function onFocusChange() {}
      }));
      wrapper.instance().onDayMouseLeave();
      (0, _chai.expect)(wrapper.state().hoverDate).to.equal(null);
    });
    it('calls deleteModifier with hoverDate and `hovered` modifier', function () {
      var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'deleteModifier');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.setState({
        hoverDate: today
      });
      deleteModifierSpy.resetHistory();
      wrapper.instance().onDayMouseLeave(today);
      (0, _chai.expect)(deleteModifierSpy.callCount).to.equal(1);
      (0, _chai.expect)(deleteModifierSpy.getCall(0).args[1]).to.equal(today);
      (0, _chai.expect)(deleteModifierSpy.getCall(0).args[2]).to.equal('hovered');
    });
  });
  describe('#onPrevMonthClick', function () {
    it('updates state.currentMonth to subtract 1 month', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(wrapper.state().currentMonth.month()).to.equal(today.clone().subtract(1, 'month').month());
    });
    it('new visibleDays has previous month', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths
      }));
      wrapper.setState({
        currentMonth: today
      });
      var newMonth = (0, _moment["default"])().subtract(1, 'month');
      wrapper.instance().onPrevMonthClick();
      var visibleDays = Object.keys(wrapper.state().visibleDays);
      (0, _chai.expect)(visibleDays).to.include((0, _toISOMonthString5["default"])(newMonth));
    });
    it('new visibleDays does not have current last month', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      var visibleDays = Object.keys(wrapper.state().visibleDays);
      (0, _chai.expect)(visibleDays).to.not.include((0, _toISOMonthString5["default"])((0, _moment["default"])().add(numberOfMonths, 'months')));
    });
    it('calls this.getModifiers', function () {
      var getModifiersSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'getModifiers');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      getModifiersSpy.resetHistory();
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(getModifiersSpy.callCount).to.equal(1);
    });
    it('calls props.onPrevMonthClick with new month', function () {
      var onPrevMonthClickStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        onPrevMonthClick: onPrevMonthClickStub
      }));
      wrapper.setState({
        currentMonth: today
      });
      var newMonth = (0, _moment["default"])().subtract(1, 'month');
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(onPrevMonthClickStub.callCount).to.equal(1);
      (0, _chai.expect)(onPrevMonthClickStub.firstCall.args[0].year()).to.equal(newMonth.year());
      (0, _chai.expect)(onPrevMonthClickStub.firstCall.args[0].month()).to.equal(newMonth.month());
    });
    it('calls this.shouldDisableMonthNavigation twice', function () {
      var shouldDisableMonthNavigationSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'shouldDisableMonthNavigation');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      shouldDisableMonthNavigationSpy.resetHistory();
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(shouldDisableMonthNavigationSpy).to.have.property('callCount', 2);
    });
    it('sets disablePrev and disablePrev as false on onPrevMonthClick call withouth maxDate and minDate set', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(wrapper.state()).to.have.property('disablePrev', false);
      (0, _chai.expect)(wrapper.state()).to.have.property('disableNext', false);
    });
    it('sets disableNext as true when maxDate is in visible month', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths,
        maxDate: today
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(wrapper.state()).to.have.property('disablePrev', false);
      (0, _chai.expect)(wrapper.state()).to.have.property('disableNext', true);
    });
    it('sets disablePrev as true when minDate is in visible month', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths,
        minDate: today.clone().subtract(1, 'month')
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(wrapper.state()).to.have.property('disablePrev', true);
      (0, _chai.expect)(wrapper.state()).to.have.property('disableNext', false);
    });
  });
  describe('#onNextMonthClick', function () {
    it('updates state.currentMonth to add 1 month', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onNextMonthClick();
      (0, _chai.expect)(wrapper.state().currentMonth.month()).to.equal(today.clone().add(1, 'month').month());
    });
    it('new visibleDays has next month', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths
      }));
      wrapper.setState({
        currentMonth: today
      });
      var newMonth = (0, _moment["default"])().add(numberOfMonths + 1, 'months');
      wrapper.instance().onNextMonthClick();
      var visibleDays = Object.keys(wrapper.state().visibleDays);
      (0, _chai.expect)(visibleDays).to.include((0, _toISOMonthString5["default"])(newMonth));
    });
    it('new visibleDays does not have current month', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: 2
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onNextMonthClick();
      var visibleDays = Object.keys(wrapper.state().visibleDays);
      (0, _chai.expect)(visibleDays).to.not.include((0, _toISOMonthString5["default"])(today.clone().subtract(1, 'month')));
    });
    it('calls this.getModifiers', function () {
      var getModifiersSpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'getModifiers');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      getModifiersSpy.resetHistory();
      wrapper.instance().onNextMonthClick();
      (0, _chai.expect)(getModifiersSpy.callCount).to.equal(1);
    });
    it('calls props.onNextMonthClick with new month', function () {
      var onNextMonthClickStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        onNextMonthClick: onNextMonthClickStub
      }));
      wrapper.setState({
        currentMonth: today
      });
      var newMonth = (0, _moment["default"])().add(1, 'month');
      wrapper.instance().onNextMonthClick();
      (0, _chai.expect)(onNextMonthClickStub.callCount).to.equal(1);
      (0, _chai.expect)(onNextMonthClickStub.firstCall.args[0].year()).to.equal(newMonth.year());
      (0, _chai.expect)(onNextMonthClickStub.firstCall.args[0].month()).to.equal(newMonth.month());
    });
  });
  describe('#getFirstFocusableDay', function () {
    it('returns first day of arg month if not blocked and props.date is falsy', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked').returns(false);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        date: null,
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
      (0, _chai.expect)(firstFocusableDay.isSame(today.clone().startOf('month'), 'day')).to.equal(true);
    });
    it('returns props.date if exists and is not blocked', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked').returns(false);

      var date = today.clone().add(10, 'days');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        date: date,
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
      (0, _chai.expect)(firstFocusableDay.isSame(date, 'day')).to.equal(true);
    });
    it('time is a noon', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked').returns(false);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        date: null,
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
      (0, _chai.expect)(firstFocusableDay.hours()).to.equal(12);
    });
    describe('desired date is blocked', function () {
      it('returns first unblocked visible day if exists', function () {
        var isBlockedStub = _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked');

        var date = (0, _moment["default"])().endOf('month').subtract(10, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          date: date,
          onFocusChange: _sinonSandbox["default"].stub(),
          onDateChange: _sinonSandbox["default"].stub()
        }));
        isBlockedStub.resetHistory();
        isBlockedStub.returns(true);
        isBlockedStub.onCall(8).returns(false);
        var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        (0, _chai.expect)(firstFocusableDay.isSame(date.clone().add(8, 'days'), 'day')).to.equal(true);
      });
    });
  });
  describe('#getModifiers', function () {
    it('return object has the same number of days as input', function () {
      var monthISO = (0, _toISOMonthString5["default"])(today);
      var visibleDays = (0, _defineProperty2["default"])({}, monthISO, [today, (0, _moment["default"])().add(1, 'day'), (0, _moment["default"])().add(2, 'days')]);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiers(visibleDays);
      (0, _chai.expect)(Object.keys(modifiers[monthISO]).length).to.equal(visibleDays[monthISO].length);
    });
    it('calls this.getModifiersForDay for each day in input', function () {
      var getModifiersForDaySpy = _sinonSandbox["default"].spy(_DayPickerSingleDateController["default"].prototype, 'getModifiersForDay');

      var monthISO = (0, _toISOMonthString5["default"])(today);
      var visibleDays = (0, _defineProperty2["default"])({}, monthISO, [today, (0, _moment["default"])().add(1, 'day'), (0, _moment["default"])().add(2, 'days')]);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      getModifiersForDaySpy.resetHistory();
      wrapper.instance().getModifiers(visibleDays);
      (0, _chai.expect)(getModifiersForDaySpy.callCount).to.equal(visibleDays[monthISO].length);
    });
  });
  describe('#getModifiersForDay', function () {
    it('only contains `valid` if all modifier methods return false', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isToday').returns(false);

      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked').returns(false);

      var isDayBlockedStub = _sinonSandbox["default"].stub().returns(false);

      var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(false);

      var isDayHighlightedStub = _sinonSandbox["default"].stub().returns(false);

      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isSelected').returns(false);

      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isHovered').returns(false);

      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isFirstDayOfWeek').returns(false);

      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isLastDayOfWeek').returns(false);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        isDayBlocked: isDayBlockedStub,
        isOutsideRange: isOutsideRangeStub,
        isDayHighlighted: isDayHighlightedStub
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.size).to.equal(1);
      (0, _chai.expect)(modifiers.has('valid')).to.equal(true);
    });
    it('contains `today` if this.isToday returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isToday').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('today')).to.equal(true);
    });
    it('contains `blocked` if this.isBlocked returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('blocked')).to.equal(true);
    });
    it('contains `blocked-calendar` if props.isDayBlocked returns true', function () {
      var isDayBlockedStub = _sinonSandbox["default"].stub().returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        isDayBlocked: isDayBlockedStub
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('blocked-calendar')).to.equal(true);
    });
    it('contains `blocked-out-of-range` if props.isOutsideRange returns true', function () {
      var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        isOutsideRange: isOutsideRangeStub
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('blocked-out-of-range')).to.equal(true);
    });
    it('contains `highlighted-calendar` if props.isDayHighlighted returns true', function () {
      var isDayHighlightedStub = _sinonSandbox["default"].stub().returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        isDayHighlighted: isDayHighlightedStub
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('highlighted-calendar')).to.equal(true);
    });
    it('contains `valid` if this.isBlocked returns false', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isBlocked').returns(false);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('valid')).to.equal(true);
    });
    it('contains `selected` if this.isSelected returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isSelected').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('selected')).to.equal(true);
    });
    it('contains `hovered` if this.isHovered returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerSingleDateController["default"].prototype, 'isHovered').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('hovered')).to.equal(true);
    });
  });
  describe('#addModifier', function () {
    it('returns first arg if no day given', function () {
      var updatedDays = {
        foo: 'bar'
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier(updatedDays);
      (0, _chai.expect)(modifiers).to.equal(updatedDays);
    });
    it('returns first arg if day is not visible', function () {
      var updatedDays = {
        foo: 'bar'
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));

      _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

      var modifiers = wrapper.instance().addModifier(updatedDays, (0, _moment["default"])());
      (0, _chai.expect)(modifiers).to.equal(updatedDays);
    });
    it('has day args month ISO as key', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier({}, today, 'foo');
      (0, _chai.expect)(Object.keys(modifiers)).to.contain((0, _toISOMonthString5["default"])(today));
    });
    it('has day ISO as key one layer down', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier({}, today);
      (0, _chai.expect)(Object.keys(modifiers[(0, _toISOMonthString5["default"])(today)])).to.contain((0, _toISODateString["default"])(today));
    });
    it('is resilient when visibleDays is an empty object', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().setState({
        visibleDays: {}
      });
      var modifiers = wrapper.instance().addModifier({}, today);
      (0, _chai.expect)(Object.keys(modifiers[(0, _toISOMonthString5["default"])(today)])).to.contain((0, _toISODateString["default"])(today));
    });
    it('return value no longer has modifier arg for day if was in first arg', function () {
      var modifierToAdd = 'foo';
      var monthISO = (0, _toISOMonthString5["default"])(today);
      var todayISO = (0, _toISODateString["default"])(today);
      var updatedDays = (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, todayISO, new Set(['bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier(updatedDays, today, modifierToAdd);
      (0, _chai.expect)(Array.from(modifiers[monthISO][todayISO])).to.contain(modifierToAdd);
    });
    it('return value no longer has modifier arg for day if was in state', function () {
      var modifierToAdd = 'foo';
      var monthISO = (0, _toISOMonthString5["default"])(today);
      var todayISO = (0, _toISODateString["default"])(today);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.setState({
        visibleDays: (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, todayISO, new Set(['bar', 'baz'])))
      });
      var modifiers = wrapper.instance().addModifier({}, today, modifierToAdd);
      (0, _chai.expect)(Array.from(modifiers[monthISO][todayISO])).to.contain(modifierToAdd);
    });
    it('return new modifier if vertically scrollable load more months', function () {
      var modifierToAdd = 'foo';
      var numberOfMonths = 2;
      var nextMonth = today.clone().add(numberOfMonths, 'month');
      var nextMonthISO = (0, _toISOMonthString5["default"])(nextMonth);
      var nextMonthDayISO = (0, _toISODateString["default"])(nextMonth);
      var updatedDays = (0, _defineProperty2["default"])({}, nextMonthISO, (0, _defineProperty2["default"])({}, nextMonthDayISO, new Set(['bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths,
        orientation: _constants.VERTICAL_SCROLLABLE
      }));
      wrapper.setState({
        currentMonth: today,
        visibleDays: _objectSpread(_objectSpread({}, (0, _getVisibleDays["default"])(today, numberOfMonths)), (0, _getVisibleDays["default"])(nextMonth, numberOfMonths))
      });
      var modifiers = wrapper.instance().addModifier(updatedDays, nextMonth, modifierToAdd);
      (0, _chai.expect)(Array.from(modifiers[nextMonthISO][nextMonthDayISO])).to.contain(modifierToAdd);
    });
    it('return value now has modifier arg for day after getting next scrollable months', function () {
      var modifierToAdd = 'foo';
      var numberOfMonths = 2;
      var nextMonth = today.clone().add(numberOfMonths, 'month');
      var nextMonthISO = (0, _toISOMonthString5["default"])(nextMonth);
      var nextMonthDayISO = (0, _toISODateString["default"])(nextMonth);
      var updatedDays = (0, _defineProperty2["default"])({}, nextMonthISO, (0, _defineProperty2["default"])({}, nextMonthDayISO, new Set(['bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths,
        orientation: _constants.VERTICAL_SCROLLABLE
      })).instance();
      var modifiers = wrapper.addModifier(updatedDays, nextMonth, modifierToAdd);
      (0, _chai.expect)(Array.from(modifiers[nextMonthISO][nextMonthDayISO])).to.not.contain(modifierToAdd);
      wrapper.onGetNextScrollableMonths();
      modifiers = wrapper.addModifier(updatedDays, nextMonth, modifierToAdd);
      (0, _chai.expect)(Array.from(modifiers[nextMonthISO][nextMonthDayISO])).to.contain(modifierToAdd);
    });
    it('return value now has modifier arg for day after getting previous scrollable months', function () {
      var modifierToAdd = 'foo';
      var numberOfMonths = 2;
      var pastDateAfterMultiply = today.clone().subtract(numberOfMonths, 'months');
      var monthISO = (0, _toISOMonthString5["default"])(pastDateAfterMultiply);
      var dayISO = (0, _toISODateString["default"])(pastDateAfterMultiply);
      var updatedDays = (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, dayISO, new Set(['bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths,
        orientation: _constants.VERTICAL_SCROLLABLE
      })).instance();
      var modifiers = wrapper.addModifier(updatedDays, pastDateAfterMultiply, modifierToAdd);
      (0, _chai.expect)(Array.from(modifiers[monthISO][dayISO])).to.not.contain(modifierToAdd);
      wrapper.onGetPrevScrollableMonths();
      modifiers = wrapper.addModifier(updatedDays, pastDateAfterMultiply, modifierToAdd);
      (0, _chai.expect)(Array.from(modifiers[monthISO][dayISO])).to.contain(modifierToAdd);
    });
  });
  describe('#deleteModifier', function () {
    it('returns first arg if no day given', function () {
      var updatedDays = {
        foo: 'bar'
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().deleteModifier(updatedDays);
      (0, _chai.expect)(modifiers).to.equal(updatedDays);
    });
    it('returns first arg if day is not visible', function () {
      var updatedDays = {
        foo: 'bar'
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));

      _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

      var modifiers = wrapper.instance().deleteModifier(updatedDays, (0, _moment["default"])());
      (0, _chai.expect)(modifiers).to.equal(updatedDays);
    });
    it('has day args month ISO as key', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var isoMonth = (0, _toISOMonthString5["default"])(today);
      var isoDate = (0, _toISODateString["default"])(today);
      var modifiers = wrapper.instance().deleteModifier((0, _defineProperty2["default"])({}, isoMonth, (0, _defineProperty2["default"])({}, isoDate, new Set(['foo']))), today, 'foo');
      (0, _chai.expect)(Object.keys(modifiers)).to.contain(isoMonth);
      (0, _chai.expect)(modifiers[isoMonth][isoDate].size).to.equal(0);
    });
    it('has day ISO as key one layer down', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier({}, today);
      (0, _chai.expect)(Object.keys(modifiers[(0, _toISOMonthString5["default"])(today)])).to.contain((0, _toISODateString["default"])(today));
    });
    it('is resilient when visibleDays is an empty object', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().setState({
        visibleDays: {}
      });
      (0, _chai.expect)(function () {
        wrapper.instance().deleteModifier({}, today);
      }).to.not["throw"]();
    });
    it('return value no longer has modifier arg for day if was in first arg', function () {
      var modifierToDelete = 'foo';
      var monthISO = (0, _toISOMonthString5["default"])(today);
      var todayISO = (0, _toISODateString["default"])(today);
      var updatedDays = (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, todayISO, new Set([modifierToDelete, 'bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().deleteModifier(updatedDays, today, modifierToDelete);
      (0, _chai.expect)(Array.from(modifiers[monthISO][todayISO])).to.not.contain(modifierToDelete);
    });
    it('return value no longer has modifier arg for day if was in state', function () {
      var modifierToDelete = 'foo';
      var monthISO = (0, _toISOMonthString5["default"])(today);
      var todayISO = (0, _toISODateString["default"])(today);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.setState({
        visibleDays: (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, todayISO, new Set([modifierToDelete, 'bar', 'baz'])))
      });
      var modifiers = wrapper.instance().deleteModifier({}, today, modifierToDelete);
      (0, _chai.expect)(Array.from(modifiers[monthISO][todayISO])).to.not.contain(modifierToDelete);
    });
    it('return new modifier if vertically scrollable load more months', function () {
      var modifierToDelete = 'foo';
      var numberOfMonths = 2;
      var nextMonth = today.clone().add(numberOfMonths, 'month');
      var nextMonthISO = (0, _toISOMonthString5["default"])(nextMonth);
      var nextMonthDayISO = (0, _toISODateString["default"])(nextMonth);
      var updatedDays = (0, _defineProperty2["default"])({}, nextMonthISO, (0, _defineProperty2["default"])({}, nextMonthDayISO, new Set(['foo', 'bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths,
        orientation: _constants.VERTICAL_SCROLLABLE
      }));
      wrapper.setState({
        currentMonth: today,
        visibleDays: _objectSpread(_objectSpread({}, (0, _getVisibleDays["default"])(today, numberOfMonths)), (0, _getVisibleDays["default"])(nextMonth, numberOfMonths))
      });
      var modifiers = wrapper.instance().deleteModifier(updatedDays, nextMonth, modifierToDelete);
      (0, _chai.expect)(Array.from(modifiers[nextMonthISO][nextMonthDayISO])).to.not.contain(modifierToDelete);
    });
  });
  describe('modifiers', function () {
    describe('#isBlocked', function () {
      it('returns true if props.isDayBlocked returns true', function () {
        var isDayBlockedStub = _sinonSandbox["default"].stub().returns(true);

        var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(false);

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          isDayBlocked: isDayBlockedStub,
          isOutsideRange: isOutsideRangeStub
        }));
        (0, _chai.expect)(wrapper.instance().isBlocked()).to.equal(true);
      });
      it('returns true if props.isOutsideRange returns true', function () {
        var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(true);

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          isOutsideRange: isOutsideRangeStub
        }));
        (0, _chai.expect)(wrapper.instance().isBlocked()).to.equal(true);
      });
      it('returns false if props.isDayBlocked and props.isOutsideRange both refurns false', function () {
        var isDayBlockedStub = _sinonSandbox["default"].stub().returns(false);

        var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(false);

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          isDayBlocked: isDayBlockedStub,
          isOutsideRange: isOutsideRangeStub
        }));
        (0, _chai.expect)(wrapper.instance().isBlocked()).to.equal(false);
      });
    });
    describe('#isHovered', function () {
      it('returns true if day arg is equal to state.hoverDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.setState({
          hoverDate: today
        });
        (0, _chai.expect)(wrapper.instance().isHovered(today)).to.equal(true);
      });
      it('returns false if day arg is not equal to state.hoverDate', function () {
        var tomorrow = (0, _moment["default"])().add(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.setState({
          hoverDate: today
        });
        (0, _chai.expect)(wrapper.instance().isHovered(tomorrow)).to.equal(false);
      });
    });
    describe('#isSelected', function () {
      it('returns true if day arg is equal to props.date', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          date: today
        }));
        (0, _chai.expect)(wrapper.instance().isSelected(today)).to.equal(true);
      });
      it('returns false if day arg is not equal to props.date', function () {
        var tomorrow = (0, _moment["default"])().add(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          date: tomorrow
        }));
        (0, _chai.expect)(wrapper.instance().isSelected(today)).to.equal(false);
      });
    });
    describe('#isToday', function () {
      it('returns true if today', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {}
        }));
        (0, _chai.expect)(wrapper.instance().isToday(today)).to.equal(true);
      });
      it('returns false if tomorrow', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {}
        }));
        (0, _chai.expect)(wrapper.instance().isToday((0, _moment["default"])(today).add(1, 'days'))).to.equal(false);
      });
      it('returns false if last month', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {}
        }));
        (0, _chai.expect)(wrapper.instance().isToday((0, _moment["default"])(today).subtract(1, 'months'))).to.equal(false);
      });
    });
    describe('#isFirstDayOfWeek', function () {
      it('returns true if first day of this week', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], null));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().startOf('week'))).to.equal(true);
      });
      it('returns true if same day as firstDayOfWeek prop', function () {
        var firstDayOfWeek = 3;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          firstDayOfWeek: firstDayOfWeek
        }));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().startOf('week').day(firstDayOfWeek))).to.equal(true);
      });
      it('returns true if first day of week and prop are both zero', function () {
        var firstDayOfWeek = 0;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          firstDayOfWeek: firstDayOfWeek
        }));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().startOf('week').day(firstDayOfWeek))).to.equal(true);
      });
      it('returns true if first day of week is not zero, and prop is zero', function () {
        _sinonSandbox["default"].stub(_moment["default"].localeData(), 'firstDayOfWeek').returns(1);

        var firstDayOfWeek = 0;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          firstDayOfWeek: firstDayOfWeek
        }));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().startOf('week').day(firstDayOfWeek))).to.equal(true);
      });
      it('returns false if not the first day of the week', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], null));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().endOf('week'))).to.equal(false);
      });
    });
    describe('#isLastDayOfWeek', function () {
      it('returns true if last day of week', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], null));
        (0, _chai.expect)(wrapper.instance().isLastDayOfWeek((0, _moment["default"])().endOf('week'))).to.equal(true);
      });
      it('returns true if 6 days after firstDayOfWeek prop', function () {
        var firstDayOfWeek = 3;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          firstDayOfWeek: firstDayOfWeek
        }));
        (0, _chai.expect)(wrapper.instance().isLastDayOfWeek((0, _moment["default"])().day(firstDayOfWeek).add(6, 'days'))).to.equal(true);
      });
      it('returns false if not last of week', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], null));
        (0, _chai.expect)(wrapper.instance().isLastDayOfWeek((0, _moment["default"])().startOf('week').add(1, 'day'))).to.equal(false);
      });
    });
  });
  describe('initialVisibleMonth', function () {
    describe('initialVisibleMonth is passed in', function () {
      it('DayPickerSingleDateController.props.initialVisibleMonth is equal to initialVisibleMonth', function () {
        var _initialVisibleMonth = (0, _moment["default"])().add(7, 'months');

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          initialVisibleMonth: function initialVisibleMonth() {
            return _initialVisibleMonth;
          },
          focused: true
        }));
        var dayPicker = wrapper.find(_DayPicker["default"]);
        var month = dayPicker.props().initialVisibleMonth().month();
        (0, _chai.expect)(month).to.equal(_initialVisibleMonth.month());
      });
    });
    describe('initialVisibleMonth is not passed in', function () {
      it('DayPickerSingleDateController.props.initialVisibleMonth evaluates to date', function () {
        var date = (0, _moment["default"])().add(10, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          date: date,
          focused: true
        }));
        var dayPicker = wrapper.find(_DayPicker["default"]);
        (0, _chai.expect)(dayPicker.props().initialVisibleMonth().month()).to.equal(date.month());
      });
      it('DayPickerSingleDateController.props.initialVisibleMonth evaluates to today if !date', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          focused: true
        }));
        var dayPicker = wrapper.find(_DayPicker["default"]);
        (0, _chai.expect)(dayPicker.props().initialVisibleMonth().isSame(today, 'day')).to.equal(true);
      });
    });
    describe('noNavButtons prop', function () {
      it('renders navigation button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], null)).dive().dive();
        (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.lengthOf(1);
      });
      it('does not render navigation button when noNavButtons prop applied', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerSingleDateController["default"], {
          noNavButtons: true
        })).dive().dive();
        (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.lengthOf(0);
      });
    });
  });
});