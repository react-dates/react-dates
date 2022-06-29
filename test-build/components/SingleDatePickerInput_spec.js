"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _SingleDatePickerInput = _interopRequireDefault(require("../../lib/components/SingleDatePickerInput"));

var _DateInput = _interopRequireDefault(require("../../lib/components/DateInput"));

var _defaultPhrases = require("../../lib/defaultPhrases");

describe('SingleDatePickerInput', function () {
  describe('render', function () {
    it('should render any children provided', function () {
      var Child = function Child() {
        return /*#__PURE__*/_react["default"].createElement("div", null, "CHILD");
      };

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
        id: "date"
      }, /*#__PURE__*/_react["default"].createElement(Child, null))).dive();
      (0, _chai.expect)(wrapper.find(Child)).to.have.lengthOf(1);
    });
  });
  describe('clear date', function () {
    describe('props.showClearDate is falsy', function () {
      it('does not render a clear date button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date",
          showClearDate: false
        })).dive();
        (0, _chai.expect)(wrapper.find('button')).to.have.lengthOf(0);
      });
    });
    describe('props.showClearDate is truthy', function () {
      it('has a clear date button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date",
          showClearDate: true
        })).dive();
        (0, _chai.expect)(wrapper.find('button')).to.have.lengthOf(1);
      });
    });
    describe('props.customCloseIcon is a React Element', function () {
      it('has custom icon', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date",
          showClearDate: true,
          customCloseIcon: /*#__PURE__*/_react["default"].createElement("span", {
            className: "custom-close-icon"
          })
        })).dive();
        (0, _chai.expect)(wrapper.find('.custom-close-icon')).to.have.lengthOf(1);
      });
    });
  });
  describe('show calendar icon', function () {
    describe('props.showInputIcon is falsy', function () {
      it('does not have a calendar button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date",
          showDefaultInputIcon: false
        })).dive();
        (0, _chai.expect)(wrapper.find('button')).to.have.lengthOf(0);
      });
    });
    describe('props.showInputIcon is truthy', function () {
      it('has button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date",
          showDefaultInputIcon: true
        })).dive();
        (0, _chai.expect)(wrapper.find('button')).to.have.lengthOf(1);
      });
    });
    describe('props.customInputIcon is a React Element', function () {
      it('has custom icon', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date",
          customInputIcon: /*#__PURE__*/_react["default"].createElement("span", {
            className: "custom-icon"
          })
        })).dive();
        (0, _chai.expect)(wrapper.find('.custom-icon')).to.have.lengthOf(1);
      });
    });
  });
  describe('clear date interactions', function () {
    describe('onClick', function () {
      it('props.onClearDate gets triggered', function () {
        var onClearDateSpy = _sinonSandbox["default"].spy();

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date",
          onClearDate: onClearDateSpy,
          showClearDate: true
        })).dive();
        var clearDateWrapper = wrapper.find('button');
        clearDateWrapper.simulate('click');
        (0, _chai.expect)(onClearDateSpy).to.have.property('called', true);
      });
    });
  });
  describe('screen reader message', function () {
    describe('props.screenReaderMessage is falsy', function () {
      it('default value is passed to DateInput', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date"
        })).dive();
        var dateInput = wrapper.find(_DateInput["default"]);
        (0, _chai.expect)(dateInput).to.have.lengthOf(1);
        (0, _chai.expect)(dateInput.props()).to.have.property('screenReaderMessage', _defaultPhrases.SingleDatePickerInputPhrases.keyboardForwardNavigationInstructions);
      });
    });
    describe('props.screenReaderMessage is truthy', function () {
      it('prop value is passed to DateInput', function () {
        var message = 'test message';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_SingleDatePickerInput["default"], {
          id: "date",
          screenReaderMessage: message
        })).dive();
        var dateInput = wrapper.find(_DateInput["default"]);
        (0, _chai.expect)(dateInput).to.have.lengthOf(1);
        (0, _chai.expect)(dateInput.props()).to.have.property('screenReaderMessage', message);
      });
    });
  });
});