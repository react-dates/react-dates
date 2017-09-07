# react-dates <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

> An easily internationalizable, mobile-friendly datepicker library for the web.

![react-dates in action](https://raw.githubusercontent.com/airbnb/react-dates/master/react-dates-demo.gif)

## Live Playground

For examples of the datepicker in action, go to http://airbnb.io/react-dates.

OR

To run that demo on your own computer:
* Clone this repository
* `npm install`
* `npm run storybook`
* Visit http://localhost:6006/

## Getting Started
### Install dependencies
Ensure packages are installed with correct version numbers by running:
  ```sh
  (
    export PKG=react-dates;
    npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g; s/ *//g' | xargs npm install --save "$PKG"
  )
  ```

  Which produces and runs a command like:

  ```sh
  npm install --save react-dates moment@>=#.## react@>=#.## react-dom@>=#.## react-addons-shallow-compare@>=#.##
  ```

### Include component
```js
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
```

### Include CSS
#### Webpack
Using Webpack with CSS loader, add the following import to your app:
```js
import 'react-dates/lib/css/_datepicker.css';
```

#### Without Webpack:
Create a CSS file with the contents of `require.resolve('react-dates/lib/css/_datepicker.css')` and include it in your html `<head>` section.

### Make some awesome datepickers

We provide a handful of components for your use. If you supply essential props to each component, you'll get a full featured interactive date picker. With additional optional props, you can customize the look and feel of the inputs, calendar, etc. You can see what each of the props do in the [live demo](http://airbnb.io/react-dates/) or explore
how to properly wrap the pickers in the [examples folder](https://github.com/airbnb/react-dates/tree/master/examples).

#### DateRangePicker
The `DateRangePicker` is a fully controlled component that allows users to select a date range. You can control the selected
dates using the `startDate`, `endDate`, and `onDatesChange` props as shown below. The `DateRangePicker` also manages internal
state for partial dates entered by typing (although `onDatesChange` will not trigger until a date has been entered
completely in that case). Similarly, you can control which input is focused as well as calendar visibility (the calendar is
only visible if `focusedInput` is defined) with the `focusedInput` and `onFocusChange` props as shown below.

Here is the minimum *REQUIRED* setup you need to get the `DateRangePicker` working:
```jsx
<DateRangePicker
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
/>
```

The following is a list of other *OPTIONAL* props you may provide to the `DateRangePicker` to customize appearance and behavior to your heart's desire. Again, please explore the [storybook](http://airbnb.io/react-dates/?selectedKind=DRP%20-%20Input%20Props&selectedStory=default&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel) for more information on what each of these props do.
```js
// input related props
startDateId: PropTypes.string.isRequired,
startDatePlaceholderText: PropTypes.string,
endDateId: PropTypes.string.isRequired,
endDatePlaceholderText: PropTypes.string,
disabled: PropTypes.bool,
required: PropTypes.bool,
readOnly: PropTypes.bool,
screenReaderInputMessage: PropTypes.string,
showClearDates: PropTypes.bool,
showDefaultInputIcon: PropTypes.bool,
customInputIcon: PropTypes.node,
customArrowIcon: PropTypes.node,
customCloseIcon: PropTypes.node,

// calendar presentation and interaction related props
renderMonth: PropTypes.func,
orientation: OrientationShape,
anchorDirection: anchorDirectionShape,
horizontalMargin: PropTypes.number,
withPortal: PropTypes.bool,
withFullScreenPortal: PropTypes.bool,
daySize: nonNegativeInteger,
isRTL: PropTypes.bool,
initialVisibleMonth: PropTypes.func,
firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
numberOfMonths: PropTypes.number,
keepOpenOnDateSelect: PropTypes.bool,
reopenPickerOnClearDates: PropTypes.bool,
renderCalendarInfo: PropTypes.func,
hideKeyboardShortcutsPanel: PropTypes.bool,

// navigation related props
navPrev: PropTypes.node,
navNext: PropTypes.node,
onPrevMonthClick: PropTypes.func,
onNextMonthClick: PropTypes.func,
onClose: PropTypes.func,

// day presentation and interaction related props
renderDay: PropTypes.func,
minimumNights: PropTypes.number,
enableOutsideDays: PropTypes.bool,
isDayBlocked: PropTypes.func,
isOutsideRange: PropTypes.func,
isDayHighlighted: PropTypes.func,

// internationalization props
displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
monthFormat: PropTypes.string,
weekDayFormat: PropTypes.string,
phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerPhrases)),
```

#### SingleDatePicker
The `SingleDatePicker` is a fully controlled component that allows users to select a single date. You can control the selected
date using the `date` and `onDateChange` props as shown below. The `SingleDatePicker` also manages internal
state for partial dates entered by typing (although `onDateChange` will not trigger until a date has been entered
completely in that case). Similarly, you can control whether or not the input is focused (calendar visibility is also
controlled with the same props) with the `focused` and `onFocusChange` props as shown below.

Here is the minimum *REQUIRED* setup you need to get the `SingleDatePicker` working:
```jsx
<SingleDatePicker
  date={this.state.date} // momentPropTypes.momentObj or null
  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
  focused={this.state.focused} // PropTypes.bool
  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
/>
```

The following is a list of other *OPTIONAL* props you may provide to the `SingleDatePicker` to customize appearance and behavior to your heart's desire. Again, please explore the [storybook](http://airbnb.io/react-dates/?selectedKind=SDP%20-%20Input%20Props&selectedStory=default&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel) for more information on what each of these props do.
```js
// input related props
id: PropTypes.string.isRequired,
placeholder: PropTypes.string,
disabled: PropTypes.bool,
required: PropTypes.bool,
readOnly: PropTypes.bool,
screenReaderInputMessage: PropTypes.string,
showClearDate: PropTypes.bool,
customCloseIcon: PropTypes.node,
showDefaultInputIcon: PropTypes.bool,
customInputIcon: PropTypes.node,

// calendar presentation and interaction related props
renderMonth: PropTypes.func,
orientation: OrientationShape,
anchorDirection: anchorDirectionShape,
horizontalMargin: PropTypes.number,
withPortal: PropTypes.bool,
withFullScreenPortal: PropTypes.bool,
initialVisibleMonth: PropTypes.func,
firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
numberOfMonths: PropTypes.number,
keepOpenOnDateSelect: PropTypes.bool,
reopenPickerOnClearDate: PropTypes.bool,
renderCalendarInfo: PropTypes.func,
hideKeyboardShortcutsPanel: PropTypes.bool,
daySize: nonNegativeInteger,
isRTL: PropTypes.bool,

// navigation related props
navPrev: PropTypes.node,
navNext: PropTypes.node,
onPrevMonthClick: PropTypes.func,
onNextMonthClick: PropTypes.func,
onClose: PropTypes.func,

// day presentation and interaction related props
renderDay: PropTypes.func,
enableOutsideDays: PropTypes.bool,
isDayBlocked: PropTypes.func,
isOutsideRange: PropTypes.func,
isDayHighlighted: PropTypes.func,

// internationalization props
displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
monthFormat: PropTypes.string,
weekDayFormat: PropTypes.string,
phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerPhrases)),
```

#### DayPickerRangeController
The `DayPickerRangeController` is a calendar-only version of the `DateRangePicker`. There are no inputs (which also means
that currently, it is not keyboard accessible) and the calendar is always visible, but you can select a date range much in the same way you would with the `DateRangePicker`. You can control the selected
dates using the `startDate`, `endDate`, and `onDatesChange` props as shown below. Similarly, you can control which input is focused with the `focusedInput` and `onFocusChange` props as shown below. The user will only be able to select a date if `focusedInput` is provided.

Here is the minimum *REQUIRED* setup you need to get the `DayPickerRangeController` working:
```jsx
<DayPickerRangeController
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
/>
```

The following is a list of other *OPTIONAL* props you may provide to the `DayPickerRangeController` to customize appearance and behavior to your heart's desire. Again, please explore the [storybook](http://airbnb.io/react-dates/?selectedKind=DayPickerRangeController&selectedStory=default&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel) for more information on what each of these props do.
```js
  // calendar presentation and interaction related props
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  onOutsideClick: PropTypes.func,
  keepOpenOnDateSelect: PropTypes.bool,

  // navigation related props
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // day presentation and interaction related props
  renderDay: PropTypes.func,
  minimumNights: PropTypes.number,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // internationalization props
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
/>
```

## Localization

[Moment.js](http://momentjs.com) is a peer dependency of `react-dates`, so `react-dates` will use a single instance of `moment` which is imported in the user's project. To load a locale it is enough to invoke `moment.locale` in the component where `moment` is imported, with the [locale key](http://momentjs.com/docs/#/i18n/) of choice, e.g.:
```
moment.locale('pl'); // Polish
```

## Theming

react-dates comes with a set of SCSS variables that can be overridden to add your own project-specific theming. Override any variables found in `css/variables.scss` with your own and then import `~react-dates/css/styles.scss` (and `~react-dates/css/variables.scss` if you're only overriding a few). If you were using [sass-loader](https://github.com/jtangelder/sass-loader) with webpack, the code below would properly override the selected variables:
```scss
//overriding default sass variables with my project's colors
$react-dates-color-primary: $some-color-specific-to-my-project;
$react-dates-color-secondary: $some-other-color-specific-to-my-project;
@import '~react-dates/css/variables.scss';
@import '~react-dates/css/styles.scss';
```

[package-url]: https://npmjs.org/package/react-dates
[npm-version-svg]: http://versionbadg.es/airbnb/react-dates.svg
[travis-svg]: https://travis-ci.org/airbnb/react-dates.svg
[travis-url]: https://travis-ci.org/airbnb/react-dates
[deps-svg]: https://david-dm.org/airbnb/react-dates.svg
[deps-url]: https://david-dm.org/airbnb/react-dates
[dev-deps-svg]: https://david-dm.org/airbnb/react-dates/dev-status.svg
[dev-deps-url]: https://david-dm.org/airbnb/react-dates#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/react-dates.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/react-dates.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/react-dates.svg
[downloads-url]: http://npm-stat.com/charts.html?package=react-dates
