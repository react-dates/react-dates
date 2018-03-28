import React from 'react';
import moment from 'moment';
import { storiesOf, action } from '@storybook/react';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
import CustomizableCalendarDay, { defaultStyles, selectedStyles } from '../src/components/CustomizableCalendarDay';

import { VERTICAL_ORIENTATION } from '../src/constants';

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
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Prev
  </span>
);

const TestNextIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Next
  </span>
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
  .addWithInfo('default', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
    />
  ))
  .addWithInfo('with custom input', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      showInput
    />
  ))
  .addWithInfo('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <DayPickerSingleDateControllerWrapper
        onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
        monthFormat="YYYY[年]MMMM"
      />
    );
  })
  .addWithInfo('single month', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
    />
  ))
  .addWithInfo('3 months', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={3}
    />
  ))
  .addWithInfo('vertical', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('with custom month navigation', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      initialVisibleMonth={() => moment().add(10, 'months')}
    />
  ))
  .addWithInfo('allows all days, including past days', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isOutsideRange={() => false}
    />
  ))
  .addWithInfo('allows next two weeks only', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
    />
  ))
  .addWithInfo('with some blocked dates', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('with some highlighted dates', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('blocks fridays', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
    />
  ))
  .addWithInfo('with custom daily details', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      renderDayContents={day => day.format('ddd')}
    />
  ))
  .addWithInfo('with custom day styles', () => {
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
        renderCalendarDay={props => (
          <CustomizableCalendarDay
            {...props}
            {...customDayStyles}
          />
        )}
      />
    );
  })
  .addWithInfo('with info panel', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  ))
  .addWithInfo('with no animation', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      transitionDuration={0}
    />
  ));
