import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import { BLOCKED_MODIFIER } from '../../src/constants';
import CalendarDay, { PureCalendarDay } from '../../src/components/CalendarDay';

describe('CalendarDay', () => {
  describe('#render', () => {
    it('contains formatted day for single digit days', () => {
      const firstOfMonth = moment().startOf('month');
      const wrapper = shallow(<CalendarDay day={firstOfMonth} />).dive();
      expect(wrapper.text()).to.equal(firstOfMonth.format('D'));
    });

    it('contains formatted day for double digit days', () => {
      const lastOfMonth = moment().endOf('month');
      const wrapper = shallow(<CalendarDay day={lastOfMonth} />).dive();
      expect(wrapper.text()).to.equal(lastOfMonth.format('D'));
    });

    it('contains arbitrary content if renderDay is provided', () => {
      const dayName = moment().format('dddd');
      const renderDay = day => day.format('dddd');
      const wrapper = shallow(<CalendarDay renderDay={renderDay} />).dive();
      expect(wrapper.text()).to.equal(dayName);
    });

    it('passes modifiers to renderDay', () => {
      const modifiers = new Set().add(BLOCKED_MODIFIER);
      const renderDay = (day, mods) => `${day.format('dddd')}${mods.has(BLOCKED_MODIFIER) ? 'BLOCKED' : ''}`;
      const expected = `${moment().format('dddd')}BLOCKED`;
      const wrapper = shallow(<CalendarDay renderDay={renderDay} modifiers={modifiers} />).dive();
      expect(wrapper.text()).to.equal(expected);
    });

    describe('button', () => {
      it('contains a button', () => {
        const wrapper = shallow(<CalendarDay />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(1);
      });

      it('has tabIndex equal to props.tabIndex', () => {
        const tabIndex = -1;
        const wrapper = shallow(<CalendarDay tabIndex={tabIndex} />).dive();
        expect(wrapper.find('button').props().tabIndex).to.equal(tabIndex);
      });

      describe('aria-label', () => {
        const phrases = {};
        const day = moment('10/10/2017');
        const expectedFormattedDay = { date: 'Tuesday, October 10, 2017' };

        beforeEach(() => {
          phrases.chooseAvailableDate = sinon.stub().returns('chooseAvailableDate text');
          phrases.dateIsUnavailable = sinon.stub().returns('dateIsUnavailable text');
        });

        afterEach(() => {
          sinon.restore();
        });

        it('is formatted with the chooseAvailableDate phrase function when day is available', () => {
          const modifiers = new Set();

          const wrapper = shallow(<CalendarDay
            modifiers={modifiers}
            phrases={phrases}
            day={day}
          />).dive();

          expect(phrases.chooseAvailableDate.calledWith(expectedFormattedDay)).to.equal(true);
          expect(wrapper.find('button').prop('aria-label')).to.equal('chooseAvailableDate text');
        });

        it('is formatted with the dateIsUnavailable phrase function when day is not available', () => {
          const modifiers = new Set().add(BLOCKED_MODIFIER);

          const wrapper = shallow(<CalendarDay
            modifiers={modifiers}
            phrases={phrases}
            day={day}
          />).dive();

          expect(phrases.dateIsUnavailable.calledWith(expectedFormattedDay)).to.equal(true);
          expect(wrapper.find('button').prop('aria-label')).to.equal('dateIsUnavailable text');
        });

        it('should set aria-label with a value pass through ariaLabelFormat prop if it exists', () => {
          const modifiers = new Set();

          const wrapper = shallow(<CalendarDay
            modifiers={modifiers}
            day={day}
            ariaLabelFormat="MMMM Do YYYY"
          />).dive();

          expect(wrapper.find('button').prop('aria-label')).to.equal('October 10th 2017');
        });
      });
    });
  });

  describe('#onDayClick', () => {
    let onDayClickSpy;
    beforeEach(() => {
      onDayClickSpy = sinon.spy(PureCalendarDay.prototype, 'onDayClick');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by click', () => {
      const wrapper = shallow(<CalendarDay />).dive().find('button');
      wrapper.simulate('click');
      expect(onDayClickSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayClick', () => {
      const onDayClickStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayClick={onDayClickStub} />).dive();
      wrapper.instance().onDayClick();
      expect(onDayClickStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseEnter', () => {
    let onDayMouseEnterSpy;
    beforeEach(() => {
      onDayMouseEnterSpy = sinon.spy(PureCalendarDay.prototype, 'onDayMouseEnter');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseenter', () => {
      const wrapper = shallow(<CalendarDay />).dive().find('button');
      wrapper.simulate('mouseenter');
      expect(onDayMouseEnterSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseEnter', () => {
      const onMouseEnterStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseEnter={onMouseEnterStub} />).dive();
      wrapper.instance().onDayMouseEnter();
      expect(onMouseEnterStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseLeave', () => {
    let onDayMouseLeaveSpy;
    beforeEach(() => {
      onDayMouseLeaveSpy = sinon.spy(PureCalendarDay.prototype, 'onDayMouseLeave');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseleave', () => {
      const wrapper = shallow(<CalendarDay />).dive().find('button');
      wrapper.simulate('mouseleave');
      expect(onDayMouseLeaveSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseLeave', () => {
      const onMouseLeaveStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseLeave={onMouseLeaveStub} />).dive();
      wrapper.instance().onDayMouseLeave();
      expect(onMouseLeaveStub).to.have.property('callCount', 1);
    });
  });
});
