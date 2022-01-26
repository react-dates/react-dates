import React, { useState } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';

import { withStyles, withStylesPropTypes, css } from 'react-with-styles';

import DateRangePicker from '../src/components/DateRangePicker';

import { DateRangePickerPhrases } from '../src/defaultPhrases';
import DateRangePickerShape from '../src/shapes/DateRangePickerShape';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from '../src/constants';
import isSameDay from '../src/utils/isSameDay';

const propTypes = {
  ...withStylesPropTypes,

  // example props for the demo
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  presets: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    start: momentPropTypes.momentObj,
    end: momentPropTypes.momentObj,
  })),

  ...omit(DateRangePickerShape, [
    'startDate',
    'endDate',
    'onDatesChange',
    'focusedInput',
    'onFocusChange',
  ]),
};

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,
  presets: [],

  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderDayContents: null,
  minimumNights: 0,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => false,
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: DateRangePickerPhrases,
};

function DateRangePickerWrapper(props) {
  const { autoFocus, autoFocusEndDate, initialStartDate, initialEndDate } = props;

  let initialFocusedInput = null;
  if (autoFocus) {
    initialFocusedInput = START_DATE;
  } else if (autoFocusEndDate) {
    initialFocusedInput = END_DATE;
  }

  const [focusedInput, setFocusedInput] = useState(initialFocusedInput);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const renderDatePresets = () => {
    const { presets, styles } = props;

    return (
      <div {...css(styles.PresetDateRangePicker_panel)}>
        {presets.map(({ text, start, end }) => {
          const isSelected = isSameDay(start, startDate) && isSameDay(end, endDate);
          return (
            <button
              key={text}
              {...css(
                styles.PresetDateRangePicker_button,
                isSelected && styles.PresetDateRangePicker_button__selected,
              )}
              type="button"
              onClick={() => handleDatesChange({ startDate: start, endDate: end })}
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  }

  // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
  // example wrapper but are not props on the SingleDatePicker itself and
  // thus, have to be omitted.
  const filteredProps = omit(props, [
    'autoFocus',
    'autoFocusEndDate',
    'initialStartDate',
    'initialEndDate',
    'presets',
  ]);

  return (
    <div>
      <DateRangePicker
        {...filteredProps}
        renderCalendarInfo={renderDatePresets}
        onDatesChange={handleDatesChange}
        onFocusChange={setFocusedInput}
        focusedInput={focusedInput}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color } }) => ({
  PresetDateRangePicker_panel: {
    padding: '0 22px 11px 22px',
  },

  PresetDateRangePicker_button: {
    position: 'relative',
    height: '100%',
    textAlign: 'center',
    background: 'none',
    border: `2px solid ${color.core.primary}`,
    color: color.core.primary,
    padding: '4px 12px',
    marginRight: 8,
    font: 'inherit',
    fontWeight: 700,
    lineHeight: 'normal',
    overflow: 'visible',
    boxSizing: 'border-box',
    cursor: 'pointer',

    ':active': {
      outline: 0,
    },
  },

  PresetDateRangePicker_button__selected: {
    color: color.core.white,
    background: color.core.primary,
  },
}))(DateRangePickerWrapper);
