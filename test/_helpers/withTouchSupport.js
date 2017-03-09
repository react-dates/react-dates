const wrap = require('mocha-wrap');
const withGlobal = require('mocha-wrap/withGlobal');
const withOverride = require('mocha-wrap/withOverride');

function withTouchSupport() {
  return this
    .use(withGlobal, 'window', () => (typeof window !== 'undefined' ? window : {}))
    .use(withOverride, () => window, 'ontouchstart', () => window.ontouchstart || (() => {}))
    .use(withGlobal, 'navigator', () => (typeof navigator !== 'undefined' ? navigator : {}))
    .use(withOverride, () => navigator, 'maxTouchPoints', () => navigator.maxTouchPoints || true);
}

wrap.register(withTouchSupport);
