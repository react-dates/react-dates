import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { nonNegativeInteger } from 'airbnb-prop-types';

import { DateRangePickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import FocusedInputShape from '../shapes/FocusedInputShape';
import IconPositionShape from '../shapes/IconPositionShape';
import OrientationShape from '../shapes/OrientationShape';
import anchorDirectionShape from '../shapes/AnchorDirectionShape';
import openDirectionShape from '../shapes/OpenDirectionShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';

export default {
  // required props for a functional interactive DateRangePicker
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func.isRequired,

  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func.isRequired,

  onClose: PropTypes.func,

  // input related props
  startDateId: PropTypes.string.isRequired,
  startDatePlaceholderText: PropTypes.string,
  endDateId: PropTypes.string.isRequired,
  endDatePlaceholderText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  screenReaderInputMessage: PropTypes.string,
  showClearDates: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  keepFocusOnInput: PropTypes.bool,

  // calendar presentation and interaction related props
  renderMonth: PropTypes.func,
  orientation: OrientationShape,
  anchorDirection: anchorDirectionShape,
  openDirection: openDirectionShape,
  horizontalMargin: PropTypes.number,
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  daySize: nonNegativeInteger,
  isRTL: PropTypes.bool,
  firstDayOfWeek: DayOfWeekShape,
  initialVisibleMonth: PropTypes.func,
  numberOfMonths: PropTypes.number,
  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,
  renderCalendarInfo: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  verticalHeight: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,
  verticalSpacing: nonNegativeInteger,

  // navigation related props
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // day presentation and interaction related props
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  minimumNights: PropTypes.number,
  enableOutsideDays: PropTypes.bool,
  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // internationalization props
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerPhrases)),
};
