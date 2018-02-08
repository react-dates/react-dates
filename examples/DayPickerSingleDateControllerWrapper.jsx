/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import moment from 'moment';
import omit from 'lodash/omit';

import DayPickerSingleDateController from '../src/components/DayPickerSingleDateController';

import ScrollableOrientationShape from '../src/shapes/ScrollableOrientationShape';

import { HORIZONTAL_ORIENTATION } from '../src/constants';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

const propTypes = forbidExtraProps({
  // example props for the demo
  autoFocus: PropTypes.bool,
  initialDate: momentPropTypes.momentObj,
  showInput: PropTypes.bool,

  keepOpenOnDateSelect: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  renderCalendarInfo: PropTypes.func,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,

  isRTL: PropTypes.bool,
});

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  initialDate: null,
  showInput: false,

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,
  enableOutsideDays: false,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  onOutsideClick() {},
  keepOpenOnDateSelect: false,
  renderCalendarInfo: null,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  monthFormat: 'MMMM YYYY',
};

class DayPickerSingleDateControllerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: true,
      date: props.initialDate,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ date });
  }

  onFocusChange() {
    // Force the focused states to always be truthy so that date is always selectable
    this.setState({ focused: true });
  }

  render() {
    const { showInput } = this.props;
    const { focused, date } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
      'showInput',
    ]);

    const dateString = date && date.format('YYYY-MM-DD');

    return (
      <div>
        {showInput &&
          <div style={{ marginBottom: 16 }}>
            <input type="text" name="start date" value={dateString || ''} readOnly />
          </div>
        }

        <DayPickerSingleDateController
          {...props}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          focused={focused}
          date={date}
        />
      </div>
    );
  }
}

DayPickerSingleDateControllerWrapper.propTypes = propTypes;
DayPickerSingleDateControllerWrapper.defaultProps = defaultProps;

export default DayPickerSingleDateControllerWrapper;
