import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarDay from '../../src/components/CalendarDay';

describe('CalendarDay', () => {
  describe('#render', () => {
    it('is .CalendarDay class', () => {
      const wrapper = shallow(<CalendarDay />);
      expect(wrapper.is('.CalendarDay')).to.equal(true);
    });

    it('has .CalendarDay class', () => {
      const wrapper = shallow(<CalendarDay />);
      expect(wrapper.find('.CalendarDay')).to.have.lengthOf(1);
    });

    it('contains formatted day for single digit days', () => {
      const firstOfMonth = moment().startOf('month');
      const wrapper = shallow(<CalendarDay day={firstOfMonth} />);
      expect(wrapper.text()).to.equal(firstOfMonth.format('D'));
    });

    it('contains formatted day for double digit days', () => {
      const lastOfMonth = moment().endOf('month');
      const wrapper = shallow(<CalendarDay day={lastOfMonth} />);
      expect(wrapper.text()).to.equal(lastOfMonth.format('D'));
    });

    it('contains arbitrary content if renderDay is provided', () => {
      const dayName = moment().format('dddd');
      const renderDay = day => day.format('dddd');
      const wrapper = shallow(<CalendarDay renderDay={renderDay} />);
      expect(wrapper.text()).to.equal(dayName);
    });

    describe('button', () => {
      it('contains a button', () => {
        const wrapper = shallow(<CalendarDay />);
        expect(wrapper.find('button')).to.have.lengthOf(1);
      });

      it('has tabIndex equal to props.tabIndex', () => {
        const tabIndex = -1;
        const wrapper = shallow(<CalendarDay tabIndex={tabIndex} />);
        expect(wrapper.find('button').props().tabIndex).to.equal(tabIndex);
      });
    });
  });

  describe('#onDayClick', () => {
    let onDayClickSpy;
    beforeEach(() => {
      onDayClickSpy = sinon.spy(CalendarDay.prototype, 'onDayClick');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by click', () => {
      const wrapper = shallow(<CalendarDay />).find('button');
      wrapper.simulate('click');
      expect(onDayClickSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayClick', () => {
      const onDayClickStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayClick={onDayClickStub} />);
      wrapper.instance().onDayClick();
      expect(onDayClickStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseEnter', () => {
    let onDayMouseEnterSpy;
    beforeEach(() => {
      onDayMouseEnterSpy = sinon.spy(CalendarDay.prototype, 'onDayMouseEnter');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseenter', () => {
      const wrapper = shallow(<CalendarDay />).find('button');
      wrapper.simulate('mouseenter');
      expect(onDayMouseEnterSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseEnter', () => {
      const onMouseEnterStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseEnter={onMouseEnterStub} />);
      wrapper.instance().onDayMouseEnter();
      expect(onMouseEnterStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseLeave', () => {
    let onDayMouseLeaveSpy;
    beforeEach(() => {
      onDayMouseLeaveSpy = sinon.spy(CalendarDay.prototype, 'onDayMouseLeave');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseleave', () => {
      const wrapper = shallow(<CalendarDay />).find('button');
      wrapper.simulate('mouseleave');
      expect(onDayMouseLeaveSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseLeave', () => {
      const onMouseLeaveStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseLeave={onMouseLeaveStub} />);
      wrapper.instance().onDayMouseLeave();
      expect(onMouseLeaveStub).to.have.property('callCount', 1);
    });
  });
});
