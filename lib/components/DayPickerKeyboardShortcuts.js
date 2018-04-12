Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BOTTOM_RIGHT = exports.TOP_RIGHT = exports.TOP_LEFT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _KeyboardShortcutRow = require('./KeyboardShortcutRow');

var _KeyboardShortcutRow2 = _interopRequireDefault(_KeyboardShortcutRow);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOP_LEFT = exports.TOP_LEFT = 'top-left';
var TOP_RIGHT = exports.TOP_RIGHT = 'top-right';
var BOTTOM_RIGHT = exports.BOTTOM_RIGHT = 'bottom-right';

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  block: _propTypes2['default'].bool,
  buttonLocation: _propTypes2['default'].oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: _propTypes2['default'].bool,
  openKeyboardShortcutsPanel: _propTypes2['default'].func,
  closeKeyboardShortcutsPanel: _propTypes2['default'].func,
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.DayPickerKeyboardShortcutsPhrases))
}));

var defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel: function () {
    function openKeyboardShortcutsPanel() {}

    return openKeyboardShortcutsPanel;
  }(),
  closeKeyboardShortcutsPanel: function () {
    function closeKeyboardShortcutsPanel() {}

    return closeKeyboardShortcutsPanel;
  }(),

  phrases: _defaultPhrases.DayPickerKeyboardShortcutsPhrases
};

function getKeyboardShortcuts(phrases) {
  return [{
    unicode: '↵',
    label: phrases.enterKey,
    action: phrases.selectFocusedDate
  }, {
    unicode: '←/→',
    label: phrases.leftArrowRightArrow,
    action: phrases.moveFocusByOneDay
  }, {
    unicode: '↑/↓',
    label: phrases.upArrowDownArrow,
    action: phrases.moveFocusByOneWeek
  }, {
    unicode: 'PgUp/PgDn',
    label: phrases.pageUpPageDown,
    action: phrases.moveFocusByOneMonth
  }, {
    unicode: 'Home/End',
    label: phrases.homeEnd,
    action: phrases.moveFocustoStartAndEndOfWeek
  }, {
    unicode: 'Esc',
    label: phrases.escape,
    action: phrases.returnFocusToInput
  }, {
    unicode: '?',
    label: phrases.questionMark,
    action: phrases.openThisPanel
  }];
}

var DayPickerKeyboardShortcuts = function (_React$Component) {
  _inherits(DayPickerKeyboardShortcuts, _React$Component);

  function DayPickerKeyboardShortcuts() {
    var _ref;

    _classCallCheck(this, DayPickerKeyboardShortcuts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = DayPickerKeyboardShortcuts.__proto__ || Object.getPrototypeOf(DayPickerKeyboardShortcuts)).call.apply(_ref, [this].concat(args)));

    _this.keyboardShortcuts = getKeyboardShortcuts(_this.props.phrases);

    _this.onShowKeyboardShortcutsButtonClick = _this.onShowKeyboardShortcutsButtonClick.bind(_this);
    _this.setShowKeyboardShortcutsButtonRef = _this.setShowKeyboardShortcutsButtonRef.bind(_this);
    _this.setHideKeyboardShortcutsButtonRef = _this.setHideKeyboardShortcutsButtonRef.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }

  _createClass(DayPickerKeyboardShortcuts, [{
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        if (nextProps.phrases !== this.props.phrases) {
          this.keyboardShortcuts = getKeyboardShortcuts(nextProps.phrases);
        }
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate() {
        this.handleFocus();
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'onKeyDown',
    value: function () {
      function onKeyDown(e) {
        e.stopPropagation();

        var closeKeyboardShortcutsPanel = this.props.closeKeyboardShortcutsPanel;
        // Because the close button is the only focusable element inside of the panel, this
        // amounts to a very basic focus trap. The user can exit the panel by "pressing" the
        // close button or hitting escape

        switch (e.key) {
          case 'Enter':
          case ' ':
          case 'Spacebar': // for older browsers
          case 'Escape':
            closeKeyboardShortcutsPanel();
            break;

          // do nothing - this allows the up and down arrows continue their
          // default behavior of scrolling the content of the Keyboard Shortcuts Panel
          // which is needed when only a single month is shown for instance.
          case 'ArrowUp':
          case 'ArrowDown':
            break;

          // completely block the rest of the keys that have functionality outside of this panel
          case 'Tab':
          case 'Home':
          case 'End':
          case 'PageUp':
          case 'PageDown':
          case 'ArrowLeft':
          case 'ArrowRight':
            e.preventDefault();
            break;

          default:
            break;
        }
      }

      return onKeyDown;
    }()
  }, {
    key: 'onShowKeyboardShortcutsButtonClick',
    value: function () {
      function onShowKeyboardShortcutsButtonClick() {
        var _this2 = this;

        var openKeyboardShortcutsPanel = this.props.openKeyboardShortcutsPanel;

        // we want to return focus to this button after closing the keyboard shortcuts panel

        openKeyboardShortcutsPanel(function () {
          _this2.showKeyboardShortcutsButton.focus();
        });
      }

      return onShowKeyboardShortcutsButtonClick;
    }()
  }, {
    key: 'setShowKeyboardShortcutsButtonRef',
    value: function () {
      function setShowKeyboardShortcutsButtonRef(ref) {
        this.showKeyboardShortcutsButton = ref;
      }

      return setShowKeyboardShortcutsButtonRef;
    }()
  }, {
    key: 'setHideKeyboardShortcutsButtonRef',
    value: function () {
      function setHideKeyboardShortcutsButtonRef(ref) {
        this.hideKeyboardShortcutsButton = ref;
      }

      return setHideKeyboardShortcutsButtonRef;
    }()
  }, {
    key: 'handleFocus',
    value: function () {
      function handleFocus() {
        if (this.hideKeyboardShortcutsButton) {
          // automatically move focus into the dialog by moving
          // to the only interactive element, the hide button
          this.hideKeyboardShortcutsButton.focus();
        }
      }

      return handleFocus;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this3 = this;

        var _props = this.props,
            block = _props.block,
            buttonLocation = _props.buttonLocation,
            showKeyboardShortcutsPanel = _props.showKeyboardShortcutsPanel,
            closeKeyboardShortcutsPanel = _props.closeKeyboardShortcutsPanel,
            styles = _props.styles,
            phrases = _props.phrases;


        var toggleButtonText = showKeyboardShortcutsPanel ? phrases.hideKeyboardShortcutsPanel : phrases.showKeyboardShortcutsPanel;

        var bottomRight = buttonLocation === BOTTOM_RIGHT;
        var topRight = buttonLocation === TOP_RIGHT;
        var topLeft = buttonLocation === TOP_LEFT;

        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'button',
            _extends({
              ref: this.setShowKeyboardShortcutsButtonRef
            }, (0, _reactWithStyles.css)(styles.DayPickerKeyboardShortcuts_buttonReset, styles.DayPickerKeyboardShortcuts_show, bottomRight && styles.DayPickerKeyboardShortcuts_show__bottomRight, topRight && styles.DayPickerKeyboardShortcuts_show__topRight, topLeft && styles.DayPickerKeyboardShortcuts_show__topLeft), {
              type: 'button',
              'aria-label': toggleButtonText,
              onClick: this.onShowKeyboardShortcutsButtonClick,
              onKeyDown: function () {
                function onKeyDown(e) {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  } else if (e.key === 'Space') {
                    _this3.onShowKeyboardShortcutsButtonClick(e);
                  }
                }

                return onKeyDown;
              }(),
              onMouseUp: function () {
                function onMouseUp(e) {
                  e.currentTarget.blur();
                }

                return onMouseUp;
              }()
            }),
            _react2['default'].createElement(
              'span',
              (0, _reactWithStyles.css)(styles.DayPickerKeyboardShortcuts_showSpan, bottomRight && styles.DayPickerKeyboardShortcuts_showSpan__bottomRight, topRight && styles.DayPickerKeyboardShortcuts_showSpan__topRight, topLeft && styles.DayPickerKeyboardShortcuts_showSpan__topLeft),
              '?'
            )
          ),
          showKeyboardShortcutsPanel && _react2['default'].createElement(
            'div',
            _extends({}, (0, _reactWithStyles.css)(styles.DayPickerKeyboardShortcuts_panel), {
              role: 'dialog',
              'aria-labelledby': 'DayPickerKeyboardShortcuts_title',
              'aria-describedby': 'DayPickerKeyboardShortcuts_description'
            }),
            _react2['default'].createElement(
              'div',
              _extends({}, (0, _reactWithStyles.css)(styles.DayPickerKeyboardShortcuts_title), {
                id: 'DayPickerKeyboardShortcuts_title'
              }),
              phrases.keyboardShortcuts
            ),
            _react2['default'].createElement(
              'button',
              _extends({
                ref: this.setHideKeyboardShortcutsButtonRef
              }, (0, _reactWithStyles.css)(styles.DayPickerKeyboardShortcuts_buttonReset, styles.DayPickerKeyboardShortcuts_close), {
                type: 'button',
                tabIndex: '0',
                'aria-label': phrases.hideKeyboardShortcutsPanel,
                onClick: closeKeyboardShortcutsPanel,
                onKeyDown: this.onKeyDown
              }),
              _react2['default'].createElement(_CloseButton2['default'], (0, _reactWithStyles.css)(styles.DayPickerKeyboardShortcuts_closeSvg))
            ),
            _react2['default'].createElement(
              'ul',
              _extends({}, (0, _reactWithStyles.css)(styles.DayPickerKeyboardShortcuts_list), {
                id: 'DayPickerKeyboardShortcuts_description'
              }),
              this.keyboardShortcuts.map(function (_ref2) {
                var unicode = _ref2.unicode,
                    label = _ref2.label,
                    action = _ref2.action;
                return _react2['default'].createElement(_KeyboardShortcutRow2['default'], {
                  key: label,
                  unicode: unicode,
                  label: label,
                  action: action,
                  block: block
                });
              })
            )
          )
        );
      }

      return render;
    }()
  }]);

  return DayPickerKeyboardShortcuts;
}(_react2['default'].Component);

DayPickerKeyboardShortcuts.propTypes = propTypes;
DayPickerKeyboardShortcuts.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref3) {
  var _ref3$reactDates = _ref3.reactDates,
      color = _ref3$reactDates.color,
      font = _ref3$reactDates.font,
      zIndex = _ref3$reactDates.zIndex;
  return {
    DayPickerKeyboardShortcuts_buttonReset: {
      background: 'none',
      border: 0,
      borderRadius: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      padding: 0,
      cursor: 'pointer',
      fontSize: font.size,

      ':active': {
        outline: 'none'
      }
    },

    DayPickerKeyboardShortcuts_show: {
      width: 22,
      position: 'absolute',
      zIndex: zIndex + 2
    },

    DayPickerKeyboardShortcuts_show__bottomRight: {
      borderTop: '26px solid transparent',
      borderRight: '33px solid ' + String(color.core.primary),
      bottom: 0,
      right: 0,

      ':hover': {
        borderRight: '33px solid ' + String(color.core.primary_dark)
      }
    },

    DayPickerKeyboardShortcuts_show__topRight: {
      borderBottom: '26px solid transparent',
      borderRight: '33px solid ' + String(color.core.primary),
      top: 0,
      right: 0,

      ':hover': {
        borderRight: '33px solid ' + String(color.core.primary_dark)
      }
    },

    DayPickerKeyboardShortcuts_show__topLeft: {
      borderBottom: '26px solid transparent',
      borderLeft: '33px solid ' + String(color.core.primary),
      top: 0,
      left: 0,

      ':hover': {
        borderLeft: '33px solid ' + String(color.core.primary_dark)
      }
    },

    DayPickerKeyboardShortcuts_showSpan: {
      color: color.core.white,
      position: 'absolute'
    },

    DayPickerKeyboardShortcuts_showSpan__bottomRight: {
      bottom: 0,
      right: -28
    },

    DayPickerKeyboardShortcuts_showSpan__topRight: {
      top: 1,
      right: -28
    },

    DayPickerKeyboardShortcuts_showSpan__topLeft: {
      top: 1,
      left: -28
    },

    DayPickerKeyboardShortcuts_panel: {
      overflow: 'auto',
      background: color.background,
      border: '1px solid ' + String(color.core.border),
      borderRadius: 2,
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: zIndex + 2,
      padding: 22,
      margin: 33
    },

    DayPickerKeyboardShortcuts_title: {
      fontSize: 16,
      fontWeight: 'bold',
      margin: 0
    },

    DayPickerKeyboardShortcuts_list: {
      listStyle: 'none',
      padding: 0,
      fontSize: font.size
    },

    DayPickerKeyboardShortcuts_close: {
      position: 'absolute',
      right: 22,
      top: 22,
      zIndex: zIndex + 2,

      ':active': {
        outline: 'none'
      }
    },

    DayPickerKeyboardShortcuts_closeSvg: {
      height: 15,
      width: 15,
      fill: color.core.grayLighter,

      ':hover': {
        fill: color.core.grayLight
      },

      ':focus': {
        fill: color.core.grayLight
      }
    }
  };
})(DayPickerKeyboardShortcuts);