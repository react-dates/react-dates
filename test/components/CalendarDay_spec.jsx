import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';
import raf from 'raf';

import { BLOCKED_MODIFIER } from '../../src/constants';
import CalendarDay, { PureCalendarDay } from '../../src/components/CalendarDay';

describe('CalendarDay', () => {
  afterEach(() => {
    sinon.restore();
  });

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
      const renderDay = (day) => day.format('dddd');
      const wrapper = shallow(<CalendarDay renderDayContents={renderDay} />).dive();
      expect(wrapper.text()).to.equal(dayName);
    });

    it('passes modifiers to renderDayContents', () => {
      const modifiers = new Set([BLOCKED_MODIFIER]);
      const renderDayContents = (day, mods) => `${day.format('dddd')}${mods.has(BLOCKED_MODIFIER) ? 'BLOCKED' : ''}`;
      const expected = `${moment().format('dddd')}BLOCKED`;
      const wrapper = shallow((
        <CalendarDay renderDayContents={renderDayContents} modifiers={modifiers} />
      )).dive();
      expect(wrapper.text()).to.equal(expected);
    });

    it('has button role', () => {
      const wrapper = shallow(<CalendarDay />).dive();
      expect(wrapper.props().role).to.equal('button');
    });

    it('has tabIndex equal to props.tabIndex', () => {
      const tabIndex = -1;
      const wrapper = shallow(<CalendarDay tabIndex={tabIndex} />).dive();
      expect(wrapper.props().tabIndex).to.equal(tabIndex);
    });

    describe('aria-current', () => {
      it('should add aria-current to date for today date', () => {
        const modifiers = new Set(['today']);

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
          />
        )).dive();

        expect(wrapper.prop('aria-current')).to.equal('date');
      });

      it('should not add aria-current for not today date', () => {
        const modifiers = new Set();

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
          />
        )).dive();

        expect(wrapper).to.not.have.property('aria-current');
      });
    });

    describe('aria-label', () => {
      const phrases = {};
      const day = moment('10/10/2017', 'MM/DD/YYYY');

      beforeEach(() => {
        phrases.chooseAvailableDate = sinon.stub().returns('chooseAvailableDate text');
        phrases.dateIsSelected = sinon.stub().returns('dateIsSelected text');
        phrases.dateIsUnavailable = sinon.stub().returns('dateIsUnavailable text');
        phrases.dateIsSelectedAsStartDate = sinon.stub().returns('dateIsSelectedAsStartDate text');
        phrases.dateIsSelectedAsEndDate = sinon.stub().returns('dateIsSelectedAsEndDate text');
      });

      it('is formatted with the chooseAvailableDate phrase function when day is available', () => {
        const modifiers = new Set();

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
            phrases={phrases}
            day={day}
          />
        )).dive();

        expect(wrapper.prop('aria-label')).to.equal('chooseAvailableDate text');
      });

      it('is formatted with the dateIsSelected phrase function when day is selected', () => {
        const modifiers = new Set(['selected']);

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
            phrases={phrases}
            day={day}
          />
        )).dive();

        expect(wrapper.prop('aria-label')).to.equal('dateIsSelected text');
      });

      it('is formatted with the dateIsSelected phrase function when day is selected in a span', () => {
        const modifiers = new Set(['selected-span']);

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
            phrases={phrases}
            day={day}
          />
        )).dive();

        expect(wrapper.prop('aria-label')).to.equal('dateIsSelected text');
      });

      it('is formatted with the dateIsSelectedAsStartDate phrase function when day is selected as the start date', () => {
        const modifiers = new Set().add(BLOCKED_MODIFIER).add('selected-start');

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
            phrases={phrases}
            day={day}
          />
        )).dive();

        expect(wrapper.prop('aria-label')).to.equal('dateIsSelectedAsStartDate text');
      });

      it('is formatted with the dateIsSelectedAsEndDate phrase function when day is selected as the end date', () => {
        const modifiers = new Set().add(BLOCKED_MODIFIER).add('selected-end');

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
            phrases={phrases}
            day={day}
          />
        )).dive();

        expect(wrapper.prop('aria-label')).to.equal('dateIsSelectedAsEndDate text');
      });

      it('is formatted with the dateIsUnavailable phrase function when day is not available', () => {
        const modifiers = new Set([BLOCKED_MODIFIER]);

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
            phrases={phrases}
            day={day}
          />
        )).dive();

        expect(wrapper.prop('aria-label')).to.equal('dateIsUnavailable text');
      });

      it('should set aria-label with a value pass through ariaLabelFormat prop if it exists', () => {
        const modifiers = new Set();

        const wrapper = shallow((
          <CalendarDay
            modifiers={modifiers}
            day={day}
            ariaLabelFormat="MMMM Do YYYY"
          />
        )).dive();

        expect(wrapper.prop('aria-label')).to.equal('October 10th 2017');
      });
    });

    describe('event handlers', () => {
      const day = moment('10/10/2017', 'MM/DD/YYYY');

      let wrapper;
      beforeEach(() => {
        wrapper = shallow((
          <CalendarDay
            day={day}
            ariaLabelFormat="MMMM Do YYYY"
          />
        )).dive();
      });

      it('onMouseUp blurs the event target', () => {
        const handler = wrapper.prop('onMouseUp');
        const blur = sinon.spy();
        handler({ currentTarget: { blur } });
        expect(blur).to.have.property('callCount', 1);
      });

      it('onKeyDown calls this.onKeyDown', () => {
        const spy = sinon.spy(wrapper.instance(), 'onKeyDown');
        const handler = wrapper.prop('onKeyDown');
        const event = {};
        handler(event);
        expect(spy).to.have.property('callCount', 1);
        expect(spy.calledWith(day, event)).to.equal(true);
      });
    });

    it('renders an empty <td> when no day is given', () => {
      const wrapper = shallow(<CalendarDay day={null} />).dive();
      expect(wrapper.is('td')).to.equal(true);
      expect(wrapper.children()).to.have.lengthOf(0);
      expect(wrapper.props()).to.eql({});
    });
  });

  describe('#onKeyDown', () => {
    const day = moment('10/10/2017', 'MM/DD/YYYY');

    let onDayClick;
    let wrapper;
    beforeEach(() => {
      onDayClick = sinon.spy();
      wrapper = shallow((
        <CalendarDay
          day={day}
          onDayClick={onDayClick}
        />
      )).dive();
    });

    it('calls onDayClick with the enter key', () => {
      const event = { key: 'Enter' };
      wrapper.instance().onKeyDown(day, event);
      expect(onDayClick).to.have.property('callCount', 1);
      expect(onDayClick.calledWith(day, event)).to.equal(true);
    });

    it('calls onDayClick with the space key', () => {
      const event = { key: ' ' };
      wrapper.instance().onKeyDown(day, event);
      expect(onDayClick).to.have.property('callCount', 1);
      expect(onDayClick.calledWith(day, event)).to.equal(true);
    });

    it('does not call onDayClick otherwise', () => {
      const event = { key: 'Shift' };
      wrapper.instance().onKeyDown(day, event);
      expect(onDayClick).to.have.property('callCount', 0);
    });
  });

  describe('#componentDidUpdate', () => {
    it('focuses buttonRef after a delay when isFocused and tabIndex is 0', () => {
      const wrapper = shallow(<CalendarDay isFocused tabIndex={0} />).dive();
      const focus = sinon.spy();
      wrapper.instance().buttonRef = { focus };
      wrapper.instance().componentDidUpdate({ isFocused: true, tabIndex: -1 });
      expect(focus.callCount).to.eq(0);

      return new Promise((resolve) => {
        raf(() => {
          expect(focus.callCount).to.eq(1);
          resolve();
        });
      });
    });

    it('does not focus buttonRef when isFocused is false and tabIndex has become 0', () => {
      const wrapper = shallow(<CalendarDay tabIndex={0} />).dive();
      const focus = sinon.spy();
      wrapper.instance().buttonRef = { focus };
      wrapper.instance().componentDidUpdate({ tabIndex: -1 });
      expect(focus.callCount).to.eq(0);

      return new Promise((resolve) => {
        raf(() => {
          expect(focus.callCount).to.eq(0);
          resolve();
        });
      });
    });
  });

  describe('#onDayClick', () => {
    let onDayClickSpy;
    beforeEach(() => {
      onDayClickSpy = sinon.spy(PureCalendarDay.prototype, 'onDayClick');
    });

    it('gets triggered by click', () => {
      const wrapper = shallow(<CalendarDay />).dive();
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

    it('gets triggered by mouseenter', () => {
      const wrapper = shallow(<CalendarDay />).dive();
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

    it('gets triggered by mouseleave', () => {
      const wrapper = shallow(<CalendarDay />).dive();
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
