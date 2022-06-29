"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _moment = _interopRequireDefault(require("moment"));

var _describeIfWindow = _interopRequireDefault(require("../_helpers/describeIfWindow"));

var _CalendarMonth = _interopRequireDefault(require("../../lib/components/CalendarMonth"));

describe('CalendarMonth', function () {
  describe('#render', function () {
    describe('data-visible attribute', function () {
      it('data-visible attribute is truthy if props.isVisible', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonth["default"], {
          isVisible: true
        })).dive();
        (0, _chai.expect)(wrapper.prop('data-visible')).to.equal(true);
      });
      it('data-visible attribute is falsy if !props.isVisible', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonth["default"], {
          isVisible: false
        })).dive();
        (0, _chai.expect)(wrapper.prop('data-visible')).to.equal(false);
      });
    });
    describe('caption', function () {
      it('text is the correctly formatted month title', function () {
        var MONTH = (0, _moment["default"])();
        var captionWrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonth["default"], {
          month: MONTH
        })).dive().find('strong');
        (0, _chai.expect)(captionWrapper.text()).to.equal(MONTH.format('MMMM YYYY'));
      });
    });
    it('renderMonthElement renders month element when month changes', function () {
      var renderMonthElementStub = _sinonSandbox["default"].stub().returns( /*#__PURE__*/_react["default"].createElement("div", {
        id: "month-element"
      }));

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarMonth["default"], {
        renderMonthElement: renderMonthElementStub
      })).dive();
      wrapper.setProps({
        month: (0, _moment["default"])().subtract(1, 'months')
      });

      var _renderMonthElementSt = (0, _slicedToArray2["default"])(renderMonthElementStub.getCall(0).args, 1),
          _renderMonthElementSt2 = _renderMonthElementSt[0],
          month = _renderMonthElementSt2.month,
          onMonthSelect = _renderMonthElementSt2.onMonthSelect,
          onYearSelect = _renderMonthElementSt2.onYearSelect,
          isVisible = _renderMonthElementSt2.isVisible;

      (0, _chai.expect)(_moment["default"].isMoment(month)).to.equal(true);
      (0, _chai.expect)((0, _typeof2["default"])(onMonthSelect)).to.equal('function');
      (0, _chai.expect)((0, _typeof2["default"])(onYearSelect)).to.equal('function');
      (0, _chai.expect)((0, _typeof2["default"])(isVisible)).to.equal('boolean');
      (0, _chai.expect)(wrapper.find('#month-element').exists()).to.equal(true);
    });
    (0, _describeIfWindow["default"])('setMonthTitleHeight', function () {
      beforeEach(function () {
        _sinonSandbox["default"].stub(window, 'setTimeout').callsFake(function (handler) {
          return handler();
        });
      });
      it('sets the title height after mount', function () {
        var setMonthTitleHeightStub = _sinonSandbox["default"].stub();

        (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_CalendarMonth["default"], {
          isVisible: true,
          setMonthTitleHeight: setMonthTitleHeightStub
        }));
        (0, _chai.expect)(setMonthTitleHeightStub).to.have.property('callCount', 1);
      });
      describe('if the callbacks gets set again', function () {
        it('updates the title height', function () {
          var setMonthTitleHeightStub = _sinonSandbox["default"].stub();

          var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_CalendarMonth["default"], {
            isVisible: true,
            setMonthTitleHeight: setMonthTitleHeightStub
          }));
          (0, _chai.expect)(setMonthTitleHeightStub).to.have.property('callCount', 1);
          wrapper.setProps({
            setMonthTitleHeight: null
          });
          wrapper.setProps({
            setMonthTitleHeight: setMonthTitleHeightStub
          });
          (0, _chai.expect)(setMonthTitleHeightStub).to.have.property('callCount', 2);
        });
      });
    });
  });
});