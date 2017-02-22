import moment from 'moment';
import { configure, addDecorator, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import '../css/styles.scss';

addDecorator((story) => {
  moment.locale('en');
  return (story());
});

function loadStories() {
  require('../stories/DateRangePicker');
  require('../stories/DateRangePicker_input');
  require('../stories/DateRangePicker_calendar');
  require('../stories/DateRangePicker_day');
  require('../stories/SingleDatePicker');
  require('../stories/SingleDatePicker_input');
  require('../stories/SingleDatePicker_calendar');
  require('../stories/SingleDatePicker_day');
  require('../stories/DayPickerRangeController');
  require('../stories/DayPicker');
}

setAddon(infoAddon);

configure(loadStories, module);
