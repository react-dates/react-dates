# react-dates <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

> An easily internationalizable, accessible, mobile-friendly datepicker library for the web.

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
  npm install --save react-dates moment@>=#.## react@>=#.## react-dom@>=#.##
  ```

### Initialize
```js
import 'react-dates/initialize';
```

As of v13.0.0 of `react-dates`, this project relies on `react-with-styles`. If you want to continue using CSS stylesheets and classes, there is a little bit of extra set-up required to get things going. As such, you need to import `react-dates/initialize` to set up class names on our components. This import should go at the top of your application as you won't be able to import any `react-dates` components without it.

Note: This component assumes `box-sizing: border-box` is set globally in your page's CSS.

### Include component
```js
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
```

#### Webpack
Using Webpack with CSS loader, add the following import to your app:
```js
import 'react-dates/lib/css/_datepicker.css';
```

#### Without Webpack:
Create a CSS file with the contents of `require.resolve('react-dates/lib/css/_datepicker.css')` and include it in your html `<head>` section.

To see this in action, you can check out https://github.com/majapw/react-dates-demo which adds `react-dates` on top of a simple `create-react-app` setup.

#### Overriding styles
Right now, the easiest way to tweak `react-dates` to your heart's content is to create another stylesheet to override the default react-dates styles. For example, you could create a file named `react_dates_overrides.css` with the following contents:

```css
.CalendarDay__highlighted_calendar {
  background: #82E0AA;
  color: #186A3B;
}

.CalendarDay__highlighted_calendar:hover {
  background: #58D68D;
  color: #186A3B;
}

.CalendarDay__highlighted_calendar:active {
  background: #58D68D;
  color: #186A3B;
}
```

This would override the background and text colors applied to highlighted calendar days. You can use this method with the default set-up to override any aspect of the calendar to have it better fit to your particular needs.

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
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
/>
```

The following is a list of other *OPTIONAL* props you may provide to the `DateRangePicker` to customize appearance and behavior to your heart's desire. All constants (indicated by `ALL_CAPS`) are provided as named exports in `react-dates/constants`. Please explore the [storybook](http://airbnb.io/react-dates/?selectedKind=DRP%20-%20Input%20Props&selectedStory=default&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel) for more information on what each of these props do.
```js
// input related props
startDatePlaceholderText: PropTypes.string,
endDatePlaceholderText: PropTypes.string,
disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([START_DATE, END_DATE])]),
required: PropTypes.bool,
readOnly: PropTypes.bool,
screenReaderInputMessage: PropTypes.string,
showClearDates: PropTypes.bool,
showDefaultInputIcon: PropTypes.bool,
customInputIcon: PropTypes.node,
customArrowIcon: PropTypes.node,
customCloseIcon: PropTypes.node,
inputIconPosition: PropTypes.oneOf([ICON_BEFORE_POSITION, ICON_AFTER_POSITION]),
noBorder: PropTypes.bool,
block: PropTypes.bool,
small: PropTypes.bool,
regular: PropTypes.bool,

// calendar presentation and interaction related props
renderMonth: PropTypes.func,
orientation: PropTypes.oneOf([HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION]),
anchorDirection: PropTypes.oneOf([ANCHOR_LEFT, ANCHOR_RIGHT]),
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
transitionDuration: nonNegativeInteger, // milliseconds

// day presentation and interaction related props
renderCalendarDay: PropTypes.func,
renderDayContents: PropTypes.func,
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
dayAriaLabelFormat: PropTypes.string,
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

The following is a list of other *OPTIONAL* props you may provide to the `SingleDatePicker` to customize appearance and behavior to your heart's desire. All constants (indicated by `ALL_CAPS`) are provided as named exports in `react-dates/constants`. Please explore the [storybook](http://airbnb.io/react-dates/?selectedKind=SDP%20-%20Input%20Props&selectedStory=default&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel) for more information on what each of these props do.
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
inputIconPosition: PropTypes.oneOf([ICON_BEFORE_POSITION, ICON_AFTER_POSITION]),
noBorder: PropTypes.bool,
block: PropTypes.bool,
small: PropTypes.bool,
regular: PropTypes.bool,

// calendar presentation and interaction related props
renderMonth: PropTypes.func,
orientation: PropTypes.oneOf([HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION]),
anchorDirection: PropTypes.oneOf([ANCHOR_LEFT, ANCHOR_RIGHT]),
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
transitionDuration: nonNegativeInteger, // milliseconds

// day presentation and interaction related props
renderCalendarDay: PropTypes.func,
renderDayContents: PropTypes.func,
enableOutsideDays: PropTypes.bool,
isDayBlocked: PropTypes.func,
isOutsideRange: PropTypes.func,
isDayHighlighted: PropTypes.func,

// internationalization props
displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
monthFormat: PropTypes.string,
weekDayFormat: PropTypes.string,
phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerPhrases)),
dayAriaLabelFormat: PropTypes.string,
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
  noBorder: PropTypes.bool,

  // navigation related props
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  transitionDuration: nonNegativeInteger, // milliseconds

  // day presentation and interaction related props
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  minimumNights: PropTypes.number,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // internationalization props
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,
/>
```

## Localization

[Moment.js](http://momentjs.com) is a peer dependency of `react-dates`, so `react-dates` will use a single instance of `moment` which is imported in the user's project. To load a locale it is enough to invoke `moment.locale` in the component where `moment` is imported, with the [locale key](http://momentjs.com/docs/#/i18n/) of choice, e.g.:
```
moment.locale('pl'); // Polish
```

## Advanced

`react-dates` no longer relies strictly on CSS, but rather relies on `react-with-styles` as an abstraction layer between how styles are applied and how they are written. The instructions above will get the project working out of the box, but there's a lot more customization that can be done.

### Interfaces

The `react-dates/initialize` script actually relies on [react-with-styles-interface-css](https://github.com/airbnb/react-with-styles-interface-css) under the hood. If you are interested in a different solution for styling in your project, you can do your own initialization of a another [interface](https://github.com/airbnb/react-with-styles/blob/master/README.md#interfaces). At Airbnb, for instance, we rely on [Aphrodite](https://github.com/Khan/aphrodite) under the hood and therefore use the Aphrodite interface for `react-with-styles`. If you want to do the same, you would use the following pattern:
```js
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme(DefaultTheme);
```

The above code has to be run before any `react-dates` component is imported. Otherwise, you will get an error. Also note that if you register any custom interface manually, you *must* also manually register a theme.

### Theming
`react-dates` also now supports a different way to theme. You can see the default theme values in [this file](https://github.com/airbnb/react-dates/blob/master/src/theme/DefaultTheme.js) and you would override them in the following manner:
```js
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme({
  reactDates: {
    ...DefaultTheme.reactDates,
    color: {
      ...DefaultTheme.reactDates.color,
      highlighted: {
        backgroundColor: '#82E0AA',
        backgroundColor_active: '#58D68D',
        backgroundColor_hover: '#58D68D',
        color: '#186A3B',
        color_active: '#186A3B',
        color_hover: '#186A3B',
      },
    },
  },
});
```

The above code would use shades of green instead of shades of yellow for the highlight color on `CalendarDay` components. Note that you *must* register an interface if you manually register a theme. One will not work without the other.

#### A note on using `react-with-styles-interface-css`
The default interface that `react-dates` ships with is the [CSS interface](https://github.com/airbnb/react-with-styles-interface-css). If you want to use this interface along with the theme registration method, you will need to rebuild the core `_datepicker.css` file. We do not currently expose a utility method to build this file, but you can follow along with the code in https://github.com/airbnb/react-dates/blob/master/scripts/buildCSS.js to build your own custom themed CSS file.

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
