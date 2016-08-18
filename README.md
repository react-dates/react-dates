# react-dates

An accessible, easily internationalizable, mobile-friendly datepicker library for the web.

## Live Playground

For examples of the datepicker in action, go to http://airbnb.io/react-dates.

To run that demo on your own computer:

* `npm install`
* `npm run storybook`
* Visit http://localhost:9001/

## How to Use

Ensure packages are installed with correct version numbers by running:
  ```sh
  (
    export PKG=react-dates;
    npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g; s/ *//g' | xargs npm install --save-dev "$PKG"
  )
  ```

  Which produces and runs a command like:

  ```sh
  npm install --save-dev react-dates jquery@>=#.# moment@>=#.## react@>=#.## react-dom@>=#.## react-addons-shallow-compare@>=#.##
  ```

## API

We have a handful of different components and utilities available for all of your date picking needs!

### `DateRangePicker`
This fully-controlled component is designed to allow a user to select both a start date and an end date. It is best suited for a selecting a relatively short date range some time in the next year.

#### `Props`

**Dates:**
Moment objects representing the currently selected start and end dates. To indicate that a date has not yet been selected, these are set to `null`.
```
  startDate: momentPropTypes.momentObj
  endDate: momentPropTypes.momentObj
```

`onDatesChange` is the callback necessary to update the date state being held in the parent component and pass that back down to the `DateRangePicker` as props. `onDatesChange` receives an object of the form
`{ startDate: momentPropTypes.momentObj, endDate: momentPropTypes.momentObj }`
as an argument.
```
  onDatesChange: PropTypes.func
```

**Focus:**
The `focusedInput` prop indicates which of the two inputs is currently focused, if either. You can import the `START_DATE` and `END_DATE` constants from `react-dates/constants`.
```
  focusedInput: PropTypes.oneOf([START_DATE, END_DATE])
```

`onFocusChange` is the callback necessary to update the focus state being held in the parent component and pass that back down to the `DateRangePicker` as a prop. `onFocusChange` receives either `START_DATE`, `END_DATE`, or `null` as an argument.
```
  onFocusChange: PropTypes.func
```

**Date selection rules:**

The value of `minimumNights` indicates the minimum number of days between the start date and the end date.
```
  minimumNights: PropTypes.number
```

To indicate which days are blocked from selection, you may provide a function to the `isDayBlocked` prop. As of v1.0.0, we allow blocked dates inside of ranges.
```
  isDayBlocked: PropTypes.func
```

If you would like to allow the user to selected days in the past, you may set `allowPastDates` to true.
```
  allowPastDates: PropTypes.bool
```

**Calendar presentation:**

`numberOfMonths` indicates the number of visible months at a time.
```
  numberOfMonths: PropTypes.number
```

By default, we do not show days from the previous month and the next month in the same table as the currently visible month. However, sometimes, and especially if the `numberOfMonths` prop is set to 1, it might make sense to allow users to see these days as well. To do, you may set `enabledOutsideDays` to true. These days can still be styled by selecting on the `CalendarMonth__day--outside` class.
```
  enableOutsideDays: PropTypes.bool
```

**DayPicker presentation:**
The `orientation` prop indicates whether months are stacked on top of each other or displayed side-by-side. You can import the `HORIZONTAL_ORIENTATION` and `VERTICAL_ORIENTATION` constants from `react-dates/constants`.
```
  orientation: PropTypes.oneOf([HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION])
```

`withPortal` was designed for use on mobile devices. Namely, if this prop is set to true, the `DayPicker` will be rendered centrally on the screen, above the current plane, with a transparent black background behind it. Clicking on the background will hide the `DayPicker`. This option is currently only available for a `DateRangePicker` with a horizontal orientation.
```
  withPortal: PropTypes.bool
```

`withFullScreenPortal` is a full-screen takeover version of the `withPortal` prop. Similarly to `withPortal`, the `DayPicker` is rendered centrally on the screen, above the current plane. However, instead of a clickable transparent black background, the background is solid and white. To close the datepicker, the user must either select a date or click the close button located at the top right of the screen.
```
  withFullScreenPortal: PropTypes.bool
```

**Input presentation:**
The `startDateId` and `endDateId` props are assigned to the actual `<input>` DOM elements for accessibility reasons. They default to the values of the `START_DATE` and `END_DATE` constants.
```
  startDateId: PropTypes.string
  endDateId: PropTypes.string
```

The `startDatePlaceholderText` and `endDatePlaceholderText` props are the placeholders for the two inputs.
```
  startDatePlaceholderText: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
```

If the `showClearDates` prop is set to true, an `x` shows up in the input box that allows you to clear out both dates and reset the input.
```
  showClearDates: PropTypes.bool,
```

If the `disabled` prop is set to true, onFocusChange is not called when onStartDateFocus or onEndDateFocus are invoked and disabled is assigned to the actual `<input>` DOM elements.
```
  disabled: PropTypes.bool,
```

**Some useful callbacks:**
If you need to do something when the user navigates between months (for instance, check the availability of a listing), you can do so using the `onPrevMonthClick` and `onNextMonthClick` props.
```
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
```

**Internationalization:**
While we have reasonable defaults for english, we understand that that's not the only language in the world! :) At Airbnb, more than 50% of users visit our site in a language other than english. Thus, in addition to supporting moment locales, the `DateRangePicker` accepts a number of props to allow for this.

The `monthFormat` prop abides by [moment's date formatting rules](http://momentjs.com/docs/#/displaying/format/) and indicates the format in which to display dates at the top of each calendar. It defaults to `MMMM YYYY`.
```
  monthFormat: PropTypes.string,
```

The `phrases` prop is an object that contains all the English language phrases currently part of the class. As of now, we only have two such phrases and neither are visible but they are used for screen-reader navigation of the datepicker.
```
  phrases: PropTypes.shape({
    closeDatePicker: PropTypes.node,
    clearDates: PropTypes.node,
  }),
```

## Theming

react-dates comes with a set of SCSS variables that can be overridden to add your own project-specific theming. Override any variables found in `css/variables.scss` with your own and then import `~react-dates/css/styles.scss` (and `~react-dates/css/variables.scss` if you're only overriding a few). If you were using [sass-loader](https://github.com/jtangelder/sass-loader) with webpack, the code below would properly override the selected variables:
```sass
//overriding default sass variables with my project's colors
$react-dates-color-primary: $some-color-specific-to-my-project;
$react-dates-color-primary-dark: $some-other-color-specific-to-my-project;
@import '~react-dates/css/variables';
@import '~react-dates/css/styles.scss';
```
