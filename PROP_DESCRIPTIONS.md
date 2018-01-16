# react-dates

## Prop Descriptions

In addition to the required props outlined in the [README](https://github.com/airbnb/react-dates/blob/master/README.md), `react-dates` allows for a high level of customizations in all of its exported components. This guide goes into depth on usage of each of the props, what format they take, and some examples.

### onClose

**Type:** PropTypes.func
**Components:** `DateRangePicker`, `SingleDatePicker`

The `onClose` callback is triggered whenever the calendar dropdown is closed, whether that is by the datepicker losing focus, outside click, or other action.


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