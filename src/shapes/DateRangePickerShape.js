import { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';

import FocusedInputShape from '../shapes/FocusedInputShape';
import OrientationShape from '../shapes/OrientationShape';

export default {
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  focusedInput: FocusedInputShape,
  minimumNights: PropTypes.number,
  blockedDates: PropTypes.arrayOf(momentPropTypes.momentObj),
  blockedByDefault: PropTypes.bool,
  unblockedDates: PropTypes.arrayOf(momentPropTypes.momentObj),
  allowPastDates: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  showClearDates: PropTypes.bool,

  orientation: OrientationShape,

  // portal options
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,

  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,

  onDatesChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape({
    closeDatePicker: PropTypes.node,
    clearDates: PropTypes.node,
  }),
};
