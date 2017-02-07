import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT } from '../constants';

const TestInput = props => (
   <div style={{ marginTop: 16 }} >
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
const TestPrevIcon = props => (
  <span style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px'
    }}
  >
    Prev
  </span>
);
const TestNextIcon = props => (
  <span style={{
    border: '1px solid #dce0e0',
    backgroundColor: '#fff',
    color: '#484848',
    padding: '3px'
    }}
  >
    Next
  </span>
);

storiesOf('SingleDatePicker', module)
  .addWithInfo('default', () => (
    <SingleDatePickerWrapper />
  ))
  .addWithInfo('single month', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
    />
  ))
  .addWithInfo('as part of a form', () => (
     <div>
       <SingleDatePickerWrapper />
       <TestInput placeholder="Input 1" />
       <TestInput placeholder="Input 2" />
       <TestInput placeholder="Input 3" />
     </div>
   ))
  .addWithInfo('anchored right', () => (
    <div style={{ float: 'right' }}>
      <SingleDatePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
      />
    </div>
  ))
  .addWithInfo('vertical', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('horizontal with portal', () => (
    <SingleDatePickerWrapper
      withPortal
    />
  ))
  .addWithInfo('horizontal with fullscreen portal', () => (
    <SingleDatePickerWrapper withFullScreenPortal />
  ))
  .addWithInfo('vertical with full screen portal', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
    />
  ))
  .addWithInfo('with clear dates button', () => (
    <SingleDatePickerWrapper
      showClearDate
    />
  ))
  .addWithInfo('reopens DayPicker on clear dates', () => (
    <SingleDatePickerWrapper
      showClearDate
      reopenPickerOnClearDate
    />
  ))
  .addWithInfo('does not autoclose the DayPicker on date selection', () => (
    <SingleDatePickerWrapper
      keepOpenOnDateSelect
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <SingleDatePickerWrapper
      initialVisibleMonth={() => moment('01 2017', 'MM YYYY')}
    />
  ))
  .addWithInfo('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <SingleDatePickerWrapper
        placeholder="入住日期"
        monthFormat="YYYY[年]MMMM"
        phrases={{
          closeDatePicker: '关闭',
        }}
      />
    );
  })
  .addWithInfo('with custom display format', () => (
    <SingleDatePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .addWithInfo('with custom arrows', () => (
    <SingleDatePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .addWithInfo('with screen reader message', () => (
    <SingleDatePickerWrapper
      screenReaderInputMessage='Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc'
    />
  ))
  .addWithInfo('with custom daily details', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      renderDay={day => day.format('ddd')}
    />
  ));
