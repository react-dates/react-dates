# Change Log

<!--
- []  ([#](https://github.com/airbnb/react-dates/pull/))
-->

## 21.7.0
- [fix] Keep scroll position when prev months rendered on vertical scrollable calendar ([#1902](https://github.com/airbnb/react-dates/pull/1902))
- [new] Add ability to not show prev or next navigation buttons ([#1900](https://github.com/airbnb/react-dates/pull/1900))
- [fix] Fix logic for applying default navigation button styling ([#1898](https://github.com/airbnb/react-dates/pull/1898))

## 21.6.0

- [new] Add functionality to see previous months for vertical scrollable calendar ([#1894](https://github.com/airbnb/react-dates/pull/1894))
- [new] Add support for noNavButtons in DayPickerSingleDateController (match DayPickerRangeController support) ([#1895](https://github.com/airbnb/react-dates/pull/1895))

## 21.5.1

- [fix] Remove redundant overflowY:scroll on CalendarMonthGrid ([#1881](https://github.com/airbnb/react-dates/pull/1881))

## 21.5.0

- [new] Add support for custom month navigation buttons ([#1859](https://github.com/airbnb/react-dates/pull/1859))

## 21.4.0

- [new] Expose 'after-hovered-start' modifier and add 'before-hovered-end', 'no-selected-start-before-selected-end', 'selected-start-in-hovered-span', 'selected-end-in-hovered-span', 'selected-start-no-selected-end', and 'selected-end-no-selected-start' modifiers [#1608](https://github.com/airbnb/react-dates/pull/1608)
- [fix] Loosen up CustomizeableCalendarDay restriction on children  ([#1857](https://github.com/airbnb/react-dates/pull/1857))

## 21.3.2

- [fix] Revert "Call getStateForNewMonth when date/startDate/endDate is set to a date that is not visible" ([#1851](https://github.com/airbnb/react-dates/pull/1851))

## 21.3.1

- [fix] Update react-with-styles 4.1.0-alpha.1 -> 4.1.0

## 21.3.0

- [new] Update react-with-styles 4.0.1 -> 4.1.0 ([#1843](https://github.com/airbnb/react-dates/pull/1843))
- [new] Add Input Font-Weight to Default Theme ([#1765](https://github.com/airbnb/react-dates/pull/#1765))

## 21.2.1

- [fix] Call getStateForNewMonth when date/startDate/endDate is set to a date that is not visible ([#1834](https://github.com/airbnb/react-dates/pull/1834))

## 21.2.0

- [fix] Revert "Merge pull request [#1758](https://github.com/airbnb/react-dates/pull/1758): Remove all direct imports of css in favor of injected prop" ([#1818](https://github.com/airbnb/react-dates/pull/1818))
- [fix] Fix for getWeekHeaders(), prevents it from changing state.currentMonth ([#1796](https://github.com/airbnb/react-dates/pull/1796))
- [new] Add support for positioning month navigation under the calendar ([#1784](https://github.com/airbnb/react-dates/pull/1784))
- [new] Add minDate and maxDate props to DateRangePicker ([#1793](https://github.com/airbnb/react-dates/pull/1793), [#1794](https://github.com/airbnb/react-dates/pull/1794))

## 21.1.0

- [fix] `DayPicker`: week headers: use the passed-in moment object’s instance, to support localy ([#1577](https://github.com/airbnb/react-dates/pull/1577))
- [fix] Combine labelled DayPicker container elements ([#1783](https://github.com/airbnb/react-dates/pull/1783))
- [new] Add a render function for customizable week header text ([#1787](https://github.com/airbnb/react-dates/pull/1787))

## 21.0.1

- [fix] [deps] Update react-with-styles ^4.0.0 -> ^4.0.1 ([#1781](https://github.com/airbnb/react-dates/pull/1781))

## 21.0.0

- [breaking] [deps] Update react-with-styles and other deps ([#1761](https://github.com/airbnb/react-dates/pull/1761)
- [new] [deps] Update dependencies related to react-with-styles ([#1775](https://github.com/airbnb/react-dates/pull/1775))
- [new] `DayPickerSingleDateController`: Add onMultiplyScrollableMonths ([#1770](https://github.com/airbnb/react-dates/pull/1770))
- [dev] Fix moment date formats ([#1767](https://github.com/airbnb/react-dates/pull/1767))
- [dev] Fix addons webpack loader, Fix tests ([#1764](https://github.com/airbnb/react-dates/pull/1764))
- [dev] build: fix linting (refs eslint/eslint#12119)
- [new] [deps] update `@babel/runtime`, `airbnb-prop-types`, `object.values`, `prop-types`, `react-outside-click-handler`, `react-portal`
- [dev] [deps] update `@babel/*`, `@storybook/*`, `babel-plugin-inline-svg`, `babel-plugin-istanbul`, `babel-preset-airbnb`, `eslint-config-airbnb` to v18 (plus peer deps), `eslint` to v6; `eslint-plugin-react-with-styles`, `karma`, `karma-firefox-launcher`, `mocha`, `safe-publish-latest`, `sass-loader`, `sinon`, `sinon-sandbox`, `coveralls`, `enzyme-adapter-react-helper`
- [fix] Remove all direct imports of css in favor of injected prop ([#1758](https://github.com/airbnb/react-dates/pull/1758))

## 20.3.0
- [fix] Optimize setState dayPickerContainerStyles in responsivizePickerPosition ([#1735](https://github.com/airbnb/react-dates/pull/1735))
- [fix] Stop calendar blinking on DateRangePickerInput focus switch (fixes #1523) ([#1553](https://github.com/airbnb/react-dates/pull/1553))
- [new] [a11y] Add `aria-roledescription` ([#1746](https://github.com/airbnb/react-dates/pull/1746))

## 20.2.5
- [fix] Defer day focusing until next animation frame ([#1707](https://github.com/airbnb/react-dates/pull/1707))
- [fix] Fix startDate style (@mmarkelov, [#1710](https://github.com/airbnb/react-dates/pull/1710))
- [fix] Pass correct props to SingleDatePicker on close (@AlokTakshak, [#1678](https://github.com/airbnb/react-dates/pull/1678))
- [dev] Update blocked navigation (min/maxDate) stories (@ianduvall, [#1598](https://github.com/airbnb/react-dates/pull/1598))
- [dev] Add positioning to custom navigation in stories (@dougmacknz, [#1573](https://github.com/airbnb/react-dates/pull/1573))
- [dev] Update karma 3 → 4, mocha 3 → 6, nyc 12 → 14, sinon 6 → 7, eslint 5 → 6 ([#1713](https://github.com/airbnb/react-dates/pull/1713), [#1712](https://github.com/airbnb/react-dates/pull/1713))

## 20.2.4
- [fix] Replace react-addons-shallow-compare with enzyme-shallow-equal (bf7e3347702f)
- [fix] Optimize SVG assets ([#1690](https://github.com/airbnb/react-dates/pull/1690))
- [fix] Update babel-preset-airbnb 3.2.1 -> 4.0.0 ([#1692](https://github.com/airbnb/react-dates/pull/1692))

## 20.2.3
- [fix] Add guard for undefined objects in deleteModifier ([#1687](https://github.com/airbnb/react-dates/pull/1687))
- [dev] Update Storybook from v4 to v5 ([@trotzig](https://github.com/trotzig) [#1673](https://github.com/airbnb/react-dates/pull/1673))

## 20.2.2
- [fix] Add guard for undefined objects in addModifier ([#1667](https://github.com/airbnb/react-dates/pull/1667))

## 20.2.1
- [fix] Compile classes in loose mode ([#1655](https://github.com/airbnb/react-dates/pull/1655))
- [fix] Performance optimizations ([#1656](https://github.com/airbnb/react-dates/pull/1656), [#1657](https://github.com/airbnb/react-dates/pull/1657), [#1659](https://github.com/airbnb/react-dates/pull/1659), [#1661](https://github.com/airbnb/react-dates/pull/1661), [#1662](https://github.com/airbnb/react-dates/pull/1662), and [#1663](https://github.com/airbnb/react-dates/pull/1663))
- [docs] Add `initialVisibleMonth` to `DayPickerRangeController` in readme ([@AlokTakshak](https://github.com/AlokTakshak) [1652](https://github.com/airbnb/react-dates/pull/1652))

## 20.2.0
- [fix] Fix date selection in the SDP ([#1530](https://github.com/airbnb/react-dates/pull/1530))
- [new] Add explicit aria label props ([#1594](https://github.com/airbnb/react-dates/pull/1594))

## 20.1.0
- [new] Add `renderKeyboardShortcutsButton` prop ([#1576](https://github.com/airbnb/react-dates/pull/1576))

## 20.0.0
- [breaking] Omit tabindex prop from calendar navigation buttons when custom buttons are supplied ([#1563](https://github.com/airbnb/react-dates/pull/1563))
- [new] Add hovered-start-blocked-minimun-nights and hovered-start-first-possible-end modifiers ([#1547](https://github.com/airbnb/react-dates/pull/1547))
- [fix] clearTimeout added for the setCalendarMonthGridHeight timeout ([#1468](https://github.com/airbnb/react-dates/pull/1468))
- [fix] Remove default styles for the last-in-range modifier ([#1538](https://github.com/airbnb/react-dates/pull/1538))

## 19.0.4
- [fix] Added `selected` aria label to dates in the selected range ([#1555](https://github.com/airbnb/react-dates/pull/1555))

## 19.0.3
- [fix] Fix date selection in the SDP ([#1540](https://github.com/airbnb/react-dates/pull/1540))

## 19.0.2
- no changes; extraneous publish

## 19.0.1
- [fix] Fix single date picker not responding to input ([#1533](https://github.com/airbnb/react-dates/pull/1533))
- [fix] Fixes the focus out event in IE11 ([#1524](https://github.com/airbnb/react-dates/pull/1524))

## 19.0.0
- [breaking] Call `onDatesChange` before `onFocusChange` in the DRP ([#1525](https://github.com/airbnb/react-dates/pull/1525))

## 18.5.0
- [fix] Add `aria-disabled` attribute to the (Customizable)CalendarDay ([#1521](https://github.com/airbnb/react-dates/pull/1521))
- [new] Add `startDateOffset` and `endDateOffset` props to the DRP ([#1252](https://github.com/airbnb/react-dates/pull/1252))

## 18.4.1
- [fix] Make DRP and SDP calendars tabbable from the inputs ([#1499](https://github.com/airbnb/react-dates/pull/1499))

## 18.4.0
- [new] Clarify VoiceOver text for dates selected as start-date and end-date ([#1501](https://github.com/airbnb/react-dates/pull/1501))

## 18.3.1
- [fix][RTL] Fix the SDP and DRP noflip util function ([#1492](https://github.com/airbnb/react-dates/pull/1492))

## 18.3.0
- [fix] Update the SDP and DRP to be compatible with `react-with-direction` ([#1482](https://github.com/airbnb/react-dates/pull/1482))
- [new] Add `minDate` and `maxDate` props to block month navigation ([#1311](https://github.com/airbnb/react-dates/pull/1311))
- [fix][a11y] Remove space/enter onKeyDown handling for open/close keyboard shortcuts panel ([#1464](https://github.com/airbnb/react-dates/pull/1464))
- [fix][a11y] Fix lack of visible focus in Firefox and IE on "?" keyboard shortcuts button ([#1463](https://github.com/airbnb/react-dates/pull/1463))

## 18.2.2
- [fix] Conditionally apply the `shouldComponentUpdate` method in the babel transform ([#1457](https://github.com/airbnb/react-dates/pull/1457))
- [fix] Fix incorrect VO for selected check-in date  ([#1451](https://github.com/airbnb/react-dates/pull/1451))

## 18.2.1
- [fix] Add babel transform to handle PureComponent fallbacks ([#1452](https://github.com/airbnb/react-dates/pull/1452))

## 18.2.0
- [new] Add `onTab`/`onShiftTab` callbacks to the DayPicker (and its controllers) ([#1427](https://github.com/airbnb/react-dates/pull/1427))

## 18.1.1
- [fix] Prevent outside range dates from being selected by typing ([#1370](https://github.com/airbnb/react-dates/pull/1370))

## 18.1.0
- [fix] Default the `calendarMonthPadding` theme variable to 0 when undefined ([#1355](https://github.com/airbnb/react-dates/pull/1355))
- [new] Add `SingleDatePickerInputController` component ([#1360](https://github.com/airbnb/react-dates/pull/1360))
- [new] Add `horizontalMonthPadding` as a prop to the DRP ([#1364](https://github.com/airbnb/react-dates/pull/1364))
- [fix] Fix unnecessary rerender in `DayPickerNavigation` ([#1363](https://github.com/airbnb/react-dates/pull/1363))

## 18.0.4
- [fix] revert 'revert 'Conditionally use `PureComponent` instead of `Component`'' ([4f8eb01](https://github.com/airbnb/react-dates/commit/4f8eb01168ef6c4ae7d74e95ad14acb28960e43e))

## 18.0.3
- [fix] revert 'Conditionally use `PureComponent` instead of `Component`' ([50c382f](https://github.com/airbnb/react-dates/commit/50c382f7cf3e3ba60f4fdaa00eae53cf06d3c97b))

## 18.0.2
- [fix] Remove svgo from "inline-react-svg" babel plugin options ([#1350](https://github.com/airbnb/react-dates/pull/1350))

## 18.0.1
- [fix] Center vertical month navigation ([#1347](https://github.com/airbnb/react-dates/pull/1347))

## 18.0.0
- [fix] Conditionally use `PureComponent` instead of `Component` ([#1335](https://github.com/airbnb/react-dates/pull/1335))
- [breaking] Remove propTypes in production ([#1322](https://github.com/airbnb/react-dates/pull/1322))
- [fix] Change border-styles to minimise overlap ([#1328](https://github.com/airbnb/react-dates/pull/1328))
- [fix] Only blur the `activeElement` when available ([#1345](https://github.com/airbnb/react-dates/pull/1345))

## 17.2.0
- [fix] Add modifiers for next months in the vertical scrollable datepickers ([#1293](https://github.com/airbnb/react-dates/pull/1293))
- [fix] Fix cursor jumping to the end of the controlled input when typing ([#1287](https://github.com/airbnb/react-dates/pull/1287))
- [new] Add `horizontalMonthPadding` prop and `dayPickerHorizontalPadding` and `noScrollBarOnVerticalScrollable` theme variables ([#1298](https://github.com/airbnb/react-dates/pull/1298))
- [fix] Fix issue where custom month navigation was not clickable in FF ([#1305](https://github.com/airbnb/react-dates/pull/1305))

## 17.1.1
- [fix] Set `DayPickerNavigation__horizontal` height to zero ([#1265](https://github.com/airbnb/react-dates/pull/1265))

## 17.1.0
- [new] Add `ModifiersShape` and use throughout the codebase ([#1231](https://github.com/airbnb/react-dates/pull/1231))
- [fix] Fix minimum nights `blocked` modifiers being applied incorrectly ([#1259](https://github.com/airbnb/react-dates/pull/1259))
- [fix] Update conditions where `adjustDayPickerHeight` is called ([#1241](https://github.com/airbnb/react-dates/pull/1241))
- [fix] Do not render `OutsideClickHandler` unnecessarily ([#1256](https://github.com/airbnb/react-dates/pull/1256))

## 17.0.0
- [fix] Replace dumb quotes with smart quotes in default phrases ([#1168](https://github.com/airbnb/react-dates/pull/1168))
- [fix] Fix outside day movement on hover ([#1178](https://github.com/airbnb/react-dates/pull/1178))
- [fix] Add `focusable="false"` to SVGs ([#1190](https://github.com/airbnb/react-dates/pull/1190))
- [fix] Use `react-outside-click-handler` instead of the internal component ([#1191](https://github.com/airbnb/react-dates/pull/1191))
- [breaking] Change the way month heights are calculated and update the name of some `CalendarMonth`/`CalendarMonthGrid` props ([#1192](https://github.com/airbnb/react-dates/pull/1192))
- [new] Pass nextMonth to `onPrevMonthClick`/`onNextMonthClick` ([#1207](https://github.com/airbnb/react-dates/pull/1207))
- [new] Allow input border styles to be overridden in the theme ([#1201](https://github.com/airbnb/react-dates/pull/1201))
- [new] Allow consolidated-events@2.0.0 ([#1218](https://github.com/airbnb/react-dates/pull/1218))
- [fix] Remove input.blur() call to fix a focus trap in Safari/IE ([#1214](https://github.com/airbnb/react-dates/pull/1214))
- [new] Add support for month/year transitions ([#1106](https://github.com/airbnb/react-dates/pull/1106))
- [breaking] Rename renderMonth=>renderMonthText and renderCaption=>renderMonthElement ([#1220](https://github.com/airbnb/react-dates/pull/1220))
- [breaking] Remove default styling *completely* from the `navNext`/`navPrev` props, including position ([#1204](https://github.com/airbnb/react-dates/pull/1204))
- [fix] Fix propType warnings for `onMonthChange`/`onYearChange` ([#1222](https://github.com/airbnb/react-dates/pull/1222))
- [breaking] Remove `OutsideClickHandler` export entirely ([#1225](https://github.com/airbnb/react-dates/pull/1225))

## 16.7.1
- [fix] react-with-styles v3 requires react-with-direction as a peer dep; this provides it but forwards the peer dep requirement ([#1348](https://github.com/airbnb/react-dates/issues/1348))

## 16.7.0
- [fix] Force border-radius to be 0 on the inputs ([#1157](https://github.com/airbnb/react-dates/pull/1157))
- [fix] Clear previous min nights modifiers, not current ([#994](https://github.com/airbnb/react-dates/pull/994))
- [fix] Tweak default input styling ([#1158](https://github.com/airbnb/react-dates/pull/1158))
- [fix] Round transform3d values to fix font blur ([#1155](https://github.com/airbnb/react-dates/pull/1155))
- [new] Add `noNavButtons` prop ([#1160](https://github.com/airbnb/react-dates/pull/1160))

## 16.6.1
- [fix] Fix selective disabling of the `DateRangePicker` ([#1116](https://github.com/airbnb/react-dates/pull/1116))
- [fix] Fix `onOutsideClick` refactor ([#1115](https://github.com/airbnb/react-dates/pull/1115))

## 16.6.0
- [new] Add `appendToBody`/`disableScroll` props ([#1069](https://github.com/airbnb/react-dates/pull/1069))
- [fix] Address unexpected blur call ([#1107](https://github.com/airbnb/react-dates/pull/1107))
- [new] Add `verticalBorderSpacing` prop to `DayPickerSingleDateController`/`DayPickerRangeController` ([#1096](https://github.com/airbnb/react-dates/pull/1096))
- [fix] Move focus to `DayPicker` when readOnly is true ([#961](https://github.com/airbnb/react-dates/pull/961))

## 16.5.0
- [new] Export `CustomizeableCalendarDay` default styles ([#1095](https://github.com/airbnb/react-dates/pull/1095))
- [new] Allow selectively disabling either input in the DRP ([#](https://github.com/airbnb/react-dates/pull/606))
- [new] Add `dayAriaLabelFormat` prop to the SDP/DRP ([#](https://github.com/airbnb/react-dates/pull/984))

## 16.4.0
- [new] Export `OutsideClickHandler` in index.js ([#1089](https://github.com/airbnb/react-dates/pull/1089))
- [fix] Do not apply `verticalSpacing` when `withPortal` or `withFullScreenPortal` is true ([#980](https://github.com/airbnb/react-dates/pull/980))
- [fix] Handle minimum nights when selecting `startDate` ([#1015](https://github.com/airbnb/react-dates/pull/1015))
- [fix] Fix style of `CloseIcon` in the SDP ([#1058](https://github.com/airbnb/react-dates/pull/1058))

## 16.3.6
- [fix] Address width issues for vertical DayPickers ([#1055](https://github.com/airbnb/react-dates/pull/1055))

## 16.3.5 (I promise this one is good)
- [fix] Includes all necessary CSS ([c965348](https://github.com/airbnb/react-dates/commit/c96534896d8fe5c28ddc1f1090ef43dfaeebb5d6))

## 16.3.4
- [fix] Bumps all the RWS libraries again, now with less breakage!

## 16.3.3
- [revert] Reverts 'Bump react-with-style-interface-css dependency ([#1043](https://github.com/airbnb/react-dates/pull/1043))'

## 16.3.2
- [revert] Reverts 'Bump react-with-styles dependency ([#1041](https://github.com/airbnb/react-dates/pull/1041))'

## 16.3.1
- [deps] Bump react-with-styles dependency ([#1041](https://github.com/airbnb/react-dates/pull/1041))
- [deps] Bump react-with-style-interface-css dependency ([#1043](https://github.com/airbnb/react-dates/pull/1043))

## 16.3.0
- [new] customInfoPanel position prop ([#989](https://github.com/airbnb/react-dates/pull/989))
- [fix] Fix CustomizableCalendarDay selected/selected-start/selected-end specificity issues ([#979](https://github.com/airbnb/react-dates/pull/979))
- [fix] Add modifiers for `firstDayOfWeek` and `lastDayOfWeek` ([#988](https://github.com/airbnb/react-dates/pull/988))
- [fix] Ensure callbacks only trigger after state has been updates ([#990](https://github.com/airbnb/react-dates/pull/990))

## 16.2.1
- [fix] SDP `block` styling also makes the input full width ([#972](https://github.com/airbnb/react-dates/pull/972))

## 16.2.0
- [new] Add `startDateOffset`/`endDateOffset` props to `DayPickerRangeController` ([#884](https://github.com/airbnb/react-dates/pull/884))
- [fix] Make all styles inline in `CustomizableCalendarDay` ([#964](https://github.com/airbnb/react-dates/pull/964))

## 16.1.1
- [fix] Address some small bugs with `CustomizableCalendarDay` ([#962](https://github.com/airbnb/react-dates/pull/962))

## 16.1.0
- [fix] Allow for changing of the input value via highlight and replace ([#955](https://github.com/airbnb/react-dates/pull/955))
- [fix] Fix OPEN_UP styling ([#925](https://github.com/airbnb/react-dates/pull/925))
- [fix] Don't read invisible months to the screen reader ([#940](https://github.com/airbnb/react-dates/pull/940))
- [new] Add phrase for aria-label for the selected day ([#905](https://github.com/airbnb/react-dates/pull/905))

## 16.0.2
- [fix] Fix keyboard navigation issues ([#916](https://github.com/airbnb/react-dates/pull/916))
- [fix] Fix React warnings when events are referenced later ([#682](https://github.com/airbnb/react-dates/pull/682))

## 16.0.1
- [fix] Add back missing onKeyDown method to `CalendarDay` ([#901](https://github.com/airbnb/react-dates/pull/901))

## 16.0.0
- [breaking] Simplify `CalendarDay` component ([#894](https://github.com/airbnb/react-dates/pull/894))
- [breaking] rename `renderDay` prop to `renderDayContents` ([#894](https://github.com/airbnb/react-dates/pull/894))
- [new] Add `renderCalendarDay` component to allow for easy one-off customization of `CalendarDay` ([#894](https://github.com/airbnb/react-dates/pull/894))

## 15.5.2
- revert [#866](https://github.com/airbnb/react-dates/pull/866); it turned out to be semver-major

## 15.5.1
- [fix] Adjust `small` variant height to be 36px ([#892](https://github.com/airbnb/react-dates/pull/892))

## 15.5.0
- [new] Add `small` variant ([#891](https://github.com/airbnb/react-dates/pull/891))

## 15.4.0
- [fix] Set font sizes according to theme variable ([#885](https://github.com/airbnb/react-dates/pull/885))
- [new] Add `verticalSpacing` prop ([#883](https://github.com/airbnb/react-dates/pull/883))

## 15.3.0
- [new] Add `transitionDuration` prop ([#865](https://github.com/airbnb/react-dates/pull/865))
- [fix] Remove default prop values for required startDateId and endDateId props ([#866](https://github.com/airbnb/react-dates/pull/866))
- [new] Add `block` styling prop ([#871](https://github.com/airbnb/react-dates/pull/871))
- [new] Add `noBorder` prop to `DayPicker` variations ([#869](https://github.com/airbnb/react-dates/pull/869))
- [new] Add `noBorder` prop to inputs ([#870](https://github.com/airbnb/react-dates/pull/870))
- [fix] Remove unused width style in `KeyboardShortcutsRow` ([#867](https://github.com/airbnb/react-dates/pull/867))

## 15.2.1
- [fix] Republish `_datepicker.css`

## 15.2.0
- [new] Add back today modifier (and class) ([#861](https://github.com/airbnb/react-dates/pull/861))
- [new] Add ariaLabelFormat prop to CalendarDay ([#842](https://github.com/airbnb/react-dates/pull/842), [#857](https://github.com/airbnb/react-dates/pull/857))
- [fix] Reset `after-hover-start` in `componentWillReceiveProps` instead of only on click ([#843](https://github.com/airbnb/react-dates/pull/843))
- [fix] Use `color.background` variable instead of hardcoded #fff for theming ([#852](https://github.com/airbnb/react-dates/pull/852))
- [fix] Update CalendarMonthGrid months based on locale change ([#795](https://github.com/airbnb/react-dates/pull/795))

## 15.1.0
- [fix] Add explicit border-radius on KeyboardShortcuts button ([#792](https://github.com/airbnb/react-dates/pull/792))
- [fix] Pass onClose from SingleDatePicker to DayPickerSingleDateController ([#816](https://github.com/airbnb/react-dates/pull/816))
- [new] Pass modifiers to `renderDay` as second arg ([#829](https://github.com/airbnb/react-dates/pull/829))
- [fix] Fix KeyboardShortcutsPanel focus issues ([#825](https://github.com/airbnb/react-dates/pull/825))

## 15.0.0
- [breaking] Rename SDP keydown callback props so that they match the DRP ([#800](https://github.com/airbnb/react-dates/pull/800))
- [fix] Explicitly set the border-radius on the keyboard shortcuts button ([#792](https://github.com/airbnb/react-dates/pull/792))

## 14.1.0
- [new] Add esm build ([#791](https://github.com/airbnb/react-dates/pull/791))
- [new] Add back `selected-start`/`selected-end` modifiers to `CalendarDay` ([#796](https://github.com/airbnb/react-dates/pull/796))

## 14.0.0
- [fix] Flip arrow navigation in RTL context ([#775](https://github.com/airbnb/react-dates/pull/775))
- [new] Add `verticalHeight` prop to SDP, DRP and DayPicker ([#773](https://github.com/airbnb/react-dates/pull/773))
- [breaking] Modify default `DateInput` styling, convert inputs to actual inputs, and remove caption ids ([#780](https://github.com/airbnb/react-dates/pull/780))

## 13.0.6
- [fix] Update `react-with-styles-interface-css` dependency ([#777](https://github.com/airbnb/react-dates/pull/777))

## 13.0.5
- [fix] Add back missing built CSS file

## 13.0.4
- [fix] Pass through `customCloseIcon` prop from the SDP to the SDPInput ([#767](https://github.com/airbnb/react-dates/pull/767))
- [fix] Fix incorrect available/unavailable phrase being read on `CalendarDay` components ([#771](https://github.com/airbnb/react-dates/pull/771))

## 13.0.3
- [fix] Change CSS style specificity to 0 for the default stylesheet ([#753](https://github.com/airbnb/react-dates/pull/753))
- [fix] Remove unnecessary caption object from `CalendarMonth` styles ([#757](https://github.com/airbnb/react-dates/pull/757))

## 13.0.2
- [fix] Use default export of `registerCSSInterfaceWithDefaultTheme` in `initialize`

## 13.0.1
- [fix] Move caption div back outside of `CalendarMonth` table ([#748](https://github.com/airbnb/react-dates/pull/748))

## 13.0.0
- [breaking] Convert react-dates to rely on `react-with-styles` in place of CSS stylesheets ([#722](https://github.com/airbnb/react-dates/pull/722))

## 12.7.1
- [fix] set explicit border radius on shortcuts button ([#792](https://github.com/airbnb/react-dates/pull/792))

## 12.7.0
- [new] Some accessibility improvements and patches ([#715](https://github.com/airbnb/react-dates/pull/715))

## 12.6.0
- [new] Add `weekDayFormat` prop to SDP/DRP ([#650](https://github.com/airbnb/react-dates/pull/650))
- [new] Add `openDirection` prop to SDP/DRP ([#653](https://github.com/airbnb/react-dates/pull/653))
- [fix] Reset visibleDays/currentMonth state when `enableOutsideDays` or `numberOfMonths` has changed ([#702](https://github.com/airbnb/react-dates/pull/702))
- [new] Add $react-dates-color-primary-dark CSS variable ([#704](https://github.com/airbnb/react-dates/pull/704))

## 12.5.1
- [fix] Ensure `this.childNode` exists in the `OutsideClickHandler` ([e330839](https://github.com/airbnb/react-dates/commit/e3308395212bef07d1f3c05f413cac3dd245ac98))
- [fix] Remove `minimumNights` prop from the `DayPickerSingleDateController` ([#686](https://github.com/airbnb/react-dates/pull/686))

## 12.5.0
- [fix] Fix `onOutsideClick` prop functionality in the SDP ([#666](https://github.com/airbnb/react-dates/pull/666))
- [new] Add `inputIconPosition` prop ([#627](https://github.com/airbnb/react-dates/pull/627))
- [fix] Adjust DayPicker styles when portal status is set ([#659](https://github.com/airbnb/react-dates/pull/659))

## 12.4.0
- [fix] Pass `onPrevMonthClick`/`onNextMonthClick` props through the SDP ([#657](https://github.com/airbnb/react-dates/pull/657))
- [fix] Recalculate modifiers when prop modifiers change ([#668](https://github.com/airbnb/react-dates/pull/668))
- [new] Pass back month as argument to `onPrevMonthClick`/`onNextMonthClick` props ([#667](https://github.com/airbnb/react-dates/pull/667))

## 12.3.0
- [fix] Allows users to type in same-day start date and end date when `minimumNights` is 0 ([#555](https://github.com/airbnb/react-dates/pull/555))
- [new] Add `firstDayOfWeek` prop ([#371](https://github.com/airbnb/react-dates/pull/371))
- [fix] Add back `phrases` support for `SingleDatePicker` ([#623](https://github.com/airbnb/react-dates/pull/623))

## 12.2.4
- [fix] Fix `initialVisibleMonth` error in the `DayPickerRangeController` component ([#617](https://github.com/airbnb/react-dates/pull/617))
- [fix] Pass through missing `keepOpenOnDateSelect` prop to the `DayPickerSingleDateController` component ([#620](https://github.com/airbnb/react-dates/pull/620))

## 12.2.3
- [fix] Export `DayPickerSingleDateController` in index.js ([#609](https://github.com/airbnb/react-dates/pull/609))

## 12.2.2
- [fix] Reevaluate `--blocked` and `--blocked-outside-range` modifiers in the SDP componentWilLReceiveProps ([#550](https://github.com/airbnb/react-dates/pull/550))

## 12.2.1
- [fix] Fix `isTouchDevice` warning in `DayPickerSingleDateController` ([77e2135](https://github.com/airbnb/react-dates/commit/77e2135d2009994fbf2c62e3ff68ce82e5786194))

## v12.2.0
- [fix] Deprecate `isTouchDevice` in favor of `is-touch-device` ([#576](https://github.com/airbnb/react-dates/pull/576))
- [fix] Disable calendar icon when component is disabled ([#591](https://github.com/airbnb/react-dates/pull/591))
- [fix] Fix issue where range does not clear on invisible months ([#575](https://github.com/airbnb/react-dates/pull/575))
- [new] Add `DayPickerSingleDateController` component ([#573](https://github.com/airbnb/react-dates/pull/573))

## v12.1.2
- [fix] Add null check for calendarMonthGrid ref ([#552](https://github.com/airbnb/react-dates/pull/552))

## v12.1.1
- [fix] Remove `--hovered-span` modifier when selecting a new end date ([#523](https://github.com/airbnb/react-dates/pull/523))
- [fix] Improve `isTouchDevice` detection logic ([#516](https://github.com/airbnb/react-dates/pull/516))
- [fix] Recompute `--blocked` and `--blocked-outside-range` when `focusedInput` changes ([#522](https://github.com/airbnb/react-dates/pull/522))

## v12.1.0
- [new] Add `showDefaultInputIcon` and `customInputIcon` props to SDP ([#513](https://github.com/airbnb/react-dates/pull/513))

## v12.0.0
- [breaking] Updates moment peer dependency to ^2.18.1 ([#505](https://github.com/airbnb/react-dates/pull/505))

## v11.1.0
- [fix] Patch issues with vertical scrollable datepickers, after-hovered-start and month transitions ([#503](https://github.com/airbnb/react-dates/pull/503))
- [new] Adds a `readOnly` prop on the DRP and SDP ([#501](https://github.com/airbnb/react-dates/pull/501))
- [fix] Disable hover when `focusedInput` is falsy ([#483](https://github.com/airbnb/react-dates/pull/483))

## v11.0.1
- [fix] Fixes small modifier issues in the DRP after rearchitecture ([#489](https://github.com/airbnb/react-dates/pull/489))

## v11.0.0
- [breaking] Dramatic rearchitecture of modifiers with the goal of improved performance ([#450](https://github.com/airbnb/react-dates/pull/450))

## v10.2.0
- [new] Add RTL support to the DRP and the SDP with the `isRTL` prop ([#454](https://github.com/airbnb/react-dates/pull/454))
- [new] Add `renderMonth` prop to DRP and SDP([#449](https://github.com/airbnb/react-dates/pull/449))

## v10.1.3
- [Fix] OutsideClickHandler: ensure this.childNode exists (#437)

## v10.1.2
- [fix] Remove unused scss variables ([#475](https://github.com/airbnb/react-dates/pull/475))
- [fix] Address some issues introduced by the accessibility PR in v10.0.0 ([#477](https://github.com/airbnb/react-dates/pull/477))
- [fix] Only update phrase object in the DRP when necessary ([#448](https://github.com/airbnb/react-dates/pull/448))

## v10.1.1
- [fix] Remove unnecessary `onClose` instances on the `SDPInput` and `DateInput` components

## v10.1.0
- [new] Add `onClose` callback ([#397](https://github.com/airbnb/react-dates/pull/397))

## v10.0.1
- [fix] Fix a few nits as a result of the accessibility PR ([#429](https://github.com/airbnb/react-dates/pull/429))

## v10.0.0
- [breaking] Add keyboard accessibility to react-dates ([#301](https://github.com/airbnb/react-dates/pull/301))

## v9.0.1
- [fix] Fixes `withPortal` implementation in Firefox ([#421](https://github.com/airbnb/react-dates/pull/421))

## v9.0.0
- [fix] Only send down relevant modifiers down the tree ([#412](https://github.com/airbnb/react-dates/pull/412))
- [fix] Optimise `isSameDay` method ([#415](https://github.com/airbnb/react-dates/pull/415))
- [fix] Blur input for portal implementations (and on touch devices) ([#410](https://github.com/airbnb/react-dates/pull/410))
- [breaking] Add `daySize` prop to scale the pickers properly ([#406](https://github.com/airbnb/react-dates/pull/406))

## v8.2.1
- [fix] Add `needsclick` to inputs to disable fastclick ([#377](https://github.com/airbnb/react-dates/pull/377))
- [deps] Update `style-loader`, `sinon`, `babel-loader`, `coveralls`, and `karma-webpack` ([#379](https://github.com/airbnb/react-dates/pull/379), [#372](https://github.com/airbnb/react-dates/pull/372), [#373](https://github.com/airbnb/react-dates/pull/373))

## v8.2.0
- [new] Add `renderCalendarInfo` prop to DRP and SDP ([#341](https://github.com/airbnb/react-dates/pull/341))

## v8.1.1
- [fix] Add missing `customCloseIcon` propType declarations ([#367](https://github.com/airbnb/react-dates/pull/367))

## v8.1.0
- [new] Add `customCloseIcon` prop ([#356](https://github.com/airbnb/react-dates/pull/356))

## v8.0.0
- [fix] Remove `$react-dates-width-day-picker` variable from `CalendarMonthGrid.scss`, allowing overrides ([#352](https://github.com/airbnb/react-dates/pull/352))
- [new] Create `defaultPhrases` file for i18n ([#351](https://github.com/airbnb/react-dates/pull/351))
- [fix] Set `isTouchDevice` on `componentDidMount` ([#336](https://github.com/airbnb/react-dates/pull/336))
- [fix] Change `CalendarMonthGrid` background to use `$react-dates-color-white` ([#342](https://github.com/airbnb/react-dates/pull/342))
- [breaking] Make `onFocusChange` and `onDate(s)Change` props required and `forbidExtraProps` on all components ([#332](https://github.com/airbnb/react-dates/pull/332))
- [fix] Fix caption alignment when using bootstrap ([#323](https://github.com/airbnb/react-dates/pull/323))

## v7.0.1
- [fix] Fix minimum nights issues for startDates/endDates with time ([#310](https://github.com/airbnb/react-dates/pull/310))

## v7.0.0
- [breaking] Simplify `CalendarDay` DOM ([#291](https://github.com/airbnb/react-dates/pull/291))

## v6.1.0
- [fix] Revert "Simplify `CalendarDay` DOM ([#291](https://github.com/airbnb/react-dates/pull/291))"
- [new] Add `renderDay` prop to customize the content of the `CalendarDay` component ([#307](https://github.com/airbnb/react-dates/pull/307))

## v6.0.2
- [fix] Fix `day` prop type warning to `CalendarDay` ([#305](https://github.com/airbnb/react-dates/pull/305))
- [fix] Remove blinking cursor in iOS ([#304](https://github.com/airbnb/react-dates/pull/304))
- [fix] Do not render `DayPicker` when not visible ([#286](https://github.com/airbnb/react-dates/pull/286))
- [breaking] Simplify `CalendarDay` DOM ([#291](https://github.com/airbnb/react-dates/pull/291))

## v6.0.1
 - [fix] Attached SDP closes on outside click again ([#288](https://github.com/airbnb/react-dates/pull/288))
 - [fix] SDP display value defaults to moment's `L` format again instead of ISO ([#285](https://github.com/airbnb/react-dates/pull/285))

## v6.0.0
 - [breaking] Remove hidden `label` element in favor of an `aria-label` property ([#280](https://github.com/airbnb/react-dates/pull/280))
 - [new] Add `customArrowIcon` prop ([#277](https://github.com/airbnb/react-dates/pull/277))
 - [breaking] Remove mousedown/mouseup/touchstart/touchend/touchtap handlers in favor of click ([#275](https://github.com/airbnb/react-dates/pull/275))
 - [fix] Fix duplicate months created when increasing `numberOfMonths` and include year in `CalendarMonth` key ([#279](https://github.com/airbnb/react-dates/pull/279))
 - [new] Add `screenReaderInputMessage` to populate the `aria-describedby` attribute on the input ([#266](https://github.com/airbnb/react-dates/pull/266))

## v5.2.0
 - [new] Add `VERTICAL_SCROLLABLE` orientation to the `DayPickerRangeController` and child components ([#250](https://github.com/airbnb/react-dates/pull/250))

## v5.1.1
 - [fix] Fix regression where user was no longer able to type into input ([#269](https://github.com/airbnb/react-dates/pull/269))

## v5.1.0
 - [new] Add `showDefaultInputIcon` and `customInputIcon` prop to show an icon at the beginning of the input field ([#222](https://github.com/airbnb/react-dates/pull/222))

## v5.0.0
 - [breaking] Update input value to use ISO format instead of the display format ([#229](https://github.com/airbnb/react-dates/pull/229))
 - [breaking] Performance improvements, including the removal of the modifiers prop from `CalendarDay` ([#217](https://github.com/airbnb/react-dates/pull/217))

## v4.3.3
 - [fix] Force DayPicker and CalendarMonthGrid alignment to the left ([#257](https://github.com/airbnb/react-dates/pull/257),[#258](https://github.com/airbnb/react-dates/pull/258))

## v4.3.2
 - [fix] Finish refactor from 471bd602302f4dfe4f1e66b79d50b22f7511d8ba ([#233](https://github.com/airbnb/react-dates/pull/233))

## v4.3.1 (unpublished)
 - [fix] Don’t create an unnecessary array from a NodeList, which avoids needing `Array.from` ([#233](https://github.com/airbnb/react-dates/pull/233))

## v4.3.0
 - [new] Add today modifier to the `SingleDatePicker` component ([#218](https://github.com/airbnb/react-dates/pull/218))
 - [fix] Fix week header alignment when `numberOfMonths` is greater than 2 ([#221](https://github.com/airbnb/react-dates/pull/221))
 - [fix] Fix `transition`/`transform` prefixing on `.CalendarMonthGrid--animating` class ([#220](https://github.com/airbnb/react-dates/pull/220))
 - [fix] Do not allow `pointer-events` on invisible first month ([#227](https://github.com/airbnb/react-dates/pull/227))
 - [fix] Remove `maxLength` attribute from inputs ([#219](https://github.com/airbnb/react-dates/pull/219))

## v4.2.0
 - [new] Add `isDayHighlighted` prop to the DRP/SDP which applies a `highlighted-calendar` to the relevant days ([#206](https://github.com/airbnb/react-dates/pull/206))
 - [new] Add `today` modifier to the `DayPickerRangeController` component ([#213](https://github.com/airbnb/react-dates/pull/213))

## v4.1.2
 - [fix] `DayPicker` now has initial width set, even before any other interaction ([#215](https://github.com/airbnb/react-dates/pull/215))

## v4.1.1
 - [fix] Fix issue where the DayPicker height and width were not always being set initially ([#196](https://github.com/airbnb/react-dates/pull/196))
 - [fix] Fix closed DRP/SDP refocus issue on window blur and refocus ([#212](https://github.com/airbnb/react-dates/pull/212))

## v4.1.0
 - [new] Separate out date range input event handling logic into the `DateRangePickerInputController` component ([#180](https://github.com/airbnb/react-dates/pull/180))
 - [fix] Only responsivize the DRP and SDP when `withPortal` and `withFullScreenPortal` options are false ([#183](https://github.com/airbnb/react-dates/pull/183))
 - [new] Separate out date range calendar event handling logic and styles into the `DayPickerRangeController` component ([#167](https://github.com/airbnb/react-dates/pull/167))

## v4.0.2
 - [patch] Revert [#176](https://github.com/airbnb/react-dates/pull/176) ([#189](https://github.com/airbnb/react-dates/pull/189))

## v4.0.1
 - [patch] `initialVisibleMonth` prop will now be called every time the `DayPicker` is opened ([#176](https://github.com/airbnb/react-dates/pull/176))
 - [patch] Use the `readOnly` prop on inputs instead of the `disabled` prop on touch devices ([#174](https://github.com/airbnb/react-dates/pull/174))

## v4.0.0
 - [breaking] Cut the tether dependency from react-dates ([#163](https://github.com/airbnb/react-dates/pull/163))

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
 - [new] Export date comparison methods - `isNextDay`, `isSameDay`, `isInclusivelyAfterDay`, `isInclusivelyBeforeDay`
 - [fix] Replace `Array.includes` with `array-includes` for compatibility with IE11

## v2.0.0
 - [new] Set scss variables to `!default` for easing overriding
 - [breaking] Rename scss variables to be more generic and namespace them with the `$react-dates-` prefix
 - [new] Add `disabled` functionality to the `<SingleDatePicker />` and `<DateRangePicker />`
 - [breaking] Consolidate `blockedDates`, `blockedByDefault`, and `unblockedDates` into a single function prop `isDayBlocked`
 - [breaking] Remove prop `allowPastDates` in favor of `isOutsideRange` prop

## v1.0.0
 - Initial commit
