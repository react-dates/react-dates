import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../src/constants';
import CalendarMonth, { getModifiersForDay } from '../../src/components/CalendarMonth';

describe('CalendarMonth', () => {
  describe('#render', () => {
    it('is .CalendarMonth class', () => {
      const wrapper = shallow(<CalendarMonth />);
      expect(wrapper.is('.CalendarMonth')).to.equal(true);
    });

    describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
      it('is .CalendarMonth--horizontal class', () => {
        const wrapper = shallow(<CalendarMonth orientation={HORIZONTAL_ORIENTATION} />);
        expect(wrapper.is('.CalendarMonth--horizontal')).to.equal(true);
      });
    });

    describe('props.orientation === VERTICAL_ORIENTATION', () => {
      it('is .CalendarMonth--vertical class', () => {
        const wrapper = shallow(<CalendarMonth orientation={VERTICAL_ORIENTATION} />);
        expect(wrapper.is('.CalendarMonth--vertical')).to.equal(true);
      });
    });

    describe('data-visible attribute', () => {
      it('data-visible attribute is truthy if props.isVisible', () => {
        const wrapper = shallow(<CalendarMonth isVisible />);
        expect(wrapper.prop('data-visible')).to.equal(true);
      });

      it('data-visible attribute is falsey if !props.isVisible', () => {
        const wrapper = shallow(<CalendarMonth isVisible={false} />);
        expect(wrapper.prop('data-visible')).to.equal(false);
      });
    });

    describe('caption', () => {
      it('.CalendarMonth__caption class is present', () => {
        const caption = shallow(<CalendarMonth />).find('caption');
        expect(caption.is('.CalendarMonth__caption')).to.equal(true);
      });

      it('.js-CalendarMonth__caption class is present', () => {
        const caption = shallow(<CalendarMonth />).find('caption');
        expect(caption.is('.js-CalendarMonth__caption')).to.equal(true);
      });

      it('text is the correctly formatted month title', () => {
        const MONTH = moment();
        const caption = shallow(<CalendarMonth month={MONTH} />).find('caption');
        expect(caption.text()).to.equal(MONTH.format('MMMM YYYY'));
      });
    });

    describe('calendar grid', () => {
      it('.js-CalendarMonth__grid class is present', () => {
        const wrapper = shallow(<CalendarMonth />);
        expect(wrapper.find('.js-CalendarMonth__grid')).to.have.lengthOf(1);
      });
    });
  });

  describe('#getModifiersForDay', () => {
    it('returns empty array if day is not passed in', () => {
      const modifierKey = 'foo';
      const modifiers = {};
      modifiers[modifierKey] = () => true;

      const filteredModifiers = getModifiersForDay(modifiers);
      expect(filteredModifiers).to.have.lengthOf(0);
    });

    it('returns key for true modifier', () => {
      const modifierKey = 'foo';
      const modifiers = {};
      modifiers[modifierKey] = () => true;

      const filteredModifiers = getModifiersForDay(modifiers, moment());
      expect(filteredModifiers).to.include(modifierKey);
    });

    it('does not return key for false modifier', () => {
      const modifierKey = 'foo';
      const modifiers = {};
      modifiers[modifierKey] = () => false;

      const filteredModifiers = getModifiersForDay(modifiers, moment());
      expect(filteredModifiers).not.to.include(modifierKey);
    });
  });
});
