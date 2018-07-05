import React from 'react';
import moment from 'moment';
import { storiesOf, action } from '@storybook/react';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import { VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE } from '../src/constants';

import DayPickerRangeControllerWrapper from '../examples/DayPickerRangeControllerWrapper';

const dayPickerRangeControllerInfo = `The ${monospace('PacificDatePicker')} component`;

storiesOf('PacificDatePicker', module)
  .addDecorator(InfoPanelDecorator(dayPickerRangeControllerInfo))
  .addWithInfo('RangePicker', () => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      numberOfMonths={1}
    />
));
