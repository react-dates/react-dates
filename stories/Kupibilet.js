import React from 'react';
import moment from 'moment'
import { storiesOf } from '@storybook/react';
import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

import {
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../constants';

class DynamicPlaceholerWrapper extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      hoveredDate: null
    }

    this.onDayHover = (day) => {
      this.setState({
        hoveredDate: day
      })
    }
  }

  render() {
    const { hoveredDate } = this.state

    return (
      <DateRangePickerWrapper
        startDatePlaceholderText={ hoveredDate ? hoveredDate.format('l') : 'Placeholder' }
        onDayHover={ this.onDayHover }
      />
    )
  }
}

storiesOf('Kupibilet', module)
  .addWithInfo('with custom input text', () => (
    <DateRangePickerWrapper
      renderInputText={(day) => (
        <div>
          {day && day.format('DD/MM')}
          &nbsp;
          <span>
            {day && day.format('ddd')}
          </span>
        </div>
      )}
    />
  ))
  .addWithInfo('onDayHover', () => (
    <DynamicPlaceholerWrapper />
  ))
  .addWithInfo('blocked month navigation', () => (
    <DateRangePickerWrapper
      isOutsideRange={ day => {
        if(day.isBefore(moment())) {
          return true
        }
        if(day.isSameOrAfter(moment().startOf('month').add(3, 'months'))) {
          return true
        }
        return false
      }}
    />
  ));
