"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _enzyme = require("enzyme");

var _defaultPhrases = require("../../lib/defaultPhrases");

var _CloseButton = _interopRequireDefault(require("../../lib/components/CloseButton"));

var _KeyboardShortcutRow = _interopRequireDefault(require("../../lib/components/KeyboardShortcutRow"));

var _DayPickerKeyboardShortcuts = _interopRequireDefault(require("../../lib/components/DayPickerKeyboardShortcuts"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var event = {
  preventDefault: _sinonSandbox["default"].stub(),
  stopPropagation: _sinonSandbox["default"].stub()
};
describe('DayPickerKeyboardShortcuts', function () {
  describe('#componentWillReceiveProps', function () {
    describe('when the phrases have been updated', function () {
      var prevProps = {
        phrases: {
          enterKey: 'foo',
          escape: 'bar',
          questionMark: 'baz'
        }
      };
      var newProps = {
        phrases: {
          enterKey: 'bleep',
          escape: 'blah',
          questionMark: 'boop'
        }
      };
      it('updates the keyboardShortcuts', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], prevProps)).dive();
        var prevKeyboardShortcuts = wrapper.instance().keyboardShortcuts;
        wrapper.instance().componentWillReceiveProps(newProps);
        var updatedKeyboardShortcuts = wrapper.instance().keyboardShortcuts;
        (0, _chai.expect)(prevKeyboardShortcuts).to.not.equal(updatedKeyboardShortcuts);
      });
    });
    describe('when the phrases have NOT been updated', function () {
      var prevProps = {
        phrases: {
          enterKey: 'foo',
          escape: 'bar',
          questionMark: 'baz'
        }
      };
      var newProps = {
        phrases: {
          enterKey: 'foo',
          escape: 'bar',
          questionMark: 'baz'
        }
      };
      it('does NOT update the keyboardShortcuts', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], prevProps)).dive();
        var prevKeyboardShortcuts = wrapper.instance().keyboardShortcuts;
        wrapper.instance().componentWillReceiveProps(newProps);
        var updatedKeyboardShortcuts = wrapper.instance().keyboardShortcuts;
        (0, _chai.expect)(prevKeyboardShortcuts).to.deep.equal(updatedKeyboardShortcuts);
      });
    });
  });
  describe('#componentDidUpdate', function () {
    it('focuses the hideKeyboardShortcutsButton', function () {
      var hideButtonFocusStub = _sinonSandbox["default"].stub();

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], null)).dive();
      wrapper.instance().setHideKeyboardShortcutsButtonRef({
        focus: hideButtonFocusStub
      });
      wrapper.instance().componentDidUpdate();
      (0, _chai.expect)(hideButtonFocusStub.callCount).to.equal(1);
    });
  });
  describe('#onShowKeyboardShortcutsButtonClick', function () {
    var openKeyboardShortcutsPanelStub = _sinonSandbox["default"].stub();

    var showButtonFocusStub = _sinonSandbox["default"].stub();

    beforeEach(function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
        openKeyboardShortcutsPanel: openKeyboardShortcutsPanelStub
      })).dive();
      wrapper.instance().setShowKeyboardShortcutsButtonRef({
        focus: showButtonFocusStub
      });
      wrapper.instance().onShowKeyboardShortcutsButtonClick();
    });
    it('calls props.openKeyboardShortcutsPanel', function () {
      (0, _chai.expect)(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
    });
    it('sends a callback that focuses the showKeyboardShortcutsButton', function () {
      var callback = openKeyboardShortcutsPanelStub.firstCall.args[0];
      callback();
      (0, _chai.expect)(showButtonFocusStub.callCount).to.equal(1);
    });
  });
  describe('#render', function () {
    describe('#showKeyboardShortcutsButton', function () {
      it('renders a button', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], null)).dive();
        (0, _chai.expect)(wrapper.children('button')).to.have.lengthOf(1);
      });
      describe('when showKeyboardShortcutsPanel is true', function () {
        it('sets the aria-label to the hideKeyboardShortcutsPanel phrase', function () {
          var hideKeyboardShortcutsPanel = 'Test HIDE Keyboard Shortcuts Panel phrase';

          var phrases = _objectSpread(_objectSpread({}, _defaultPhrases.DayPickerKeyboardShortcutsPhrases), {}, {
            hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel
          });

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
            showKeyboardShortcutsPanel: true,
            phrases: phrases
          })).dive();
          (0, _chai.expect)(wrapper.children('button').prop('aria-label')).to.equal(hideKeyboardShortcutsPanel);
        });
      });
      describe('when showKeyboardShortcutsPanel is false', function () {
        it('sets the aria-label to the showKeyboardShortcutsPanel phrase', function () {
          var showKeyboardShortcutsPanel = 'Test SHOW Keyboard Shortcuts Panel phrase';

          var phrases = _objectSpread(_objectSpread({}, _defaultPhrases.DayPickerKeyboardShortcutsPhrases), {}, {
            showKeyboardShortcutsPanel: showKeyboardShortcutsPanel
          });

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
            showKeyboardShortcutsPanel: false,
            phrases: phrases
          })).dive();
          (0, _chai.expect)(wrapper.children('button').prop('aria-label')).to.equal(showKeyboardShortcutsPanel);
        });
      });
      describe('event handlers', function () {
        var openKeyboardShortcutsPanelStub;
        var buttonWrapper;
        beforeEach(function () {
          openKeyboardShortcutsPanelStub = _sinonSandbox["default"].stub();
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
            openKeyboardShortcutsPanel: openKeyboardShortcutsPanelStub
          })).dive();
          buttonWrapper = wrapper.children('button');
        });
        afterEach(function () {
          openKeyboardShortcutsPanelStub.resetHistory();
        });
        it('onClick calls onShowKeyboardShortcutsButtonClick', function () {
          buttonWrapper.simulate('click');
          (0, _chai.expect)(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });
      });
      describe('when Mouse Up', function () {
        it('blurs the current target', function () {
          var mockEvent = {
            currentTarget: {
              blur: _sinonSandbox["default"].stub()
            }
          };
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], null)).dive();
          var buttonWrapper = wrapper.children().find('button');
          buttonWrapper.prop('onMouseUp')(mockEvent);
          (0, _chai.expect)(mockEvent.currentTarget.blur.callCount).to.equal(1);
        });
      });
      describe('renderKeyboardShortcutsButton', function () {
        it('renders the provided button', function () {
          function Button() {
            return /*#__PURE__*/_react["default"].createElement("button", {
              type: "button"
            }, "Success!");
          }

          var props = {
            renderKeyboardShortcutsButton: function renderKeyboardShortcutsButton() {
              return /*#__PURE__*/_react["default"].createElement(Button, null);
            }
          };
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], props)).dive();
          (0, _chai.expect)(wrapper.children().find(Button)).to.have.lengthOf(1);
        });
        it('renders the default button if renderKeyboardShortcutsButton is not provided', function () {
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], null)).dive();
          (0, _chai.expect)(wrapper.children().find('button')).to.have.lengthOf(1);
          (0, _chai.expect)(wrapper.children().find('button').prop('aria-label')).to.eql(_defaultPhrases.DayPickerKeyboardShortcutsPhrases.showKeyboardShortcutsPanel);
        });
      });
      describe('renderKeyboardShortcutsPanel', function () {
        it('renders the provided keyboard shortcuts panel', function () {
          var props = {
            renderKeyboardShortcutsPanel: function renderKeyboardShortcutsPanel() {
              return /*#__PURE__*/_react["default"].createElement("div", null, "Keyboard shortcuts here!");
            },
            showKeyboardShortcutsPanel: true
          };
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], props)).dive();
          (0, _chai.expect)(wrapper.children().contains('Keyboard shortcuts here!'));
        });
      });
    });
    describe('#DayPickerKeyboardShortcuts_panel', function () {
      it('is rendered', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
          showKeyboardShortcutsPanel: true
        })).dive();
        (0, _chai.expect)(wrapper.find('div[role="dialog"]')).to.have.lengthOf(1);
      });
      it('sets props.phrases.keyboardShortcuts as the aria-labelledby value', function () {
        var keyboardShortcuts = 'FOOBARBAZ';

        var phrases = _objectSpread(_objectSpread({}, _defaultPhrases.DayPickerKeyboardShortcutsPhrases), {}, {
          keyboardShortcuts: keyboardShortcuts
        });

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
          showKeyboardShortcutsPanel: true,
          phrases: phrases
        })).dive();
        var ariaLabelledbyId = wrapper.find('div[role="dialog"]').prop('aria-labelledby');
        (0, _chai.expect)(wrapper.find("div#".concat(ariaLabelledbyId)).text()).to.equal(keyboardShortcuts);
      });
      it('sets the unordered list of keyboard shortcuts as the aria-describedby', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
          showKeyboardShortcutsPanel: true
        })).dive();
        var ariaDescribedbyId = wrapper.find('div[role="dialog"]').prop('aria-describedby');
        (0, _chai.expect)(wrapper.find('ul').prop('id')).to.equal(ariaDescribedbyId);
      });
    });
    describe('Close button', function () {
      it('is rendered', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
          showKeyboardShortcutsPanel: true
        })).dive();
        (0, _chai.expect)(wrapper.find('div[role="dialog"]').children('button')).to.have.lengthOf(1);
      });
      it('renders a CloseButton', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
          showKeyboardShortcutsPanel: true
        })).dive();
        (0, _chai.expect)(wrapper.find(_CloseButton["default"])).to.have.lengthOf(1);
      });
      describe('event handlers', function () {
        var closeKeyboardShortcutsPanelStub;
        var closeButton;
        beforeEach(function () {
          closeKeyboardShortcutsPanelStub = _sinonSandbox["default"].stub();
          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
            showKeyboardShortcutsPanel: true,
            closeKeyboardShortcutsPanel: closeKeyboardShortcutsPanelStub
          })).dive();
          closeButton = wrapper.find('div[role="dialog"]').children('button');
        });
        afterEach(function () {
          closeKeyboardShortcutsPanelStub.resetHistory();
          event.stopPropagation.resetHistory();
          event.preventDefault.resetHistory();
        });
        it('onClick calls onShowKeyboardShortcutsButtonClick', function () {
          closeButton.simulate('click');
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });
        it('onKeyDown calls e.stopPropagation and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: ' '
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.callCount).to.equal(0);
        });
        it('onKeyDown Escape calls e.stopPropagation and onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Escape'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });
        it('onKeyDown calls e.stopPropagation and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Enter'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.callCount).to.equal(0);
        });
        it('onKeyDown Tab calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Tab'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(event.preventDefault.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
        it('onKeyDown Home calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'Home'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(event.preventDefault.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
        it('onKeyDown End calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'End'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(event.preventDefault.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
        it('onKeyDown PageUp calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'PageUp'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(event.preventDefault.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
        it('onKeyDown PageDown calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'PageDown'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(event.preventDefault.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
        it('onKeyDown ArrowLeft calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowLeft'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(event.preventDefault.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
        it('onKeyDown ArrowRight calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowRight'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(event.preventDefault.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
        it('onKeyDown ArrowUp calls e.stopPropagation and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowUp'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
        it('onKeyDown ArrowDown calls e.stopPropagation and NOT onShowKeyboardShortcutsButtonClick', function () {
          closeButton.prop('onKeyDown')(_objectSpread(_objectSpread({}, event), {}, {
            key: 'ArrowDown'
          }));
          (0, _chai.expect)(event.stopPropagation.callCount).to.equal(1);
          (0, _chai.expect)(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
      });
      it('sets the aria-label to the hideKeyboardShortcutsPanel phrase', function () {
        var hideKeyboardShortcutsPanel = 'Test HIDE Keyboard Shortcuts Panel phrase';

        var phrases = _objectSpread(_objectSpread({}, _defaultPhrases.DayPickerKeyboardShortcutsPhrases), {}, {
          hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel
        });

        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
          showKeyboardShortcutsPanel: true,
          phrases: phrases
        })).dive();
        (0, _chai.expect)(wrapper.find('div[role="dialog"]').children('button').prop('aria-label')).to.equal(hideKeyboardShortcutsPanel);
      });
    });
    describe('KeyboardShortcutRow list', function () {
      it('is rendered', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
          showKeyboardShortcutsPanel: true
        })).dive();
        (0, _chai.expect)(wrapper.find('ul')).to.have.lengthOf(1);
      });
      it('renders 7 KeyboardShortcutRow components', function () {
        var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
          showKeyboardShortcutsPanel: true
        })).dive();
        (0, _chai.expect)(wrapper.find('ul').find(_KeyboardShortcutRow["default"])).to.have.lengthOf(7);
      });
    });
  });
});