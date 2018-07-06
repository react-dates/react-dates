Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _LeftArrow = require('./LeftArrow');

var _LeftArrow2 = _interopRequireDefault(_LeftArrow);

var _RightArrow = require('./RightArrow');

var _RightArrow2 = _interopRequireDefault(_RightArrow);

var _ChevronUp = require('./ChevronUp');

var _ChevronUp2 = _interopRequireDefault(_ChevronUp);

var _ChevronDown = require('./ChevronDown');

var _ChevronDown2 = _interopRequireDefault(_ChevronDown);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  navPrev: _propTypes2['default'].node,
  navNext: _propTypes2['default'].node,
  orientation: _ScrollableOrientationShape2['default'],

  onPrevMonthClick: _propTypes2['default'].func,
  onNextMonthClick: _propTypes2['default'].func,

  // internationalization
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.DayPickerNavigationPhrases)),

  isRTL: _propTypes2['default'].bool
}));

var defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: _constants.HORIZONTAL_ORIENTATION,

  onPrevMonthClick: function () {
    function onPrevMonthClick() {}

    return onPrevMonthClick;
  }(),
  onNextMonthClick: function () {
    function onNextMonthClick() {}

    return onNextMonthClick;
  }(),


  // internationalization
  phrases: _defaultPhrases.DayPickerNavigationPhrases,
  isRTL: false
};

function DayPickerNavigation(_ref) {
  var navPrev = _ref.navPrev,
      navNext = _ref.navNext,
      onPrevMonthClick = _ref.onPrevMonthClick,
      onNextMonthClick = _ref.onNextMonthClick,
      orientation = _ref.orientation,
      phrases = _ref.phrases,
      isRTL = _ref.isRTL,
      styles = _ref.styles;

  var isHorizontal = orientation === _constants.HORIZONTAL_ORIENTATION;
  var isVertical = orientation !== _constants.HORIZONTAL_ORIENTATION;
  var isVerticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;

  var navPrevIcon = navPrev;
  var navNextIcon = navNext;
  var isDefaultNavPrev = false;
  var isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    var Icon = isVertical ? _ChevronUp2['default'] : _LeftArrow2['default'];
    if (isRTL && !isVertical) {
      Icon = _RightArrow2['default'];
    }
    navPrevIcon = _react2['default'].createElement(Icon, (0, _reactWithStyles.css)(isHorizontal && styles.DayPickerNavigation_svg__horizontal, isVertical && styles.DayPickerNavigation_svg__vertical));
  }

  if (!navNextIcon) {
    isDefaultNavNext = true;
    var _Icon = isVertical ? _ChevronDown2['default'] : _RightArrow2['default'];
    if (isRTL && !isVertical) {
      _Icon = _LeftArrow2['default'];
    }
    navNextIcon = _react2['default'].createElement(_Icon, (0, _reactWithStyles.css)(isHorizontal && styles.DayPickerNavigation_svg__horizontal, isVertical && styles.DayPickerNavigation_svg__vertical));
  }

  var isDefaultNav = isVerticalScrollable ? isDefaultNavNext : isDefaultNavNext || isDefaultNavPrev;

  return _react2['default'].createElement(
    'div',
    _reactWithStyles.css.apply(undefined, [styles.DayPickerNavigation, isHorizontal && styles.DayPickerNavigation__horizontal].concat(_toConsumableArray(isVertical && [styles.DayPickerNavigation__vertical, isDefaultNav && styles.DayPickerNavigation__verticalDefault]), _toConsumableArray(isVerticalScrollable && [styles.DayPickerNavigation__verticalScrollable, isDefaultNav && styles.DayPickerNavigation__verticalScrollableDefault]))),
    !isVerticalScrollable && _react2['default'].createElement(
      'button',
      _extends({}, _reactWithStyles.css.apply(undefined, [styles.DayPickerNavigation_button, isDefaultNavPrev && styles.DayPickerNavigation_button__default].concat(_toConsumableArray(isHorizontal && [styles.DayPickerNavigation_button__horizontal].concat(_toConsumableArray(isDefaultNavPrev && [styles.DayPickerNavigation_button__horizontalDefault, !isRTL && styles.DayPickerNavigation_leftButton__horizontalDefault, isRTL && styles.DayPickerNavigation_rightButton__horizontalDefault]))), _toConsumableArray(isVertical && [styles.DayPickerNavigation_button__vertical].concat(_toConsumableArray(isDefaultNavPrev && [styles.DayPickerNavigation_button__verticalDefault, styles.DayPickerNavigation_prevButton__verticalDefault]))))), {
        type: 'button',
        'aria-label': phrases.jumpToPrevMonth,
        onClick: onPrevMonthClick,
        onMouseUp: function () {
          function onMouseUp(e) {
            e.currentTarget.blur();
          }

          return onMouseUp;
        }()
      }),
      navPrevIcon
    ),
    _react2['default'].createElement(
      'button',
      _extends({}, _reactWithStyles.css.apply(undefined, [styles.DayPickerNavigation_button, isDefaultNavNext && styles.DayPickerNavigation_button__default].concat(_toConsumableArray(isHorizontal && [styles.DayPickerNavigation_button__horizontal].concat(_toConsumableArray(isDefaultNavNext && [styles.DayPickerNavigation_button__horizontalDefault, isRTL && styles.DayPickerNavigation_leftButton__horizontalDefault, !isRTL && styles.DayPickerNavigation_rightButton__horizontalDefault]))), _toConsumableArray(isVertical && [styles.DayPickerNavigation_button__vertical, styles.DayPickerNavigation_nextButton__vertical].concat(_toConsumableArray(isDefaultNavNext && [styles.DayPickerNavigation_button__verticalDefault, styles.DayPickerNavigation_nextButton__verticalDefault, isVerticalScrollable && styles.DayPickerNavigation_nextButton__verticalScrollableDefault]))))), {
        type: 'button',
        'aria-label': phrases.jumpToNextMonth,
        onClick: onNextMonthClick,
        onMouseUp: function () {
          function onMouseUp(e) {
            e.currentTarget.blur();
          }

          return onMouseUp;
        }()
      }),
      navNextIcon
    ),
    _react2['default'].createElement('div', (0, _reactWithStyles.css)(styles.DayPickerNavigation_line))
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _DayPickerNavigation;

  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      zIndex = _ref2$reactDates.zIndex;
  return {
    DayPickerNavigation: (_DayPickerNavigation = {
      position: 'relative',
      zIndex: zIndex + 2
    }, _defineProperty(_DayPickerNavigation, 'position', 'absolute'), _defineProperty(_DayPickerNavigation, 'width', '100%'), _defineProperty(_DayPickerNavigation, 'top', 12), _DayPickerNavigation),

    DayPickerNavigation_line: {
      backgroundColor: color.navigationLine,
      height: 1,
      opacity: 0.18,
      width: 'calc(100% - 28px)',
      left: '14px',
      bottom: '-6px',
      position: 'absolute'
    },

    DayPickerNavigation__horizontal: {},
    DayPickerNavigation__vertical: {},
    DayPickerNavigation__verticalScrollable: {},

    DayPickerNavigation__verticalDefault: {
      position: 'absolute',
      width: '100%',
      height: 52,
      bottom: 0,
      left: 0
    },

    DayPickerNavigation__verticalScrollableDefault: {
      position: 'relative'
    },

    DayPickerNavigation_button: {
      cursor: 'pointer',
      userSelect: 'none',
      border: 0,
      padding: 0,
      margin: 0
    },

    DayPickerNavigation_button__default: {
      border: 'none',
      backgroundColor: 'none',
      color: color.placeholderText,

      ':focus': {
        border: '1px solid ' + String(color.core.borderMedium)
      },

      ':hover': {
        border: '1px solid ' + String(color.core.borderMedium)
      },

      ':active': {
        background: color.backgroundDark
      }
    },

    DayPickerNavigation_button__horizontal: {
      lineHeight: 0.78,
      borderRadius: 3,
      backgroundColor: 'transparent',
      height: '24px'
    },

    DayPickerNavigation_button__horizontalDefault: {
      position: 'absolute',
      top: 18,
      lineHeight: 0.78,
      borderRadius: 3,
      padding: '6px 9px'
    },

    DayPickerNavigation_leftButton__horizontalDefault: {
      left: 22
    },

    DayPickerNavigation_rightButton__horizontalDefault: {
      right: 22
    },

    DayPickerNavigation_button__vertical: {},

    DayPickerNavigation_button__verticalDefault: {
      padding: 5,
      background: color.background,
      boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      display: 'inline-block',
      height: '100%',
      width: '50%'
    },

    DayPickerNavigation_prevButton__verticalDefault: {},

    DayPickerNavigation_nextButton__verticalDefault: {
      borderLeft: 0
    },

    DayPickerNavigation_nextButton__verticalScrollableDefault: {
      width: '100%'
    },

    DayPickerNavigation_svg__horizontal: {
      height: 19,
      width: 19,
      fill: color.core.grayLight
    },

    DayPickerNavigation_svg__vertical: {
      height: 42,
      width: 42,
      fill: color.text
    }
  };
})(DayPickerNavigation);