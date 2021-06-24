import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import subMonths from 'date-fns/subMonths';
import isDayVisible from './isDayVisible';
import toISODateString from './toISODateString';
import toISOMonthString from './toISOMonthString';
import { VERTICAL_SCROLLABLE } from '../constants';
export function addModifier(updateddays, day, modifier, props, state) {
  var numberOfVisibleMonths = props.numberOfMonths,
      enableOutsideDays = props.enableOutsideDays,
      orientation = props.orientation;
  var firstVisibleMonth = state.currentMonth,
      visibleDays = state.visibleDays;
  var currentMonth = firstVisibleMonth;
  var numberOfMonths = numberOfVisibleMonths;

  if (orientation === VERTICAL_SCROLLABLE) {
    numberOfMonths = Object.keys(visibleDays).length;
  } else {
    currentMonth = subMonths(currentMonth, 1);
    numberOfMonths += 2;
  }

  if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
    return updateddays;
  }

  var iso = toISODateString(day);

  var updateddaysAfterAddition = _objectSpread({}, updateddays);

  if (enableOutsideDays) {
    var monthsToUpdate = Object.keys(visibleDays).filter(function (monthKey) {
      return Object.keys(visibleDays[monthKey]).indexOf(iso) > -1;
    });
    updateddaysAfterAddition = monthsToUpdate.reduce(function (acc, monthIso) {
      var month = updateddays[monthIso] || visibleDays[monthIso];

      if (!month[iso] || !month[iso].has(modifier)) {
        var modifiers = new Set(month[iso]);
        modifiers.add(modifier);
        acc[monthIso] = _objectSpread(_objectSpread({}, month), {}, _defineProperty({}, iso, modifiers));
      }

      return acc;
    }, updateddaysAfterAddition);
  } else {
    var monthIso = toISOMonthString(day);
    var month = updateddays[monthIso] || visibleDays[monthIso] || {};

    if (!month[iso] || !month[iso].has(modifier)) {
      var modifiers = new Set(month[iso]);
      modifiers.add(modifier);
      updateddaysAfterAddition[monthIso] = _objectSpread(_objectSpread({}, month), {}, _defineProperty({}, iso, modifiers));
    }
  }

  return updateddaysAfterAddition;
}
export function deleteModifier(updateddays, day, modifier, props, state) {
  var numberOfVisibleMonths = props.numberOfMonths,
      enableOutsideDays = props.enableOutsideDays,
      orientation = props.orientation;
  var firstVisibleMonth = state.currentMonth,
      visibleDays = state.visibleDays;
  var currentMonth = firstVisibleMonth;
  var numberOfMonths = numberOfVisibleMonths;

  if (orientation === VERTICAL_SCROLLABLE) {
    numberOfMonths = Object.keys(visibleDays).length;
  } else {
    currentMonth = subMonths(currentMonth, 1);
    numberOfMonths += 2;
  }

  if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
    return updateddays;
  }

  var iso = toISODateString(day);

  var updateddaysAfterDeletion = _objectSpread({}, updateddays);

  if (enableOutsideDays) {
    var monthsToUpdate = Object.keys(visibleDays).filter(function (monthKey) {
      return Object.keys(visibleDays[monthKey]).indexOf(iso) > -1;
    });
    updateddaysAfterDeletion = monthsToUpdate.reduce(function (acc, monthIso) {
      var month = updateddays[monthIso] || visibleDays[monthIso];

      if (month[iso] && month[iso].has(modifier)) {
        var modifiers = new Set(month[iso]);
        modifiers["delete"](modifier);
        acc[monthIso] = _objectSpread(_objectSpread({}, month), {}, _defineProperty({}, iso, modifiers));
      }

      return acc;
    }, updateddaysAfterDeletion);
  } else {
    var monthIso = toISOMonthString(day);
    var month = updateddays[monthIso] || visibleDays[monthIso] || {};

    if (month[iso] && month[iso].has(modifier)) {
      var modifiers = new Set(month[iso]);
      modifiers["delete"](modifier);
      updateddaysAfterDeletion[monthIso] = _objectSpread(_objectSpread({}, month), {}, _defineProperty({}, iso, modifiers));
    }
  }

  return updateddaysAfterDeletion;
}