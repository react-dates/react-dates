import { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';

import FocusedInputShape from '../shapes/FocusedInputShape';
import OrientationShape from '../shapes/OrientationShape';
import anchorDirectionShape from '../shapes/AnchorDirectionShape';

export default {
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  focusedInput: FocusedInputShape,
  minimumNights: PropTypes.number,
  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,
  keepOpenOnDateSelect: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  showClearDates: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,

  orientation: OrientationShape,
  anchorDirection: anchorDirectionShape,
  // portal options
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,

  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,

  initialVisibleMonth: PropTypes.func,
  onDatesChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // i18n
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape({
    closeDatePicker: PropTypes.node,
    clearDates: PropTypes.node,
  }),
};
