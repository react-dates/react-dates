var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

import _objectAssign from 'object.assign';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';
import { addEventListener } from 'consolidated-events';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarMonth from './CalendarMonth';

import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import toISOMonthString from '../utils/toISOMonthString';
import isAfterDay from '../utils/isAfterDay';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE } from '../constants';

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, {
  enableOutsideDays: PropTypes.bool,
  firstVisibleMonthIndex: PropTypes.number,
  initialMonth: momentPropTypes.momentObj,
  isAnimating: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  modifiers: PropTypes.object,
  orientation: ScrollableOrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthTransitionEnd: PropTypes.func,
  renderMonth: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  transformValue: PropTypes.string,
  daySize: nonNegativeInteger,
  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day
  firstDayOfWeek: DayOfWeekShape,
  setCalendarMonthHeights: PropTypes.func,
  isRTL: PropTypes.bool,
  transitionDuration: nonNegativeInteger,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string
}));

var defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  initialMonth: moment(),
  isAnimating: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick: function () {
    function onDayClick() {}

    return onDayClick;
  }(),
  onDayMouseEnter: function () {
    function onDayMouseEnter() {}

    return onDayMouseEnter;
  }(),
  onDayMouseLeave: function () {
    function onDayMouseLeave() {}

    return onDayMouseLeave;
  }(),
  onMonthTransitionEnd: function () {
    function onMonthTransitionEnd() {}

    return onMonthTransitionEnd;
  }(),

  renderMonth: null,
  renderCalendarDay: undefined,
  renderDayContents: null,
  transformValue: 'none',
  daySize: DAY_SIZE,
  focusedDate: null,
  isFocused: false,
  firstDayOfWeek: null,
  setCalendarMonthHeights: function () {
    function setCalendarMonthHeights() {}

    return setCalendarMonthHeights;
  }(),

  isRTL: false,
  transitionDuration: 200,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined
};

function getMonths(initialMonth, numberOfMonths, withoutTransitionMonths) {
  var month = initialMonth.clone();
  if (!withoutTransitionMonths) month = month.subtract(1, 'month');

  var months = [];
  for (var i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = month.clone().add(1, 'month');
  }

  return months;
}

var CalendarMonthGrid = function (_React$Component) {
  _inherits(CalendarMonthGrid, _React$Component);

  function CalendarMonthGrid(props) {
    _classCallCheck(this, CalendarMonthGrid);

    var _this = _possibleConstructorReturn(this, (CalendarMonthGrid.__proto__ || Object.getPrototypeOf(CalendarMonthGrid)).call(this, props));

    var withoutTransitionMonths = props.orientation === VERTICAL_SCROLLABLE;
    _this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths)
    };

    _this.calendarMonthHeights = [];

    _this.isTransitionEndSupported = isTransitionEndSupported();
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);

    _this.locale = moment.locale();
    return _this;
  }

  _createClass(CalendarMonthGrid, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        var _this2 = this;

        var setCalendarMonthHeights = this.props.setCalendarMonthHeights;

        this.removeEventListener = addEventListener(this.container, 'transitionend', this.onTransitionEnd);

        this.setCalendarMonthHeightsTimeout = setTimeout(function () {
          setCalendarMonthHeights(_this2.calendarMonthHeights);
        }, 0);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var _this3 = this;

        var initialMonth = nextProps.initialMonth,
            numberOfMonths = nextProps.numberOfMonths,
            orientation = nextProps.orientation;
        var months = this.state.months;


        var hasMonthChanged = !this.props.initialMonth.isSame(initialMonth, 'month');
        var hasNumberOfMonthsChanged = this.props.numberOfMonths !== numberOfMonths;
        var newMonths = months;

        if (hasMonthChanged && !hasNumberOfMonthsChanged) {
          if (isAfterDay(initialMonth, this.props.initialMonth)) {
            newMonths = months.slice(1);
            newMonths.push(months[months.length - 1].clone().add(1, 'month'));
          } else {
            newMonths = months.slice(0, months.length - 1);
            newMonths.unshift(months[0].clone().subtract(1, 'month'));
          }
        }

        if (hasNumberOfMonthsChanged) {
          var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
          newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
        }

        var momentLocale = moment.locale();
        if (this.locale !== momentLocale) {
          this.locale = momentLocale;
          newMonths = newMonths.map(function (m) {
            return m.locale(_this3.locale);
          });
        }

        this.setState({
          months: newMonths
        });
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'shouldComponentUpdate',
    value: function () {
      function shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        var _this4 = this;

        var _props = this.props,
            isAnimating = _props.isAnimating,
            transitionDuration = _props.transitionDuration,
            onMonthTransitionEnd = _props.onMonthTransitionEnd,
            setCalendarMonthHeights = _props.setCalendarMonthHeights;

        // For IE9, immediately call onMonthTransitionEnd instead of
        // waiting for the animation to complete. Similarly, if transitionDuration
        // is set to 0, also immediately invoke the onMonthTransitionEnd callback

        if ((!this.isTransitionEndSupported || !transitionDuration) && isAnimating) {
          onMonthTransitionEnd();
        }

        if (!isAnimating && prevProps.isAnimating) {
          this.setCalendarMonthHeightsTimeout = setTimeout(function () {
            setCalendarMonthHeights(_this4.calendarMonthHeights);
          }, 0);
        }
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.removeEventListener) this.removeEventListener();
        if (this.setCalendarMonthHeightsTimeout) {
          clearTimeout(this.setCalendarMonthHeightsTimeout);
        }
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'onTransitionEnd',
    value: function () {
      function onTransitionEnd() {
        var onMonthTransitionEnd = this.props.onMonthTransitionEnd;

        onMonthTransitionEnd();
      }

      return onTransitionEnd;
    }()
  }, {
    key: 'setContainerRef',
    value: function () {
      function setContainerRef(ref) {
        this.container = ref;
      }

      return setContainerRef;
    }()
  }, {
    key: 'setMonthHeight',
    value: function () {
      function setMonthHeight(height, i) {
        if (this.calendarMonthHeights[i]) {
          if (i === 0) {
            this.calendarMonthHeights = [height].concat(this.calendarMonthHeights.slice(0, -1));
          } else if (i === this.calendarMonthHeights.length - 1) {
            this.calendarMonthHeights = this.calendarMonthHeights.slice(1).concat(height);
          }
        } else {
          this.calendarMonthHeights[i] = height;
        }
      }

      return setMonthHeight;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this5 = this;

        var _props2 = this.props,
            enableOutsideDays = _props2.enableOutsideDays,
            firstVisibleMonthIndex = _props2.firstVisibleMonthIndex,
            isAnimating = _props2.isAnimating,
            modifiers = _props2.modifiers,
            numberOfMonths = _props2.numberOfMonths,
            monthFormat = _props2.monthFormat,
            orientation = _props2.orientation,
            transformValue = _props2.transformValue,
            daySize = _props2.daySize,
            onDayMouseEnter = _props2.onDayMouseEnter,
            onDayMouseLeave = _props2.onDayMouseLeave,
            onDayClick = _props2.onDayClick,
            renderMonth = _props2.renderMonth,
            renderCalendarDay = _props2.renderCalendarDay,
            renderDayContents = _props2.renderDayContents,
            onMonthTransitionEnd = _props2.onMonthTransitionEnd,
            firstDayOfWeek = _props2.firstDayOfWeek,
            focusedDate = _props2.focusedDate,
            isFocused = _props2.isFocused,
            isRTL = _props2.isRTL,
            styles = _props2.styles,
            phrases = _props2.phrases,
            dayAriaLabelFormat = _props2.dayAriaLabelFormat,
            transitionDuration = _props2.transitionDuration;
        var months = this.state.months;

        var isVertical = orientation === VERTICAL_ORIENTATION;
        var isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
        var isHorizontal = orientation === HORIZONTAL_ORIENTATION;

        var calendarMonthWidth = getCalendarMonthWidth(daySize);

        var width = isVertical || isVerticalScrollable ? calendarMonthWidth : (numberOfMonths + 2) * calendarMonthWidth;

        return React.createElement(
          'div',
          _extends({}, css(styles.CalendarMonthGrid, isHorizontal && styles.CalendarMonthGrid__horizontal, isVertical && styles.CalendarMonthGrid__vertical, isVerticalScrollable && styles.CalendarMonthGrid__vertical_scrollable, isAnimating && styles.CalendarMonthGrid__animating, isAnimating && transitionDuration && {
            transition: 'transform ' + String(transitionDuration) + 'ms ease-in-out'
          }, _objectAssign({}, getTransformStyles(transformValue), {
            width: width
          })), {
            ref: this.setContainerRef,
            onTransitionEnd: onMonthTransitionEnd
          }),
          months.map(function (month, i) {
            var isVisible = i >= firstVisibleMonthIndex && i < firstVisibleMonthIndex + numberOfMonths;
            var hideForAnimation = i === 0 && !isVisible;
            var showForAnimation = i === 0 && isAnimating && isVisible;
            var monthString = toISOMonthString(month);
            return React.createElement(
              'div',
              _extends({
                key: monthString
              }, css(isHorizontal && styles.CalendarMonthGrid_month__horizontal, hideForAnimation && styles.CalendarMonthGrid_month__hideForAnimation, showForAnimation && !isVertical && !isRTL && {
                position: 'absolute',
                left: -calendarMonthWidth
              }, showForAnimation && !isVertical && isRTL && {
                position: 'absolute',
                right: 0
              }, showForAnimation && isVertical && {
                position: 'absolute',
                top: -_this5.calendarMonthHeights[0]
              }, !isVisible && !isAnimating && styles.CalendarMonthGrid_month__hidden)),
              React.createElement(CalendarMonth, {
                month: month,
                isVisible: isVisible,
                enableOutsideDays: enableOutsideDays,
                modifiers: modifiers[monthString],
                monthFormat: monthFormat,
                orientation: orientation,
                onDayMouseEnter: onDayMouseEnter,
                onDayMouseLeave: onDayMouseLeave,
                onDayClick: onDayClick,
                renderMonth: renderMonth,
                renderCalendarDay: renderCalendarDay,
                renderDayContents: renderDayContents,
                firstDayOfWeek: firstDayOfWeek,
                daySize: daySize,
                focusedDate: isVisible ? focusedDate : null,
                isFocused: isFocused,
                phrases: phrases,
                setMonthHeight: function () {
                  function setMonthHeight(height) {
                    _this5.setMonthHeight(height, i);
                  }

                  return setMonthHeight;
                }(),
                dayAriaLabelFormat: dayAriaLabelFormat
              })
            );
          })
        );
      }

      return render;
    }()
  }]);

  return CalendarMonthGrid;
}(React.Component);

CalendarMonthGrid.propTypes = propTypes;
CalendarMonthGrid.defaultProps = defaultProps;

export default withStyles(function (_ref) {
  var _ref$reactDates = _ref.reactDates,
      color = _ref$reactDates.color,
      zIndex = _ref$reactDates.zIndex;
  return {
    CalendarMonthGrid: {
      background: color.background,
      textAlign: 'left',
      zIndex: zIndex
    },

    CalendarMonthGrid__animating: {
      zIndex: zIndex + 1
    },

    CalendarMonthGrid__horizontal: {
      position: 'absolute',
      left: 9
    },

    CalendarMonthGrid__vertical: {
      margin: '0 auto'
    },

    CalendarMonthGrid__vertical_scrollable: {
      margin: '0 auto',
      overflowY: 'scroll'
    },

    CalendarMonthGrid_month__horizontal: {
      display: 'inline-block',
      verticalAlign: 'top',
      minHeight: '100%'
    },

    CalendarMonthGrid_month__hideForAnimation: {
      position: 'absolute',
      zIndex: zIndex - 1,
      opacity: 0,
      pointerEvents: 'none'
    },

    CalendarMonthGrid_month__hidden: {
      visibility: 'hidden'
    }
  };
})(CalendarMonthGrid);