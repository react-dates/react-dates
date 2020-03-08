import React from 'react';
import moment from 'moment/min/moment-with-locales';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { mount, shallow } from 'enzyme';

import * as isDayVisible from '../../src/utils/isDayVisible';
import isSameMonth from '../../src/utils/isSameMonth';

import DayPicker, { PureDayPicker } from '../../src/components/DayPicker';
import CalendarMonthGrid from '../../src/components/CalendarMonthGrid';
import DayPickerNavigation from '../../src/components/DayPickerNavigation';
import DayPickerKeyboardShortcuts from '../../src/components/DayPickerKeyboardShortcuts';
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  NAV_POSITION_BOTTOM,
} from '../../src/constants';


const today = moment().locale('en');
const event = { preventDefault() {}, stopPropagation() {} };

describe('DayPicker', () => {
  beforeEach(() => {
    sinon.stub(PureDayPicker.prototype, 'adjustDayPickerHeight');
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

      describe('props.renderWeekHeaderElement', () => {
        it('there are 7 custom elements on each .DayPicker__week-header class', () => {
          const testWeekHeaderClassName = 'test-week-header';
          const wrapper = shallow(
            <DayPicker
              renderWeekHeaderElement={
                (day) => (<strong className={testWeekHeaderClassName}>{day}</strong>)
              }
            />,
          ).dive();
          const weekHeaders = wrapper.find('.DayPicker__week-header');
          weekHeaders.forEach((weekHeader) => {
            expect(weekHeader.find(`.${testWeekHeaderClassName}`)).to.have.lengthOf(7);
          });
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

    describe('DayPickerNavigation', () => {
      it('is rendered before CalendarMonthGrid in DayPicker_focusRegion', () => {
        const wrapper = shallow(<DayPicker />).dive();
        expect(wrapper.find(DayPickerNavigation)).to.have.lengthOf(1);
        expect(
          wrapper
            .find('[className^="DayPicker_focusRegion"]')
            .childAt(0)
            .type(),
        ).to.equal(DayPickerNavigation);
      });

      describe('navPosition === NAV_POSITION_BOTTOM', () => {
        it('is rendered after CalendarMonthGrid in DayPicker_focusRegion', () => {
          const wrapper = shallow(<DayPicker navPosition={NAV_POSITION_BOTTOM} />).dive();
          expect(wrapper.find(DayPickerNavigation)).to.have.lengthOf(1);
          expect(
            wrapper
              .find('[className^="DayPicker_focusRegion"]')
              .childAt(1)
              .type(),
          ).to.equal(DayPickerNavigation);
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

      it('component exists with custom button render function if renderKeyboardShortcutsButton is passed down', () => {
        const testRenderKeyboardShortcutsButton = () => {};
        const wrapper = shallow(
          <DayPicker renderKeyboardShortcutsButton={testRenderKeyboardShortcutsButton} />,
        ).dive();
        const dayPickerKeyboardShortcuts = wrapper.find(DayPickerKeyboardShortcuts);
        expect(dayPickerKeyboardShortcuts).to.have.lengthOf(1);
        expect(dayPickerKeyboardShortcuts.prop('renderKeyboardShortcutsButton'))
          .to
          .eql(testRenderKeyboardShortcutsButton);
      });

      it('component exists with custom panel render function if renderKeyboardShortcutsPanel is passed down', () => {
        const testRenderKeyboardShortcutsPanel = () => {};
        const wrapper = shallow(
          <DayPicker renderKeyboardShortcutsPanel={testRenderKeyboardShortcutsPanel} />,
        ).dive();
        const dayPickerKeyboardShortcuts = wrapper.find(DayPickerKeyboardShortcuts);
        expect(dayPickerKeyboardShortcuts).to.have.lengthOf(1);
        expect(dayPickerKeyboardShortcuts.prop('renderKeyboardShortcutsPanel'))
          .to
          .eql(testRenderKeyboardShortcutsPanel);
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
    it('renders two DayPickerNavigations', () => {
      const wrapper = shallow(
        <DayPicker orientation={VERTICAL_SCROLLABLE} />,
        { disableLifecycleMethods: false },
      ).dive();
      expect(wrapper.find(DayPickerNavigation)).to.have.length(2);
    });

    it('uses getNextScrollableMonths instead of onNextMonthClick', () => {
      const wrapper = shallow(
        <DayPicker orientation={VERTICAL_SCROLLABLE} />,
        { disableLifecycleMethods: false },
      ).dive();
      expect(wrapper.find(DayPickerNavigation)).to.have.length(2);
      const nav = wrapper.find(DayPickerNavigation).get(1);
      expect(nav.props.onNextMonthClick).to.equal(wrapper.instance().getNextScrollableMonths);
    });

    it('uses getPrevScrollableMonths instead of onNextMonthClick', () => {
      const wrapper = shallow(
        <DayPicker orientation={VERTICAL_SCROLLABLE} />,
        { disableLifecycleMethods: false },
      ).dive();
      expect(wrapper.find(DayPickerNavigation)).to.have.length(2);
      const nav = wrapper.find(DayPickerNavigation).get(0);
      expect(nav.props.onPrevMonthClick).to.equal(wrapper.instance().getPrevScrollableMonths);
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

      describe('Tab', () => {
        it('triggers onShiftTab when shift tab is pressed', () => {
          const onTabStub = sinon.stub();
          const onShiftTabStub = sinon.stub();
          const wrapper = shallow(
            <DayPicker onTab={onTabStub} onShiftTab={onShiftTabStub} />,
          ).dive();
          wrapper.setState({ focusedDate: today });
          wrapper.instance().onKeyDown({ ...event, key: 'Tab', shiftKey: true });
          expect(onTabStub.callCount).to.equal(0);
          expect(onShiftTabStub.callCount).to.equal(1);
        });

        it('triggers onTab', () => {
          const onTabStub = sinon.stub();
          const onShiftTabStub = sinon.stub();
          const wrapper = shallow(
            <DayPicker onTab={onTabStub} onShiftTab={onShiftTabStub} />,
          ).dive();
          wrapper.setState({ focusedDate: today });
          wrapper.instance().onKeyDown({ ...event, key: 'Tab' });
          expect(onTabStub.callCount).to.equal(1);
          expect(onShiftTabStub.callCount).to.equal(0);
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

  describe('#onMonthChange', () => {
    it('sets state.monthTransition to "month_selection"', () => {
      const wrapper = shallow(<DayPicker />).dive();
      const date = moment();
      wrapper.instance().onMonthChange(date);
      expect(wrapper.state().monthTransition).to.equal('month_selection');
    });

    it('sets state.nextFocusedDate to passed in date', () => {
      const wrapper = shallow(<DayPicker />).dive();
      const date = moment();
      wrapper.instance().onMonthChange(date);
      expect(wrapper.state().nextFocusedDate).to.equal(date);
    });

    it('sets state.currentMonth to passed in month', () => {
      const wrapper = shallow(<DayPicker />).dive();
      const date = moment();
      wrapper.instance().onMonthChange(date);
      expect(wrapper.state().currentMonth).to.equal(date);
    });
  });

  describe('#onYearChange', () => {
    it('sets state.yearTransition to "year_selection"', () => {
      const wrapper = shallow(<DayPicker />).dive();
      const date = moment();
      wrapper.instance().onYearChange(date);
      expect(wrapper.state().monthTransition).to.equal('year_selection');
    });

    it('sets state.nextFocusedDate to passed in date', () => {
      const wrapper = shallow(<DayPicker />).dive();
      const date = moment();
      wrapper.instance().onYearChange(date);
      expect(wrapper.state().nextFocusedDate).to.equal(date);
    });

    it('sets state.currentMonth to passed in year', () => {
      const wrapper = shallow(<DayPicker />).dive();
      const date = moment();
      wrapper.instance().onYearChange(date);
      expect(wrapper.state().currentMonth).to.equal(date);
    });
  });

  describe('#onPrevMonthClick', () => {
    it('calls onPrevMonthTransition', () => {
      const onPrevMonthTransitionSpy = sinon.spy(PureDayPicker.prototype, 'onPrevMonthTransition');
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onPrevMonthClick();
      expect(onPrevMonthTransitionSpy.callCount).to.equal(1);
    });
  });

  describe('#onPrevMonthTransition', () => {
    it('sets state.monthTransition to "prev"', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onPrevMonthTransition();
      expect(wrapper.state().monthTransition).to.equal('prev');
    });

    it('sets state.nextFocusedDate to first arg', () => {
      const test = 'FOOBARBAZ';
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onPrevMonthTransition(test);
      expect(wrapper.state().nextFocusedDate).to.equal(test);
    });
  });

  describe('#onNextMonthClick', () => {
    it('calls onNextMonthTransition', () => {
      const onNextMonthTransitionSpy = sinon.spy(PureDayPicker.prototype, 'onNextMonthTransition');
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onNextMonthClick();
      expect(onNextMonthTransitionSpy.callCount).to.equal(1);
    });
  });

  describe('#onNextMonthTransition', () => {
    it('sets state.monthTransition to "next"', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onNextMonthTransition();
      expect(wrapper.state().monthTransition).to.equal('next');
    });

    it('sets state.nextFocusedDate to first arg', () => {
      const test = 'FOOBARBAZ';
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().onNextMonthTransition(test);
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
        // getFirstFocusableDay gets called in the constructor
        getFirstFocusableDayStub.resetHistory();

        wrapper.instance().getFocusedDay();
        expect(getFirstFocusableDayStub.callCount).to.equal(1);
      });

      it('calls getFirstFocusableDay with arg if exists', () => {
        const getFirstFocusableDayStub = sinon.stub();
        const wrapper = shallow((
          <DayPicker getFirstFocusableDay={getFirstFocusableDayStub} />
        )).dive();
        // getFirstFocusableDay gets called in the constructor
        getFirstFocusableDayStub.resetHistory();

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
      it('does not call `onNextMonthTransition`', () => {
        const onNextMonthTransitionSpy = sinon.spy(PureDayPicker.prototype, 'onNextMonthTransition');
        const firstOfTodaysMonth = moment().startOf('month');
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        wrapper.instance().maybeTransitionNextMonth(today);
        expect(onNextMonthTransitionSpy.callCount).to.equal(0);
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
          const onNextMonthTransitionSpy = sinon.spy(PureDayPicker.prototype, 'onNextMonthTransition');
          sinon.stub(isDayVisible, 'default').returns(true);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionNextMonth(today);
          expect(onNextMonthTransitionSpy.callCount).to.equal(0);
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
        it('calls `onNextMonthTransition`', () => {
          const onNextMonthTransitionSpy = sinon.spy(PureDayPicker.prototype, 'onNextMonthTransition');
          sinon.stub(isDayVisible, 'default').returns(false);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionNextMonth(today);
          expect(onNextMonthTransitionSpy.callCount).to.equal(1);
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
      it('does not call `onPrevMonthTransition`', () => {
        const onPrevMonthTransitionSpy = sinon.spy(PureDayPicker.prototype, 'onPrevMonthTransition');
        const firstOfTodaysMonth = moment().startOf('month');
        const wrapper = shallow(<DayPicker />).dive();
        wrapper.state().focusedDate = firstOfTodaysMonth;
        wrapper.instance().maybeTransitionPrevMonth(today);
        expect(onPrevMonthTransitionSpy.callCount).to.equal(0);
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
        it('does not call `onPrevMonthTransition`', () => {
          const onPrevMonthTransitionSpy = sinon.spy(PureDayPicker.prototype, 'onPrevMonthTransition');
          sinon.stub(isDayVisible, 'default').returns(true);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionPrevMonth(today);
          expect(onPrevMonthTransitionSpy.callCount).to.equal(0);
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
        it('calls `onPrevMonthTransition`', () => {
          const onPrevMonthTransitionSpy = sinon.spy(PureDayPicker.prototype, 'onPrevMonthTransition');
          sinon.stub(isDayVisible, 'default').returns(false);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<DayPicker />).dive();
          wrapper.state().focusedDate = nextMonth;
          wrapper.instance().maybeTransitionPrevMonth(today);
          expect(onPrevMonthTransitionSpy.callCount).to.equal(1);
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

  describe('#getNextScrollableMonths', () => {
    it('increments scrollableMonthMultiple', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().getNextScrollableMonths(event);
      expect(wrapper.state().scrollableMonthMultiple).to.equal(2);
    });
  });

  describe('#getPrevScrollableMonths', () => {
    it('increments scrollableMonthMultiple and updates currentMonth', () => {
      const wrapper = shallow(<DayPicker />).dive();
      wrapper.instance().getPrevScrollableMonths();
      expect(wrapper.state().scrollableMonthMultiple).to.equal(2);
      expect(isSameMonth(wrapper.state().currentMonth, moment().subtract(2, 'month'))).to.equal(true);
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

  describe('#weekHeaderNames', () => {
    it('returns weekheaders in fr', () => {
      const INITIAL_MONTH = moment().locale('fr');
      const wrapper = shallow(<DayPicker initialVisibleMonth={() => INITIAL_MONTH} />).dive();
      const instance = wrapper.instance();
      expect(instance.getWeekHeaders()).to.be.eql(INITIAL_MONTH.localeData().weekdaysMin());
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

        it('does not update state.currentMonthScrollTop', () => {
          sinon.spy(DayPicker.prototype, 'setTransitionContainerRef');
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(wrapper.state().currentMonthScrollTop).to.equal(null);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustDayPickerHeight', () => {
          mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          expect(adjustDayPickerHeightSpy.called).to.equal(false);
        });

        it('does not update state.currentMonthScrollTop', () => {
          sinon.spy(DayPicker.prototype, 'setTransitionContainerRef');
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          expect(wrapper.state().currentMonthScrollTop).to.equal(null);
        });
      });

      describe('props.orientation === VERTICAL_SCROLLABLE', () => {
        it('updates state.currentMonthScrollTop', () => {
          sinon.spy(DayPicker.prototype, 'setTransitionContainerRef');
          const wrapper = mount(<DayPicker orientation={VERTICAL_SCROLLABLE} />);
          expect(wrapper.state().currentMonthScrollTop).to.not.equal(null);
        });
      });
    });

    describe('#componentWillReceiveProps', () => {
      describe('props.orientation === VERTICAL_SCROLLABLE', () => {
        it('updates state.currentMonthScrollTop', () => {
          sinon.spy(DayPicker.prototype, 'setTransitionContainerRef');
          const wrapper = mount(<DayPicker orientation={VERTICAL_SCROLLABLE} />);
          const prevCurrentMonthScrollTop = wrapper.state().currentMonthScrollTop;
          wrapper.setState({
            currentMonth: moment().subtract(1, 'months'),
          });
          wrapper.setProps({ initialVisibleMonth: () => moment().subtract(1, 'month') });
          expect(wrapper.state().currentMonthScrollTop).to.not.equal(prevCurrentMonthScrollTop);
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

        it('calls adjustDayPickerHeight if orientation has changed from HORIZONTAL_ORIENTATION to VERTICAL_ORIENTATION', () => {
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            orientation: VERTICAL_ORIENTATION,
          });
          expect(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });

        it('calls adjustDayPickerHeight if daySize has changed', () => {
          const wrapper = mount(<DayPicker daySize={39} orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            daySize: 40,
            orientation: HORIZONTAL_ORIENTATION,
          });
          expect(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
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

        it('calls adjustDayPickerHeight if orientation has changed from VERTICAL_ORIENTATION to HORIZONTAL_ORIENTATION', () => {
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            orientation: HORIZONTAL_ORIENTATION,
          });
          expect(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });

        it('calls adjustDayPickerHeight if daySize has changed', () => {
          const wrapper = mount(<DayPicker daySize={39} orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            daySize: 40,
            orientation: VERTICAL_ORIENTATION,
          });
          expect(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
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

      describe('props.orientation === VERTICAL_SCROLLABLE', () => {
        it('does not update transitionContainer ref`s scrollTop currentMonth stays the same', () => {
          sinon.spy(DayPicker.prototype, 'setTransitionContainerRef');
          const wrapper = mount(<DayPicker orientation={VERTICAL_SCROLLABLE} />);
          const prevScrollTop = wrapper.transitionContainer.scrollTop;
          wrapper.setState({
            currentMonth: moment(),
          });
          expect(wrapper.transitionContainer).to.have.property('scrollTop', prevScrollTop);
        });

        it('updates transitionContainer ref`s scrollTop currentMonth changes', () => {
          sinon.spy(DayPicker.prototype, 'setTransitionContainerRef');
          const wrapper = mount(<DayPicker orientation={VERTICAL_SCROLLABLE} />);
          const prevScrollTop = wrapper.transitionContainer.scrollTop;
          wrapper.setState({
            currentMonth: moment().subtract(1, 'months'),
          });
          expect(wrapper.transitionContainer).to.not.have.property('scrollTop', prevScrollTop);
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
          containerFocusStub.resetHistory();
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
