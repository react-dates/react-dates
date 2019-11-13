import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';

import { DateRangePickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import FocusedInputShape from './FocusedInputShape';
import IconPositionShape from './IconPositionShape';
import OrientationShape from './OrientationShape';
import DisabledShape from './DisabledShape';
import anchorDirectionShape from './AnchorDirectionShape';
import openDirectionShape from './OpenDirectionShape';
import DayOfWeekShape from './DayOfWeekShape';
import CalendarInfoPositionShape from './CalendarInfoPositionShape';
import NavPositionShape from './NavPositionShape';

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
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  endDateId: PropTypes.string.isRequired,
  endDatePlaceholderText: PropTypes.string,
  startDateAriaLabel: PropTypes.string,
  endDateAriaLabel: PropTypes.string,
  disabled: DisabledShape,
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
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  orientation: OrientationShape,
  anchorDirection: anchorDirectionShape,
  openDirection: openDirectionShape,
  horizontalMargin: PropTypes.number,
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  appendToBody: PropTypes.bool,
  disableScroll: PropTypes.bool,
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
  horizontalMonthPadding: nonNegativeInteger,

  // navigation related props
  dayPickerNavigationInlineStyles: PropTypes.object,
  navPosition: NavPositionShape,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  renderNavPrevButton: PropTypes.func,
  renderNavNextButton: PropTypes.func,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // day presentation and interaction related props
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  minimumNights: PropTypes.number,
  minDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,
  enableOutsideDays: PropTypes.bool,
  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // internationalization props
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,
};
