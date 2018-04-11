import React from 'react';
import { forbidExtraProps, or, childrenOfType } from 'airbnb-prop-types';

import CalendarDay from './CalendarDay';
import CustomizableCalendarDay from './CustomizableCalendarDay';

var propTypes = forbidExtraProps({
  children: or([childrenOfType(CalendarDay), childrenOfType(CustomizableCalendarDay)]).isRequired
});

export default function CalendarWeek(_ref) {
  var children = _ref.children;

  return React.createElement(
    'tr',
    null,
    children
  );
}

CalendarWeek.propTypes = propTypes;