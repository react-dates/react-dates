import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import shallowEqual from "enzyme-shallow-equal";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import getMonth from 'date-fns/getMonth';
import isEqual from 'date-fns/isEqual';
import format from 'date-fns/format';
import addHours from 'date-fns/addHours';
import startOfDay from 'date-fns/startOfDay';
import isSameDay from 'date-fns/isSameDay';
import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';
import calculateDimension from '../utils/calculateDimension';
import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import toISODateString from '../utils/toISODateString';
import getLocale from '../utils/getLocale';
import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import { HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE } from '../constants';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps(_objectSpread(_objectSpread({}, withStylesPropTypes), {}, {
  month: PropTypes.object,
  horizontalMonthPadding: nonNegativeInteger,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.objectOf(ModifiersShape),
  orientation: ScrollableOrientationShape,
  daySize: nonNegativeInteger,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthSelect: PropTypes.func,
  onYearSelect: PropTypes.func,
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  firstDayOfWeek: DayOfWeekShape,
  setMonthTitleHeight: PropTypes.func,
  verticalBorderSpacing: nonNegativeInteger,
  focusedDate: PropTypes.object,
  // indicates focusable day
  isFocused: PropTypes.bool,
  // indicates whether or not to move focus to focusable day
  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string,
  locale: PropTypes.string
})) : {};
var defaultProps = {
  month: addHours(startOfDay(new Date()), 12),
  horizontalMonthPadding: 13,
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: DAY_SIZE,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  onMonthSelect: function onMonthSelect() {},
  onYearSelect: function onYearSelect() {},
  renderMonthText: null,
  renderCalendarDay: function renderCalendarDay(props) {
    return /*#__PURE__*/React.createElement(CalendarDay, props);
  },
  renderDayContents: null,
  renderMonthElement: null,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,
  focusedDate: null,
  isFocused: false,
  // i18n
  monthFormat: 'MMMM yyyy',
  // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined,
  locale: null
};
/** @extends React.Component */

var CalendarMonth = /*#__PURE__*/function (_ref) {
  _inheritsLoose(CalendarMonth, _ref);

  var _proto = CalendarMonth.prototype;

  _proto[!React.PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };

  function CalendarMonth(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    var localeData = getLocale(props.locale);
    _this.state = {
      weeks: getCalendarMonthWeeks(props.month, props.enableOutsideDays, props.firstDayOfWeek === null ? localeData.options.weekStartsOn : props.firstDayOfWeek, // 0 : props.firstDayOfWeek,
      props.locale)
    };
    _this.setCaptionRef = _this.setCaptionRef.bind(_assertThisInitialized(_this));
    _this.setMonthTitleHeight = _this.setMonthTitleHeight.bind(_assertThisInitialized(_this));
    return _this;
  }

  _proto.componentDidMount = function componentDidMount() {
    this.setMonthTitleHeightTimeout = setTimeout(this.setMonthTitleHeight, 0);
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var month = nextProps.month,
        enableOutsideDays = nextProps.enableOutsideDays,
        firstDayOfWeek = nextProps.firstDayOfWeek,
        locale = nextProps.locale;
    var localeData = getLocale(locale);
    var _this$props = this.props,
        prevMonth = _this$props.month,
        prevEnableOutsideDays = _this$props.enableOutsideDays,
        prevFirstDayOfWeek = _this$props.firstDayOfWeek;

    if (!isEqual(month, prevMonth) || enableOutsideDays !== prevEnableOutsideDays || firstDayOfWeek !== prevFirstDayOfWeek) {
      this.setState({
        weeks: getCalendarMonthWeeks(month, enableOutsideDays, firstDayOfWeek == null ? localeData.options.weekStartsOn : firstDayOfWeek)
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.setMonthTitleHeightTimeout) {
      clearTimeout(this.setMonthTitleHeightTimeout);
    }
  };

  _proto.setMonthTitleHeight = function setMonthTitleHeight() {
    var setMonthTitleHeight = this.props.setMonthTitleHeight;

    if (setMonthTitleHeight) {
      var captionHeight = calculateDimension(this.captionRef, 'height', true, true);
      setMonthTitleHeight(captionHeight);
    }
  };

  _proto.setCaptionRef = function setCaptionRef(ref) {
    this.captionRef = ref;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        dayAriaLabelFormat = _this$props2.dayAriaLabelFormat,
        daySize = _this$props2.daySize,
        focusedDate = _this$props2.focusedDate,
        horizontalMonthPadding = _this$props2.horizontalMonthPadding,
        isFocused = _this$props2.isFocused,
        isVisible = _this$props2.isVisible,
        modifiers = _this$props2.modifiers,
        month = _this$props2.month,
        monthFormat = _this$props2.monthFormat,
        onDayClick = _this$props2.onDayClick,
        onDayMouseEnter = _this$props2.onDayMouseEnter,
        onDayMouseLeave = _this$props2.onDayMouseLeave,
        onMonthSelect = _this$props2.onMonthSelect,
        onYearSelect = _this$props2.onYearSelect,
        orientation = _this$props2.orientation,
        phrases = _this$props2.phrases,
        renderCalendarDay = _this$props2.renderCalendarDay,
        renderDayContents = _this$props2.renderDayContents,
        renderMonthElement = _this$props2.renderMonthElement,
        renderMonthText = _this$props2.renderMonthText,
        styles = _this$props2.styles,
        verticalBorderSpacing = _this$props2.verticalBorderSpacing,
        locale = _this$props2.locale;
    var weeks = this.state.weeks;
    var monthTitle = renderMonthText ? renderMonthText(month) : format(month, monthFormat, {
      locale: getLocale(locale)
    });
    var verticalScrollable = orientation === VERTICAL_SCROLLABLE;
    return /*#__PURE__*/React.createElement("div", _extends({}, css(styles.CalendarMonth, {
      padding: "0 ".concat(horizontalMonthPadding, "px")
    }), {
      "data-visible": isVisible
    }), /*#__PURE__*/React.createElement("div", _extends({
      ref: this.setCaptionRef
    }, css(styles.CalendarMonth_caption, verticalScrollable && styles.CalendarMonth_caption__verticalScrollable)), renderMonthElement ? renderMonthElement({
      month: month,
      onMonthSelect: onMonthSelect,
      onYearSelect: onYearSelect,
      isVisible: isVisible
    }) : /*#__PURE__*/React.createElement("strong", null, monthTitle)), /*#__PURE__*/React.createElement("table", _extends({}, css(!verticalBorderSpacing && styles.CalendarMonth_table, verticalBorderSpacing && styles.CalendarMonth_verticalSpacing, verticalBorderSpacing && {
      borderSpacing: "0px ".concat(verticalBorderSpacing, "px")
    }), {
      role: "presentation"
    }), /*#__PURE__*/React.createElement("tbody", null, weeks.map(function (week, i) {
      return /*#__PURE__*/React.createElement(CalendarWeek, {
        key: i
      }, week.map(function (day, dayOfWeek) {
        return renderCalendarDay({
          key: dayOfWeek,
          day: day,
          daySize: daySize,
          isOutsideDay: !day || getMonth(day) !== getMonth(month),
          tabIndex: isVisible && isSameDay(day, focusedDate) ? 0 : -1,
          isFocused: isFocused,
          onDayMouseEnter: onDayMouseEnter,
          onDayMouseLeave: onDayMouseLeave,
          onDayClick: onDayClick,
          renderDayContents: renderDayContents,
          phrases: phrases,
          modifiers: modifiers[toISODateString(day)] instanceof Set ? modifiers[toISODateString(day)] : new Set(),
          ariaLabelFormat: dayAriaLabelFormat
        });
      }));
    }))));
  };

  return CalendarMonth;
}(React.PureComponent || React.Component);

CalendarMonth.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
CalendarMonth.defaultProps = defaultProps;
export default withStyles(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      font = _ref2$reactDates.font,
      spacing = _ref2$reactDates.spacing;
  return {
    CalendarMonth: {
      background: color.background,
      textAlign: 'center',
      verticalAlign: 'top',
      userSelect: 'none'
    },
    CalendarMonth_table: {
      borderCollapse: 'collapse',
      borderSpacing: 0
    },
    CalendarMonth_verticalSpacing: {
      borderCollapse: 'separate'
    },
    CalendarMonth_caption: {
      color: color.text,
      fontSize: font.captionSize,
      textAlign: 'center',
      paddingTop: spacing.captionPaddingTop,
      paddingBottom: spacing.captionPaddingBottom,
      captionSide: 'initial'
    },
    CalendarMonth_caption__verticalScrollable: {
      paddingTop: 12,
      paddingBottom: 7
    }
  };
}, {
  pureComponent: typeof React.PureComponent !== 'undefined'
})(CalendarMonth);