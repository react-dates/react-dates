import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import values from 'object.values';
import isTouchDevice from 'is-touch-device';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  DAY_SIZE,
} from '../../constants';

import withModifiers from './withModifiers';
import DayPicker from './DayPicker';
import OutsideClickHandler from './OutsideClickHandler';

const propTypes = forbidExtraProps({
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func,

  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  renderMonth: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  firstDayOfWeek: DayOfWeekShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderDay: PropTypes.func,
  renderCalendarInfo: PropTypes.func,

  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  date: undefined, // TODO: use null
  onDateChange() {},

  focused: false,
  onFocusChange() {},
  onClose() {},

  keepOpenOnDateSelect: false,
  isOutsideRange() {},
  isDayBlocked() {},
  isDayHighlighted() {},

  // DayPicker props
  renderMonth: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  daySize: DAY_SIZE,

  navPrev: null,
  navNext: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onOutsideClick: null,

  renderDay: null,
  renderCalendarInfo: null,

  // accessibility
  onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,

  // i18n
  monthFormat: 'MMMM YYYY',
  phrases: DayPickerPhrases,

  isRTL: false,
};

class DayPickerSingleDateController extends React.Component {
  constructor(props) {
    super(props);

    this.isTouchDevice = false;

    this.state = {
      hoverDate: null,
    };

    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);
  }

  componentDidMount() {
    this.isTouchDevice = isTouchDevice();
  }

  componentWillReceiveProps(nextProps) {
    const {
      date,
      focused,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      deleteModifier,
      addModifier,
      updateModifiers,
      visibleDays,
    } = nextProps;

    let recomputeOutsideRange = false;
    let recomputeDayBlocked = false;
    let recomputeDayHighlighted = false;

    if (isOutsideRange !== this.props.isOutsideRange) {
      // TODO: add modifiers update function
      this.modifiers['blocked-out-of-range'] = day => isOutsideRange(day);
      recomputeOutsideRange = true;
    }

    if (isDayBlocked !== this.props.isDayBlocked) {
      // TODO: add modifiers update function
      this.modifiers['blocked-calendar'] = day => isDayBlocked(day);
      recomputeDayBlocked = true;
    }

    if (isDayHighlighted !== this.props.isDayHighlighted) {
      // TODO: add modifiers update function
      this.modifiers['highlighted-calendar'] = day => isDayHighlighted(day);
      recomputeDayHighlighted = true;
    }

    const recomputePropModifiers =
      recomputeOutsideRange || recomputeDayBlocked || recomputeDayHighlighted;

    const didDateChange = date !== this.props.date;
    const didFocusChange = focused !== this.props.focused;

    let modifiers = {};

    if (didDateChange) {
      modifiers = deleteModifier(modifiers, this.props.date, 'selected');
      modifiers = addModifier(modifiers, date, 'selected');
    }

    if (didFocusChange || recomputePropModifiers) {
      values(visibleDays).forEach((days) => {
        Object.keys(days).forEach((day) => {
          const momentObj = moment(day);
          if (modifiers.blocked(momentObj)) {
            modifiers = addModifier(modifiers, momentObj, 'blocked');
          } else {
            modifiers = deleteModifier(modifiers, momentObj, 'blocked');
          }

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              modifiers = addModifier(modifiers, momentObj, 'blocked-out-of-range');
            } else {
              modifiers = deleteModifier(modifiers, momentObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              modifiers = addModifier(modifiers, momentObj, 'blocked-calendar');
            } else {
              modifiers = deleteModifier(modifiers, momentObj, 'blocked-calendar');
            }
          }

          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(momentObj)) {
              modifiers = addModifier(modifiers, momentObj, 'highlighted-calendar');
            } else {
              modifiers = deleteModifier(modifiers, momentObj, 'highlighted-calendar');
            }
          }
        });
      });
    }

    // TODO: figure out today memoization
    // const today = moment();
    // if (!isSameDay(this.today, today)) {
    //   modifiers = deleteModifier(modifiers, this.today, 'today');
    //   modifiers = addModifier(modifiers, today, 'today');
    //   this.today = today;
    // }

    if (Object.keys(modifiers).length > 0) {
      updateModifiers({
        ...visibleDays,
        ...modifiers,
      });
    }
  }

  componentWillUpdate() {
    this.today = moment();
  }

  onDayClick(day, e) {
    const {
      onDateChange,
      keepOpenOnDateSelect,
      onFocusChange,
      onClose,
      modifiers,
    } = this.props;

    if (e) e.preventDefault();
    if (modifiers.blocked(day)) return;

    onDateChange(day);
    if (!keepOpenOnDateSelect) {
      onFocusChange({ focused: null });
      onClose({ date: day });
    }
  }

  onDayMouseEnter(day) {
    if (this.isTouchDevice) return;
    const { visibleDays, addModifier, deleteModifier } = this.props;
    const { hoverDate } = this.state;

    let modifiers = deleteModifier({}, hoverDate, 'hovered');
    modifiers = addModifier(modifiers, day, 'hovered');

    this.setState({
      hoverDate: day,
    });

    this.props.updateModifiers({
      ...visibleDays,
      ...modifiers,
    });
  }

  onDayMouseLeave() {
    const { visibleDays, deleteModifier } = this.props;
    const { hoverDate } = this.state;
    if (this.isTouchDevice || !hoverDate) return;

    const modifiers = deleteModifier({}, hoverDate, 'hovered');

    this.setState({
      hoverDate: null,
    });

    this.props.updateModifiers({
      ...visibleDays,
      ...modifiers,
    });
  }

  getFirstFocusableDay(newMonth) {
    const { date, numberOfMonths, modifiers } = this.props;

    let focusedDate = newMonth.clone().startOf('month');
    if (date) {
      focusedDate = date.clone();
    }

    if (modifiers.blocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter(day => !modifiers.blocked(day) && isAfterDay(day, focusedDate));
      if (viableDays.length > 0) focusedDate = viableDays[0];
    }

    return focusedDate;
  }

  render() {
    const {
      numberOfMonths,
      orientation,
      monthFormat,
      renderMonth,
      navPrev,
      navNext,
      withPortal,
      focused,
      enableOutsideDays,
      hideKeyboardShortcutsPanel,
      daySize,
      firstDayOfWeek,
      renderDay,
      renderCalendarInfo,
      isFocused,
      isRTL,
      phrases,
      onOutsideClick,
      onBlur,
      showKeyboardShortcuts,
      currentMonth,
      visibleDays,
      onPrevMonthClick,
      onNextMonthClick,
    } = this.props;

    const dayPickerComponent = (
      <DayPicker
        orientation={orientation}
        enableOutsideDays={enableOutsideDays}
        modifiers={visibleDays}
        numberOfMonths={numberOfMonths}
        onDayClick={this.onDayClick}
        onDayMouseEnter={this.onDayMouseEnter}
        onDayMouseLeave={this.onDayMouseLeave}
        onPrevMonthClick={onPrevMonthClick}
        onNextMonthClick={onNextMonthClick}
        monthFormat={monthFormat}
        withPortal={withPortal}
        hidden={!focused}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        initialVisibleMonth={() => currentMonth}
        firstDayOfWeek={firstDayOfWeek}
        navPrev={navPrev}
        navNext={navNext}
        renderMonth={renderMonth}
        renderDay={renderDay}
        renderCalendarInfo={renderCalendarInfo}
        isFocused={isFocused}
        getFirstFocusableDay={this.getFirstFocusableDay}
        onBlur={onBlur}
        phrases={phrases}
        daySize={daySize}
        isRTL={isRTL}
        showKeyboardShortcuts={showKeyboardShortcuts}
      />
    );

    if (onOutsideClick) {
      return (
        <OutsideClickHandler
          onOutsideClick={onOutsideClick}
        >
          {dayPickerComponent}
        </OutsideClickHandler>
      );
    }

    return dayPickerComponent;
  }
}

DayPickerSingleDateController.propTypes = propTypes;
DayPickerSingleDateController.defaultProps = defaultProps;

export default withModifiers((props, state) => ({
  today: day => isSameDay(day, moment()),
  blocked: day => props.isDayBlocked(day) || props.isOutsideRange(day),
  'blocked-calendar': day => props.isDayBlocked(day),
  'blocked-out-of-range': day => props.isOutsideRange(day),
  'highlighted-calendar': day => props.isDayHighlighted(day),
  valid: day => !props.isDayBlocked(day) && !props.isOutsideRange(day),
  hovered: day => isSameDay(day, state.hoverDate),
  selected: day => isSameDay(day, props.date),
}))(DayPickerSingleDateController);
