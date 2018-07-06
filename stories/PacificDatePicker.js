import React from 'react';
import { storiesOf, action } from '@storybook/react';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

import PacificDatePickerWrapper from '../examples/PacificDatePickerWrapper';

const dayPickerRangeControllerInfo = `The ${monospace('PacificDatePicker')} component`;

storiesOf('PacificDatePicker', module)
  .addDecorator(InfoPanelDecorator(dayPickerRangeControllerInfo))
  .addWithInfo('DatePicker', () => (
    <PacificDatePickerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
    />
));
