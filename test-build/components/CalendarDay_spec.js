"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _enzyme = require("enzyme");

var _moment = _interopRequireDefault(require("moment"));

var _raf = _interopRequireDefault(require("raf"));

var _constants = require("../../lib/constants");

var _CalendarDay = _interopRequireWildcard(require("../../lib/components/CalendarDay"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('CalendarDay', function () {
  afterEach(function () {
    _sinonSandbox["default"].restore();
  });
  describe('#render', function () {
    it('contains formatted day for single digit days', function () {
      var firstOfMonth = (0, _moment["default"])().startOf('month');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        day: firstOfMonth
      })).dive();
      (0, _chai.expect)(wrapper.text()).to.equal(firstOfMonth.format('D'));
    });
    it('contains formatted day for double digit days', function () {
      var lastOfMonth = (0, _moment["default"])().endOf('month');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        day: lastOfMonth
      })).dive();
      (0, _chai.expect)(wrapper.text()).to.equal(lastOfMonth.format('D'));
    });
    it('contains arbitrary content if renderDay is provided', function () {
      var dayName = (0, _moment["default"])().format('dddd');

      var renderDay = function renderDay(day) {
        return day.format('dddd');
      };

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        renderDayContents: renderDay
      })).dive();
      (0, _chai.expect)(wrapper.text()).to.equal(dayName);
    });
    it('passes modifiers to renderDayContents', function () {
      var modifiers = new Set([_constants.BLOCKED_MODIFIER]);

      var renderDayContents = function renderDayContents(day, mods) {
        return "".concat(day.format('dddd')).concat(mods.has(_constants.BLOCKED_MODIFIER) ? 'BLOCKED' : '');
      };

      var expected = "".concat((0, _moment["default"])().format('dddd'), "BLOCKED");
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        renderDayContents: renderDayContents,
        modifiers: modifiers
      })).dive();
      (0, _chai.expect)(wrapper.text()).to.equal(expected);
    });
    it('has button role', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], null)).dive();
      (0, _chai.expect)(wrapper.props().role).to.equal('button');
    });
    it('has tabIndex equal to props.tabIndex', function () {
      var tabIndex = -1;
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        tabIndex: tabIndex
      })).dive();
      (0, _chai.expect)(wrapper.props().tabIndex).to.equal(tabIndex);
    });
    describe('aria-current', function () {
      it('should add aria-current to date for today date', function () {
        var modifiers = new Set(['today']);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers
        })).dive();
        (0, _chai.expect)(wrapper.prop('aria-current')).to.equal('date');
      });
      it('should not add aria-current for not today date', function () {
        var modifiers = new Set();
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers
        })).dive();
        (0, _chai.expect)(wrapper).to.not.have.property('aria-current');
      });
    });
    describe('aria-label', function () {
      var phrases = {};
      var day = (0, _moment["default"])('10/10/2017', 'MM/DD/YYYY');
      beforeEach(function () {
        phrases.chooseAvailableDate = _sinonSandbox["default"].stub().returns('chooseAvailableDate text');
        phrases.dateIsSelected = _sinonSandbox["default"].stub().returns('dateIsSelected text');
        phrases.dateIsUnavailable = _sinonSandbox["default"].stub().returns('dateIsUnavailable text');
        phrases.dateIsSelectedAsStartDate = _sinonSandbox["default"].stub().returns('dateIsSelectedAsStartDate text');
        phrases.dateIsSelectedAsEndDate = _sinonSandbox["default"].stub().returns('dateIsSelectedAsEndDate text');
      });
      it('is formatted with the chooseAvailableDate phrase function when day is available', function () {
        var modifiers = new Set();
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers,
          phrases: phrases,
          day: day
        })).dive();
        (0, _chai.expect)(wrapper.prop('aria-label')).to.equal('chooseAvailableDate text');
      });
      it('is formatted with the dateIsSelected phrase function when day is selected', function () {
        var modifiers = new Set(['selected']);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers,
          phrases: phrases,
          day: day
        })).dive();
        (0, _chai.expect)(wrapper.prop('aria-label')).to.equal('dateIsSelected text');
      });
      it('is formatted with the dateIsSelected phrase function when day is selected in a span', function () {
        var modifiers = new Set(['selected-span']);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers,
          phrases: phrases,
          day: day
        })).dive();
        (0, _chai.expect)(wrapper.prop('aria-label')).to.equal('dateIsSelected text');
      });
      it('is formatted with the dateIsSelectedAsStartDate phrase function when day is selected as the start date', function () {
        var modifiers = new Set().add(_constants.BLOCKED_MODIFIER).add('selected-start');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers,
          phrases: phrases,
          day: day
        })).dive();
        (0, _chai.expect)(wrapper.prop('aria-label')).to.equal('dateIsSelectedAsStartDate text');
      });
      it('is formatted with the dateIsSelectedAsEndDate phrase function when day is selected as the end date', function () {
        var modifiers = new Set().add(_constants.BLOCKED_MODIFIER).add('selected-end');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers,
          phrases: phrases,
          day: day
        })).dive();
        (0, _chai.expect)(wrapper.prop('aria-label')).to.equal('dateIsSelectedAsEndDate text');
      });
      it('is formatted with the dateIsUnavailable phrase function when day is not available', function () {
        var modifiers = new Set([_constants.BLOCKED_MODIFIER]);
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers,
          phrases: phrases,
          day: day
        })).dive();
        (0, _chai.expect)(wrapper.prop('aria-label')).to.equal('dateIsUnavailable text');
      });
      it('should set aria-label with a value pass through ariaLabelFormat prop if it exists', function () {
        var modifiers = new Set();
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          modifiers: modifiers,
          day: day,
          ariaLabelFormat: "MMMM Do YYYY"
        })).dive();
        (0, _chai.expect)(wrapper.prop('aria-label')).to.equal('October 10th 2017');
      });
    });
    describe('event handlers', function () {
      var day = (0, _moment["default"])('10/10/2017', 'MM/DD/YYYY');
      var wrapper;
      beforeEach(function () {
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
          day: day,
          ariaLabelFormat: "MMMM Do YYYY"
        })).dive();
      });
      it('onMouseUp blurs the event target', function () {
        var handler = wrapper.prop('onMouseUp');

        var blur = _sinonSandbox["default"].spy();

        handler({
          currentTarget: {
            blur: blur
          }
        });
        (0, _chai.expect)(blur).to.have.property('callCount', 1);
      });
      it('onKeyDown calls this.onKeyDown', function () {
        var spy = _sinonSandbox["default"].spy(wrapper.instance(), 'onKeyDown');

        var handler = wrapper.prop('onKeyDown');
        var event = {};
        handler(event);
        (0, _chai.expect)(spy).to.have.property('callCount', 1);
        (0, _chai.expect)(spy.calledWith(day, event)).to.equal(true);
      });
    });
    it('renders an empty <td> when no day is given', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        day: null
      })).dive();
      (0, _chai.expect)(wrapper.is('td')).to.equal(true);
      (0, _chai.expect)(wrapper.children()).to.have.lengthOf(0);
      (0, _chai.expect)(wrapper.props()).to.eql({});
    });
  });
  describe('#onKeyDown', function () {
    var day = (0, _moment["default"])('10/10/2017', 'MM/DD/YYYY');
    var onDayClick;
    var wrapper;
    beforeEach(function () {
      onDayClick = _sinonSandbox["default"].spy();
      wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        day: day,
        onDayClick: onDayClick
      })).dive();
    });
    it('calls onDayClick with the enter key', function () {
      var event = {
        key: 'Enter'
      };
      wrapper.instance().onKeyDown(day, event);
      (0, _chai.expect)(onDayClick).to.have.property('callCount', 1);
      (0, _chai.expect)(onDayClick.calledWith(day, event)).to.equal(true);
    });
    it('calls onDayClick with the space key', function () {
      var event = {
        key: ' '
      };
      wrapper.instance().onKeyDown(day, event);
      (0, _chai.expect)(onDayClick).to.have.property('callCount', 1);
      (0, _chai.expect)(onDayClick.calledWith(day, event)).to.equal(true);
    });
    it('does not call onDayClick otherwise', function () {
      var event = {
        key: 'Shift'
      };
      wrapper.instance().onKeyDown(day, event);
      (0, _chai.expect)(onDayClick).to.have.property('callCount', 0);
    });
  });
  describe('#componentDidUpdate', function () {
    it('focuses buttonRef after a delay when isFocused, tabIndex is 0, and tabIndex was not 0', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        isFocused: true,
        tabIndex: 0
      })).dive();

      var focus = _sinonSandbox["default"].spy();

      wrapper.instance().buttonRef = {
        focus: focus
      };
      wrapper.instance().componentDidUpdate({
        isFocused: true,
        tabIndex: -1
      });
      (0, _chai.expect)(focus.callCount).to.eq(0);
      return new Promise(function (resolve) {
        (0, _raf["default"])(function () {
          (0, _chai.expect)(focus.callCount).to.eq(1);
          resolve();
        });
      });
    });
  });
  describe('#onDayClick', function () {
    var onDayClickSpy;
    beforeEach(function () {
      onDayClickSpy = _sinonSandbox["default"].spy(_CalendarDay.PureCalendarDay.prototype, 'onDayClick');
    });
    it('gets triggered by click', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], null)).dive();
      wrapper.simulate('click');
      (0, _chai.expect)(onDayClickSpy).to.have.property('callCount', 1);
    });
    it('calls props.onDayClick', function () {
      var onDayClickStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        onDayClick: onDayClickStub
      })).dive();
      wrapper.instance().onDayClick();
      (0, _chai.expect)(onDayClickStub).to.have.property('callCount', 1);
    });
  });
  describe('#onDayMouseEnter', function () {
    var onDayMouseEnterSpy;
    beforeEach(function () {
      onDayMouseEnterSpy = _sinonSandbox["default"].spy(_CalendarDay.PureCalendarDay.prototype, 'onDayMouseEnter');
    });
    it('gets triggered by mouseenter', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], null)).dive();
      wrapper.simulate('mouseenter');
      (0, _chai.expect)(onDayMouseEnterSpy).to.have.property('callCount', 1);
    });
    it('calls props.onDayMouseEnter', function () {
      var onMouseEnterStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        onDayMouseEnter: onMouseEnterStub
      })).dive();
      wrapper.instance().onDayMouseEnter();
      (0, _chai.expect)(onMouseEnterStub).to.have.property('callCount', 1);
    });
  });
  describe('#onDayMouseLeave', function () {
    var onDayMouseLeaveSpy;
    beforeEach(function () {
      onDayMouseLeaveSpy = _sinonSandbox["default"].spy(_CalendarDay.PureCalendarDay.prototype, 'onDayMouseLeave');
    });
    it('gets triggered by mouseleave', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], null)).dive();
      wrapper.simulate('mouseleave');
      (0, _chai.expect)(onDayMouseLeaveSpy).to.have.property('callCount', 1);
    });
    it('calls props.onDayMouseLeave', function () {
      var onMouseLeaveStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], {
        onDayMouseLeave: onMouseLeaveStub
      })).dive();
      wrapper.instance().onDayMouseLeave();
      (0, _chai.expect)(onMouseLeaveStub).to.have.property('callCount', 1);
    });
  });
});