import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import moment from 'moment';

import PresetDateRangePicker from '../examples/PresetDateRangePicker';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

const presetDateRangePickerControllerInfo = `The ${monospace('PresetDateRangePicker')} component is not
  exported by ${monospace('react-dates')}. It is instead an example of how you might use the
  ${monospace('DateRangePicker')} along with the ${monospace('renderCalendarInfo')} prop in
  order to add preset range buttons for easy range selection. You can see the example code
  <a href="https://github.com/react-dates/react-dates/blob/HEAD/examples/PresetDateRangePicker.jsx">
  here</a> and
  <a href="https://github.com/react-dates/react-dates/blob/HEAD/stories/PresetDateRangePicker.js">
  here</a>.`;

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

storiesOf('PresetDateRangePicker', module)
  .addDecorator(InfoPanelDecorator(presetDateRangePickerControllerInfo))
  .add('default', withInfo()(() => (
    <PresetDateRangePicker
      presets={presets}
      autoFocus
    />
  )));
