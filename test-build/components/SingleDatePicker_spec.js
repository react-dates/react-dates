"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _reactPortal = require("react-portal");

var _CloseButton = _interopRequireDefault(require("../../lib/components/CloseButton"));

var _DayPickerSingleDateController = _interopRequireDefault(require("../../lib/components/DayPickerSingleDateController"));

var _SingleDatePickerInputController = _interopRequireDefault(require("../../lib/components/SingleDatePickerInputController"));

var _SingleDatePicker = _interopRequireWildcard(require("../../lib/components/SingleDatePicker"));

var _describeIfWindow = _interopRequireDefault(require("../_helpers/describeIfWindow"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('SingleDatePicker', function () {
  afterEach(function () {
    _sinonSandbox["default"].restore();
  });
  describe('#render', function () {
    describe('SingleDatePickerInputController', function () {
      it('renders a SingleDatePickerInputController', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {}
        })).dive();
        (0, _chai.expect)(wrapper.find(_SingleDatePickerInputController["default"])).to.have.lengthOf(1);
      });
      it('renders with a DayPickerSingleDateController child when focused', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          id: "date",
          focused: true
        })).dive();
        (0, _chai.expect)(wrapper.find(_SingleDatePickerInputController["default"])).to.have.property('children');
        (0, _chai.expect)(wrapper.find(_SingleDatePickerInputController["default"]).find(_DayPickerSingleDateController["default"])).to.have.lengthOf(1);
      });
      describe('props.isOutsideRange is defined', function () {
        it('should pass props.isOutsideRange to <SingleDatePickerInputController>', function () {
          var isOutsideRange = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            id: "date",
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            isOutsideRange: isOutsideRange
          })).dive();
          (0, _chai.expect)(wrapper.find(_SingleDatePickerInputController["default"]).prop('isOutsideRange')).to.equal(isOutsideRange);
        });
      });
      describe('props.isDayBlocked is defined', function () {
        it('should pass props.isDayBlocked to <SingleDatePickerInputController>', function () {
          var isDayBlocked = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            id: "date",
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            isDayBlocked: isDayBlocked
          })).dive();
          (0, _chai.expect)(wrapper.find(_SingleDatePickerInputController["default"]).prop('isDayBlocked')).to.equal(isDayBlocked);
        });
      });
    });
    describe('DayPickerSingleDateController', function () {
      describe('props.focused === true', function () {
        it('renders a <DayPickerSingleDateController>', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            id: "date",
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            focused: true
          })).dive();
          (0, _chai.expect)(wrapper.find(_DayPickerSingleDateController["default"])).to.have.lengthOf(1);
        });
      });
      describe('props.focused === false', function () {
        it('does not render a <DayPickerSingleDateController>', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            id: "date",
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            focused: false
          })).dive();
          (0, _chai.expect)(wrapper.find(_DayPickerSingleDateController["default"])).to.have.lengthOf(0);
        });
      });
      describe('props.onClose is defined', function () {
        it('should pass props.onClose in to <DayPickerSingleDateController>', function () {
          var onCloseStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            id: "date",
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            focused: true,
            onClose: onCloseStub
          })).dive();
          (0, _chai.expect)(wrapper.find(_DayPickerSingleDateController["default"]).prop('onClose')).to.equal(onCloseStub);
        });
      });
      it('should pass onDayPickerBlur as onBlur to <DayPickerSingleDateController>', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          focused: true
        })).dive();

        var _wrapper$instance = wrapper.instance(),
            onDayPickerBlur = _wrapper$instance.onDayPickerBlur;

        (0, _chai.expect)(wrapper.find(_DayPickerSingleDateController["default"]).prop('onBlur')).to.equal(onDayPickerBlur);
      });
    });
    describe('props.withPortal is truthy', function () {
      describe('<Portal />', function () {
        it('is rendered', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            withPortal: true,
            focused: true
          })).dive();
          (0, _chai.expect)(wrapper.find(_reactPortal.Portal)).to.have.length(1);
        });
        it('is not rendered if props.focused is falsy', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            withPortal: true
          })).dive();
          (0, _chai.expect)(wrapper.find(_reactPortal.Portal)).to.have.length(0);
        });
      });
    });
    describe('props.withFullScreenPortal is truthy', function () {
      it('renders CloseButton', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          withFullScreenPortal: true,
          focused: true
        })).dive();
        (0, _chai.expect)(wrapper.find(_CloseButton["default"])).to.have.length(1);
      });
      describe('<Portal />', function () {
        it('is rendered', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            withFullScreenPortal: true,
            focused: true
          })).dive();
          (0, _chai.expect)(wrapper.find(_reactPortal.Portal)).to.have.length(1);
        });
        it('is not rendered when props.focused is falsy', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
            onDateChange: function onDateChange() {},
            onFocusChange: function onFocusChange() {},
            withFullScreenPortal: true
          })).dive();
          (0, _chai.expect)(wrapper.find(_reactPortal.Portal)).to.have.length(0);
        });
      });
    });
    describe('props.appendToBody', function () {
      var requiredProps = {
        onDateChange: function onDateChange() {},
        onFocusChange: function onFocusChange() {}
      };
      it('renders <DayPickerSingleDateController> inside <Portal>', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], (0, _extends2["default"])({}, requiredProps, {
          appendToBody: true,
          focused: true
        }))).dive();
        var portal = wrapper.find(_reactPortal.Portal);
        (0, _chai.expect)(portal).to.have.length(1);
        (0, _chai.expect)(portal.find(_DayPickerSingleDateController["default"])).to.have.length(1);
      });
      (0, _describeIfWindow["default"])('mounted', function () {
        var wrapper;
        var instance;
        var onCloseStub;
        beforeEach(function () {
          onCloseStub = _sinonSandbox["default"].stub();
          wrapper = (0, _enzyme.mount)((0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], (0, _extends2["default"])({}, requiredProps, {
            appendToBody: true,
            focused: true,
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
            focused: false
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
  });
  describe('#onInputFocus', function () {
    var onDayPickerFocusSpy;
    var onDayPickerBlurSpy;
    beforeEach(function () {
      onDayPickerFocusSpy = _sinonSandbox["default"].spy(_SingleDatePicker.PureSingleDatePicker.prototype, 'onDayPickerFocus');
      onDayPickerBlurSpy = _sinonSandbox["default"].spy(_SingleDatePicker.PureSingleDatePicker.prototype, 'onDayPickerBlur');
    });
    it('calls props.onFocusChange once', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        id: "date",
        onDateChange: function onDateChange() {},
        onFocusChange: onFocusChangeStub
      })).dive();
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
    });
    it('calls props.onFocusChange with { focused: true } as arg', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        id: "date",
        onDateChange: function onDateChange() {},
        onFocusChange: onFocusChangeStub
      })).dive();
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0].focused).to.equal(true);
    });
    it('calls onDayPickerFocus if withPortal', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        withPortal: true
      })).dive();
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
    });
    it('calls onDayPickerFocus if withFullScreenPortal', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        withFullScreenPortal: true
      })).dive();
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
    });
    it('calls onDayPickerFocus if readOnly', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        readOnly: true
      })).dive();
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
    });
    it('calls onDayPickerFocus if isTouchDevice', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.instance().isTouchDevice = true;
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
    });
    it('calls onDayPickerBlur if isTouchDevice and keepFocusOnInput', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        keepFocusOnInput: true
      })).dive();
      wrapper.instance().isTouchDevice = true;
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerBlurSpy.callCount).to.equal(1);
    });
    it('calls onDayPickerBlur if !withPortal/!withFullScreenPortal and keepFocusOnInput', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        keepFocusOnInput: true
      })).dive();
      wrapper.instance().isTouchDevice = true;
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerBlurSpy.callCount).to.equal(1);
    });
    it('calls onDayPickerFocus if withPortal/withFullScreenPortal and keepFocusOnInput', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        keepFocusOnInput: true,
        withFullScreenPortal: true
      })).dive();
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
    });
    it('calls onDayPickerFocus if readOnly and keepFocusOnInput', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub(),
        keepFocusOnInput: true,
        withFullScreenPortal: true
      })).dive();
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerFocusSpy.callCount).to.equal(1);
    });
    it('calls onDayPickerBlur if !withPortal/!withFullScreenPortal/!readOnly', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.instance().onInputFocus({
        focused: true
      });
      (0, _chai.expect)(onDayPickerBlurSpy.callCount).to.equal(1);
    });
  });
  describe('#onOutsideClick', function () {
    describe('props.focused = false', function () {
      it('does not call props.onFocusChange', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          focused: false
        })).dive();
        wrapper.instance().onOutsideClick();
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
      });
    });
    describe('props.focused = true', function () {
      it('sets state.isDayPickerFocused to false', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          onDateChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub(),
          focused: true
        })).dive();
        wrapper.setState({
          isDayPickerFocused: true
        });
        wrapper.instance().onOutsideClick();
        (0, _chai.expect)(wrapper.state().isDayPickerFocused).to.equal(false);
      });
      it('sets state.isInputFocused to false', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          onDateChange: _sinonSandbox["default"].stub(),
          onFocusChange: _sinonSandbox["default"].stub(),
          focused: true
        })).dive();
        wrapper.setState({
          isInputFocused: true
        });
        wrapper.instance().onOutsideClick();
        (0, _chai.expect)(wrapper.state().isInputFocused).to.equal(false);
      });
      it('calls props.onFocusChange once', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          focused: true
        })).dive();
        wrapper.instance().onOutsideClick();
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
      });
      it('calls props.onFocusChange with { focused: false } as arg', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          focused: true
        })).dive();
        wrapper.instance().onOutsideClick();
        (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
      it('calls props.onClose with { date: "08-06-2019" } as arg', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var onCloseStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
          id: "date",
          onClose: onCloseStub,
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          focused: true,
          date: "08-06-2019"
        })).dive();
        wrapper.instance().onOutsideClick();
        (0, _chai.expect)(onCloseStub.getCall(0).args[0].date).to.equal('08-06-2019');
      });
    });
  });
  describe('#onDayPickerFocus', function () {
    it('sets state.isDayPickerFocused to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        isDayPickerFocused: false
      });
      wrapper.instance().onDayPickerFocus();
      (0, _chai.expect)(wrapper.state().isDayPickerFocused).to.equal(true);
    });
    it('sets state.isInputFocused to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        isInputFocused: true
      });
      wrapper.instance().onDayPickerFocus();
      (0, _chai.expect)(wrapper.state().isInputFocused).to.equal(false);
    });
    it('sets state.showKeyboardShortcuts to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        showKeyboardShortcuts: true
      });
      wrapper.instance().onDayPickerFocus();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
  });
  describe('#onDayPickerBlur', function () {
    it('sets state.isDayPickerFocused to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        isDayPickerFocused: true
      });
      wrapper.instance().onDayPickerBlur();
      (0, _chai.expect)(wrapper.state().isDayPickerFocused).to.equal(false);
    });
    it('sets state.isInputFocused to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        isInputFocused: false
      });
      wrapper.instance().onDayPickerBlur();
      (0, _chai.expect)(wrapper.state().isInputFocused).to.equal(true);
    });
    it('sets state.showKeyboardShortcuts to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        showKeyboardShortcuts: true
      });
      wrapper.instance().onDayPickerBlur();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
  });
  describe('#showKeyboardShortcutsPanel', function () {
    it('sets state.isInputFocused to false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        isInputFocused: true
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().isInputFocused).to.equal(false);
    });
    it('sets state.isDayPickerFocused to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        isDayPickerFocused: false
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().isDayPickerFocused).to.equal(true);
    });
    it('sets state.showKeyboardShortcuts to true', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        onDateChange: _sinonSandbox["default"].stub(),
        onFocusChange: _sinonSandbox["default"].stub()
      })).dive();
      wrapper.setState({
        showKeyboardShortcuts: false
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      (0, _chai.expect)(wrapper.state().showKeyboardShortcuts).to.equal(true);
    });
  });
  (0, _describeIfWindow["default"])('#onFocusOut', function () {
    var wrapper;
    var ctrl;
    var onFocusChangeStub;
    var dpcContainsStub;
    beforeEach(function () {
      onFocusChangeStub = _sinonSandbox["default"].stub();
      dpcContainsStub = _sinonSandbox["default"].stub();
      wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePicker["default"], {
        id: "date",
        onFocusChange: onFocusChangeStub
      })).dive();
      ctrl = wrapper.instance();
      ctrl.dayPickerContainer = {
        contains: dpcContainsStub.returns(true)
      };
    });
    afterEach(function () {
      onFocusChangeStub.reset();
      dpcContainsStub.reset();
    });
    it('calls props.onFocusChange with focused: false when dayPickerContainer does not contain the target', function () {
      dpcContainsStub.returns(false);
      ctrl.onFocusOut({});
      (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
      (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.deep.equal({
        focused: false
      });
    });
    it('should not call props.onFocusChange when dayPickerContainer contains the target', function () {
      ctrl.onFocusOut({});
      (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
    });
    it('should check the target when related target is the same as the document body', function () {
      var event = {
        relatedTarget: document.body,
        target: 'target'
      };
      ctrl.onFocusOut(event);
      (0, _chai.expect)(dpcContainsStub.getCall(0).args[0]).to.equal(event.target);
    });
    it('should check the target when related target is defined', function () {
      var event = {
        relatedTarget: 'related target',
        target: 'target'
      };
      ctrl.onFocusOut(event);
      (0, _chai.expect)(dpcContainsStub.getCall(0).args[0]).to.equal(event.relatedTarget);
    });
    it('should check the target when related target is not defined', function () {
      var event = {
        relatedTarget: undefined,
        target: 'target'
      };
      ctrl.onFocusOut(event);
      (0, _chai.expect)(dpcContainsStub.getCall(0).args[0]).to.equal(event.target);
    });
  });
});