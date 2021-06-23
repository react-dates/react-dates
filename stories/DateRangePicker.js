import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';

import {
  VERTICAL_ORIENTATION,
  ANCHOR_RIGHT,
} from '../src/constants';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

const TestInput = (props) => (
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
  .add('default', withInfo()(() => (
    <DateRangePickerWrapper />
  )))
  .add('hidden with display: none', withInfo()(() => (
    <TestWrapper />
  )))
  .add('as part of a form', withInfo()(() => (
    <div>
      <DateRangePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
  )))
  .add('non-english locale', withInfo()(() => (
    <DateRangePickerWrapper
      showClearDates
      startDatePlaceholderText="入住日期"
      endDatePlaceholderText="退房日期"
      monthFormat="yyyy[年]MMMM"
      phrases={{
        closeDatePicker: '关闭',
        clearDates: '清除日期',
      }}
      locale="zh-CN"
    />
  )))
  .add('non-english locale #2', withInfo()(() => (
    <DateRangePickerWrapper
      locale="pt-BR"
    />
  )))
  .add('with DirectionProvider', withInfo()(() => (
    <DirectionProvider direction={DIRECTIONS.RTL}>
      <DateRangePickerWrapper
        startDatePlaceholderText="تاریخ شروع"
        endDatePlaceholderText="تاریخ پایان"
        anchorDirection={ANCHOR_RIGHT}
        showDefaultInputIcon
        showClearDates
        isRTL
      />
    </DirectionProvider>
  )))
  .add('vertical with custom height', withInfo()(() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      verticalHeight={568}
    />
  )))
  .add('with navigation blocked (minDate and maxDate)', withInfo()(() => (
    <DateRangePickerWrapper
      minDate={subMonths(startOfMonth(new Date()), 2)}
      maxDate={addMonths(endOfMonth(new Date()), 2)}
      numberOfMonths={2}
    />
  )));
