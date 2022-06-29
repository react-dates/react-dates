"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../lib/constants");

var _DateInput = _interopRequireDefault(require("../../lib/components/DateInput"));

var _DateRangePickerInput = _interopRequireDefault(require("../../lib/components/DateRangePickerInput"));

describe('DateRangePickerInput', function () {
  describe('#render', function () {
    it('renders 2 <DateInput /> components', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], null)).dive();
      (0, _chai.expect)(wrapper.find(_DateInput["default"])).to.have.lengthOf(2);
    });
    describe('props.showClearDates', function () {
      it('if true renders clear dates button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          showClearDates: true
        })).dive();
        (0, _chai.expect)(wrapper.find('button')).to.have.lengthOf(1);
      });
      it('if false does not render clear dates', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          showClearDates: false
        })).dive();
        (0, _chai.expect)(wrapper.find('button')).to.have.lengthOf(0);
      });
    });
    describe('show calendar icon', function () {
      it('if true renders calendar button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          showDefaultInputIcon: true
        })).dive();
        (0, _chai.expect)(wrapper.find('button')).to.have.lengthOf(1);
      });
      it('if false does not render calendar button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          showDefaultInputIcon: false
        })).dive();
        (0, _chai.expect)(wrapper.find('button')).to.have.lengthOf(0);
      });
      describe('props.customInputIcon is a React Element', function () {
        it('custom icon is rendered', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
            customInputIcon: /*#__PURE__*/_react["default"].createElement("span", {
              className: "custom-icon"
            })
          })).dive();
          (0, _chai.expect)(wrapper.find('.custom-icon')).to.have.lengthOf(1);
        });
      });
    });
    describe('props.children', function () {
      it('should unconditionally render children when provided', function () {
        var Child = function Child() {
          return /*#__PURE__*/_react["default"].createElement("div", null, "CHILD");
        };

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], null, /*#__PURE__*/_react["default"].createElement(Child, null))).dive();
        (0, _chai.expect)(wrapper.find('Child')).to.have.lengthOf(1);
      });
    });
  });
  describe('props.customArrowIcon', function () {
    it('custom icon is rendered', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
        customArrowIcon: /*#__PURE__*/_react["default"].createElement("span", {
          className: "custom-arrow-icon"
        })
      })).dive();
      (0, _chai.expect)(wrapper.find('.custom-arrow-icon')).to.have.lengthOf(1);
    });
    it('custom icon is rendered when in RTL mode', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
        customArrowIcon: /*#__PURE__*/_react["default"].createElement("span", {
          className: "custom-arrow-icon"
        }),
        isRTL: true
      })).dive();
      (0, _chai.expect)(wrapper.find('.custom-arrow-icon')).to.have.lengthOf(1);
    });
    it('custom icon is rendered when using small mode', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
        customArrowIcon: /*#__PURE__*/_react["default"].createElement("span", {
          className: "custom-arrow-icon"
        }),
        small: true
      })).dive();
      (0, _chai.expect)(wrapper.find('.custom-arrow-icon')).to.have.lengthOf(1);
    });
  });
  describe('props.customCloseIcon', function () {
    it('custom icon is rendered', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
        showClearDates: true,
        customCloseIcon: /*#__PURE__*/_react["default"].createElement("span", {
          className: "custom-close-icon"
        })
      })).dive();
      (0, _chai.expect)(wrapper.find('.custom-close-icon')).to.have.lengthOf(1);
    });
  });
  describe('clear dates interactions', function () {
    describe('onClick', function () {
      it('props.onClearDates gets triggered', function () {
        var onClearDatesSpy = _sinonSandbox["default"].spy();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          onClearDates: onClearDatesSpy,
          showClearDates: true
        })).dive();
        var clearDatesWrapper = wrapper.find('button');
        clearDatesWrapper.simulate('click');
        (0, _chai.expect)(onClearDatesSpy.called).to.equal(true);
      });
    });
  });
  describe('calendar icon interaction', function () {
    describe('onClick', function () {
      it('props.onKeyDownArrowDown gets triggered', function () {
        var onArrowDownSpy = _sinonSandbox["default"].spy();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          onKeyDownArrowDown: onArrowDownSpy,
          showDefaultInputIcon: true
        })).dive();
        var calendarIconWrapper = wrapper.find('button').at(0);
        calendarIconWrapper.simulate('click');
        (0, _chai.expect)(onArrowDownSpy.callCount).to.equal(1);
      });
    });
  });
  describe('props.disabled', function () {
    describe('props.disabled=START_DATE', function () {
      it('First DateInput gets disabled prop, second does not', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          disabled: _constants.START_DATE
        })).dive();

        var _wrapper$find = wrapper.find(_DateInput["default"]),
            _wrapper$find2 = (0, _slicedToArray2["default"])(_wrapper$find, 2),
            startDateInput = _wrapper$find2[0],
            endDateInput = _wrapper$find2[1];

        (0, _chai.expect)(startDateInput.props.disabled).to.equal(true);
        (0, _chai.expect)(endDateInput.props.disabled).to.equal(false);
      });
    });
    describe('props.disabled=END_DATE', function () {
      it('First DateInput gets disabled prop, second does not', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          disabled: _constants.END_DATE
        })).dive();

        var _wrapper$find3 = wrapper.find(_DateInput["default"]),
            _wrapper$find4 = (0, _slicedToArray2["default"])(_wrapper$find3, 2),
            startDateInput = _wrapper$find4[0],
            endDateInput = _wrapper$find4[1];

        (0, _chai.expect)(startDateInput.props.disabled).to.equal(false);
        (0, _chai.expect)(endDateInput.props.disabled).to.equal(true);
      });
    });
    describe('props.disabled=true', function () {
      it('First DateInput gets disabled prop, second does not', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          disabled: true
        })).dive();

        var _wrapper$find5 = wrapper.find(_DateInput["default"]),
            _wrapper$find6 = (0, _slicedToArray2["default"])(_wrapper$find5, 2),
            startDateInput = _wrapper$find6[0],
            endDateInput = _wrapper$find6[1];

        (0, _chai.expect)(startDateInput.props.disabled).to.equal(true);
        (0, _chai.expect)(endDateInput.props.disabled).to.equal(true);
      });
    });
    describe('props.disabled=false', function () {
      it('First DateInput gets disabled prop, second does not', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateRangePickerInput["default"], {
          disabled: false
        })).dive();

        var _wrapper$find7 = wrapper.find(_DateInput["default"]),
            _wrapper$find8 = (0, _slicedToArray2["default"])(_wrapper$find7, 2),
            startDateInput = _wrapper$find8[0],
            endDateInput = _wrapper$find8[1];

        (0, _chai.expect)(startDateInput.props.disabled).to.equal(false);
        (0, _chai.expect)(endDateInput.props.disabled).to.equal(false);
      });
    });
  });
});