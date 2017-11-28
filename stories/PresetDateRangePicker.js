import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';

import PresetDateRangePicker from '../examples/PresetDateRangePicker';

const today = moment();
const tomorrow = moment().add(1, 'day');
const presets = [{
  text: 'Today',
  start: today,
  end: today,
},
{
  text: 'Tomorrow',
  start: tomorrow,
  end: tomorrow,
},
{
  text: 'Next Week',
  start: today,
  end: moment().add(1, 'week'),
},
{
  text: 'Next Month',
  start: today,
  end: moment().add(1, 'month'),
}];

storiesOf('PresetDatePicker', module)
  .addWithInfo('default', () => (
    <PresetDateRangePicker
      presets={presets}
      autoFocus
    />
  ));
