# Change Log

## v3.6.0
 - [new] Add `navPrev`/`navNext` props for custom month navigation ([#161](https://github.com/airbnb/react-dates/pull/161))
 - [fix] Add missing right border on caret ([#160](https://github.com/airbnb/react-dates/pull/160))
 - [fix] Adjust `DayPicker` height when `initialVisibleMonth` height is different from the current month's ([#159](https://github.com/airbnb/react-dates/pull/159))
 - [new] Add `keepOpenOnDateSelect` prop to the `DateRangePicker` and `SingleDatePicker` ([#157](https://github.com/airbnb/react-dates/pull/157))

## v3.5.0
 - [new] Add support for clear date button on the `SingleDatePicker` ([#155](https://github.com/airbnb/react-dates/pull/155))
 - [fix] Fix focus behavior for vertically attached datepickers ([#121](https://github.com/airbnb/react-dates/pull/121))

## v3.4.0
 - [new] Add support for `required` attribute on inputs ([#142](https://github.com/airbnb/react-dates/pull/142))

## v3.3.4
 - [fix] Fix same tether overlay issue for the `SingleDatePicker` component ([#133](https://github.com/airbnb/react-dates/pull/133))

## v3.3.3
 - [fix] Allow for elements to be interacted with when rendered beneath the tether component ([#131](https://github.com/airbnb/react-dates/pull/131))

## v3.3.2
 - [fix] Responsive the `DateRangePicker` and `SingleDatePicker` components ([#80](https://github.com/airbnb/react-dates/pull/83))

## v3.3.1
 - [fix] Update all days to use noon as their time stamp to fix a number of DST issues ([#114](https://github.com/airbnb/react-dates/pull/114))

## v3.3.0
 - [new] Add `anchorDirection` prop to the SingleDatePicker and DateRangePicker components ([#72](https://github.com/airbnb/react-dates/pull/72))

## v3.2.0
 - [new] Add `initialVisibleMonth` prop to the SingleDatePicker, DateRangePicker, and DayPicker components ([#70](https://github.com/airbnb/react-dates/pull/70))

## v3.1.1
 - [fix] Fix moment dependencies to allow v2.10 - v2.14

## v3.1.0
 - [new] Allow `displayFormat` prop to take a function as well as a string ([#98](https://github.com/airbnb/react-dates/pull/98))
 - [fix] Default value for `displayFormat` now actually returns moment's `L` format based on the locale ([#98](https://github.com/airbnb/react-dates/pull/98)))

## v3.0.0
 - [breaking] Move the constants file to the top-level ([#53](https://github.com/airbnb/react-dates/pull/53))
 - [breaking] Add `reopenPickerOnClearDates` prop so that the DateRangePicker no longer automatically reopens when clearing dates ([#75](https://github.com/airbnb/react-dates/pull/75))

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
