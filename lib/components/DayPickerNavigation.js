"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _reactWithStyles = require("react-with-styles");

var _defaultPhrases = require("../defaultPhrases");

var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));

var _noflip = _interopRequireDefault(require("../utils/noflip"));

var _LeftArrow = _interopRequireDefault(require("./LeftArrow"));

var _RightArrow = _interopRequireDefault(require("./RightArrow"));

var _ChevronUp = _interopRequireDefault(require("./ChevronUp"));

var _ChevronDown = _interopRequireDefault(require("./ChevronDown"));

var _NavPositionShape = _interopRequireDefault(require("../shapes/NavPositionShape"));

var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var propTypes = process.env.NODE_ENV !== "production" ? (0, _airbnbPropTypes.forbidExtraProps)(_objectSpread(_objectSpread({}, _reactWithStyles.withStylesPropTypes), {}, {
  disablePrev: _propTypes["default"].bool,
  disableNext: _propTypes["default"].bool,
  inlineStyles: _propTypes["default"].object,
  isRTL: _propTypes["default"].bool,
  navPosition: _NavPositionShape["default"],
  navPrev: _propTypes["default"].node,
  navNext: _propTypes["default"].node,
  orientation: _ScrollableOrientationShape["default"],
  onPrevMonthClick: _propTypes["default"].func,
  onNextMonthClick: _propTypes["default"].func,
  // internationalization
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DayPickerNavigationPhrases)),
  renderNavPrevButton: _propTypes["default"].func,
  renderNavNextButton: _propTypes["default"].func,
  showNavPrevButton: _propTypes["default"].bool,
  showNavNextButton: _propTypes["default"].bool
})) : {};
var defaultProps = {
  disablePrev: false,
  disableNext: false,
  inlineStyles: null,
  isRTL: false,
  navPosition: _constants.NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  // internationalization
  phrases: _defaultPhrases.DayPickerNavigationPhrases,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  showNavPrevButton: true,
  showNavNextButton: true
};

var DayPickerNavigation = /*#__PURE__*/function (_ref2, _ref) {
  (0, _inheritsLoose2["default"])(DayPickerNavigation, _ref2);

  function DayPickerNavigation() {
    return _ref2.apply(this, arguments) || this;
  }

  var _proto = DayPickerNavigation.prototype;

  _proto[_ref] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        inlineStyles = _this$props.inlineStyles,
        isRTL = _this$props.isRTL,
        disablePrev = _this$props.disablePrev,
        disableNext = _this$props.disableNext,
        navPosition = _this$props.navPosition,
        navPrev = _this$props.navPrev,
        navNext = _this$props.navNext,
        onPrevMonthClick = _this$props.onPrevMonthClick,
        onNextMonthClick = _this$props.onNextMonthClick,
        orientation = _this$props.orientation,
        phrases = _this$props.phrases,
        renderNavPrevButton = _this$props.renderNavPrevButton,
        renderNavNextButton = _this$props.renderNavNextButton,
        showNavPrevButton = _this$props.showNavPrevButton,
        showNavNextButton = _this$props.showNavNextButton,
        css = _this$props.css,
        styles = _this$props.styles;

    if (!showNavNextButton && !showNavPrevButton) {
      return null;
    }

    var isHorizontal = orientation === _constants.HORIZONTAL_ORIENTATION;
    var isVertical = orientation !== _constants.HORIZONTAL_ORIENTATION;
    var isVerticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
    var isBottomNavPosition = navPosition === _constants.NAV_POSITION_BOTTOM;
    var hasInlineStyles = !!inlineStyles;
    var navPrevIcon = navPrev;
    var navNextIcon = navNext;
    var isDefaultNavPrev = false;
    var isDefaultNavNext = false;
    var navPrevTabIndex = {};
    var navNextTabIndex = {};

    if (!navPrevIcon && !renderNavPrevButton && showNavPrevButton) {
      navPrevTabIndex = {
        tabIndex: '0'
      };
      isDefaultNavPrev = true;
      var Icon = isVertical ? _ChevronUp["default"] : _LeftArrow["default"];

      if (isRTL && !isVertical) {
        Icon = _RightArrow["default"];
      }

      navPrevIcon = /*#__PURE__*/_react["default"].createElement(Icon, css(isHorizontal && styles.DayPickerNavigation_svg__horizontal, isVertical && styles.DayPickerNavigation_svg__vertical, disablePrev && styles.DayPickerNavigation_svg__disabled));
    }

    if (!navNextIcon && !renderNavNextButton && showNavNextButton) {
      navNextTabIndex = {
        tabIndex: '0'
      };
      isDefaultNavNext = true;

      var _Icon = isVertical ? _ChevronDown["default"] : _RightArrow["default"];

      if (isRTL && !isVertical) {
        _Icon = _LeftArrow["default"];
      }

      navNextIcon = /*#__PURE__*/_react["default"].createElement(_Icon, css(isHorizontal && styles.DayPickerNavigation_svg__horizontal, isVertical && styles.DayPickerNavigation_svg__vertical, disableNext && styles.DayPickerNavigation_svg__disabled));
    }

    var isDefaultNav = isDefaultNavNext || isDefaultNavPrev;
    return /*#__PURE__*/_react["default"].createElement("div", css.apply(void 0, [styles.DayPickerNavigation, isHorizontal && styles.DayPickerNavigation__horizontal].concat((0, _toConsumableArray2["default"])(isVertical ? [styles.DayPickerNavigation__vertical, isDefaultNav && styles.DayPickerNavigation__verticalDefault] : []), (0, _toConsumableArray2["default"])(isVerticalScrollable ? [styles.DayPickerNavigation__verticalScrollable, isDefaultNav && styles.DayPickerNavigation__verticalScrollableDefault, showNavPrevButton && styles.DayPickerNavigation__verticalScrollable_prevNav] : []), (0, _toConsumableArray2["default"])(isBottomNavPosition ? [styles.DayPickerNavigation__bottom, isDefaultNav && styles.DayPickerNavigation__bottomDefault] : []), [hasInlineStyles && inlineStyles])), showNavPrevButton && (renderNavPrevButton ? renderNavPrevButton({
      ariaLabel: phrases.jumpToPrevMonth,
      disabled: disablePrev,
      onClick: disablePrev ? undefined : onPrevMonthClick,
      onKeyUp: disablePrev ? undefined : function (e) {
        var key = e.key;

        if (key === 'Enter' || key === ' ') {
          onPrevMonthClick(e);
        }
      },
      onMouseUp: disablePrev ? undefined : function (e) {
        e.currentTarget.blur();
      }
    }) : /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
      // eslint-disable-line jsx-a11y/interactive-supports-focus
      role: "button"
    }, navPrevTabIndex, css.apply(void 0, [styles.DayPickerNavigation_button, isDefaultNavPrev && styles.DayPickerNavigation_button__default, disablePrev && styles.DayPickerNavigation_button__disabled].concat((0, _toConsumableArray2["default"])(isHorizontal ? [styles.DayPickerNavigation_button__horizontal].concat((0, _toConsumableArray2["default"])(isDefaultNavPrev ? [styles.DayPickerNavigation_button__horizontalDefault, isBottomNavPosition && styles.DayPickerNavigation_bottomButton__horizontalDefault, !isRTL && styles.DayPickerNavigation_leftButton__horizontalDefault, isRTL && styles.DayPickerNavigation_rightButton__horizontalDefault] : [])) : []), (0, _toConsumableArray2["default"])(isVertical ? [styles.DayPickerNavigation_button__vertical].concat((0, _toConsumableArray2["default"])(isDefaultNavPrev ? [styles.DayPickerNavigation_button__verticalDefault, styles.DayPickerNavigation_prevButton__verticalDefault, isVerticalScrollable && styles.DayPickerNavigation_prevButton__verticalScrollableDefault] : [])) : []))), {
      "aria-disabled": disablePrev ? true : undefined,
      "aria-label": phrases.jumpToPrevMonth,
      onClick: disablePrev ? undefined : onPrevMonthClick,
      onKeyUp: disablePrev ? undefined : function (e) {
        var key = e.key;

        if (key === 'Enter' || key === ' ') {
          onPrevMonthClick(e);
        }
      },
      onMouseUp: disablePrev ? undefined : function (e) {
        e.currentTarget.blur();
      }
    }), navPrevIcon)), showNavNextButton && (renderNavNextButton ? renderNavNextButton({
      ariaLabel: phrases.jumpToNextMonth,
      disabled: disableNext,
      onClick: disableNext ? undefined : onNextMonthClick,
      onKeyUp: disableNext ? undefined : function (e) {
        var key = e.key;

        if (key === 'Enter' || key === ' ') {
          onNextMonthClick(e);
        }
      },
      onMouseUp: disableNext ? undefined : function (e) {
        e.currentTarget.blur();
      }
    }) : /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
      // eslint-disable-line jsx-a11y/interactive-supports-focus
      role: "button"
    }, navNextTabIndex, css.apply(void 0, [styles.DayPickerNavigation_button, isDefaultNavNext && styles.DayPickerNavigation_button__default, disableNext && styles.DayPickerNavigation_button__disabled].concat((0, _toConsumableArray2["default"])(isHorizontal ? [styles.DayPickerNavigation_button__horizontal].concat((0, _toConsumableArray2["default"])(isDefaultNavNext ? [styles.DayPickerNavigation_button__horizontalDefault, isBottomNavPosition && styles.DayPickerNavigation_bottomButton__horizontalDefault, isRTL && styles.DayPickerNavigation_leftButton__horizontalDefault, !isRTL && styles.DayPickerNavigation_rightButton__horizontalDefault] : [])) : []), (0, _toConsumableArray2["default"])(isVertical ? [styles.DayPickerNavigation_button__vertical].concat((0, _toConsumableArray2["default"])(isDefaultNavNext ? [styles.DayPickerNavigation_button__verticalDefault, styles.DayPickerNavigation_nextButton__verticalDefault, isVerticalScrollable && styles.DayPickerNavigation_nextButton__verticalScrollableDefault] : [])) : []))), {
      "aria-disabled": disableNext ? true : undefined,
      "aria-label": phrases.jumpToNextMonth,
      onClick: disableNext ? undefined : onNextMonthClick,
      onKeyUp: disableNext ? undefined : function (e) {
        var key = e.key;

        if (key === 'Enter' || key === ' ') {
          onNextMonthClick(e);
        }
      },
      onMouseUp: disableNext ? undefined : function (e) {
        e.currentTarget.blur();
      }
    }), navNextIcon)));
  };

  return DayPickerNavigation;
}(_react["default"].PureComponent || _react["default"].Component, !_react["default"].PureComponent && "shouldComponentUpdate");

DayPickerNavigation.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerNavigation.defaultProps = defaultProps;

var _default = (0, _reactWithStyles.withStyles)(function (_ref3) {
  var _ref3$reactDates = _ref3.reactDates,
      color = _ref3$reactDates.color,
      zIndex = _ref3$reactDates.zIndex;
  return {
    DayPickerNavigation: {
      position: 'relative',
      zIndex: zIndex + 2
    },
    DayPickerNavigation__horizontal: {
      height: 0
    },
    DayPickerNavigation__vertical: {},
    DayPickerNavigation__verticalScrollable: {},
    DayPickerNavigation__verticalScrollable_prevNav: {
      zIndex: zIndex + 1 // zIndex + 2 causes the button to show on top of the day of week headers

    },
    DayPickerNavigation__verticalDefault: {
      position: 'absolute',
      width: '100%',
      height: 52,
      bottom: 0,
      left: (0, _noflip["default"])(0)
    },
    DayPickerNavigation__verticalScrollableDefault: {
      position: 'relative'
    },
    DayPickerNavigation__bottom: {
      height: 'auto'
    },
    DayPickerNavigation__bottomDefault: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    DayPickerNavigation_button: {
      cursor: 'pointer',
      userSelect: 'none',
      border: 0,
      padding: 0,
      margin: 0
    },
    DayPickerNavigation_button__default: {
      border: "1px solid ".concat(color.core.borderLight),
      backgroundColor: color.background,
      color: color.placeholderText,
      ':focus': {
        border: "1px solid ".concat(color.core.borderMedium)
      },
      ':hover': {
        border: "1px solid ".concat(color.core.borderMedium)
      },
      ':active': {
        background: color.backgroundDark
      }
    },
    DayPickerNavigation_button__disabled: {
      cursor: 'default',
      border: "1px solid ".concat(color.disabled),
      ':focus': {
        border: "1px solid ".concat(color.disabled)
      },
      ':hover': {
        border: "1px solid ".concat(color.disabled)
      },
      ':active': {
        background: 'none'
      }
    },
    DayPickerNavigation_button__horizontal: {},
    DayPickerNavigation_button__horizontalDefault: {
      position: 'absolute',
      top: 18,
      lineHeight: 0.78,
      borderRadius: 3,
      padding: '6px 9px'
    },
    DayPickerNavigation_bottomButton__horizontalDefault: {
      position: 'static',
      marginLeft: 22,
      marginRight: 22,
      marginBottom: 30,
      marginTop: -10
    },
    DayPickerNavigation_leftButton__horizontalDefault: {
      left: (0, _noflip["default"])(22)
    },
    DayPickerNavigation_rightButton__horizontalDefault: {
      right: (0, _noflip["default"])(22)
    },
    DayPickerNavigation_button__vertical: {},
    DayPickerNavigation_button__verticalDefault: {
      padding: 5,
      background: color.background,
      boxShadow: (0, _noflip["default"])('0 0 5px 2px rgba(0, 0, 0, 0.1)'),
      position: 'relative',
      display: 'inline-block',
      textAlign: 'center',
      height: '100%',
      width: '50%'
    },
    DayPickerNavigation_prevButton__verticalDefault: {},
    DayPickerNavigation_nextButton__verticalDefault: {
      borderLeft: (0, _noflip["default"])(0)
    },
    DayPickerNavigation_nextButton__verticalScrollableDefault: {
      width: '100%'
    },
    DayPickerNavigation_prevButton__verticalScrollableDefault: {
      width: '100%'
    },
    DayPickerNavigation_svg__horizontal: {
      height: 19,
      width: 19,
      fill: color.core.grayLight,
      display: 'block'
    },
    DayPickerNavigation_svg__vertical: {
      height: 42,
      width: 42,
      fill: color.text
    },
    DayPickerNavigation_svg__disabled: {
      fill: color.disabled
    }
  };
}, {
  pureComponent: typeof _react["default"].PureComponent !== 'undefined'
})(DayPickerNavigation);

exports["default"] = _default;