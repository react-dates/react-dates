import React from 'react';
import moment from 'moment';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { mount, shallow } from 'enzyme';

import * as isDayVisible from '../../src/utils/isDayVisible';

import DayPicker, { PureDayPicker } from '../../src/components/DayPicker';
import CalendarMonthGrid from '../../src/components/CalendarMonthGrid';
import DayPickerNavigation from '../../src/components/DayPickerNavigation';
import DayPickerKeyboardShortcuts from '../../src/components/DayPickerKeyboardShortcuts';
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../src/constants';

const today = moment();
const event = { preventDefault() {}, stopPropagation() {} };

describe('DayPicker', () => {
  beforeEach(() => {
    sinon.stub(PureDayPicker.prototype, 'adjustDayPickerHeight');
    sinon.stub(PureDayPicker.prototype, 'updateStateAfterMonthTransition');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    describe('renderWeekHeader', () => {
      it('there are 7 elements on each .DayPicker__week-header class', () => {
        const wrapper = shallow(<DayPicker />).dive();
        const weekHeaders = wrapper.find('.DayPicker__week-header');
        weekHeaders.forEach((weekHeader) => {
          expect(weekHeader.find('li')).to.have.lengthOf(7);
        });
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('props.numberOfMonths ul (week header) elements exists', () => {
          const NUM_OF_MONTHS = 3;
          const wrapper = shallow((
            <DayPicker orientation={HORIZONTAL_ORIENTATION} numberOfMonths={NUM_OF_MONTHS} />
          )).dive();
          expect(wrapper.find('ul')).to.have.lengthOf(NUM_OF_MONTHS);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('1 ul (week header) element exists', () => {
          const wrapper = shallow(<DayPicker orientation={VERTICAL_ORIENTATION} />).dive();
          expect(wrapper.find('ul')).to.have.lengthOf(1);
        });
      });
    });

    describe('renderCalendarInfo', () => {
      it('info exists', () => {
        const testInfoClass = 'test-info-container';
        const infoElement = <div className={testInfoClass} />;
        const wrapper = shallow(<DayPicker renderCalendarInfo={() => infoElement} />).dive();
        expect(wrapper.find(`.${testInfoClass}`)).to.have.lengthOf(1);
      });
    });

    describe('CalendarMonthGrid', () => {
      it('component exists', () => {
        const wrapper = shallow(<DayPicker />).dive();
        expect(wrapper.find(CalendarMonthGrid)).to.have.lengthOf(1);
      });

      describe('prop.isAnimating', () => {
        it('is true if state.monthTransition is truthy', () => {
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({ monthTransition: 'foo' });
          const CalendarMonthGridComponent = wrapper.find(CalendarMonthGrid);
          expect(CalendarMonthGridComponent.prop('isAnimating')).to.equal(true);
        });

        it('is false if state.monthTransition is falsy', () => {
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({ monthTransition: null });
          const CalendarMonthGridComponent = wrapper.find(CalendarMonthGrid);
          expect(CalendarMonthGridComponent.prop('isAnimating')).to.equal(false);
        });
      });
    });

    describe('DayPickerKeyboardShortcuts', () => {
      it('component exists if state.isTouchDevice is false and hideKeyboardShortcutsPanel is false', () => {
        const wrapper = shallow(<DayPicker hideKeyboardShortcutsPanel={false} />).dive();
        wrapper.setState({ isTouchDevice: false });
        expect(wrapper.find(DayPickerKeyboardShortcuts)).to.have.lengthOf(1);
      });

      it('component does not exist if isTouchDevice() is true', () => {
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.setState({ isTouchDevice: true });
        expect(wrapper.find(DayPickerKeyboardShortcuts)).to.have.lengthOf(0);
      });

      it('component does not exist if hideKeyboardShortcutsPanel is true', () => {
        const wrapper = shallow(<DayPicker hideKeyboardShortcutsPanel />).dive();
        expect(wrapper.find(DayPickerKeyboardShortcuts)).to.have.lengthOf(0);
      });
    });
  });

  describe('#isHorizontal', () => {
    it('returns true if props.orientation === HORIZONTAL_ORIENTATION', () => {
      const wrapper = shallow(<DayPicker orientation={HORIZONTAL_ORIENTATION} />).dive();
      expect(wrapper.instance().isHorizontal()).to.equal(true);
    });

    it('returns false if props.orientation === VERTICAL_ORIENTATION', () => {
      const wrapper = shallow(
        <DayPicker orientation={VERTICAL_ORIENTATION} />,
        { disableLifecycleMethods: false },
      ).dive();
      expect(wrapper.instance().isHorizontal()).to.equal(false);
    });
  });

  describe('#isVertical', () => {
    it('returns true if props.orientation === VERTICAL_ORIENTATION', () => {
      const wrapper = shallow(
        <DayPicker orientation={VERTICAL_ORIENTATION} />,
        { disableLifecycleMethods: false },
      ).dive();
      expect(wrapper.instance().isVertical()).to.equal(true);
    });

    it('returns false if props.orientation === HORIZONTAL_ORIENTATION', () => {
      const wrapper = shallow(<DayPicker orientation={HORIZONTAL_ORIENTATION} />).dive();
      expect(wrapper.instance().isVertical()).to.equal(false);
    });
  });

  describe('props.orientation === VERTICAL_SCROLLABLE', () => {
    it('uses multiplyScrollableMonths instead of onNextMonthClick', () => {
      const wrapper = shallow(
        <DayPicker orientation={VERTICAL_SCROLLABLE} />,
        { disableLifecycleMethods: false },
      ).dive();
      const nav = wrapper.find(DayPickerNavigation);
      expect(nav.prop('onNextMonthClick')).to.equal(wrapper.instance().multiplyScrollableMonths);
    });
  });

  describe('#onKeyDown', () => {
    describe('focusedDate is truthy', () => {
      it('sets state.withMouseInteractions to false', () => {
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.setState({
          withMouseInteractions: true,
        });
        wrapper.instance().onKeyDown({ ...event });
        expect(wrapper.state().withMouseInteractions).to.equal(false);
      });

      describe('ArrowUp', () => {
        it('calls maybeTransitionPrevMonth', () => {
          const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowUp' });
          expect(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });

        it('arg is 1 week before focusedDate', () => {
          const oneWeekBefore = today.clone().subtract(1, 'week');
          const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowUp' });
          const arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          expect(arg.isSame(oneWeekBefore, 'day')).to.equal(true);
        });
      });

      describe('ArrowLeft', () => {
        it('calls maybeTransitionPrevMonth', () => {
          const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowLeft' });
          expect(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });

        it('arg is 1 day before focusedDate', () => {
          const oneDayBefore = today.clone().subtract(1, 'day');
          const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowLeft' });
          const arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          expect(arg.isSame(oneDayBefore, 'day')).to.equal(true);
        });
      });

      describe('Home', () => {
        it('calls maybeTransitionPrevMonth', () => {
          const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Home' });
          expect(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });

        it('arg is beginning of focusedDate week', () => {
          const startOfWeek = today.clone().startOf('week');
          const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Home' });
          const arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          expect(arg.isSame(startOfWeek, 'day')).to.equal(true);
        });
      });

      describe('PageUp', () => {
        it('calls maybeTransitionPrevMonth', () => {
          const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'PageUp' });
          expect(maybeTransitionPrevMonthSpy.callCount).to.equal(1);
        });

        it('arg is 1 month before focusedDate', () => {
          const oneMonthBefore = today.clone().subtract(1, 'month');
          const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'PageUp' });
          const arg = maybeTransitionPrevMonthSpy.getCall(0).args[0];
          expect(arg.isSame(oneMonthBefore, 'day')).to.equal(true);
        });
      });

      describe('ArrowDown', () => {
        it('calls maybeTransitionNextMonth', () => {
          const maybeTransitionNextMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionNextMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowDown' });
          expect(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });

        it('arg is 1 week after focusedDate', () => {
          const oneWeekAfter = today.clone().add(1, 'week');
          const maybeTransitionNextMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionNextMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowDown' });
          const arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          expect(arg.isSame(oneWeekAfter, 'day')).to.equal(true);
        });
      });

      describe('ArrowRight', () => {
        it('calls maybeTransitionNextMonth', () => {
          const maybeTransitionNextMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionNextMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowRight' });
          expect(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });

        it('arg is 1 day after focusedDate', () => {
          const oneDayAfter = today.clone().add(1, 'day');
          const maybeTransitionNextMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionNextMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowRight' });
          const arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          expect(arg.isSame(oneDayAfter, 'day')).to.equal(true);
        });
      });

      describe('End', () => {
        it('calls maybeTransitionNextMonth', () => {
          const maybeTransitionNextMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionNextMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'End' });
          expect(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });

        it('arg is end of focusedDate week', () => {
          const endOfWeek = today.clone().endOf('week');
          const maybeTransitionNextMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionNextMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'End' });
          const arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          expect(arg.isSame(endOfWeek, 'day')).to.equal(true);
        });
      });

      describe('PageDown', () => {
        it('calls maybeTransitionNextMonth', () => {
          const maybeTransitionNextMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionNextMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'PageDown' });
          expect(maybeTransitionNextMonthSpy.callCount).to.equal(1);
        });

        it('arg is 1 month after focusedDate', () => {
          const oneMonthAfter = today.clone().add(1, 'month');
          const maybeTransitionNextMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionNextMonth');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'PageDown' });
          const arg = maybeTransitionNextMonthSpy.getCall(0).args[0];
          expect(arg.isSame(oneMonthAfter, 'day')).to.equal(true);
        });
      });

      describe('?', () => {
        it('calls openKeyboardShortcutsPanel', () => {
          const openKeyboardShortcutsPanelSpy = sinon.spy(PureDayPicker.prototype, 'openKeyboardShortcutsPanel');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: '?' });
          expect(openKeyboardShortcutsPanelSpy.callCount).to.equal(1);
        });
      });

      describe('Escape', () => {
        it('sets state.showKeyboardShortcuts to false', () => {
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: true,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Escape' });
          expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
        });

        it('calls closeKeyboardShortcutsPanel if state.showKeyboardShortcuts === true', () => {
          const closeKeyboardShortcutsPanelSpy = sinon.stub(PureDayPicker.prototype, 'closeKeyboardShortcutsPanel');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: true,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Escape' });
          expect(closeKeyboardShortcutsPanelSpy.callCount).to.equal(1);
        });

        it('calls props.onBlur if state.showKeyboardShortcuts === false', () => {
          const onBlurStub = sinon.stub();
          const wrapper = shallow(<DayPicker onBlur={onBlurStub} />).dive();
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: false,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Escape' });
          expect(onBlurStub.callCount).to.equal(1);
        });
      });
    });

    describe('focusedDate is falsy', () => {
      it('does not call maybeTransitionPrevMonth', () => {
        const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.setState({
          focusedDate: null,
        });
        wrapper.instance().onKeyDown({ ...event, key: 'ArrowLeft' });
        expect(maybeTransitionPrevMonthSpy.callCount).to.equal(0);
      });

      it('does not call maybeTransitionNextMonth', () => {
        const maybeTransitionPrevMonthSpy = sinon.spy(PureDayPicker.prototype, 'maybeTransitionPrevMonth');
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.setState({
          focusedDate: null,
        });
        wrapper.instance().onKeyDown({ ...event, key: 'ArrowRight' });
        expect(maybeTransitionPrevMonthSpy.callCount).to.equal(0);
      });
    });
  });

  describe('#onPrevMonthClick', () => {
    it('sets state.monthTransition to "prev"', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onPrevMonthClick();
      expect(wrapper.state().monthTransition).to.equal('prev');
    });

    it('sets state.nextFocusedDate to first arg', () => {
      const test = 'FOOBARBAZ';
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onPrevMonthClick(test);
      expect(wrapper.state().nextFocusedDate).to.equal(test);
    });
  });

  describe('#onNextMonthClick', () => {
    it('sets state.monthTransition to "next"', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onNextMonthClick();
      expect(wrapper.state().monthTransition).to.equal('next');
    });

    it('sets state.nextFocusedDate to first arg', () => {
      const test = 'FOOBARBAZ';
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onNextMonthClick(test);
      expect(wrapper.state().nextFocusedDate).to.equal(test);
    });
  });

  describe('#getFocusedDay', () => {
    describe('props.getFirstFocusableDay is truthy', () => {
      it('calls getFirstFocusableDay with arg if exists', () => {
        const getFirstFocusableDayStub = sinon.stub();
        const wrapper = shallow((
          <DayPicker getFirstFocusableDay={getFirstFocusableDayStub} />
        )).dive();
        getFirstFocusableDayStub.reset(); // getFirstFocusableDay gets called in the constructor

        wrapper.instance().getFocusedDay();
        expect(getFirstFocusableDayStub.callCount).to.equal(1);
      });

      it('calls getFirstFocusableDay with arg if exists', () => {
        const getFirstFocusableDayStub = sinon.stub();
        const wrapper = shallow((
          <DayPicker getFirstFocusableDay={getFirstFocusableDayStub} />
        )).dive();
        getFirstFocusableDayStub.reset(); // getFirstFocusableDay gets called in the constructor

        wrapper.instance().getFocusedDay(today);
        expect(getFirstFocusableDayStub.getCall(0).args[0].isSame(today, 'day')).to.equal(true);
      });

      it('returns getFirstFocusableDay() value', () => {
        const getFirstFocusableDayStub = sinon.stub().returns(today);
        const wrapper = shallow((
          <DayPicker getFirstFocusableDay={getFirstFocusableDayStub} />
        )).dive();
        expect(wrapper.instance().getFocusedDay().isSame(today, 'day')).to.equal(true);
      });

      it('returns first day of arg if getFirstFocusableDay returns invisible day', () => {
        const test = moment().add(3, 'months');
        const getFirstFocusableDayStub = sinon.stub().returns(today);
        sinon.stub(isDayVisible, 'default').returns(false);
        const wrapper = shallow((
          <DayPicker getFirstFocusableDay={getFirstFocusableDayStub} />
        )).dive();
        expect(wrapper.instance().getFocusedDay(test).isSame(test.startOf('month'), 'day')).to.equal(true);
      });
    });

    describe('props.getFirstFocusableDay is falsy', () => {
      it('returns undefined if no arg', () => {
        const wrapper = shallow(<DayPicker />).dive();
        expect(wrapper.instance().getFocusedDay()).to.equal(undefined);
      });

      it('returns first day of arg month if exists', () => {
        const test = moment().add(3, 'months');
        const wrapper = shallow(<DayPicker />).dive();
        expect(wrapper.instance().getFocusedDay(test).isSame(test.startOf('month'), 'day')).to.equal(true);
      });
    });
  });

  describe('#maybeTransitionNextMonth', () => {
    describe('arg has same month as state.focusedDate', () => {
      it('does not call `onNextMonthClick`', () => {
        const onNextMonthClickSpy = sinon.spy(PureDayPicker.prototype, 'onNextMonthClick');
        const firstOfTodaysMonth = moment().startOf('month');
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        wrapper.instance().maybeTransitionNextMonth(today);
        expect(onNextMonthClickSpy.callCount).to.equal(0);
      });

      it('returns false', () => {
        const firstOfTodaysMonth = today.clone().startOf('month');
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        expect(wrapper.instance().maybeTransitionNextMonth(today)).to.equal(false);
      });
    });

    describe('arg has different month as state.focusedDate', () => {
      describe('arg is visible', () => {
        it('does not call `onNextMonthClick`', () => {
          const onNextMonthClickSpy = sinon.spy(PureDayPicker.prototype, 'onNextMonthClick');
          sinon.stub(isDayVisible, 'default').returns(true);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionNextMonth(today);
          expect(onNextMonthClickSpy.callCount).to.equal(0);
        });

        it('returns false', () => {
          sinon.stub(isDayVisible, 'default').returns(true);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          expect(wrapper.instance().maybeTransitionNextMonth(today)).to.equal(false);
        });
      });

      describe('arg is not visible', () => {
        it('calls `onNextMonthClick`', () => {
          const onNextMonthClickSpy = sinon.spy(PureDayPicker.prototype, 'onNextMonthClick');
          sinon.stub(isDayVisible, 'default').returns(false);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionNextMonth(today);
          expect(onNextMonthClickSpy.callCount).to.equal(1);
        });

        it('returns true', () => {
          sinon.stub(isDayVisible, 'default').returns(false);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          expect(wrapper.instance().maybeTransitionNextMonth(today)).to.equal(true);
        });
      });
    });
  });

  describe('#maybeTransitionPrevMonth', () => {
    describe('arg has same month as state.focusedDate', () => {
      it('does not call `onPrevMonthClick`', () => {
        const onPrevMonthClickSpy = sinon.spy(PureDayPicker.prototype, 'onPrevMonthClick');
        const firstOfTodaysMonth = moment().startOf('month');
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        wrapper.instance().maybeTransitionPrevMonth(today);
        expect(onPrevMonthClickSpy.callCount).to.equal(0);
      });

      it('returns false', () => {
        const firstOfTodaysMonth = today.clone().startOf('month');
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        expect(wrapper.instance().maybeTransitionPrevMonth(today)).to.equal(false);
      });
    });

    describe('arg has different month as state.focusedDate', () => {
      describe('arg is visible', () => {
        it('does not call `onPrevMonthClick`', () => {
          const onPrevMonthClickSpy = sinon.spy(PureDayPicker.prototype, 'onPrevMonthClick');
          sinon.stub(isDayVisible, 'default').returns(true);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionPrevMonth(today);
          expect(onPrevMonthClickSpy.callCount).to.equal(0);
        });

        it('returns false', () => {
          sinon.stub(isDayVisible, 'default').returns(true);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          expect(wrapper.instance().maybeTransitionPrevMonth(today)).to.equal(false);
        });
      });

      describe('arg is not visible', () => {
        it('calls `onPrevMonthClick`', () => {
          const onPrevMonthClickSpy = sinon.spy(PureDayPicker.prototype, 'onPrevMonthClick');
          sinon.stub(isDayVisible, 'default').returns(false);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionPrevMonth(today);
          expect(onPrevMonthClickSpy.callCount).to.equal(1);
        });

        it('returns true', () => {
          sinon.stub(isDayVisible, 'default').returns(false);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          expect(wrapper.instance().maybeTransitionPrevMonth(today)).to.equal(true);
        });
      });
    });
  });

  describe('#multiplyScrollableMonths', () => {
    it('increments scrollableMonthMultiple', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().multiplyScrollableMonths(event);
      expect(wrapper.state().scrollableMonthMultiple).to.equal(2);
    });

    it('increments scrollableMonthMultiple without an event', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().multiplyScrollableMonths();
      expect(wrapper.state().scrollableMonthMultiple).to.equal(2);
    });
  });

  describe('#openKeyboardShortcutsPanel', () => {
    it('sets state.showKeyboardShortcuts to true', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.setState({
        showKeyboardShortcuts: false,
      });
      wrapper.instance().openKeyboardShortcutsPanel();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(true);
    });

    it('sets state.onKeyboardShortcutsPanelClose to arg', () => {
      const test = 'FOOBARBAZ';
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.setState({
        onKeyboardShortcutsPanelClose: null,
      });
      wrapper.instance().openKeyboardShortcutsPanel(test);
      expect(wrapper.state().onKeyboardShortcutsPanelClose).to.equal(test);
    });
  });

  describe('#closeKeyboardShortcutsPanel', () => {
    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });

    it('sets state.onKeyboardShortcutsPanelClose to null', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
        onKeyboardShortcutsPanelClose: sinon.stub(),
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      expect(wrapper.state().onKeyboardShortcutsPanelClose).to.equal(null);
    });

    it('calls state.onKeyboardShortcutsPanelClose if exists', () => {
      const onKeyboardShortcutsPanelCloseStub = sinon.stub();
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
        onKeyboardShortcutsPanelClose: onKeyboardShortcutsPanelCloseStub,
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      expect(onKeyboardShortcutsPanelCloseStub.callCount).to.equal(1);
    });
  });

  describe.skip('life cycle methods', () => {
    let adjustDayPickerHeightSpy;
    beforeEach(() => {
      adjustDayPickerHeightSpy = sinon.stub(PureDayPicker.prototype, 'adjustDayPickerHeight');
    });

    describe('#componentDidMount', () => {
      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('calls adjustDayPickerHeight', () => {
          mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(adjustDayPickerHeightSpy).to.have.property('callCount', 1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustDayPickerHeight', () => {
          mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          expect(adjustDayPickerHeightSpy.called).to.equal(false);
        });
      });
    });

    describe('#componentDidUpdate', () => {
      let updateStateAfterMonthTransitionSpy;
      beforeEach(() => {
        updateStateAfterMonthTransitionSpy = sinon.stub(
          DayPicker.prototype,
          'updateStateAfterMonthTransition',
        );
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('calls adjustDayPickerHeight if state.monthTransition is truthy', () => {
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: 'foo',
          });
          expect(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });

        it('does not call adjustDayPickerHeight if state.monthTransition is falsy', () => {
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: null,
          });
          expect(adjustDayPickerHeightSpy.calledTwice).to.equal(false);
        });

        it('calls updateStateAfterMonthTransition if state.monthTransition is truthy', () => {
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: 'foo',
          });
          expect(updateStateAfterMonthTransitionSpy).to.have.property('callCount', 1);
        });

        it('does not call updateStateAfterMonthTransition if state.monthTransition is falsy', () => {
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: null,
          });
          expect(updateStateAfterMonthTransitionSpy.calledOnce).to.equal(false);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustDayPickerHeight if state.monthTransition is truthy', () => {
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: 'foo',
          });
          expect(adjustDayPickerHeightSpy.called).to.equal(false);
        });

        it('does not call adjustDayPickerHeight if state.monthTransition is falsy', () => {
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: null,
          });
          expect(adjustDayPickerHeightSpy.called).to.equal(false);
        });

        it('calls updateStateAfterMonthTransition if state.monthTransition is truthy', () => {
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: 'foo',
          });
          expect(updateStateAfterMonthTransitionSpy).to.have.property('callCount', 1);
        });

        it('does not call updateStateAfterMonthTransition if state.monthTransition is falsy', () => {
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: null,
          });
          expect(updateStateAfterMonthTransitionSpy.calledOnce).to.equal(false);
        });
      });

      describe('when isFocused is updated to true', () => {
        const prevProps = { isFocused: false };
        const newProps = { isFocused: true };

        let containerFocusStub;
        let wrapper;

        beforeEach(() => {
          containerFocusStub = sinon.stub();
          wrapper = shallow(<DayPicker {...newProps} />).dive();
          wrapper.instance().container = { focus: containerFocusStub };
        });

        afterEach(() => {
          containerFocusStub.reset();
        });

        describe('when focusedDate is not defined', () => {
          before(() => {
            wrapper.state().focusedDate = undefined;
            wrapper.instance().componentDidUpdate(prevProps);
          });

          it('sets focus on the container', () => {
            expect(containerFocusStub.callCount).to.equal(1);
          });
        });

        describe('when focusedDate is defined', () => {
          before(() => {
            wrapper.state().focusedDate = moment();
            wrapper.instance().componentDidUpdate(prevProps);
          });

          it('should not set focus on the container', () => {
            expect(containerFocusStub.notCalled).to.equal(true);
          });
        });
      });
    });
  });
});
