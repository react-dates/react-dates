# Change Log

## v2.2.0
 - [fix] Fix height issue where an extra table row was being rendered for some months ([#57](https://github.com/airbnb/react-dates/pull/57))
 - [fix] Disables user-select on navigation ([#74](https://github.com/airbnb/react-dates/pull/74))
 - [new] Allows for a custom date display format ([#52](https://github.com/airbnb/react-dates/pull/52))

## v2.1.1
 - [fix] Fix initial day of month to utc to fix daylight savings time problem in Brazil and other locales
 - [fix] Remove jQuery as a dependency
 - [fix] Add centered text alignment to `DayPicker__caption` class to work with bootstrap styles

## v2.1.0
 - [new] Export date comparision methods - `isNextDay`, `isSameDay`, `isInclusivelyAfterDay`, `isInclusivelyBeforeDay`
 - [fix] Replace `Array.includes` with `array-includes` for compatibility with IE11

## v2.0.0
 - [new] Set scss variables to `!default` for easing overriding
 - [breaking] Rename scss variables to be more generic and namespace them with the `$react-dates-` prefix
 - [new] Add `disabled` functionality to the `<SingleDatePicker />` and `<DateRangePicker />`
 - [breaking] Consolidate `blockedDates`, `blockedByDefault`, and `unblockedDates` into a single function prop `isDayBlocked`
 - [breaking] Remove prop `allowPastDates` in favor of `isOutsideRange` prop

## v1.0.0
 - Initial commit
