import _extends from '@babel/runtime/helpers/esm/extends';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inheritsLoose from '@babel/runtime/helpers/esm/inheritsLoose';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import shallowEqual from 'enzyme-shallow-equal';

import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import { addEventListener } from 'consolidated-events';
import DateObj from '../utils/DateObj';
import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';
import CalendarMonth from './CalendarMonth';
import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import toISOMonthString from '../utils/toISOMonthString';
import isPrevMonth from '../utils/isPrevMonth';
import isNextMonth from '../utils/isNextMonth';
import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import {
  HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE,
} from '../constants';

function ownKeys(object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter((sym) => Object.getOwnPropertyDescriptor(object, sym).enumerable); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach((key) => { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach((key) => { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const propTypes = process.env.NODE_ENV !== 'production' ? forbidExtraProps(_objectSpread(_objectSpread({}, withStylesPropTypes), {}, {
  enableOutsideDays: PropTypes.bool,
  firstVisibleMonthIndex: PropTypes.number,
  horizontalMonthPadding: nonNegativeInteger,
  initialMonth: PropTypes.object,
  isAnimating: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  modifiers: PropTypes.objectOf(PropTypes.objectOf(ModifiersShape)),
  orientation: ScrollableOrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthTransitionEnd: PropTypes.func,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  translationValue: PropTypes.number,
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  daySize: nonNegativeInteger,
  focusedDate: PropTypes.object,
  // indicates focusable day
  isFocused: PropTypes.bool,
  // indicates whether or not to move focus to focusable day
  firstDayOfWeek: DayOfWeekShape,
  setMonthTitleHeight: PropTypes.func,
  isRTL: PropTypes.bool,
  transitionDuration: nonNegativeInteger,
  verticalBorderSpacing: nonNegativeInteger,
  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string,
})) : {};
const defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  horizontalMonthPadding: 13,
  initialMonth: new DateObj(),
  isAnimating: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  onMonthChange: function onMonthChange() {},
  onYearChange: function onYearChange() {},
  onMonthTransitionEnd: function onMonthTransitionEnd() {},
  renderMonthText: null,
  renderCalendarDay: undefined,
  renderDayContents: null,
  translationValue: null,
  renderMonthElement: null,
  daySize: DAY_SIZE,
  focusedDate: null,
  isFocused: false,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,
  isRTL: false,
  transitionDuration: 200,
  verticalBorderSpacing: undefined,
  // i18n
  monthFormat: 'MMMM yyyy',
  // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
};

function getMonths(initialMonth, numberOfMonths, withoutTransitionMonths) {
  let month = initialMonth.clone();
  if (!withoutTransitionMonths) month = month.subtract(1, 'month');
  const months = [];

  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = month.clone().add(1, 'month');
  }

  return months;
}

const CalendarMonthGrid = /* #__PURE__ */(function (_ref) {
  _inheritsLoose(CalendarMonthGrid, _ref);

  const _proto = CalendarMonthGrid.prototype;

  _proto[!React.PureComponent && 'shouldComponentUpdate'] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };

  function CalendarMonthGrid(props) {
    let _this;

    _this = _ref.call(this, props) || this;
    const withoutTransitionMonths = props.orientation === VERTICAL_SCROLLABLE;
    _this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths),
    };
    _this.isTransitionEndSupported = isTransitionEndSupported();
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_assertThisInitialized(_this));
    _this.setContainerRef = _this.setContainerRef.bind(_assertThisInitialized(_this)); // TODO check this

    _this.locale = new DateObj().localeData();
    _this.onMonthSelect = _this.onMonthSelect.bind(_assertThisInitialized(_this));
    _this.onYearSelect = _this.onYearSelect.bind(_assertThisInitialized(_this));
    return _this;
  }

  _proto.componentDidMount = function componentDidMount() {
    this.removeEventListener = addEventListener(this.container, 'transitionend', this.onTransitionEnd);
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    const _this2 = this;

    const { initialMonth } = nextProps;
    const { numberOfMonths } = nextProps;
    const { orientation } = nextProps;
    const { months } = this.state;
    const _this$props = this.props;
    const prevInitialMonth = _this$props.initialMonth;
    const prevNumberOfMonths = _this$props.numberOfMonths;
    const hasMonthChanged = !prevInitialMonth.isSame(initialMonth, 'month');
    const hasNumberOfMonthsChanged = prevNumberOfMonths !== numberOfMonths;
    let newMonths = months;

    if (hasMonthChanged && !hasNumberOfMonthsChanged) {
      if (isNextMonth(prevInitialMonth, initialMonth)) {
        newMonths = months.slice(1);
        newMonths.push(months[months.length - 1].clone().add(1, 'month'));
      } else if (isPrevMonth(prevInitialMonth, initialMonth)) {
        newMonths = months.slice(0, months.length - 1);
        newMonths.unshift(months[0].clone().subtract(1, 'month'));
      } else {
        const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
        newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
      }
    }

    if (hasNumberOfMonthsChanged) {
      const _withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;

      newMonths = getMonths(initialMonth, numberOfMonths, _withoutTransitionMonths);
    }

    const momentLocale = new DateObj().localeData();

    if (this.locale !== momentLocale) {
      this.locale = momentLocale;
      newMonths = newMonths.map((m) => m.setLocale(_this2.locale));
    }

    this.setState({
      months: newMonths,
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    const _this$props2 = this.props;
    const { isAnimating } = _this$props2;
    const { transitionDuration } = _this$props2;
    const { onMonthTransitionEnd } = _this$props2; // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete. Similarly, if transitionDuration
    // is set to 0, also immediately invoke the onMonthTransitionEnd callback

    if ((!this.isTransitionEndSupported || !transitionDuration) && isAnimating) {
      onMonthTransitionEnd();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.removeEventListener) this.removeEventListener();
  };

  _proto.onTransitionEnd = function onTransitionEnd() {
    const { onMonthTransitionEnd } = this.props;
    onMonthTransitionEnd();
  };

  _proto.onMonthSelect = function onMonthSelect(currentMonth, newMonthVal) {
    const newMonth = currentMonth.clone();
    const _this$props3 = this.props;
    const { onMonthChange } = _this$props3;
    const { orientation } = _this$props3;
    const { months } = this.state;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    let initialMonthSubtraction = months.indexOf(currentMonth);

    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }

    newMonth.set('month', newMonthVal).subtract(initialMonthSubtraction, 'months');
    onMonthChange(newMonth);
  };

  _proto.onYearSelect = function onYearSelect(currentMonth, newYearVal) {
    const newMonth = currentMonth.clone();
    const _this$props4 = this.props;
    const { onYearChange } = _this$props4;
    const { orientation } = _this$props4;
    const { months } = this.state;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    let initialMonthSubtraction = months.indexOf(currentMonth);

    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }

    newMonth.set('year', newYearVal).subtract(initialMonthSubtraction, 'months');
    onYearChange(newMonth);
  };

  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };

  _proto.render = function render() {
    const _this3 = this;

    const _this$props5 = this.props;
    const { enableOutsideDays } = _this$props5;
    const { firstVisibleMonthIndex } = _this$props5;
    const { horizontalMonthPadding } = _this$props5;
    const { isAnimating } = _this$props5;
    const { modifiers } = _this$props5;
    const { numberOfMonths } = _this$props5;
    const { monthFormat } = _this$props5;
    const { orientation } = _this$props5;
    const { translationValue } = _this$props5;
    const { daySize } = _this$props5;
    const { onDayMouseEnter } = _this$props5;
    const { onDayMouseLeave } = _this$props5;
    const { onDayClick } = _this$props5;
    const { renderMonthText } = _this$props5;
    const { renderCalendarDay } = _this$props5;
    const { renderDayContents } = _this$props5;
    const { renderMonthElement } = _this$props5;
    const { onMonthTransitionEnd } = _this$props5;
    const { firstDayOfWeek } = _this$props5;
    const { focusedDate } = _this$props5;
    const { isFocused } = _this$props5;
    const { isRTL } = _this$props5;
    const { styles } = _this$props5;
    const { phrases } = _this$props5;
    const { dayAriaLabelFormat } = _this$props5;
    const { transitionDuration } = _this$props5;
    const { verticalBorderSpacing } = _this$props5;
    const { setMonthTitleHeight } = _this$props5;
    const { months } = this.state;
    const isVertical = orientation === VERTICAL_ORIENTATION;
    const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
    const isHorizontal = orientation === HORIZONTAL_ORIENTATION;
    const calendarMonthWidth = getCalendarMonthWidth(daySize, horizontalMonthPadding);
    const width = isVertical || isVerticalScrollable ? calendarMonthWidth : (numberOfMonths + 2) * calendarMonthWidth;
    const transformType = isVertical || isVerticalScrollable ? 'translateY' : 'translateX';
    const transformValue = ''.concat(transformType, '(').concat(translationValue, 'px)');
    return /* #__PURE__ */React.createElement('div', _extends({}, css(styles.CalendarMonthGrid, isHorizontal && styles.CalendarMonthGrid__horizontal, isVertical && styles.CalendarMonthGrid__vertical, isVerticalScrollable && styles.CalendarMonthGrid__vertical_scrollable, isAnimating && styles.CalendarMonthGrid__animating, isAnimating && transitionDuration && {
      transition: 'transform '.concat(transitionDuration, 'ms ease-in-out 0.1s'),
    }, _objectSpread(_objectSpread({}, getTransformStyles(transformValue)), {}, {
      width,
    })), {
      ref: this.setContainerRef,
      onTransitionEnd: onMonthTransitionEnd,
    }), months.map((month, i) => {
      const isVisible = i >= firstVisibleMonthIndex && i < firstVisibleMonthIndex + numberOfMonths;
      const hideForAnimation = i === 0 && !isVisible;
      const showForAnimation = i === 0 && isAnimating && isVisible;
      const monthString = toISOMonthString(month);
      return /* #__PURE__ */React.createElement('div', _extends({
        key: monthString,
      }, css(isHorizontal && styles.CalendarMonthGrid_month__horizontal, hideForAnimation && styles.CalendarMonthGrid_month__hideForAnimation, showForAnimation && !isVertical && !isRTL && {
        position: 'absolute',
        left: -calendarMonthWidth,
      }, showForAnimation && !isVertical && isRTL && {
        position: 'absolute',
        right: 0,
      }, showForAnimation && isVertical && {
        position: 'absolute',
        top: -translationValue,
      }, !isVisible && !isAnimating && styles.CalendarMonthGrid_month__hidden)), /* #__PURE__ */React.createElement(CalendarMonth, {
        month,
        isVisible,
        enableOutsideDays,
        modifiers: modifiers[monthString],
        monthFormat,
        orientation,
        onDayMouseEnter,
        onDayMouseLeave,
        onDayClick,
        onMonthSelect: _this3.onMonthSelect,
        onYearSelect: _this3.onYearSelect,
        renderMonthText,
        renderCalendarDay,
        renderDayContents,
        renderMonthElement,
        firstDayOfWeek,
        daySize,
        focusedDate: isVisible ? focusedDate : null,
        isFocused,
        phrases,
        setMonthTitleHeight,
        dayAriaLabelFormat,
        verticalBorderSpacing,
        horizontalMonthPadding,
      }));
    }));
  };

  return CalendarMonthGrid;
}(React.PureComponent || React.Component));

CalendarMonthGrid.propTypes = process.env.NODE_ENV !== 'production' ? propTypes : {};
CalendarMonthGrid.defaultProps = defaultProps;
export default withStyles((_ref2) => {
  const _ref2$reactDates = _ref2.reactDates;
  const { color } = _ref2$reactDates;
  const { spacing } = _ref2$reactDates;
  const { zIndex } = _ref2$reactDates;
  return {
    CalendarMonthGrid: {
      background: color.background,
      textAlign: noflip('left'),
      zIndex,
    },
    CalendarMonthGrid__animating: {
      zIndex: zIndex + 1,
    },
    CalendarMonthGrid__horizontal: {
      position: 'absolute',
      left: noflip(spacing.dayPickerHorizontalPadding),
    },
    CalendarMonthGrid__vertical: {
      margin: '0 auto',
    },
    CalendarMonthGrid__vertical_scrollable: {
      margin: '0 auto',
    },
    CalendarMonthGrid_month__horizontal: {
      display: 'inline-block',
      verticalAlign: 'top',
      minHeight: '100%',
    },
    CalendarMonthGrid_month__hideForAnimation: {
      position: 'absolute',
      zIndex: zIndex - 1,
      opacity: 0,
      pointerEvents: 'none',
    },
    CalendarMonthGrid_month__hidden: {
      visibility: 'hidden',
    },
  };
}, {
  pureComponent: typeof React.PureComponent !== 'undefined',
})(CalendarMonthGrid);
