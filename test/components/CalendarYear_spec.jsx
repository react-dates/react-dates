import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';
import CalendarYear from '../../src/components/CalendarYear';

describe('CalendarYear', () => {
  describe('#render', () => {
    it('is .CalendarYear class', () => {
      const wrapper = shallow(<CalendarYear />);
      expect(wrapper.is('.CalendarYear')).to.equal(true);
    });

    describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
      it('is .CalendarYear--horizontal class', () => {
        const wrapper = shallow(<CalendarYear orientation={HORIZONTAL_ORIENTATION} />);
        expect(wrapper.is('.CalendarYear--horizontal')).to.equal(true);
      });
    });

    describe('props.orientation === VERTICAL_ORIENTATION', () => {
      it('is .CalendarYear--vertical class', () => {
        const wrapper = shallow(<CalendarYear orientation={VERTICAL_ORIENTATION} />);
        expect(wrapper.is('.CalendarYear--vertical')).to.equal(true);
      });
    });

    describe('data-visible attribute', () => {
      it('data-visible attribute is truthy if props.isVisible', () => {
        const wrapper = shallow(<CalendarYear isVisible />);
        expect(wrapper.prop('data-visible')).to.equal(true);
      });

      it('data-visible attribute is falsey if !props.isVisible', () => {
        const wrapper = shallow(<CalendarYear isVisible={false} />);
        expect(wrapper.prop('data-visible')).to.equal(false);
      });
    });

    describe('caption', () => {
      it('.CalendarYear__caption class is present', () => {
        const caption = shallow(<CalendarYear />).find('caption');
        expect(caption.is('.CalendarYear__caption')).to.equal(true);
      });

      it('.js-CalendarYear__caption class is present', () => {
        const caption = shallow(<CalendarYear />).find('caption');
        expect(caption.is('.js-CalendarYear__caption')).to.equal(true);
      });

      it('text is the correctly formatted month title', () => {
        const YEAR = moment();
        const caption = shallow(<CalendarYear year={YEAR} />).find('caption');
        expect(caption.text()).to.equal(YEAR.format('YYYY'));
      });
    });

    describe('calendar grid', () => {
      it('.js-CalendarYear__grid class is present', () => {
        const wrapper = shallow(<CalendarYear />);
        expect(wrapper.find('.js-CalendarYear__grid')).to.have.lengthOf(1);
      });
    });
  });
});
