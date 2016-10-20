import React from 'react';
import moment from "moment";
import DateRangePicker from '../src/components/DateRangePicker';

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: "startDate",
      startDate: null,
      endDate: null,
      visible: true,
      error: {
        start: false,
        end: false,
      }
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    if (focusedInput) {
      this.setState({ focusedInput });
    }
  }

  onSubmit() {
    console.log("submitted");
  }

  render() {
    const { focusedInput, startDate, endDate, visible, error } = this.state;
    return (
      <div>
        <DateRangePicker
          {...this.props}
          onSubmit={this.onSubmit}
          error={error}
          datepickerVisible={visible}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}

          startDatePlaceholder={moment().startOf("day").format("MM/DD/YYYY HH:mm:ss")}
          endDatePlaceholder={moment("235959", "hmmss").format("MM/DD/YYYY HH:mm:ss")}
        />
      </div>
    );
  }
}

export default DateRangePickerWrapper;
