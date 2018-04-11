var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import _objectAssign from 'object.assign';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import { DayPickerNavigationPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import ChevronUp from './ChevronUp';
import ChevronDown from './ChevronDown';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE } from '../constants';

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, {
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  orientation: ScrollableOrientationShape,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerNavigationPhrases)),

  isRTL: PropTypes.bool
}));

var defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevMonthClick: function () {
    function onPrevMonthClick() {}

    return onPrevMonthClick;
  }(),
  onNextMonthClick: function () {
    function onNextMonthClick() {}

    return onNextMonthClick;
  }(),


  // internationalization
  phrases: DayPickerNavigationPhrases,
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

  var isHorizontal = orientation === HORIZONTAL_ORIENTATION;
  var isVertical = orientation !== HORIZONTAL_ORIENTATION;
  var isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;

  var navPrevIcon = navPrev;
  var navNextIcon = navNext;
  var isDefaultNavPrev = false;
  var isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    var Icon = isVertical ? ChevronUp : LeftArrow;
    if (isRTL && !isVertical) {
      Icon = RightArrow;
    }
    navPrevIcon = React.createElement(Icon, css(isHorizontal && styles.DayPickerNavigation_svg__horizontal, isVertical && styles.DayPickerNavigation_svg__vertical));
  }

  if (!navNextIcon) {
    isDefaultNavNext = true;
    var _Icon = isVertical ? ChevronDown : RightArrow;
    if (isRTL && !isVertical) {
      _Icon = LeftArrow;
    }
    navNextIcon = React.createElement(_Icon, css(isHorizontal && styles.DayPickerNavigation_svg__horizontal, isVertical && styles.DayPickerNavigation_svg__vertical));
  }

  return React.createElement(
    'div',
    css(styles.DayPickerNavigation_container, isHorizontal && styles.DayPickerNavigation_container__horizontal, isVertical && styles.DayPickerNavigation_container__vertical, isVerticalScrollable && styles.DayPickerNavigation_container__verticalScrollable),
    !isVerticalScrollable && React.createElement(
      'button',
      _extends({}, css.apply(undefined, [styles.DayPickerNavigation_button, isDefaultNavPrev && styles.DayPickerNavigation_button__default].concat(_toConsumableArray(isHorizontal && [styles.DayPickerNavigation_button__horizontal, !isRTL && styles.DayPickerNavigation_leftButton__horizontal, isRTL && styles.DayPickerNavigation_rightButton__horizontal]), _toConsumableArray(isVertical && [styles.DayPickerNavigation_button__vertical, styles.DayPickerNavigation_prevButton__vertical, isDefaultNavPrev && styles.DayPickerNavigation_button__vertical__default]))), {
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
    React.createElement(
      'button',
      _extends({}, css.apply(undefined, [styles.DayPickerNavigation_button, isDefaultNavNext && styles.DayPickerNavigation_button__default].concat(_toConsumableArray(isHorizontal && [styles.DayPickerNavigation_button__horizontal, isRTL && styles.DayPickerNavigation_leftButton__horizontal, !isRTL && styles.DayPickerNavigation_rightButton__horizontal]), _toConsumableArray(isVertical && [styles.DayPickerNavigation_button__vertical, styles.DayPickerNavigation_nextButton__vertical, isDefaultNavNext && styles.DayPickerNavigation_button__vertical__default, isDefaultNavNext && styles.DayPickerNavigation_nextButton__vertical__default]), [isVerticalScrollable && styles.DayPickerNavigation_nextButton__verticalScrollable])), {
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

export default withStyles(function (_ref2) {
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