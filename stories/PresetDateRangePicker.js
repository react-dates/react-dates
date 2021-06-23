import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import PresetDateRangePicker from '../examples/PresetDateRangePicker';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';


const presetDateRangePickerControllerInfo = `The ${monospace('PresetDateRangePicker')} component is not
  exported by ${monospace('react-dates')}. It is instead an example of how you might use the
  ${monospace('DateRangePicker')} along with the ${monospace('renderCalendarInfo')} prop in
  order to add preset range buttons for easy range selection. You can see the example code
  <a href="https://github.com/airbnb/react-dates/blob/master/examples/PresetDateRangePicker.jsx">
  here</a> and
  <a href="https://github.com/airbnb/react-dates/blob/master/stories/PresetDateRangePicker.js">
  here</a>.`;

const today = new Date();
const tomorrow = addDays(new Date(), 1);
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
  end: addWeeks(new Date(), 1),
},
{
  text: 'Next Month',
  start: today,
  end: addMonths(new Date(), 1),
}];

storiesOf('PresetDateRangePicker', module)
  .addDecorator(InfoPanelDecorator(presetDateRangePickerControllerInfo))
  .add('default', withInfo()(() => (
    <PresetDateRangePicker
      presets={presets}
      autoFocus
    />
  )));
