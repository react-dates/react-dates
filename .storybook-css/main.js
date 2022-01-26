module.exports = {
    stories: [
        '../stories/DateRangePicker',
        '../stories/DateRangePicker_input',
        '../stories/DateRangePicker_calendar',
        '../stories/DateRangePicker_day',
        '../stories/SingleDatePicker',
        '../stories/SingleDatePicker_input',
        '../stories/SingleDatePicker_calendar',
        '../stories/SingleDatePicker_day',
        '../stories/DayPickerRangeController',
        '../stories/DayPickerSingleDateController',
        '../stories/DayPicker',
        '../stories/PresetDateRangePicker',
    ],
    addons: [
        '@storybook/preset-scss',
        '@storybook/addon-actions/register',
        '@storybook/addon-docs/register',
        '@storybook/addon-links/register',
    ],
}
