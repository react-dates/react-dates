#!/usr/bin/env node

const fs = require('fs');
const CleanCSS = require('clean-css');

const CSSInterface = require('react-with-styles-interface-css').default;
const registerMaxSpecificity = require('react-with-styles-interface-css').registerMaxSpecificity;
const compileCSS = require('react-with-styles-interface-css/compile').default;

const registerInterfaceWithDefaultTheme = require('../src/utils/registerInterfaceWithDefaultTheme').default;

const args = process.argv.slice(2);
const optimizeForProduction = args.includes('-o') || args.includes('--optimize');

require('../test/_helpers/ignoreSVGStrings');

registerMaxSpecificity(11);
registerInterfaceWithDefaultTheme(CSSInterface);

const DateRangePickerPath = './src/components/DateRangePicker.jsx';
const SingleDatePickerPath = './src/components/SingleDatePicker.jsx';

const dateRangePickerCSS = compileCSS(DateRangePickerPath);
const singleDatePickerCSS = compileCSS(SingleDatePickerPath);
const CSS = dateRangePickerCSS + singleDatePickerCSS;

const format = new CleanCSS({
  level: optimizeForProduction ? 2 : 0,
  format: 'beautify',
  inline: ['none'],
});
const { styles: formattedCSS } = format.minify(CSS);

const outputFilePath = optimizeForProduction ? './lib/css/_datepicker.css' : './css/styles.css';
fs.writeFileSync(outputFilePath, formattedCSS, 'utf8');
