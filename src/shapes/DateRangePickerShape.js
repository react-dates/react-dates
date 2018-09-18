import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import FocusedInputShape from './FocusedInputShape';

import SharedPickerShape from './SharedPickerShape';

export default {
  ...SharedPickerShape,

  // required props for a functional interactive DateRangePicker
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func,

  focusedInput: FocusedInputShape,

  // input related props
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  showClearDates: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,
  customArrowIcon: PropTypes.node,

  minimumNights: PropTypes.number,
};
