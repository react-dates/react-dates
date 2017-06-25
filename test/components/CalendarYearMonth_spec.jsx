import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarYearMonth from '../../src/components/CalendarYearMonth';

describe('CalendarYearMonth', () => {
  describe('#render', () => {
    it('is .CalendarYearMonth class', () => {
      const wrapper = shallow(<CalendarYearMonth />);
      expect(wrapper.is('.CalendarYearMonth')).to.equal(true);
    });

    it('has .CalendarYearMonth class', () => {
      const wrapper = shallow(<CalendarYearMonth />);
      expect(wrapper.find('.CalendarYearMonth')).to.have.lengthOf(1);
    });

    it('contains formatted month', () => {
      const actualMonth = moment().startOf('month');
      const wrapper = shallow(<CalendarYearMonth month={actualMonth} />);
      expect(wrapper.text()).to.equal(actualMonth.format('MMMM'));
    });

    it('contains arbitrary content if renderMonth is provided', () => {
      const shortMonthName = moment().format('MMM');
      const renderMonth = month => month.format('MMM');
      const wrapper = shallow(<CalendarYearMonth renderMonth={renderMonth} />);
      expect(wrapper.text()).to.equal(shortMonthName);
    });

    describe('button', () => {
      it('contains a button', () => {
        const wrapper = shallow(<CalendarYearMonth />);
        expect(wrapper.find('button')).to.have.lengthOf(1);
      });

      it('has tabIndex equal to props.tabIndex', () => {
        const tabIndex = -1;
        const wrapper = shallow(<CalendarYearMonth tabIndex={tabIndex} />);
        expect(wrapper.find('button').props().tabIndex).to.equal(tabIndex);
      });
    });
  });

  describe('#onMonthClick', () => {
    let onMonthClickSpy;
    beforeEach(() => {
      onMonthClickSpy = sinon.spy(CalendarYearMonth.prototype, 'onMonthClick');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by click', () => {
      const wrapper = shallow(<CalendarYearMonth />).find('button');
      wrapper.simulate('click');
      expect(onMonthClickSpy).to.have.property('callCount', 1);
    });

    it('calls props.onMonthClick', () => {
      const onMonthClickStub = sinon.stub();
      const wrapper = shallow(<CalendarYearMonth onMonthClick={onMonthClickStub} />);
      wrapper.instance().onMonthClick();
      expect(onMonthClickStub).to.have.property('callCount', 1);
    });
  });

  describe('#onMonthMouseEnter', () => {
    let onMonthMouseEnterSpy;
    beforeEach(() => {
      onMonthMouseEnterSpy = sinon.spy(CalendarYearMonth.prototype, 'onMonthMouseEnter');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseenter', () => {
      const wrapper = shallow(<CalendarYearMonth />).find('button');
      wrapper.simulate('mouseenter');
      expect(onMonthMouseEnterSpy).to.have.property('callCount', 1);
    });

    it('calls props.onMonthMouseEnter', () => {
      const onMouseEnterStub = sinon.stub();
      const wrapper = shallow(<CalendarYearMonth onMonthMouseEnter={onMouseEnterStub} />);
      wrapper.instance().onMonthMouseEnter();
      expect(onMouseEnterStub).to.have.property('callCount', 1);
    });
  });

  describe('#onMonthMouseLeave', () => {
    let onMonthMouseLeaveSpy;
    beforeEach(() => {
      onMonthMouseLeaveSpy = sinon.spy(CalendarYearMonth.prototype, 'onMonthMouseLeave');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseleave', () => {
      const wrapper = shallow(<CalendarYearMonth />).find('button');
      wrapper.simulate('mouseleave');
      expect(onMonthMouseLeaveSpy).to.have.property('callCount', 1);
    });

    it('calls props.onMonthMouseLeave', () => {
      const onMouseLeaveStub = sinon.stub();
      const wrapper = shallow(<CalendarYearMonth onMonthMouseLeave={onMouseLeaveStub} />);
      wrapper.instance().onMonthMouseLeave();
      expect(onMouseLeaveStub).to.have.property('callCount', 1);
    });
  });
});
