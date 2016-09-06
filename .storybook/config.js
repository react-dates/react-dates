import moment from 'moment';
import { configure, addDecorator } from '@kadira/storybook';

import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';

import '../css/styles.scss';

const DefaultTheme = {
  reactDates: {
    color: {
      border: '#dbdbdb',
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
