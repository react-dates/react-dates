import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import { BLOCKED_MODIFIER } from '../../src/constants';
import CustomizableCalendarDay, { PureCustomizableCalendarDay } from '../../src/components/CustomizableCalendarDay';

describe('CustomizableCalendarDay', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    it('contains formatted day for single digit days', () => {
      const firstOfMonth = moment().startOf('month');
      const wrapper = shallow(<CustomizableCalendarDay day={firstOfMonth} />).dive();
      expect(wrapper.text()).to.equal(firstOfMonth.format('D'));
    });

    it('contains formatted day for double digit days', () => {
      const lastOfMonth = moment().endOf('month');
      const wrapper = shallow(<CustomizableCalendarDay day={lastOfMonth} />).dive();
      expect(wrapper.text()).to.equal(lastOfMonth.format('D'));
    });

    it('contains arbitrary content if renderDay is provided', () => {
      const dayName = moment().format('dddd');
      const renderDay = day => day.format('dddd');
      const wrapper = shallow(<CustomizableCalendarDay renderDayContents={renderDay} />).dive();
      expect(wrapper.text()).to.equal(dayName);
    });

    it('passes modifiers to renderDay', () => {
      const modifiers = new Set().add(BLOCKED_MODIFIER);
      const renderDay = (day, mods) => `${day.format('dddd')}${mods.has(BLOCKED_MODIFIER) ? 'BLOCKED' : ''}`;
      const expected = `${moment().format('dddd')}BLOCKED`;
      const wrapper = shallow(<CustomizableCalendarDay
        renderDayContents={renderDay}
        modifiers={modifiers}
      />).dive();
      expect(wrapper.text()).to.equal(expected);
    });

    it('has button role', () => {
      const wrapper = shallow(<CustomizableCalendarDay />).dive();
      expect(wrapper.props().role).to.equal('button');
    });

    it('has tabIndex equal to props.tabIndex', () => {
      const tabIndex = -1;
      const wrapper = shallow(<CustomizableCalendarDay tabIndex={tabIndex} />).dive();
      expect(wrapper.props().tabIndex).to.equal(tabIndex);
    });

    describe('aria-label', () => {
      const phrases = {};
      const day = moment('10/10/2017');
      const expectedFormattedDay = { date: 'Tuesday, October 10, 2017' };

      beforeEach(() => {
        phrases.chooseAvailableDate = sinon.stub().returns('chooseAvailableDate text');
        phrases.dateIsUnavailable = sinon.stub().returns('dateIsUnavailable text');
      });

      it('is formatted with the chooseAvailableDate phrase function when day is available', () => {
        const modifiers = new Set();

        const wrapper = shallow(<CustomizableCalendarDay
          modifiers={modifiers}
          phrases={phrases}
          day={day}
        />).dive();

        expect(phrases.chooseAvailableDate.calledWith(expectedFormattedDay)).to.equal(true);
        expect(wrapper.prop('aria-label')).to.equal('chooseAvailableDate text');
      });

      it('is formatted with the dateIsUnavailable phrase function when day is not available', () => {
        const modifiers = new Set().add(BLOCKED_MODIFIER);

        const wrapper = shallow(<CustomizableCalendarDay
          modifiers={modifiers}
          phrases={phrases}
          day={day}
        />).dive();

        expect(phrases.dateIsUnavailable.calledWith(expectedFormattedDay)).to.equal(true);
        expect(wrapper.prop('aria-label')).to.equal('dateIsUnavailable text');
      });

      it('should set aria-label with a value pass through ariaLabelFormat prop if it exists', () => {
        const modifiers = new Set();

        const wrapper = shallow((
          <CustomizableCalendarDay
            modifiers={modifiers}
            day={day}
            ariaLabelFormat="MMMM Do YYYY"
          />
        )).dive();

        expect(wrapper.prop('aria-label')).to.equal('October 10th 2017');
      });
    });

    describe('event handlers', () => {
      const day = moment('10/10/2017');

      let wrapper;
      beforeEach(() => {
        wrapper = shallow((
          <CustomizableCalendarDay
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
      const wrapper = shallow(<CustomizableCalendarDay day={null} />).dive();
      expect(wrapper.is('td')).to.equal(true);
      expect(wrapper.children()).to.have.lengthOf(0);
      expect(wrapper.props()).to.eql({});
    });
  });

  describe('#onKeyDown', () => {
    const day = moment('10/10/2017');

    let onDayClick;
    let wrapper;
    beforeEach(() => {
      onDayClick = sinon.spy();
      wrapper = shallow((
        <CustomizableCalendarDay
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

  describe('#onDayClick', () => {
    let onDayClickSpy;
    beforeEach(() => {
      onDayClickSpy = sinon.spy(PureCustomizableCalendarDay.prototype, 'onDayClick');
    });

    it('gets triggered by click', () => {
      const wrapper = shallow(<CustomizableCalendarDay />).dive();
      wrapper.simulate('click');
      expect(onDayClickSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayClick', () => {
      const onDayClickStub = sinon.stub();
      const wrapper = shallow(<CustomizableCalendarDay onDayClick={onDayClickStub} />).dive();
      wrapper.instance().onDayClick();
      expect(onDayClickStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseEnter', () => {
    let onDayMouseEnterSpy;
    beforeEach(() => {
      onDayMouseEnterSpy = sinon.spy(PureCustomizableCalendarDay.prototype, 'onDayMouseEnter');
    });

    it('gets triggered by mouseenter', () => {
      const wrapper = shallow(<CustomizableCalendarDay />).dive();
      wrapper.simulate('mouseenter');
      expect(onDayMouseEnterSpy).to.have.property('callCount', 1);
    });

    it('sets state.isHovered to false', () => {
      const wrapper = shallow(<CustomizableCalendarDay />).dive();
      wrapper.setState({ isHovered: false });
      wrapper.instance().onDayMouseEnter();
      expect(wrapper.state().isHovered).to.equal(true);
    });

    it('calls props.onDayMouseEnter', () => {
      const onMouseEnterStub = sinon.stub();
      const wrapper = shallow(<CustomizableCalendarDay
        onDayMouseEnter={onMouseEnterStub}
      />).dive();
      wrapper.instance().onDayMouseEnter();
      expect(onMouseEnterStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseLeave', () => {
    let onDayMouseLeaveSpy;
    beforeEach(() => {
      onDayMouseLeaveSpy = sinon.spy(PureCustomizableCalendarDay.prototype, 'onDayMouseLeave');
    });

    it('gets triggered by mouseleave', () => {
      const wrapper = shallow(<CustomizableCalendarDay />).dive();
      wrapper.simulate('mouseleave');
      expect(onDayMouseLeaveSpy).to.have.property('callCount', 1);
    });

    it('sets state.isHovered to false', () => {
      const wrapper = shallow(<CustomizableCalendarDay />).dive();
      wrapper.setState({ isHovered: true });
      wrapper.instance().onDayMouseLeave();
      expect(wrapper.state().isHovered).to.equal(false);
    });

    it('calls props.onDayMouseLeave', () => {
      const onMouseLeaveStub = sinon.stub();
      const wrapper = shallow(<CustomizableCalendarDay
        onDayMouseLeave={onMouseLeaveStub}
      />).dive();
      wrapper.instance().onDayMouseLeave();
      expect(onMouseLeaveStub).to.have.property('callCount', 1);
    });
  });
});
