import isDayVisible from './isDayVisible';
import toISODateString from './toISODateString';
import toISOMonthString from './toISOMonthString';
import getPreviousMonthMemoLast from './getPreviousMonthMemoLast';

import { VERTICAL_SCROLLABLE } from '../constants';

export function addModifier(updatedDays, day, modifier, props, state) {
  const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = props;
  const { currentMonth: firstVisibleMonth, visibleDays } = state;

  let currentMonth = firstVisibleMonth;
  let numberOfMonths = numberOfVisibleMonths;
  if (orientation === VERTICAL_SCROLLABLE) {
    numberOfMonths = Object.keys(visibleDays).length;
  } else {
    currentMonth = getPreviousMonthMemoLast(currentMonth);
    numberOfMonths += 2;
  }
  if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
    return updatedDays;
  }

  const iso = toISODateString(day);

  let updatedDaysAfterAddition = { ...updatedDays };
  if (enableOutsideDays) {
    const monthsToUpdate = Object.keys(visibleDays).filter((monthKey) => (
      Object.keys(visibleDays[monthKey]).indexOf(iso) > -1
    ));

    updatedDaysAfterAddition = monthsToUpdate.reduce((acc, monthIso) => {
      const month = updatedDays[monthIso] || visibleDays[monthIso];

      if (!month[iso] || !month[iso].has(modifier)) {
        const modifiers = new Set(month[iso]);
        modifiers.add(modifier);
        acc[monthIso] = {
          ...month,
          [iso]: modifiers,
        };
      }

      return acc;
    }, updatedDaysAfterAddition);
  } else {
    const monthIso = toISOMonthString(day);
    const month = updatedDays[monthIso] || visibleDays[monthIso] || {};

    if (!month[iso] || !month[iso].has(modifier)) {
      const modifiers = new Set(month[iso]);
      modifiers.add(modifier);
      updatedDaysAfterAddition[monthIso] = {
        ...month,
        [iso]: modifiers,
      };
    }
  }

  return updatedDaysAfterAddition;
}

export function deleteModifier(updatedDays, day, modifier, props, state) {
  const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = props;
  const { currentMonth: firstVisibleMonth, visibleDays } = state;

  let currentMonth = firstVisibleMonth;
  let numberOfMonths = numberOfVisibleMonths;
  if (orientation === VERTICAL_SCROLLABLE) {
    numberOfMonths = Object.keys(visibleDays).length;
  } else {
    currentMonth = getPreviousMonthMemoLast(currentMonth);
    numberOfMonths += 2;
  }
  if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
    return updatedDays;
  }

  const iso = toISODateString(day);

  let updatedDaysAfterDeletion = { ...updatedDays };
  if (enableOutsideDays) {
    const monthsToUpdate = Object.keys(visibleDays).filter((monthKey) => (
      Object.keys(visibleDays[monthKey]).indexOf(iso) > -1
    ));

    updatedDaysAfterDeletion = monthsToUpdate.reduce((acc, monthIso) => {
      const month = updatedDays[monthIso] || visibleDays[monthIso];

      if (month[iso] && month[iso].has(modifier)) {
        const modifiers = new Set(month[iso]);
        modifiers.delete(modifier);
        acc[monthIso] = {
          ...month,
          [iso]: modifiers,
        };
      }

      return acc;
    }, updatedDaysAfterDeletion);
  } else {
    const monthIso = toISOMonthString(day);
    const month = updatedDays[monthIso] || visibleDays[monthIso] || {};

    if (month[iso] && month[iso].has(modifier)) {
      const modifiers = new Set(month[iso]);
      modifiers.delete(modifier);
      updatedDaysAfterDeletion[monthIso] = {
        ...month,
        [iso]: modifiers,
      };
    }
  }

  return updatedDaysAfterDeletion;
}
