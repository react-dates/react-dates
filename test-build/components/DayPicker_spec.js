"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _momentWithLocales = _interopRequireDefault(require("moment/min/moment-with-locales"));

var _chai = require("chai");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _enzyme = require("enzyme");

var _lodash = require("lodash");

var isDayVisible = _interopRequireWildcard(require("../../lib/utils/isDayVisible"));

var _isSameMonth = _interopRequireDefault(require("../../lib/utils/isSameMonth"));

var _DayPicker = _interopRequireWildcard(require("../../lib/components/DayPicker"));

var _CalendarMonthGrid = _interopRequireDefault(require("../../lib/components/CalendarMonthGrid"));

var _DayPickerNavigation = _interopRequireDefault(require("../../lib/components/DayPickerNavigation"));

var _DayPickerKeyboardShortcuts = _interopRequireDefault(require("../../lib/components/DayPickerKeyboardShortcuts"));

var _constants = require("../../lib/constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var today = (0, _momentWithLocales["default"])().locale('en');
var event = {
  preventDefault: function preventDefault() {},
  stopPropagation: function stopPropagation() {}
};
describe('DayPicker', function () {
  var adjustDayPickerHeightSpy;
  beforeEach(function () {
    adjustDayPickerHeightSpy = _sinonSandbox["default"].stub(_DayPicker.PureDayPicker.prototype, 'adjustDayPickerHeight');
  });
  afterEach(function () {
    _sinonSandbox["default"].restore();
  });
  describe('#render', function () {
    describe('renderWeekHeader', function () {
      it('there are 7 elements on each .DayPicker__week-header class', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        var weekHeaders = wrapper.find('.DayPicker__week-header');
        weekHeaders.forEach(function (weekHeader) {
          (0, _chai.expect)(weekHeader.find('li')).to.have.lengthOf(7);
        });
      });
      describe('props.renderWeekHeaderElement', function () {
        it('there are 7 custom elements on each .DayPicker__week-header class', function () {
          var testWeekHeaderClassName = 'test-week-header';
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            renderWeekHeaderElement: function renderWeekHeaderElement(day) {
              return /*#__PURE__*/_react["default"].createElement("strong", {
                className: testWeekHeaderClassName
              }, day);
            }
          })).dive();
          var weekHeaders = wrapper.find('.DayPicker__week-header');
          weekHeaders.forEach(function (weekHeader) {
            (0, _chai.expect)(weekHeader.find(".".concat(testWeekHeaderClassName))).to.have.lengthOf(7);
          });
        });
      });
      describe('props.orientation === HORIZONTAL_ORIENTATION', function () {
        it('props.numberOfMonths ul (week header) elements exists', function () {
          var NUM_OF_MONTHS = 3;
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.HORIZONTAL_ORIENTATION,
            numberOfMonths: NUM_OF_MONTHS
          })).dive();
          (0, _chai.expect)(wrapper.find('ul')).to.have.lengthOf(NUM_OF_MONTHS);
        });
      });
      describe('props.orientation === VERTICAL_ORIENTATION', function () {
        it('1 ul (week header) element exists', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_ORIENTATION
          })).dive();
          (0, _chai.expect)(wrapper.find('ul')).to.have.lengthOf(1);
        });
      });
    });
    describe('renderCalendarInfo', function () {
      it('info exists', function () {
        var testInfoClass = 'test-info-container';

        var infoElement = /*#__PURE__*/_react["default"].createElement("div", {
          className: testInfoClass
        });

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          renderCalendarInfo: function renderCalendarInfo() {
            return infoElement;
          }
        })).dive();
        (0, _chai.expect)(wrapper.find(".".concat(testInfoClass))).to.have.lengthOf(1);
      });
    });
    describe('CalendarMonthGrid', function () {
      it('component exists', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        (0, _chai.expect)(wrapper.find(_CalendarMonthGrid["default"])).to.have.lengthOf(1);
      });
      describe('prop.isAnimating', function () {
        it('is true if state.monthTransition is truthy', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            monthTransition: 'foo'
          });
          var CalendarMonthGridComponent = wrapper.find(_CalendarMonthGrid["default"]);
          (0, _chai.expect)(CalendarMonthGridComponent.prop('isAnimating')).to.equal(true);
        });
        it('is false if state.monthTransition is falsy', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            monthTransition: null
          });
          var CalendarMonthGridComponent = wrapper.find(_CalendarMonthGrid["default"]);
          (0, _chai.expect)(CalendarMonthGridComponent.prop('isAnimating')).to.equal(false);
        });
      });
    });
    describe('DayPickerNavigation', function () {
      it('is rendered before CalendarMonthGrid in DayPicker_focusRegion', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.lengthOf(1);
        (0, _chai.expect)(wrapper.find('[className^="DayPicker_focusRegion"]').childAt(0).type()).to.equal(_DayPickerNavigation["default"]);
      });
      describe('navPosition === NAV_POSITION_BOTTOM', function () {
        it('is rendered after CalendarMonthGrid in DayPicker_focusRegion', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            navPosition: _constants.NAV_POSITION_BOTTOM
          })).dive();
          (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.lengthOf(1);
          (0, _chai.expect)(wrapper.find('[className^="DayPicker_focusRegion"]').childAt(1).type()).to.equal(_DayPickerNavigation["default"]);
        });
      });
    });
    describe('DayPickerKeyboardShortcuts', function () {
      it('component exists if state.isTouchDevice is false and hideKeyboardShortcutsPanel is false', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          hideKeyboardShortcutsPanel: false
        })).dive();
        wrapper.setState({
          isTouchDevice: false
        });
        (0, _chai.expect)(wrapper.find(_DayPickerKeyboardShortcuts["default"])).to.have.lengthOf(1);
      });
      it('component does not exist if isTouchDevice() is true', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        wrapper.setState({
          isTouchDevice: true
        });
        (0, _chai.expect)(wrapper.find(_DayPickerKeyboardShortcuts["default"])).to.have.lengthOf(0);
      });
      it('component does not exist if hideKeyboardShortcutsPanel is true', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          hideKeyboardShortcutsPanel: true
        })).dive();
        (0, _chai.expect)(wrapper.find(_DayPickerKeyboardShortcuts["default"])).to.have.lengthOf(0);
      });
      it('component exists with custom button render function if renderKeyboardShortcutsButton is passed down', function () {
        var testRenderKeyboardShortcutsButton = function testRenderKeyboardShortcutsButton() {};

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          renderKeyboardShortcutsButton: testRenderKeyboardShortcutsButton
        })).dive();
        var dayPickerKeyboardShortcuts = wrapper.find(_DayPickerKeyboardShortcuts["default"]);
        (0, _chai.expect)(dayPickerKeyboardShortcuts).to.have.lengthOf(1);
        (0, _chai.expect)(dayPickerKeyboardShortcuts.prop('renderKeyboardShortcutsButton')).to.eql(testRenderKeyboardShortcutsButton);
      });
      it('component exists with custom panel render function if renderKeyboardShortcutsPanel is passed down', function () {
        var testRenderKeyboardShortcutsPanel = function testRenderKeyboardShortcutsPanel() {};

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          renderKeyboardShortcutsPanel: testRenderKeyboardShortcutsPanel
        })).dive();
        var dayPickerKeyboardShortcuts = wrapper.find(_DayPickerKeyboardShortcuts["default"]);
        (0, _chai.expect)(dayPickerKeyboardShortcuts).to.have.lengthOf(1);
        (0, _chai.expect)(dayPickerKeyboardShortcuts.prop('renderKeyboardShortcutsPanel')).to.eql(testRenderKeyboardShortcutsPanel);
      });
    });
  });
  describe('#isHorizontal', function () {
    it('returns true if props.orientation === HORIZONTAL_ORIENTATION', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        orientation: _constants.HORIZONTAL_ORIENTATION
      })).dive();
      (0, _chai.expect)(wrapper.instance().isHorizontal()).to.equal(true);
    });
    it('returns false if props.orientation === VERTICAL_ORIENTATION', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        orientation: _constants.VERTICAL_ORIENTATION
      }), {
        disableLifecycleMethods: false
      }).dive();
      (0, _chai.expect)(wrapper.instance().isHorizontal()).to.equal(false);
    });
  });
  describe('#isVertical', function () {
    it('returns true if props.orientation === VERTICAL_ORIENTATION', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        orientation: _constants.VERTICAL_ORIENTATION
      }), {
        disableLifecycleMethods: false
      }).dive();
      (0, _chai.expect)(wrapper.instance().isVertical()).to.equal(true);
    });
    it('returns false if props.orientation === HORIZONTAL_ORIENTATION', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        orientation: _constants.HORIZONTAL_ORIENTATION
      })).dive();
      (0, _chai.expect)(wrapper.instance().isVertical()).to.equal(false);
    });
  });
  describe('props.orientation === VERTICAL_SCROLLABLE', function () {
    it('renders two DayPickerNavigations', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        orientation: _constants.VERTICAL_SCROLLABLE
      }), {
        disableLifecycleMethods: false
      }).dive();
      (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.length(2);
    });
    it('uses getNextScrollableMonths instead of onNextMonthClick', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        orientation: _constants.VERTICAL_SCROLLABLE
      }), {
        disableLifecycleMethods: false
      }).dive();
      (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.length(2);
      var nav = wrapper.find(_DayPickerNavigation["default"]).get(1);
      (0, _chai.expect)(nav.props.onNextMonthClick).to.equal(wrapper.instance().getNextScrollableMonths);
    });
    it('uses getPrevScrollableMonths instead of onNextMonthClick', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        orientation: _constants.VERTICAL_SCROLLABLE
      }), {
        disableLifecycleMethods: false
      }).dive();
      (0, _chai.expect)(wrapper.find(_DayPickerNavigation["default"])).to.have.length(2);
      var nav = wrapper.find(_DayPickerNavigation["default"]).get(0);
      (0, _chai.expect)(nav.props.onPrevMonthClick).to.equal(wrapper.instance().getPrevScrollableMonths);
    });
  });
  describe('#onKeyDown', function () {
    describe('focusedDate is truthy', function () {
      it('sets state.withMouseInteractions to false', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        wrapper.setState({
          withMouseInteractions: true
        });
        wrapper.instance().onKeyDown(_objectSpread({}, event));
        (0, _chai.expect)(wrapper.state().withMouseInteractions).to.equal(false);
      });
      describe('ArrowUp', function () {
        it('calls maybeTransitionPrevMonth', function () {
          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowUp'
          }));
          (0, _chai.expect)(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });
        it('arg is 1 week before focusedDate', function () {
          var oneWeekBefore = today.clone().subtract(1, 'week');

          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowUp'
          }));
          var arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(oneWeekBefore, 'day')).to.equal(true);
        });
      });
      describe('ArrowLeft', function () {
        it('calls maybeTransitionPrevMonth', function () {
          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowLeft'
          }));
          (0, _chai.expect)(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });
        it('arg is 1 day before focusedDate', function () {
          var oneDayBefore = today.clone().subtract(1, 'day');

          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowLeft'
          }));
          var arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(oneDayBefore, 'day')).to.equal(true);
        });
        it('arg is end of previous month', function () {
          var startOfThisMonth = today.clone().startOf('month');
          var endOfPrevMonth = startOfThisMonth.clone().subtract(1, 'day');

          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: startOfThisMonth
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowLeft'
          }));
          var arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(endOfPrevMonth, 'day')).to.equal(true);
        });
      });
      describe('ArrowLeft -- RTL', function () {
        it('calls maybeTransitionNextMonth', function () {
          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            isRTL: true
          })).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowLeft'
          }));
          (0, _chai.expect)(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });
        it('arg is 1 day after focusedDate', function () {
          var oneDayAfter = today.clone().add(1, 'day');

          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            isRTL: true
          })).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowLeft'
          }));
          var arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(oneDayAfter, 'day')).to.equal(true);
        });
        it('arg is start of next month', function () {
          var endOfThisMonth = today.clone().endOf('month');
          var startOfNextMonth = endOfThisMonth.clone().add(1, 'day');

          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            isRTL: true
          })).dive();
          wrapper.setState({
            focusedDate: endOfThisMonth
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowLeft'
          }));
          var arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(startOfNextMonth, 'day')).to.equal(true);
        });
      });
      describe('Home', function () {
        it('calls maybeTransitionPrevMonth', function () {
          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Home'
          }));
          (0, _chai.expect)(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });
        it('arg is beginning of focusedDate week', function () {
          var startOfWeek = today.clone().startOf('week');

          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Home'
          }));
          var arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(startOfWeek, 'day')).to.equal(true);
        });
      });
      describe('PageUp', function () {
        it('calls maybeTransitionPrevMonth', function () {
          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'PageUp'
          }));
          (0, _chai.expect)(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });
        it('arg is 1 month before focusedDate', function () {
          var oneMonthBefore = today.clone().subtract(1, 'month');

          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'PageUp'
          }));
          var arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(oneMonthBefore, 'day')).to.equal(true);
        });
      });
      describe('ArrowDown', function () {
        it('calls maybeTransitionNextMonth', function () {
          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowDown'
          }));
          (0, _chai.expect)(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });
        it('arg is 1 week after focusedDate', function () {
          var oneWeekAfter = today.clone().add(1, 'week');

          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowDown'
          }));
          var arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(oneWeekAfter, 'day')).to.equal(true);
        });
      });
      describe('ArrowRight', function () {
        it('calls maybeTransitionNextMonth', function () {
          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowRight'
          }));
          (0, _chai.expect)(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });
        it('arg is 1 day after focusedDate', function () {
          var oneDayAfter = today.clone().add(1, 'day');

          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowRight'
          }));
          var arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(oneDayAfter, 'day')).to.equal(true);
        });
        it('arg is start of next  month', function () {
          var endOfThisMonth = today.clone().endOf('month');
          var startOfNextMonth = endOfThisMonth.clone().add(1, 'day');

          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: endOfThisMonth
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowRight'
          }));
          var arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(startOfNextMonth, 'day')).to.equal(true);
        });
      });
      describe('ArrowRight -- RTL', function () {
        it('calls maybeTransitionPrevMonth', function () {
          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            isRTL: true
          })).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowRight'
          }));
          (0, _chai.expect)(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });
        it('arg is 1 day before focusedDate', function () {
          var oneDayBefore = today.clone().subtract(1, 'day');

          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            isRTL: true
          })).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowRight'
          }));
          var arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(oneDayBefore, 'day')).to.equal(true);
        });
        it('arg is end of previous month', function () {
          var startOfThisMonth = today.clone().startOf('month');
          var endOfPrevMonth = startOfThisMonth.clone().subtract(1, 'day');

          var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            isRTL: true
          })).dive();
          wrapper.setState({
            focusedDate: startOfThisMonth
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowRight'
          }));
          var arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(endOfPrevMonth, 'day')).to.equal(true);
        });
      });
      describe('End', function () {
        it('calls maybeTransitionNextMonth', function () {
          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'End'
          }));
          (0, _chai.expect)(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });
        it('arg is end of focusedDate week', function () {
          var endOfWeek = today.clone().endOf('week');

          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'End'
          }));
          var arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(endOfWeek, 'day')).to.equal(true);
        });
      });
      describe('PageDown', function () {
        it('calls maybeTransitionNextMonth', function () {
          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'PageDown'
          }));
          (0, _chai.expect)(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });
        it('arg is 1 month after focusedDate', function () {
          var oneMonthAfter = today.clone().add(1, 'month');

          var maybeTransitionNextMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionNextMonth');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'PageDown'
          }));
          var arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          (0, _chai.expect)(arg.isSame(oneMonthAfter, 'day')).to.equal(true);
        });
      });
      describe('?', function () {
        it('calls openKeyboardShortcutsPanel', function () {
          var openKeyboardShortcutsPanelSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'openKeyboardShortcutsPanel');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: '?'
          }));
          (0, _chai.expect)(openKeyboardShortcutsPanelSpy.callCount).to.equal(1);
        });
      });
      describe('Escape', function () {
        it('sets state.showKeyboardShortcuts to false', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: true
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Escape'
          }));
          (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(false);
        });
        it('calls closeKeyboardShortcutsPanel if state.showKeyboardShortcuts === true', function () {
          var closeKeyboardShortcutsPanelSpy = _sinonSandbox["default"].stub(_DayPicker.PureDayPicker.prototype, 'closeKeyboardShortcutsPanel');

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: true
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Escape'
          }));
          (0, _chai.expect)(closeKeyboardShortcutsPanelSpy.callCount).to.equal(1);
        });
        it('calls props.onBlur if state.showKeyboardShortcuts === false', function () {
          var onBlurStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            onBlur: onBlurStub
          })).dive();
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: false
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Escape'
          }));
          (0, _chai.expect)(onBlurStub.callCount).to.equal(1);
        });
      });
      describe('Tab', function () {
        it('triggers onShiftTab when shift tab is pressed', function () {
          var onTabStub = _sinonSandbox["default"].stub();

          var onShiftTabStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            onTab: onTabStub,
            onShiftTab: onShiftTabStub
          })).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Tab',
            shiftKey: true
          }));
          (0, _chai.expect)(onTabStub.callCount).to.equal(0);
          (0, _chai.expect)(onShiftTabStub.callCount).to.equal(1);
        });
        it('triggers onTab', function () {
          var onTabStub = _sinonSandbox["default"].stub();

          var onShiftTabStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            onTab: onTabStub,
            onShiftTab: onShiftTabStub
          })).dive();
          wrapper.setState({
            focusedDate: today
          });
          wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Tab'
          }));
          (0, _chai.expect)(onTabStub.callCount).to.equal(1);
          (0, _chai.expect)(onShiftTabStub.callCount).to.equal(0);
        });
      });
    });
    describe('focusedDate is falsy', function () {
      it('does not call maybeTransitionPrevMonth', function () {
        var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        wrapper.setState({
          focusedDate: null
        });
        wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
          key: 'ArrowLeft'
        }));
        (0, _chai.expect)(maybeTransitionPrevMonthSpy.callCount).to.equal(0);
      });
      it('does not call maybeTransitionNextMonth', function () {
        var maybeTransitionPrevMonthSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'maybeTransitionPrevMonth');

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        wrapper.setState({
          focusedDate: null
        });
        wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
          key: 'ArrowRight'
        }));
        (0, _chai.expect)(maybeTransitionPrevMonthSpy.callCount).to.equal(0);
      });
    });
  });
  describe('#onMonthChange', function () {
    it('sets state.monthTransition to "month_selection"', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      var date = (0, _momentWithLocales["default"])();
      wrapper.instance().onMonthChange(date);
      (0, _chai.expect)(wrapper.state().monthTransition).to.equal('month_selection');
    });
    it('sets state.nextFocusedDate to passed in date', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      var date = (0, _momentWithLocales["default"])();
      wrapper.instance().onMonthChange(date);
      (0, _chai.expect)(wrapper.state().nextFocusedDate).to.equal(date);
    });
    it('sets state.currentMonth to passed in month', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      var date = (0, _momentWithLocales["default"])();
      wrapper.instance().onMonthChange(date);
      (0, _chai.expect)(wrapper.state().currentMonth).to.equal(date);
    });
  });
  describe('#onYearChange', function () {
    it('sets state.yearTransition to "year_selection"', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      var date = (0, _momentWithLocales["default"])();
      wrapper.instance().onYearChange(date);
      (0, _chai.expect)(wrapper.state().monthTransition).to.equal('year_selection');
    });
    it('sets state.nextFocusedDate to passed in date', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      var date = (0, _momentWithLocales["default"])();
      wrapper.instance().onYearChange(date);
      (0, _chai.expect)(wrapper.state().nextFocusedDate).to.equal(date);
    });
    it('sets state.currentMonth to passed in year', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      var date = (0, _momentWithLocales["default"])();
      wrapper.instance().onYearChange(date);
      (0, _chai.expect)(wrapper.state().currentMonth).to.equal(date);
    });
  });
  describe('#onPrevMonthClick', function () {
    it('calls onPrevMonthTransition', function () {
      var onPrevMonthTransitionSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'onPrevMonthTransition');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().onPrevMonthClick();
      (0, _chai.expect)(onPrevMonthTransitionSpy.callCount).to.equal(1);
    });
  });
  describe('#onPrevMonthTransition', function () {
    it('sets state.monthTransition to "prev"', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().onPrevMonthTransition();
      (0, _chai.expect)(wrapper.state().monthTransition).to.equal('prev');
    });
    it('sets state.nextFocusedDate to first arg', function () {
      var test = 'FOOBARBAZ';
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().onPrevMonthTransition(test);
      (0, _chai.expect)(wrapper.state().nextFocusedDate).to.equal(test);
    });
  });
  describe('monthTitleHeight', function () {
    it('change monthTitleHeight correctly with setMonthTitleHeight', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().setMonthTitleHeight(80);
      (0, _chai.expect)(wrapper.state().monthTitleHeight).to.equal(80);
    });
    it('do not change monthTitleHeight with renderMonthText === prevRenderMonthText', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        renderMonthText: function renderMonthText() {
          return 'foo';
        }
      })).dive();
      wrapper.instance().setMonthTitleHeight(80);
      wrapper.setProps({
        renderMonthText: function renderMonthText() {
          return 'foo';
        }
      });
      (0, _chai.expect)(wrapper.state().monthTitleHeight).to.equal(80);
    });
  });
  describe('#onNextMonthClick', function () {
    it('calls onNextMonthTransition', function () {
      var onNextMonthTransitionSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'onNextMonthTransition');

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().onNextMonthClick();
      (0, _chai.expect)(onNextMonthTransitionSpy.callCount).to.equal(1);
    });
  });
  describe('#onNextMonthTransition', function () {
    it('sets state.monthTransition to "next"', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().onNextMonthTransition();
      (0, _chai.expect)(wrapper.state().monthTransition).to.equal('next');
    });
    it('sets state.nextFocusedDate to first arg', function () {
      var test = 'FOOBARBAZ';
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().onNextMonthTransition(test);
      (0, _chai.expect)(wrapper.state().nextFocusedDate).to.equal(test);
    });
  });
  describe('#getFocusedDay', function () {
    describe('props.getFirstFocusableDay is truthy', function () {
      it('calls getFirstFocusableDay with arg if exists', function () {
        var getFirstFocusableDayStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          getFirstFocusableDay: getFirstFocusableDayStub
        })).dive(); // getFirstFocusableDay gets called in the constructor

        getFirstFocusableDayStub.resetHistory();
        wrapper.instance().getFocusedDay();
        (0, _chai.expect)(getFirstFocusableDayStub.callCount).to.equal(1);
      });
      it('calls getFirstFocusableDay with arg if exists', function () {
        var getFirstFocusableDayStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          getFirstFocusableDay: getFirstFocusableDayStub
        })).dive(); // getFirstFocusableDay gets called in the constructor

        getFirstFocusableDayStub.resetHistory();
        wrapper.instance().getFocusedDay(today);
        (0, _chai.expect)(getFirstFocusableDayStub.getCall(0).args[0].isSame(today, 'day')).to.equal(true);
      });
      it('returns getFirstFocusableDay() value', function () {
        var getFirstFocusableDayStub = _sinonSandbox["default"].stub().returns(today);

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          getFirstFocusableDay: getFirstFocusableDayStub
        })).dive();
        (0, _chai.expect)(wrapper.instance().getFocusedDay().isSame(today, 'day')).to.equal(true);
      });
      it('returns first day of arg if getFirstFocusableDay returns invisible day', function () {
        var test = (0, _momentWithLocales["default"])().add(3, 'months');

        var getFirstFocusableDayStub = _sinonSandbox["default"].stub().returns(today);

        _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
          getFirstFocusableDay: getFirstFocusableDayStub
        })).dive();
        (0, _chai.expect)(wrapper.instance().getFocusedDay(test).isSame(test.startOf('month'), 'day')).to.equal(true);
      });
    });
    describe('props.getFirstFocusableDay is falsy', function () {
      it('returns undefined if no arg', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        (0, _chai.expect)(wrapper.instance().getFocusedDay()).to.equal(undefined);
      });
      it('returns first day of arg month if exists', function () {
        var test = (0, _momentWithLocales["default"])().add(3, 'months');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        (0, _chai.expect)(wrapper.instance().getFocusedDay(test).isSame(test.startOf('month'), 'day')).to.equal(true);
      });
    });
  });
  describe('#maybeTransitionNextMonth', function () {
    describe('arg has same month as state.focusedDate', function () {
      it('does not call `onNextMonthTransition`', function () {
        var onNextMonthTransitionSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'onNextMonthTransition');

        var firstOfTodaysMonth = (0, _momentWithLocales["default"])().startOf('month');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        wrapper.instance().maybeTransitionNextMonth(today);
        (0, _chai.expect)(onNextMonthTransitionSpy.callCount).to.equal(0);
      });
      it('returns false', function () {
        var firstOfTodaysMonth = today.clone().startOf('month');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        (0, _chai.expect)(wrapper.instance().maybeTransitionNextMonth(today)).to.equal(false);
      });
    });
    describe('arg has different month as state.focusedDate', function () {
      describe('arg is visible', function () {
        it('does not call `onNextMonthClick`', function () {
          var onNextMonthTransitionSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'onNextMonthTransition');

          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(true);

          var nextMonth = (0, _momentWithLocales["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionNextMonth(today);
          (0, _chai.expect)(onNextMonthTransitionSpy.callCount).to.equal(0);
        });
        it('returns false', function () {
          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(true);

          var nextMonth = (0, _momentWithLocales["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.state().focusedDate = nextMonth;
          (0, _chai.expect)(wrapper.instance().maybeTransitionNextMonth(today)).to.equal(false);
        });
      });
      describe('arg is not visible', function () {
        it('calls `onNextMonthTransition`', function () {
          var onNextMonthTransitionSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'onNextMonthTransition');

          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

          var nextMonth = (0, _momentWithLocales["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionNextMonth(today);
          (0, _chai.expect)(onNextMonthTransitionSpy.callCount).to.equal(1);
        });
        it('returns true', function () {
          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

          var nextMonth = (0, _momentWithLocales["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.state().focusedDate = nextMonth;
          (0, _chai.expect)(wrapper.instance().maybeTransitionNextMonth(today)).to.equal(true);
        });
      });
    });
  });
  describe('#maybeTransitionPrevMonth', function () {
    describe('arg has same month as state.focusedDate', function () {
      it('does not call `onPrevMonthTransition`', function () {
        var onPrevMonthTransitionSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'onPrevMonthTransition');

        var firstOfTodaysMonth = (0, _momentWithLocales["default"])().startOf('month');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        wrapper.instance().maybeTransitionPrevMonth(today);
        (0, _chai.expect)(onPrevMonthTransitionSpy.callCount).to.equal(0);
      });
      it('returns false', function () {
        var firstOfTodaysMonth = today.clone().startOf('month');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        (0, _chai.expect)(wrapper.instance().maybeTransitionPrevMonth(today)).to.equal(false);
      });
    });
    describe('arg has different month as state.focusedDate', function () {
      describe('arg is visible', function () {
        it('does not call `onPrevMonthTransition`', function () {
          var onPrevMonthTransitionSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'onPrevMonthTransition');

          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(true);

          var nextMonth = (0, _momentWithLocales["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionPrevMonth(today);
          (0, _chai.expect)(onPrevMonthTransitionSpy.callCount).to.equal(0);
        });
        it('returns false', function () {
          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(true);

          var nextMonth = (0, _momentWithLocales["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.state().focusedDate = nextMonth;
          (0, _chai.expect)(wrapper.instance().maybeTransitionPrevMonth(today)).to.equal(false);
        });
      });
      describe('arg is not visible', function () {
        it('calls `onPrevMonthTransition`', function () {
          var onPrevMonthTransitionSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'onPrevMonthTransition');

          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

          var nextMonth = (0, _momentWithLocales["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionPrevMonth(today);
          (0, _chai.expect)(onPrevMonthTransitionSpy.callCount).to.equal(1);
        });
        it('returns true', function () {
          _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

          var nextMonth = (0, _momentWithLocales["default"])().add(1, 'month');
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
          wrapper.state().focusedDate = nextMonth;
          (0, _chai.expect)(wrapper.instance().maybeTransitionPrevMonth(today)).to.equal(true);
        });
      });
    });
  });
  describe('#getNextScrollableMonths', function () {
    it('increments scrollableMonthMultiple', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().getNextScrollableMonths(event);
      (0, _chai.expect)(wrapper.state().scrollableMonthMultiple).to.equal(2);
    });
  });
  describe('#getPrevScrollableMonths', function () {
    it('increments scrollableMonthMultiple and updates currentMonth', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.instance().getPrevScrollableMonths();
      (0, _chai.expect)(wrapper.state().scrollableMonthMultiple).to.equal(2);
      (0, _chai.expect)((0, _isSameMonth["default"])(wrapper.state().currentMonth, (0, _momentWithLocales["default"])().subtract(2, 'month'))).to.equal(true);
    });
  });
  describe('#openKeyboardShortcutsPanel', function () {
    it('sets state.showKeyboardShortcuts to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.setState({
        showKeyboardShortcuts: false
      });
      wrapper.instance().openKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(true);
    });
    it('sets state.onKeyboardShortcutsPanelClose to arg', function () {
      var test = 'FOOBARBAZ';
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.setState({
        onKeyboardShortcutsPanelClose: null
      });
      wrapper.instance().openKeyboardShortcutsPanel(test);
      (0, _chai.expect)(wrapper.state().onKeyboardShortcutsPanelClose).to.equal(test);
    });
  });
  describe('#closeKeyboardShortcutsPanel', function () {
    it('sets state.showKeyboardShortcuts to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.setState({
        showKeyboardShortcuts: true
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
    it('sets state.onKeyboardShortcutsPanelClose to null', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
        onKeyboardShortcutsPanelClose: _sinonSandbox["default"].stub()
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().onKeyboardShortcutsPanelClose).to.equal(null);
    });
    it('calls state.onKeyboardShortcutsPanelClose if exists', function () {
      var onKeyboardShortcutsPanelCloseStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], null)).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
        onKeyboardShortcutsPanelClose: onKeyboardShortcutsPanelCloseStub
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      (0, _chai.expect)(onKeyboardShortcutsPanelCloseStub.callCount).to.equal(1);
    });
  });
  describe('#weekHeaderNames', function () {
    it('returns weekheaders in fr', function () {
      var INITIAL_MONTH = (0, _momentWithLocales["default"])().locale('fr');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        initialVisibleMonth: function initialVisibleMonth() {
          return INITIAL_MONTH;
        }
      })).dive();
      var instance = wrapper.instance();
      (0, _chai.expect)(instance.getWeekHeaders()).to.be.eql(INITIAL_MONTH.localeData().weekdaysMin());
    });
  });
  describe('#getWeekHeaders', function () {
    it('returns unmutated weekday headers for currentMonth in a future', function () {
      _sinonSandbox["default"].stub(_DayPicker.PureDayPicker.prototype, 'render').returns(null);

      var getWeekHeadersSpy = _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'getWeekHeaders');

      var INITIAL_MONTH = (0, _momentWithLocales["default"])().add(2, 'Months').week(3).weekday(3);
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
        initialVisibleMonth: function initialVisibleMonth() {
          return INITIAL_MONTH;
        }
      })).dive();
      var instance = wrapper.instance();
      var state = (0, _lodash.cloneDeep)(wrapper.state());
      (0, _chai.expect)(instance.getWeekHeaders()).to.be.eql(INITIAL_MONTH.localeData().weekdaysMin());
      (0, _chai.expect)(instance.state).not.to.equal(state);
      (0, _chai.expect)(instance.state).to.eql(state);
      (0, _chai.expect)(getWeekHeadersSpy).to.have.property('callCount', 1);
    });
  });
  describe('life cycle methods', function () {
    describe.skip('#componentDidMount', function () {
      describe('props.orientation === HORIZONTAL_ORIENTATION', function () {
        it('calls adjustDayPickerHeight', function () {
          (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.HORIZONTAL_ORIENTATION
          }));
          (0, _chai.expect)(adjustDayPickerHeightSpy).to.have.property('callCount', 1);
        });
        it('does not update state.currentMonthScrollTop', function () {
          _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'setTransitionContainerRef');

          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.HORIZONTAL_ORIENTATION
          }));
          (0, _chai.expect)(wrapper.state().currentMonthScrollTop).to.equal(null);
        });
      });
      describe.skip('props.orientation === VERTICAL_ORIENTATION', function () {
        it('does not call adjustDayPickerHeight', function () {
          (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_ORIENTATION
          }));
          (0, _chai.expect)(adjustDayPickerHeightSpy.called).to.equal(false);
        });
        it('does not update state.currentMonthScrollTop', function () {
          _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'setTransitionContainerRef');

          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_ORIENTATION
          }));
          (0, _chai.expect)(wrapper.state().currentMonthScrollTop).to.equal(null);
        });
      });
      describe('props.orientation === VERTICAL_SCROLLABLE', function () {
        it('updates state.currentMonthScrollTop', function () {
          _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'setTransitionContainerRef');

          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_SCROLLABLE
          }));
          (0, _chai.expect)(wrapper.state().currentMonthScrollTop).to.not.equal(null);
        });
      });
    });
    describe('#componentWillReceiveProps', function () {
      describe.skip('props.orientation === VERTICAL_SCROLLABLE', function () {
        it('updates state.currentMonthScrollTop', function () {
          _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'setTransitionContainerRef');

          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_SCROLLABLE
          }));
          var prevCurrentMonthScrollTop = wrapper.state().currentMonthScrollTop;
          wrapper.setState({
            currentMonth: (0, _momentWithLocales["default"])().subtract(1, 'months')
          });
          wrapper.setProps({
            initialVisibleMonth: function initialVisibleMonth() {
              return (0, _momentWithLocales["default"])().subtract(1, 'month');
            }
          });
          (0, _chai.expect)(wrapper.state().currentMonthScrollTop).to.not.equal(prevCurrentMonthScrollTop);
        });
      });
      describe('props.date changed', function () {
        var props = _objectSpread(_objectSpread({}, _DayPicker.defaultProps), {}, {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          initialVisibleMonth: function initialVisibleMonth() {
            return today;
          },
          theme: {
            reactDates: {
              spacing: {}
            }
          },
          styles: {},
          css: function css() {}
        });

        describe('date is not visible', function () {
          it('setState gets called with new month', function () {
            _sinonSandbox["default"].stub(isDayVisible, 'default').returns(false);

            var date = today;
            var newDate = date.clone().add(1, 'month');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker.PureDayPicker, (0, _extends2["default"])({}, props, {
              date: date
            })));
            (0, _chai.expect)(wrapper.state().currentMonth).to.eql(date);
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              date: newDate,
              initialVisibleMonth: function initialVisibleMonth() {
                return newDate;
              }
            }), {});
            (0, _chai.expect)(wrapper.state().currentMonth).to.eql(newDate);
          });
        });
        describe('date is visible', function () {
          it('setState gets called with existing month', function () {
            _sinonSandbox["default"].stub(isDayVisible, 'default').returns(true);

            var date = today;
            var newDate = date.clone().add(1, 'month');
            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker.PureDayPicker, (0, _extends2["default"])({}, props, {
              date: date
            })));
            (0, _chai.expect)(wrapper.state().currentMonth).to.eql(date);
            wrapper.instance().componentWillReceiveProps(_objectSpread(_objectSpread({}, props), {}, {
              date: newDate,
              initialVisibleMonth: function initialVisibleMonth() {
                return newDate;
              }
            }), {});
            (0, _chai.expect)(wrapper.state().currentMonth).to.eql(date);
          });
        });
      });
    });
    describe('#componentDidUpdate', function () {
      var updateStateAfterMonthTransitionSpy;
      beforeEach(function () {
        updateStateAfterMonthTransitionSpy = _sinonSandbox["default"].stub(_DayPicker.PureDayPicker.prototype, 'updateStateAfterMonthTransition');
      });
      describe('props.orientation === HORIZONTAL_ORIENTATION', function () {
        it.skip('calls adjustDayPickerHeight if state.monthTransition is truthy', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.HORIZONTAL_ORIENTATION
          }));
          wrapper.setState({
            monthTransition: 'foo'
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });
        it.skip('does not call adjustDayPickerHeight if state.monthTransition is falsy', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.HORIZONTAL_ORIENTATION
          }));
          wrapper.setState({
            monthTransition: null
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy.calledTwice).to.equal(false);
        });
        it.skip('calls adjustDayPickerHeight if orientation has changed from HORIZONTAL_ORIENTATION to VERTICAL_ORIENTATION', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.HORIZONTAL_ORIENTATION
          }));
          wrapper.setState({
            orientation: _constants.VERTICAL_ORIENTATION
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });
        it.skip('calls adjustDayPickerHeight if daySize has changed', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            daySize: 39,
            orientation: _constants.HORIZONTAL_ORIENTATION
          }));
          wrapper.setState({
            daySize: 40,
            orientation: _constants.HORIZONTAL_ORIENTATION
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });
        it.skip('calls updateStateAfterMonthTransition if state.monthTransition is truthy', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.HORIZONTAL_ORIENTATION
          }));
          wrapper.setState({
            monthTransition: 'foo'
          });
          (0, _chai.expect)(updateStateAfterMonthTransitionSpy).to.have.property('callCount', 1);
        });
        it.skip('does not call updateStateAfterMonthTransition if state.monthTransition is falsy', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.HORIZONTAL_ORIENTATION
          }));
          wrapper.setState({
            monthTransition: null
          });
          (0, _chai.expect)(updateStateAfterMonthTransitionSpy.calledOnce).to.equal(false);
        });
        it('calls adjustDayPickerHeightSpy if props.numberOfMonths changes', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            numberOfMonths: 2
          })).dive();
          wrapper.instance().componentDidUpdate({
            daySize: _constants.DAY_SIZE,
            numberOfMonths: 3,
            orientation: _constants.HORIZONTAL_ORIENTATION
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy.callCount).to.equal(1);
        });
        it('does not call adjustDayPickerHeightSpy if props.numberOfMonths does not change', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            numberOfMonths: 2
          })).dive();
          wrapper.instance().componentDidUpdate({
            daySize: _constants.DAY_SIZE,
            numberOfMonths: 2,
            orientation: _constants.HORIZONTAL_ORIENTATION
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy.called).to.equal(false);
        });
      });
      describe.skip('props.orientation === VERTICAL_ORIENTATION', function () {
        it('does not call adjustDayPickerHeight if state.monthTransition is truthy', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_ORIENTATION
          }));
          wrapper.setState({
            monthTransition: 'foo'
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy.called).to.equal(false);
        });
        it('does not call adjustDayPickerHeight if state.monthTransition is falsy', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_ORIENTATION
          }));
          wrapper.setState({
            monthTransition: null
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy.called).to.equal(false);
        });
        it('calls adjustDayPickerHeight if orientation has changed from VERTICAL_ORIENTATION to HORIZONTAL_ORIENTATION', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_ORIENTATION
          }));
          wrapper.setState({
            orientation: _constants.HORIZONTAL_ORIENTATION
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });
        it('calls adjustDayPickerHeight if daySize has changed', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            daySize: 39,
            orientation: _constants.VERTICAL_ORIENTATION
          }));
          wrapper.setState({
            daySize: 40,
            orientation: _constants.VERTICAL_ORIENTATION
          });
          (0, _chai.expect)(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });
        it('calls updateStateAfterMonthTransition if state.monthTransition is truthy', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_ORIENTATION
          }));
          wrapper.setState({
            monthTransition: 'foo'
          });
          (0, _chai.expect)(updateStateAfterMonthTransitionSpy).to.have.property('callCount', 1);
        });
        it('does not call updateStateAfterMonthTransition if state.monthTransition is falsy', function () {
          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_ORIENTATION
          }));
          wrapper.setState({
            monthTransition: null
          });
          (0, _chai.expect)(updateStateAfterMonthTransitionSpy.calledOnce).to.equal(false);
        });
      });
      describe.skip('props.orientation === VERTICAL_SCROLLABLE', function () {
        it('does not update transitionContainer ref`s scrollTop currentMonth stays the same', function () {
          _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'setTransitionContainerRef');

          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_SCROLLABLE
          }));
          var prevScrollTop = wrapper.transitionContainer.scrollTop;
          wrapper.setState({
            currentMonth: (0, _momentWithLocales["default"])()
          });
          (0, _chai.expect)(wrapper.transitionContainer).to.have.property('scrollTop', prevScrollTop);
        });
        it('updates transitionContainer ref`s scrollTop currentMonth changes', function () {
          _sinonSandbox["default"].spy(_DayPicker.PureDayPicker.prototype, 'setTransitionContainerRef');

          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
            orientation: _constants.VERTICAL_SCROLLABLE
          }));
          var prevScrollTop = wrapper.transitionContainer.scrollTop;
          wrapper.setState({
            currentMonth: (0, _momentWithLocales["default"])().subtract(1, 'months')
          });
          (0, _chai.expect)(wrapper.transitionContainer).to.not.have.property('scrollTop', prevScrollTop);
        });
      });
      describe.skip('when isFocused is updated to true', function () {
        var prevProps = {
          isFocused: false
        };
        var newProps = {
          isFocused: true
        };
        var containerFocusStub;
        var wrapper;
        beforeEach(function () {
          containerFocusStub = _sinonSandbox["default"].stub();
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], newProps)).dive();
          wrapper.instance().container = {
            focus: containerFocusStub
          };
        });
        afterEach(function () {
          containerFocusStub.resetHistory();
        });
        describe('when focusedDate is not defined', function () {
          before(function () {
            wrapper.state().focusedDate = undefined;
            wrapper.instance().componentDidUpdate(prevProps);
          });
          it('sets focus on the container', function () {
            (0, _chai.expect)(containerFocusStub.callCount).to.equal(1);
          });
        });
        describe('when focusedDate is defined', function () {
          before(function () {
            wrapper.state().focusedDate = (0, _momentWithLocales["default"])();
            wrapper.instance().componentDidUpdate(prevProps);
          });
          it('should not set focus on the container', function () {
            (0, _chai.expect)(containerFocusStub.notCalled).to.equal(true);
          });
        });
      });
    });
  });
});