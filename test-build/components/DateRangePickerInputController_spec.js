"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _moment = _interopRequireDefault(require("moment"));

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _enzyme = require("enzyme");

var _DateRangePickerInputController = _interopRequireDefault(require("../../lib/components/DateRangePickerInputController"));

var _DateRangePickerInput = _interopRequireDefault(require("../../lib/components/DateRangePickerInput"));

var _isSameDay = _interopRequireDefault(require("../../lib/utils/isSameDay"));

var _constants = require("../../lib/constants");

// Set to noon to mimic how days in the picker are configured internally
var today = (0, _moment["default"])().startOf('day').hours(12);
describe('DateRangePickerInputController', function () {
  describe('#render', function () {
    it('renders a DateRangePickerInput', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], null));
      (0, _chai.expect)(wrapper.find(_DateRangePickerInput["default"])).to.have.lengthOf(1);
    });
    it('should pass children to DateRangePickerInput when provided', function () {
      var Child = function Child() {
        return /*#__PURE__*/_react["default"].createElement("div", null, "CHILD");
      };

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], null, /*#__PURE__*/_react["default"].createElement(Child, null)));
      (0, _chai.expect)(wrapper.find(_DateRangePickerInput["default"])).to.have.property('children');
      (0, _chai.expect)(wrapper.find(Child)).to.have.lengthOf(1);
    });
  });
  describe('#clearDates', function () {
    describe('props.reopenPickerOnClearDates is truthy', function () {
      describe('props.onFocusChange', function () {
        it('is called once', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onFocusChange: onFocusChangeStub,
            reopenPickerOnClearDates: true
          }));
          wrapper.instance().clearDates();
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
        });
        it('is called with arg START_DATE', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onFocusChange: onFocusChangeStub,
            reopenPickerOnClearDates: true
          }));
          wrapper.instance().clearDates();
          (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.START_DATE);
        });
      });
    });
    describe('props.reopenPickerOnClearDates is falsy', function () {
      describe('props.onFocusChange', function () {
        it('is not called', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().clearDates();
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
        });
      });
    });
    it('calls props.onDatesChange with arg { startDate: null, endDate: null }', function () {
      var onDatesChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
        onDatesChange: onDatesChangeStub
      }));
      wrapper.instance().clearDates();
      (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
    });
  });
  describe('#onClearFocus', function () {
    it('calls props.onFocusChange', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
        onFocusChange: onFocusChangeStub
      }));
      wrapper.instance().onClearFocus();
      (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
    });
    it('calls props.onFocusChange with null arg', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
        onFocusChange: onFocusChangeStub
      }));
      wrapper.instance().onClearFocus();
      (0, _chai.expect)(onFocusChangeStub.calledWith(null)).to.equal(true);
    });
    it('calls props.onClose with startDate and endDate args', function () {
      var onCloseStub = _sinonSandbox["default"].stub();

      var endDate = (0, _moment["default"])(today).add(1, 'days');
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
        onFocusChange: function onFocusChange() {
          return null;
        },
        onClose: onCloseStub,
        startDate: today,
        endDate: endDate
      }));
      wrapper.instance().onClearFocus();
      var args = onCloseStub.getCall(0).args[0];
      (0, _chai.expect)(args.startDate).to.equal(today);
      (0, _chai.expect)(args.endDate).to.equal(endDate);
    });
  });
  describe('#onEndDateChange', function () {
    describe('is a valid end date', function () {
      var validFutureDateString = (0, _moment["default"])(today).add(10, 'days').format('YYYY-MM-DD');
      describe('when props.startDate is not provided', function () {
        it('calls props.onDatesChange with provided end date', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onDatesChange: onDatesChangeStub
          }));
          wrapper.instance().onEndDateChange(validFutureDateString);
          (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);

          var _onDatesChangeStub$ge = (0, _slicedToArray2["default"])(onDatesChangeStub.getCall(0).args, 1),
              _onDatesChangeStub$ge2 = _onDatesChangeStub$ge[0],
              startDate = _onDatesChangeStub$ge2.startDate,
              endDate = _onDatesChangeStub$ge2.endDate;

          (0, _chai.expect)(startDate).to.equal(wrapper.props().startDate);
          (0, _chai.expect)((0, _isSameDay["default"])(endDate, (0, _moment["default"])(validFutureDateString))).to.equal(true);
        });
        describe('props.onFocusChange', function () {
          it('is called once', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
          });
          it('is called with null arg', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });
      describe('is before props.startDate', function () {
        var startDate = (0, _moment["default"])(today).add(15, 'days');
        it('calls props.onDatesChange with props.startDate and null end date', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onDatesChange: onDatesChangeStub,
            startDate: startDate
          }));
          wrapper.instance().onEndDateChange(validFutureDateString);
          (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
          var onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          (0, _chai.expect)(onDatesChangeArgs.startDate).to.equal(startDate);
          (0, _chai.expect)(onDatesChangeArgs.endDate).to.equal(null);
        });
        describe('props.onFocusChange', function () {
          it('is called once', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
          });
          it('is called with null arg', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });
      describe('is after props.startDate', function () {
        var startDate = (0, _moment["default"])(today);
        it('calls props.onDatesChange with props.startDate and provided end date', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onDatesChange: onDatesChangeStub,
            startDate: startDate
          }));
          wrapper.instance().onEndDateChange(validFutureDateString);
          (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
          var onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          var futureDate = (0, _moment["default"])(validFutureDateString);
          (0, _chai.expect)(onDatesChangeArgs.startDate).to.equal(startDate);
          (0, _chai.expect)((0, _isSameDay["default"])(onDatesChangeArgs.endDate, futureDate)).to.equal(true);
        });
        it('calls props.onClose with props.startDate and provided end date', function () {
          var onCloseStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onClose: onCloseStub,
            startDate: startDate
          }));
          wrapper.instance().onEndDateChange(validFutureDateString);
          (0, _chai.expect)(onCloseStub).to.have.property('callCount', 1);

          var _onCloseStub$getCall$ = (0, _slicedToArray2["default"])(onCloseStub.getCall(0).args, 1),
              onCloseArgs = _onCloseStub$getCall$[0];

          var futureDate = (0, _moment["default"])(validFutureDateString);
          (0, _chai.expect)(onCloseArgs).to.have.property('startDate', startDate);
          (0, _chai.expect)((0, _isSameDay["default"])(onCloseArgs.endDate, futureDate)).to.equal(true);
        });
        describe('props.onFocusChange', function () {
          it('is called once', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
          });
          it('is called with null arg', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });
      describe('is the same day as props.startDate', function () {
        var startDate = (0, _moment["default"])(today).add(10, 'days');
        describe('props.minimumNights is 0', function () {
          it('calls props.onDatesChange with props.startDate and provided end date', function () {
            var onDatesChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onDatesChange: onDatesChangeStub,
              startDate: startDate,
              minimumNights: 0
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
            var onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            var futureDate = (0, _moment["default"])(validFutureDateString);
            (0, _chai.expect)(onDatesChangeArgs.startDate).to.equal(startDate);
            (0, _chai.expect)((0, _isSameDay["default"])(onDatesChangeArgs.endDate, futureDate)).to.equal(true);
          });
        });
        describe('props.minimumNights is greater than 0', function () {
          it('calls props.onDatesChange with props.startDate and null end date', function () {
            var onDatesChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onDatesChange: onDatesChangeStub,
              startDate: startDate,
              minimumNights: 1
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
            var onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            (0, _chai.expect)(onDatesChangeArgs.startDate).to.equal(startDate);
            (0, _chai.expect)(onDatesChangeArgs.endDate).to.equal(null);
          });
        });
        describe('props.onFocusChange', function () {
          it('is called once', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
          });
          it('is called with null arg', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub
            }));
            wrapper.instance().onEndDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });
    });
    describe('matches custom display format', function () {
      var customFormat = 'YY|MM[foobar]DD';
      var customFormatDateString = (0, _moment["default"])(today).add(5, 'days').format(customFormat);
      it('calls props.onDatesChange with correct arguments', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          displayFormat: customFormat,
          onDatesChange: onDatesChangeStub
        }));
        wrapper.instance().onEndDateChange(customFormatDateString);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
        var _onDatesChangeStub$ge3 = onDatesChangeStub.getCall(0).args[0],
            startDate = _onDatesChangeStub$ge3.startDate,
            endDate = _onDatesChangeStub$ge3.endDate;
        (0, _chai.expect)(startDate).to.equal(wrapper.instance().props.startDate);
        (0, _chai.expect)(endDate.format(customFormat)).to.equal(customFormatDateString);
      });
      describe('props.onFocusChange', function () {
        it('is called once', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            displayFormat: customFormat,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onEndDateChange(customFormatDateString);
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
        });
        it('is called with null arg', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            displayFormat: customFormat,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onEndDateChange(customFormatDateString);
          (0, _chai.expect)(onFocusChangeStub.calledWith(null)).to.equal(true);
        });
      });
    });
    describe('is not a valid date string', function () {
      var invalidDateString = 'foo';
      it('calls props.onDatesChange', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub
        }));
        wrapper.instance().onEndDateChange(invalidDateString);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDatesChange with startDate === props.startDate', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: today
        }));
        wrapper.instance().onEndDateChange(invalidDateString);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate).to.equal(today);
      });
      it('calls props.onDatesChange with endDate === null', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub
        }));
        wrapper.instance().onEndDateChange(invalidDateString);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.endDate).to.equal(null);
      });
    });
    describe('is outside range', function () {
      var futureDate = (0, _moment["default"])().add(7, 'day').toISOString();

      var isOutsideRange = function isOutsideRange(day) {
        return day >= (0, _moment["default"])().add(3, 'day');
      };

      it('calls props.onDatesChange', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          isOutsideRange: isOutsideRange
        }));
        wrapper.instance().onEndDateChange(futureDate);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDatesChange with startDate === props.startDate', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: today,
          isOutsideRange: isOutsideRange
        }));
        wrapper.instance().onEndDateChange(futureDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate).to.equal(today);
      });
      it('calls props.onDatesChange with endDate === null', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          isOutsideRange: isOutsideRange
        }));
        wrapper.instance().onEndDateChange(futureDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.endDate).to.equal(null);
      });
    });
    describe('is blocked', function () {
      var futureDate = (0, _moment["default"])().add(7, 'days').format('DD/MM/YYYY');

      var isDayBlocked = _sinonSandbox["default"].stub().returns(true);

      it('calls props.onDatesChange', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          isDayBlocked: isDayBlocked
        }));
        wrapper.instance().onEndDateChange(futureDate);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDatesChange with endDate === null', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: today,
          isDayBlocked: isDayBlocked
        }));
        wrapper.instance().onEndDateChange(futureDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.endDate).to.equal(null);
      });
    });
    describe('is inclusively before state.startDate', function () {
      var startDate = (0, _moment["default"])(today).add(10, 'days');
      var beforeStartDateString = today.toISOString();
      it('calls props.onDatesChange', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: startDate
        }));
        wrapper.instance().onEndDateChange(beforeStartDateString);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDatesChange with startDate === props.startDate', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: startDate
        }));
        wrapper.instance().onEndDateChange(beforeStartDateString);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate).to.equal(startDate);
      });
      it('calls props.onDatesChange with endDate === null', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: startDate
        }));
        wrapper.instance().onEndDateChange(beforeStartDateString);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.endDate).to.equal(null);
      });
    });
  });
  describe('#onStartDateChange', function () {
    describe('is a valid start date', function () {
      var validFutureDateString = (0, _moment["default"])(today).add(5, 'days').format('YYYY-MM-DD');
      describe('is before props.endDate', function () {
        var endDate = (0, _moment["default"])(today).add(10, 'days');
        it('calls props.onDatesChange provided start date and props.endDate', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onDatesChange: onDatesChangeStub,
            endDate: endDate
          }));
          wrapper.instance().onStartDateChange(validFutureDateString);
          (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
          var onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          var futureDate = (0, _moment["default"])(validFutureDateString);
          (0, _chai.expect)((0, _isSameDay["default"])(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
          (0, _chai.expect)(onDatesChangeArgs.endDate).to.equal(endDate);
        });
        describe('props.onFocusChange', function () {
          it('is called once', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub,
              endDate: endDate
            }));
            wrapper.instance().onStartDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
          });
          it('is called with END_DATE arg', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub,
              endDate: endDate
            }));
            wrapper.instance().onStartDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.calledWith(_constants.END_DATE)).to.equal(true);
          });
        });
      });
      describe('is after props.endDate', function () {
        var endDate = (0, _moment["default"])(today);
        it('calls props.onDatesChange with provided start date and null end date', function () {
          var onDatesChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            onDatesChange: onDatesChangeStub,
            endDate: endDate
          }));
          wrapper.instance().onStartDateChange(validFutureDateString);
          (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
          var onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          var futureDate = (0, _moment["default"])(validFutureDateString);
          (0, _chai.expect)((0, _isSameDay["default"])(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
          (0, _chai.expect)(onDatesChangeArgs.endDate).to.equal(null);
        });
        describe('props.onFocusChange', function () {
          it('is called once', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub,
              endDate: endDate
            }));
            wrapper.instance().onStartDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
          });
          it('is called with END_DATE arg', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub,
              endDate: endDate
            }));
            wrapper.instance().onStartDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.calledWith(_constants.END_DATE)).to.equal(true);
          });
        });
      });
      describe('is the same day as props.endDate', function () {
        var endDate = (0, _moment["default"])(today).add(5, 'days');
        describe('props.minimumNights is 0', function () {
          it('calls props.onDatesChange with provided start date and props.endDate', function () {
            var onDatesChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onDatesChange: onDatesChangeStub,
              endDate: endDate,
              minimumNights: 0
            }));
            wrapper.instance().onStartDateChange(validFutureDateString);
            (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
            var onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            var futureDate = (0, _moment["default"])(validFutureDateString);
            (0, _chai.expect)((0, _isSameDay["default"])(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
            (0, _chai.expect)(onDatesChangeArgs.endDate).to.equal(endDate);
          });
        });
        describe('props.minimumNights is greater than 0', function () {
          it('calls props.onDatesChange with provided start date and null end date', function () {
            var onDatesChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onDatesChange: onDatesChangeStub,
              endDate: endDate,
              minimumNights: 1
            }));
            wrapper.instance().onStartDateChange(validFutureDateString);
            (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
            var onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            var futureDate = (0, _moment["default"])(validFutureDateString);
            (0, _chai.expect)((0, _isSameDay["default"])(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
            (0, _chai.expect)(onDatesChangeArgs.endDate).to.equal(null);
          });
        });
        describe('props.onFocusChange', function () {
          it('is called once', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub,
              endDate: endDate
            }));
            wrapper.instance().onStartDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
          });
          it('is called with END_DATE arg', function () {
            var onFocusChangeStub = _sinonSandbox["default"].stub();

            var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
              onFocusChange: onFocusChangeStub,
              endDate: endDate
            }));
            wrapper.instance().onStartDateChange(validFutureDateString);
            (0, _chai.expect)(onFocusChangeStub.calledWith(_constants.END_DATE)).to.equal(true);
          });
        });
      });
    });
    describe('matches custom display format', function () {
      var customFormat = 'YY|MM[foobar]DD';
      var customFormatDateString = (0, _moment["default"])(today).add(5, 'days').format(customFormat);
      it('calls props.onDatesChange with correct arguments', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          displayFormat: customFormat,
          onDatesChange: onDatesChangeStub
        }));
        wrapper.instance().onStartDateChange(customFormatDateString);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
        var _onDatesChangeStub$ge4 = onDatesChangeStub.getCall(0).args[0],
            startDate = _onDatesChangeStub$ge4.startDate,
            endDate = _onDatesChangeStub$ge4.endDate;
        (0, _chai.expect)(startDate.format(customFormat)).to.equal(customFormatDateString);
        (0, _chai.expect)(endDate).to.equal(wrapper.instance().props.endDate);
      });
      describe('props.onFocusChange', function () {
        it('is called once', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            displayFormat: customFormat,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onStartDateChange(customFormatDateString);
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
        });
        it('is called with END_DATE arg', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            displayFormat: customFormat,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onStartDateChange(customFormatDateString);
          (0, _chai.expect)(onFocusChangeStub.calledWith(_constants.END_DATE)).to.equal(true);
        });
      });
    });
    describe('is not a valid date string', function () {
      var invalidDateString = 'foo';
      it('calls props.onDatesChange', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub
        }));
        wrapper.instance().onStartDateChange(invalidDateString);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDatesChange with startDate === null', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: today
        }));
        wrapper.instance().onStartDateChange(invalidDateString);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate).to.equal(null);
      });
      it('calls props.onDatesChange with endDate === props.endDate', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          endDate: today
        }));
        wrapper.instance().onStartDateChange(invalidDateString);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.endDate).to.equal(today);
      });
    });
    describe('is outside range', function () {
      var futureDate = (0, _moment["default"])().add(7, 'days').format('YYYY/MM/DD');

      var isOutsideRange = function isOutsideRange(day) {
        return day > (0, _moment["default"])().add(5, 'days');
      };

      it('calls props.onDatesChange', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          isOutsideRange: isOutsideRange
        }));
        wrapper.instance().onStartDateChange(futureDate);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDatesChange with startDate === null', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: today,
          isOutsideRange: isOutsideRange
        }));
        wrapper.instance().onStartDateChange(futureDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate).to.equal(null);
      });
      it('calls props.onDatesChange with endDate === props.endDate', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          endDate: today,
          isOutsideRange: isOutsideRange
        }));
        wrapper.instance().onStartDateChange(futureDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.endDate).to.equal(today);
      });
    });
    describe('is blocked', function () {
      var futureDate = (0, _moment["default"])().add(7, 'days').format('DD/MM/YYYY');

      var isDayBlocked = _sinonSandbox["default"].stub().returns(true);

      it('calls props.onDatesChange', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          isDayBlocked: isDayBlocked
        }));
        wrapper.instance().onStartDateChange(futureDate);
        (0, _chai.expect)(onDatesChangeStub.callCount).to.equal(1);
      });
      it('calls props.onDatesChange with startDate === null', function () {
        var onDatesChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          onDatesChange: onDatesChangeStub,
          startDate: today,
          isDayBlocked: isDayBlocked
        }));
        wrapper.instance().onStartDateChange(futureDate);
        var args = onDatesChangeStub.getCall(0).args[0];
        (0, _chai.expect)(args.startDate).to.equal(null);
      });
    });
  });
  describe('#onStartDateFocus', function () {
    it('calls props.onFocusChange once', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
        onFocusChange: onFocusChangeStub
      }));
      wrapper.instance().onStartDateFocus();
      (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 1);
    });
    it('calls props.onFocusChange with START_DATE as arg', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
        onFocusChange: onFocusChangeStub
      }));
      wrapper.instance().onStartDateFocus();
      (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.START_DATE);
    });
    describe('props.disabled', function () {
      describe('props.disabled=START_DATE', function () {
        it('does not call props.onFocusChange', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            disabled: _constants.START_DATE,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onStartDateFocus();
          (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 0);
        });
      });
      describe('props.disabled=END_DATE', function () {
        it('does call props.onFocusChange', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            disabled: _constants.END_DATE,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onStartDateFocus();
          (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 1);
        });
      });
      describe('props.disabled=true', function () {
        it('does not call props.onFocusChange', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            disabled: true,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onStartDateFocus();
          (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 0);
        });
      });
      describe('props.disabled=false', function () {
        it('does call props.onFocusChange', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            disabled: false,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onStartDateFocus();
          (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 1);
        });
      });
    });
  });
  describe('#onEndDateFocus', function () {
    it('calls props.onFocusChange once with arg END_DATE', function () {
      var onFocusChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
        onFocusChange: onFocusChangeStub
      }));
      wrapper.instance().onEndDateFocus();
      (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 1);
      (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.END_DATE);
    });
    describe('props.startDate = moment', function () {
      it('calls props.onFocusChange once with arg END_DATE', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          startDate: (0, _moment["default"])(today),
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onEndDateFocus();
        (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 1);
        (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.END_DATE);
      });
    });
    describe('props.withFullScreenPortal is truthy', function () {
      it('calls props.onFocusChange once with arg START_DATE', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          withFullScreenPortal: true,
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onEndDateFocus();
        (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 1);
        (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.START_DATE);
      });
    });
    describe('props.startDate = moment', function () {
      it('calls props.onFocusChange once with arg END_DATE', function () {
        var onFocusChangeStub = _sinonSandbox["default"].stub();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
          startDate: (0, _moment["default"])(today),
          onFocusChange: onFocusChangeStub
        }));
        wrapper.instance().onEndDateFocus();
        (0, _chai.expect)(onFocusChangeStub).to.have.property('callCount', 1);
        (0, _chai.expect)(onFocusChangeStub.getCall(0).args[0]).to.equal(_constants.END_DATE);
      });
    });
    describe('props.disabled', function () {
      describe('props.disabled=START_DATE', function () {
        it('does call props.onFocusChange', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            disabled: _constants.START_DATE,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onEndDateFocus();
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
        });
      });
      describe('props.disabled=END_DATE', function () {
        it('does not call props.onFocusChange', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            disabled: _constants.END_DATE,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onEndDateFocus();
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
        });
      });
      describe('props.disabled=true', function () {
        it('does not call props.onFocusChange', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            disabled: true,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onEndDateFocus();
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(0);
        });
      });
      describe('props.disabled=false', function () {
        it('does call props.onFocusChange', function () {
          var onFocusChangeStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInputController["default"], {
            disabled: false,
            onFocusChange: onFocusChangeStub
          }));
          wrapper.instance().onEndDateFocus();
          (0, _chai.expect)(onFocusChangeStub.callCount).to.equal(1);
        });
      });
    });
  });
});