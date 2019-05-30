import React from 'react';
import DateRangePicker from '../components/DateRangePicker'
import PropTypes from 'prop-types';
import { DateRangePickerPhrases } from '../../src/defaultPhrases';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from '../../src/constants';
import isInclusivelyAfterDay from '../../src/utils/isInclusivelyAfterDay';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import FocusedInputShape from '../shapes/FocusedInputShape';

const propTypes = {
  // required props for a functional interactive DateRangePicker
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func.isRequired,
  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func.isRequired,

  //optional props for special styling
  playbookVersionRanges: PropTypes.array,
};

const defaultProps = {
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
  block: false,
  small: true,
  regular: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT, //TODO: change to ANCHOR_RIGHT
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: true,
  reopenPickerOnClearDates: false,
  isRTL: false,
  hideKeyboardShortcutsPanel: true,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
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

class DriftDatePicker extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DateRangePicker {...this.props}/>
    )
  }
}

DriftDatePicker.propTypes = propTypes;
DriftDatePicker.defaultProps = defaultProps;

export default DriftDatePicker