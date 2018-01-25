import React from 'react';

import DayPickerSingleDateController from './DayPickerSingleDateController';
import SingleDatePickerContainer from './SingleDatePickerContainer';

export default function SingleDatePicker(props) {
  return (
    <SingleDatePickerContainer
      DayPickerSingleDateController={DayPickerSingleDateController}
      {...props}
    />
  );
}
