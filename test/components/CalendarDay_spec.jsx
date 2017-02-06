import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarDay, { getModifiersForDay } from '../../src/components/CalendarDay';

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
      const wrapper = shallow(<CalendarDay />);
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
      const wrapper = shallow(<CalendarDay />);
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
      const wrapper = shallow(<CalendarDay />);
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
