import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import calculateDimension from '../../src/utils/calculateDimension';

describe.only('#calculateDimension', () => {
  it('returns 0 for an empty element', () => {
    expect(calculateDimension(null, 'width')).to.equal(0);
    expect(calculateDimension(null, 'width', false)).to.equal(0);
    expect(calculateDimension(null, 'width', true)).to.equal(0);
  });

  describe('borderBox true', () => {
    const el = {
      offsetWidth: 17,
      offsetHeight: 42,
    };

    it('returns el.offsetWidth for "width"', () => {
      expect(calculateDimension(el, 'width', true)).to.equal(el.offsetWidth);
    });

    it('returns el.offsetHeight for "height"', () => {
      expect(calculateDimension(el, 'height', true)).to.equal(el.offsetHeight);
    });
  });

  /* Requires a DOM that correctly returns window.getComputedStyle() styles */
  describe.skip('withMargin false and borderBox true', () => {
    let testElement = null;

    beforeEach(() => {
      testElement = document.createElement('div');

      testElement.style.offsetWidth = '100px';
      testElement.style.offsetHeight = '250px';
      testElement.style.padding = '15px 10px';
      testElement.style.border = '1px solid red';
      testElement.style.margin = '3px 6px 5px 2px';
      testElement.boxSizing = 'border-box';
    });

    it('calculates border-box height', () => {
      expect(calculateDimension(testElement, 'height', true)).to.equal(282);
    });

    it('calculates border-box height with margin', () => {
      expect(calculateDimension(testElement, 'height', true, true)).to.equal(290);
    });

    it('calculates border-box width', () => {
      expect(calculateDimension(testElement, 'width', true)).to.equal(122);
    });

    it('calculates border-box width with margin', () => {
      expect(calculateDimension(testElement, 'width', true, true)).to.equal(130);
    });

    it('calculates content-box height', () => {
      expect(calculateDimension(testElement, 'height')).to.equal(250);
    });

    it('calculates content-box height with margin', () => {
      expect(calculateDimension(testElement, 'height', false, true)).to.equal(258);
    });

    it('calculates content-box width', () => {
      expect(calculateDimension(testElement, 'width')).to.equal(100);
    });

    it('calculates content-box width with margin', () => {
      expect(calculateDimension(testElement, 'width', false, true)).to.equal(108);
    });
  });

  // https://github.com/airbnb/react-dates/issues/1426
  describe('withMargin false and borderBox true when style properties are absent', () => {
    let testElement = null;

    jsdom({
      url: "http://localhost"
    })

    beforeEach(() => {
      testElement = document.createElement('div');
    });

    it.only('does not return NaN', () => {
      expect(calculateDimension(testElement, 'height')).not.NaN;
    });

    it.only('does not return NaN with border box and no margin', () => {
      expect(calculateDimension(testElement, 'height', true)).not.NaN;
    });

    it.only('does not return NaN with border box and margin', () => {
      expect(calculateDimension(testElement, 'height', true, true)).not.NaN;
    });

    it.only('does not return NaN with margin and no border box', () => {
      expect(calculateDimension(testElement, 'height', false, true)).not.NaN;
    });
  });
});
