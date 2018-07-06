Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _consolidatedEvents = require('consolidated-events');

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _CalendarMonth = require('./CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

var _isTransitionEndSupported = require('../utils/isTransitionEndSupported');

var _isTransitionEndSupported2 = _interopRequireDefault(_isTransitionEndSupported);

var _getTransformStyles = require('../utils/getTransformStyles');

var _getTransformStyles2 = _interopRequireDefault(_getTransformStyles);

var _getCalendarMonthWidth = require('../utils/getCalendarMonthWidth');

var _getCalendarMonthWidth2 = _interopRequireDefault(_getCalendarMonthWidth);

var _toISOMonthString = require('../utils/toISOMonthString');

var _toISOMonthString2 = _interopRequireDefault(_toISOMonthString);

var _isPrevMonth = require('../utils/isPrevMonth');

var _isPrevMonth2 = _interopRequireDefault(_isPrevMonth);

var _isNextMonth = require('../utils/isNextMonth');

var _isNextMonth2 = _interopRequireDefault(_isNextMonth);

var _ModifiersShape = require('../shapes/ModifiersShape');

var _ModifiersShape2 = _interopRequireDefault(_ModifiersShape);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _DayOfWeekShape = require('../shapes/DayOfWeekShape');

var _DayOfWeekShape2 = _interopRequireDefault(_DayOfWeekShape);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  enableOutsideDays: _propTypes2['default'].bool,
  firstVisibleMonthIndex: _propTypes2['default'].number,
  initialMonth: _reactMomentProptypes2['default'].momentObj,
  isAnimating: _propTypes2['default'].bool,
  numberOfMonths: _propTypes2['default'].number,
  modifiers: _propTypes2['default'].objectOf(_propTypes2['default'].objectOf(_ModifiersShape2['default'])),
  orientation: _ScrollableOrientationShape2['default'],
  onDayClick: _propTypes2['default'].func,
  onDayMouseEnter: _propTypes2['default'].func,
  onDayMouseLeave: _propTypes2['default'].func,
  onMonthTransitionEnd: _propTypes2['default'].func,
  onMonthChange: _propTypes2['default'].func,
  onYearChange: _propTypes2['default'].func,
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes2['default'].func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: _propTypes2['default'].func,
  renderDayContents: _propTypes2['default'].func,
  translationValue: _propTypes2['default'].number,
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes2['default'].func, 'renderMonthText', 'renderMonthElement'),
  daySize: _airbnbPropTypes.nonNegativeInteger,
  focusedDate: _reactMomentProptypes2['default'].momentObj, // indicates focusable day
  isFocused: _propTypes2['default'].bool, // indicates whether or not to move focus to focusable day
  firstDayOfWeek: _DayOfWeekShape2['default'],
  setMonthTitleHeight: _propTypes2['default'].func,
  isRTL: _propTypes2['default'].bool,
  transitionDuration: _airbnbPropTypes.nonNegativeInteger,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,

  // i18n
  monthFormat: _propTypes2['default'].string,
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.CalendarDayPhrases)),
  dayAriaLabelFormat: _propTypes2['default'].string,
  isSingleDate: _propTypes2['default'].bool
}));

var defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  initialMonth: (0, _moment2['default'])(),
  isAnimating: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: _constants.HORIZONTAL_ORIENTATION,
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
  onMonthChange: function () {
    function onMonthChange() {}

    return onMonthChange;
  }(),
  onYearChange: function () {
    function onYearChange() {}

    return onYearChange;
  }(),
  onMonthTransitionEnd: function () {
    function onMonthTransitionEnd() {}

    return onMonthTransitionEnd;
  }(),

  renderMonthText: null,
  renderCalendarDay: undefined,
  renderDayContents: null,
  translationValue: null,
  renderMonthElement: null,
  daySize: _constants.DAY_SIZE,
  focusedDate: null,
  isFocused: false,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,
  isRTL: false,
  transitionDuration: 200,
  verticalBorderSpacing: undefined,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: _defaultPhrases.CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  isSingleDate: false
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

    var withoutTransitionMonths = props.orientation === _constants.VERTICAL_SCROLLABLE;
    _this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths)
    };

    _this.isTransitionEndSupported = (0, _isTransitionEndSupported2['default'])();
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);

    _this.locale = _moment2['default'].locale();
    _this.onMonthSelect = _this.onMonthSelect.bind(_this);
    _this.onYearSelect = _this.onYearSelect.bind(_this);
    return _this;
  }

  _createClass(CalendarMonthGrid, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.removeEventListener = (0, _consolidatedEvents.addEventListener)(this.container, 'transitionend', this.onTransitionEnd);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var initialMonth = nextProps.initialMonth,
            numberOfMonths = nextProps.numberOfMonths,
            orientation = nextProps.orientation;
        var months = this.state.months;
        var _props = this.props,
            prevInitialMonth = _props.initialMonth,
            prevNumberOfMonths = _props.numberOfMonths;

        var hasMonthChanged = !prevInitialMonth.isSame(initialMonth, 'month');
        var hasNumberOfMonthsChanged = prevNumberOfMonths !== numberOfMonths;
        var newMonths = months;

        if (hasMonthChanged && !hasNumberOfMonthsChanged) {
          if ((0, _isNextMonth2['default'])(prevInitialMonth, initialMonth)) {
            newMonths = months.slice(1);
            newMonths.push(months[months.length - 1].clone().add(1, 'month'));
          } else if ((0, _isPrevMonth2['default'])(prevInitialMonth, initialMonth)) {
            newMonths = months.slice(0, months.length - 1);
            newMonths.unshift(months[0].clone().subtract(1, 'month'));
          } else {
            var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
            newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
          }
        }

        if (hasNumberOfMonthsChanged) {
          var _withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
          newMonths = getMonths(initialMonth, numberOfMonths, _withoutTransitionMonths);
        }

        var momentLocale = _moment2['default'].locale();
        if (this.locale !== momentLocale) {
          this.locale = momentLocale;
          newMonths = newMonths.map(function (m) {
            return m.locale(_this2.locale);
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
        return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate() {
        var _props2 = this.props,
            isAnimating = _props2.isAnimating,
            transitionDuration = _props2.transitionDuration,
            onMonthTransitionEnd = _props2.onMonthTransitionEnd;

        // For IE9, immediately call onMonthTransitionEnd instead of
        // waiting for the animation to complete. Similarly, if transitionDuration
        // is set to 0, also immediately invoke the onMonthTransitionEnd callback

        if ((!this.isTransitionEndSupported || !transitionDuration) && isAnimating) {
          onMonthTransitionEnd();
        }
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.removeEventListener) this.removeEventListener();
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
    key: 'onMonthSelect',
    value: function () {
      function onMonthSelect(currentMonth, newMonthVal) {
        var newMonth = currentMonth.clone();
        var _props3 = this.props,
            onMonthChange = _props3.onMonthChange,
            orientation = _props3.orientation;
        var months = this.state.months;

        var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
        var initialMonthSubtraction = months.indexOf(currentMonth);
        if (!withoutTransitionMonths) {
          initialMonthSubtraction -= 1;
        }
        newMonth.set('month', newMonthVal).subtract(initialMonthSubtraction, 'months');
        onMonthChange(newMonth);
      }

      return onMonthSelect;
    }()
  }, {
    key: 'onYearSelect',
    value: function () {
      function onYearSelect(currentMonth, newYearVal) {
        var newMonth = currentMonth.clone();
        var _props4 = this.props,
            onYearChange = _props4.onYearChange,
            orientation = _props4.orientation;
        var months = this.state.months;

        var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
        var initialMonthSubtraction = months.indexOf(currentMonth);
        if (!withoutTransitionMonths) {
          initialMonthSubtraction -= 1;
        }
        newMonth.set('year', newYearVal).subtract(initialMonthSubtraction, 'months');
        onYearChange(newMonth);
      }

      return onYearSelect;
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
    key: 'render',
    value: function () {
      function render() {
        var _this3 = this;

        var _props5 = this.props,
            enableOutsideDays = _props5.enableOutsideDays,
            firstVisibleMonthIndex = _props5.firstVisibleMonthIndex,
            isAnimating = _props5.isAnimating,
            modifiers = _props5.modifiers,
            numberOfMonths = _props5.numberOfMonths,
            monthFormat = _props5.monthFormat,
            orientation = _props5.orientation,
            translationValue = _props5.translationValue,
            daySize = _props5.daySize,
            onDayMouseEnter = _props5.onDayMouseEnter,
            onDayMouseLeave = _props5.onDayMouseLeave,
            onDayClick = _props5.onDayClick,
            renderMonthText = _props5.renderMonthText,
            renderCalendarDay = _props5.renderCalendarDay,
            renderDayContents = _props5.renderDayContents,
            renderMonthElement = _props5.renderMonthElement,
            onMonthTransitionEnd = _props5.onMonthTransitionEnd,
            firstDayOfWeek = _props5.firstDayOfWeek,
            focusedDate = _props5.focusedDate,
            isFocused = _props5.isFocused,
            isRTL = _props5.isRTL,
            styles = _props5.styles,
            phrases = _props5.phrases,
            dayAriaLabelFormat = _props5.dayAriaLabelFormat,
            transitionDuration = _props5.transitionDuration,
            verticalBorderSpacing = _props5.verticalBorderSpacing,
            setMonthTitleHeight = _props5.setMonthTitleHeight,
            isSingleDate = _props5.isSingleDate;
        var months = this.state.months;

        var isVertical = orientation === _constants.VERTICAL_ORIENTATION;
        var isVerticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
        var isHorizontal = orientation === _constants.HORIZONTAL_ORIENTATION;

        var calendarMonthWidth = (0, _getCalendarMonthWidth2['default'])(daySize);

        var width = isVertical || isVerticalScrollable ? calendarMonthWidth : (numberOfMonths + 2) * calendarMonthWidth;

        var transformType = isVertical || isVerticalScrollable ? 'translateY' : 'translateX';
        var transformValue = transformType + '(' + String(translationValue) + 'px)';

        return _react2['default'].createElement(
          'div',
          _extends({}, (0, _reactWithStyles.css)(styles.CalendarMonthGrid, isHorizontal && styles.CalendarMonthGrid__horizontal, isVertical && styles.CalendarMonthGrid__vertical, isVerticalScrollable && styles.CalendarMonthGrid__vertical_scrollable, isAnimating && styles.CalendarMonthGrid__animating, isAnimating && transitionDuration && {
            transition: 'transform ' + String(transitionDuration) + 'ms ease-in-out'
          }, (0, _object2['default'])({}, (0, _getTransformStyles2['default'])(transformValue), {
            width: width
          })), {
            ref: this.setContainerRef,
            onTransitionEnd: onMonthTransitionEnd
          }),
          months.map(function (month, i) {
            var isVisible = i >= firstVisibleMonthIndex && i < firstVisibleMonthIndex + numberOfMonths;
            var hideForAnimation = i === 0 && !isVisible;
            var showForAnimation = i === 0 && isAnimating && isVisible;
            var monthString = (0, _toISOMonthString2['default'])(month);
            return _react2['default'].createElement(
              'div',
              _extends({
                key: monthString
              }, (0, _reactWithStyles.css)(isHorizontal && styles.CalendarMonthGrid_month__horizontal, hideForAnimation && styles.CalendarMonthGrid_month__hideForAnimation, showForAnimation && !isVertical && !isRTL && {
                position: 'absolute',
                left: -calendarMonthWidth
              }, showForAnimation && !isVertical && isRTL && {
                position: 'absolute',
                right: 0
              }, showForAnimation && isVertical && {
                position: 'absolute',
                top: -translationValue
              }, !isVisible && !isAnimating && styles.CalendarMonthGrid_month__hidden)),
              _react2['default'].createElement(_CalendarMonth2['default'], {
                month: month,
                isVisible: isVisible,
                enableOutsideDays: enableOutsideDays,
                modifiers: modifiers[monthString],
                monthFormat: monthFormat,
                orientation: orientation,
                onDayMouseEnter: onDayMouseEnter,
                onDayMouseLeave: onDayMouseLeave,
                onDayClick: onDayClick,
                onMonthSelect: _this3.onMonthSelect,
                onYearSelect: _this3.onYearSelect,
                renderMonthText: renderMonthText,
                renderCalendarDay: renderCalendarDay,
                renderDayContents: renderDayContents,
                renderMonthElement: renderMonthElement,
                firstDayOfWeek: firstDayOfWeek,
                daySize: daySize,
                focusedDate: isVisible ? focusedDate : null,
                isFocused: isFocused,
                phrases: phrases,
                setMonthTitleHeight: setMonthTitleHeight,
                dayAriaLabelFormat: dayAriaLabelFormat,
                verticalBorderSpacing: verticalBorderSpacing,
                isSingleDate: isSingleDate
              })
            );
          })
        );
      }

      return render;
    }()
  }]);

  return CalendarMonthGrid;
}(_react2['default'].Component);

CalendarMonthGrid.propTypes = propTypes;
CalendarMonthGrid.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref) {
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
      position: 'absolute'
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