import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';

import CalendarMonth from '../../src/components/CalendarMonth';
import DateObj from '../../src/utils/DateObj';

describe('CalendarMonth', () => {
  describe('#render', () => {
    describe('data-visible attribute', () => {
      it('data-visible attribute is truthy if props.isVisible', () => {
        const wrapper = shallow(<CalendarMonth isVisible />).dive();
        expect(wrapper.prop('data-visible')).to.equal(true);
      });

      it('data-visible attribute is falsy if !props.isVisible', () => {
        const wrapper = shallow(<CalendarMonth isVisible={false} />).dive();
        expect(wrapper.prop('data-visible')).to.equal(false);
      });
    });

    describe('caption', () => {
      it('text is the correctly formatted month title', () => {
        const MONTH = new DateObj();
        const captionWrapper = shallow(<CalendarMonth month={MONTH} />).dive().find('strong');
        expect(captionWrapper.text()).to.equal(MONTH.format('MMMM yyyy'));
      });
    });

    it('renderMonthElement renders month element when month changes', () => {
      const renderMonthElementStub = sinon.stub().returns(<div id="month-element" />);
      const wrapper = shallow(<CalendarMonth renderMonthElement={renderMonthElementStub} />).dive();
      wrapper.setProps({ month: new DateObj().subtract(1, 'months') });

      const [{
        month,
        onMonthSelect,
        onYearSelect,
        isVisible,
      }] = renderMonthElementStub.getCall(0).args;

      expect(DateObj.isDate(month)).to.equal(true);
      expect(typeof onMonthSelect).to.equal('function');
      expect(typeof onYearSelect).to.equal('function');
      expect(typeof isVisible).to.equal('boolean');
      expect(wrapper.find('#month-element').exists()).to.equal(true);
    });
  });
});
