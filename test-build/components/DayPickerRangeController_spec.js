"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _moment = _interopRequireDefault(require("moment"));

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _enzyme = require("enzyme");

var _DayPickerRangeController = _interopRequireDefault(require("../../lib/components/DayPickerRangeController"));

var _DayPicker = _interopRequireDefault(require("../../lib/components/DayPicker"));

var _DayPickerNavigation = _interopRequireDefault(require("../../lib/components/DayPickerNavigation"));

var _toISODateString = _interopRequireDefault(require("../../lib/utils/toISODateString"));

var _toISOMonthString4 = _interopRequireDefault(require("../../lib/utils/toISOMonthString"));

var _isInclusivelyAfterDay = _interopRequireDefault(require("../../lib/utils/isInclusivelyAfterDay"));

var _isSameDay = _interopRequireDefault(require("../../lib/utils/isSameDay"));

var _isBeforeDay = _interopRequireDefault(require("../../lib/utils/isBeforeDay"));

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

describe('DayPickerRangeController', function () {
  afterEach(function () {
    _sinonSandbox["default"].restore();
  });
  describe('#render()', function () {
    it('renders <DayPicker />', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
      (0, _chai.expect)(wrapper.find(_DayPicker["default"])).to.have.length(1);
    });
  });
  describe('#componentDidMount', function () {
    var props = _objectSpread(_objectSpread({}, _DayPickerRangeController["default"].defaultProps), {}, {
      onDatesChange: function onDatesChange() {},
      onFocusChange: function onFocusChange() {}
    });

    describe('phrases', function () {
      var phrases = {
        chooseAvailableDate: 'test1',
        chooseAvailableStartDate: 'test2',
        chooseAvailableEndDate: 'test3'
      };
      describe('focusedInput is START_DATE', function () {
        it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableStartDate', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
            focusedInput: _constants.START_DATE,
            phrases: phrases
          })));
          var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
          (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableStartDate);
        });
      });
      describe('focusedInput is END_DATE', function () {
        it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableEndDate', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
            focusedInput: _constants.END_DATE,
            phrases: phrases
          })));
          var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
          (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableEndDate);
        });
      });
      describe('focusedInput is null', function () {
        it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableDate', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
            focusedInput: null,
            phrases: phrases
          })));
          var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
          (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableDate);
        });
      });
    });
  });
  describe('#componentWillReceiveProps', function () {
    var props = _objectSpread(_objectSpread({}, _DayPickerRangeController["default"].defaultProps), {}, {
      onDatesChange: function onDatesChange() {},
      onFocusChange: function onFocusChange() {}
    });

    describe('rebuilding currentMonth/visibleDays', function () {
      describe('initialVisibleMonth changed', function () {
        describe('focusedInput has changed and is truthy', function () {
          it('calls getStateForNewMonth with nextProps', function () {
            var getStateForNewMonthSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: null
            })));
            getStateForNewMonthSpy.resetHistory();
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              initialVisibleMonth: function initialVisibleMonth() {
                return (0, _moment["default"])();
              }
            }));
            (0, _chai.expect)(getStateForNewMonthSpy.callCount).to.equal(1);
          });
          it('sets state.currentMonth to getStateForNewMonth.currentMonth', function () {
            var currentMonth = (0, _moment["default"])().add(10, 'months');

            var getStateForNewMonthStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

            getStateForNewMonthStub.returns({
              currentMonth: currentMonth,
              visibleDays: {}
            });
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: null
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              initialVisibleMonth: function initialVisibleMonth() {
                return (0, _moment["default"])();
              }
            }));
            (0, _chai.expect)(wrapper.instance().state.currentMonth).to.equal(currentMonth);
          });
          it('sets state.visibleDays to getStateForNewMonth.visibleDays', function () {
            var currentMonth = (0, _moment["default"])().add(10, 'months');
            var visibleDays = (0, _getVisibleDays["default"])(currentMonth, 1);

            var getStateForNewMonthStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

            getStateForNewMonthStub.returns({
              currentMonth: currentMonth,
              visibleDays: visibleDays
            });
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: null
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              initialVisibleMonth: function initialVisibleMonth() {
                return (0, _moment["default"])();
              }
            }));
            (0, _chai.expect)(wrapper.instance().state.visibleDays).to.equal(visibleDays);
          });
        });
        describe('focusedInput has not changed', function () {
          it('does not call getStateForNewMonth', function () {
            var getStateForNewMonthSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: null
            })));
            getStateForNewMonthSpy.resetHistory();
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: null,
              initialVisibleMonth: function initialVisibleMonth() {
                return (0, _moment["default"])();
              }
            }));
            (0, _chai.expect)(getStateForNewMonthSpy.callCount).to.equal(0);
          });
          it('does not change state.currentMonth', function () {
            var currentMonth = (0, _moment["default"])().add(10, 'months');

            var getStateForNewMonthStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

            getStateForNewMonthStub.returns({
              currentMonth: (0, _moment["default"])(),
              visibleDays: {}
            });
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: null
            })));
            wrapper.setState({
              currentMonth: currentMonth
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: null,
              initialVisibleMonth: function initialVisibleMonth() {
                return (0, _moment["default"])();
              }
            }));
            (0, _chai.expect)(wrapper.instance().state.currentMonth).to.equal(currentMonth);
          });
          it('does not change state.visibleDays', function () {
            var visibleDays = {};

            var getStateForNewMonthStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

            getStateForNewMonthStub.returns({
              currentMonth: (0, _moment["default"])(),
              visibleDays: (0, _getVisibleDays["default"])((0, _moment["default"])(), 1)
            });
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: null
            })));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: null,
              initialVisibleMonth: function initialVisibleMonth() {
                return (0, _moment["default"])();
              }
            }));
            (0, _chai.expect)(wrapper.instance().state.visibleDays).to.equal(visibleDays);
          });
        });
      });
      describe('numberOfMonths changed', function () {
        it('calls getStateForNewMonth with nextProps', function () {
          var getStateForNewMonthSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
          getStateForNewMonthSpy.resetHistory();
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            numberOfMonths: 5
          }));
          (0, _chai.expect)(getStateForNewMonthSpy.callCount).to.equal(1);
        });
        it('sets state.currentMonth to getStateForNewMonth.currentMonth', function () {
          var currentMonth = (0, _moment["default"])().add(10, 'months');

          var getStateForNewMonthStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

          getStateForNewMonthStub.returns({
            currentMonth: currentMonth,
            visibleDays: {}
          });
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            numberOfMonths: 5
          }));
          (0, _chai.expect)(wrapper.instance().state.currentMonth).to.equal(currentMonth);
        });
        it('sets state.visibleDays to getStateForNewMonth.visibleDays', function () {
          var currentMonth = (0, _moment["default"])().add(10, 'months');
          var visibleDays = (0, _getVisibleDays["default"])(currentMonth, 1);

          var getStateForNewMonthStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

          getStateForNewMonthStub.returns({
            currentMonth: currentMonth,
            visibleDays: visibleDays
          });
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            numberOfMonths: 5
          }));
          (0, _chai.expect)(wrapper.instance().state.visibleDays).to.equal(visibleDays);
        });
      });
      describe('enableOutsideDays changed', function () {
        it('calls getStateForNewMonth with nextProps', function () {
          var getStateForNewMonthSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
          getStateForNewMonthSpy.resetHistory();
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            enableOutsideDays: true
          }));
          (0, _chai.expect)(getStateForNewMonthSpy.callCount).to.equal(1);
        });
        it('sets state.currentMonth to getStateForNewMonth.currentMonth', function () {
          var currentMonth = (0, _moment["default"])().add(10, 'months');

          var getStateForNewMonthStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

          getStateForNewMonthStub.returns({
            currentMonth: currentMonth,
            visibleDays: {}
          });
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            enableOutsideDays: true
          }));
          (0, _chai.expect)(wrapper.instance().state.currentMonth).to.equal(currentMonth);
        });
        it('sets state.visibleDays to getStateForNewMonth.visibleDays', function () {
          var currentMonth = (0, _moment["default"])().add(10, 'months');
          var visibleDays = (0, _getVisibleDays["default"])(currentMonth, 1);

          var getStateForNewMonthStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

          getStateForNewMonthStub.returns({
            currentMonth: currentMonth,
            visibleDays: visibleDays
          });
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            enableOutsideDays: true
          }));
          (0, _chai.expect)(wrapper.instance().state.visibleDays).to.equal(visibleDays);
        });
      });
      describe('startDate changed from one date to another', function () {
        it('removes previous `after-hovered-start` range', function () {
          var minimumNights = 5;
          var startDate = (0, _moment["default"])().add(7, 'days');
          var dayAfterStartDate = startDate.clone().add(1, 'day');
          var firstAvailableDate = startDate.clone().add(minimumNights + 1, 'days');

          var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

          var nextStartDate = (0, _moment["default"])().add(4, 'days');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            onDatesChange: _sinonSandbox["default"].stub(),
            onFocusChange: _sinonSandbox["default"].stub(),
            startDate: startDate,
            focusedInput: _constants.START_DATE,
            minimumNights: minimumNights
          }));
          deleteModifierFromRangeSpy.resetHistory();
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            startDate: nextStartDate
          }));
          var afterHoverStartCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'after-hovered-start');
          (0, _chai.expect)(afterHoverStartCalls.length).to.equal(1);
          (0, _chai.expect)((0, _isSameDay["default"])(afterHoverStartCalls[0].args[1], dayAfterStartDate)).to.equal(true);
          (0, _chai.expect)((0, _isSameDay["default"])(afterHoverStartCalls[0].args[2], firstAvailableDate)).to.equal(true);
        });
      });
      describe('endDate changed from one date to another', function () {
        it('removes previous `selected-end-no-selected-start` when no start date selected', function () {
          var minimumNights = 5;
          var endDate = (0, _moment["default"])().add(7, 'days');

          var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

          var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

          var nextEndDate = (0, _moment["default"])().add(4, 'days');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            onDatesChange: _sinonSandbox["default"].stub(),
            onFocusChange: _sinonSandbox["default"].stub(),
            endDate: endDate,
            focusedInput: _constants.END_DATE,
            minimumNights: minimumNights
          }));
          deleteModifierSpy.resetHistory();
          addModifierSpy.resetHistory();
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            endDate: nextEndDate
          }));
          var selectedEndNoStartDateDelete = getCallsByModifier(deleteModifierSpy, 'selected-end-no-selected-start');
          (0, _chai.expect)(selectedEndNoStartDateDelete.length).to.equal(1);
          (0, _chai.expect)((0, _isSameDay["default"])(selectedEndNoStartDateDelete[0].args[1], endDate)).to.equal(true);
          var selectedEndNoStartDateAdd = getCallsByModifier(addModifierSpy, 'selected-end-no-selected-start');
          (0, _chai.expect)(selectedEndNoStartDateAdd.length).to.equal(1);
          (0, _chai.expect)((0, _isSameDay["default"])(selectedEndNoStartDateAdd[0].args[1], nextEndDate)).to.equal(true);
        });
        it('calls getStateForNewMonth with nextProps when date is not visible', function () {
          var getStateForNewMonthSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'getStateForNewMonth');

          var endDate = (0, _moment["default"])();
          var nextEndDate = endDate.clone().add(2, 'months');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
            endDate: endDate
          })));
          getStateForNewMonthSpy.resetHistory();
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            endDate: nextEndDate
          }));
        });
      });
    });
    describe('modifiers', function () {
      describe('selected-start modifier', function () {
        describe('props.startDate did not change', function () {
          it('does not call this.addModifier with `selected-start', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var startDate = today;
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: startDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: startDate
            }));
            (0, _chai.expect)(getCallsByModifier(addModifierSpy, 'selected-start').length).to.equal(0);
          });
          it('does not call this.deleteModifier with `selected-start', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var startDate = today;
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: startDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: startDate
            }));
            (0, _chai.expect)(getCallsByModifier(deleteModifierSpy, 'selected-start').length).to.equal(0);
          });
        });
        describe('props.startDate changed', function () {
          it('deleteModifier gets called with old startDate and `selected-start`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var startDate = today;
            var newStartDate = (0, _moment["default"])().add(1, 'day');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: startDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: newStartDate
            }));
            var selectedStartCalls = getCallsByModifier(deleteModifierSpy, 'selected-start');
            (0, _chai.expect)(selectedStartCalls.length).to.equal(1);
            (0, _chai.expect)(selectedStartCalls[0].args[1]).to.equal(startDate);
          });
          it('addModifier gets called with new startDate and `selected-start`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var startDate = today;
            var newStartDate = (0, _moment["default"])().add(1, 'day');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: startDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: newStartDate
            }));
            var selectedStartCalls = getCallsByModifier(addModifierSpy, 'selected-start');
            (0, _chai.expect)(selectedStartCalls.length).to.equal(1);
            (0, _chai.expect)(selectedStartCalls[0].args[1]).to.equal(newStartDate);
          });
        });
      });
      describe('selected-end modifier', function () {
        describe('props.endDate did not change', function () {
          it('does not call this.addModifier with `selected-end`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var endDate = today;
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              endDate: endDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: endDate
            }));
            (0, _chai.expect)(getCallsByModifier(addModifierSpy, 'selected-end').length).to.equal(0);
          });
          it('does not call this.deleteModifier with `selected-end`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var endDate = today;
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              endDate: endDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: endDate
            }));
            (0, _chai.expect)(getCallsByModifier(deleteModifierSpy, 'selected-end').length).to.equal(0);
          });
        });
        describe('props.endDate changed', function () {
          it('deleteModifier gets called with old endDate and `selected-end`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var endDate = today;
            var newEndDate = (0, _moment["default"])().add(1, 'day');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              endDate: endDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: newEndDate
            }));
            var selectedEndCalls = getCallsByModifier(deleteModifierSpy, 'selected-end');
            (0, _chai.expect)(selectedEndCalls.length).to.equal(1);
            (0, _chai.expect)(selectedEndCalls[0].args[1]).to.equal(endDate);
          });
          it('addModifier gets called with new endDate and `selected-end`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var endDate = today;
            var newEndDate = (0, _moment["default"])().add(1, 'day');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              endDate: endDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: newEndDate
            }));
            var selectedEndCalls = getCallsByModifier(addModifierSpy, 'selected-end');
            (0, _chai.expect)(selectedEndCalls.length).to.equal(1);
            (0, _chai.expect)(selectedEndCalls[0].args[1]).to.equal(newEndDate);
          });
        });
      });
      describe('hovered-span modifier', function () {
        describe('startDate changed', function () {
          describe('new startDate does not exist', function () {
            it('deleteModifierFromRange does not get called with `hovered-span`', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var endDate = (0, _moment["default"])().add(10, 'days');
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: today
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: null,
                endDate: endDate
              }));
              var hoverSpanCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-span');
              (0, _chai.expect)(hoverSpanCalls.length).to.equal(0);
            });
          });
          describe('new endDate does not exist', function () {
            it('deleteModifierFromRange does not get called with `hovered-span`', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var startDate = today;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                endDate: null
              }));
              var hoverSpanCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-span');
              (0, _chai.expect)(hoverSpanCalls.length).to.equal(0);
            });
          });
          describe('new startDate and new endDate both exist', function () {
            it('deleteModifierFromRange gets called with startDate, endDate + 1 day, and `hovered-span`', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var startDate = today;
              var endDate = today.clone().add(10, 'days');
              var dayAfterEndDate = endDate.clone().add(1, 'day');
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                endDate: endDate
              }));
              var hoverSpanCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-span');
              (0, _chai.expect)(hoverSpanCalls.length).to.equal(1);
              (0, _chai.expect)(hoverSpanCalls[0].args[1]).to.equal(startDate);
              (0, _chai.expect)((0, _isSameDay["default"])(hoverSpanCalls[0].args[2], dayAfterEndDate)).to.equal(true);
            });
          });
        });
      });
      describe('selected-span modifier', function () {
        describe('startDate changed', function () {
          describe('old startDate and old endDate both exist', function () {
            it('deleteModifierFromRange gets called with old startDate + 1 day, old endDate, and `selected-span`', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var startDate = today;
              var newStartDate = (0, _moment["default"])().add(7, 'days');
              var endDate = (0, _moment["default"])().add(10, 'days');
              var dayAfterEndDate = endDate.clone().add(1, 'day');
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                endDate: endDate
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: newStartDate,
                endDate: endDate
              }));
              var selectedSpanCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'selected-span');
              (0, _chai.expect)(selectedSpanCalls.length).to.equal(1);
              (0, _chai.expect)(selectedSpanCalls[0].args[1]).to.equal(startDate);
              (0, _chai.expect)((0, _isSameDay["default"])(selectedSpanCalls[0].args[2], dayAfterEndDate)).to.equal(true);
            });
          });
          describe('new startDate and new endDate both exist', function () {
            it('addModifierToRange gets calls with new startDate + 1 day, endDate, and `selected-span`', function () {
              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var startDate = (0, _moment["default"])().add(1, 'day');
              var newStartDate = today;
              var dayAfterStartDate = newStartDate.clone().add(1, 'day');
              var endDate = today.clone().add(10, 'days');
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                endDate: endDate
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: newStartDate,
                endDate: endDate
              }));
              var selectedStartCalls = getCallsByModifier(addModifierToRangeSpy, 'selected-span');
              (0, _chai.expect)(selectedStartCalls.length).to.equal(1);
              (0, _chai.expect)((0, _isSameDay["default"])(selectedStartCalls[0].args[1], dayAfterStartDate)).to.equal(true);
              (0, _chai.expect)(selectedStartCalls[0].args[2]).to.equal(endDate);
            });
          });
        });
        describe('endDate changed', function () {
          describe('old startDate and old endDate both exist', function () {
            it('deleteModifierFromRange gets called with old startDate + 1 day, old endDate, and `selected-span`', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var startDate = today;
              var endDate = today.clone().add(10, 'days');
              var dayAfterEndDate = endDate.clone().add(1, 'day');
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                endDate: endDate
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                endDate: (0, _moment["default"])().add(11, 'day')
              }));
              var selectedSpanCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'selected-span');
              (0, _chai.expect)(selectedSpanCalls.length).to.equal(1);
              (0, _chai.expect)(selectedSpanCalls[0].args[1]).to.equal(startDate);
              (0, _chai.expect)((0, _isSameDay["default"])(selectedSpanCalls[0].args[2], dayAfterEndDate)).to.equal(true);
            });
          });
          describe('new startDate and new endDate both exist', function () {
            it('addModifierToRange gets calls with startDate + 1 day, endDate, and `selected-span`', function () {
              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var startDate = today;
              var dayAfterStartDate = startDate.clone().add(1, 'day');
              var endDate = (0, _moment["default"])().add(1, 'day');
              var newEndDate = today.clone().add(10, 'days');
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                endDate: endDate
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                endDate: newEndDate
              }));
              var selectedSpanCalls = getCallsByModifier(addModifierToRangeSpy, 'selected-span');
              (0, _chai.expect)(selectedSpanCalls.length).to.equal(1);
              (0, _chai.expect)((0, _isSameDay["default"])(selectedSpanCalls[0].args[1], dayAfterStartDate)).to.equal(true);
              (0, _chai.expect)(selectedSpanCalls[0].args[2]).to.equal(newEndDate);
            });
          });
        });
      });
      describe('after-hovered-start modifier', function () {
        describe('start date changed, is truthy, and there is no end date', function () {
          it('calls addModifierToRange with `after-hovered-start`', function () {
            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: (0, _moment["default"])()
            }));
            var afterHoverStartCalls = getCallsByModifier(addModifierToRangeSpy, 'after-hovered-start');
            (0, _chai.expect)(afterHoverStartCalls.length).to.equal(1);
          });
          it('`after-hovered-start` addModifierToRange has span beginning with day after startDate', function () {
            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var startDate = (0, _moment["default"])();
            var startSpan = (0, _toISODateString["default"])(startDate.clone().add(1, 'day'));
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: startDate
            }));
            var afterHoverStartCalls = getCallsByModifier(addModifierToRangeSpy, 'after-hovered-start');
            (0, _chai.expect)((0, _toISODateString["default"])(afterHoverStartCalls[0].args[1])).to.equal(startSpan);
          });
          it('`after-hovered-start` addModifierToRange has span ending with startDate + minimumNights + 1', function () {
            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var minimumNights = 3;
            var startDate = (0, _moment["default"])();
            var endSpan = (0, _toISODateString["default"])(startDate.clone().add(minimumNights + 1, 'day'));
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              minimumNights: minimumNights
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: startDate,
              minimumNights: minimumNights
            }));
            var afterHoverStartCalls = getCallsByModifier(addModifierToRangeSpy, 'after-hovered-start');
            (0, _chai.expect)((0, _toISODateString["default"])(afterHoverStartCalls[0].args[2])).to.equal(endSpan);
          });
        });
        describe('start date did not change', function () {
          it('does not call addModifierToRange with `after-hovered-start`', function () {
            var startDate = (0, _moment["default"])();

            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: startDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: startDate
            }));
            var afterHoverStartCalls = getCallsByModifier(addModifierToRangeSpy, 'after-hovered-start');
            (0, _chai.expect)(afterHoverStartCalls.length).to.equal(0);
          });
        });
        describe('new start date is falsy', function () {
          it('does not call addModifierToRange with `after-hovered-start`', function () {
            var startDate = (0, _moment["default"])();

            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: startDate
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: null
            }));
            var afterHoverStartCalls = getCallsByModifier(addModifierToRangeSpy, 'after-hovered-start');
            (0, _chai.expect)(afterHoverStartCalls.length).to.equal(0);
          });
        });
        describe('end date exists', function () {
          it('does not call addModifierToRange with `after-hovered-start`', function () {
            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: (0, _moment["default"])(),
              endDate: (0, _moment["default"])()
            }));
            var afterHoverStartCalls = getCallsByModifier(addModifierToRangeSpy, 'after-hovered-start');
            (0, _chai.expect)(afterHoverStartCalls.length).to.equal(0);
          });
        });
      });
      describe('blocked-minimum-nights', function () {
        describe('old startDate exists', function () {
          describe('neither startdate nor focusedInput changed', function () {
            it('does not call deleteModifierFromRange with `blocked-minimum-nights`', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var startDate = today;
              var focusedInput = _constants.END_DATE;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                endDate: null,
                focusedInput: focusedInput
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                focusedInput: focusedInput
              }));
              var minimumNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'blocked-minimum-nights');
              (0, _chai.expect)(minimumNightsCalls.length).to.equal(0);
            });
          });
          describe('startDate changed', function () {
            it('calls deleteModifierFromRange with old start date, + min nights, and `blocked-minimum-nights', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var startDate = today;
              var focusedInput = _constants.END_DATE;
              var minimumNights = 5;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                focusedInput: focusedInput,
                minimumNights: minimumNights
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: (0, _moment["default"])().add(5, 'days'),
                focusedInput: focusedInput,
                minimumNights: minimumNights
              }));
              var minimumNightsEndSpan = startDate.clone().add(minimumNights, 'days');
              var minimumNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'blocked-minimum-nights');
              (0, _chai.expect)(minimumNightsCalls.length).to.equal(1);
              (0, _chai.expect)(minimumNightsCalls[0].args[1]).to.equal(startDate);
              (0, _chai.expect)((0, _isSameDay["default"])(minimumNightsCalls[0].args[2], minimumNightsEndSpan)).to.equal(true);
            });
          });
          describe('focusedInput changed', function () {
            it('calls deleteModifierFromRange with old start date, + min nights, and `blocked-minimum-nights`', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var startDate = today;
              var focusedInput = _constants.END_DATE;
              var minimumNights = 5;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                startDate: startDate,
                focusedInput: _constants.START_DATE,
                minimumNights: minimumNights
              }));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                focusedInput: focusedInput,
                minimumNights: minimumNights
              }));
              var minimumNightsEndSpan = startDate.clone().add(minimumNights, 'days');
              var minimumNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'blocked-minimum-nights');
              (0, _chai.expect)(minimumNightsCalls.length).to.equal(1);
              (0, _chai.expect)(minimumNightsCalls[0].args[1]).to.equal(startDate);
              (0, _chai.expect)((0, _isSameDay["default"])(minimumNightsCalls[0].args[2], minimumNightsEndSpan)).to.equal(true);
            });
          });
          describe('minimumNights changed', function () {
            it('calls deleteModifierFromRange with start date + old min nights, and `blocked-minimum-nights`', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var startDate = today;
              var focusedInput = _constants.START_DATE;
              var minimumNights = 5;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                startDate: startDate,
                focusedInput: focusedInput,
                minimumNights: minimumNights
              }));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: focusedInput,
                startDate: startDate,
                minimumNights: 1
              }));
              var minimumNightsEndSpan = startDate.clone().add(minimumNights, 'days');
              var minimumNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'blocked-minimum-nights');
              (0, _chai.expect)(minimumNightsCalls.length).to.equal(1);
              (0, _chai.expect)(minimumNightsCalls[0].args[1]).to.equal(startDate);
              (0, _chai.expect)((0, _isSameDay["default"])(minimumNightsCalls[0].args[2], minimumNightsEndSpan)).to.equal(true);
            });
          });
        });
        describe('new startDate exists', function () {
          describe('new focusedInput !== END_DATE', function () {
            it('does not call addModifierFromRange with `blocked-minimum-nights', function () {
              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var startDate = (0, _moment["default"])(today);
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                focusedInput: _constants.END_DATE,
                startDate: startDate,
                minimumNights: 5
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: today,
                focusedInput: _constants.START_DATE,
                minimumNights: 5
              }));
              var minimumNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'blocked-minimum-nights');
              (0, _chai.expect)(minimumNightsCalls.length).to.equal(0);
            });
            it('updates state to remove `blocked-minimum-nights` and `blocked` from the appropriate days', function () {
              var startDate = today;
              var minimumNights = 5;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                focusedInput: _constants.END_DATE,
                startDate: startDate,
                minimumNights: minimumNights
              })));

              var _wrapper$state = wrapper.state(),
                  visibleDays = _wrapper$state.visibleDays;

              var day = (0, _moment["default"])(today);

              for (var i = 0; i < minimumNights; i += 1) {
                var monthString = (0, _toISOMonthString4["default"])(day);
                var dateString = (0, _toISODateString["default"])(day);
                (0, _chai.expect)(visibleDays[monthString][dateString]).to.include('blocked-minimum-nights');
                (0, _chai.expect)(visibleDays[monthString][dateString]).to.include('blocked');
                day.add(1, 'day');
              }

              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                focusedInput: _constants.START_DATE,
                minimumNights: minimumNights
              }));

              var _wrapper$state2 = wrapper.state(),
                  newVisibleDays = _wrapper$state2.visibleDays;

              day = (0, _moment["default"])(today);

              for (var i = 0; i < minimumNights; i += 1) {
                var monthString = (0, _toISOMonthString4["default"])(day);
                var dateString = (0, _toISODateString["default"])(day);
                (0, _chai.expect)(newVisibleDays[monthString][dateString]).not.to.include('blocked-minimum-nights');
                (0, _chai.expect)(newVisibleDays[monthString][dateString]).not.to.include('blocked');
                day.add(1, 'day');
              }
            });
          });
          describe('focusedInput === END_DATE', function () {
            it('calls addModifierFromRange with startDate, + min nights, `blocked-minimum-nights`', function () {
              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var startDate = today;
              var minimumNights = 5;
              var minimumNightsEndSpan = startDate.clone().add(minimumNights, 'days');
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                minimumNights: minimumNights
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                focusedInput: _constants.END_DATE,
                minimumNights: minimumNights
              }));
              var minimumNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'blocked-minimum-nights');
              (0, _chai.expect)(minimumNightsCalls.length).to.equal(1);
              (0, _chai.expect)(minimumNightsCalls[0].args[1]).to.equal(startDate);
              (0, _chai.expect)((0, _isSameDay["default"])(minimumNightsCalls[0].args[2], minimumNightsEndSpan)).to.equal(true);
            });
            it('updates state to include `blocked-minimum-nights` on the appropriate days', function () {
              var startDate = today;
              var minimumNights = 5;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                minimumNights: minimumNights
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                focusedInput: _constants.END_DATE,
                minimumNights: minimumNights
              }));

              var _wrapper$state3 = wrapper.state(),
                  visibleDays = _wrapper$state3.visibleDays;

              var day = (0, _moment["default"])(today);

              for (var i = 0; i < minimumNights; i += 1) {
                var monthString = (0, _toISOMonthString4["default"])(day);
                var dateString = (0, _toISODateString["default"])(day);
                (0, _chai.expect)(visibleDays[monthString][dateString]).to.include('blocked-minimum-nights');
                day.add(1, 'day');
              }
            });
            it('updates state to include `blocked` on the appropriate days', function () {
              var startDate = today;
              var minimumNights = 5;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                startDate: startDate,
                minimumNights: minimumNights
              })));
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                startDate: startDate,
                focusedInput: _constants.END_DATE,
                minimumNights: minimumNights
              }));

              var _wrapper$state4 = wrapper.state(),
                  visibleDays = _wrapper$state4.visibleDays;

              var day = (0, _moment["default"])(today);

              for (var i = 0; i < minimumNights; i += 1) {
                var monthString = (0, _toISOMonthString4["default"])(day);
                var dateString = (0, _toISODateString["default"])(day);
                (0, _chai.expect)(visibleDays[monthString][dateString]).to.include('blocked');
                day.add(1, 'day');
              }
            });
          });
        });
      });
      describe('blocked-out-of-range', function () {
        describe('focusedInput did not change', function () {
          it('does not call isOutsideRange if unchanged', function () {
            var isOutsideRangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
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

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              isOutsideRange: isOutsideRangeStub
            }));
            (0, _chai.expect)(isOutsideRangeStub.callCount).to.not.equal(0);
          });
        });
        describe('focusedInput changed', function () {
          var numVisibleDays = 3;
          var visibleDays;
          beforeEach(function () {
            var _toISOMonthString;

            var startOfMonth = today.clone().startOf('month');
            visibleDays = (0, _defineProperty2["default"])({}, (0, _toISOMonthString4["default"])(startOfMonth), (_toISOMonthString = {}, (0, _defineProperty2["default"])(_toISOMonthString, (0, _toISODateString["default"])(startOfMonth), new Set()), (0, _defineProperty2["default"])(_toISOMonthString, (0, _toISODateString["default"])(startOfMonth.clone().add(1, 'day')), new Set()), (0, _defineProperty2["default"])(_toISOMonthString, (0, _toISODateString["default"])(startOfMonth.clone().add(2, 'days')), new Set()), _toISOMonthString));
          });
          it('calls isOutsideRange for every visible day', function () {
            var isOutsideRangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
              isOutsideRange: isOutsideRangeStub
            }));
            (0, _chai.expect)(isOutsideRangeStub.callCount).to.equal(numVisibleDays);
          });
          it('if isOutsideRange(day) is true calls addModifier with `blocked-out-of-range` for each day', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(true);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              isOutsideRange: isOutsideRangeStub
            }));
            var blockedCalendarCalls = getCallsByModifier(addModifierSpy, 'blocked-out-of-range');
            (0, _chai.expect)(blockedCalendarCalls.length).to.equal(numVisibleDays);
          });
          it('if isOutsideRange(day) is false calls deleteModifier with day and `blocked-out-of-range`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(false);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
              isOutsideRange: isOutsideRangeStub
            }));
            var blockedCalendarCalls = getCallsByModifier(deleteModifierSpy, 'blocked-out-of-range');
            (0, _chai.expect)(blockedCalendarCalls.length).to.equal(numVisibleDays);
          });
        });
      });
      describe('blocked-calendar', function () {
        describe('focusedInput did not change', function () {
          it('does not call isDayBlocked if unchanged', function () {
            var isDayBlockedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
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

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              isDayBlocked: isDayBlockedStub
            }));
            (0, _chai.expect)(isDayBlockedStub.callCount).to.not.equal(0);
          });
        });
        describe('focusedInput changed', function () {
          var numVisibleDays = 3;
          var visibleDays;
          beforeEach(function () {
            var _toISOMonthString2;

            var startOfMonth = today.clone().startOf('month');
            visibleDays = (0, _defineProperty2["default"])({}, (0, _toISOMonthString4["default"])(startOfMonth), (_toISOMonthString2 = {}, (0, _defineProperty2["default"])(_toISOMonthString2, (0, _toISODateString["default"])(startOfMonth), new Set()), (0, _defineProperty2["default"])(_toISOMonthString2, (0, _toISODateString["default"])(startOfMonth.clone().add(1, 'day')), new Set()), (0, _defineProperty2["default"])(_toISOMonthString2, (0, _toISODateString["default"])(startOfMonth.clone().add(2, 'days')), new Set()), _toISOMonthString2));
          });
          it('calls isDayBlocked for every visible day', function () {
            var isDayBlockedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
              isDayBlocked: isDayBlockedStub
            }));
            (0, _chai.expect)(isDayBlockedStub.callCount).to.equal(numVisibleDays);
          });
          it('if isDayBlocked(day) is true calls addModifier with `blocked-calendar` for each day', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var isDayBlockedStub = _sinonSandbox["default"].stub().returns(true);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              isDayBlocked: isDayBlockedStub
            }));
            var blockedCalendarCalls = getCallsByModifier(addModifierSpy, 'blocked-calendar');
            (0, _chai.expect)(blockedCalendarCalls.length).to.equal(numVisibleDays);
          });
          it('if isDayBlocked(day) is false calls deleteModifier with day and `blocked-calendar`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var isDayBlockedStub = _sinonSandbox["default"].stub().returns(false);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
              isDayBlocked: isDayBlockedStub
            }));
            var blockedCalendarCalls = getCallsByModifier(deleteModifierSpy, 'blocked-calendar');
            (0, _chai.expect)(blockedCalendarCalls.length).to.equal(numVisibleDays);
          });
        });
      });
      describe('highlighted-calendar', function () {
        describe('focusedInput did not change', function () {
          it('does not call isDayHighlighted', function () {
            var isDayHighlightedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
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

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
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
            var _toISOMonthString3;

            var startOfMonth = today.clone().startOf('month');
            visibleDays = (0, _defineProperty2["default"])({}, (0, _toISOMonthString4["default"])(startOfMonth), (_toISOMonthString3 = {}, (0, _defineProperty2["default"])(_toISOMonthString3, (0, _toISODateString["default"])(startOfMonth), new Set()), (0, _defineProperty2["default"])(_toISOMonthString3, (0, _toISODateString["default"])(startOfMonth.clone().add(1, 'day')), new Set()), (0, _defineProperty2["default"])(_toISOMonthString3, (0, _toISODateString["default"])(startOfMonth.clone().add(2, 'days')), new Set()), _toISOMonthString3));
          });
          it('calls isDayHighlighted for every visible day', function () {
            var isDayHighlightedStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
              isDayHighlighted: isDayHighlightedStub
            }));
            (0, _chai.expect)(isDayHighlightedStub.callCount).to.equal(numVisibleDays);
          });
          it('if isDayHighlighted(day) is true calls addModifier with day and `highlighted-calendar`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var isDayHighlightedStub = _sinonSandbox["default"].stub().returns(true);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
              isDayHighlighted: isDayHighlightedStub
            }));
            var highlightedCalendarCalls = getCallsByModifier(addModifierSpy, 'highlighted-calendar');
            (0, _chai.expect)(highlightedCalendarCalls.length).to.equal(numVisibleDays);
          });
          it('if isDayHighlighted(day) is false calls deleteModifier with day and `highlighted-calendar`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var isDayHighlightedStub = _sinonSandbox["default"].stub().returns(false);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.setState({
              visibleDays: visibleDays
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
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
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().today = today;
            wrapper.instance().componentWillReceiveProps(props);
            var todayCalls = getCallsByModifier(deleteModifierSpy, 'today');
            (0, _chai.expect)(todayCalls.length).to.equal(0);
          });
          it('does not call addModifier with `today`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().today = today;
            wrapper.instance().componentWillReceiveProps(props);
            var todayCalls = getCallsByModifier(addModifierSpy, 'today');
            (0, _chai.expect)(todayCalls.length).to.equal(0);
          });
        });
        describe('this.today is no longer today', function () {
          it('calls deleteModifier with this.today and `today` modifier', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().today = (0, _moment["default"])().subtract(1, 'day');
            wrapper.instance().componentWillReceiveProps(props);
            var todayCalls = getCallsByModifier(deleteModifierSpy, 'today');
            (0, _chai.expect)(todayCalls.length).to.equal(1);
          });
          it('calls addModifier with new today and `today` modifiers', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            wrapper.instance().today = (0, _moment["default"])().subtract(1, 'day');
            wrapper.instance().componentWillReceiveProps(props);
            var todayCalls = getCallsByModifier(addModifierSpy, 'today');
            (0, _chai.expect)(todayCalls.length).to.equal(1);
          });
        });
      });
      describe('hovered-start-blocked-minimum-nights', function () {
        describe('focusedInput did not change', function () {
          it('does not call getMinNightsForHoverDate', function () {
            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            (0, _chai.expect)(getMinNightsForHoverDateStub.callCount).to.equal(0);
          });
        });
        describe('focusedInput did change', function () {
          it('does not call getMinNightsForHoverDate when there is no hoverDate state', function () {
            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            (0, _chai.expect)(getMinNightsForHoverDateStub.callCount).to.equal(0);
          });
          it('calls getMinNightsForHoverDate when there is hoverDate state', function () {
            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            })));
            wrapper.setState({
              hoverDate: today
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            (0, _chai.expect)(getMinNightsForHoverDateStub.callCount).to.equal(1);
          });
          describe('focusedInput === START_DATE', function () {
            it('calls addModifierToRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate returns a positive integer', function () {
              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
              (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(1);
              (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[1], today.clone().add(1, 'days'))).to.equal(true);
              (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[2], today.clone().add(2, 'days'))).to.equal(true);
            });
            it('does not call addModifierToRange with `hovered-start-blocked-minimum-nights` if the hovered date is blocked', function () {
              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub,
                isDayBlocked: function isDayBlocked(day) {
                  return (0, _isSameDay["default"])(day, today);
                }
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
              (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
            });
            it('does not call addModifierToRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate does not return a positive integer', function () {
              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
              (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
            });
            it('does not call addModifierToRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate is not supplied as a prop', function () {
              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE
              }));
              var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
              (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
            });
          });
          describe('focusedInput === END_DATE', function () {
            it('calls deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate returns a positive integer', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.END_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
              (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(1);
              (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[1], today.clone().add(1, 'days'))).to.equal(true);
              (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[2], today.clone().add(2, 'days'))).to.equal(true);
            });
            it('does not call deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if the hovered date is blocked', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub,
                isDayBlocked: function isDayBlocked(day) {
                  return (0, _isSameDay["default"])(day, today);
                }
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
              (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
            });
            it('does not call deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate does not return a positive integer', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.END_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
              (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
            });
            it('does not call deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate is not supplied as a prop', function () {
              var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.END_DATE
              }));
              var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
              (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
            });
          });
        });
      });
      describe('hovered-start-first-possible-end', function () {
        describe('focusedInput did not change', function () {
          it('does not call getMinNightsForHoverDate', function () {
            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            (0, _chai.expect)(getMinNightsForHoverDateStub.callCount).to.equal(0);
          });
        });
        describe('focusedInput did change', function () {
          it('does not call getMinNightsForHoverDate when there is no hoverDate state', function () {
            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            })));
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            (0, _chai.expect)(getMinNightsForHoverDateStub.callCount).to.equal(0);
          });
          it('calls getMinNightsForHoverDate when there is hoverDate state', function () {
            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            })));
            wrapper.setState({
              hoverDate: today
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            (0, _chai.expect)(getMinNightsForHoverDateStub.callCount).to.equal(1);
          });
          describe('focusedInput === START_DATE', function () {
            it('calls addModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate returns a positive integer', function () {
              var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
              (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(1);
              (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartFirstPossibleEndCalls[0].args[1], today.clone().add(2, 'days'))).to.equal(true);
            });
            it('does not call addModifierToRange with `hovered-start-first-possible-end` if the hovered date is blocked', function () {
              var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub,
                isDayBlocked: function isDayBlocked(day) {
                  return (0, _isSameDay["default"])(day, today);
                }
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
              (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
            });
            it('does not call addModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate does not return a positive integer', function () {
              var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
              (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
            });
            it('does not call addModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate is not supplied as a prop', function () {
              var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE
              }));
              var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
              (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
            });
          });
          describe('focusedInput === END_DATE', function () {
            it('calls deleteModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate returns a positive integer', function () {
              var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.END_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
              (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(1);
              (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartFirstPossibleEndCalls[0].args[1], today.clone().add(2, 'days'))).to.equal(true);
            });
            it('does not call deleteModifierFromRange with `hovered-start-first-possible-end` if the hovered date is blocked', function () {
              var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub,
                isDayBlocked: function isDayBlocked(day) {
                  return (0, _isSameDay["default"])(day, today);
                }
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.START_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
              (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
            });
            it('does not call deleteModifierFromRange with `hovered-start-first-possible-end` if getMinNightsForHoverDate does not return a positive integer', function () {
              var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

              var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              })));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.END_DATE,
                getMinNightsForHoverDate: getMinNightsForHoverDateStub
              }));
              var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
              (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
            });
            it('does not call deleteModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate is not supplied as a prop', function () {
              var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
              wrapper.setState({
                hoverDate: today
              });
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                focusedInput: _constants.END_DATE
              }));
              var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
              (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
            });
          });
        });
      });
      describe('no-selected-start-before-selected-end', function () {
        describe('start or end date has changed, start date is falsey, and end date is truthy', function () {
          it('calls addModifier with `no-selected-start-before-selected-end` if day is before selected end date', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var endDate = today.clone();
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: null,
              endDate: endDate
            })));
            var newEndDate = endDate.clone().add(1, 'days');
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: newEndDate
            }));
            var noSelectedStartBeforeSelectedEndCalls = getCallsByModifier(addModifierSpy, 'no-selected-start-before-selected-end');
            noSelectedStartBeforeSelectedEndCalls.forEach(function (eachCall) {
              var day = eachCall.args[1];
              (0, _chai.expect)((0, _isBeforeDay["default"])(day, newEndDate)).to.equal(true);
            });
          });
        });
        describe('start date has changed, previous start date is falsey, start and end date is truthy', function () {
          it('calls deleteModifier with `no-selected-start-before-selected-end` if day is before selected end date', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var endDate = today.clone().add(10, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: null,
              endDate: endDate
            })));
            var newStartDate = today;
            var visibleDays = wrapper.instance().state.visibleDays;
            var numberOfVisibleDays = Object.values(visibleDays).reduce(function (total, visibleDayArray) {
              return total + Object.keys(visibleDayArray).length;
            }, 0);
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: endDate,
              startDate: newStartDate
            }));
            var noSelectedStartBeforeSelectedEndCalls = getCallsByModifier(deleteModifierSpy, 'no-selected-start-before-selected-end');
            (0, _chai.expect)(noSelectedStartBeforeSelectedEndCalls.length).to.equal(numberOfVisibleDays);
          });
        });
      });
      describe('selected-start-no-selected-end', function () {
        describe('start date is truthy, and end date is falsey', function () {
          it('calls addModifier with `selected-start-no-selected-end`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            var startDate = (0, _moment["default"])();
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: startDate
            }));
            var selectedStartNoSelectedEndCalls = getCallsByModifier(addModifierSpy, 'selected-start-no-selected-end');
            (0, _chai.expect)(selectedStartNoSelectedEndCalls.length).to.equal(1);
            (0, _chai.expect)(selectedStartNoSelectedEndCalls[0].args[1]).to.equal(startDate);
          });
        });
        describe('start date has changed, and end date or previous end date are falsey', function () {
          it('calls deleteModifier with `selected-start-no-selected-end`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var startDate = (0, _moment["default"])();
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              startDate: startDate
            })));
            var newStartDate = startDate.clone().add(1, 'days');
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: newStartDate
            }));
            var selectedStartNoSelectedEndCalls = getCallsByModifier(deleteModifierSpy, 'selected-start-no-selected-end');
            (0, _chai.expect)(selectedStartNoSelectedEndCalls.length).to.equal(1);
            (0, _chai.expect)(selectedStartNoSelectedEndCalls[0].args[1]).to.equal(startDate);
          });
        });
      });
      describe('selected-end-no-selected-start', function () {
        describe('end date is truthy, and start date is falsey', function () {
          it('calls addModifier with `selected-end-no-selected-start`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], props));
            var endDate = (0, _moment["default"])();
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: endDate
            }));
            var selectedStartNoSelectedEndCalls = getCallsByModifier(addModifierSpy, 'selected-end-no-selected-start');
            (0, _chai.expect)(selectedStartNoSelectedEndCalls.length).to.equal(1);
            (0, _chai.expect)(selectedStartNoSelectedEndCalls[0].args[1]).to.equal(endDate);
          });
        });
        describe('end date has changed, and start date or previous start date are falsey', function () {
          it('calls deleteModifier with `selected-end-no-selected-start`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var endDate = (0, _moment["default"])();
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              endDate: endDate
            })));
            var newEndDate = endDate.clone().add(1, 'days');
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: newEndDate
            }));
            var selectedStartNoSelectedEndCalls = getCallsByModifier(deleteModifierSpy, 'selected-end-no-selected-start');
            (0, _chai.expect)(selectedStartNoSelectedEndCalls.length).to.equal(1);
            (0, _chai.expect)(selectedStartNoSelectedEndCalls[0].args[1]).to.equal(endDate);
          });
        });
        describe('start date has changed, and start date is truthy, and previous start date was falsey', function () {
          it('calls deleteModifier with `selected-end-no-selected-start`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var endDate = (0, _moment["default"])();
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              endDate: endDate
            })));
            var newStartDate = endDate.clone().subtract(1, 'days');
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              startDate: newStartDate
            }));
            var selectedStartNoSelectedEndCalls = getCallsByModifier(deleteModifierSpy, 'selected-end-no-selected-start');
            (0, _chai.expect)(selectedStartNoSelectedEndCalls.length).to.equal(1);
            (0, _chai.expect)(selectedStartNoSelectedEndCalls[0].args[1]).to.equal(endDate);
          });
        });
      });
      describe('before-hovered-end', function () {
        describe('end date changed, end date is truthy and start date is falsey', function () {
          it('calls addModifierToRange with `before-hovered-end`', function () {
            var minimumNights = 1;

            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var endDate = (0, _moment["default"])();
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              minimumNights: minimumNights,
              endDate: endDate
            })));
            var newEndDate = endDate.clone().add(1, 'days');
            addModifierToRangeSpy.resetHistory();
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              endDate: newEndDate
            }));
            var beforeHoveredEndCalls = getCallsByModifier(addModifierToRangeSpy, 'before-hovered-end');
            (0, _chai.expect)(beforeHoveredEndCalls.length).to.equal(1);
            (0, _chai.expect)((0, _toISODateString["default"])(beforeHoveredEndCalls[0].args[1])).to.equal((0, _toISODateString["default"])(newEndDate.clone().subtract(minimumNights, 'days')));
            (0, _chai.expect)((0, _toISODateString["default"])(beforeHoveredEndCalls[0].args[2])).to.equal((0, _toISODateString["default"])(newEndDate));
          });
        });
      });
      describe('selected-end-in-hovered-span', function () {
        describe('start date has changed', function () {
          describe('start and end date are truthy, and previous start date is falsey', function () {
            it('calls deleteModifier with `selected-end-in-hovered-span`', function () {
              var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

              var endDate = today;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
                endDate: endDate
              })));
              var newStartDate = endDate.clone().subtract(3, 'days');
              deleteModifierSpy.resetHistory();
              wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
                endDate: endDate,
                startDate: newStartDate
              }));
              var deleteModifierCalls = getCallsByModifier(deleteModifierSpy, 'selected-end-in-hovered-span');
              (0, _chai.expect)(deleteModifierCalls.length).to.equal(1);
              (0, _chai.expect)(deleteModifierCalls[0].args[1]).to.equal(endDate);
            });
          });
        });
      });
    });
    describe('phrases', function () {
      var phrases = {
        chooseAvailableDate: 'test1',
        chooseAvailableStartDate: 'test2',
        chooseAvailableEndDate: 'test3'
      };
      describe('neither props.focusedInput nor props.phrases have changed', function () {
        it('state.phrases does not change', function () {
          var phrasesObject = {
            hello: 'world'
          };
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
            phrases: phrases
          })));
          wrapper.setState({
            phrases: phrasesObject
          });
          wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
            phrases: phrases
          }));
          (0, _chai.expect)(wrapper.state().phrases).to.equal(phrasesObject);
        });
      });
      describe('props.focusedInput has changed', function () {
        describe('new focusedInput is START_DATE', function () {
          it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableStartDate', function () {
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              phrases: phrases
            })));
            wrapper.setState({
              phrases: {}
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              phrases: phrases
            }));
            var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
            (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableStartDate);
          });
        });
        describe('new focusedInput is END_DATE', function () {
          it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableEndDate', function () {
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              phrases: phrases
            })));
            wrapper.setState({
              phrases: {}
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
              phrases: phrases
            }));
            var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
            (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableEndDate);
          });
        });
        describe('new focusedInput is null', function () {
          it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableDate', function () {
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: _constants.START_DATE,
              phrases: phrases
            })));
            wrapper.setState({
              phrases: {}
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              phrases: phrases
            }));
            var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
            (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableDate);
          });
        });
      });
      describe('props.phrases has changed', function () {
        describe('focusedInput is START_DATE', function () {
          it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableStartDate', function () {
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: _constants.START_DATE,
              phrases: {}
            })));
            wrapper.setState({
              phrases: {}
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.START_DATE,
              phrases: phrases
            }));
            var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
            (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableStartDate);
          });
        });
        describe('focusedInput is END_DATE', function () {
          it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableEndDate', function () {
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              focusedInput: _constants.END_DATE,
              phrases: {}
            })));
            wrapper.setState({
              phrases: {}
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              focusedInput: _constants.END_DATE,
              phrases: phrases
            }));
            var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
            (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableEndDate);
          });
        });
        describe('focusedInput is null', function () {
          it('state.phrases.chooseAvailableDate equals props.phrases.chooseAvailableDate', function () {
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], (0, _extends2["default"])({}, props, {
              phrases: {}
            })));
            wrapper.setState({
              phrases: {}
            });
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              phrases: phrases
            }));
            var newAvailableDatePhrase = wrapper.state().phrases.chooseAvailableDate;
            (0, _chai.expect)(newAvailableDatePhrase).to.equal(phrases.chooseAvailableDate);
          });
        });
      });
    });
  });
  describe('#onDayClick', function () {
    describe('day argument is a blocked day', function () {
      it('props.onFocusChange is not called', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onFocusChange: onFocusChangeStub,
          isDayBlocked: function isDayBlocked() {
            return true;
          }
        }));
        wrapper.instance().onDayClick(today);
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
      });
      it('props.onDatesChange is not called', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          isDayBlocked: function isDayBlocked() {
            return true;
          }
        }));
        wrapper.instance().onDayClick(today);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(0);
      });
    });
    describe('daysViolatingMinNightsCanBeClicked is true', function () {
      it('props.onDatesChange is called and props.onFocusChange is not called when the day does not meet min nights', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          daysViolatingMinNightsCanBeClicked: true,
          focusedInput: _constants.END_DATE,
          minimumNights: 3,
          onFocusChange: onFocusChangeStub,
          onDatesChange: onDatesChangeStub,
          startDate: today
        }));
        wrapper.instance().onDayClick(today.clone().add(1, 'days'));
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
    });
    describe('props.focusedInput === START_DATE', function () {
      describe('props.onFocusChange', function () {
        it('is called once', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.START_DATE,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onDayClick(today);
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
        });
        it('is called with END_DATE', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.START_DATE,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onDayClick(today);
          (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.END_DATE);
        });
      });
      it('calls props.onDatesChange', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.START_DATE,
          onDatesChange: onDatesChangeStub
        }));
        wrapper.instance().onDayClick(today);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
      describe('arg is after props.endDate', function () {
        it('calls props.onDatesChange with startDate === arg and endDate === null', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.START_DATE,
            endDate: today,
            onDatesChange: onDatesChangeStub
          }));
          var tomorrow = (0, _moment["default"])(today).add(1, 'days');
          wrapper.instance().onDayClick(tomorrow);
          (0, _chai.expect)(onDatesChangeStub.calledWith({
            startDate: tomorrow,
            endDate: null
          })).to.equal(true);
        });
      });
      describe('arg is before props.endDate', function () {
        it('calls props.onDatesChange with startDate === arg and endDate === props.endDate', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var tomorrow = (0, _moment["default"])(today).add(1, 'days');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.START_DATE,
            endDate: tomorrow,
            onDatesChange: onDatesChangeStub
          }));
          wrapper.instance().onDayClick(today);
          (0, _chai.expect)(onDatesChangeStub.calledWith({
            startDate: today,
            endDate: tomorrow
          })).to.equal(true);
        });
      });
      describe('props.endDate is null', function () {
        it('calls props.onDatesChange with startDate === arg and endDate === null', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.START_DATE,
            endDate: null,
            onDatesChange: onDatesChangeStub
          }));
          wrapper.instance().onDayClick(today);
          (0, _chai.expect)(onDatesChangeStub.calledWith({
            startDate: today,
            endDate: null
          })).to.equal(true);
        });
      });
      describe('minimumNights is 0', function () {
        it('calls props.onDatesChange with startDate === today and endDate === today', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.START_DATE,
            minimumNights: 0,
            onDatesChange: onDatesChangeStub,
            endDate: today
          }));
          wrapper.instance().onDayClick(today);
          (0, _chai.expect)(onDatesChangeStub.calledWith({
            startDate: today,
            endDate: today
          })).to.equal(true);
        });
      });
    });
    describe('props.focusedInput === END_DATE', function () {
      describe('arg is before props.startDate', function () {
        it('calls props.onDatesChange with startDate === arg and endDate === null', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.END_DATE,
            startDate: (0, _moment["default"])(today).add(1, 'days'),
            onDatesChange: onDatesChangeStub
          }));
          wrapper.instance().onDayClick(today);
          var args = onDatesChangeStub.getCall(0).args[0];
          (0, _chai.expect)(args.startDate).to.equal(today);
          (0, _chai.expect)(args.endDate).to.equal(null);
        });
      });
      describe('arg is not before props.startDate', function () {
        it('calls props.onDatesChange with startDate === props.startDate and endDate === arg', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.END_DATE,
            onDatesChange: onDatesChangeStub
          }));
          wrapper.instance().onDayClick(today);
          var args = onDatesChangeStub.getCall(0).args[0];
          (0, _chai.expect)(args.startDate).to.equal(wrapper.props().startDate);
          (0, _chai.expect)(args.endDate).to.equal(today);
        });
        describe('props.onFocusChange', function () {
          describe('props.startDate === null', function () {
            it('is called once', function () {
              var onFocusChangeStub = _sinonSandbox["default"].stub();

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.END_DATE,
                onFocusChange: onFocusChangeStub
              }));
              wrapper.instance().onDayClick(today);
              (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
            });
            it('is called with START_DATE', function () {
              var onFocusChangeStub = _sinonSandbox["default"].stub();

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.END_DATE,
                onFocusChange: onFocusChangeStub
              }));
              wrapper.instance().onDayClick(today);
              (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.START_DATE);
            });
          });
          describe('props.startDate is truthy', function () {
            it('is called once', function () {
              var onFocusChangeStub = _sinonSandbox["default"].stub();

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.END_DATE,
                startDate: today,
                onFocusChange: onFocusChangeStub
              }));
              wrapper.instance().onDayClick((0, _moment["default"])(today).add(1, 'days'));
              (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
            });
            it('is called with null', function () {
              var onFocusChangeStub = _sinonSandbox["default"].stub();

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.END_DATE,
                startDate: today,
                onFocusChange: onFocusChangeStub
              }));
              wrapper.instance().onDayClick((0, _moment["default"])(today).add(1, 'days'));
              (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(null);
            });
          });
        });
        describe('props.onClose', function () {
          describe('props.startDate is truthy', function () {
            it('is called with startDate and endDate', function () {
              var onCloseStub = _sinonSandbox["default"].stub();

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.END_DATE,
                startDate: today,
                onClose: onCloseStub
              }));
              var endDate = (0, _moment["default"])(today).add(1, 'days');
              wrapper.instance().onDayClick(endDate);
              var args = onCloseStub.getCall(0).args[0];
              (0, _chai.expect)(args.startDate).to.equal(today);
              (0, _chai.expect)(args.endDate).to.equal(endDate);
            });
          });
        });
      });
      describe('minimumNights is 0', function () {
        it('calls props.onDatesChange with startDate === today and endDate === today', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            focusedInput: _constants.END_DATE,
            minimumNights: 0,
            onDatesChange: onDatesChangeStub,
            startDate: today
          }));
          wrapper.instance().onDayClick(today);
          var args = onDatesChangeStub.getCall(0).args[0];
          (0, _chai.expect)(args.startDate).to.equal(today);
          (0, _chai.expect)(args.endDate).to.equal(today);
        });
      });
    });
    describe('props.startDateOffset / props.endDateOffset', function () {
      it('calls props.onDatesChange with startDate === startDateOffset(date) and endDate === endDateOffset(date)', function () {
        var clickDate = (0, _moment["default"])(today).clone().add(2, 'days');

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          startDateOffset: function startDateOffset(day) {
            return day.subtract(2, 'days');
          },
          endDateOffset: function endDateOffset(day) {
            return day.add(4, 'days');
          }
        }));
        wrapper.instance().onDayClick(clickDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(clickDate.clone().subtract(2, 'days').format());
        (0, _chai.expect)(args.endDate.format()).to.equal(clickDate.clone().add(4, 'days').format());
      });
      it('does not call props.onDatesChange with startDate === startDateOffset(date) and endDate === endDateOffset(date)', function () {
        var clickDate = (0, _moment["default"])(today).clone().add(2, 'days');

        var onDatesChangeStub = _sinonSandbox["default"].spy();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          startDateOffset: function startDateOffset(day) {
            return day.subtract(2, 'days');
          },
          endDateOffset: function endDateOffset(day) {
            return day.add(4, 'days');
          },
          isOutsideRange: function isOutsideRange(day) {
            return day.isAfter((0, _moment["default"])(today));
          }
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 0);
      });
      it('does not call props.onDatesChange when dateOffset isOutsideRange', function () {
        var clickDate = (0, _moment["default"])(today);

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          endDateOffset: function endDateOffset(day) {
            return day.add(5, 'days');
          },
          isOutsideRange: function isOutsideRange(day) {
            return day.isAfter((0, _moment["default"])(today).clone().add(1, 'days'));
          }
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 0);
      });
      it('calls props.onDatesChange with startDate === startDateOffset(date) and endDate === selectedDate when endDateOffset not provided', function () {
        var clickDate = (0, _moment["default"])(today).clone().add(2, 'days');

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          startDateOffset: function startDateOffset(day) {
            return day.subtract(5, 'days');
          }
        }));
        wrapper.instance().onDayClick(clickDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(clickDate.clone().subtract(5, 'days').format());
        (0, _chai.expect)(args.endDate.format()).to.equal(clickDate.format());
      });
      it('calls props.onDatesChange with startDate === selectedDate and endDate === endDateOffset(date) when startDateOffset not provided', function () {
        var clickDate = (0, _moment["default"])(today).clone().add(12, 'days');

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          endDateOffset: function endDateOffset(day) {
            return day.add(12, 'days');
          }
        }));
        wrapper.instance().onDayClick(clickDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(clickDate.format());
        (0, _chai.expect)(args.endDate.format()).to.equal(clickDate.clone().add(12, 'days').format());
      });
    });
    describe('props.onDatesChange only called once in onDayClick', function () {
      it('calls props.onDatesChange once when focusedInput === START_DATE', function () {
        var clickDate = (0, _moment["default"])(today);

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          focusedInput: _constants.START_DATE,
          endDate: null
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 1);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(clickDate.clone().format());
        (0, _chai.expect)(args.endDate).to.equal(null);
      });
      it('calls props.onDatesChange once when focusedInput === END_DATE and there is no startDate', function () {
        var clickDate = (0, _moment["default"])(today);

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          focusedInput: _constants.END_DATE,
          startDate: null
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 1);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate).to.equal(null);
        (0, _chai.expect)(args.endDate.format()).to.equal(clickDate.clone().format());
      });
      it('calls props.onDatesChange once when focusedInput === END_DATE and the day is a valid endDate', function () {
        var clickDate = (0, _moment["default"])(today);
        var startDate = clickDate.clone().subtract(2, 'days');

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          focusedInput: _constants.END_DATE,
          minimumNights: 2,
          startDate: startDate
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 1);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(startDate.clone().format());
        (0, _chai.expect)(args.endDate.format()).to.equal(clickDate.clone().format());
      });
      it('calls props.onDatesChange once when focusedInput === END_DATE, the day is an invalid endDate, and disabled !== START_DATE', function () {
        var clickDate = (0, _moment["default"])(today);

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          focusedInput: _constants.END_DATE,
          minimumNights: 2,
          startDate: clickDate.clone().add(1, 'days'),
          endDate: null
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 1);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(clickDate.clone().format());
        (0, _chai.expect)(args.endDate).to.equal(null);
      });
      it('calls props.onDatesChange once when focusedInput === END_DATE and the day is an invalid endDate', function () {
        var clickDate = (0, _moment["default"])(today);
        var startDate = clickDate.clone().add(1, 'days');

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          focusedInput: _constants.END_DATE,
          disabled: _constants.START_DATE,
          minimumNights: 2,
          startDate: startDate,
          endDate: null
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 1);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(startDate.clone().format());
        (0, _chai.expect)(args.endDate).to.equal(null);
      });
      it('calls props.onDatesChange once when there is a startDateOffset', function () {
        var clickDate = (0, _moment["default"])(today);

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          startDateOffset: function startDateOffset(day) {
            return day.subtract(2, 'days');
          }
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 1);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(clickDate.clone().subtract(2, 'days').format());
        (0, _chai.expect)(args.endDate.format()).to.equal(clickDate.clone().format());
      });
      it('calls props.onDatesChange once when there is a endDateOffset', function () {
        var clickDate = (0, _moment["default"])(today);

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChangeStub,
          endDateOffset: function endDateOffset(day) {
            return day.add(4, 'days');
          }
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(onDatesChangeStub).to.have.property('callCount', 1);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate.format()).to.equal(clickDate.clone().format());
        (0, _chai.expect)(args.endDate.format()).to.equal(clickDate.clone().add(4, 'days').format());
      });
    });
    describe('logic in props.onDatesChange affects props.onFocusChange', function () {
      var preventFocusChange;
      var focusedInput;
      var onDatesChange;
      var onFocusChange;
      beforeEach(function () {
        preventFocusChange = false;
        focusedInput = _constants.START_DATE;

        onDatesChange = function onDatesChange(_ref) {
          var startDate = _ref.startDate;
          if ((0, _isSameDay["default"])(startDate, today)) preventFocusChange = true;
        };

        onFocusChange = function onFocusChange(input) {
          if (!preventFocusChange) {
            focusedInput = input;
          } else {
            preventFocusChange = false;
          }
        };
      });
      it('calls onDayClick with a day that prevents a focus change', function () {
        var clickDate = (0, _moment["default"])(today);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChange,
          onFocusChange: onFocusChange,
          focusedInput: _constants.START_DATE
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(focusedInput).to.equal(_constants.START_DATE);
        wrapper.instance().onDayClick(clickDate.clone().add(1, 'days'));
        (0, _chai.expect)(focusedInput).to.equal(_constants.END_DATE);
      });
      it('calls onDayClick with a day that does not prevent a focus change', function () {
        var clickDate = (0, _moment["default"])(today).clone().add(2, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: onDatesChange,
          onFocusChange: onFocusChange,
          focusedInput: _constants.START_DATE
        }));
        wrapper.instance().onDayClick(clickDate);
        (0, _chai.expect)(focusedInput).to.equal(_constants.END_DATE);
      });
    });
  });
  describe('#onDayMouseEnter', function () {
    it('sets state.hoverDate to the day arg', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        focusedInput: _constants.START_DATE
      }));
      wrapper.instance().onDayMouseEnter(today);
      (0, _chai.expect)(wrapper.state().hoverDate).to.equal(today);
    });
    it('sets state.dateOffset to the start and end date range when range included', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        focusedInput: _constants.START_DATE,
        endDateOffset: function endDateOffset(day) {
          return day.add(2, 'days');
        }
      }));
      wrapper.instance().onDayMouseEnter(today);
      (0, _chai.expect)(wrapper.state().dateOffset.start.format()).to.equal(today.format());
      (0, _chai.expect)(wrapper.state().dateOffset.end.format()).to.equal(today.clone().add(3, 'days').format());
    });
    describe('modifiers', function () {
      it('calls addModifier', function () {
        var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.START_DATE,
          onDatesChange: _sinonSandbox["default"].stub(),
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
        var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.START_DATE,
          onDatesChange: _sinonSandbox["default"].stub(),
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
      describe('startDate and !endDate and focusedInput === `END_DATE`', function () {
        describe('old hoverDate is after startDate', function () {
          it('calls deleteModifierFromRange with startDate, old hoverDate and `hovered-span`', function () {
            var startDate = today;
            var hoverDate = today.clone().add(5, 'days');
            var dayAfterHoverDate = hoverDate.clone().add(1, 'day');

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              startDate: startDate,
              endDate: null,
              onDatesChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.END_DATE,
              onFocusChange: _sinonSandbox["default"].stub()
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            deleteModifierFromRangeSpy.resetHistory();
            wrapper.instance().onDayMouseEnter((0, _moment["default"])().add(10, 'days'));
            var hoverSpanCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-span');
            (0, _chai.expect)(hoverSpanCalls.length).to.equal(1);
            (0, _chai.expect)(hoverSpanCalls[0].args[1]).to.equal(startDate);
            (0, _chai.expect)((0, _isSameDay["default"])(hoverSpanCalls[0].args[2], dayAfterHoverDate)).to.equal(true);
          });
        });
        describe('new hoverDate is not blocked and is after startDate', function () {
          it('calls addModifierFromRange with startDate, new hoverDate, and `hovered-span`', function () {
            var startDate = today;
            var hoverDate = today.clone().add(5, 'days');
            var dayAfterHoverDate = hoverDate.clone().add(1, 'day');

            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              startDate: startDate,
              endDate: null,
              onDatesChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.END_DATE,
              onFocusChange: _sinonSandbox["default"].stub()
            }));
            wrapper.setState({
              hoverDate: null
            });
            addModifierToRangeSpy.resetHistory();
            wrapper.instance().onDayMouseEnter(hoverDate);
            var hoverSpanCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-span');
            (0, _chai.expect)(hoverSpanCalls.length).to.equal(1);
            (0, _chai.expect)(hoverSpanCalls[0].args[1]).to.equal(startDate);
            (0, _chai.expect)((0, _isSameDay["default"])(hoverSpanCalls[0].args[2], dayAfterHoverDate)).to.equal(true);
          });
        });
      });
      describe('!startDate and endDate and focusedInput === `START_DATE`', function () {
        describe('old hoverDate is before endDate', function () {
          it('calls deleteModifierFromRange', function () {
            var hoverDate = today;
            var endDate = today.clone().add(5, 'days');

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              startDate: null,
              endDate: endDate,
              onDatesChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              onFocusChange: _sinonSandbox["default"].stub()
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            deleteModifierFromRangeSpy.resetHistory();
            wrapper.instance().onDayMouseEnter((0, _moment["default"])().add(10, 'days'));
            (0, _chai.expect)(deleteModifierFromRangeSpy.callCount).to.equal(2);
            (0, _chai.expect)(deleteModifierFromRangeSpy.getCall(0).args[1]).to.equal(hoverDate);
            (0, _chai.expect)(deleteModifierFromRangeSpy.getCall(0).args[2]).to.equal(endDate);
            (0, _chai.expect)(deleteModifierFromRangeSpy.getCall(0).args[3]).to.equal('hovered-span');
            (0, _chai.expect)((0, _isSameDay["default"])(deleteModifierFromRangeSpy.getCall(1).args[1], endDate.subtract(_DayPickerRangeController["default"].defaultProps.minimumNights, 'days'))).to.equal(true);
            (0, _chai.expect)(deleteModifierFromRangeSpy.getCall(1).args[2]).to.equal(endDate);
            (0, _chai.expect)(deleteModifierFromRangeSpy.getCall(1).args[3]).to.equal('before-hovered-end');
          });
        });
        describe('new hoverDate is not blocked and is before endDate', function () {
          it('calls addModifierFromRange', function () {
            var hoverDate = today;
            var endDate = today.clone().add(5, 'days');

            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              startDate: null,
              endDate: endDate,
              onDatesChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              onFocusChange: _sinonSandbox["default"].stub()
            }));
            wrapper.setState({
              hoverDate: null
            });
            addModifierToRangeSpy.resetHistory();
            wrapper.instance().onDayMouseEnter(hoverDate);
            (0, _chai.expect)(addModifierToRangeSpy.callCount).to.equal(1);
            (0, _chai.expect)(addModifierToRangeSpy.getCall(0).args[1]).to.equal(hoverDate);
            (0, _chai.expect)(addModifierToRangeSpy.getCall(0).args[2]).to.equal(endDate);
            (0, _chai.expect)(addModifierToRangeSpy.getCall(0).args[3]).to.equal('hovered-span');
          });
        });
      });
      describe('after-hovered-start modifier', function () {
        describe('startDate does not exist', function () {
          it('does not remove old `after-hovered-start` range (cos it doesnt exist)', function () {
            var minimumNights = 5;

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              minimumNights: minimumNights
            }));
            deleteModifierFromRangeSpy.resetHistory();
            wrapper.instance().onDayMouseEnter(today);
            var afterHoverStartCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'after-hovered-start');
            (0, _chai.expect)(afterHoverStartCalls.length).to.equal(0);
          });
        });
        describe('startDate exists', function () {
          describe('hoverDate is startDate', function () {
            it('adds new `after-hovered-start` range', function () {
              var minimumNights = 5;
              var startDate = (0, _moment["default"])().add(7, 'days');
              var dayAfterStartDate = startDate.clone().add(1, 'day');
              var firstAvailableDate = startDate.clone().add(minimumNights + 1, 'days');

              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                onDatesChange: _sinonSandbox["default"].stub(),
                onFocusChange: _sinonSandbox["default"].stub(),
                startDate: startDate,
                focusedInput: _constants.START_DATE,
                minimumNights: minimumNights
              }));
              addModifierToRangeSpy.resetHistory();
              wrapper.instance().onDayMouseEnter(startDate);
              var afterHoverStartCalls = getCallsByModifier(addModifierToRangeSpy, 'after-hovered-start');
              (0, _chai.expect)(afterHoverStartCalls.length).to.equal(1);
              (0, _chai.expect)((0, _isSameDay["default"])(afterHoverStartCalls[0].args[1], dayAfterStartDate)).to.equal(true);
              (0, _chai.expect)((0, _isSameDay["default"])(afterHoverStartCalls[0].args[2], firstAvailableDate)).to.equal(true);
            });
          });
          describe('hoverDate is not startDate', function () {
            it('does not add new `after-hovered-start` range', function () {
              var minimumNights = 5;
              var startDate = (0, _moment["default"])().add(7, 'days');

              var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                onDatesChange: _sinonSandbox["default"].stub(),
                onFocusChange: _sinonSandbox["default"].stub(),
                startDate: startDate,
                focusedInput: _constants.START_DATE,
                minimumNights: minimumNights
              }));
              addModifierToRangeSpy.resetHistory();
              wrapper.instance().onDayMouseEnter(today);
              var afterHoverStartCalls = getCallsByModifier(addModifierToRangeSpy, 'after-hovered-start');
              (0, _chai.expect)(afterHoverStartCalls.length).to.equal(0);
            });
          });
        });
      });
      describe('hovered-start-first-possible-end modifier', function () {
        it('does not call deleteModifier with `hovered-start-first-possible-end` if there is no previous hoverDate', function () {
          var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

          var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            onDatesChange: _sinonSandbox["default"].stub(),
            onFocusChange: _sinonSandbox["default"].stub(),
            focusedInput: _constants.START_DATE,
            getMinNightsForHoverDate: getMinNightsForHoverDateStub
          }));
          wrapper.instance().onDayMouseEnter(today);
          var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
          (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
        });
        describe('focusedInput === START_DATE', function () {
          it('calls deleteModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate returns a positive integer', function () {
            var hoverDate = today.clone().subtract(1, 'days');

            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(1);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartFirstPossibleEndCalls[0].args[1], hoverDate.clone().add(2, 'days'))).to.equal(true);
          });
          it('does not call deleteModifier with `hovered-start-first-possible-end` if the previous hovered date is blocked', function () {
            var hoverDate = today.clone().subtract(1, 'days');

            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub,
              isDayBlocked: function isDayBlocked(day) {
                return (0, _isSameDay["default"])(day, hoverDate);
              }
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
          it('does not call deleteModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate does not return a positive integer', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today.clone().subtract(1, 'days')
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
          it('calls addModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate returns a positive integer', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(1);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartFirstPossibleEndCalls[0].args[1], today.clone().add(2, 'days'))).to.equal(true);
          });
          it('does not call addModifier with `hovered-start-first-possible-end` if the new hovered date is blocked', function () {
            var hoverDate = today.clone().subtract(1, 'days');

            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub,
              isDayBlocked: function isDayBlocked(day) {
                return (0, _isSameDay["default"])(day, today);
              }
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
          it('does not call addModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate does not return a positive integer', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
          it('does not call addModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate is not supplied as a prop', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE
            }));
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
        });
        describe('focusedInput === END_DATE', function () {
          it('does not call deleteModifier with `hovered-start-first-possible-end`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.END_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today.clone().subtract(1, 'days')
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
          it('does not call addModifier with `hovered-start-first-possible-end`', function () {
            var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.END_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(addModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
        });
      });
      describe('hovered-start-blocked-minimum-nights modifier', function () {
        it('does not call deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if there is no previous hoverDate', function () {
          var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

          var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            onDatesChange: _sinonSandbox["default"].stub(),
            onFocusChange: _sinonSandbox["default"].stub(),
            focusedInput: _constants.START_DATE,
            getMinNightsForHoverDate: getMinNightsForHoverDateStub
          }));
          wrapper.instance().onDayMouseEnter(today);
          var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
          (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
        });
        describe('focusedInput === START_DATE', function () {
          it('calls deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate returns a positive integer', function () {
            var hoverDate = today.clone().subtract(1, 'days');

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(1);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[1], hoverDate.clone().add(1, 'days'))).to.equal(true);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[2], hoverDate.clone().add(2, 'days'))).to.equal(true);
          });
          it('does not call deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if the previous hovered date is blocked', function () {
            var hoverDate = today.clone().subtract(1, 'days');

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub,
              isDayBlocked: function isDayBlocked(day) {
                return (0, _isSameDay["default"])(day, hoverDate);
              }
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
          it('does not call deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate does not return a positive integer', function () {
            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today.clone().subtract(1, 'days')
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
          it('calls addModifierToRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate returns a positive integer', function () {
            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(1);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[1], today.clone().add(1, 'days'))).to.equal(true);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[2], today.clone().add(2, 'days'))).to.equal(true);
          });
          it('does not call addModifier with `hovered-start-blocked-minimum-nights` if the new hovered date is blocked', function () {
            var hoverDate = today.clone().subtract(1, 'days');

            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub,
              isDayBlocked: function isDayBlocked(day) {
                return (0, _isSameDay["default"])(day, today);
              }
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
          it('does not call addModifier with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate does not return a positive integer', function () {
            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
          it('does not call addModifier with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate is not supplied as a prop', function () {
            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE
            }));
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
        });
        describe('focusedInput === END_DATE', function () {
          it('does not call deleteModifierFromRangeFromRange with `hovered-start-blocked-minimum-nights`', function () {
            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.END_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today.clone().subtract(1, 'days')
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
          it('does not call addModifier with `hovered-start-blocked-minimum-nights`', function () {
            var addModifierToRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.END_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(addModifierToRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
        });
      });
      describe('selected-start-in-hovered-span modifier', function () {
        describe('end date is falsey and focusedInput === `END_DATE`', function () {
          describe('day is start date or before start date', function () {
            it('calls deleteModifier with `selected-start-in-hovered-span` on start date', function () {
              var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

              var startDate = today;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.END_DATE,
                startDate: startDate
              }));
              var yesterday = today.clone().subtract(1, 'days');
              deleteModifierSpy.resetHistory();
              wrapper.instance().onDayMouseEnter(yesterday);
              var deleteModifierCalls = getCallsByModifier(deleteModifierSpy, 'selected-start-in-hovered-span');
              (0, _chai.expect)(deleteModifierCalls.length).to.equal(1);
              (0, _chai.expect)(deleteModifierCalls[0].args[1]).to.equal(startDate);
            });
          });
          describe('day is not blocked, and is after the start date', function () {
            it('calls addModifier with `selected-start-in-hovered-span` on start date', function () {
              var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

              var startDate = today;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.END_DATE,
                startDate: startDate
              }));
              var tomorrow = today.clone().add(1, 'days');
              addModifierSpy.resetHistory();
              wrapper.instance().onDayMouseEnter(tomorrow);
              var addModifierCalls = getCallsByModifier(addModifierSpy, 'selected-start-in-hovered-span');
              (0, _chai.expect)(addModifierCalls.length).to.equal(1);
              (0, _chai.expect)(addModifierCalls[0].args[1]).to.equal(startDate);
            });
          });
        });
      });
      describe('selected-end-in-hovered-span modifier', function () {
        describe('start date is falsey and focusedInput === `START_DATE`', function () {
          describe('day is end date or after start date', function () {
            it('calls deleteModifier with `selected-end-in-hovered-span` on end date', function () {
              var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

              var endDate = today;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.START_DATE,
                endDate: endDate
              }));
              var tomorrow = today.clone().add(1, 'days');
              deleteModifierSpy.resetHistory();
              wrapper.instance().onDayMouseEnter(tomorrow);
              var deleteModifierCalls = getCallsByModifier(deleteModifierSpy, 'selected-end-in-hovered-span');
              (0, _chai.expect)(deleteModifierCalls.length).to.equal(1);
              (0, _chai.expect)(deleteModifierCalls[0].args[1]).to.equal(endDate);
            });
          });
          describe('day is not blocked, and is before the end date', function () {
            it('calls addModifier with `selected-end-in-hovered-span`', function () {
              var addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');

              var endDate = today;
              var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
                focusedInput: _constants.START_DATE,
                endDate: endDate
              }));
              var yesterday = today.clone().subtract(1, 'days');
              addModifierSpy.resetHistory();
              wrapper.instance().onDayMouseEnter(yesterday);
              var addModifierCalls = getCallsByModifier(addModifierSpy, 'selected-end-in-hovered-span');
              (0, _chai.expect)(addModifierCalls.length).to.equal(1);
              (0, _chai.expect)(addModifierCalls[0].args[1]).to.equal(today);
            });
          });
        });
      });
      describe('before-hovered-end modifier', function () {
        describe('end date is truthy and focusedInput is truthy', function () {
          it('calls deleteModifierFromRange with `before-hovered-end` on minimum nights days before end date', function () {
            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var endDate = today;
            var minimumNights = 5;
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.START_DATE,
              minimumNights: minimumNights,
              endDate: endDate
            }));
            var minimumNightStartSpan = endDate.clone().subtract(minimumNights, 'days');
            deleteModifierFromRangeSpy.resetHistory();
            wrapper.instance().onDayMouseEnter(today);
            var deleteModifierFromRangeCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'before-hovered-end');
            (0, _chai.expect)(deleteModifierFromRangeCalls.length).to.equal(1);
            (0, _chai.expect)((0, _toISODateString["default"])(deleteModifierFromRangeCalls[0].args[1])).to.equal((0, _toISODateString["default"])(minimumNightStartSpan));
            (0, _chai.expect)(deleteModifierFromRangeCalls[0].args[2]).to.equal(endDate);
          });
        });
        describe('day is equal to end date', function () {
          it('calls addModifierToRange with `before-hovered-end`', function () {
            var addModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifierToRange');

            var endDate = today;
            var minimumNights = 5;
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.START_DATE,
              minimumNights: minimumNights,
              endDate: endDate
            }));
            var minimumNightStartSpan = endDate.clone().subtract(minimumNights, 'days');
            addModifierFromRangeSpy.resetHistory();
            wrapper.instance().onDayMouseEnter(today);
            var addModifierFromRangeCalls = getCallsByModifier(addModifierFromRangeSpy, 'before-hovered-end');
            (0, _chai.expect)(addModifierFromRangeCalls.length).to.equal(1);
            (0, _chai.expect)((0, _toISODateString["default"])(addModifierFromRangeCalls[0].args[1])).to.equal((0, _toISODateString["default"])(minimumNightStartSpan));
            (0, _chai.expect)(addModifierFromRangeCalls[0].args[2]).to.equal(endDate);
          });
        });
      });
    });
  });
  describe('#onDayMouseLeave', function () {
    it('sets state.hoverDate to null', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
      wrapper.setState({
        hoverDate: today
      });
      wrapper.instance().onDayMouseLeave(today);
      (0, _chai.expect)(wrapper.state().hoverDate).to.equal(null);
    });
    describe('modifiers', function () {
      it('calls deleteModifier with hoverDate and `hovered` modifier', function () {
        var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          onDatesChange: _sinonSandbox["default"].stub(),
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
      describe('startDate and !endDate and hoverDate is after startDate', function () {
        it('calls deleteModifierFromRange with startDate, hoverDate and `hovered-span`', function () {
          var startDate = today;
          var hoverDate = today.clone().add(5, 'days');
          var dayAfterHoverDate = hoverDate.clone().add(1, 'day');

          var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: startDate,
            endDate: null,
            onDatesChange: _sinonSandbox["default"].stub(),
            onFocusChange: _sinonSandbox["default"].stub()
          }));
          wrapper.setState({
            hoverDate: hoverDate
          });
          deleteModifierFromRangeSpy.resetHistory();
          wrapper.instance().onDayMouseLeave(today);
          var hoveredSpanCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-span');
          (0, _chai.expect)(hoveredSpanCalls.length).to.equal(1);
          (0, _chai.expect)(hoveredSpanCalls[0].args[1]).to.equal(startDate);
          (0, _chai.expect)((0, _isSameDay["default"])(hoveredSpanCalls[0].args[2], dayAfterHoverDate)).to.equal(true);
        });
      });
      describe('!startDate and endDate and hoverDate is before endDate', function () {
        it('calls deleteModifierFromRange with hoverDate, endDate, and `hovered-span`', function () {
          var hoverDate = today;
          var endDate = today.clone().add(5, 'days');

          var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: null,
            endDate: endDate,
            onDatesChange: _sinonSandbox["default"].stub(),
            onFocusChange: _sinonSandbox["default"].stub()
          }));
          wrapper.setState({
            hoverDate: hoverDate
          });
          deleteModifierFromRangeSpy.resetHistory();
          wrapper.instance().onDayMouseLeave(today);
          (0, _chai.expect)(deleteModifierFromRangeSpy.callCount).to.equal(1);
          (0, _chai.expect)(deleteModifierFromRangeSpy.getCall(0).args[1]).to.equal(hoverDate);
          (0, _chai.expect)(deleteModifierFromRangeSpy.getCall(0).args[2]).to.equal(endDate);
          (0, _chai.expect)(deleteModifierFromRangeSpy.getCall(0).args[3]).to.equal('hovered-span');
        });
      });
      describe('after-hovered-start modifier', function () {
        describe('startDate exists and is same as arg', function () {
          it('clears previous `after-hovered-start` range', function () {
            var minimumNights = 5;
            var startDate = (0, _moment["default"])().add(13, 'days');
            var dayAfterStartDate = startDate.clone().add(1, 'day');
            var firstAvailableDate = startDate.clone().add(minimumNights + 1, 'days');

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              startDate: startDate,
              minimumNights: minimumNights
            }));
            wrapper.setState({
              hoverDate: today
            });
            deleteModifierFromRangeSpy.resetHistory();
            wrapper.instance().onDayMouseLeave(startDate);
            var afterHoverStartCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'after-hovered-start');
            (0, _chai.expect)(afterHoverStartCalls.length).to.equal(1);
            (0, _chai.expect)((0, _isSameDay["default"])(afterHoverStartCalls[0].args[1], dayAfterStartDate)).to.equal(true);
            (0, _chai.expect)((0, _isSameDay["default"])(afterHoverStartCalls[0].args[2], firstAvailableDate)).to.equal(true);
          });
        });
        describe('startDate exists and is not the same as arg', function () {
          it('does not call deleteModifierFromRange with `after-hovered-start`', function () {
            var minimumNights = 5;
            var startDate = (0, _moment["default"])().add(13, 'days');

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              startDate: startDate,
              minimumNights: minimumNights
            }));
            wrapper.setState({
              hoverDate: today
            });
            deleteModifierFromRangeSpy.resetHistory();
            wrapper.instance().onDayMouseLeave(today);
            var afterHoverStartCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'after-hovered-start');
            (0, _chai.expect)(afterHoverStartCalls.length).to.equal(0);
          });
        });
        describe('startDate does not exist', function () {
          it('does not call deleteModifierFromRange with `after-hovered-start`', function () {
            var minimumNights = 5;

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              startDate: null,
              minimumNights: minimumNights
            }));
            wrapper.setState({
              hoverDate: today
            });
            deleteModifierFromRangeSpy.resetHistory();
            wrapper.instance().onDayMouseLeave(today);
            var afterHoverStartCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'after-hovered-start');
            (0, _chai.expect)(afterHoverStartCalls.length).to.equal(0);
          });
        });
      });
      describe('hovered-start-first-possible-end modifier', function () {
        describe('focusedInput === START_DATE', function () {
          it('calls deleteModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate returns a positive integer', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today
            });
            wrapper.instance().onDayMouseLeave(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(1);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartFirstPossibleEndCalls[0].args[1], today.clone().add(2, 'days'))).to.equal(true);
          });
          it('does not call deleteModifier with `hovered-start-first-possible-end` if the hovered date is blocked', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub,
              isDayBlocked: function isDayBlocked(day) {
                return (0, _isSameDay["default"])(day, today);
              }
            }));
            wrapper.setState({
              hoverDate: today
            });
            wrapper.instance().onDayMouseLeave(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
          it('does not call deleteModifier with `hovered-start-first-possible-end` if getMinNightsForHoverDate does not return a positive integer', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
        });
        describe('focusedInput === END_DATE', function () {
          it('does not call deleteModifier with `hovered-start-first-possible-end`', function () {
            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.END_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today.clone().subtract(1, 'days')
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartFirstPossibleEndCalls = getCallsByModifier(deleteModifierSpy, 'hovered-start-first-possible-end');
            (0, _chai.expect)(hoveredStartFirstPossibleEndCalls.length).to.equal(0);
          });
        });
      });
      describe('hovered-start-blocked-minimum-nights modifier', function () {
        describe('focusedInput === START_DATE', function () {
          it('calls deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate returns a positive integer', function () {
            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(1);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[1], today.clone().add(1, 'days'))).to.equal(true);
            (0, _chai.expect)((0, _isSameDay["default"])(hoveredStartBlockedMinNightsCalls[0].args[2], today.clone().add(2, 'days'))).to.equal(true);
          });
          it('does not call deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if the hovered date is blocked', function () {
            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub,
              isDayBlocked: function isDayBlocked(day) {
                return (0, _isSameDay["default"])(day, today);
              }
            }));
            wrapper.setState({
              hoverDate: today
            });
            wrapper.instance().onDayMouseLeave(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
          it('does not call deleteModifierFromRange with `hovered-start-blocked-minimum-nights` if getMinNightsForHoverDate does not return a positive integer', function () {
            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(0);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.START_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
        });
        describe('focusedInput === END_DATE', function () {
          it('does not call deleteModifierFromRangeFromRange with `hovered-start-blocked-minimum-nights`', function () {
            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var getMinNightsForHoverDateStub = _sinonSandbox["default"].stub().returns(2);

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub(),
              focusedInput: _constants.END_DATE,
              getMinNightsForHoverDate: getMinNightsForHoverDateStub
            }));
            wrapper.setState({
              hoverDate: today.clone().subtract(1, 'days')
            });
            wrapper.instance().onDayMouseEnter(today);
            var hoveredStartBlockedMinNightsCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'hovered-start-blocked-minimum-nights');
            (0, _chai.expect)(hoveredStartBlockedMinNightsCalls.length).to.equal(0);
          });
        });
      });
      describe('selected-start-in-hovered-span modifier', function () {
        describe('start date is truthy, end date is falsey and day is after start date', function () {
          it('calls deleteModifier with `selected-start-in-hovered-span` on start date', function () {
            var startDate = today;
            var dayAfterStartDate = startDate.clone().add(1, 'day');
            var hoverDate = today.clone().add(5, 'days');

            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              startDate: startDate,
              endDate: null,
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub()
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            deleteModifierSpy.resetHistory();
            wrapper.instance().onDayMouseLeave(dayAfterStartDate);
            var deleteModifierCalls = getCallsByModifier(deleteModifierSpy, 'selected-start-in-hovered-span');
            (0, _chai.expect)(deleteModifierCalls.length).to.equal(1);
            (0, _chai.expect)(deleteModifierCalls[0].args[1]).to.equal(startDate);
          });
        });
      });
      describe('selected-end-in-hovered-span modifier', function () {
        describe('end date is truthy, start date is falsey and day is before end date', function () {
          it('calls deleteModifier with `selected-end-in-hovered-span` on end date', function () {
            var endDate = today;
            var dayBeforeEndDate = endDate.clone().subtract(1, 'day');
            var hoverDate = today.clone().add(5, 'days');

            var deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              startDate: null,
              endDate: endDate,
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub()
            }));
            wrapper.setState({
              hoverDate: hoverDate
            });
            deleteModifierSpy.resetHistory();
            wrapper.instance().onDayMouseLeave(dayBeforeEndDate);
            var deleteModifierCalls = getCallsByModifier(deleteModifierSpy, 'selected-end-in-hovered-span');
            (0, _chai.expect)(deleteModifierCalls.length).to.equal(1);
            (0, _chai.expect)(deleteModifierCalls[0].args[1]).to.equal(endDate);
          });
        });
      });
      describe('before-hovered-end modifier', function () {
        describe('end date is truthy and day is end date', function () {
          it('calls deleteModifierFromRange with `before-hovered-end` on span of end date to end date minus minimum nights', function () {
            var endDate = today;
            var hoverDate = today.clone().subtract(5, 'days');

            var deleteModifierFromRangeSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifierFromRange');

            var minimumNights = 5;
            var minimumNightStartSpan = endDate.clone().subtract(minimumNights, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              startDate: null,
              minimumNights: minimumNights,
              endDate: endDate,
              onDatesChange: _sinonSandbox["default"].stub(),
              onFocusChange: _sinonSandbox["default"].stub()
            }));
            deleteModifierFromRangeSpy.resetHistory();
            wrapper.setState({
              hoverDate: hoverDate
            });
            wrapper.instance().onDayMouseLeave(endDate);
            var deleteModifierFromRangeCalls = getCallsByModifier(deleteModifierFromRangeSpy, 'before-hovered-end');
            (0, _chai.expect)(deleteModifierFromRangeCalls.length).to.equal(1);
            (0, _chai.expect)((0, _toISODateString["default"])(deleteModifierFromRangeCalls[0].args[1])).to.equal((0, _toISODateString["default"])(minimumNightStartSpan));
            (0, _chai.expect)(deleteModifierFromRangeCalls[0].args[2]).to.equal(endDate);
          });
        });
      });
    });
  });
  describe('#onPrevMonthClick', function () {
    it('updates state.currentMonth to subtract 1 month', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
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
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths
      }));
      wrapper.setState({
        currentMonth: today
      });
      var newMonth = (0, _moment["default"])().subtract(1, 'month');
      wrapper.instance().onPrevMonthClick();
      var visibleDays = Object.keys(wrapper.state().visibleDays);
      (0, _chai.expect)(visibleDays).to.include((0, _toISOMonthString4["default"])(newMonth));
    });
    it('new visibleDays does not have current last month', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      var visibleDays = Object.keys(wrapper.state().visibleDays);
      (0, _chai.expect)(visibleDays).to.not.include((0, _toISOMonthString4["default"])((0, _moment["default"])().add(numberOfMonths, 'months')));
    });
    it('calls this.getModifiers', function () {
      var getModifiersSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'getModifiers');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      getModifiersSpy.resetHistory();
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(getModifiersSpy.callCount).to.equal(1);
    });
    it('calls props.onPrevMonthClick with new month', function () {
      var onPrevMonthClickStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
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
      var shouldDisableMonthNavigationSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'shouldDisableMonthNavigation');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      shouldDisableMonthNavigationSpy.resetHistory();
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(shouldDisableMonthNavigationSpy.callCount).to.equal(2);
    });
    it('sets disablePrev and disablePrev as false on onPrevMonthClick call withouth maxDate and minDate set', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(wrapper.state().disablePrev).to.equal(false);
      (0, _chai.expect)(wrapper.state().disableNext).to.equal(false);
    });
    it('sets disableNext as true when maxDate is in visible month', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths,
        maxDate: today
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(wrapper.state().disableNext).to.equal(true);
      (0, _chai.expect)(wrapper.state().disablePrev).to.equal(false);
    });
    it('sets disablePrev as true when minDate is in visible month', function () {
      var numberOfMonths = 2;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths,
        minDate: today.clone().subtract(1, 'month')
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(wrapper.state().disableNext).to.equal(false);
      (0, _chai.expect)(wrapper.state().disablePrev).to.equal(true);
    });
  });
  describe('#onNextMonthClick', function () {
    it('updates state.currentMonth to add 1 month', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
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
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: numberOfMonths
      }));
      wrapper.setState({
        currentMonth: today
      });
      var newMonth = (0, _moment["default"])().add(numberOfMonths + 1, 'months');
      wrapper.instance().onNextMonthClick();
      var visibleDays = Object.keys(wrapper.state().visibleDays);
      (0, _chai.expect)(visibleDays).to.include((0, _toISOMonthString4["default"])(newMonth));
    });
    it('new visibleDays does not have current month - 1', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        numberOfMonths: 2
      }));
      wrapper.setState({
        currentMonth: today
      });
      wrapper.instance().onNextMonthClick();
      var visibleDays = Object.keys(wrapper.state().visibleDays);
      (0, _chai.expect)(visibleDays).to.not.include((0, _toISOMonthString4["default"])(today.clone().subtract(1, 'month')));
    });
    it('calls this.getModifiers', function () {
      var getModifiersSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'getModifiers');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      getModifiersSpy.resetHistory();
      wrapper.instance().onNextMonthClick();
      (0, _chai.expect)(getModifiersSpy.callCount).to.equal(1);
    });
    it('calls props.onNextMonthClick with new month', function () {
      var onNextMonthClickStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
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
    describe('focusedInput === START_DATE', function () {
      it('returns startDate if exists and is not blocked', function () {
        _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(false);

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.START_DATE,
          startDate: today,
          onFocusChange: _sinonSandbox["default"].stub(),
          onDatesChange: _sinonSandbox["default"].stub()
        }));
        var firstFocusableDay = wrapper.instance().getFirstFocusableDay((0, _moment["default"])().subtract(10, 'days'));
        (0, _chai.expect)(firstFocusableDay.isSame(today, 'day')).to.equal(true);
      });
      it('returns first day of arg month if startDate is falsy', function () {
        _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(false);

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.START_DATE,
          startDate: null,
          onFocusChange: _sinonSandbox["default"].stub(),
          onDatesChange: _sinonSandbox["default"].stub()
        }));
        var startOfMonth = today.clone().startOf('month');
        var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        (0, _chai.expect)(firstFocusableDay.isSame(startOfMonth, 'day')).to.equal(true);
      });
    });
    describe('focusedInput === END_DATE', function () {
      it('returns endDate if exists and is not blocked and startDate is falsy', function () {
        _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(false);

        var endDate = (0, _moment["default"])().add(10, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.END_DATE,
          startDate: null,
          endDate: endDate,
          onFocusChange: _sinonSandbox["default"].stub(),
          onDatesChange: _sinonSandbox["default"].stub()
        }));
        var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        (0, _chai.expect)(firstFocusableDay.isSame(endDate, 'day')).to.equal(true);
      });
      it('returns startDate + minimumNights if startDate is truthy and endDate is not', function () {
        _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(false);

        var startDate = (0, _moment["default"])().add(10, 'days');
        var minimumNights = 5;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.END_DATE,
          startDate: startDate,
          minimumNights: minimumNights,
          onFocusChange: _sinonSandbox["default"].stub(),
          onDatesChange: _sinonSandbox["default"].stub()
        }));
        var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        (0, _chai.expect)(firstFocusableDay.isSame(startDate.clone().add(minimumNights, 'days'), 'day')).to.equal(true);
      });
      it('returns first day of arg month if startDate and endDate are falsy', function () {
        _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(false);

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.END_DATE,
          startDate: null,
          minimumNights: null,
          onFocusChange: _sinonSandbox["default"].stub(),
          onDatesChange: _sinonSandbox["default"].stub()
        }));
        var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        (0, _chai.expect)(firstFocusableDay.isSame(today.clone().startOf('month'), 'day')).to.equal(true);
      });
    });
    it('time is a noon', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(false);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        focusedInput: null,
        startDate: null,
        endDate: null,
        onFocusChange: _sinonSandbox["default"].stub(),
        onDatesChange: _sinonSandbox["default"].stub()
      }));
      var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
      (0, _chai.expect)(firstFocusableDay.hours()).to.equal(12);
    });
    describe('desired day is blocked', function () {
      it('returns next unblocked visible day after desired day if exists', function () {
        var isBlockedStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked');

        var startDate = (0, _moment["default"])().endOf('month').subtract(10, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.END_DATE,
          startDate: startDate,
          numberOfMonths: 1,
          onFocusChange: _sinonSandbox["default"].stub(),
          onDatesChange: _sinonSandbox["default"].stub()
        }));
        isBlockedStub.resetHistory();
        isBlockedStub.returns(true).onCall(8).returns(false);
        var firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        (0, _chai.expect)(firstFocusableDay.isSame(startDate.clone().add(9, 'days'), 'day')).to.equal(true);
      });
    });
  });
  describe('#getModifiers', function () {
    it('return object has the same number of days as input', function () {
      var monthISO = (0, _toISOMonthString4["default"])(today);
      var visibleDays = (0, _defineProperty2["default"])({}, monthISO, [today, (0, _moment["default"])().add(1, 'day'), (0, _moment["default"])().add(2, 'days')]);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiers(visibleDays);
      (0, _chai.expect)(Object.keys(modifiers[monthISO]).length).to.equal(visibleDays[monthISO].length);
    });
    it('calls this.getModifiersForDay for each day in input', function () {
      var getModifiersForDaySpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'getModifiersForDay');

      var monthISO = (0, _toISOMonthString4["default"])(today);
      var visibleDays = (0, _defineProperty2["default"])({}, monthISO, [today, (0, _moment["default"])().add(1, 'day'), (0, _moment["default"])().add(2, 'days')]);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      getModifiersForDaySpy.resetHistory();
      wrapper.instance().getModifiers(visibleDays);
      (0, _chai.expect)(getModifiersForDaySpy.callCount).to.equal(visibleDays[monthISO].length);
    });
  });
  describe('#getModifiersForDay', function () {
    it('only contains `valid` if all modifier methods return false', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isToday').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(false);

      var isDayBlockedStub = _sinonSandbox["default"].stub().returns(false);

      var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(false);

      var isDayHighlightedStub = _sinonSandbox["default"].stub().returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isStartDate').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isEndDate').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'doesNotMeetMinimumNights').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isInSelectedSpan').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isLastInRange').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isHovered').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isInHoveredSpan').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isDayAfterHoveredStartDate').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isFirstDayOfWeek').returns(false);

      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isLastDayOfWeek').returns(false);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
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
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isToday').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('today')).to.equal(true);
    });
    it('contains `blocked` if this.isBlocked returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('blocked')).to.equal(true);
    });
    it('contains `blocked-calendar` if props.isDayBlocked returns true', function () {
      var isDayBlockedStub = _sinonSandbox["default"].stub().returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        isDayBlocked: isDayBlockedStub
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('blocked-calendar')).to.equal(true);
    });
    it('contains `blocked-out-of-range` if props.isOutsideRange returns true', function () {
      var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        isOutsideRange: isOutsideRangeStub
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('blocked-out-of-range')).to.equal(true);
    });
    it('contains `highlighted-calendar` if props.isDayHighlighted returns true', function () {
      var isDayHighlightedStub = _sinonSandbox["default"].stub().returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        isDayHighlighted: isDayHighlightedStub
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('highlighted-calendar')).to.equal(true);
    });
    it('contains `valid` if this.isBlocked returns false', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isBlocked').returns(false);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('valid')).to.equal(true);
    });
    it('contains `selected-start` if this.isStartDate returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isStartDate').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('selected-start')).to.equal(true);
    });
    it('contains `selected-end` if this.isEndDate returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isEndDate').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('selected-end')).to.equal(true);
    });
    it('contains `blocked-minimum-nights` if this.doesNotMeetMinimumNights returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'doesNotMeetMinimumNights').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('blocked-minimum-nights')).to.equal(true);
    });
    it('contains `selected-span` if this.isInSelectedSpan returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isInSelectedSpan').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('selected-span')).to.equal(true);
    });
    it('contains `last-in-range` if this.isLastInRange returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isLastInRange').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('last-in-range')).to.equal(true);
    });
    it('contains `hovered` if this.isHovered returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isHovered').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('hovered')).to.equal(true);
    });
    it('contains `hovered-span` if this.isInHoveredSpan returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isInHoveredSpan').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('hovered-span')).to.equal(true);
    });
    it('contains `after-hovered-start` if this.isDayAfterHoveredStartDate returns true', function () {
      _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isDayAfterHoveredStartDate').returns(true);

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().getModifiersForDay((0, _moment["default"])());
      (0, _chai.expect)(modifiers.has('after-hovered-start')).to.equal(true);
    });
  });
  describe('#addModifier', function () {
    it('returns first arg if no day given', function () {
      var updatedDays = {
        foo: 'bar'
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier(updatedDays);
      (0, _chai.expect)(modifiers).to.equal(updatedDays);
    });
    it('returns first arg if day is not visible', function () {
      var updatedDays = {
        foo: 'bar'
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));

      _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

      var modifiers = wrapper.instance().addModifier(updatedDays, (0, _moment["default"])());
      (0, _chai.expect)(modifiers).to.equal(updatedDays);
    });
    it('has day args month ISO as key', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier({}, today);
      (0, _chai.expect)(Object.keys(modifiers)).to.contain((0, _toISOMonthString4["default"])(today));
    });
    it('is resilient when visibleDays is an empty object', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().setState({
        visibleDays: {}
      });
      var modifiers = wrapper.instance().addModifier({}, today);
      (0, _chai.expect)(Object.keys(modifiers[(0, _toISOMonthString4["default"])(today)])).to.contain((0, _toISODateString["default"])(today));
    });
    it('has day ISO as key one layer down', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier({}, today);
      (0, _chai.expect)(Object.keys(modifiers[(0, _toISOMonthString4["default"])(today)])).to.contain((0, _toISODateString["default"])(today));
    });
    it('return value now has modifier arg for day if was in first arg', function () {
      var modifierToAdd = 'foo';
      var monthISO = (0, _toISOMonthString4["default"])(today);
      var todayISO = (0, _toISODateString["default"])(today);
      var updatedDays = (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, todayISO, new Set(['bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier(updatedDays, today, modifierToAdd);
      (0, _chai.expect)(Array.from(modifiers[monthISO][todayISO])).to.contain(modifierToAdd);
    });
    it('return value now has modifier arg for day if was in state', function () {
      var modifierToAdd = 'foo';
      var monthISO = (0, _toISOMonthString4["default"])(today);
      var todayISO = (0, _toISODateString["default"])(today);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
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
      var nextMonthISO = (0, _toISOMonthString4["default"])(nextMonth);
      var nextMonthDayISO = (0, _toISODateString["default"])(nextMonth);
      var updatedDays = (0, _defineProperty2["default"])({}, nextMonthISO, (0, _defineProperty2["default"])({}, nextMonthDayISO, new Set(['bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
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
  });
  it('return value now has modifier arg for day after getting next scrollable months', function () {
    var modifierToAdd = 'foo';
    var futureDateAfterMultiply = today.clone().add(4, 'months');
    var monthISO = (0, _toISOMonthString4["default"])(futureDateAfterMultiply);
    var todayISO = (0, _toISODateString["default"])(futureDateAfterMultiply);
    var updatedDays = (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, todayISO, new Set(['bar', 'baz'])));
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
      onDatesChange: _sinonSandbox["default"].stub(),
      onFocusChange: _sinonSandbox["default"].stub(),
      orientation: _constants.VERTICAL_SCROLLABLE,
      numberOfMonths: 3
    })).instance();
    var modifiers = wrapper.addModifier(updatedDays, futureDateAfterMultiply, modifierToAdd);
    (0, _chai.expect)(Array.from(modifiers[monthISO][todayISO])).to.not.contain(modifierToAdd);
    wrapper.onGetNextScrollableMonths();
    modifiers = wrapper.addModifier(updatedDays, futureDateAfterMultiply, modifierToAdd);
    (0, _chai.expect)(Array.from(modifiers[monthISO][todayISO])).to.contain(modifierToAdd);
  });
  it('return value now has modifier arg for day after getting previous scrollable months', function () {
    var modifierToAdd = 'foo';
    var pastDateAfterMultiply = today.clone().subtract(3, 'months');
    var monthISO = (0, _toISOMonthString4["default"])(pastDateAfterMultiply);
    var dayISO = (0, _toISODateString["default"])(pastDateAfterMultiply);
    var updatedDays = (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, dayISO, new Set(['bar', 'baz'])));
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
      onDatesChange: _sinonSandbox["default"].stub(),
      onFocusChange: _sinonSandbox["default"].stub(),
      orientation: _constants.VERTICAL_SCROLLABLE,
      numberOfMonths: 3
    })).instance();
    var modifiers = wrapper.addModifier(updatedDays, pastDateAfterMultiply, modifierToAdd);
    (0, _chai.expect)(Array.from(modifiers[monthISO][dayISO])).to.not.contain(modifierToAdd);
    wrapper.onGetPrevScrollableMonths();
    modifiers = wrapper.addModifier(updatedDays, pastDateAfterMultiply, modifierToAdd);
    (0, _chai.expect)(Array.from(modifiers[monthISO][dayISO])).to.contain(modifierToAdd);
  });
  describe('#addModifierToRange', function () {
    var addModifierSpy;
    beforeEach(function () {
      addModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'addModifier');
    });
    it('calls addModifier for each day between the span start and the span end', function () {
      var numOfDays = 10;
      var spanStart = (0, _moment["default"])();
      var spanEnd = (0, _moment["default"])().add(numOfDays, 'days');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().addModifierToRange({}, spanStart, spanEnd);
      (0, _chai.expect)(addModifierSpy.callCount).to.equal(numOfDays);
    });
    it('calls addModifier with modifier arg as modifier', function () {
      var modifier = 'foo-bar-baz';
      var spanStart = (0, _moment["default"])();
      var spanEnd = (0, _moment["default"])().add(10, 'days');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().addModifierToRange({}, spanStart, spanEnd, modifier);
      (0, _chai.expect)(addModifierSpy.callCount).to.not.equal(0);

      for (var i = 0; i < addModifierSpy.callCount; i += 1) {
        (0, _chai.expect)(addModifierSpy.getCall(i).args[2]).to.equal(modifier);
      }
    });
    it('does not call addModifier if span end is after span start', function () {
      var spanStart = (0, _moment["default"])();
      var spanEnd = (0, _moment["default"])().subtract(10, 'days');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().addModifierToRange({}, spanStart, spanEnd);
      (0, _chai.expect)(addModifierSpy.callCount).to.equal(0);
    });
  });
  describe('#deleteModifier', function () {
    it('returns first arg if no day given', function () {
      var updatedDays = {
        foo: 'bar'
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().deleteModifier(updatedDays);
      (0, _chai.expect)(modifiers).to.equal(updatedDays);
    });
    it('returns first arg if day is not visible', function () {
      var updatedDays = {
        foo: 'bar'
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));

      _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

      var modifiers = wrapper.instance().deleteModifier(updatedDays, (0, _moment["default"])());
      (0, _chai.expect)(modifiers).to.equal(updatedDays);
    });
    it('has day args month ISO as key', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var isoMonth = (0, _toISOMonthString4["default"])(today);
      var isoDate = (0, _toISODateString["default"])(today);
      var modifiers = wrapper.instance().deleteModifier((0, _defineProperty2["default"])({}, isoMonth, (0, _defineProperty2["default"])({}, isoDate, new Set(['foo']))), today, 'foo');
      (0, _chai.expect)(Object.keys(modifiers)).to.contain(isoMonth);
      (0, _chai.expect)(modifiers[isoMonth][isoDate].size).to.equal(0);
    });
    it('has day ISO as key one layer down', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().addModifier({}, today);
      (0, _chai.expect)(Object.keys(modifiers[(0, _toISOMonthString4["default"])(today)])).to.contain((0, _toISODateString["default"])(today));
    });
    it('is resilient when visibleDays is an empty object', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
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
      var monthISO = (0, _toISOMonthString4["default"])(today);
      var todayISO = (0, _toISODateString["default"])(today);
      var updatedDays = (0, _defineProperty2["default"])({}, monthISO, (0, _defineProperty2["default"])({}, todayISO, new Set([modifierToDelete, 'bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      var modifiers = wrapper.instance().deleteModifier(updatedDays, today, modifierToDelete);
      (0, _chai.expect)(Array.from(modifiers[monthISO][todayISO])).to.not.contain(modifierToDelete);
    });
    it('return value no longer has modifier arg for day if was in state', function () {
      var modifierToDelete = 'foo';
      var monthISO = (0, _toISOMonthString4["default"])(today);
      var todayISO = (0, _toISODateString["default"])(today);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
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
      var nextMonthISO = (0, _toISOMonthString4["default"])(nextMonth);
      var nextMonthDayISO = (0, _toISODateString["default"])(nextMonth);
      var updatedDays = (0, _defineProperty2["default"])({}, nextMonthISO, (0, _defineProperty2["default"])({}, nextMonthDayISO, new Set(['foo', 'bar', 'baz'])));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
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
  describe('#deleteModifierFromRange', function () {
    var deleteModifierSpy;
    beforeEach(function () {
      deleteModifierSpy = _sinonSandbox["default"].spy(_DayPickerRangeController["default"].prototype, 'deleteModifier');
    });
    it('calls deleteModifier for each day between the span start and the span end', function () {
      var numOfDays = 10;
      var spanStart = (0, _moment["default"])();
      var spanEnd = (0, _moment["default"])().add(numOfDays, 'days');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().deleteModifierFromRange({}, spanStart, spanEnd);
      (0, _chai.expect)(deleteModifierSpy.callCount).to.equal(numOfDays);
    });
    it('calls deleteModifier with modifier arg as modifier', function () {
      var modifier = 'foo-bar-baz';
      var spanStart = (0, _moment["default"])();
      var spanEnd = (0, _moment["default"])().add(10, 'days');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().deleteModifierFromRange({}, spanStart, spanEnd, modifier);
      (0, _chai.expect)(deleteModifierSpy.callCount).to.not.equal(0);

      for (var i = 0; i < deleteModifierSpy.callCount; i += 1) {
        (0, _chai.expect)(deleteModifierSpy.getCall(i).args[2]).to.equal(modifier);
      }
    });
    it('does not call deleteModifier if span end is after span start', function () {
      var spanStart = (0, _moment["default"])();
      var spanEnd = (0, _moment["default"])().subtract(10, 'days');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }));
      wrapper.instance().deleteModifierFromRange({}, spanStart, spanEnd);
      (0, _chai.expect)(deleteModifierSpy.callCount).to.equal(0);
    });
  });
  describe('day modifier methods', function () {
    describe('#doesNotMeetMinimumNights', function () {
      var MIN_NIGHTS = 3;
      describe('state.startDate !== null', function () {
        var startDate = (0, _moment["default"])(today).add(3, 'days'); // rand day not equal to today

        describe('props.focusedInput === END_DATE', function () {
          it('returns true if arg is < props.minimumNights after props.startDate', function () {
            var testDate = (0, _moment["default"])(startDate).add(MIN_NIGHTS - 1, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.END_DATE,
              startDate: startDate,
              minimumNights: MIN_NIGHTS
            }));
            (0, _chai.expect)(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(true);
          });
          it('returns false if arg is > props.minimumNights after props.startDate', function () {
            var testDate = (0, _moment["default"])(startDate).add(MIN_NIGHTS + 1, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.END_DATE,
              startDate: startDate,
              minimumNights: MIN_NIGHTS
            }));
            (0, _chai.expect)(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
          it('handles time differences of less than 1 full day properly', function () {
            var partialDate = (0, _moment["default"])(startDate).add(5, 'minutes');
            var testDate = (0, _moment["default"])(startDate).add(MIN_NIGHTS, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.END_DATE,
              startDate: partialDate,
              minimumNights: MIN_NIGHTS
            }));
            (0, _chai.expect)(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });
        describe('props.focusedInput !== END_DATE', function () {
          it('returns false', function () {
            var testDate = (0, _moment["default"])(startDate).add(MIN_NIGHTS - 1, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.START_DATE,
              startDate: startDate,
              minimumNights: MIN_NIGHTS
            }));
            (0, _chai.expect)(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });
      });
      describe('props.startDate === null', function () {
        describe('props.focusedInput === END_DATE', function () {
          it('returns true if arg - props.minimumNights is outside allowed range', function () {
            var isOutsideRange = function isOutsideRange(day) {
              return !(0, _isInclusivelyAfterDay["default"])(day, today);
            };

            var testDate = (0, _moment["default"])(today).add(MIN_NIGHTS - 1, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.END_DATE,
              startDate: null,
              minimumNights: MIN_NIGHTS,
              isOutsideRange: isOutsideRange
            }));
            (0, _chai.expect)(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(true);
          });
          it('returns false if arg - props.minimumNights is inside allowed range', function () {
            var isOutsideRange = function isOutsideRange(day) {
              return !(0, _isInclusivelyAfterDay["default"])(day, today);
            };

            var testDate = (0, _moment["default"])(today).add(MIN_NIGHTS, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.END_DATE,
              startDate: null,
              minimumNights: MIN_NIGHTS,
              isOutsideRange: isOutsideRange
            }));
            (0, _chai.expect)(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });
        describe('state.focusedInput !== END_DATE', function () {
          it('returns false', function () {
            var testDate = (0, _moment["default"])(today).add(MIN_NIGHTS - 1, 'days');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
              focusedInput: _constants.START_DATE,
              startDate: null,
              minimumNights: MIN_NIGHTS
            }));
            (0, _chai.expect)(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });
      });
    });
    describe('#isDayAfterHoveredStartDate', function () {
      it('returns true if arg startDate is hovered and arg is the day after the startDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today
        }));
        wrapper.setState({
          hoverDate: today
        });
        var testDate = (0, _moment["default"])(today).add(1, 'days');
        (0, _chai.expect)(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(true);
      });
      it('returns false if props.startDate is falsy', function () {
        var testDate = (0, _moment["default"])(today).add(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: null
        }));
        wrapper.setState({
          hoverDate: today
        });
        (0, _chai.expect)(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });
      it('returns false if props.endDate is truthy', function () {
        var testDate = (0, _moment["default"])(today).add(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today,
          endDate: (0, _moment["default"])(today).add(3, 'days')
        }));
        wrapper.setState({
          hoverDate: today
        });
        (0, _chai.expect)(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });
      it('returns false if arg is not day after state.hoverDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today
        }));
        wrapper.setState({
          hoverDate: today
        });
        var testDate = (0, _moment["default"])(today).add(2, 'days');
        (0, _chai.expect)(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });
      it('returns false if state.hoverDate is not the same as props.startDate', function () {
        var testDate = (0, _moment["default"])(today).add(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today
        }));
        wrapper.setState({
          hoverDate: testDate
        });
        (0, _chai.expect)(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });
      it('returns false if arg is day after state.hoverDate and props.minimumNights is 0', function () {
        var testDate = (0, _moment["default"])(today).add(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today,
          minimumNights: 0
        }));
        wrapper.setState({
          hoverDate: today
        });
        (0, _chai.expect)(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });
    });
    describe('#isEndDate', function () {
      it('returns true if arg === props.endDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: today
        }));
        (0, _chai.expect)(wrapper.instance().isEndDate(today)).to.equal(true);
      });
      it('returns false if arg !== props.endDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: (0, _moment["default"])(today).add(1, 'days')
        }));
        (0, _chai.expect)(wrapper.instance().isEndDate(today)).to.equal(false);
      });
    });
    describe('#isHovered', function () {
      it('returns false if focusedInput is falsy', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: null
        }));
        wrapper.setState({
          hoverDate: today
        });
        (0, _chai.expect)(wrapper.instance().isHovered(today)).to.equal(false);
      });
      it('returns true if arg === state.hoverDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.START_DATE
        }));
        wrapper.setState({
          hoverDate: today
        });
        (0, _chai.expect)(wrapper.instance().isHovered(today)).to.equal(true);
      });
      it('returns false if arg !== state.hoverDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          focusedInput: _constants.START_DATE
        }));
        wrapper.setState({
          hoverDate: (0, _moment["default"])(today).add(1, 'days')
        });
        (0, _chai.expect)(wrapper.instance().isHovered(today)).to.equal(false);
      });
    });
    describe('#isInHoveredSpan', function () {
      describe('props.endDate === null', function () {
        it('returns true if arg is in between props.startDate and state.hoverDate', function () {
          var HOVER_DATE_DIFF = 5;
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: today,
            endDate: null
          }));
          wrapper.setState({
            hoverDate: (0, _moment["default"])(today).add(HOVER_DATE_DIFF, 'days')
          });
          var testDate = (0, _moment["default"])(today).add(HOVER_DATE_DIFF - 1, 'days');
          (0, _chai.expect)(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });
        it('returns true if arg is equal to state.hoverDate', function () {
          var testDate = (0, _moment["default"])(today).add(3, 'days');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: today,
            endDate: null
          }));
          wrapper.setState({
            hoverDate: testDate
          });
          (0, _chai.expect)(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });
        it('returns false if arg is < props.startDate', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: today,
            endDate: null
          }));
          wrapper.setState({
            hoverDate: (0, _moment["default"])(today).add(3, 'days')
          });
          var testDate = (0, _moment["default"])(today).subtract(1, 'days');
          (0, _chai.expect)(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });
        it('returns false if arg is > state.hoverDate', function () {
          var hoverDate = (0, _moment["default"])(today).add(3, 'days');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: today,
            endDate: null
          }));
          wrapper.setState({
            hoverDate: hoverDate
          });
          var testDate = (0, _moment["default"])(hoverDate).add(1, 'days');
          (0, _chai.expect)(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });
      });
      describe('props.startDate === null', function () {
        it('returns true if arg is in between state.hoverDate and props.endDate', function () {
          var endDate = (0, _moment["default"])(today).add(5, 'days');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: null,
            endDate: (0, _moment["default"])(today).add(5, 'days')
          }));
          wrapper.setState({
            hoverDate: today
          });
          var testDate = (0, _moment["default"])(endDate).subtract(1, 'days');
          (0, _chai.expect)(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });
        it('returns true if arg is equal to state.hoverDate', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: null,
            endDate: (0, _moment["default"])(today).add(5, 'days')
          }));
          wrapper.setState({
            hoverDate: today
          });
          (0, _chai.expect)(wrapper.instance().isInHoveredSpan(today)).to.equal(true);
        });
        it('returns false if arg is < state.hoverDate', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: null,
            endDate: (0, _moment["default"])(today).add(5, 'days')
          }));
          wrapper.setState({
            hoverDate: today
          });
          var testDate = (0, _moment["default"])(today).subtract(1, 'days');
          (0, _chai.expect)(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });
        it('returns false if arg is > props.endDate', function () {
          var endDate = (0, _moment["default"])(today).add(5, 'days');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
            startDate: null,
            endDate: endDate
          }));
          wrapper.setState({
            hoverDate: today
          });
          var testDate = (0, _moment["default"])(endDate).add(1, 'days');
          (0, _chai.expect)(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });
      });
    });
    describe('#isInSelectedSpan', function () {
      it('returns true if props.startDate < arg < props.endDate', function () {
        var endDate = (0, _moment["default"])(today).add(5, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today,
          endDate: endDate
        }));
        var testDate = (0, _moment["default"])(endDate).subtract(1, 'days');
        (0, _chai.expect)(wrapper.instance().isInSelectedSpan(testDate)).to.equal(true);
      });
      it('returns false if arg = props.startDate && arg < 12', function () {
        var endDate = (0, _moment["default"])(today).add(5, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today,
          endDate: endDate
        }));
        var testDate = (0, _moment["default"])(today.hours(10));
        (0, _chai.expect)(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });
      it('returns false if arg = props.startDate && arg > 12', function () {
        var endDate = (0, _moment["default"])(today).add(5, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today,
          endDate: endDate
        }));
        var testDate = (0, _moment["default"])(today.hours(16));
        (0, _chai.expect)(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });
      it('returns false if arg < props.startDate', function () {
        var endDate = (0, _moment["default"])(today).add(5, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today,
          endDate: endDate
        }));
        var testDate = (0, _moment["default"])(today).subtract(1, 'days');
        (0, _chai.expect)(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });
      it('returns false if arg > props.endDate', function () {
        var endDate = (0, _moment["default"])(today).add(5, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today,
          endDate: endDate
        }));
        var testDate = (0, _moment["default"])(endDate).add(1, 'days');
        (0, _chai.expect)(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });
      it('returns false if props.startDate === null', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: null,
          endDate: (0, _moment["default"])(today).add(5, 'days')
        }));
        (0, _chai.expect)(wrapper.instance().isInSelectedSpan(today)).to.equal(false);
      });
      it('returns false if props.endDate === null', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today,
          endDate: null
        }));
        var testDate = (0, _moment["default"])(today).add(1, 'days');
        (0, _chai.expect)(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });
    });
    describe('#isLastInRange', function () {
      var isInSelectedSpanStub;
      beforeEach(function () {
        isInSelectedSpanStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'isInSelectedSpan');
      });
      it('returns true if arg is day before props.endDate and is in the selected span', function () {
        isInSelectedSpanStub.returns(true);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: (0, _moment["default"])(today).add(1, 'days')
        }));
        (0, _chai.expect)(wrapper.instance().isLastInRange(today)).to.equal(true);
      });
      it('returns false if arg is not in the selected span', function () {
        isInSelectedSpanStub.returns(false);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: (0, _moment["default"])(today).add(1, 'days')
        }));
        (0, _chai.expect)(wrapper.instance().isLastInRange(today)).to.equal(false);
      });
      it('returns false if arg is not the day before props.endDate', function () {
        isInSelectedSpanStub.returns(true);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: (0, _moment["default"])(today).add(2, 'days')
        }));
        (0, _chai.expect)(wrapper.instance().isLastInRange(today)).to.equal(false);
      });
    });
    describe('#isStartDate', function () {
      it('returns true if arg === props.startDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: today
        }));
        (0, _chai.expect)(wrapper.instance().isStartDate(today)).to.equal(true);
      });
      it('returns false if arg !== props.startDate', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          startDate: (0, _moment["default"])(today).add(1, 'days')
        }));
        (0, _chai.expect)(wrapper.instance().isStartDate(today)).to.equal(false);
      });
    });
    describe('#isBlocked', function () {
      var isDayBlockedStub;
      var isOutsideRangeStub;
      var doesNotMeetMinimumNightsStub;
      beforeEach(function () {
        isDayBlockedStub = _sinonSandbox["default"].stub();
        isOutsideRangeStub = _sinonSandbox["default"].stub();
        doesNotMeetMinimumNightsStub = _sinonSandbox["default"].stub(_DayPickerRangeController["default"].prototype, 'doesNotMeetMinimumNights');
      });
      it('returns true if arg is calendar blocked', function () {
        isDayBlockedStub.returns(true);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(false);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          isDayBlocked: isDayBlockedStub,
          isOutsideRange: isOutsideRangeStub
        }));
        (0, _chai.expect)(wrapper.instance().isBlocked(today)).to.equal(true);
      });
      it('returns true if arg is out of range', function () {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(true);
        doesNotMeetMinimumNightsStub.returns(false);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          isDayBlocked: isDayBlockedStub,
          isOutsideRange: isOutsideRangeStub
        }));
        (0, _chai.expect)(wrapper.instance().isBlocked(today)).to.equal(true);
      });
      it('returns true if arg does not meet minimum nights', function () {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(true);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          isDayBlocked: isDayBlockedStub,
          isOutsideRange: isOutsideRangeStub
        }));
        (0, _chai.expect)(wrapper.instance().isBlocked(today)).to.equal(true);
      });
      it('returns false if arg is not blocked, not out of range, and meets minimum nights', function () {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(false);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          isDayBlocked: isDayBlockedStub,
          isOutsideRange: isOutsideRangeStub
        }));
        (0, _chai.expect)(wrapper.instance().isBlocked(today)).to.equal(false);
      });
      it('returns false if arg does not meet minimum nights but blockDaysViolatingMinNights is false', function () {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(true);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          isDayBlocked: isDayBlockedStub,
          isOutsideRange: isOutsideRangeStub
        }));
        (0, _chai.expect)(wrapper.instance().isBlocked(today, false)).to.equal(false);
      });
    });
    describe('#isToday', function () {
      it('returns true if today', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
        (0, _chai.expect)(wrapper.instance().isToday(today)).to.equal(true);
      });
      it('returns false if tomorrow', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
        (0, _chai.expect)(wrapper.instance().isToday((0, _moment["default"])(today).add(1, 'days'))).to.equal(false);
      });
      it('returns false if last month', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
        (0, _chai.expect)(wrapper.instance().isToday((0, _moment["default"])(today).subtract(1, 'months'))).to.equal(false);
      });
    });
    describe('#isFirstDayOfWeek', function () {
      it('returns true if first day of this week', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().startOf('week'))).to.equal(true);
      });
      it('returns true if same day as firstDayOfWeek prop', function () {
        var firstDayOfWeek = 3;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          firstDayOfWeek: firstDayOfWeek
        }));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().startOf('week').day(firstDayOfWeek))).to.equal(true);
      });
      it('returns true if first day of week and prop are both zero', function () {
        var firstDayOfWeek = 0;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          firstDayOfWeek: firstDayOfWeek
        }));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().startOf('week').day(firstDayOfWeek))).to.equal(true);
      });
      it('returns true if first day of week is not zero, and prop is zero', function () {
        _sinonSandbox["default"].stub(_moment["default"].localeData(), 'firstDayOfWeek').returns(1);

        var firstDayOfWeek = 0;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          firstDayOfWeek: firstDayOfWeek
        }));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().startOf('week').day(firstDayOfWeek))).to.equal(true);
      });
      it('returns false if not the first day of the week', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
        (0, _chai.expect)(wrapper.instance().isFirstDayOfWeek((0, _moment["default"])().endOf('week'))).to.equal(false);
      });
    });
    describe('#isLastDayOfWeek', function () {
      it('returns true if last day of week', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
        (0, _chai.expect)(wrapper.instance().isLastDayOfWeek((0, _moment["default"])().endOf('week'))).to.equal(true);
      });
      it('returns true if 6 days after firstDayOfWeek prop', function () {
        var firstDayOfWeek = 3;
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          firstDayOfWeek: firstDayOfWeek
        }));
        (0, _chai.expect)(wrapper.instance().isLastDayOfWeek((0, _moment["default"])().day(firstDayOfWeek).add(6, 'days'))).to.equal(true);
      });
      it('returns false if not last of week', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null));
        (0, _chai.expect)(wrapper.instance().isLastDayOfWeek((0, _moment["default"])().startOf('week').add(1, 'day'))).to.equal(false);
      });
    });
    describe('#beforeSelectedEnd', function () {
      it('returns true if day is before end date', function () {
        var endDate = today;
        var dayBeforeEndDate = endDate.clone().subtract(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: endDate
        }));
        (0, _chai.expect)(wrapper.instance().beforeSelectedEnd(dayBeforeEndDate)).to.equal(true);
      });
      it('returns false if day is after or equal to end date', function () {
        var endDate = today;
        var dayAfterEndDate = endDate.clone().add(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: endDate
        }));
        (0, _chai.expect)(wrapper.instance().beforeSelectedEnd(dayAfterEndDate)).to.equal(false);
      });
    });
    describe('#isDayBeforeHoveredEndDate', function () {
      it('returns false if day is after hovered end date', function () {
        var endDate = today;
        var dayAfterEndDate = endDate.clone().add(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: endDate
        }));
        wrapper.setState({
          hoverDate: endDate
        });
        (0, _chai.expect)(wrapper.instance().isDayBeforeHoveredEndDate(dayAfterEndDate)).to.equal(false);
      });
      it('returns true if day is before hovered end date', function () {
        var endDate = today;
        var dayBeforeEndDate = endDate.clone().subtract(1, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          endDate: endDate
        }));
        wrapper.setState({
          hoverDate: endDate
        });
        (0, _chai.expect)(wrapper.instance().isDayBeforeHoveredEndDate(dayBeforeEndDate)).to.equal(true);
      });
    });
    describe('noNavButtons prop', function () {
      it('renders navigation button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], null)).dive().dive();
        (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.lengthOf(1);
      });
      it('does not render navigation button when noNavButtons prop applied', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          noNavButtons: true
        })).dive().dive();
        (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.lengthOf(0);
      });
    });
    describe('renderKeyboardShortcutsButton prop', function () {
      it('pass down custom button render function', function () {
        var testRenderKeyboardShortcutsButton = function testRenderKeyboardShortcutsButton() {};

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          renderKeyboardShortcutsButton: testRenderKeyboardShortcutsButton
        }));
        var dayPicker = wrapper.find(_DayPicker["default"]);
        (0, _chai.expect)(dayPicker).to.have.lengthOf(1);
        (0, _chai.expect)(dayPicker.prop('renderKeyboardShortcutsButton')).to.eql(testRenderKeyboardShortcutsButton);
      });
    });
    describe('renderKeyboardShortcutsPanel prop', function () {
      it('passes down custom panel render function', function () {
        var testRenderKeyboardShortcutsPanel = function testRenderKeyboardShortcutsPanel() {};

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerRangeController["default"], {
          renderKeyboardShortcutsPanel: testRenderKeyboardShortcutsPanel
        }));
        var dayPicker = wrapper.find(_DayPicker["default"]);
        (0, _chai.expect)(dayPicker).to.have.lengthOf(1);
        (0, _chai.expect)(dayPicker.prop('renderKeyboardShortcutsPanel')).to.eql(testRenderKeyboardShortcutsPanel);
      });
    });
  });
});