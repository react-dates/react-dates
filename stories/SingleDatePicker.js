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

storiesOf('SingleDatePicker', module)
  .add('default', () => (
    <SingleDatePickerWrapper />
  ))
  .add('single month', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
    />
  ))
  .add('as part of a form', () => (
     <div>
       <SingleDatePickerWrapper />
       <TestInput placeholder="Input 1" />
       <TestInput placeholder="Input 2" />
       <TestInput placeholder="Input 3" />
     </div>
   ))
  .add('anchored right', () => (
    <div style={{ float: 'right' }}>
      <SingleDatePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
      />
    </div>
  ))
  .add('vertical', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .add('horizontal with portal', () => (
    <SingleDatePickerWrapper
      withPortal
    />
  ))
  .add('horizontal with fullscreen portal', () => (
    <SingleDatePickerWrapper withFullScreenPortal />
  ))
  .add('vertical with full screen portal', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
    />
  ))
  .add('with month specified on open', () => (
    <SingleDatePickerWrapper
      initialVisibleMonth={() => moment('01 2017', 'MM YYYY')}
    />
  ))
  .add('non-english locale', () => {
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
  .add('with custom display format', () => (
    <SingleDatePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .add('with outside days enabled', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ));
