#!/usr/bin/env node

const fs = require('fs');
const CleanCSS = require('clean-css');

const compileCSS = require('react-with-styles-interface-css-compiler');

const registerMaxSpecificity = require('react-with-styles-interface-css/dist/utils/registerMaxSpecificity').default;
const registerCSSInterfaceWithDefaultTheme = require('../src/utils/registerCSSInterfaceWithDefaultTheme').default;

const args = process.argv.slice(2);
const optimizeForProduction = args.includes('-o') || args.includes('--optimize');

require('../test/_helpers/ignoreSVGStrings');

registerMaxSpecificity(0);
registerCSSInterfaceWithDefaultTheme();

const DateRangePickerPath = './examples/DateRangePickerWrapper.jsx';
const SingleDatePickerPath = './examples/SingleDatePickerWrapper.jsx';
const PresetDateRangePickerPath = './examples/PresetDateRangePicker.jsx';

const dateRangePickerCSS = compileCSS(DateRangePickerPath);
const singleDatePickerCSS = compileCSS(SingleDatePickerPath);
const presetDatePickerCSS = compileCSS(PresetDateRangePickerPath);
const CSS = dateRangePickerCSS + singleDatePickerCSS + presetDatePickerCSS;

const format = new CleanCSS({
  level: optimizeForProduction ? 2 : 0,
  format: 'beautify',
  inline: ['none'],
});
const { styles: formattedCSS } = format.minify(CSS);

const outputFilePath = optimizeForProduction ? './lib/css/_datepicker.css' : './css/styles.css';
fs.writeFileSync(outputFilePath, formattedCSS, 'utf8');
