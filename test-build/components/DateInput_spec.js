"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _DateInput = _interopRequireDefault(require("../../lib/components/DateInput"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var event = {
  preventDefault: function preventDefault() {},
  stopPropagation: function stopPropagation() {}
};
describe('DateInput', function () {
  describe('#render', function () {
    describe('input', function () {
      it('has props.ariaLabel as an aria-label if ariaLabel is passed in', function () {
        var ariaLabel = 'ariaLabelExample';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date",
          ariaLabel: ariaLabel
        })).dive();
        (0, _chai.expect)(wrapper.find('input').props()['aria-label']).to.equal(ariaLabel);
      });
      it('has no aria-label if props.ariaLabel is null', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date",
          ariaLabel: null
        })).dive();
        (0, _chai.expect)(wrapper.find('input').props()['aria-label']).to.equal(null);
      });
      it('has props.placeholder as an aria-label if ariaLabel is not passed in', function () {
        var placeholder = 'placeholder foo';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date",
          placeholder: placeholder
        })).dive();
        (0, _chai.expect)(wrapper.find('input').props()['aria-label']).to.equal(placeholder);
      });
      it('has props.titleText as a title attribute if titleText is passed in', function () {
        var titleText = 'titleTextExample';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date",
          titleText: titleText
        })).dive();
        (0, _chai.expect)(wrapper.find('input').props().title).to.equal(titleText);
      });
      it('has no title attribute if props.titleText is null', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date",
          titleText: null
        })).dive();
        (0, _chai.expect)(wrapper.find('input').props().title).to.equal(null);
      });
      it('has value === props.displayValue', function () {
        var DISPLAY_VALUE = 'foobar';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date",
          displayValue: DISPLAY_VALUE
        })).dive();
        (0, _chai.expect)(wrapper.find('input').props().value).to.equal(DISPLAY_VALUE);
      });
      it('has value === state.dateString if displayValue is not passed in', function () {
        var DATE_STRING = 'foobar';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date"
        })).dive();
        wrapper.setState({
          dateString: DATE_STRING
        });
        (0, _chai.expect)(wrapper.find('input').props().value).to.equal(DATE_STRING);
      });
      it('props.displayValue overrides dateString when not null', function () {
        var DATE_STRING = 'foobar';
        var DISPLAY_VALUE = 'display-value';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date"
        })).dive();
        wrapper.setState({
          dateString: DATE_STRING
        });
        (0, _chai.expect)(wrapper.find('input').props().value).to.equal(DATE_STRING);
        wrapper.setProps({
          displayValue: DISPLAY_VALUE
        });
        (0, _chai.expect)(wrapper.find('input').props().value).to.equal(DISPLAY_VALUE);
      });
      describe('props.readOnly is truthy', function () {
        it('sets readOnly', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
            id: "date",
            readOnly: true
          })).dive();
          (0, _chai.expect)(!!wrapper.find('input').prop('readOnly')).to.equal(true);
        });
      });
      describe('props.readOnly is falsy', function () {
        it('does not set readOnly', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
            id: "date",
            readOnly: false
          })).dive();
          (0, _chai.expect)(!!wrapper.find('input').prop('readOnly')).to.equal(false);
        });
      });
    });
    describe('screen reader message', function () {
      var wrapper;
      var inputId = 'date';
      var screenReaderMessage = 'My screen reader message';
      var screenReaderMessageId = "DateInput__screen-reader-message-".concat(inputId);
      var screenReaderMessageSelector = "#".concat(screenReaderMessageId);
      describe('props.screenReaderMessage is truthy', function () {
        beforeEach(function () {
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
            id: inputId,
            screenReaderMessage: screenReaderMessage
          })).dive();
        });
        it('has #DateInput__screen-reader-message id', function () {
          (0, _chai.expect)(wrapper.find(screenReaderMessageSelector)).to.have.lengthOf(1);
        });
        it('has props.screenReaderMessage as content', function () {
          (0, _chai.expect)(wrapper.find(screenReaderMessageSelector).text()).to.equal(screenReaderMessage);
        });
        it('has aria-describedby attribute === screen reader message id', function () {
          (0, _chai.expect)(wrapper.find("input[aria-describedby=\"".concat(screenReaderMessageId, "\"]"))).to.have.lengthOf(1);
        });
      });
      describe('props.screenReaderMessage is falsy', function () {
        beforeEach(function () {
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
            id: inputId
          })).dive();
        });
        it('does not have #DateInput__screen-reader-message id', function () {
          (0, _chai.expect)(wrapper.find(screenReaderMessageSelector)).to.have.lengthOf(0);
        });
        it('does not have aria-describedby attribute value', function () {
          (0, _chai.expect)(wrapper.find("input[aria-describedby=\"".concat(screenReaderMessageId, "\"]"))).to.have.lengthOf(0);
        });
      });
    });
  });
  describe('#componentWillReceiveProps', function () {
    describe('nextProps.displayValue exists', function () {
      it('sets state.dateString to \'\'', function () {
        var dateString = 'foo123';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date"
        })).dive();
        wrapper.setState({
          dateString: dateString
        });
        wrapper.instance().componentWillReceiveProps({
          displayValue: '1991-07-13'
        });
        (0, _chai.expect)(wrapper.state()).to.have.property('dateString', '');
      });
    });
    describe('nextProps.displayValue does not exist', function () {
      it('does not change state.dateString', function () {
        var dateString = 'foo123';
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date"
        })).dive();
        wrapper.setState({
          dateString: dateString
        });
        wrapper.instance().componentWillReceiveProps({
          displayValue: null
        });
        (0, _chai.expect)(wrapper.state()).to.have.property('dateString', dateString);
      });
    });
  });
  describe('#onChange', function () {
    var evt = {
      target: {
        value: 'foobar'
      }
    };
    it('sets state.dateString to e.target.value', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date"
      })).dive();
      wrapper.instance().onChange(evt);
      (0, _chai.expect)(wrapper.state().dateString).to.equal('foobar');
    });
    it('calls props.onChange once', function () {
      var onChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onChange: onChangeStub
      })).dive();
      wrapper.instance().onChange(evt);
      (0, _chai.expect)(onChangeStub.callCount).to.equal(1);
    });
    it('calls props.onChange with e.target.value as arg', function () {
      var onChangeStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onChange: onChangeStub
      })).dive();
      wrapper.instance().onChange(evt);
      (0, _chai.expect)(onChangeStub.getCall(0).args[0]).to.equal(evt.target.value);
    });
    it('calls props.onKeyDownQuestionMark if last typed character is ?', function () {
      var onKeyDownQuestionMarkStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onKeyDownQuestionMark: onKeyDownQuestionMarkStub
      })).dive();
      wrapper.instance().onChange({
        target: {
          value: 'foobar?'
        }
      });
      (0, _chai.expect)(onKeyDownQuestionMarkStub.callCount).to.equal(1);
    });
  });
  describe('#onKeyDown', function () {
    it('calls props.onKeyDownTab if e.key === `Tab` and e.shiftKey === false', function () {
      var onKeyDownTabStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onKeyDownTab: onKeyDownTabStub
      })).dive();
      wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
        key: 'Tab',
        shiftKey: false
      }));
      (0, _chai.expect)(onKeyDownTabStub.callCount).to.equal(1);
    });
    it('calls props.onKeyDownShiftTab if e.key === `Tab` and e.shiftKey === true', function () {
      var onKeyDownShiftTabStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onKeyDownShiftTab: onKeyDownShiftTabStub
      })).dive();
      wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
        key: 'Tab',
        shiftKey: true
      }));
      (0, _chai.expect)(onKeyDownShiftTabStub.callCount).to.equal(1);
    });
    it('does not call props.onKeyDownTab if e.key !== `Tab`', function () {
      var onKeyDownTabStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onKeyDownTab: onKeyDownTabStub
      })).dive();
      wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
        key: 'foo'
      }));
      (0, _chai.expect)(onKeyDownTabStub.callCount).to.equal(0);
    });
    it('calls props.onKeyDownArrowDown if e.key === `ArrowDown`', function () {
      var onKeyDownArrowDownStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onKeyDownArrowDown: onKeyDownArrowDownStub
      })).dive();
      wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
        key: 'ArrowDown'
      }));
      (0, _chai.expect)(onKeyDownArrowDownStub.callCount).to.equal(1);
    });
    it('does not call props.onKeyDownArrowDown if e.key !== `ArrowDown`', function () {
      var onKeyDownArrowDownStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onKeyDownArrowDown: onKeyDownArrowDownStub
      })).dive();
      wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
        key: 'foo'
      }));
      (0, _chai.expect)(onKeyDownArrowDownStub.callCount).to.equal(0);
    });
    it('calls props.onKeyDownQuestionMark if e.key === `?`', function () {
      var onKeyDownQuestionMarkStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onKeyDownQuestionMark: onKeyDownQuestionMarkStub
      })).dive();
      wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
        key: '?'
      }));
      (0, _chai.expect)(onKeyDownQuestionMarkStub.callCount).to.equal(1);
    });
    it('does not call props.onKeyDownQuestionMark if e.key !== `?`', function () {
      var onKeyDownQuestionMarkStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        onKeyDownQuestionMark: onKeyDownQuestionMarkStub
      })).dive();
      wrapper.instance().onKeyDown(_objectSpread(_objectSpread({}, event), {}, {
        key: 'foo'
      }));
      (0, _chai.expect)(onKeyDownQuestionMarkStub.callCount).to.equal(0);
    });
  });
  describe('touch device detection', function () {
    it('indicates no touch support on the client', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date"
      })).dive();
      (0, _chai.expect)(wrapper.state()).to.contain.keys({
        isTouchDevice: false
      });
    });
    it('sets readOnly to true when no value was provided on a touch device', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date"
      })).dive();
      wrapper.setState({
        isTouchDevice: true
      });
      wrapper.update();
      (0, _chai.expect)(!!wrapper.find('input').prop('readOnly')).to.equal(true);
    });
    it('sets readOnly to provided value on a touch device', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
        id: "date",
        readOnly: false
      })).dive();
      wrapper.setState({
        isTouchDevice: true
      });
      wrapper.update();
      (0, _chai.expect)(!!wrapper.find('input').prop('readOnly')).to.equal(false);
    });
    describe('focus/isFocused', function () {
      var el = {
        focus: function focus() {}
      };
      beforeEach(function () {
        _sinonSandbox["default"].spy(el, 'focus');
      });
      afterEach(function () {
        _sinonSandbox["default"].restore();
      });
      it('focuses inputRef when becoming focused', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DateInput["default"], {
          id: "date",
          focused: false,
          isFocused: false
        }), {
          disableLifecycleMethods: false
        }).dive();
        wrapper.instance().inputRef = el;
        wrapper.setProps({
          focused: true,
          isFocused: true
        });
        (0, _chai.expect)(el.focus).to.have.property('callCount', 1);
      });
    });
    /*
      // Skip this test until we can figure out how to use `withTouchSupport` with karma
      wrap()
      .withTouchSupport()
      .it('sets isTouchDevice state when is a touch device', () => {
        const wrapper = shallow(<DateInput id="date" />);
        wrapper.instance().componentDidMount();
        expect(wrapper.state()).to.contain.keys({ isTouchDevice: true });
      });
    */
  });
});