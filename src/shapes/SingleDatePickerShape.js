import { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';

import OrientationShape from '../shapes/OrientationShape';
import anchorDirectionShape from '../shapes/AnchorDirectionShape';

export default {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  date: momentPropTypes.momentObj,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,

  onDateChange: PropTypes.func,
  onFocusChange: PropTypes.func,

  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: OrientationShape,
  initialVisibleMonth: PropTypes.func,
  anchorDirection: anchorDirectionShape,

  // portal options
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // i18n
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape({
    closeDatePicker: PropTypes.node,
  }),
};
