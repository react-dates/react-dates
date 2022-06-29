"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _enzyme = require("enzyme");

var _DayPickerNavigation = _interopRequireDefault(require("../../lib/components/DayPickerNavigation"));

var _RightArrow = _interopRequireDefault(require("../../lib/components/RightArrow"));

var _LeftArrow = _interopRequireDefault(require("../../lib/components/LeftArrow"));

var _constants = require("../../lib/constants");

describe('DayPickerNavigation', function () {
  describe('#render', function () {
    it('renders two role="button" divs', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], null)).dive();
      (0, _chai.expect)(wrapper.find('[role="button"]')).to.have.lengthOf(2);
    });
    it('renders one button when showNavNextButton is false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        showNavNextButton: false
      })).dive();
      (0, _chai.expect)(wrapper.find('[role="button"]')).to.have.lengthOf(1);
    });
    it('renders one button when showNavNextButton is false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        showNavPrevButton: false
      })).dive();
      (0, _chai.expect)(wrapper.find('[role="button"]')).to.have.lengthOf(1);
    });
    it('is null when showNavNextButton and showNavPrevButton are both false', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        showNavPrevButton: false,
        showNavNextButton: false
      })).dive();
      (0, _chai.expect)(wrapper.type()).to.equal(null);
    });
    it('tabindex is present when the default buttons are used', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], null)).dive();
      var prevMonthButton = wrapper.find('[role="button"]').at(0);
      var nextMonthButton = wrapper.find('[role="button"]').at(1);
      (0, _chai.expect)(prevMonthButton.prop('tabIndex')).to.equal('0');
      (0, _chai.expect)(nextMonthButton.prop('tabIndex')).to.equal('0');
    });
    it('tabindex is not present when custom buttons are used', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        navNext: /*#__PURE__*/_react["default"].createElement("div", null),
        navPrev: /*#__PURE__*/_react["default"].createElement("div", null)
      })).dive();
      var prevMonthButton = wrapper.find('[role="button"]').at(0);
      var nextMonthButton = wrapper.find('[role="button"]').at(1);
      (0, _chai.expect)(prevMonthButton.prop('tabIndex')).to.equal(undefined);
      (0, _chai.expect)(nextMonthButton.prop('tabIndex')).to.equal(undefined);
    });
    it('tabindex is present when custom buttons are used and provide a tabIndex', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        navNext: /*#__PURE__*/_react["default"].createElement("div", {
          id: "navNext",
          tabIndex: "0"
        }) // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        ,
        navPrev: /*#__PURE__*/_react["default"].createElement("div", {
          id: "navPrev",
          tabIndex: "0"
        }) // eslint-disable-line jsx-a11y/no-noninteractive-tabindex

      })).dive();
      var prevMonthButton = wrapper.find('#navPrev');
      var nextMonthButton = wrapper.find('#navNext');
      (0, _chai.expect)(prevMonthButton.prop('tabIndex')).to.equal('0');
      (0, _chai.expect)(nextMonthButton.prop('tabIndex')).to.equal('0');
    });
    it('uses RightArrow as the default prev icon for RTL', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        isRTL: true
      })).dive();
      (0, _chai.expect)(wrapper.childAt(0).find(_RightArrow["default"])).to.have.lengthOf(1);
    });
    it('uses LeftArrow as the default next icon for RTL', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        isRTL: true
      })).dive();
      (0, _chai.expect)(wrapper.childAt(1).find(_LeftArrow["default"])).to.have.lengthOf(1);
    });
    it('calls renderNavPrevButton when custom prev button is used', function () {
      var renderNavPrevButtonStub = _sinonSandbox["default"].stub().returns( /*#__PURE__*/_react["default"].createElement("button", {
        type: "button"
      }, "Prev"));

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        renderNavPrevButton: renderNavPrevButtonStub
      })).dive();
      (0, _chai.expect)(wrapper.childAt(0).find('div[role="button"]')).to.have.lengthOf(0);
      (0, _chai.expect)(renderNavPrevButtonStub).to.have.property('callCount', 1);
    });
    it('calls renderNavNextButton when custom next button is used', function () {
      var renderNavNextButtonStub = _sinonSandbox["default"].stub().returns( /*#__PURE__*/_react["default"].createElement("button", {
        type: "button"
      }, "Next"));

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        renderNavNextButton: renderNavNextButtonStub
      })).dive();
      (0, _chai.expect)(wrapper.childAt(1).find('div[role="button"]')).to.have.lengthOf(0);
      (0, _chai.expect)(renderNavNextButtonStub).to.have.property('callCount', 1);
    });
    it('does not render default styles when custom navigation is used', function () {
      var renderNavPrevButtonStub = _sinonSandbox["default"].stub().returns( /*#__PURE__*/_react["default"].createElement("button", {
        type: "button"
      }, "Prev"));

      var renderNavNextButtonStub = _sinonSandbox["default"].stub().returns( /*#__PURE__*/_react["default"].createElement("button", {
        type: "button"
      }, "Next"));

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        renderNavNextButton: renderNavNextButtonStub,
        renderNavPrevButton: renderNavPrevButtonStub,
        orientation: _constants.VERTICAL_ORIENTATION
      })).dive();
      var wrapperDiv = wrapper.find('div').filterWhere(function (div) {
        var className = div.prop('className') || '';
        return className.includes('DayPickerNavigation__verticalDefault');
      });
      (0, _chai.expect)(wrapperDiv).to.have.lengthOf(0);
    });
    it('does render default styles when custom navigation is used for only one nav button', function () {
      var renderNavPrevButtonStub = _sinonSandbox["default"].stub().returns( /*#__PURE__*/_react["default"].createElement("button", {
        type: "button"
      }, "Prev"));

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        renderNavPrevButton: renderNavPrevButtonStub,
        orientation: _constants.VERTICAL_ORIENTATION
      })).dive();
      var wrapperDiv = wrapper.find('div').filterWhere(function (div) {
        var className = div.prop('className') || '';
        return className.includes('DayPickerNavigation__verticalDefault');
      });
      (0, _chai.expect)(wrapperDiv).to.have.lengthOf(1);
    });
    it('does not render default styles when custom navigation is used for only button but the other nav button is not shown', function () {
      var renderNavPrevButtonStub = _sinonSandbox["default"].stub().returns( /*#__PURE__*/_react["default"].createElement("button", {
        type: "button"
      }, "Prev"));

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        showNavNextButton: false,
        renderNavPrevButton: renderNavPrevButtonStub,
        orientation: _constants.VERTICAL_ORIENTATION
      })).dive();
      var wrapperDiv = wrapper.find('div').filterWhere(function (div) {
        var className = div.prop('className') || '';
        return className.includes('DayPickerNavigation__verticalDefault');
      });
      (0, _chai.expect)(wrapperDiv).to.have.lengthOf(0);
    });
    it('renders default styles when default navigation is used', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        orientation: _constants.VERTICAL_ORIENTATION
      })).dive();
      var wrapperDiv = wrapper.find('div').filterWhere(function (div) {
        var className = div.prop('className') || '';
        return className.includes('DayPickerNavigation__verticalDefault');
      });
      (0, _chai.expect)(wrapperDiv).to.have.lengthOf(1);
    });
  });
  describe('interactions', function () {
    it('props.onPrevMonthClick is triggered by prev month button click', function () {
      var onPrevMonthStub = _sinonSandbox["default"].stub();

      var prevMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onPrevMonthClick: onPrevMonthStub
      })).dive().find('[role="button"]').at(0);
      prevMonthButton.simulate('click');
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 1);
    });
    it('props.onNextMonthClick is triggered by next month button click', function () {
      var onNextMonthStub = _sinonSandbox["default"].stub();

      var nextMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onNextMonthClick: onNextMonthStub
      })).dive().find('[role="button"]').at(1);
      nextMonthButton.simulate('click');
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 1);
    });
    it('props.onPrevMonthClick is not triggered by prev month disabled click', function () {
      var onPrevMonthStub = _sinonSandbox["default"].stub();

      var prevMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onPrevMonthClick: onPrevMonthStub,
        disablePrev: true
      })).dive().find('[role="button"]').at(0);
      prevMonthButton.simulate('click');
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 0);
    });
    it('props.onNextMonthClick is not triggered by prev month disabled click', function () {
      var onNextMonthStub = _sinonSandbox["default"].stub();

      var nextMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onNextMonthClick: onNextMonthStub,
        disableNext: true
      })).dive().find('[role="button"]').at(1);
      nextMonthButton.simulate('click');
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 0);
    });
    it('props.onPrevMonthClick is triggered by prev month button key up', function () {
      var onPrevMonthStub = _sinonSandbox["default"].stub();

      var prevMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onPrevMonthClick: onPrevMonthStub
      })).dive().find('[role="button"]').at(0);
      prevMonthButton.simulate('keyup', {
        key: 'Enter'
      });
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 1);
      prevMonthButton.simulate('keyup', {
        key: ' '
      });
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 2);
      prevMonthButton.simulate('keyup', {
        key: 'k'
      });
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 2);
    });
    it('props.onNextMonthClick is triggered by next month button key up', function () {
      var onNextMonthStub = _sinonSandbox["default"].stub();

      var nextMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onNextMonthClick: onNextMonthStub
      })).dive().find('[role="button"]').at(1);
      nextMonthButton.simulate('keyup', {
        key: 'Enter'
      });
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 1);
      nextMonthButton.simulate('keyup', {
        key: ' '
      });
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 2);
      nextMonthButton.simulate('keyup', {
        key: 'k'
      });
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 2);
    });
    it('props.onPrevMonthClick is triggered by custom prev month button click', function () {
      var onPrevMonthStub = _sinonSandbox["default"].stub();

      var renderNavPrevButtonStub = _sinonSandbox["default"].stub().onCall(0).callsFake(function (_ref) {
        var onClick = _ref.onClick;
        return /*#__PURE__*/_react["default"].createElement("button", {
          onClick: onClick,
          type: "button"
        }, "Prev");
      });

      var prevMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onPrevMonthClick: onPrevMonthStub,
        renderNavPrevButton: renderNavPrevButtonStub
      })).dive().find('button').at(0);
      prevMonthButton.simulate('click');
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 1);
    });
    it('props.onNextMonthClick is triggered by custom next month button click', function () {
      var onNextMonthStub = _sinonSandbox["default"].stub();

      var renderNavNextButtonStub = _sinonSandbox["default"].stub().onCall(0).callsFake(function (_ref2) {
        var onClick = _ref2.onClick;
        return /*#__PURE__*/_react["default"].createElement("button", {
          onClick: onClick,
          type: "button"
        }, "Next");
      });

      var nextMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onNextMonthClick: onNextMonthStub,
        renderNavNextButton: renderNavNextButtonStub
      })).dive().find('button').at(0);
      nextMonthButton.simulate('click');
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 1);
    });
    it('props.onPrevMonthClick is not triggered by custom prev month disabled click', function () {
      var onPrevMonthStub = _sinonSandbox["default"].stub();

      var renderNavPrevButtonStub = _sinonSandbox["default"].stub().onCall(0).callsFake(function (_ref3) {
        var disabled = _ref3.disabled,
            onClick = _ref3.onClick;
        return /*#__PURE__*/_react["default"].createElement("button", {
          disabled: disabled,
          onClick: onClick,
          type: "button"
        }, "Prev");
      });

      var prevMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        disablePrev: true,
        onPrevMonthClick: onPrevMonthStub,
        renderNavPrevButton: renderNavPrevButtonStub
      })).dive().find('button').at(0);
      prevMonthButton.simulate('click');
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 0);
    });
    it('props.onNextMonthClick is not triggered by custom next month disabled click', function () {
      var onNextMonthStub = _sinonSandbox["default"].stub();

      var renderNavNextButtonStub = _sinonSandbox["default"].stub().onCall(0).callsFake(function (_ref4) {
        var disabled = _ref4.disabled,
            onClick = _ref4.onClick;
        return /*#__PURE__*/_react["default"].createElement("button", {
          disabled: disabled,
          onClick: onClick,
          type: "button"
        }, "Next");
      });

      var nextMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        disableNext: true,
        onNextMonthClick: onNextMonthStub,
        renderNavNextButton: renderNavNextButtonStub
      })).dive().find('button').at(0);
      nextMonthButton.simulate('click');
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 0);
    });
    it('props.onPrevMonthClick is triggered by custom prev month button key up', function () {
      var onPrevMonthStub = _sinonSandbox["default"].stub();

      var renderNavPrevButtonStub = _sinonSandbox["default"].stub().onCall(0).callsFake(function (_ref5) {
        var onKeyUp = _ref5.onKeyUp;
        return /*#__PURE__*/_react["default"].createElement("button", {
          onKeyUp: onKeyUp,
          type: "button"
        }, "Prev");
      });

      var prevMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onPrevMonthClick: onPrevMonthStub,
        renderNavPrevButton: renderNavPrevButtonStub
      })).dive().find('button').at(0);
      prevMonthButton.simulate('keyup', {
        key: 'Enter'
      });
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 1);
      prevMonthButton.simulate('keyup', {
        key: ' '
      });
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 2);
      prevMonthButton.simulate('keyup', {
        key: 'k'
      });
      (0, _chai.expect)(onPrevMonthStub).to.have.property('callCount', 2);
    });
    it('props.onNextMonthClick is triggered by custom next month button key up', function () {
      var onNextMonthStub = _sinonSandbox["default"].stub();

      var renderNavNextButtonStub = _sinonSandbox["default"].stub().onCall(0).callsFake(function (_ref6) {
        var onKeyUp = _ref6.onKeyUp;
        return /*#__PURE__*/_react["default"].createElement("button", {
          onKeyUp: onKeyUp,
          type: "button"
        }, "Next");
      });

      var nextMonthButton = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
        onNextMonthClick: onNextMonthStub,
        renderNavNextButton: renderNavNextButtonStub
      })).dive().find('button').at(0);
      nextMonthButton.simulate('keyup', {
        key: 'Enter'
      });
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 1);
      nextMonthButton.simulate('keyup', {
        key: ' '
      });
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 2);
      nextMonthButton.simulate('keyup', {
        key: 'k'
      });
      (0, _chai.expect)(onNextMonthStub).to.have.property('callCount', 2);
    });
  });
});