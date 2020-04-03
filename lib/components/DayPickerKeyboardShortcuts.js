"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BOTTOM_RIGHT = exports.TOP_RIGHT = exports.TOP_LEFT = void 0;

var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _reactWithStyles = require("react-with-styles");

var _defaultPhrases = require("../defaultPhrases");

var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));

var _KeyboardShortcutRow = _interopRequireDefault(require("./KeyboardShortcutRow"));

var _CloseButton = _interopRequireDefault(require("./CloseButton"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TOP_LEFT = 'top-left';
exports.TOP_LEFT = TOP_LEFT;
var TOP_RIGHT = 'top-right';
exports.TOP_RIGHT = TOP_RIGHT;
var BOTTOM_RIGHT = 'bottom-right';
exports.BOTTOM_RIGHT = BOTTOM_RIGHT;
var propTypes = process.env.NODE_ENV !== "production" ? (0, _airbnbPropTypes.forbidExtraProps)(_objectSpread({}, _reactWithStyles.withStylesPropTypes, {
  block: _propTypes["default"].bool,
  // TODO: rename button location to be direction-agnostic
  buttonLocation: _propTypes["default"].oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: _propTypes["default"].bool,
  openKeyboardShortcutsPanel: _propTypes["default"].func,
  closeKeyboardShortcutsPanel: _propTypes["default"].func,
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DayPickerKeyboardShortcutsPhrases)),
  renderKeyboardShortcutsButton: _propTypes["default"].func
})) : {};
var defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel: function openKeyboardShortcutsPanel() {},
  closeKeyboardShortcutsPanel: function closeKeyboardShortcutsPanel() {},
  phrases: _defaultPhrases.DayPickerKeyboardShortcutsPhrases,
  renderKeyboardShortcutsButton: undefined
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

var DayPickerKeyboardShortcuts = /*#__PURE__*/function (_ref) {
  (0, _inheritsLoose2["default"])(DayPickerKeyboardShortcuts, _ref);

  var _super = _createSuper(DayPickerKeyboardShortcuts);

  var _proto = DayPickerKeyboardShortcuts.prototype;

  _proto[!_react["default"].PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };

  function DayPickerKeyboardShortcuts() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ref.call.apply(_ref, [this].concat(args)) || this;
    var phrases = _this.props.phrases;
    _this.keyboardShortcuts = getKeyboardShortcuts(phrases);
    _this.onShowKeyboardShortcutsButtonClick = _this.onShowKeyboardShortcutsButtonClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setShowKeyboardShortcutsButtonRef = _this.setShowKeyboardShortcutsButtonRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setHideKeyboardShortcutsButtonRef = _this.setHideKeyboardShortcutsButtonRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var phrases = this.props.phrases;

    if (nextProps.phrases !== phrases) {
      this.keyboardShortcuts = getKeyboardShortcuts(nextProps.phrases);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.handleFocus();
  };

  _proto.onKeyDown = function onKeyDown(e) {
    e.stopPropagation();
    var closeKeyboardShortcutsPanel = this.props.closeKeyboardShortcutsPanel; // Because the close button is the only focusable element inside of the panel, this
    // amounts to a very basic focus trap. The user can exit the panel by "pressing" the
    // close button or hitting escape

    switch (e.key) {
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
  };

  _proto.onShowKeyboardShortcutsButtonClick = function onShowKeyboardShortcutsButtonClick() {
    var _this2 = this;

    var openKeyboardShortcutsPanel = this.props.openKeyboardShortcutsPanel; // we want to return focus to this button after closing the keyboard shortcuts panel

    openKeyboardShortcutsPanel(function () {
      _this2.showKeyboardShortcutsButton.focus();
    });
  };

  _proto.setShowKeyboardShortcutsButtonRef = function setShowKeyboardShortcutsButtonRef(ref) {
    this.showKeyboardShortcutsButton = ref;
  };

  _proto.setHideKeyboardShortcutsButtonRef = function setHideKeyboardShortcutsButtonRef(ref) {
    this.hideKeyboardShortcutsButton = ref;
  };

  _proto.handleFocus = function handleFocus() {
    if (this.hideKeyboardShortcutsButton) {
      // automatically move focus into the dialog by moving
      // to the only interactive element, the hide button
      this.hideKeyboardShortcutsButton.focus();
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        block = _this$props.block,
        buttonLocation = _this$props.buttonLocation,
        css = _this$props.css,
        showKeyboardShortcutsPanel = _this$props.showKeyboardShortcutsPanel,
        closeKeyboardShortcutsPanel = _this$props.closeKeyboardShortcutsPanel,
        styles = _this$props.styles,
        phrases = _this$props.phrases,
        renderKeyboardShortcutsButton = _this$props.renderKeyboardShortcutsButton;
    var toggleButtonText = showKeyboardShortcutsPanel ? phrases.hideKeyboardShortcutsPanel : phrases.showKeyboardShortcutsPanel;
    var bottomRight = buttonLocation === BOTTOM_RIGHT;
    var topRight = buttonLocation === TOP_RIGHT;
    var topLeft = buttonLocation === TOP_LEFT;
    return /*#__PURE__*/_react["default"].createElement("div", null, renderKeyboardShortcutsButton && renderKeyboardShortcutsButton({
      // passing in context-specific props
      ref: this.setShowKeyboardShortcutsButtonRef,
      onClick: this.onShowKeyboardShortcutsButtonClick,
      ariaLabel: toggleButtonText
    }), renderKeyboardShortcutsButton || /*#__PURE__*/_react["default"].createElement("button", (0, _extends2["default"])({
      ref: this.setShowKeyboardShortcutsButtonRef
    }, css(styles.DayPickerKeyboardShortcuts_buttonReset, styles.DayPickerKeyboardShortcuts_show, bottomRight && styles.DayPickerKeyboardShortcuts_show__bottomRight, topRight && styles.DayPickerKeyboardShortcuts_show__topRight, topLeft && styles.DayPickerKeyboardShortcuts_show__topLeft), {
      type: "button",
      "aria-label": toggleButtonText,
      onClick: this.onShowKeyboardShortcutsButtonClick,
      onMouseUp: function onMouseUp(e) {
        e.currentTarget.blur();
      }
    }), /*#__PURE__*/_react["default"].createElement("span", css(styles.DayPickerKeyboardShortcuts_showSpan, bottomRight && styles.DayPickerKeyboardShortcuts_showSpan__bottomRight, topRight && styles.DayPickerKeyboardShortcuts_showSpan__topRight, topLeft && styles.DayPickerKeyboardShortcuts_showSpan__topLeft), "?")), showKeyboardShortcutsPanel && /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, css(styles.DayPickerKeyboardShortcuts_panel), {
      role: "dialog",
      "aria-labelledby": "DayPickerKeyboardShortcuts_title",
      "aria-describedby": "DayPickerKeyboardShortcuts_description"
    }), /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, css(styles.DayPickerKeyboardShortcuts_title), {
      id: "DayPickerKeyboardShortcuts_title"
    }), phrases.keyboardShortcuts), /*#__PURE__*/_react["default"].createElement("button", (0, _extends2["default"])({
      ref: this.setHideKeyboardShortcutsButtonRef
    }, css(styles.DayPickerKeyboardShortcuts_buttonReset, styles.DayPickerKeyboardShortcuts_close), {
      type: "button",
      tabIndex: "0",
      "aria-label": phrases.hideKeyboardShortcutsPanel,
      onClick: closeKeyboardShortcutsPanel,
      onKeyDown: this.onKeyDown
    }), /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], css(styles.DayPickerKeyboardShortcuts_closeSvg))), /*#__PURE__*/_react["default"].createElement("ul", (0, _extends2["default"])({}, css(styles.DayPickerKeyboardShortcuts_list), {
      id: "DayPickerKeyboardShortcuts_description"
    }), this.keyboardShortcuts.map(function (_ref2) {
      var unicode = _ref2.unicode,
          label = _ref2.label,
          action = _ref2.action;
      return /*#__PURE__*/_react["default"].createElement(_KeyboardShortcutRow["default"], {
        key: label,
        unicode: unicode,
        label: label,
        action: action,
        block: block
      });
    }))));
  };

  return DayPickerKeyboardShortcuts;
}(_react["default"].PureComponent || _react["default"].Component);

DayPickerKeyboardShortcuts.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerKeyboardShortcuts.defaultProps = defaultProps;

var _default = (0, _reactWithStyles.withStyles)(function (_ref3) {
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
      width: 33,
      height: 26,
      position: 'absolute',
      zIndex: zIndex + 2,
      '::before': {
        content: '""',
        display: 'block',
        position: 'absolute'
      }
    },
    DayPickerKeyboardShortcuts_show__bottomRight: {
      bottom: 0,
      right: 0,
      '::before': {
        borderTop: '26px solid transparent',
        borderRight: "33px solid ".concat(color.core.primary),
        bottom: 0,
        right: 0
      },
      ':hover::before': {
        borderRight: "33px solid ".concat(color.core.primary_dark)
      }
    },
    DayPickerKeyboardShortcuts_show__topRight: {
      top: 0,
      right: 0,
      '::before': {
        borderBottom: '26px solid transparent',
        borderRight: "33px solid ".concat(color.core.primary),
        top: 0,
        right: 0
      },
      ':hover::before': {
        borderRight: "33px solid ".concat(color.core.primary_dark)
      }
    },
    DayPickerKeyboardShortcuts_show__topLeft: {
      top: 0,
      left: 0,
      '::before': {
        borderBottom: '26px solid transparent',
        borderLeft: "33px solid ".concat(color.core.primary),
        top: 0,
        left: 0
      },
      ':hover::before': {
        borderLeft: "33px solid ".concat(color.core.primary_dark)
      }
    },
    DayPickerKeyboardShortcuts_showSpan: {
      color: color.core.white,
      position: 'absolute'
    },
    DayPickerKeyboardShortcuts_showSpan__bottomRight: {
      bottom: 0,
      right: 5
    },
    DayPickerKeyboardShortcuts_showSpan__topRight: {
      top: 1,
      right: 5
    },
    DayPickerKeyboardShortcuts_showSpan__topLeft: {
      top: 1,
      left: 5
    },
    DayPickerKeyboardShortcuts_panel: {
      overflow: 'auto',
      background: color.background,
      border: "1px solid ".concat(color.core.border),
      borderRadius: 2,
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: zIndex + 2,
      padding: 22,
      margin: 33,
      textAlign: 'left' // TODO: investigate use of text-align throughout the library

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
}, {
  pureComponent: typeof _react["default"].PureComponent !== 'undefined'
})(DayPickerKeyboardShortcuts);

exports["default"] = _default;