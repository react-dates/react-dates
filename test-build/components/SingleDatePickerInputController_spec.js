"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _moment = _interopRequireDefault(require("moment"));

var _SingleDatePickerInput = _interopRequireDefault(require("../../lib/components/SingleDatePickerInput"));

var _SingleDatePickerInputController = _interopRequireDefault(require("../../lib/components/SingleDatePickerInputController"));

var _isSameDay = _interopRequireDefault(require("../../lib/utils/isSameDay"));

// Set to noon to mimic how days in the picker are configured internally
var today = (0, _moment["default"])().startOf('day').hours(12);
describe('SingleDatePickerInputController', function () {
  afterEach(function () {
    _sinonSandbox["default"].restore();
  });
  it('renders a SingleDatePickerInput', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
      id: "date",
      onDateChange: function onDateChange() {},
      onFocusChange: function onFocusChange() {}
    }));
    (0, _chai.expect)(wrapper.find(_SingleDatePickerInput["default"])).to.have.lengthOf(1);
  });
  it('should pass children to the SingleDatePickerInput', function () {
    var Child = function Child() {
      return /*#__PURE__*/_react["default"].createElement("div", null, "CHILD");
    };

    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
      id: "date"
    }, /*#__PURE__*/_react["default"].createElement(Child, null)));
    (0, _chai.expect)(wrapper.find(_SingleDatePickerInput["default"])).to.have.property('children');
    (0, _chai.expect)(wrapper.find(Child)).to.have.lengthOf(1);
  });
  describe('#onChange', function () {
    describe('valid future date string', function () {
      var futureDateString = (0, _moment["default"])().add(10, 'days').format('YYYY-MM-DD');
      it('calls props.onDateChange once', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.instance().onChange(futureDateString);
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDateChange with date as arg', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.instance().onChange(futureDateString);
        var newDate = onDateChangeStub.getCall(0).args[0];
        (0, _chai.expect)((0, _isSameDay["default"])(newDate, (0, _moment["default"])(futureDateString))).to.equal(true);
      });
      it('calls props.onFocusChange once', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onChange(futureDateString);
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
      });
      it('calls props.onFocusChange with { focused: false } as arg', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onChange(futureDateString);
        (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
      it('calls props.onClose once', function () {
        var onCloseStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          onClose: onCloseStub
        }));
        wrapper.instance().onChange(futureDateString);
        (0, _chai.expect)(onCloseStub.callCount).to.equal(1);
      });
      it('calls props.onClose with { date } as arg', function () {
        var onCloseStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: function onFocusChange() {},
          onClose: onCloseStub
        }));
        wrapper.instance().onChange(futureDateString);
        var newDate = onCloseStub.getCall(0).args[0].date;
        (0, _chai.expect)((0, _isSameDay["default"])(newDate, (0, _moment["default"])(futureDateString))).to.equal(true);
      });
    });
    describe('matches custom display format', function () {
      var customFormat = 'YY|MM[foobar]DD';
      var customFormatDateString = (0, _moment["default"])().add(5, 'days').format(customFormat);
      it('calls props.onDateChange once', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          displayFormat: customFormat,
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.instance().onChange(customFormatDateString);
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDateChange with date as arg', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          displayFormat: customFormat,
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.instance().onChange(customFormatDateString);
        var formattedFirstArg = onDateChangeStub.getCall(0).args[0].format(customFormat);
        (0, _chai.expect)(formattedFirstArg).to.equal(customFormatDateString);
      });
      it('calls props.onFocusChange once', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          displayFormat: customFormat,
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onChange(customFormatDateString);
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
      });
      it('calls props.onFocusChange with { focused: false } as arg', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          displayFormat: customFormat,
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onChange(customFormatDateString);
        (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });
    describe('invalid date string', function () {
      var invalidDateString = 'foobar';
      it('calls props.onDateChange once', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.instance().onChange(invalidDateString);
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDateChange with null as arg', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {}
        }));
        wrapper.instance().onChange(invalidDateString);
        (0, _chai.expect)(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });
      it('does not call props.onFocusChange', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onChange(invalidDateString);
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
      });
    });
    describe('date string outside range', function () {
      var isOutsideRangeStub = _sinonSandbox["default"].stub().returns(true);

      var todayDateString = today.format('DD/MM/YYYY');
      it('calls props.onDateChange once', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {},
          isOutsideRange: isOutsideRangeStub
        }));
        wrapper.instance().onChange(todayDateString);
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDateChange with null as arg', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {},
          isOutsideRange: isOutsideRangeStub
        }));
        wrapper.instance().onChange(todayDateString);
        (0, _chai.expect)(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });
      it('does not call props.onFocusChange', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          isOutsideRange: isOutsideRangeStub
        }));
        wrapper.instance().onChange(todayDateString);
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
      });
    });
    describe('date string is blocked', function () {
      var isDayBlocked = _sinonSandbox["default"].stub().returns(true);

      var todayDateString = today.format('DD/MM/YYYY');
      it('calls props.onDateChange once', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {},
          isDayBlocked: isDayBlocked
        }));
        wrapper.instance().onChange(todayDateString);
        (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDateChange with null as arg', function () {
        var onDateChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: onDateChangeStub,
          onFocusChange: function onFocusChange() {},
          isDayBlocked: isDayBlocked
        }));
        wrapper.instance().onChange(todayDateString);
        (0, _chai.expect)(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });
    });
  });
  describe('#onFocus', function () {
    it('calls props.onFocusChange once', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
        id: "date",
        onDateChange: function onDateChange() {},
        onFocusChange: onFocusChangeStub
      }));
      wrapper.instance().onFocus();
      (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
    });
    it('calls props.onFocusChange with { focused: true } as arg', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
        id: "date",
        onDateChange: function onDateChange() {},
        onFocusChange: onFocusChangeStub
      }));
      wrapper.instance().onFocus();
      (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0].focused).to.equal(true);
    });
    describe('props.disabled = true', function () {
      it('does not call props.onFocusChange', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          disabled: true,
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onFocus();
        (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 0);
      });
    });
  });
  describe('#onClearFocus', function () {
    describe('props.focused = false', function () {
      it('does not call props.onFocusChange', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          focused: false
        }));
        wrapper.instance().onClearFocus();
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
      });
    });
    describe('props.focused = true', function () {
      it('calls props.onFocusChange once', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          focused: true
        }));
        wrapper.instance().onClearFocus();
        (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
      });
      it('calls props.onFocusChange with { focused: false } as arg', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
          id: "date",
          onDateChange: function onDateChange() {},
          onFocusChange: onFocusChangeStub,
          focused: true
        }));
        wrapper.instance().onClearFocus();
        (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });
  });
  describe('#clearDate', function () {
    describe('props.reopenPickerOnClearDate is truthy', function () {
      describe('props.onFocusChange', function () {
        it('is called once', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
            id: "date",
            onDateChange: function onDateChange() {},
            onFocusChange: onFocusChangeStub,
            reopenPickerOnClearDate: true
          }));
          wrapper.instance().clearDate();
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
        });
      });
    });
    describe('props.reopenPickerOnClearDate is falsy', function () {
      describe('props.onFocusChange', function () {
        it('is not called', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
            id: "date",
            onDateChange: function onDateChange() {},
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().clearDate();
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
        });
      });
    });
    it('calls props.onDateChange with null date', function () {
      var onDateChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInputController["default"], {
        id: "date",
        onDateChange: onDateChangeStub,
        onFocusChange: function onFocusChange() {}
      }));
      wrapper.instance().clearDate();
      (0, _chai.expect)(onDateChangeStub.callCount).to.equal(1);
    });
  });
});