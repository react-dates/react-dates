import React, { memo, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { withStyles, withStylesPropTypes } from 'react-with-styles';
import { Portal } from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener } from 'consolidated-events';
import isTouchDeviceUtil from 'is-touch-device';
import OutsideClickHandler from 'react-outside-click-handler';
import { darken } from 'color2k';

import DateRangePickerShape from '../shapes/DateRangePickerShape';
import { DateRangePickerPhrases } from '../defaultPhrases';

import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';
import getDetachedContainerStyles from '../utils/getDetachedContainerStyles';
import getInputHeight from '../utils/getInputHeight';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import disableScroll from '../utils/disableScroll';
import noflip from '../utils/noflip';

import DateRangePickerInputController from './DateRangePickerInputController';
import DayPickerRangeController from './DayPickerRangeController';
import CloseButton from './CloseButton';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
  OPEN_DOWN,
  OPEN_UP,
  DAY_SIZE,
  ICON_BEFORE_POSITION,
  INFO_POSITION_BOTTOM,
  FANG_HEIGHT_PX,
  DEFAULT_VERTICAL_SPACING,
  NAV_POSITION_TOP,
} from '../constants';
import usePrevious from '../utils/usePrevious';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  ...DateRangePickerShape,
});

const defaultProps = {
  // required props for a functional interactive DateRangePicker
  startDate: null,
  endDate: null,
  focusedInput: null,

  // input related props
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  startDateAriaLabel: undefined,
  endDateAriaLabel: undefined,
  startDateTitleText: undefined,
  endDateTitleText: undefined,
  startDateOffset: undefined,
  endDateOffset: undefined,
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  openDirection: OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  firstDayOfWeek: null,
  verticalHeight: null,
  transitionDuration: undefined,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  autoComplete: 'off',
  horizontalMonthPadding: undefined,

  // navigation related props
  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},

  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: (day) => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,
  minDate: undefined,
  maxDate: undefined,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DateRangePickerPhrases,
  dayAriaLabelFormat: undefined,
};

const DateRangePicker = memo((props) => {
  let isTouchDevice = isTouchDeviceUtil();
  let enableScroll;
  let removeEventListener;
  let removeDayPickerFocusOut;
  const [dayPickerContainerStyles, setDayPickerContainerStyles] = useState({});
  const [isDateRangePickerInputFocused, setIsDateRangePickerInputFocused] = useState(false);
  const [isDayPickerFocused, setIsDayPickerFocused] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const containerRef = useRef(null);
  let dayPickerContainerRef = useRef(null);

  const { 
    startDate,
    startDateId,
    startDatePlaceholderText,
    startDateAriaLabel,
    startDateTitleText,
    endDate,
    endDateId,
    endDatePlaceholderText,
    endDateAriaLabel,
    endDateTitleText,
    focusedInput,
    screenReaderInputMessage,
    showClearDates,
    showDefaultInputIcon,
    inputIconPosition,
    customInputIcon,
    customArrowIcon,
    customCloseIcon,
    disabled,
    required,
    readOnly,
    autoComplete,
    openDirection,
    phrases,
    isOutsideRange,
    isDayBlocked,
    minimumNights,
    withPortal,
    withFullScreenPortal,
    displayFormat,
    reopenPickerOnClearDates,
    keepOpenOnDateSelect,
    onDatesChange,
    onClose,
    isRTL,
    noBorder,
    block,
    verticalSpacing,
    small,
    regular,
    css,
    styles,
  } = props;

  const isOpened = () => (focusedInput === START_DATE || focusedInput === END_DATE);

  const handleOutsideClick = (event) => {
    const {
      onFocusChange,
      onClose,
      startDate,
      endDate,
      appendToBody,
    } = props;

    if (!isOpened()) return;
    if (appendToBody && dayPickerContainerRef.current.contains(event.target)) return;

    setIsDateRangePickerInputFocused(false);
    setIsDayPickerFocused(false);
    setShowKeyboardShortcuts(false);

    onFocusChange(null);
    onClose({ startDate, endDate });
  }

  const handleDayPickerFocus = () => {
    const { onFocusChange } = props;
    if (!focusedInput) onFocusChange(START_DATE);

    setIsDateRangePickerInputFocused(false);
    setIsDayPickerFocused(true);
    setShowKeyboardShortcuts(false);
  }

  const handleDayPickerBlur = () => {
    setIsDateRangePickerInputFocused(true);
    setIsDayPickerFocused(false);
    setShowKeyboardShortcuts(false);
  }

  const handleDateRangePickerInputFocus = (focusedInput) => {
    const {
      onFocusChange,
      readOnly,
      withPortal,
      withFullScreenPortal,
      keepFocusOnInput,
    } = props;

    if (focusedInput) {
      const withAnyPortal = withPortal || withFullScreenPortal;
      const moveFocusToDayPicker = withAnyPortal
        || (readOnly && !keepFocusOnInput)
        || (isTouchDevice && !keepFocusOnInput);

      if (moveFocusToDayPicker) {
        handleDayPickerFocus();
      } else {
        handleDayPickerBlur();
      }
    }

    onFocusChange(focusedInput);
  }

  const handleDayPickerFocusOut = (event) => {
    // In cases where **relatedTarget** is not null, it points to the right
    // element here. However, in cases where it is null (such as clicking on a
    // specific day) or it is **document.body** (IE11), the appropriate value is **event.target**.
    //
    // We handle both situations here by using the ` || ` operator to fallback
    // to *event.target** when **relatedTarget** is not provided.
    const relatedTarget = event.relatedTarget === document.body
      ? event.target
      : (event.relatedTarget || event.target);
    if (dayPickerContainerRef.current.contains(relatedTarget)) return;
    handleOutsideClick(event);
  }

  const addDayPickerEventListeners = () => {
    // NOTE: We are using a manual event listener here, because React doesn't
    // provide FocusOut, while blur and keydown don't provide the information
    // needed in order to know whether we have left focus or not.
    //
    // For reference, this issue is further described here:
    // - https://github.com/facebook/react/issues/6410
    removeDayPickerFocusOut = addEventListener(
      dayPickerContainerRef.current,
      'focusout',
      handleDayPickerFocusOut,
    );
  }

  const removeDayPickerEventListeners = () => {
    if (removeDayPickerFocusOut) removeDayPickerFocusOut();
  }

  const setDayPickerContainerRef = (ref) => {
    if (ref === dayPickerContainerRef.current) return;
    if (dayPickerContainerRef.current) removeDayPickerEventListeners();

    dayPickerContainerRef.current = ref;
    if (!ref) return;

    addDayPickerEventListeners();
  }
  
  const disableContainerScroll = () =>  {
    const { appendToBody, disableScroll: propDisableScroll } = props;
    if (!appendToBody && !propDisableScroll) return;
    if (!isOpened()) return;

    // Disable scroll for every ancestor of this DateRangePicker up to the
    // document level. This ensures the input and the picker never move. Other
    // sibling elements or the picker itself can scroll.
    enableScroll = disableScroll(containerRef.current);
  }

  const responsivizePickerPosition = () => {
    // It's possible the portal props have been changed in response to window resizes
    // So let's ensure we reset this back to the base state each time
    if (Object.keys(dayPickerContainerStyles).length > 0) {
      setDayPickerContainerStyles({})
    }

    if (!isOpened()) {
      return;
    }

    const {
      openDirection,
      anchorDirection,
      horizontalMargin,
      withPortal,
      withFullScreenPortal,
      appendToBody,
    } = props;

    const isAnchoredLeft = anchorDirection === ANCHOR_LEFT;
    if (!withPortal && !withFullScreenPortal) {
      const containerRect = dayPickerContainerRef.current.getBoundingClientRect();
      const currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
      const containerEdge = isAnchoredLeft
        ? containerRect[ANCHOR_RIGHT]
        : containerRect[ANCHOR_LEFT];

      setDayPickerContainerStyles({
        ...getResponsiveContainerStyles(
          anchorDirection,
          currentOffset,
          containerEdge,
          horizontalMargin,
        ),
        ...(appendToBody && getDetachedContainerStyles(
          openDirection,
          anchorDirection,
          containerRef.current,
        )),
      });
    }
  }

  const showKeyboardShortcutsPanel = () => {
    setIsDateRangePickerInputFocused(false);
    setIsDayPickerFocused(true);
    setShowKeyboardShortcuts(true);
  }

  const { focusedInput: prevFocusedInput } = usePrevious(props, props) || {};

  useEffect(() => {
    removeEventListener = addEventListener(
      window,
      'resize',
      responsivizePickerPosition,
      { passive: true },
    );
    responsivizePickerPosition();
    disableContainerScroll();
    
    if (focusedInput) {
      setIsDateRangePickerInputFocused(true);
    }

    isTouchDevice = isTouchDeviceUtil();
  }, []);

  useEffect(() => {
    if (!prevFocusedInput && focusedInput && isOpened()) {
      // The date picker just changed from being closed to being open.
      responsivizePickerPosition();
      disableContainerScroll();
    } else if (prevFocusedInput && !focusedInput && !isOpened()) {
      // The date picker just changed from being open to being closed.
      if (enableScroll) enableScroll();
    }
    return () => {
      removeDayPickerEventListeners();
      if (removeEventListener) removeEventListener();
      if (enableScroll) enableScroll();
    }
  }, [focusedInput]);

  const maybeRenderDayPickerWithPortal = () => {
    const { withPortal, withFullScreenPortal, appendToBody } = props;

    if (!isOpened()) {
      return null;
    }

    if (withPortal || withFullScreenPortal || appendToBody) {
      return (
        <Portal>
          {renderDayPicker()}
        </Portal>
      );
    }

    return renderDayPicker();
  }

  const renderDayPicker = () => {
    const {
      anchorDirection,
      openDirection,
      isDayBlocked,
      isDayHighlighted,
      isOutsideRange,
      numberOfMonths,
      orientation,
      monthFormat,
      renderMonthText,
      renderWeekHeaderElement,
      dayPickerNavigationInlineStyles,
      navPosition,
      navPrev,
      navNext,
      renderNavPrevButton,
      renderNavNextButton,
      onPrevMonthClick,
      onNextMonthClick,
      onDatesChange,
      onFocusChange,
      withPortal,
      withFullScreenPortal,
      daySize,
      enableOutsideDays,
      focusedInput,
      startDate,
      startDateOffset,
      endDate,
      endDateOffset,
      minDate,
      maxDate,
      minimumNights,
      keepOpenOnDateSelect,
      renderCalendarDay,
      renderDayContents,
      renderCalendarInfo,
      renderMonthElement,
      calendarInfoPosition,
      firstDayOfWeek,
      initialVisibleMonth,
      hideKeyboardShortcutsPanel,
      customCloseIcon,
      onClose,
      phrases,
      dayAriaLabelFormat,
      isRTL,
      weekDayFormat,
      css,
      styles,
      verticalHeight,
      noBorder,
      transitionDuration,
      verticalSpacing,
      horizontalMonthPadding,
      small,
      disabled,
      theme: { reactDates },
    } = props;

    const handleDayPickerOutsideClick = (!withFullScreenPortal && withPortal)
      ? handleOutsideClick
      : undefined;
    const initialVisibleMonthThunk = initialVisibleMonth || (
      () => (startDate || endDate || moment())
    );

    const closeIcon = customCloseIcon || (
      <CloseButton {...css(styles.DateRangePicker_closeButton_svg)} />
    );

    const inputHeight = getInputHeight(reactDates, small);

    const withAnyPortal = withPortal || withFullScreenPortal;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div
        key="day-picker"
        ref={setDayPickerContainerRef}
        {...css(
          styles.DateRangePicker_picker,
          anchorDirection === ANCHOR_LEFT && styles.DateRangePicker_picker__directionLeft,
          anchorDirection === ANCHOR_RIGHT && styles.DateRangePicker_picker__directionRight,
          orientation === HORIZONTAL_ORIENTATION && styles.DateRangePicker_picker__horizontal,
          orientation === VERTICAL_ORIENTATION && styles.DateRangePicker_picker__vertical,
          !withAnyPortal && openDirection === OPEN_DOWN && {
            top: inputHeight + verticalSpacing,
          },
          !withAnyPortal && openDirection === OPEN_UP && {
            bottom: inputHeight + verticalSpacing,
          },
          withAnyPortal && styles.DateRangePicker_picker__portal,
          withFullScreenPortal && styles.DateRangePicker_picker__fullScreenPortal,
          isRTL && styles.DateRangePicker_picker__rtl,
          dayPickerContainerStyles,
        )}
        onClick={handleDayPickerOutsideClick}
      >
        <DayPickerRangeController
          orientation={orientation}
          enableOutsideDays={enableOutsideDays}
          numberOfMonths={numberOfMonths}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          onDatesChange={onDatesChange}
          onFocusChange={onFocusChange}
          onClose={onClose}
          focusedInput={focusedInput}
          startDate={startDate}
          startDateOffset={startDateOffset}
          endDate={endDate}
          endDateOffset={endDateOffset}
          minDate={minDate}
          maxDate={maxDate}
          monthFormat={monthFormat}
          renderMonthText={renderMonthText}
          renderWeekHeaderElement={renderWeekHeaderElement}
          withPortal={withAnyPortal}
          daySize={daySize}
          initialVisibleMonth={initialVisibleMonthThunk}
          hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          dayPickerNavigationInlineStyles={dayPickerNavigationInlineStyles}
          navPosition={navPosition}
          navPrev={navPrev}
          navNext={navNext}
          renderNavPrevButton={renderNavPrevButton}
          renderNavNextButton={renderNavNextButton}
          minimumNights={minimumNights}
          isOutsideRange={isOutsideRange}
          isDayHighlighted={isDayHighlighted}
          isDayBlocked={isDayBlocked}
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          renderCalendarDay={renderCalendarDay}
          renderDayContents={renderDayContents}
          renderCalendarInfo={renderCalendarInfo}
          renderMonthElement={renderMonthElement}
          calendarInfoPosition={calendarInfoPosition}
          isFocused={isDayPickerFocused}
          showKeyboardShortcuts={showKeyboardShortcuts}
          onBlur={handleDayPickerBlur}
          phrases={phrases}
          dayAriaLabelFormat={dayAriaLabelFormat}
          isRTL={isRTL}
          firstDayOfWeek={firstDayOfWeek}
          weekDayFormat={weekDayFormat}
          verticalHeight={verticalHeight}
          noBorder={noBorder}
          transitionDuration={transitionDuration}
          disabled={disabled}
          horizontalMonthPadding={horizontalMonthPadding}
        />

        {withFullScreenPortal && (
          <button
            {...css(styles.DateRangePicker_closeButton)}
            type="button"
            onClick={handleDayPickerOutsideClick}
            aria-label={phrases.closeDatePicker}
            tabIndex="-1"
          >
            {closeIcon}
          </button>
        )}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  }



  const enableOutsideClick = (!withPortal && !withFullScreenPortal);

  const hideFang = verticalSpacing < FANG_HEIGHT_PX;

  const input = (
    <DateRangePickerInputController
      startDate={startDate}
      startDateId={startDateId}
      startDatePlaceholderText={startDatePlaceholderText}
      isStartDateFocused={focusedInput === START_DATE}
      startDateAriaLabel={startDateAriaLabel}
      startDateTitleText={startDateTitleText}
      endDate={endDate}
      endDateId={endDateId}
      endDatePlaceholderText={endDatePlaceholderText}
      isEndDateFocused={focusedInput === END_DATE}
      endDateAriaLabel={endDateAriaLabel}
      endDateTitleText={endDateTitleText}
      displayFormat={displayFormat}
      showClearDates={showClearDates}
      showCaret={!withPortal && !withFullScreenPortal && !hideFang}
      showDefaultInputIcon={showDefaultInputIcon}
      inputIconPosition={inputIconPosition}
      customInputIcon={customInputIcon}
      customArrowIcon={customArrowIcon}
      customCloseIcon={customCloseIcon}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      openDirection={openDirection}
      reopenPickerOnClearDates={reopenPickerOnClearDates}
      keepOpenOnDateSelect={keepOpenOnDateSelect}
      isOutsideRange={isOutsideRange}
      isDayBlocked={isDayBlocked}
      minimumNights={minimumNights}
      withFullScreenPortal={withFullScreenPortal}
      onDatesChange={onDatesChange}
      onFocusChange={handleDateRangePickerInputFocus}
      onKeyDownArrowDown={handleDayPickerFocus}
      onKeyDownQuestionMark={showKeyboardShortcutsPanel}
      onClose={onClose}
      phrases={phrases}
      screenReaderMessage={screenReaderInputMessage}
      isFocused={isDateRangePickerInputFocused}
      isRTL={isRTL}
      noBorder={noBorder}
      block={block}
      small={small}
      regular={regular}
      verticalSpacing={verticalSpacing}
      autoComplete={autoComplete}
    >
      {maybeRenderDayPickerWithPortal()}
    </DateRangePickerInputController>
  );

  return (
    <div
      ref={containerRef}
      {...css(
        styles.DateRangePicker,
        block && styles.DateRangePicker__block,
      )}
    >
      {enableOutsideClick && (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          {input}
        </OutsideClickHandler>
      )}
      {enableOutsideClick || input}
    </div>
  );
});

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;

export { DateRangePicker as PureDateRangePicker };
export default withStyles(({ reactDates: { color, zIndex } }) => ({
  DateRangePicker: {
    position: 'relative',
    display: 'inline-block',
  },

  DateRangePicker__block: {
    display: 'block',
  },

  DateRangePicker_picker: {
    zIndex: zIndex + 1,
    backgroundColor: color.background,
    position: 'absolute',
  },

  DateRangePicker_picker__rtl: {
    direction: noflip('rtl'),
  },

  DateRangePicker_picker__directionLeft: {
    left: noflip(0),
  },

  DateRangePicker_picker__directionRight: {
    right: noflip(0),
  },

  DateRangePicker_picker__portal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'fixed',
    top: 0,
    left: noflip(0),
    height: '100%',
    width: '100%',
  },

  DateRangePicker_picker__fullScreenPortal: {
    backgroundColor: color.background,
  },

  DateRangePicker_closeButton: {
    background: 'none',
    border: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    cursor: 'pointer',

    position: 'absolute',
    top: 0,
    right: noflip(0),
    padding: 15,
    zIndex: zIndex + 2,

    ':hover': {
      color: darken(color.core.grayLighter, 0.1),
      textDecoration: 'none',
    },

    ':focus': {
      color: darken(color.core.grayLighter, 0.1),
      textDecoration: 'none',
    },
  },

  DateRangePicker_closeButton_svg: {
    height: 15,
    width: 15,
    fill: color.core.grayLighter,
  },
}), { pureComponent: typeof React.PureComponent !== 'undefined' })(DateRangePicker);
