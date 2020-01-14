import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
import CustomizableCalendarDay, { defaultStyles, selectedStyles } from '../src/components/CustomizableCalendarDay';

import { NAV_POSITION_BOTTOM, VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE } from '../src/constants';

import DayPickerSingleDateControllerWrapper from '../examples/DayPickerSingleDateControllerWrapper';

const dayPickerSingleDateControllerInfo = `The ${monospace('DayPickerSingleDateController')} component is a
  fully controlled version of the ${monospace('DayPicker')} that has built-in rules for selecting a
  single date. Unlike the ${monospace('DayPicker')}, which requires the consumer to explicitly define
  ${monospace('onDayMouseEnter')}, ${monospace('onDayMouseLeave')}, and ${monospace('onDayClick')}
  handlers, the consumer needs simply to maintain the ${monospace('focused')} and
  ${monospace('date')} values in state and then pass these down as props along with
  ${monospace('onFocusChange')} and ${monospace('onDateChange')} callbacks that
  update them appropriately. You can see an example of this implementation <a href=
  "https://github.com/airbnb/react-dates/blob/master/examples/DayPickerSingleDateControllerWrapper.jsx">
  here</a>. <br/><br/>
  Note that the ${monospace('focused')} prop may be ${monospace('false')}, but if this is the
  case, dates are not selectable. As a result, in the example wrapper, we always force
  ${monospace('focused')} to be true in the ${monospace('onFocusChange')} method. <br/><br/>
  The ${monospace('DayPickerSingleDateController')} is particularly useful if you are interested in the
  ${monospace('SingleDatePicker')} functionality and calendar presentation, but would like to
  implement your own input.`;

const TestPrevIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      left: '22px',
      padding: '3px',
      position: 'absolute',
      top: '20px',
    }}
    tabIndex="0"
  >
    Prev
  </div>
);

const TestNextIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
      position: 'absolute',
      right: '22px',
      top: '20px',
    }}
    tabIndex="0"
  >
    Next
  </div>
);

const TestCustomInfoPanel = () => (
  <div
    style={{
      padding: '10px 21px',
      borderTop: '1px solid #dce0e0',
      color: '#484848',
    }}
  >
    &#x2755; Some useful info here
  </div>
);

function renderNavPrevButton(buttonProps) {
  const {
    ariaLabel,
    disabled,
    onClick,
    onKeyUp,
    onMouseUp,
  } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{ position: 'absolute', top: 23, left: 22 }}
      type="button"
    >
    &lsaquo; Prev
    </button>
  );
}

function renderNavNextButton(buttonProps) {
  const {
    ariaLabel,
    disabled,
    onClick,
    onKeyUp,
    onMouseUp,
  } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{ position: 'absolute', top: 23, right: 22 }}
      type="button"
    >
          Next &rsaquo;
    </button>
  );
}

const datesList = [
  moment(),
  moment().add(1, 'days'),
  moment().add(3, 'days'),
  moment().add(9, 'days'),
  moment().add(10, 'days'),
  moment().add(11, 'days'),
  moment().add(12, 'days'),
  moment().add(13, 'days'),
];

storiesOf('DayPickerSingleDateController', module)
  .addDecorator(InfoPanelDecorator(dayPickerSingleDateControllerInfo))
  .add('default', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
    />
  )))
  .add('with custom input', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      showInput
    />
  )))
  .add('non-english locale', withInfo()(() => {
    moment.locale('zh-cn');
    return (
      <DayPickerSingleDateControllerWrapper
        onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
        monthFormat="YYYY[年]MMMM"
      />
    );
  }))
  .add('single month', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
    />
  )))
  .add('single month, custom caption', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
      renderMonthElement={({ month, onMonthSelect, onYearSelect }) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <select
              value={month.month()}
              onChange={(e) => { onMonthSelect(month, e.target.value); }}
            >
              {moment.months().map((label, value) => (
                <option value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={month.year()}
              onChange={(e) => { onYearSelect(month, e.target.value); }}
            >
              <option value={moment().year() - 1}>Last year</option>
              <option value={moment().year()}>{moment().year()}</option>
              <option value={moment().year() + 1}>Next year</option>
            </select>
          </div>
        </div>
      )}
    />
  )))
  .add('3 months', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={3}
    />
  )))
  .add('vertical', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      orientation={VERTICAL_ORIENTATION}
    />
  )))
  .add('verticalScrollable', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      numberOfMonths={3}
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      orientation={VERTICAL_SCROLLABLE}
    />
  )))
  .add('with custom month navigation icons', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  )))
  .add('with custom month navigation buttons', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      renderNavPrevButton={renderNavPrevButton}
      renderNavNextButton={renderNavNextButton}
    />
  )))
  .add('with month navigation positioned at the bottom', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      navPosition={NAV_POSITION_BOTTOM}
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
    />
  )))
  .add('with outside days enabled', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
      enableOutsideDays
    />
  )))
  .add('with month specified on open', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      initialVisibleMonth={() => moment().add(10, 'months')}
    />
  )))
  .add('allows all days, including past days', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isOutsideRange={() => false}
    />
  )))
  .add('allows next two weeks only', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())
        || isInclusivelyAfterDay(day, moment().add(2, 'weeks'))}
    />
  )))
  .add('with some blocked dates', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayBlocked={(day1) => datesList.some((day2) => isSameDay(day1, day2))}
    />
  )))
  .add('with some highlighted dates', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayHighlighted={(day1) => datesList.some((day2) => isSameDay(day1, day2))}
    />
  )))
  .add('blocks fridays', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayBlocked={(day) => moment.weekdays(day.weekday()) === 'Friday'}
    />
  )))
  .add('with custom daily details', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      renderDayContents={(day) => day.format('ddd')}
    />
  )))
  .add('with custom day styles', withInfo()(() => {
    const customDayStyles = {
      // extend and update styles with es6 spread operators
      defaultStyles: {
        ...defaultStyles,
        color: 'blue',
        hover: {
          ...defaultStyles.hover,
          color: 'blue',
        },
      },
    };
    return (
      <DayPickerSingleDateControllerWrapper
        onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
        renderCalendarDay={(props) => (
          <CustomizableCalendarDay
            {...props}
            {...customDayStyles}
          />
        )}
      />
    );
  }))
  .add('with info panel', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  )))
  .add('with no animation', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      transitionDuration={0}
    />
  )))
  .add('with vertical spacing applied', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      verticalBorderSpacing={16}
    />
  )))
  .add('with no nav buttons', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      noNavButtons
    />
  )))
  .add('with no nav prev button', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      noNavPrevButton
    />
  )))
  .add('with no nav next button', withInfo()(() => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      noNavNextButton
    />
  )));
