import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';

import SingleDateRangeEndPicker from '../src/components/SingleDateRangeEndPicker';

import { SingleDatePickerPhrases } from '../src/defaultPhrases';
import SingleDateRangeEndPickerShape from '../src/shapes/SingleDateRangeEndPickerShape';
import { HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from '../src/constants';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

const propTypes = {
  // example props for the demo
  autoFocus: PropTypes.bool,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,

  ...omit(SingleDateRangeEndPickerShape, [
    'startDate',
    'endDate',
    'onDateChange',
    'focused',
    'onFocusChange',
  ]),
};

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  initialStartDate: moment(),
  initialEndDate: null,

  // input related props
  id: 'end-date',
  placeholder: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepFocusOnInput: false,

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
  reopenPickerOnClearDate: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: SingleDatePickerPhrases,
};

class SingleDateRangeEndPickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: props.autoFocus,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ endDate: date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    const { focused, startDate, endDate } = this.state;

    // autoFocus, initialStartDate, and initialEndDate are helper props for
    // the example wrapper but are not props on the SingleDateRangeEndPicker
    // itself and thus, have to be omitted.
    const props = omit(this.props, [
      'autoFocus',
      'initialStartDate',
      'initialEndDate',
    ]);

    return (
      <SingleDateRangeEndPicker
        {...props}
        id="date_input"
        startDate={startDate}
        endDate={endDate}
        focused={focused}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
      />
    );
  }
}

SingleDateRangeEndPickerWrapper.propTypes = propTypes;
SingleDateRangeEndPickerWrapper.defaultProps = defaultProps;

export default SingleDateRangeEndPickerWrapper;
