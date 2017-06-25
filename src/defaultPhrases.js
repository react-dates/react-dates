const closeDatePicker = 'Close';
const focusStartDate = 'Interact with the calendar and add the check-in date for your trip.';
const clearDate = 'Clear Date';
const clearDates = 'Clear Dates';
const jumpToPrevMonth = 'Move backward to switch to the previous month';
const jumpToNextMonth = 'Move forward to switch to the next month';
const jumpToPrevYear = 'Move backward to switch to the previous year';
const jumpToNextYear = 'Move forward to switch to the next year';
const keyboardShortcuts = 'Keyboard Shortcuts';
const showKeyboardShortcutsPanel = 'Open the keyboard shortcuts panel';
const hideKeyboardShortcutsPanel = 'Close the shortcuts panel';
const openThisPanel = 'Open this panel';
const enterKey = 'Enter key';
const leftArrowRightArrow = 'Right and left arrow keys';
const upArrowDownArrow = 'up and down arrow keys';
const pageUpPageDown = 'page up and page down keys';
const homeEnd = 'Home and end keys';
const escape = 'Escape key';
const questionMark = 'Question mark';
const selectFocusedDate = 'Select the date in focus';
const moveFocusByOneDay = 'Move backward (left) and forward (right) by one day';
const moveFocusByOneWeek = 'Move backward (up) and forward (down) by one week';
const moveFocusByOneMonth = 'Switch months';
const moveFocusByOneYear = 'Switch years';
const moveFocustoStartOfMonthsRow = 'Move to the first month of the row';
const moveFocusByThreeMonths = 'Move backward (up) and forward (down) by three months';
const moveFocustoStartAndEndOfWeek = 'Go to the first or last day of a week';
const returnFocusToInput = 'Return to the date input field';
const keyboardNavigationInstructions = `Press the down arrow key to interact with the calendar and
  select a date. Press the question mark key to get the keyboard shortcuts for changing dates.`;

// eslint-disable-next-line camelcase
const chooseAvailableStartDate = ({ date }) => `Choose ${date} as your check-in date. It's available.`;

// eslint-disable-next-line camelcase
const chooseAvailableEndDate = ({ date }) => `Choose ${date} as your check-out date. It's available.`;
const chooseAvailableDate = ({ date }) => date;
const dateIsUnavailable = ({ date }) => `Not available. ${date}`;

export default {
  closeDatePicker,
  focusStartDate,
  clearDate,
  clearDates,
  jumpToPrevMonth,
  jumpToNextMonth,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
  keyboardNavigationInstructions,

  chooseAvailableStartDate,
  chooseAvailableEndDate,
  dateIsUnavailable,
};

export const DateRangePickerPhrases = {
  closeDatePicker,
  clearDates,
  focusStartDate,
  jumpToPrevMonth,
  jumpToNextMonth,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
  keyboardNavigationInstructions,
  chooseAvailableStartDate,
  chooseAvailableEndDate,
  dateIsUnavailable,
};

export const DateRangePickerInputPhrases = {
  focusStartDate,
  clearDates,
  keyboardNavigationInstructions,
};

export const SingleDatePickerPhrases = {
  closeDatePicker,
  clearDate,
  jumpToPrevMonth,
  jumpToNextMonth,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
  keyboardNavigationInstructions,
  chooseAvailableDate,
  dateIsUnavailable,
};

export const SingleDatePickerInputPhrases = {
  clearDate,
  keyboardNavigationInstructions,
};

export const DayPickerPhrases = {
  jumpToPrevMonth,
  jumpToNextMonth,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
  chooseAvailableStartDate,
  chooseAvailableEndDate,
  chooseAvailableDate,
  dateIsUnavailable,
};

export const MonthPickerPhrases = {
  jumpToPrevYear,
  jumpToNextYear,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneMonth,
  moveFocusByOneYear,
  moveFocustoStartOfMonthsRow,
  moveFocusByThreeMonths,
  returnFocusToInput,
  chooseAvailableStartDate,
  chooseAvailableEndDate,
  chooseAvailableDate,
  dateIsUnavailable,
};

export const DayPickerKeyboardShortcutsPhrases = {
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
};

export const MonthPickerKeyboardShortcutsPhrases = {
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
};

export const DayPickerNavigationPhrases = {
  jumpToPrevMonth,
  jumpToNextMonth,
};

export const MonthPickerNavigationPhrases = {
  jumpToPrevYear,
  jumpToNextYear,
};

export const CalendarDayPhrases = {
  chooseAvailableDate,
  dateIsUnavailable,
};

export const CalendarMonthPhrases = {
  chooseAvailableDate,
  dateIsUnavailable,
};
