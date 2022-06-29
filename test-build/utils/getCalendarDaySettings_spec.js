"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _getCalendarDaySettings = _interopRequireDefault(require("../../lib/utils/getCalendarDaySettings"));

var _constants = require("../../lib/constants");

var testDay = (0, _moment["default"])('10/10/2017', 'MM/DD/YYYY');
var expectedFormattedDay = {
  date: 'Tuesday, October 10, 2017'
};
var testAriaLabelFormat = 'dddd, LL';
var testDaySize = 39;
var testModifiers = new Set();
var testPhrases = {
  chooseAvailableDate: _sinonSandbox["default"].stub(),
  dateIsSelected: _sinonSandbox["default"].stub(),
  dateIsUnavailable: _sinonSandbox["default"].stub(),
  dateIsSelectedAsStartDate: _sinonSandbox["default"].stub(),
  dateIsSelectedAsEndDate: _sinonSandbox["default"].stub()
};
describe('getCalendarDaySettings', function () {
  describe('daySizeStyles', function () {
    var _getCalendarDaySettin = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, testModifiers, testPhrases),
        daySizeStyles = _getCalendarDaySettin.daySizeStyles;

    it('includes width equal to daySize', function () {
      (0, _chai.expect)(daySizeStyles.width).to.equal(testDaySize);
    });
    it('includes height equal to daySize - 1', function () {
      (0, _chai.expect)(daySizeStyles.height).to.equal(testDaySize - 1);
    });
  });
  describe('useDefaultCursor', function () {
    it('should be true when day is some kind of blocked', function () {
      var blockedModifiers = new Set(['blocked-minimum-nights', 'blocked-calendar', 'blocked-out-of-range']);
      blockedModifiers.forEach(function (blockedModifier) {
        var modifiers = new Set([blockedModifier]);

        var _getCalendarDaySettin2 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
            useDefaultCursor = _getCalendarDaySettin2.useDefaultCursor;

        (0, _chai.expect)(useDefaultCursor).to.equal(true);
      });
    });
    it('should be false when day is not blocked', function () {
      var modifiers = new Set(['some-kind-of-not-blocked']);

      var _getCalendarDaySettin3 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
          useDefaultCursor = _getCalendarDaySettin3.useDefaultCursor;

      (0, _chai.expect)(useDefaultCursor).to.equal(false);
    });
  });
  describe('selected', function () {
    it('should be true when day is some kind of selected', function () {
      var selectedModifiers = new Set(['selected', 'selected-start', 'selected-end']);
      selectedModifiers.forEach(function (selectedModifier) {
        var modifiers = new Set([selectedModifier]);

        var _getCalendarDaySettin4 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
            selected = _getCalendarDaySettin4.selected;

        (0, _chai.expect)(selected).to.equal(true);
      });
    });
    it('should be false when day is not selected', function () {
      var modifiers = new Set(['some-kind-of-not-selected']);

      var _getCalendarDaySettin5 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
          selected = _getCalendarDaySettin5.selected;

      (0, _chai.expect)(selected).to.equal(false);
    });
  });
  describe('hoveredSpan', function () {
    it('should be true when day is not selected and hovered-span', function () {
      var modifiers = new Set(['hovered-span']);

      var _getCalendarDaySettin6 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
          hoveredSpan = _getCalendarDaySettin6.hoveredSpan;

      (0, _chai.expect)(hoveredSpan).to.equal(true);
    });
    it('should be true when day is not selected and after-hovered-start', function () {
      var modifiers = new Set(['hovered-span']);

      var _getCalendarDaySettin7 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
          hoveredSpan = _getCalendarDaySettin7.hoveredSpan;

      (0, _chai.expect)(hoveredSpan).to.equal(true);
    });
    it('should be false when day is some kind of selected', function () {
      var selectedModifiers = new Set(['selected', 'selected-start', 'selected-end']);
      selectedModifiers.forEach(function (selectedModifier) {
        var modifiers = new Set([selectedModifier]);

        var _getCalendarDaySettin8 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
            hoveredSpan = _getCalendarDaySettin8.hoveredSpan;

        (0, _chai.expect)(hoveredSpan).to.equal(false);
      });
    });
  });
  describe('isOutsideRange', function () {
    it('should be true when blocked-out-of-range', function () {
      var modifiers = new Set(['blocked-out-of-range']);

      var _getCalendarDaySettin9 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
          isOutsideRange = _getCalendarDaySettin9.isOutsideRange;

      (0, _chai.expect)(isOutsideRange).to.equal(true);
    });
    it('should be false when not blocked-out-of-range', function () {
      var modifiers = new Set();

      var _getCalendarDaySettin10 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, testPhrases),
          isOutsideRange = _getCalendarDaySettin10.isOutsideRange;

      (0, _chai.expect)(isOutsideRange).to.equal(false);
    });
  });
  describe('ariaLabel', function () {
    var phrases = {};
    beforeEach(function () {
      phrases.chooseAvailableDate = _sinonSandbox["default"].stub().returns('chooseAvailableDate text');
      phrases.dateIsSelected = _sinonSandbox["default"].stub().returns('dateIsSelected text');
      phrases.dateIsUnavailable = _sinonSandbox["default"].stub().returns('dateIsUnavailable text');
      phrases.dateIsSelectedAsStartDate = _sinonSandbox["default"].stub().returns('dateIsSelectedAsStartDate text');
      phrases.dateIsSelectedAsEndDate = _sinonSandbox["default"].stub().returns('dateIsSelectedAsEndDate text');
    });
    afterEach(function () {
      _sinonSandbox["default"].restore();
    });
    it('is formatted with the chooseAvailableDate phrase function when day is available', function () {
      var modifiers = new Set();

      var _getCalendarDaySettin11 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, phrases),
          ariaLabel = _getCalendarDaySettin11.ariaLabel;

      (0, _chai.expect)(phrases.chooseAvailableDate.calledWith(expectedFormattedDay)).to.equal(true);
      (0, _chai.expect)(ariaLabel).to.equal('chooseAvailableDate text');
    });
    it('is formatted with the dateIsSelected phrase function when day is selected', function () {
      var modifiers = new Set(['selected']);

      var _getCalendarDaySettin12 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, phrases),
          ariaLabel = _getCalendarDaySettin12.ariaLabel;

      (0, _chai.expect)(phrases.dateIsSelected.calledWith(expectedFormattedDay)).to.equal(true);
      (0, _chai.expect)(ariaLabel).to.equal('dateIsSelected text');
    });
    it('is formatted with the dateIsSelectedAsStartDate phrase function when day is selected as the start date', function () {
      var modifiers = new Set().add(_constants.BLOCKED_MODIFIER).add('selected-start');

      var _getCalendarDaySettin13 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, phrases),
          ariaLabel = _getCalendarDaySettin13.ariaLabel;

      (0, _chai.expect)(phrases.dateIsSelectedAsStartDate.calledWith(expectedFormattedDay)).to.equal(true);
      (0, _chai.expect)(ariaLabel).to.equal('dateIsSelectedAsStartDate text');
    });
    it('is formatted with the dateIsSelectedAsEndDate phrase function when day is selected as the end date', function () {
      var modifiers = new Set().add(_constants.BLOCKED_MODIFIER).add('selected-end');

      var _getCalendarDaySettin14 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, phrases),
          ariaLabel = _getCalendarDaySettin14.ariaLabel;

      (0, _chai.expect)(phrases.dateIsSelectedAsEndDate.calledWith(expectedFormattedDay)).to.equal(true);
      (0, _chai.expect)(ariaLabel).to.equal('dateIsSelectedAsEndDate text');
    });
    it('is formatted with the dateIsSelected phrase function when day is selected as the start or end date and no selected start or end date phrase function is specified', function () {
      phrases.dateIsSelectedAsStartDate = null;
      phrases.dateIsSelectedAsEndDate = null;
      var selectedModifiers = new Set(['selected-end', 'selected-start']);
      selectedModifiers.forEach(function (selectedModifier) {
        var modifiers = new Set([selectedModifier]);

        var _getCalendarDaySettin15 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, phrases),
            ariaLabel = _getCalendarDaySettin15.ariaLabel;

        (0, _chai.expect)(phrases.dateIsSelected.calledWith(expectedFormattedDay)).to.equal(true);
        (0, _chai.expect)(ariaLabel).to.equal('dateIsSelected text');
      });
    });
    it('is formatted with the dateIsUnavailable phrase function when day is not available', function () {
      var modifiers = new Set().add(_constants.BLOCKED_MODIFIER);

      var _getCalendarDaySettin16 = (0, _getCalendarDaySettings["default"])(testDay, testAriaLabelFormat, testDaySize, modifiers, phrases),
          ariaLabel = _getCalendarDaySettin16.ariaLabel;

      (0, _chai.expect)(phrases.dateIsUnavailable.calledWith(expectedFormattedDay)).to.equal(true);
      (0, _chai.expect)(ariaLabel).to.equal('dateIsUnavailable text');
    });
  });
});