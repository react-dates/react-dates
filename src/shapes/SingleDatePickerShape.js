import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import SharedPickerShape from './SharedPickerShape';

export const SingleDatePickerOnlyPropTypes = {
  // required props for a functional interactive SingleDatePicker
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func.isRequired,

  focused: PropTypes.bool,

  // input related props
  id: PropTypes.string,
  placeholder: PropTypes.string,

  showClearDate: PropTypes.bool,
  reopenPickerOnClearDate: PropTypes.bool,
};

export default {
  ...SharedPickerShape,
  ...SingleDatePickerOnlyPropTypes,
};
