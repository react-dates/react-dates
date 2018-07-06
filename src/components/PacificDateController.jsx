/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import {
  forbidExtraProps,
  mutuallyExclusiveProps,
  nonNegativeInteger,
} from 'airbnb-prop-types';
import moment from 'moment';
import omit from 'lodash/omit';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';

import toISODateString from '../utils/toISODateString';
import toISOMonthString from '../utils/toISOMonthString';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';

import DayPickerSingleDateController from './DayPickerSingleDateController';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import UIIcon from './../pacificComponents/icon.js';
import BackSVG from './../pacificComponents/back.js';

import './../fonts/fonts.css';
import './../styles/reset.css';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
  INFO_POSITION_BOTTOM,
} from '../constants';

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
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  verticalHeight: nonNegativeInteger,
  noBorder: PropTypes.bool,
  verticalBorderSpacing: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,

  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,

  // i18n
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,

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
  renderMonthText: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  daySize: DAY_SIZE,
  verticalHeight: null,
  noBorder: false,
  verticalBorderSpacing: undefined,
  transitionDuration: undefined,

  navPrev: null,
  navNext: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onOutsideClick() {},

  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  renderMonthElement: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,

  // accessibility
  onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,

  // i18n
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,

  isRTL: false,
};

moment.updateLocale('en', {
  week: {
    dow: 0,
  },
  weekdaysMin: 'M_T_W_T_F_S_S'.split('_')
});

const { colors } = require('./../styles/vars');

const icon = (
  <UIIcon
    icon={(color) => (<BackSVG fill={color} />)}
    color={colors.colorN5}
    hoverColor={colors.colorBlack}
  />
);

const navPrevStyle = {
  position: 'absolute',
  top: '0',
  left: '12px',
};

const navPrev = (
  <div style={navPrevStyle}>
    {icon}
  </div>
);

const navNextStyle = {
  position: 'absolute',
  top: '0',
  right: '12px',
  transform: 'rotate(180deg)',
};

const navNext = (
  <div style={navNextStyle}>
    {icon}
  </div>
);

const renderMonthText = (m) => m.format('MMMM, YYYY')

const PacificDateController = (props) => (
  <DayPickerSingleDateController
    {...props}
    numberOfMonths={1}
    renderMonthText={renderMonthText}
    verticalBorderSpacing={4}
    keepOpenOnDateSelect={true}
    navPrev={navPrev}
    navNext={navNext}
    daySize={25}
  />
);

PacificDateController.propTypes = propTypes;
PacificDateController.defaultProps = defaultProps;

export default PacificDateController;
