import { expect } from 'chai';

import calculateDimension from '../../src/utils/calculateDimension';

describe('#calculateDimension', () => {
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

  /* Requires a DOM */
  describe.skip('withMargin false and borderBox true', () => {
    let testElement = null;

    beforeEach(() => {
      testElement = document.createElement('div');

      testElement.style.width = '100px';
      testElement.style.height = '250px';
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
});
