import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DayPicker from '../src/components/DayPicker';

import { VERTICAL_ORIENTATION } from '../constants';

storiesOf('DayPicker', module)
  .add('default', () => (
    <DayPicker />
  ))
  .add('more than one month', () => (
    <DayPicker numberOfMonths={2} />
  ))
  .add('vertical', () => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .add('with custom arrows', () => (
    <DayPicker
      navPrev={<span>Prev</span>}
      navNext={<span>Next</span>}
    />
  ))
  .add('with non-default custom arrows', () => (
    <DayPicker
      navPrev={<span>Prev</span>}
      navNext={<span>Next</span>}
      useNavDefaultStyles={false}
    />
  ))
  .add('vertical with fixed-width container', () => (
    <div style={{ width: '400px' }}>
      <DayPicker
        numberOfMonths={2}
        orientation={VERTICAL_ORIENTATION}
      />
    </div>
  ));
