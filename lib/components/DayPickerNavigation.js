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

  return _react2['default'].createElement(
    'div',
    (0, _reactWithStyles.css)(styles.DayPickerNavigation_container, isHorizontal && styles.DayPickerNavigation_container__horizontal, isVertical && styles.DayPickerNavigation_container__vertical, isVerticalScrollable && styles.DayPickerNavigation_container__verticalScrollable),
    !isVerticalScrollable && _react2['default'].createElement(
      'button',
      _extends({}, _reactWithStyles.css.apply(undefined, [styles.DayPickerNavigation_button, isDefaultNavPrev && styles.DayPickerNavigation_button__default].concat(_toConsumableArray(isHorizontal && [styles.DayPickerNavigation_button__horizontal, !isRTL && styles.DayPickerNavigation_leftButton__horizontal, isRTL && styles.DayPickerNavigation_rightButton__horizontal]), _toConsumableArray(isVertical && [styles.DayPickerNavigation_button__vertical, styles.DayPickerNavigation_prevButton__vertical, isDefaultNavPrev && styles.DayPickerNavigation_button__vertical__default]))), {
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
      _extends({}, _reactWithStyles.css.apply(undefined, [styles.DayPickerNavigation_button, isDefaultNavNext && styles.DayPickerNavigation_button__default].concat(_toConsumableArray(isHorizontal && [styles.DayPickerNavigation_button__horizontal, isRTL && styles.DayPickerNavigation_leftButton__horizontal, !isRTL && styles.DayPickerNavigation_rightButton__horizontal]), _toConsumableArray(isVertical && [styles.DayPickerNavigation_button__vertical, styles.DayPickerNavigation_nextButton__vertical, isDefaultNavNext && styles.DayPickerNavigation_button__vertical__default, isDefaultNavNext && styles.DayPickerNavigation_nextButton__vertical__default]), [isVerticalScrollable && styles.DayPickerNavigation_nextButton__verticalScrollable])), {
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
    )
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      zIndex = _ref2$reactDates.zIndex;
  return {
    DayPickerNavigation_container: {
      position: 'relative',
      zIndex: zIndex + 2
    },

    DayPickerNavigation_container__horizontal: {},

    DayPickerNavigation_container__vertical: {
      background: color.background,
      boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.1)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 52,
      width: '100%'
    },

    DayPickerNavigation_container__verticalScrollable: {
      position: 'relative'
    },

    DayPickerNavigation_button: {
      cursor: 'pointer',
      lineHeight: 0.78,
      userSelect: 'none'
    },

    DayPickerNavigation_button__default: {
      border: '1px solid ' + String(color.core.borderLight),
      backgroundColor: color.background,
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
      borderRadius: 3,
      padding: '6px 9px',
      top: 18,
      position: 'absolute'
    },

    DayPickerNavigation_leftButton__horizontal: {
      left: 22
    },

    DayPickerNavigation_rightButton__horizontal: {
      right: 22
    },

    DayPickerNavigation_button__vertical: {
      display: 'inline-block',
      position: 'relative',
      height: '100%',
      width: '50%'
    },

    DayPickerNavigation_button__vertical__default: {
      padding: 5
    },

    DayPickerNavigation_nextButton__vertical__default: {
      borderLeft: 0
    },

    DayPickerNavigation_nextButton__verticalScrollable: {
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