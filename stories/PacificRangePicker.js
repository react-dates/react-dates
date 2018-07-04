import React from 'react';
import moment from 'moment';
import { storiesOf, action } from '@storybook/react';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import { VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE } from '../src/constants';

import DayPickerRangeControllerWrapper from '../examples/DayPickerRangeControllerWrapper';

const dayPickerRangeControllerInfo = `The ${monospace('PacificRangePicker')} component`;

const TestPrevIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Prev
  </span>
);

const TestNextIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Next
  </span>
);

const TestCustomInfoPanel = () => (
  <div
    style={{
      padding: '10px 21px',
      borderTop: '1px solid #dce0e0',
      color: '#484848',
    }}
  >
    &#x2755; Some useful info here
  </div>
);

// const datesList = [
//   moment(),
//   moment().add(1, 'days'),
//   moment().add(3, 'days'),
//   moment().add(9, 'days'),
//   moment().add(10, 'days'),
//   moment().add(11, 'days'),
//   moment().add(12, 'days'),
//   moment().add(13, 'days'),
// ];

storiesOf('PacificRangePicker', module)
  .addDecorator(InfoPanelDecorator(dayPickerRangeControllerInfo))
  .addWithInfo('RangePicker', () => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      numberOfMonths={1}
    />
));
