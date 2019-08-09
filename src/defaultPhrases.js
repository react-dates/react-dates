const calendarLabel = 'Calendar';
const roleDescription = 'datepicker';
const closeDatePicker = 'Close';
const focusStartDate = 'Interact with the calendar and add the check-in date for your trip.';
const clearDate = 'Clear Date';
const clearDates = 'Clear Dates';
const jumpToPrevMonth = 'Move backward to switch to the previous month.';
const jumpToNextMonth = 'Move forward to switch to the next month.';
const keyboardShortcuts = 'Keyboard Shortcuts';
const showKeyboardShortcutsPanel = 'Open the keyboard shortcuts panel.';
const hideKeyboardShortcutsPanel = 'Close the shortcuts panel.';
const openThisPanel = 'Open this panel.';
const enterKey = 'Enter key';
const leftArrowRightArrow = 'Right and left arrow keys';
const upArrowDownArrow = 'up and down arrow keys';
const pageUpPageDown = 'page up and page down keys';
const homeEnd = 'Home and end keys';
const escape = 'Escape key';
const questionMark = 'Question mark';
const selectFocusedDate = 'Select the date in focus.';
const moveFocusByOneDay = 'Move backward (left) and forward (right) by one day.';
const moveFocusByOneWeek = 'Move backward (up) and forward (down) by one week.';
const moveFocusByOneMonth = 'Switch months.';
const moveFocustoStartAndEndOfWeek = 'Go to the first or last day of a week.';
const returnFocusToInput = 'Return to the date input field.';
const keyboardForwardNavigationInstructions = 'Navigate forward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.';
const keyboardBackwardNavigationInstructions = 'Navigate backward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.';

const chooseAvailableStartDate = ({ date }) => `Choose ${date} as your check-in date. It’s available.`;
const chooseAvailableEndDate = ({ date }) => `Choose ${date} as your check-out date. It’s available.`;
const chooseAvailableDate = ({ date }) => date;
const dateIsUnavailable = ({ date }) => `Not available. ${date}`;
const dateIsSelected = ({ date }) => `Selected. ${date}`;
const dateIsSelectedAsStartDate = ({ date }) => `Selected as start date. ${date}`;
const dateIsSelectedAsEndDate = ({ date }) => `Selected as end date. ${date}`;

export default {
  calendarLabel,
  roleDescription,
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
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,

  chooseAvailableStartDate,
  chooseAvailableEndDate,
  dateIsUnavailable,
  dateIsSelected,
  dateIsSelectedAsStartDate,
  dateIsSelectedAsEndDate,
};

export const DateRangePickerPhrases = {
  calendarLabel,
  roleDescription,
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
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,
  chooseAvailableStartDate,
  chooseAvailableEndDate,
  dateIsUnavailable,
  dateIsSelected,
  dateIsSelectedAsStartDate,
  dateIsSelectedAsEndDate,
};

export const DateRangePickerInputPhrases = {
  focusStartDate,
  clearDates,
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,
};

export const SingleDatePickerPhrases = {
  calendarLabel,
  roleDescription,
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
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,
  chooseAvailableDate,
  dateIsUnavailable,
  dateIsSelected,
};

export const SingleDatePickerInputPhrases = {
  clearDate,
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,
};

export const DayPickerPhrases = {
  calendarLabel,
  roleDescription,
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
  dateIsSelected,
  dateIsSelectedAsStartDate,
  dateIsSelectedAsEndDate,
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

export const DayPickerNavigationPhrases = {
  jumpToPrevMonth,
  jumpToNextMonth,
};

export const CalendarDayPhrases = {
  chooseAvailableDate,
  dateIsUnavailable,
  dateIsSelected,
  dateIsSelectedAsStartDate,
  dateIsSelectedAsEndDate,
};
