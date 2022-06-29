"use strict";

var wrap = require('mocha-wrap');

var withGlobal = require('mocha-wrap/withGlobal');

var withOverride = require('mocha-wrap/withOverride');

function withTouchSupport() {
  return this.use(withGlobal, 'window', function () {
    return typeof window !== 'undefined' ? window : {};
  }).use(withOverride, function () {
    return window;
  }, 'ontouchstart', function () {
    return window.ontouchstart || function () {};
  }).use(withGlobal, 'navigator', function () {
    return typeof navigator !== 'undefined' ? navigator : {};
  }).use(withOverride, function () {
    return navigator;
  }, 'maxTouchPoints', function () {
    return navigator.maxTouchPoints || true;
  });
}

wrap.register(withTouchSupport);