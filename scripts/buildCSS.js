#!/usr/bin/env node

const fs = require('fs');
const CleanCSS = require('clean-css');

const compileCSS = require('react-with-styles-interface-css-compiler');

const registerMaxSpecificity = require('react-with-styles-interface-css/dist/utils/registerMaxSpecificity').default;
const registerCSSInterfaceWithDefaultTheme = require('../src/utils/registerCSSInterfaceWithDefaultTheme').default;

console.error = msg => { throw new SyntaxError(msg); };
console.warn = msg => { throw new SyntaxError(msg); };

const args = process.argv.slice(2);
const optimizeForProduction = args.includes('-o') || args.includes('--optimize');

registerMaxSpecificity(0);
registerCSSInterfaceWithDefaultTheme();

const path = './scripts/renderAllComponents.jsx';
const CSS = compileCSS(path);

if (CSS === '') {
  throw new Error('Failed to compile CSS');
} else {
  console.log('CSS compilation complete.');
}

const format = new CleanCSS({
  level: optimizeForProduction ? 2 : 0,
  format: 'beautify',
  inline: ['none'],
});
const { styles: formattedCSS } = format.minify(CSS);

const outputFilePath = optimizeForProduction ? './lib/css/_datepicker.css' : './css/styles.css';
fs.writeFileSync(outputFilePath, formattedCSS, 'utf8');
