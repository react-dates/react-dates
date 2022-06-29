"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _enzyme = require("enzyme");

var _reactPortal = require("react-portal");

var _DateRangePicker = _interopRequireWildcard(require("../../lib/components/DateRangePicker"));

var _DateRangePickerInputController = _interopRequireDefault(require("../../lib/components/DateRangePickerInputController"));

var _DayPickerRangeController = _interopRequireDefault(require("../../lib/components/DayPickerRangeController"));

var _DayPicker = _interopRequireDefault(require("../../lib/components/DayPicker"));

var _constants = require("../../lib/constants");

var _describeIfWindow = _interopRequireDefault(require("../_helpers/describeIfWindow"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DateRangePickerWrapper = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(DateRangePickerWrapper, _React$Component);

  function DateRangePickerWrapper(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null
    };
    _this.onDatesChange = _this.onDatesChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onFocusChange = _this.onFocusChange.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = DateRangePickerWrapper.prototype;

  _proto.onDatesChange = function onDatesChange(_ref) {
    var startDate = _ref.startDate,
        endDate = _ref.endDate;
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  };

  _proto.onFocusChange = function onFocusChange(focusedInput) {
    this.setState({
      focusedInput: focusedInput
    });
  };

  _proto.render = function render() {
    var _this$state = this.state,
        focusedInput = _this$state.focusedInput,
        startDate = _this$state.startDate,
        endDate = _this$state.endDate;
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, this.props, {
      onDatesChange: this.onDatesChange,
      onFocusChange: this.onFocusChange,
      focusedInput: focusedInput,
      startDate: startDate,
      endDate: endDate
    })), /*#__PURE__*/_react["default"].createElement("button", {
      type: "button"
    }, "Dummy button"));
  };

  return DateRangePickerWrapper;
}(_react["default"].Component);

var requiredProps = {
  onDatesChange: function onDatesChange() {},
  onFocusChange: function onFocusChange() {},
  startDateId: 'startDate',
  endDateId: 'endDate'
};
describe('DateRangePicker', function () {
  describe('#render()', function () {
    it('renders <DateRangePickerInputWithHandlers />', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: _constants.START_DATE
      }))).dive();
      (0, _chai.expect)(wrapper.find(_DateRangePickerInputController["default"])).to.have.length(1);
    });
    it('renders <DayPickerRangeController />', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: _constants.START_DATE
      }))).dive();
      (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"])).to.have.length(1);
    });
    describe('props.orientation === HORIZONTAL_ORIENTATION', function () {
      it('renders <DayPickerRangeController /> with props.numberOfMonths === 2', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          orientation: _constants.HORIZONTAL_ORIENTATION,
          focusedInput: _constants.START_DATE
        }))).dive();
        (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"]).props().numberOfMonths).to.equal(2);
      });
    });
    it('should pass onDayPickerBlur as onBlur to <DayPickerRangeController>', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: _constants.START_DATE
      }))).dive();

      var _wrapper$instance = wrapper.instance(),
          onDayPickerBlur = _wrapper$instance.onDayPickerBlur;

      (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"]).prop('onBlur')).to.equal(onDayPickerBlur);
    });
    describe('props.withPortal is truthy', function () {
      describe('<Portal />', function () {
        it('is rendered', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
            withPortal: true,
            focusedInput: _constants.START_DATE
          }))).dive();
          (0, _chai.expect)(wrapper.find(_reactPortal.Portal)).to.have.length(1);
        });
        it('is not rendered if props.focusedInput === null', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
            focusedInput: null,
            withPortal: true
          }))).dive();
          (0, _chai.expect)(wrapper.find(_reactPortal.Portal)).to.have.length(0);
        });
      });
    });
    describe('props.withFullScreenPortal is truthy', function () {
      it('does not render <DayPickerRangeController>', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          withFullScreenPortal: true
        }))).dive();
        (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"])).to.have.length(0);
      });
      describe('<Portal />', function () {
        it('is rendered', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
            withFullScreenPortal: true,
            focusedInput: _constants.START_DATE
          }))).dive();
          (0, _chai.expect)(wrapper.find(_reactPortal.Portal)).to.have.length(1);
        });
        it('is not rendered if props.focusedInput === null', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
            focusedInput: null,
            withFullScreenPortal: true
          }))).dive();
          (0, _chai.expect)(wrapper.find(_reactPortal.Portal)).to.have.length(0);
        });
      });
    });
    describe('props.isDayBlocked is defined', function () {
      it('should pass props.isDayBlocked to <DateRangePickerInputController>', function () {
        var isDayBlocked = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          isDayBlocked: isDayBlocked
        }))).dive();
        (0, _chai.expect)(wrapper.find(_DateRangePickerInputController["default"]).prop('isDayBlocked')).to.equal(isDayBlocked);
      });
      it('is a noop when omitted', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], requiredProps)).dive();
        (0, _chai.expect)(wrapper.find(_DateRangePickerInputController["default"]).prop('isDayBlocked')).not.to["throw"]();
      });
    });
    describe('props.appendToBody', function () {
      it('renders <DayPickerRangeController> inside <Portal>', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          appendToBody: true,
          focusedInput: _constants.START_DATE
        }))).dive();
        var portal = wrapper.find(_reactPortal.Portal);
        (0, _chai.expect)(portal).to.have.length(1);
        (0, _chai.expect)(portal.find(_DayPickerRangeController["default"])).to.have.length(1);
      });
      (0, _describeIfWindow["default"])('mounted', function () {
        var wrapper;
        var instance;
        var onCloseStub;
        beforeEach(function () {
          onCloseStub = _sinonSandbox["default"].stub();
          wrapper = (0, _enzyme.mount)((0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
            appendToBody: true,
            focusedInput: _constants.START_DATE,
            onClose: onCloseStub
          }))).get(0));
          instance = wrapper.instance();
        });
        it('positions <DateRangePickerInputController> using top and transform CSS properties', function () {
          var dayPickerEl = instance.dayPickerContainer;
          (0, _chai.expect)(dayPickerEl.style.top).not.to.equal('');
          (0, _chai.expect)(dayPickerEl.style.transform).not.to.equal('');
        });
        it('disables scroll', function () {
          (0, _chai.expect)(instance.enableScroll).to.be.a('function');
        });
        it('ignores click events from inside picker', function () {
          var event = {
            target: instance.dayPickerContainer
          };
          instance.onOutsideClick(event);
          (0, _chai.expect)(onCloseStub.callCount).to.equal(0);
        });
        it('enables scroll when closed', function () {
          var enableScrollSpy = _sinonSandbox["default"].spy(instance, 'enableScroll');

          wrapper.setProps({
            focusedInput: null
          });
          (0, _chai.expect)(enableScrollSpy.callCount).to.equal(1);
        });
        it('enables scroll when unmounted', function () {
          var enableScrollSpy = _sinonSandbox["default"].spy(instance, 'enableScroll');

          wrapper.unmount();
          (0, _chai.expect)(enableScrollSpy.callCount).to.equal(1);
        });
      });
    });
    describe('props.focusedInput', function () {
      it('renders <DayPickerRangeController> if props.focusedInput != null', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: _constants.START_DATE
        }))).dive();
        (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"])).to.have.length(1);
      });
      it('does not render <DayPickerRangeController> if props.focusedInput = null', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: null
        }))).dive();
        (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"])).to.have.length(0);
      });
    });
  });
  describe('#onOutsideClick', function () {
    it('does not call props.onFocusChange if props.focusedInput = null', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: null,
        onFocusChange: onFocusChangeStub
      }))).dive();
      wrapper.instance().onOutsideClick();
      (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
    });
    it('calls props.onFocusChange if props.focusedInput != null', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: _constants.START_DATE,
        onFocusChange: onFocusChangeStub
      }))).dive();
      wrapper.instance().onOutsideClick();
      (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
    });
    it('sets state.isDateRangePickerInputFocused to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: _constants.START_DATE,
        onFocusChange: _sinonSandbox["default"].stub(),
        onDatesChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        isDateRangePickerInputFocused: true
      });
      wrapper.instance().onOutsideClick();
      (0, _chai.expect)(wrapper.state().isDateRangePickerInputFocused).to.equal(false);
    });
    it('sets state.isDayPickerFocused to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: _constants.START_DATE,
        onFocusChange: _sinonSandbox["default"].stub(),
        onDatesChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        isDayPickerFocused: true
      });
      wrapper.instance().onOutsideClick();
      (0, _chai.expect)(wrapper.state().isDayPickerFocused).to.equal(false);
    });
    it('sets state.showKeyboardShortcuts to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: _constants.START_DATE,
        onFocusChange: _sinonSandbox["default"].stub(),
        onDatesChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        showKeyboardShortcuts: true
      });
      wrapper.instance().onOutsideClick();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
    it('does not call props.onClose if props.focusedInput = null', function () {
      var onCloseStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        focusedInput: null,
        onClose: onCloseStub,
        onFocusChange: function onFocusChange() {
          return null;
        }
      }))).dive();
      wrapper.instance().onOutsideClick();
      (0, _chai.expect)(onCloseStub.callCount).to.equal(0);
    });
    it('calls props.onClose with startDate and endDate if props.focusedInput != null', function () {
      var startDate = (0, _moment["default"])();
      var endDate = startDate.add(1, 'days');

      var onCloseStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        startDate: startDate,
        endDate: endDate,
        focusedInput: _constants.START_DATE,
        onClose: onCloseStub,
        onFocusChange: function onFocusChange() {
          return null;
        }
      }))).dive();
      wrapper.instance().onOutsideClick();
      (0, _chai.expect)(onCloseStub.callCount).to.equal(1);
      var args = onCloseStub.getCall(0).args[0];
      (0, _chai.expect)(args.startDate).to.equal(startDate);
      (0, _chai.expect)(args.endDate).to.equal(endDate);
    });
  });
  describe('#onDateRangePickerInputFocus', function () {
    it('calls onFocusChange', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: onFocusChangeStub
      }))).dive();
      wrapper.instance().onDateRangePickerInputFocus();
      (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
    });
    it('calls onFocusChange with arg', function () {
      var test = 'foobar';

      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: onFocusChangeStub
      }))).dive();
      wrapper.instance().onDateRangePickerInputFocus(test);
      (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(test);
    });
    describe('new focusedInput is truthy', function () {
      var onDayPickerFocusSpy;
      var onDayPickerBlurSpy;
      beforeEach(function () {
        onDayPickerFocusSpy = _sinonSandbox["default"].spy(_DateRangePicker.PureDateRangePicker.prototype, 'onDayPickerFocus');
        onDayPickerBlurSpy = _sinonSandbox["default"].spy(_DateRangePicker.PureDateRangePicker.prototype, 'onDayPickerBlur');
      });
      afterEach(function () {
        _sinonSandbox["default"].restore();
      });
      it('calls onDayPickerFocus if focusedInput and withPortal/withFullScreenPortal', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          onDatesChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub(),
          withPortal: true
        }))).dive();
        wrapper.instance().onDateRangePickerInputFocus(_constants.START_DATE);
        (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
      });
      it('calls onDayPickerFocus if focusedInput and withFullScreenPortal', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          onDatesChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub(),
          withFullScreenPortal: true
        }))).dive();
        wrapper.instance().onDateRangePickerInputFocus(_constants.START_DATE);
        (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
      });
      it('calls onDayPickerFocus if focusedInput and readOnly', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          onDatesChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub(),
          readOnly: true
        }))).dive();
        wrapper.instance().onDateRangePickerInputFocus(_constants.START_DATE);
        (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
      });
      it('calls onDayPickerFocus if focusedInput and isTouchDevice', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          onDatesChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub()
        }))).dive();
        wrapper.instance().isTouchDevice = true;
        wrapper.instance().onDateRangePickerInputFocus(_constants.START_DATE);
        (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
      });
      it('calls onDayPickerBlur if focusedInput and !withPortal/!withFullScreenPortal/!readOnly and keepFocusOnInput', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          onDateChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub(),
          keepFocusOnInput: true
        }))).dive();
        wrapper.instance().isTouchDevice = true;
        wrapper.instance().onDateRangePickerInputFocus(_constants.START_DATE);
        (0, _chai.expect)(onDayPickerBlurSpy.callCount).to.equal(1);
      });
      it('calls onDayPickerFocus if focusedInput and withPortal/withFullScreenPortal and keepFocusOnInput', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          onDateChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub(),
          keepFocusOnInput: true,
          withFullScreenPortal: true
        }))).dive();
        wrapper.instance().onDateRangePickerInputFocus(_constants.START_DATE);
        (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
      });
      it('calls onDayPickerBlur if focusedInput and !withPortal/!withFullScreenPortal/!readOnly', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          onDatesChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub()
        }))).dive();
        wrapper.instance().onDateRangePickerInputFocus(_constants.START_DATE);
        (0, _chai.expect)(onDayPickerBlurSpy.callCount).to.equal(1);
      });
    });
  });
  describe('#onDayPickerFocus', function () {
    it('sets state.isDateRangePickerInputFocused to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        isDateRangePickerInputFocused: true
      });
      wrapper.instance().onDayPickerFocus();
      (0, _chai.expect)(wrapper.state().isDateRangePickerInputFocused).to.equal(false);
    });
    it('sets state.isDayPickerFocused to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        isDayPickerFocused: false
      });
      wrapper.instance().onDayPickerFocus();
      (0, _chai.expect)(wrapper.state().isDayPickerFocused).to.equal(true);
    });
    it('sets state.showKeyboardShortcuts to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        showKeyboardShortcuts: true
      });
      wrapper.instance().onDayPickerFocus();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
    describe('focusedInput is truthy', function () {
      it('does not call onFocusChange', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: _constants.START_DATE,
          onDatesChange: _sinonSandbox["default"].stub(),
          onFocusChange: onFocusChangeStub
        }))).dive();
        wrapper.instance().onDayPickerFocus();
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
      });
    });
    describe('focusedInput is falsy', function () {
      it('calls onFocusChange', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: null,
          onDatesChange: _sinonSandbox["default"].stub(),
          onFocusChange: onFocusChangeStub
        }))).dive();
        wrapper.instance().onDayPickerFocus();
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
      });
      it('calls onFocusChange with START_DATE as arg', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: null,
          onDatesChange: _sinonSandbox["default"].stub(),
          onFocusChange: onFocusChangeStub
        }))).dive();
        wrapper.instance().onDayPickerFocus();
        (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.START_DATE);
      });
    });
  });
  (0, _describeIfWindow["default"])('day picker position', function () {
    it('day picker is opened after the end date input when end date input is focused', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(DateRangePickerWrapper, {
        startDateId: "startDate",
        endDateId: "endDate"
      }));
      (0, _chai.expect)(wrapper.find(_DayPicker["default"])).to.have.length(0);
      wrapper.find('input').at(0).simulate('focus'); // when focusing on start date the day picker is rendered after the start date input

      (0, _chai.expect)(wrapper.find('DateRangePickerInput').children().childAt(1).find(_DayPicker["default"])).to.have.length(1);
      wrapper.find('input').at(1).simulate('focus'); // when focusing on end date the day picker is rendered after the end date input

      (0, _chai.expect)(wrapper.find('DateRangePickerInput').children().childAt(1).find(_DayPicker["default"])).to.have.length(0);
      (0, _chai.expect)(wrapper.find('DateRangePickerInput').children().childAt(3).find(_DayPicker["default"])).to.have.length(1);
    });
  });
  (0, _describeIfWindow["default"])('#onDayPickerBlur', function () {
    it('sets state.isDateRangePickerInputFocused to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        isDateRangePickerInputFocused: false
      });
      wrapper.instance().onDayPickerBlur();
      (0, _chai.expect)(wrapper.state().isDateRangePickerInputFocused).to.equal(true);
    });
    it('sets state.isDayPickerFocused to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        isDayPickerFocused: true
      });
      wrapper.instance().onDayPickerBlur();
      (0, _chai.expect)(wrapper.state().isDayPickerFocused).to.equal(false);
    });
    it('sets state.showKeyboardShortcuts to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        showKeyboardShortcuts: true
      });
      wrapper.instance().onDayPickerBlur();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
    it('tabbing out with keyboard behaves as an outside click', function () {
      var target = _sinonSandbox["default"].stub();

      var onOutsideClick = _sinonSandbox["default"].stub();

      var dayPickerContainer = {
        addEventListener: _sinonSandbox["default"].stub(),
        contains: _sinonSandbox["default"].stub().returns(false)
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], requiredProps)).dive();
      wrapper.instance().setDayPickerContainerRef(dayPickerContainer);
      wrapper.instance().onOutsideClick = onOutsideClick;
      (0, _chai.expect)(onOutsideClick.callCount).to.equal(0);
      wrapper.instance().onDayPickerFocusOut({
        key: 'Tab',
        shiftKey: false,
        target: target
      });
      (0, _chai.expect)(onOutsideClick.callCount).to.equal(1);
    });
    it('tabbing within itself does not behave as an outside click', function () {
      var target = _sinonSandbox["default"].stub();

      var onOutsideClick = _sinonSandbox["default"].stub();

      var dayPickerContainer = {
        addEventListener: _sinonSandbox["default"].stub(),
        contains: _sinonSandbox["default"].stub().returns(true)
      };
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], requiredProps)).dive();
      wrapper.instance().setDayPickerContainerRef(dayPickerContainer);
      wrapper.instance().onOutsideClick = onOutsideClick;
      wrapper.instance().onDayPickerFocusOut({
        key: 'Tab',
        shiftKey: false,
        target: target
      });
      (0, _chai.expect)(onOutsideClick.callCount).to.equal(0);
    });
  });
  describe('#showKeyboardShortcutsPanel', function () {
    it('sets state.isDateRangePickerInputFocused to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        isDateRangePickerInputFocused: true
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().isDateRangePickerInputFocused).to.equal(false);
    });
    it('sets state.isDayPickerFocused to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        isDayPickerFocused: false
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().isDayPickerFocused).to.equal(true);
    });
    it('sets state.showKeyboardShortcuts to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
        onDatesChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      }))).dive();
      wrapper.setState({
        showKeyboardShortcuts: false
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(true);
    });
  });
  describe('initialVisibleMonth', function () {
    describe('initialVisibleMonth is passed in', function () {
      it('DayPickerRangeController.props.initialVisibleMonth is equal to initialVisibleMonth', function () {
        var initialVisibleMonth = function initialVisibleMonth() {};

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: _constants.START_DATE,
          initialVisibleMonth: initialVisibleMonth
        }))).dive();
        var dayPicker = wrapper.find(_DayPickerRangeController["default"]);
        (0, _chai.expect)(dayPicker.props().initialVisibleMonth).to.equal(initialVisibleMonth);
      });
    });
    describe('initialVisibleMonth is not passed in', function () {
      it('DayPickerRangeController.props.initialVisibleMonth evaluates to startDate', function () {
        var startDate = (0, _moment["default"])().add(10, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: _constants.START_DATE,
          startDate: startDate
        }))).dive();
        var dayPicker = wrapper.find(_DayPickerRangeController["default"]);
        (0, _chai.expect)(dayPicker.props().initialVisibleMonth()).to.equal(startDate);
      });
      it('DayPickerRangeController.props.initialVisibleMonth evaluates to endDate if !startDate', function () {
        var endDate = (0, _moment["default"])().add(5, 'days');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: _constants.START_DATE,
          endDate: endDate
        }))).dive();
        var dayPicker = wrapper.find(_DayPickerRangeController["default"]);
        (0, _chai.expect)(dayPicker.props().initialVisibleMonth()).to.equal(endDate);
      });
      it('DayPickerRangeController.props.initialVisibleMonth evaluates to today if !startDate && !endDate', function () {
        var today = (0, _moment["default"])();
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: _constants.START_DATE
        }))).dive();
        var dayPicker = wrapper.find(_DayPickerRangeController["default"]);
        (0, _chai.expect)(dayPicker.props().initialVisibleMonth().isSame(today, 'day')).to.equal(true);
      });
    });
  });
  describe('dateOffsets', function () {
    describe('startDateOffset is passed in', function () {
      it('Should pass startDateOffset to DayPickerRangeController', function () {
        var startDate = (0, _moment["default"])('2018-10-17');

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          startDateOffset: function startDateOffset(date) {
            return date.subtract(5, 'days');
          },
          onDatesChange: onDatesChangeStub,
          focusedInput: _constants.START_DATE
        }))).dive();
        var dayPicker = wrapper.find(_DayPickerRangeController["default"]);
        var dayPickerStartDateOffset = dayPicker.props().startDateOffset(startDate);
        (0, _chai.expect)(dayPickerStartDateOffset.format()).to.equal(startDate.format());
      });
    });
    describe('endDateOffset is passed in', function () {
      it('Should pass endDateOffset to DayPickerRangeController', function () {
        var endDate = (0, _moment["default"])('2018-10-17', 'YYYY-MM-DD');

        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          endDateOffset: function endDateOffset(date) {
            return date.subtract(5, 'days');
          },
          onDatesChange: onDatesChangeStub,
          focusedInput: _constants.START_DATE
        }))).dive();
        var dayPicker = wrapper.find(_DayPickerRangeController["default"]);
        var dayPickerEndDateOffset = dayPicker.props().endDateOffset(endDate);
        (0, _chai.expect)(dayPickerEndDateOffset.format()).to.equal(endDate.format());
      });
    });
  });
  describe('minDate and maxDate props', function () {
    describe('minDate is passed in', function () {
      it('Should pass minDate to DayPickerRangeController', function () {
        var minDate = (0, _moment["default"])('2018-10-19');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: _constants.START_DATE,
          minDate: minDate
        }))).dive();
        (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"]).props().minDate).to.equal(minDate);
      });
    });
    describe('maxDate is passed in', function () {
      it('Should pass maxDate to DayPickerRangeController', function () {
        var maxDate = (0, _moment["default"])('2018-12-19');
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          focusedInput: _constants.START_DATE,
          maxDate: maxDate
        }))).dive();
        (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"]).props().maxDate).to.equal(maxDate);
      });
    });
  });
  it('should pass noBorder as noBorder to <DayPickerRangeController>', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePicker["default"], (0, _extends2["default"])({}, requiredProps, {
      focusedInput: _constants.START_DATE,
      noBorder: true
    }))).dive();
    (0, _chai.expect)(wrapper.find(_DayPickerRangeController["default"]).prop('noBorder')).to.equal(true);
  });
});