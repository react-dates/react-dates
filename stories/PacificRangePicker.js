import React from 'react';
import { storiesOf, action } from '@storybook/react';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

import PacificRangePickerWrapper from '../examples/PacificRangePickerWrapper';

const dayPickerRangeControllerInfo = `The ${monospace('PacificRangePicker')} component`;

storiesOf('PacificRangePicker', module)
  .addDecorator(InfoPanelDecorator(dayPickerRangeControllerInfo))
  .addWithInfo('RangePicker', () => (
    <PacificRangePickerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
    />
));
