import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import openDirectionShape from '../shapes/OpenDirectionShape';

import { SingleDatePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import SingleDatePickerInput from './SingleDatePickerInput';

import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';

import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import {
  ICON_BEFORE_POSITION,
  OPEN_DOWN,
} from '../constants';

const propTypes = forbidExtraProps({
  children: PropTypes.node,

  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func.isRequired,

  focused: PropTypes.bool,
  onFocusChange: PropTypes.func.isRequired,

  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  autoComplete: PropTypes.string,
  titleText: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  showClearDate: PropTypes.bool,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  disabled: DisabledShape,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDate: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  onClose: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  customInputIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,

  // accessibility
  isFocused: PropTypes.bool,

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerInputPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  children: null,

  date: null,
  focused: false,

  placeholder: '',
  ariaLabel: undefined,
  autoComplete: 'off',
  titleText: undefined,
  screenReaderMessage: 'Date',
  showClearDate: false,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isOutsideRange: (day) => !isInclusivelyAfterDay(day, moment()),
  isDayBlocked: () => false,
  displayFormat: () => moment.localeData().longDateFormat('L'),

  onClose() {},
  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  customInputIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: SingleDatePickerInputPhrases,

  isRTL: false,
};

const SingleDatePickerInputController = memo((props) => {
  const {
    children,
    id,
    placeholder,
    ariaLabel,
    autoComplete,
    titleText,
    disabled,
    focused,
    isFocused,
    required,
    readOnly,
    openDirection,
    showClearDate,
    showCaret,
    showDefaultInputIcon,
    inputIconPosition,
    customCloseIcon,
    customInputIcon,
    date,
    phrases,
    onKeyDownArrowDown,
    onKeyDownQuestionMark,
    screenReaderMessage,
    isRTL,
    noBorder,
    block,
    small,
    regular,
    verticalSpacing,
  } = props;

  const getDisplayFormat = () => {
    const { displayFormat } = props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  const getDateString = (date) => {
    const displayFormat = getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date);
  }

  const clearDate = () => {
    const { onDateChange, reopenPickerOnClearDate, onFocusChange } = props;
    onDateChange(null);
    if (reopenPickerOnClearDate) {
      onFocusChange({ focused: true });
    }
  }

  const handleChange = (dateString) => {
    const {
      isOutsideRange,
      isDayBlocked,
      keepOpenOnDateSelect,
      onDateChange,
      onFocusChange,
      onClose,
    } = props;
    const newDate = toMomentObject(dateString, getDisplayFormat());

    const isValid = newDate && !isOutsideRange(newDate) && !isDayBlocked(newDate);
    if (isValid) {
      onDateChange(newDate);
      if (!keepOpenOnDateSelect) {
        onFocusChange({ focused: false });
        onClose({ date: newDate });
      }
    } else {
      onDateChange(null);
    }
  }

  const handleFocus = () => {
    const {
      onFocusChange,
      disabled,
    } = props;

    if (!disabled) {
      onFocusChange({ focused: true });
    }
  }

  const handleClearFocus = () => {
    const {
      focused,
      onFocusChange,
      onClose,
      date,
    } = props;
    if (!focused) return;

    onFocusChange({ focused: false });
    onClose({ date });
  }    

  const displayValue = getDateString(date);

  return (
    <SingleDatePickerInput
      id={id}
      placeholder={placeholder}
      ariaLabel={ariaLabel}
      autoComplete={autoComplete}
      titleText={titleText}
      focused={focused}
      isFocused={isFocused}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      openDirection={openDirection}
      showCaret={showCaret}
      onClearDate={clearDate}
      showClearDate={showClearDate}
      showDefaultInputIcon={showDefaultInputIcon}
      inputIconPosition={inputIconPosition}
      customCloseIcon={customCloseIcon}
      customInputIcon={customInputIcon}
      displayValue={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDownShiftTab={handleClearFocus}
      onKeyDownArrowDown={onKeyDownArrowDown}
      onKeyDownQuestionMark={onKeyDownQuestionMark}
      screenReaderMessage={screenReaderMessage}
      phrases={phrases}
      isRTL={isRTL}
      noBorder={noBorder}
      block={block}
      small={small}
      regular={regular}
      verticalSpacing={verticalSpacing}
    >
      {children}
    </SingleDatePickerInput>
  );
});

SingleDatePickerInputController.propTypes = propTypes;
SingleDatePickerInputController.defaultProps = defaultProps;

export default SingleDatePickerInputController;
