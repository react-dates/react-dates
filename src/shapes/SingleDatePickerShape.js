import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { nonNegativeInteger } from 'airbnb-prop-types';

import { SingleDatePickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import IconPositionShape from '../shapes/IconPositionShape';
import OrientationShape from '../shapes/OrientationShape';
import anchorDirectionShape from '../shapes/AnchorDirectionShape';
import openDirectionShape from '../shapes/OpenDirectionShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

export default {
  // required props for a functional interactive SingleDatePicker
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func.isRequired,

  focused: PropTypes.bool,
  onFocusChange: PropTypes.func.isRequired,

  // input related props
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  screenReaderInputMessage: PropTypes.string,
  showClearDate: PropTypes.bool,
  customCloseIcon: PropTypes.node,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,

  // calendar presentation and interaction related props
  renderMonth: PropTypes.func,
  orientation: OrientationShape,
  anchorDirection: anchorDirectionShape,
  openDirection: openDirectionShape,
  horizontalMargin: PropTypes.number,
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  numberOfMonths: PropTypes.number,
  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDate: PropTypes.bool,
  renderCalendarInfo: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  isRTL: PropTypes.bool,

  // navigation related props
  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onClose: PropTypes.func,

  // day presentation and interaction related props
  renderDay: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // internationalization props
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerPhrases)),
};
