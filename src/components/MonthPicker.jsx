import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import ReactDOM from 'react-dom';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';

import { MonthPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import OutsideClickHandler from './OutsideClickHandler';
import CalendarYearGrid from './CalendarYearGrid';
import MonthPickerNavigation from './MonthPickerNavigation';
import MonthPickerKeyboardShortcuts, {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
} from './MonthPickerKeyboardShortcuts';

import getTransformStyles from '../utils/getTransformStyles';
import getCalendarYearWidth from '../utils/getCalendarYearWidth';
import getActiveElement from '../utils/getActiveElement';
import isMonthVisible from '../utils/isMonthVisible';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  MONTH_WIDTH_SIZE,
  MONTH_HEIGHT_SIZE,
} from '../../constants';

const YEAR_PADDING = 23;
const MONTH_PICKER_PADDING = 9;
const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';

const propTypes = forbidExtraProps({
  // calendar presentation props
  numberOfYears: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  onOutsideClick: PropTypes.func,
  hidden: PropTypes.bool,
  initialVisibleYear: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  monthWidthSize: nonNegativeInteger,
  monthHeightSize: nonNegativeInteger,
  isRTL: PropTypes.bool,

  // navigation props
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  onPrevYearClick: PropTypes.func,
  onNextYearClick: PropTypes.func,
  onMultiplyScrollableYears: PropTypes.func, // VERTICAL_SCROLLABLE MonthPickers only

  // year props
  renderYear: PropTypes.func,

  // month props
  modifiers: PropTypes.object,
  renderMonth: PropTypes.func,
  onMonthClick: PropTypes.func,
  onMonthMouseEnter: PropTypes.func,
  onMonthMouseLeave: PropTypes.func,

  // accessibility props
  isFocused: PropTypes.bool,
  getFirstFocusableMonth: PropTypes.func,
  onBlur: PropTypes.func,
  showKeyboardShortcuts: PropTypes.bool,

  // internationalization
  yearFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(MonthPickerPhrases)),
});

export const defaultProps = {
  // calendar presentation props
  numberOfYears: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  onOutsideClick() {},
  hidden: false,
  initialVisibleYear: () => moment(),
  renderCalendarInfo: null,
  hideKeyboardShortcutsPanel: false,
  monthWidthSize: MONTH_WIDTH_SIZE,
  monthHeightSize: MONTH_HEIGHT_SIZE,
  isRTL: false,

  // navigation props
  navPrev: null,
  navNext: null,
  onPrevYearClick() {},
  onNextYearClick() {},
  onMultiplyScrollableYears() {},

  // year props
  renderYear: null,

  // month props
  modifiers: {},
  renderMonth: null,
  onMonthClick() {},
  onMonthMouseEnter() {},
  onMonthMouseLeave() {},

  // accessibility props
  isFocused: false,
  getFirstFocusableMonth: null,
  onBlur() {},
  showKeyboardShortcuts: false,

  // internationalization
  yearFormat: 'YYYY',
  phrases: MonthPickerPhrases,
};

function applyTransformStyles(el, transform, opacity = '') {
  const transformStyles = getTransformStyles(transform);
  transformStyles.opacity = opacity;

  Object.keys(transformStyles).forEach((styleKey) => {
    // eslint-disable-next-line no-param-reassign
    el.style[styleKey] = transformStyles[styleKey];
  });
}

export function calculateDimension(el, axis, borderBox = false, withMargin = false) {
  if (!el) {
    return 0;
  }

  const axisStart = axis === 'width' ? 'Left' : 'Top';
  const axisEnd = axis === 'width' ? 'Right' : 'Bottom';

  // Only read styles if we need to
  const style = (!borderBox || withMargin) ? window.getComputedStyle(el) : null;

  // Offset includes border and padding
  const { offsetWidth, offsetHeight } = el;
  let size = axis === 'width' ? offsetWidth : offsetHeight;

  // Get the inner size
  if (!borderBox) {
    size -= (
      parseFloat(style[`padding${axisStart}`]) +
      parseFloat(style[`padding${axisEnd}`]) +
      parseFloat(style[`border${axisStart}Width`]) +
      parseFloat(style[`border${axisEnd}Width`])
    );
  }

  // Apply margin
  if (withMargin) {
    size += (parseFloat(style[`margin${axisStart}`]) + parseFloat(style[`margin${axisEnd}`]));
  }

  return size;
}

function getMonthHeight(el) {
  const caption = el.querySelector('.js-CalendarYear__caption');
  const grid = el.querySelector('.js-CalendarYear__grid');

  // Need to separate out table children for FF
  // Add an additional +1 for the border
  return (
    calculateDimension(caption, 'height', true, true) + calculateDimension(grid, 'height') + 1
  );
}

export default class MonthPicker extends React.Component {
  constructor(props) {
    super(props);

    const currentYear = props.hidden ? moment() : props.initialVisibleYear();

    let focusedDate = currentYear.clone().startOf('month');
    if (props.getFirstFocusableMonth) {
      focusedDate = props.getFirstFocusableMonth(currentYear);
    }

    const translationValue =
      props.isRTL && this.isHorizontal() ? -getCalendarYearWidth(props.monthWidthSize) : 0;

    this.hasSetinitialVisibleYear = !props.hidden;
    this.state = {
      currentYear,
      yearTransition: null,
      translationValue,
      scrollableYearMultiple: 1,
      calendarYearWidth: getCalendarYearWidth(props.monthWidthSize),
      focusedDate: (!props.hidden || props.isFocused) ? focusedDate : null,
      nextFocusedDate: null,
      showKeyboardShortcuts: props.showKeyboardShortcuts,
      onKeyboardShortcutsPanelClose() {},
      isTouchDevice: isTouchDevice(),
      withMouseInteractions: true,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPrevYearClick = this.onPrevYearClick.bind(this);
    this.onNextYearClick = this.onNextYearClick.bind(this);
    this.setCalendarYearGridRef = this.setCalendarYearGridRef.bind(this);
    this.multiplyScrollableYears = this.multiplyScrollableYears.bind(this);
    this.updateStateAfterYearTransition = this.updateStateAfterYearTransition.bind(this);

    this.openKeyboardShortcutsPanel = this.openKeyboardShortcutsPanel.bind(this);
    this.closeKeyboardShortcutsPanel = this.closeKeyboardShortcutsPanel.bind(this);
  }

  componentDidMount() {
    this.setState({ isTouchDevice: isTouchDevice() });

    if (this.isHorizontal()) {
      this.adjustMonthPickerHeight();
      this.initializeMonthPickerWidth();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { hidden, isFocused, showKeyboardShortcuts, onBlur } = nextProps;
    const { currentYear } = this.state;

    if (!hidden) {
      if (!this.hasSetinitialVisibleYear) {
        this.hasSetinitialVisibleYear = true;
        this.setState({
          currentYear: nextProps.initialVisibleYear(),
        });
      }

      if (!this.monthPickerWidth && this.isHorizontal()) {
        this.initializeMonthPickerWidth();
        this.adjustMonthPickerHeight();
      }
    }

    if (nextProps.monthWidthSize !== this.props.monthWidthSize) {
      this.setState({
        calendarYearWidth: getCalendarYearWidth(nextProps.monthWidthSize),
      });
    }

    if (isFocused !== this.props.isFocused) {
      if (isFocused) {
        const focusedDate = this.getFocusedMonth(currentYear);

        let onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;
        if (nextProps.showKeyboardShortcuts) {
          // the ? shortcut came from the input and we should return input there once it is close
          onKeyboardShortcutsPanelClose = onBlur;
        }

        this.setState({
          showKeyboardShortcuts,
          onKeyboardShortcutsPanelClose,
          focusedDate,
          withMouseInteractions: false,
        });
      } else {
        this.setState({ focusedDate: null });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    const { yearTransition, currentYear, focusedDate } = this.state;
    if (yearTransition || !currentYear.isSame(prevState.currentYear)) {
      if (this.isHorizontal()) {
        this.adjustMonthPickerHeight();
      }
    }

    if (
      (!prevProps.isFocused && this.props.isFocused && !focusedDate) ||
      (!prevProps.showKeyboardShortcuts && this.props.showKeyboardShortcuts)
    ) {
      this.container.focus();
    }
  }

  onKeyDown(e) {
    e.stopPropagation();

    this.setState({ withMouseInteractions: false });

    const { onBlur } = this.props;
    const { focusedDate, showKeyboardShortcuts } = this.state;
    if (!focusedDate) return;

    const newFocusedDate = focusedDate.clone();

    let didTransitionYear = false;

    // focus might be anywhere when the keyboard shortcuts panel is opened so we want to
    // return it to wherever it was before when the panel was opened
    const activeElement = getActiveElement();
    const onKeyboardShortcutsPanelClose = () => {
      if (activeElement) activeElement.focus();
    };

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newFocusedDate.subtract(3, 'month');
        didTransitionYear = this.maybeTransitionPrevYear(newFocusedDate);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newFocusedDate.subtract(1, 'month');
        didTransitionYear = this.maybeTransitionPrevYear(newFocusedDate);
        break;
      case 'Home':
        e.preventDefault();
        newFocusedDate.startOf('year');
        didTransitionYear = this.maybeTransitionPrevYear(newFocusedDate);
        break;
      case 'PageUp':
        e.preventDefault();
        newFocusedDate.startOf('year');
        didTransitionYear = this.maybeTransitionPrevYear(newFocusedDate);
        break;

      case 'ArrowDown':
        e.preventDefault();
        newFocusedDate.add(3, 'month');
        didTransitionYear = this.maybeTransitionNextYear(newFocusedDate);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newFocusedDate.add(1, 'month');
        didTransitionYear = this.maybeTransitionNextYear(newFocusedDate);
        break;
      case 'End':
        e.preventDefault();
        newFocusedDate.endOf('year');
        didTransitionYear = this.maybeTransitionNextYear(newFocusedDate);
        break;
      case 'PageDown':
        e.preventDefault();
        newFocusedDate.endOf('year');
        didTransitionYear = this.maybeTransitionNextYear(newFocusedDate);
        break;

      case '?':
        this.openKeyboardShortcutsPanel(onKeyboardShortcutsPanelClose);
        break;

      case 'Escape':
        if (showKeyboardShortcuts) {
          this.closeKeyboardShortcutsPanel();
        } else {
          onBlur();
        }
        break;

      default:
        break;
    }

    // If there was a month transition, do not update the focused date until the transition has
    // completed. Otherwise, attempting to focus on a DOM node may interrupt the CSS animation. If
    // didTransitionMonth is true, the focusedDate gets updated in #updateStateAfterYearTransition
    if (!didTransitionYear) {
      this.setState({
        focusedDate: newFocusedDate,
      });
    }
  }

  onPrevYearClick(nextFocusedDate, e) {
    const { isRTL } = this.props;

    if (e) e.preventDefault();

    let translationValue =
      this.isVertical() ? this.getMonthHeightByIndex(0) : this.monthPickerWidth;

    if (isRTL && this.isHorizontal()) {
      translationValue = -2 * this.monthPickerWidth;
    }

    // The first CalendarYear is always positioned absolute at top: 0 or left: 0
    // so we need to transform it to the appropriate location before the animation.
    // This behavior is because we would otherwise need a double-render in order to
    // adjust the container position once we had the height the first calendar
    // (ie first draw all the calendar, then in a second render, use the first calendar's
    // height to position the container). Variable calendar heights, amirite? <3 Maja
    this.translateFirstMonthPickerForAnimation(translationValue);

    this.setState({
      yearTransition: PREV_TRANSITION,
      translationValue,
      focusedDate: null,
      nextFocusedDate,
    });
  }

  onNextYearClick(nextFocusedDate, e) {
    const { isRTL } = this.props;

    if (e) e.preventDefault();

    let translationValue =
      this.isVertical() ? -this.getMonthHeightByIndex(1) : -this.monthPickerWidth;

    if (isRTL && this.isHorizontal()) {
      translationValue = 0;
    }

    this.setState({
      yearTransition: NEXT_TRANSITION,
      translationValue,
      focusedDate: null,
      nextFocusedDate,
    });
  }

  getFocusedMonth(newYear) {
    const { getFirstFocusableMonth, numberOfYears } = this.props;

    let focusedDate;
    if (getFirstFocusableMonth) {
      focusedDate = getFirstFocusableMonth(newYear);
    }

    if (newYear && (!focusedDate || !isMonthVisible(focusedDate, newYear, numberOfYears))) {
      focusedDate = newYear.clone().startOf('month');
    }

    return focusedDate;
  }

  getMonthHeightByIndex(i) {
    return getMonthHeight(this.transitionContainer.querySelectorAll('.CalendarYear')[i]);
  }

  setCalendarYearGridRef(ref) {
    this.calendarYearGrid = ref;
  }

  maybeTransitionNextYear(newFocusedDate) {
    const { numberOfYears } = this.props;
    const { currentYear, focusedDate } = this.state;

    const newFocusedYear = newFocusedDate.year();
    const focusedYear = focusedDate.year();

    const isNewFocusedDateVisible = isMonthVisible(newFocusedDate, currentYear, numberOfYears);
    if (newFocusedYear !== focusedYear && !isNewFocusedDateVisible) {
      this.onNextYearClick(newFocusedDate);
      return true;
    }

    return false;
  }

  maybeTransitionPrevYear(newFocusedDate) {
    const { numberOfYears } = this.props;
    const { currentYear, focusedDate } = this.state;

    const newFocusedYear = newFocusedDate.year();
    const focusedYear = focusedDate.year();
    const isNewFocusedDateVisible = isMonthVisible(newFocusedDate, currentYear, numberOfYears);
    if (newFocusedYear !== focusedYear && !isNewFocusedDateVisible) {
      this.onPrevYearClick(newFocusedDate);
      return true;
    }

    return false;
  }

  multiplyScrollableYears(e) {
    const { onMultiplyScrollableYears } = this.props;
    if (e) e.preventDefault();

    if (onMultiplyScrollableYears) onMultiplyScrollableYears(e);

    this.setState({
      scrollableYearMultiple: this.state.scrollableYearMultiple + 1,
    });
  }

  isHorizontal() {
    return this.props.orientation === HORIZONTAL_ORIENTATION;
  }

  isVertical() {
    return this.props.orientation === VERTICAL_ORIENTATION ||
      this.props.orientation === VERTICAL_SCROLLABLE;
  }

  initializeMonthPickerWidth() {
    if (this.calendarYearGrid) {
      // eslint-disable-next-line react/no-find-dom-node
      const calendarYearGridDOMNode = ReactDOM.findDOMNode(this.calendarYearGrid);
      if (calendarYearGridDOMNode) {
        this.monthPickerWidth = calculateDimension(
          calendarYearGridDOMNode.querySelector('.CalendarYear'),
          'width',
          true,
        );
      }
    }
  }

  updateStateAfterYearTransition() {
    const {
      onPrevYearClick,
      onNextYearClick,
    } = this.props;

    const {
      currentYear,
      yearTransition,
      focusedDate,
      nextFocusedDate,
      withMouseInteractions,
    } = this.state;

    if (!yearTransition) return;

    const newYear = currentYear.clone();
    if (yearTransition === PREV_TRANSITION) {
      if (onPrevYearClick) onPrevYearClick();
      newYear.subtract(1, 'year');
    } else if (yearTransition === NEXT_TRANSITION) {
      if (onNextYearClick) onNextYearClick();
      newYear.add(1, 'year');
    }

    let newFocusedDate = null;
    if (nextFocusedDate) {
      newFocusedDate = nextFocusedDate;
    } else if (!focusedDate && !withMouseInteractions) {
      newFocusedDate = this.getFocusedMonth(newYear);
    }

    if (this.calendarYearGrid) {
      // eslint-disable-next-line react/no-find-dom-node
      const calendarYearGridDOMNode = ReactDOM.findDOMNode(this.calendarYearGrid);
      if (calendarYearGridDOMNode) {
        // clear the previous transforms
        applyTransformStyles(
          calendarYearGridDOMNode.querySelector('.CalendarYear'),
          'none',
        );
      }
    }

    this.setState({
      currentYear: newYear,
      yearTransition: null,
      translationValue: (this.props.isRTL && this.isHorizontal()) ? -this.monthPickerWidth : 0,
      nextFocusedDate: null,
      focusedDate: newFocusedDate,
    }, () => {
      // we don't want to focus on the relevant calendar day after a month transition
      // if the user is navigating around using a mouse
      if (withMouseInteractions) {
        const activeElement = getActiveElement();
        if (activeElement && activeElement !== document.body) {
          activeElement.blur();
        }
      }
    });
  }

  adjustMonthPickerHeight() {
    const heights = [];

    Array.prototype.forEach.call(this.transitionContainer.querySelectorAll('.CalendarYear'),
      (el) => {
        if (el.getAttribute('data-visible') === 'true') {
          heights.push(getMonthHeight(el));
        }
      },
    );

    const newYearHeight = Math.max(...heights) + YEAR_PADDING;

    if (newYearHeight !== calculateDimension(this.transitionContainer, 'height')) {
      this.monthHeight = newYearHeight;
      this.transitionContainer.style.height = `${newYearHeight}px`;
    }
  }

  translateFirstMonthPickerForAnimation(translationValue) {
    const { isRTL } = this.props;

    let convertedTranslationValue = -translationValue;
    if (isRTL && this.isHorizontal()) {
      const positiveTranslationValue = Math.abs(translationValue + this.monthPickerWidth);
      convertedTranslationValue = positiveTranslationValue;
    }
    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${convertedTranslationValue}px)`;

    applyTransformStyles(
      this.transitionContainer.querySelector('.CalendarYear'),
      transformValue,
      1,
    );
  }

  openKeyboardShortcutsPanel(onCloseCallBack) {
    this.setState({
      showKeyboardShortcuts: true,
      onKeyboardShortcutsPanelClose: onCloseCallBack,
    });
  }

  closeKeyboardShortcutsPanel() {
    const { onKeyboardShortcutsPanelClose } = this.state;

    if (onKeyboardShortcutsPanelClose) {
      onKeyboardShortcutsPanelClose();
    }

    this.setState({
      onKeyboardShortcutsPanelClose: null,
      showKeyboardShortcuts: false,
    });
  }

  renderNavigation() {
    const {
      navPrev,
      navNext,
      orientation,
      phrases,
      isRTL,
    } = this.props;

    let onNextYearClick;
    if (orientation === VERTICAL_SCROLLABLE) {
      onNextYearClick = this.multiplyScrollableYears;
    } else {
      onNextYearClick = (e) => { this.onNextYearClick(null, e); };
    }

    return (
      <MonthPickerNavigation
        onPrevYearClick={(e) => { this.onPrevYearClick(null, e); }}
        onNextYearClick={onNextYearClick}
        navPrev={navPrev}
        navNext={navNext}
        orientation={orientation}
        phrases={phrases}
        isRTL={isRTL}
      />
    );
  }

  render() {
    const {
      calendarYearWidth,
      currentYear,
      yearTransition,
      translationValue,
      scrollableYearMultiple,
      focusedDate,
      showKeyboardShortcuts,
      isTouchDevice: isTouch,
    } = this.state;

    const {
      numberOfYears,
      orientation,
      modifiers,
      withPortal,
      onMonthClick,
      onMonthMouseEnter,
      onMonthMouseLeave,
      renderYear,
      renderMonth,
      renderCalendarInfo,
      hideKeyboardShortcutsPanel,
      onOutsideClick,
      yearFormat,
      monthWidthSize,
      monthHeightSize,
      isFocused,
      phrases,
    } = this.props;

    let firstVisibleYearIndex = 1;
    if (yearTransition === PREV_TRANSITION) {
      firstVisibleYearIndex -= 1;
    } else if (yearTransition === NEXT_TRANSITION) {
      firstVisibleYearIndex += 1;
    }

    const verticalScrollable = this.props.orientation === VERTICAL_SCROLLABLE;
    if (verticalScrollable) firstVisibleYearIndex = 0;

    const MonthPickerClassNames = cx('MonthPicker', {
      'MonthPicker--horizontal': this.isHorizontal(),
      'MonthPicker--vertical': this.isVertical(),
      'MonthPicker--vertical-scrollable': verticalScrollable,
      'MonthPicker--portal': withPortal,
    });

    const transitionContainerClasses = cx('transition-container', {
      'transition-container--horizontal': this.isHorizontal(),
      'transition-container--vertical': this.isVertical(),
    });

    const horizontalWidth = (calendarYearWidth * numberOfYears) + (2 * MONTH_PICKER_PADDING);

    // this is a kind of made-up value that generally looks good. we'll
    // probably want to let the user set this explicitly.
    const verticalHeight = 1.75 * calendarYearWidth;

    const MonthPickerStyle = {
      width: this.isHorizontal() && horizontalWidth,

      // These values are to center the datepicker (approximately) on the page
      marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2,
      marginTop: this.isHorizontal() && withPortal && -calendarYearWidth / 2,
    };

    const transitionContainerStyle = {
      width: this.isHorizontal() && horizontalWidth,
      height: this.isVertical() && !verticalScrollable && !withPortal && verticalHeight,
    };

    const isCalendarYearGridAnimating = yearTransition !== null;
    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${translationValue}px)`;

    const shouldFocusDate = !isCalendarYearGridAnimating && isFocused;

    let keyboardShortcutButtonLocation = BOTTOM_RIGHT;
    if (this.isVertical()) {
      keyboardShortcutButtonLocation = withPortal ? TOP_LEFT : TOP_RIGHT;
    }

    return (
      <div
        className={MonthPickerClassNames}
        style={MonthPickerStyle}
      >
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
            className="MonthPicker__focus-region"
            ref={(ref) => { this.container = ref; }}
            onClick={(e) => { e.stopPropagation(); }}
            onKeyDown={throttle(this.onKeyDown, 300)}
            onMouseUp={() => { this.setState({ withMouseInteractions: true }); }}
            role="region"
            tabIndex={-1}
          >
            {!verticalScrollable && this.renderNavigation()}

            <div
              className={transitionContainerClasses}
              ref={(ref) => { this.transitionContainer = ref; }}
              style={transitionContainerStyle}
            >
              <CalendarYearGrid
                ref={this.setCalendarYearGridRef}
                transformValue={transformValue}
                firstVisibleYearIndex={firstVisibleYearIndex}
                initialYear={currentYear}
                isAnimating={isCalendarYearGridAnimating}
                modifiers={modifiers}
                orientation={orientation}
                numberOfYears={numberOfYears * scrollableYearMultiple}
                onMonthClick={onMonthClick}
                onMonthMouseEnter={onMonthMouseEnter}
                onMonthMouseLeave={onMonthMouseLeave}
                renderYear={renderYear}
                renderMonth={renderMonth}
                onYearTransitionEnd={this.updateStateAfterYearTransition}
                yearFormat={yearFormat}
                monthWidthSize={monthWidthSize}
                monthHeightSize={monthHeightSize}
                isFocused={shouldFocusDate}
                focusedDate={focusedDate}
                phrases={phrases}
              />
              {verticalScrollable && this.renderNavigation()}
            </div>

            {!isTouch && !hideKeyboardShortcutsPanel &&
              <MonthPickerKeyboardShortcuts
                block={this.isVertical() && !withPortal}
                buttonLocation={keyboardShortcutButtonLocation}
                showKeyboardShortcutsPanel={showKeyboardShortcuts}
                openKeyboardShortcutsPanel={this.openKeyboardShortcutsPanel}
                closeKeyboardShortcutsPanel={this.closeKeyboardShortcutsPanel}
                phrases={phrases}
              />
            }
          </div>

          {renderCalendarInfo && renderCalendarInfo()}
        </OutsideClickHandler>
      </div>
    );
  }
}

MonthPicker.propTypes = propTypes;
MonthPicker.defaultProps = defaultProps;
