import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';
import CalendarMonth from '../../src/components/CalendarMonth';

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

  describe('#shouldComponentUpdate', () => {
    it('isVisible change forces update', () => {
      const props = {
        month: moment('2016-01'),
        isVisible: false,
      };

      const inst = shallow(<CalendarMonth {...props} />).instance();

      expect(inst.shouldComponentUpdate({
        ...inst.props,
        isVisible: true,
      }, inst.state)).to.equal(true);
    });

    it('modifiers change does not force update', () => {
      const props = {
        month: moment('2016-01'),
        modifiers: { blocked: () => false },
      };

      const inst = shallow(<CalendarMonth {...props} />).instance();

      expect(inst.shouldComponentUpdate({
        ...inst.props,
        modifiers: { blocked: () => true },
      }, inst.state)).to.equal(false);
    });
  });

  describe('#isMonthAffected', () => {
    it('hover within month marks as affected', () => {
      const props = {
        month: moment('2016-01'),
      };

      const wrapper = shallow(<CalendarMonth {...props} />);

      expect(wrapper.instance().isMonthAffected({
        ...props,
        hoverDate: moment('2016-01-15'),
      })).to.equal(true);
    });

    it('hover outside month does not mark as affected', () => {
      const props = {
        month: moment('2016-01'),
      };

      const wrapper = shallow(<CalendarMonth {...props} />);

      expect(wrapper.instance().isMonthAffected({
        ...props,
        hoverDate: moment('2016-02-01'),
      })).to.equal(false);
    });

    it('startDate and hoverDate spanning month mark as affected', () => {
      const props = {
        month: moment('2016-06'),
        startDate: moment('2016-05-01'),
      };

      const wrapper = shallow(<CalendarMonth {...props} />);

      expect(wrapper.instance().isMonthAffected({
        ...props,
        hoverDate: moment('2016-07-01'),
      })).to.equal(true);
    });
  });
});
