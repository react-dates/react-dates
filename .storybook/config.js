import moment from 'moment';
import { configure, addDecorator } from '@kadira/storybook';

import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';

import '../css/styles.scss';

const DefaultTheme = {
  reactDates: {
    color: {
      white: '#fff',
      border_input: '#dbdbdb',
      caption: '#3c3f40',
      border_day: '#e4e7e7',
      border_day_hovered: '#d4d9d9',
      background_day_active: '#f2f2f2',
      text_day: '#565a5c',

      day_blocked_minnights_background: '#fff',
      day_blocked_minnights_border: '#e4e7e7',
      day_blocked_minnights_color: '#cacccd',

      day_selectedspan_background: '#66e2da',
      day_selectedspan_border: '#33dacd',
      day_selectedspan_color: '#fff',

      day_selectedspan_hover_background: '#33dacd',
      day_selectedspan_hover_border: '#00a699',

      day_hoveredspan_background: '#b2f1ec',
      day_hoveredspan_border: '#80e8e0',
      day_hoveredspan_color: '#007a87',

      day_selected_background: '#00a699',
      day_selected_border: '#00a699',
      day_selected_color: '#fff',

      day_blocked_calendar_background: '#cacccd',
      day_blocked_calendar_border: '#cacccd',
      day_blocked_calendar_color: '#82888a',

      day_blocked_outsiderange_color: '#cacccd',
      day_blocked_outsiderange_border: '#e4e7e7',
    },
  },
};

ThemedStyleSheet.registerDefaultTheme(DefaultTheme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

addDecorator((story) => {
  moment.locale('en');
  return (story());
});

function loadStories() {
  require('../stories/DateRangePicker');
  require('../stories/SingleDatePicker');
  require('../stories/DayPicker');
}

configure(loadStories, module);
