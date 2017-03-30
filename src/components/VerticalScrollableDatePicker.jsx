import React from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import cx from 'classnames';
import Portal from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener, removeEventListener } from 'consolidated-events';

import DateRangePickerInputController from './DateRangePickerInputController';
import DayPickerRangeController from './DayPickerRangeController';

import { START_DATE, END_DATE, VERTICAL_SCROLLABLE } from '../../constants';
import { DateRangePickerPhrases } from '../defaultPhrases';

// const propTypes = forbidExtraProps(DateRangePickerShape);

const defaultProps = {
  // required props for a functional interactive DateRangePicker
  startDate: null,
  endDate: null,
  focusedInput: null,

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
  orientation: VERTICAL_SCROLLABLE,
  // anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  renderCalendarInfo: null,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: DateRangePickerPhrases,
};

export default class VerticalScrollableDatePicker extends React.Component {
  // const dateProps = {
  //   focusedInput: START_DATE,
  // };

  constructor() {
    super();
    this.state = {
      selectedInput: START_DATE,
      startDate: null,
      endDate: null,
    };
  }

  render() {
    const { selectedInput, startDate, endDate } = this.state;
    const dateProps = {
      onSelectedInputChange: newSelectedInput => {
        this.setState({
          selectedInput: newSelectedInput,
        })
      },
      onDatesChange: ({ startDate, endDate }) => {
        this.setState({ startDate, endDate });
      },
      startDate,
      endDate,
    };

    return (
      <div style={{
        background: 'green',
        height: '100%',
        width: '100%',
      }}>
        <DateRangePickerInputController
          {...dateProps}
          isStartDateSelected={selectedInput === START_DATE}
          isEndDateSelected={selectedInput === END_DATE}
        />
        <DayPickerRangeController
          {...dateProps}
          orientation={VERTICAL_SCROLLABLE}
          selectedInput={selectedInput}
          numberOfMonths={4}
        />
      </div>
    );
  }
}
