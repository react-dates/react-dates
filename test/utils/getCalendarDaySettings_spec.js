import moment from 'moment';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';

import getCalendarDaySettings from '../../src/utils/getCalendarDaySettings';
import { BLOCKED_MODIFIER } from '../../src/constants';

const testDay = moment('10/10/2017');
const expectedFormattedDay = { date: 'Tuesday, October 10, 2017' };
const testAriaLabelFormat = 'dddd, LL';
const testDaySize = 39;
const testModifiers = new Set();
const testPhrases = {
  chooseAvailableDate: sinon.stub(),
  dateIsSelected: sinon.stub(),
  dateIsUnavailable: sinon.stub(),
};

describe('getCalendarDaySettings', () => {
  describe('daySizeStyles', () => {
    const { daySizeStyles } = getCalendarDaySettings(
      testDay,
      testAriaLabelFormat,
      testDaySize,
      testModifiers,
      testPhrases,
    );

    it('includes width equal to daySize', () => {
      expect(daySizeStyles.width).to.equal(testDaySize);
    });

    it('includes height equal to daySize - 1', () => {
      expect(daySizeStyles.height).to.equal(testDaySize - 1);
    });
  });

  describe('useDefaultCursor', () => {
    it('should be true when day is some kind of blocked', () => {
      const blockedModifiers = new Set([
        'blocked-minimum-nights',
        'blocked-calendar',
        'blocked-out-of-range',
      ]);

      blockedModifiers.forEach((blockedModifier) => {
        const modifiers = new Set([blockedModifier]);
        const { useDefaultCursor } = getCalendarDaySettings(
          testDay,
          testAriaLabelFormat,
          testDaySize,
          modifiers,
          testPhrases,
        );
        expect(useDefaultCursor).to.equal(true);
      });
    });

    it('should be false when day is not blocked', () => {
      const modifiers = new Set(['some-kind-of-not-blocked']);
      const { useDefaultCursor } = getCalendarDaySettings(
        testDay,
        testAriaLabelFormat,
        testDaySize,
        modifiers,
        testPhrases,
      );
      expect(useDefaultCursor).to.equal(false);
    });
  });

  describe('selected', () => {
    it('should be true when day is some kind of selected', () => {
      const selectedModifiers = new Set([
        'selected',
        'selected-start',
        'selected-end',
      ]);

      selectedModifiers.forEach((selectedModifier) => {
        const modifiers = new Set([selectedModifier]);
        const { selected } = getCalendarDaySettings(
          testDay,
          testAriaLabelFormat,
          testDaySize,
          modifiers,
          testPhrases,
        );
        expect(selected).to.equal(true);
      });
    });

    it('should be false when day is not selected', () => {
      const modifiers = new Set(['some-kind-of-not-selected']);
      const { selected } = getCalendarDaySettings(
        testDay,
        testAriaLabelFormat,
        testDaySize,
        modifiers,
        testPhrases,
      );
      expect(selected).to.equal(false);
    });
  });

  describe('hoveredSpan', () => {
    it('should be true when day is not selected and hovered-span', () => {
      const modifiers = new Set(['hovered-span']);
      const { hoveredSpan } = getCalendarDaySettings(
        testDay,
        testAriaLabelFormat,
        testDaySize,
        modifiers,
        testPhrases,
      );
      expect(hoveredSpan).to.equal(true);
    });

    it('should be true when day is not selected and after-hovered-start', () => {
      const modifiers = new Set(['hovered-span']);
      const { hoveredSpan } = getCalendarDaySettings(
        testDay,
        testAriaLabelFormat,
        testDaySize,
        modifiers,
        testPhrases,
      );
      expect(hoveredSpan).to.equal(true);
    });

    it('should be false when day is some kind of selected', () => {
      const selectedModifiers = new Set([
        'selected',
        'selected-start',
        'selected-end',
      ]);

      selectedModifiers.forEach((selectedModifier) => {
        const modifiers = new Set([selectedModifier]);
        const { hoveredSpan } = getCalendarDaySettings(
          testDay,
          testAriaLabelFormat,
          testDaySize,
          modifiers,
          testPhrases,
        );
        expect(hoveredSpan).to.equal(false);
      });
    });
  });

  describe('isOutsideRange', () => {
    it('should be true when blocked-out-of-range', () => {
      const modifiers = new Set(['blocked-out-of-range']);
      const { isOutsideRange } = getCalendarDaySettings(
        testDay,
        testAriaLabelFormat,
        testDaySize,
        modifiers,
        testPhrases,
      );
      expect(isOutsideRange).to.equal(true);
    });

    it('should be false when not blocked-out-of-range', () => {
      const modifiers = new Set();
      const { isOutsideRange } = getCalendarDaySettings(
        testDay,
        testAriaLabelFormat,
        testDaySize,
        modifiers,
        testPhrases,
      );
      expect(isOutsideRange).to.equal(false);
    });
  });

  describe('ariaLabel', () => {
    const phrases = {};

    beforeEach(() => {
      phrases.chooseAvailableDate = sinon.stub().returns('chooseAvailableDate text');
      phrases.dateIsSelected = sinon.stub().returns('dateIsSelected text');
      phrases.dateIsUnavailable = sinon.stub().returns('dateIsUnavailable text');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('is formatted with the chooseAvailableDate phrase function when day is available', () => {
      const modifiers = new Set();

      const { ariaLabel } = getCalendarDaySettings(
        testDay,
        testAriaLabelFormat,
        testDaySize,
        modifiers,
        phrases,
      );

      expect(phrases.chooseAvailableDate.calledWith(expectedFormattedDay)).to.equal(true);
      expect(ariaLabel).to.equal('chooseAvailableDate text');
    });

    it('is formatted with the dateIsSelected phrase function when day is selected', () => {
      const selectedModifiers = new Set(['selected', 'selected-start', 'selected-end']);

      selectedModifiers.forEach((selectedModifier) => {
        const modifiers = new Set().add(selectedModifier);

        const { ariaLabel } = getCalendarDaySettings(
          testDay,
          testAriaLabelFormat,
          testDaySize,
          modifiers,
          phrases,
        );

        expect(phrases.dateIsSelected.calledWith(expectedFormattedDay)).to.equal(true);
        expect(ariaLabel).to.equal('dateIsSelected text');
      });
    });

    it('is formatted with the dateIsUnavailable phrase function when day is not available', () => {
      const modifiers = new Set().add(BLOCKED_MODIFIER);

      const { ariaLabel } = getCalendarDaySettings(
        testDay,
        testAriaLabelFormat,
        testDaySize,
        modifiers,
        phrases,
      );

      expect(phrases.dateIsUnavailable.calledWith(expectedFormattedDay)).to.equal(true);
      expect(ariaLabel).to.equal('dateIsUnavailable text');
    });
  });
});
