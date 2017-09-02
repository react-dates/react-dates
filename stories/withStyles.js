import React from 'react';
import { storiesOf } from '@storybook/react';

import CalendarDay from '../src/components/CalendarDay';
import CalendarMonth from '../src/components/CalendarMonth';

storiesOf('withStyles', module)
  .addWithInfo('CalendarDay', () => (
    <table>
      <tr>
        <CalendarDay />
        <CalendarDay isOutsideDay modifiers={new Set(['highlighted'])} />
        <CalendarDay modifiers={new Set(['highlighted'])} />
        <CalendarDay modifiers={new Set(['minimum-nights'])} />
        <CalendarDay modifiers={new Set(['selected-span'])} />
        <CalendarDay modifiers={new Set(['selected'])} />
        <CalendarDay modifiers={new Set(['selected-start'])} />
        <CalendarDay modifiers={new Set(['selected-end'])} />
        <CalendarDay modifiers={new Set(['hovered-span'])} />
        <CalendarDay modifiers={new Set(['after-hovered-start'])} />
        <CalendarDay modifiers={new Set(['blocked-calendar'])} />
        <CalendarDay modifiers={new Set(['blocked-out-of-range'])} />
      </tr>
    </table>
  ))
  .addWithInfo('CalendarMonth', () => (
    <CalendarMonth
      isVisible
    />
  ));
