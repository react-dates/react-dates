var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

import _objectAssign from 'object.assign';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';

import calculateDimension from '../utils/calculateDimension';
import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import toISODateString from '../utils/toISODateString';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE } from '../constants';

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, {
  month: momentPropTypes.momentObj,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: ScrollableOrientationShape,
  daySize: nonNegativeInteger,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderMonth: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  setMonthHeight: PropTypes.func,

  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string
}));

var defaultProps = {
  month: moment(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: DAY_SIZE,
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

  renderMonth: null,
  renderCalendarDay: function () {
    function renderCalendarDay(props) {
      return React.createElement(CalendarDay, props);
    }

    return renderCalendarDay;
  }(),
  renderDayContents: null,
  firstDayOfWeek: null,
  setMonthHeight: function () {
    function setMonthHeight() {}

    return setMonthHeight;
  }(),


  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined
};

var CalendarMonth = function (_React$Component) {
  _inherits(CalendarMonth, _React$Component);

  function CalendarMonth(props) {
    _classCallCheck(this, CalendarMonth);

    var _this = _possibleConstructorReturn(this, (CalendarMonth.__proto__ || Object.getPrototypeOf(CalendarMonth)).call(this, props));

    _this.state = {
      weeks: getCalendarMonthWeeks(props.month, props.enableOutsideDays, props.firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : props.firstDayOfWeek)
    };

    _this.setCaptionRef = _this.setCaptionRef.bind(_this);
    _this.setGridRef = _this.setGridRef.bind(_this);
    _this.setMonthHeight = _this.setMonthHeight.bind(_this);
    return _this;
  }

  _createClass(CalendarMonth, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.setMonthHeightTimeout = setTimeout(this.setMonthHeight, 0);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var month = nextProps.month,
            enableOutsideDays = nextProps.enableOutsideDays,
            firstDayOfWeek = nextProps.firstDayOfWeek;

        if (!month.isSame(this.props.month) || enableOutsideDays !== this.props.enableOutsideDays || firstDayOfWeek !== this.props.firstDayOfWeek) {
          this.setState({
            weeks: getCalendarMonthWeeks(month, enableOutsideDays, firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : firstDayOfWeek)
          });
        }
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
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.setMonthHeightTimeout) {
          clearTimeout(this.setMonthHeightTimeout);
        }
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'setMonthHeight',
    value: function () {
      function setMonthHeight() {
        var setMonthHeight = this.props.setMonthHeight;

        var captionHeight = calculateDimension(this.captionRef, 'height', true, true);
        var gridHeight = calculateDimension(this.gridRef, 'height');

        setMonthHeight(captionHeight + gridHeight + 1);
      }

      return setMonthHeight;
    }()
  }, {
    key: 'setCaptionRef',
    value: function () {
      function setCaptionRef(ref) {
        this.captionRef = ref;
      }

      return setCaptionRef;
    }()
  }, {
    key: 'setGridRef',
    value: function () {
      function setGridRef(ref) {
        this.gridRef = ref;
      }

      return setGridRef;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props = this.props,
            month = _props.month,
            monthFormat = _props.monthFormat,
            orientation = _props.orientation,
            isVisible = _props.isVisible,
            modifiers = _props.modifiers,
            onDayClick = _props.onDayClick,
            onDayMouseEnter = _props.onDayMouseEnter,
            onDayMouseLeave = _props.onDayMouseLeave,
            renderMonth = _props.renderMonth,
            renderCalendarDay = _props.renderCalendarDay,
            renderDayContents = _props.renderDayContents,
            daySize = _props.daySize,
            focusedDate = _props.focusedDate,
            isFocused = _props.isFocused,
            styles = _props.styles,
            phrases = _props.phrases,
            dayAriaLabelFormat = _props.dayAriaLabelFormat;
        var weeks = this.state.weeks;

        var monthTitle = renderMonth ? renderMonth(month) : month.format(monthFormat);

        var verticalScrollable = orientation === VERTICAL_SCROLLABLE;

        return React.createElement(
          'div',
          _extends({}, css(styles.CalendarMonth, orientation === HORIZONTAL_ORIENTATION && styles.CalendarMonth__horizontal, orientation === VERTICAL_ORIENTATION && styles.CalendarMonth__vertical, verticalScrollable && styles.CalendarMonth__verticalScrollable), {
            'data-visible': isVisible
          }),
          React.createElement(
            'div',
            _extends({
              ref: this.setCaptionRef
            }, css(styles.CalendarMonth_caption, verticalScrollable && styles.CalendarMonth_caption__verticalScrollable)),
            React.createElement(
              'strong',
              null,
              monthTitle
            )
          ),
          React.createElement(
            'table',
            _extends({}, css(styles.CalendarMonth_table), {
              role: 'presentation'
            }),
            React.createElement(
              'tbody',
              { ref: this.setGridRef },
              weeks.map(function (week, i) {
                return React.createElement(
                  CalendarWeek,
                  { key: i },
                  week.map(function (day, dayOfWeek) {
                    return renderCalendarDay({
                      key: dayOfWeek,
                      day: day,
                      daySize: daySize,
                      isOutsideDay: !day || day.month() !== month.month(),
                      tabIndex: isVisible && isSameDay(day, focusedDate) ? 0 : -1,
                      isFocused: isFocused,
                      onDayMouseEnter: onDayMouseEnter,
                      onDayMouseLeave: onDayMouseLeave,
                      onDayClick: onDayClick,
                      renderDayContents: renderDayContents,
                      phrases: phrases,
                      modifiers: modifiers[toISODateString(day)],
                      ariaLabelFormat: dayAriaLabelFormat
                    });
                  })
                );
              })
            )
          )
        );
      }

      return render;
    }()
  }]);

  return CalendarMonth;
}(React.Component);

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

export default withStyles(function (_ref) {
  var _ref$reactDates = _ref.reactDates,
      color = _ref$reactDates.color,
      font = _ref$reactDates.font,
      spacing = _ref$reactDates.spacing;
  return {
    CalendarMonth: {
      background: color.background,
      textAlign: 'center',
      padding: '0 13px',
      verticalAlign: 'top',
      userSelect: 'none'
    },

    CalendarMonth_table: {
      borderCollapse: 'collapse',
      borderSpacing: 0
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
})(CalendarMonth);