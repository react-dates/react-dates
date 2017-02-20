import wrap from 'mocha-wrap';
import withGlobal from 'mocha-wrap/withGlobal';
import withOverride from 'mocha-wrap/withOverride';

function withTouchSupport() {
  return this
    .use(withGlobal, 'window', () => (typeof window !== 'undefined' ? window : {}))
    .use(withOverride, () => window, 'ontouchstart', () => window.ontouchstart || (() => {}))
    .use(withGlobal, 'navigator', () => (typeof navigator !== 'undefined' ? navigator : {}))
    .use(withOverride, () => navigator, 'maxTouchPoints', () => navigator.maxTouchPoints || true);
}

wrap.register(withTouchSupport);
