import React from 'react';
import moment from 'moment';

import DriftDatePicker from '../src/components/DriftDatePicker'

class DatePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    let focusedInput = null;

    this.state = {
      focusedInput,
      startDate: moment(),
      endDate: moment().add(30, 'days'),
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    const playbookVersionRanges = [
      {startTimestamp: 123, endTimestamp: 1234},
      {startTimestamp: 1234, endTimestamp: 12345},
      {startTimestamp: 12345, endTimestamp: 123456},
      {startTimestamp: 123456, endTimestamp: 1234567}
    ]

    return (
      <div>
        <DriftDatePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          playbookVersionRanges={playbookVersionRanges}
        />
      </div>
    );
  }
}

export default DatePickerWrapper;
