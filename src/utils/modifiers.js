import subMonths from 'date-fns/subMonths';
import isDayVisible from './isDayVisible';
import toISODateString from './toISODateString';
import toISOMonthString from './toISOMonthString';

import { VERTICAL_SCROLLABLE } from '../constants';

export function addModifier(updateddays, day, modifier, props, state) {
  const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = props;
  const { currentMonth: firstVisibleMonth, visibleDays } = state;

  let currentMonth = firstVisibleMonth;
  let numberOfMonths = numberOfVisibleMonths;
  if (orientation === VERTICAL_SCROLLABLE) {
    numberOfMonths = Object.keys(visibleDays).length;
  } else {
    currentMonth = subMonths(currentMonth, 1);
    numberOfMonths += 2;
  }
  if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
    return updateddays;
  }

  const iso = toISODateString(day);

  let updateddaysAfterAddition = { ...updateddays };
  if (enableOutsideDays) {
    const monthsToUpdate = Object.keys(visibleDays).filter((monthKey) => (
      Object.keys(visibleDays[monthKey]).indexOf(iso) > -1
    ));

    updateddaysAfterAddition = monthsToUpdate.reduce((acc, monthIso) => {
      const month = updateddays[monthIso] || visibleDays[monthIso];
      if (!month[iso] || !month[iso].has(modifier)) {
        const modifiers = new Set(month[iso]);
        modifiers.add(modifier);
        acc[monthIso] = {
          ...month,
          [iso]: modifiers,
        };
      }

      return acc;
    }, updateddaysAfterAddition);
  } else {
    const monthIso = toISOMonthString(day);
    const month = updateddays[monthIso] || visibleDays[monthIso] || {};

    if (!month[iso] || !month[iso].has(modifier)) {
      const modifiers = new Set(month[iso]);
      modifiers.add(modifier);
      updateddaysAfterAddition[monthIso] = {
        ...month,
        [iso]: modifiers,
      };
    }
  }

  return updateddaysAfterAddition;
}

export function deleteModifier(updateddays, day, modifier, props, state) {
  const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = props;
  const { currentMonth: firstVisibleMonth, visibleDays } = state;
  let currentMonth = firstVisibleMonth;
  let numberOfMonths = numberOfVisibleMonths;
  if (orientation === VERTICAL_SCROLLABLE) {
    numberOfMonths = Object.keys(visibleDays).length;
  } else {
    currentMonth = subMonths(currentMonth, 1);
    numberOfMonths += 2;
  }
  if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
    return updateddays;
  }

  const iso = toISODateString(day);

  let updateddaysAfterDeletion = { ...updateddays };
  if (enableOutsideDays) {
    const monthsToUpdate = Object.keys(visibleDays).filter((monthKey) => (
      Object.keys(visibleDays[monthKey]).indexOf(iso) > -1
    ));

    updateddaysAfterDeletion = monthsToUpdate.reduce((acc, monthIso) => {
      const month = updateddays[monthIso] || visibleDays[monthIso];
      if (month[iso] && month[iso].has(modifier)) {
        const modifiers = new Set(month[iso]);
        modifiers.delete(modifier);
        acc[monthIso] = {
          ...month,
          [iso]: modifiers,
        };
      }
      return acc;
    }, updateddaysAfterDeletion);
  } else {
    const monthIso = toISOMonthString(day);
    const month = updateddays[monthIso] || visibleDays[monthIso] || {};

    if (month[iso] && month[iso].has(modifier)) {
      const modifiers = new Set(month[iso]);
      modifiers.delete(modifier);
      updateddaysAfterDeletion[monthIso] = {
        ...month,
        [iso]: modifiers,
      };
    }
  }

  return updateddaysAfterDeletion;
}
