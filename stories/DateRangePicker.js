import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

const description = `The DateRangePicker is a fully-controlled component that allows a user to
  select both a start date and an end date. It is primarily designed for relatively short date
  ranges that are within a year or so of the initial visible month (it does not come out of the box
  with year navigation). It features a large number of props that can be used to customize the
  appearance of the inputs, calendar, and individual days as well as the interactions of the user
  with each of those components.`;

const usage = `In order to use the DateRangePicker, it must be wrapped in a parent component that
  manages the values of the startDate, endDate, and focusedInput in state. This parent component
  must pass these values down as props and also provide onDatesChange and onFocusChange callbacks
  to the DateRangePicker to update these values. You can see an example of this type of component
  <a href="https://github.com/airbnb/react-dates/blob/master/examples/DateRangePickerWrapper.jsx">
  here</a>.`;

const TestInput = props => (
  <div style={{ marginTop: 16 }}>
    <input
      {...props}
      type="text"
      style={{
        height: 48,
        width: 284,
        fontSize: 18,
        fontWeight: 200,
        padding: '12px 16px',
      }}
    />
  </div>
);

class TestWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
    };
  }

  render() {
    const { showDatePicker } = this.state;
    const display = showDatePicker ? 'block' : 'none';
    return (
      <div>
        <button
          type="button"
          onClick={() => this.setState({ showDatePicker: !showDatePicker })}
        >
          Show me!
        </button>

        <div style={{ display }}>
          <DateRangePickerWrapper />
        </div>
      </div>
    );
  }
}

storiesOf('DateRangePicker (DRP)', module)
  .addWithDocs('default',
    () => (
      <DateRangePickerWrapper />
    ),
    { description, usage },
  )
  .addWithInfo('hidden with display: none', () => (
    <TestWrapper />
  ))
  .addWithInfo('as part of a form', () => (
    <div>
      <DateRangePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
  ))
  .addWithInfo('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <DateRangePickerWrapper
        showClearDates
        startDatePlaceholderText="入住日期"
        endDatePlaceholderText="退房日期"
        monthFormat="YYYY[年]MMMM"
        phrases={{
          closeDatePicker: '关闭',
          clearDates: '清除日期',
        }}
      />
    );
  });
