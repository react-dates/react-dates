import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { mount, shallow } from 'enzyme';
import wrap from 'mocha-wrap';

import * as isMonthVisible from '../../src/utils/isMonthVisible';

import MonthPicker, { calculateDimension } from '../../src/components/MonthPicker';
import CalendarYearGrid from '../../src/components/CalendarYearGrid';
import MonthPickerNavigation from '../../src/components/MonthPickerNavigation';
import MonthPickerKeyboardShortcuts from '../../src/components/MonthPickerKeyboardShortcuts';
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

const today = moment();
const event = { preventDefault() {}, stopPropagation() {} };

describe('MonthPicker', () => {
  beforeEach(() => {
    sinon.stub(MonthPicker.prototype, 'adjustMonthPickerHeight');
    sinon.stub(MonthPicker.prototype, 'updateStateAfterYearTransition');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    describe('transitionContainer', () => {
      it('.transition-container class exists', () => {
        const wrapper = shallow(<MonthPicker />);
        expect(wrapper.find('.transition-container')).to.have.lengthOf(1);
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('.transition-container--horizontal class exists', () => {
          const wrapper = shallow(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(wrapper.find('.transition-container--horizontal')).to.have.lengthOf(1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('.transition-container--vertical class exists', () => {
          const wrapper = shallow(
            <MonthPicker orientation={VERTICAL_ORIENTATION} />,
            { lifecycleExperimental: true },
          );
          expect(wrapper.find('.transition-container--vertical')).to.have.lengthOf(1);
        });
      });
    });

    describe('renderCalendarInfo', () => {
      it('info exists', () => {
        const testInfoClass = 'test-info-container';
        const infoElement = <div className={testInfoClass} />;
        const wrapper = shallow(<MonthPicker renderCalendarInfo={() => infoElement} />);
        expect(wrapper.find(`.${testInfoClass}`)).to.have.lengthOf(1);
      });
    });

    describe('CalendarYearGrid', () => {
      it('component exists', () => {
        const wrapper = shallow(<MonthPicker />);
        expect(wrapper.find(CalendarYearGrid)).to.have.lengthOf(1);
      });

      describe('prop.isAnimating', () => {
        it('is true if state.yearTransition is truthy', () => {
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({ yearTransition: 'foo' });
          const CalendarYearGridComponent = wrapper.find(CalendarYearGrid);
          expect(CalendarYearGridComponent.prop('isAnimating')).to.equal(true);
        });

        it('is false if state.yearTransition is falsey', () => {
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({ yearTransition: null });
          const CalendarYearGridComponent = wrapper.find(CalendarYearGrid);
          expect(CalendarYearGridComponent.prop('isAnimating')).to.equal(false);
        });
      });
    });

    describe('MonthPickerKeyboardShortcuts', () => {
      it('component exists if state.isTouchDevice is false and hideKeyboardShortcutsPanel is false', () => {
        const wrapper = shallow(<MonthPicker hideKeyboardShortcutsPanel={false} />);
        wrapper.setState({ isTouchDevice: false });
        expect(wrapper.find(MonthPickerKeyboardShortcuts)).to.have.lengthOf(1);
      });

      it('component does not exist if isTouchDevice() is true', () => {
        const wrapper = shallow(<MonthPicker />);
        wrapper.setState({ isTouchDevice: true });
        expect(wrapper.find(MonthPickerKeyboardShortcuts)).to.have.lengthOf(0);
      });

      it('component does not exist if hideKeyboardShortcutsPanel is true', () => {
        const wrapper = shallow(<MonthPicker hideKeyboardShortcutsPanel />);
        expect(wrapper.find(MonthPickerKeyboardShortcuts)).to.have.lengthOf(0);
      });
    });
  });

  describe('#isHorizontal', () => {
    it('returns true if props.orientation === HORIZONTAL_ORIENTATION', () => {
      const wrapper = shallow(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.instance().isHorizontal()).to.equal(true);
    });

    it('returns false if props.orientation === VERTICAL_ORIENTATION', () => {
      const wrapper = shallow(
        <MonthPicker orientation={VERTICAL_ORIENTATION} />,
        { lifecycleExperimental: true },
      );
      expect(wrapper.instance().isHorizontal()).to.equal(false);
    });
  });

  describe('#isVertical', () => {
    it('returns true if props.orientation === VERTICAL_ORIENTATION', () => {
      const wrapper = shallow(
        <MonthPicker orientation={VERTICAL_ORIENTATION} />,
        { lifecycleExperimental: true },
      );
      expect(wrapper.instance().isVertical()).to.equal(true);
    });

    it('returns false if props.orientation === HORIZONTAL_ORIENTATION', () => {
      const wrapper = shallow(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.instance().isVertical()).to.equal(false);
    });
  });

  describe('props.orientation === VERTICAL_SCROLLABLE', () => {
    it('uses multiplyScrollableYears instead of onNextYearClick', () => {
      const wrapper = shallow(
        <MonthPicker orientation={VERTICAL_SCROLLABLE} />,
        { lifecycleExperimental: true },
      );
      const nav = wrapper.find(MonthPickerNavigation);
      expect(nav.prop('onNextYearClick')).to.equal(wrapper.instance().multiplyScrollableYears);
    });
  });

  describe('#onKeyDown', () => {
    describe('focusedDate is truthy', () => {
      beforeEach(() => {
        sinon.stub(MonthPicker.prototype, 'translateFirstMonthPickerForAnimation');
      });

      it('sets state.withMouseInteractions to false', () => {
        const wrapper = shallow(<MonthPicker />);
        wrapper.setState({
          withMouseInteractions: true,
        });
        wrapper.instance().onKeyDown({ ...event });
        expect(wrapper.state().withMouseInteractions).to.equal(false);
      });

      describe('ArrowUp', () => {
        it('calls maybeTransitionPrevYear', () => {
          const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowUp' });
          expect(maybeTransitionPrevYearSpy.callCount).to.equal(1);
        });

        it('arg is 3 months before focusedDate', () => {
          const threeMonthsBefore = today.clone().subtract(3, 'month');
          const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowUp' });
          const arg = maybeTransitionPrevYearSpy.getCall(0).args[0];
          expect(arg.isSame(threeMonthsBefore, 'month')).to.equal(true);
        });
      });

      describe('ArrowLeft', () => {
        it('calls maybeTransitionPrevYear', () => {
          const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowLeft' });
          expect(maybeTransitionPrevYearSpy.callCount).to.equal(1);
        });

        it('arg is 1 month before focusedDate', () => {
          const oneMonthBefore = today.clone().subtract(1, 'month');
          const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowLeft' });
          const arg = maybeTransitionPrevYearSpy.getCall(0).args[0];
          expect(arg.isSame(oneMonthBefore, 'month')).to.equal(true);
        });
      });

      describe('Home', () => {
        it('calls maybeTransitionPrevYear', () => {
          const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Home' });
          expect(maybeTransitionPrevYearSpy.callCount).to.equal(1);
        });

        it('arg is beginning of year', () => {
          const startOfYear = today.clone().startOf('year');
          const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Home' });
          const arg = maybeTransitionPrevYearSpy.getCall(0).args[0];
          expect(arg.isSame(startOfYear, 'monthday')).to.equal(true);
        });
      });

      describe('PageUp', () => {
        it('calls maybeTransitionPrevYear', () => {
          const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'PageUp' });
          expect(maybeTransitionPrevYearSpy.callCount).to.equal(1);
        });

        it('arg is 1 year before focusedDate', () => {
          const oneYearBefore = today.clone().startOf('year');
          const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'PageUp' });
          const arg = maybeTransitionPrevYearSpy.getCall(0).args[0];
          expect(arg.isSame(oneYearBefore, 'month')).to.equal(true);
        });
      });

      describe('ArrowDown', () => {
        it('calls maybeTransitionNextYear', () => {
          const maybeTransitionNextYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionNextYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowDown' });
          expect(maybeTransitionNextYearSpy.callCount).to.equal(1);
        });

        it('arg is 3 months after focusedDate', () => {
          const threeMonthsAfter = today.clone().add(3, 'month');
          const maybeTransitionNextYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionNextYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowDown' });
          const arg = maybeTransitionNextYearSpy.getCall(0).args[0];
          expect(arg.isSame(threeMonthsAfter, 'month')).to.equal(true);
        });
      });

      describe('ArrowRight', () => {
        it('calls maybeTransitionNextYear', () => {
          const maybeTransitionNextYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionNextYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowRight' });
          expect(maybeTransitionNextYearSpy.callCount).to.equal(1);
        });

        it('arg is 1 month after focusedDate', () => {
          const oneMonthAfter = today.clone().add(1, 'month');
          const maybeTransitionNextYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionNextYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'ArrowRight' });
          const arg = maybeTransitionNextYearSpy.getCall(0).args[0];
          expect(arg.isSame(oneMonthAfter, 'month')).to.equal(true);
        });
      });

      describe('End', () => {
        it('calls maybeTransitionNextYear', () => {
          const maybeTransitionNextYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionNextYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'End' });
          expect(maybeTransitionNextYearSpy.callCount).to.equal(1);
        });

        it('arg is end of focusedDate year', () => {
          const endOfYear = today.clone().endOf('year');
          const maybeTransitionNextYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionNextYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'End' });
          const arg = maybeTransitionNextYearSpy.getCall(0).args[0];
          expect(arg.isSame(endOfYear, 'month')).to.equal(true);
        });
      });

      describe('PageDown', () => {
        it('calls maybeTransitionNextYear', () => {
          const maybeTransitionNextYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionNextYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'PageDown' });
          expect(maybeTransitionNextYearSpy.callCount).to.equal(1);
        });

        it('arg is december month of year of focusedDate', () => {
          const lastMonthOfYear = today.clone().endOf('year');
          const maybeTransitionNextYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionNextYear');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'PageDown' });
          const arg = maybeTransitionNextYearSpy.getCall(0).args[0];
          expect(arg.isSame(lastMonthOfYear, 'month')).to.equal(true);
        });
      });

      describe('?', () => {
        it('calls openKeyboardShortcutsPanel', () => {
          const openKeyboardShortcutsPanelSpy = sinon.spy(MonthPicker.prototype, 'openKeyboardShortcutsPanel');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
          });
          wrapper.instance().onKeyDown({ ...event, key: '?' });
          expect(openKeyboardShortcutsPanelSpy.callCount).to.equal(1);
        });
      });

      describe('Escape', () => {
        it('sets state.showKeyboardShortcuts to false', () => {
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: true,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Escape' });
          expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
        });

        it('calls closeKeyboardShortcutsPanel if state.showKeyboardShortcuts === true', () => {
          const closeKeyboardShortcutsPanelSpy = sinon.stub(MonthPicker.prototype, 'closeKeyboardShortcutsPanel');
          const wrapper = shallow(<MonthPicker />);
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: true,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Escape' });
          expect(closeKeyboardShortcutsPanelSpy.callCount).to.equal(1);
        });

        it('calls props.onBlur if state.showKeyboardShortcuts === false', () => {
          const onBlurStub = sinon.stub();
          const wrapper = shallow(<MonthPicker onBlur={onBlurStub} />);
          wrapper.setState({
            focusedDate: today,
            showKeyboardShortcuts: false,
          });
          wrapper.instance().onKeyDown({ ...event, key: 'Escape' });
          expect(onBlurStub.callCount).to.equal(1);
        });
      });
    });

    describe('focusedDate is falsey', () => {
      it('does not call maybeTransitionPrevYear', () => {
        const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
        const wrapper = shallow(<MonthPicker />);
        wrapper.setState({
          focusedDate: null,
        });
        wrapper.instance().onKeyDown({ ...event, key: 'ArrowLeft' });
        expect(maybeTransitionPrevYearSpy.callCount).to.equal(0);
      });

      it('does not call maybeTransitionNextYear', () => {
        const maybeTransitionPrevYearSpy = sinon.spy(MonthPicker.prototype, 'maybeTransitionPrevYear');
        const wrapper = shallow(<MonthPicker />);
        wrapper.setState({
          focusedDate: null,
        });
        wrapper.instance().onKeyDown({ ...event, key: 'ArrowRight' });
        expect(maybeTransitionPrevYearSpy.callCount).to.equal(0);
      });
    });
  });

  describe('#onPrevYearClick', () => {
    let translateFirstMonthPickerForAnimationSpy;
    beforeEach(() => {
      translateFirstMonthPickerForAnimationSpy = sinon.stub(MonthPicker.prototype, 'translateFirstMonthPickerForAnimation');
    });

    it('calls translateFirstMonthPickerForAnimation', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().onPrevYearClick(event);
      expect(translateFirstMonthPickerForAnimationSpy).to.have.property('callCount', 1);
    });

    it('sets state.yearTransition to "prev"', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().onPrevYearClick();
      expect(wrapper.state().yearTransition).to.equal('prev');
    });

    it('sets state.nextFocusedDate to first arg', () => {
      const test = 'FOOBARBAZ';
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().onPrevYearClick(test);
      expect(wrapper.state().nextFocusedDate).to.equal(test);
    });
  });

  describe('#onNextYearClick', () => {
    it('sets state.yearTransition to "next"', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().onNextYearClick();
      expect(wrapper.state().yearTransition).to.equal('next');
    });

    it('sets state.nextFocusedDate to first arg', () => {
      const test = 'FOOBARBAZ';
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().onNextYearClick(test);
      expect(wrapper.state().nextFocusedDate).to.equal(test);
    });
  });

  describe('#getFocusedMonth', () => {
    describe('props.getFirstFocusableMonth is truthy', () => {
      it('calls getFirstFocusableMonth with arg if exists', () => {
        const getFirstFocusableMonthStub = sinon.stub();
        const wrapper = shallow(
          <MonthPicker getFirstFocusableMonth={getFirstFocusableMonthStub} />);
        getFirstFocusableMonthStub.reset(); // getFirstFocusableMonth gets called in the constructor

        wrapper.instance().getFocusedMonth();
        expect(getFirstFocusableMonthStub.callCount).to.equal(1);
      });

      it('calls getFirstFocusableMonth with arg if exists', () => {
        const getFirstFocusableMonthStub = sinon.stub();
        const wrapper = shallow(
          <MonthPicker getFirstFocusableMonth={getFirstFocusableMonthStub} />);
        getFirstFocusableMonthStub.reset(); // getFirstFocusableMonth gets called in the constructor

        wrapper.instance().getFocusedMonth(today);
        expect(getFirstFocusableMonthStub.getCall(0).args[0].isSame(today, 'month')).to.equal(true);
      });

      it('returns getFirstFocusableMonth() value', () => {
        const getFirstFocusableMonthStub = sinon.stub().returns(today);
        const wrapper = shallow(
          <MonthPicker getFirstFocusableMonth={getFirstFocusableMonthStub} />);
        expect(wrapper.instance().getFocusedMonth().isSame(today, 'fmonth')).to.equal(true);
      });

      it('returns first month of arg if getFirstFocusableMonth returns invisible month', () => {
        const test = moment().add(2, 'years');
        const getFirstFocusableMonthStub = sinon.stub().returns(today);
        sinon.stub(isMonthVisible, 'default').returns(false);
        const wrapper = shallow(
          <MonthPicker getFirstFocusableMonth={getFirstFocusableMonthStub} />);
        expect(wrapper.instance().getFocusedMonth(test).isSame(test, 'month')).to.equal(true);
      });
    });

    describe('props.getFirstFocusableMonth is falsey', () => {
      it('returns undefined if no arg', () => {
        const wrapper = shallow(<MonthPicker />);
        expect(wrapper.instance().getFocusedMonth()).to.equal(undefined);
      });

      it('returns first day of arg month if exists', () => {
        const test = moment().add(3, 'months');
        const wrapper = shallow(<MonthPicker />);
        expect(wrapper.instance().getFocusedMonth(test).isSame(test.startOf('month'), 'month')).to.equal(true);
      });
    });
  });

  describe('#maybeTransitionNextYear', () => {
    describe('arg has same month as state.focusedDate', () => {
      it('does not call `onNextYearClick`', () => {
        const onNextYearClickSpy = sinon.spy(MonthPicker.prototype, 'onNextYearClick');
        const firstOfTodaysMonth = moment().startOf('month');
        const wrapper = shallow(<MonthPicker />);
        wrapper.state().focusedDate = firstOfTodaysMonth;
        wrapper.instance().maybeTransitionNextYear(today);
        expect(onNextYearClickSpy.callCount).to.equal(0);
      });

      it('returns false', () => {
        const firstOfTodaysMonth = today.clone().startOf('month');
        const wrapper = shallow(<MonthPicker />);
        wrapper.state().focusedDate = firstOfTodaysMonth;
        expect(wrapper.instance().maybeTransitionNextYear(today)).to.equal(false);
      });
    });

    describe('arg has different year as state.focusedDate', () => {
      describe('arg is visible', () => {
        it('does not call `onNextYearClick`', () => {
          const onNextYearClickSpy = sinon.spy(MonthPicker.prototype, 'onNextYearClick');
          sinon.stub(isMonthVisible, 'default').returns(true);
          const nextYear = moment().add(1, 'year');
          const wrapper = shallow(<MonthPicker />);
          wrapper.state().focusedDate = nextYear;
          wrapper.instance().maybeTransitionNextYear(today);
          expect(onNextYearClickSpy.callCount).to.equal(0);
        });

        it('returns false', () => {
          sinon.stub(isMonthVisible, 'default').returns(true);
          const nextYear = moment().add(1, 'year');
          const wrapper = shallow(<MonthPicker />);
          wrapper.state().focusedDate = nextYear;
          expect(wrapper.instance().maybeTransitionNextYear(today)).to.equal(false);
        });
      });

      describe('arg is not visible', () => {
        it('calls `onNextYearClick`', () => {
          const onNextYearClickSpy = sinon.spy(MonthPicker.prototype, 'onNextYearClick');
          sinon.stub(isMonthVisible, 'default').returns(false);
          const nextYear = moment().add(1, 'year');
          const wrapper = shallow(<MonthPicker />);
          wrapper.state().focusedDate = nextYear;
          wrapper.instance().maybeTransitionNextYear(today);
          expect(onNextYearClickSpy.callCount).to.equal(1);
        });

        it('returns true', () => {
          sinon.stub(isMonthVisible, 'default').returns(false);
          const nextYear = moment().add(1, 'year');
          const wrapper = shallow(<MonthPicker />);
          wrapper.state().focusedDate = nextYear;
          expect(wrapper.instance().maybeTransitionNextYear(today)).to.equal(true);
        });
      });
    });
  });

  describe('#maybeTransitionPrevYear', () => {
    describe('arg has same year as state.focusedDate', () => {
      it('does not call `onPrevYearClick`', () => {
        const onPrevYearClickSpy = sinon.spy(MonthPicker.prototype, 'onPrevYearClick');
        const firsDayOfActualYear = moment().startOf('year');
        const wrapper = shallow(<MonthPicker />);
        wrapper.state().focusedDate = firsDayOfActualYear;
        wrapper.instance().maybeTransitionPrevYear(today);
        expect(onPrevYearClickSpy.callCount).to.equal(0);
      });

      it('returns false', () => {
        const firsDayOfActualYear = today.clone().startOf('year');
        const wrapper = shallow(<MonthPicker />);
        wrapper.state().focusedDate = firsDayOfActualYear;
        expect(wrapper.instance().maybeTransitionPrevYear(today)).to.equal(false);
      });
    });

    describe('arg has different month as state.focusedDate', () => {
      describe('arg is visible', () => {
        it('does not call `onPrevYearClick`', () => {
          const onPrevYearClickSpy = sinon.spy(MonthPicker.prototype, 'onPrevYearClick');
          sinon.stub(isMonthVisible, 'default').returns(true);
          const nextYear = moment().add(1, 'year');
          const wrapper = shallow(<MonthPicker />);
          wrapper.state().focusedDate = nextYear;
          wrapper.instance().maybeTransitionPrevYear(today);
          expect(onPrevYearClickSpy.callCount).to.equal(0);
        });

        it('returns false', () => {
          sinon.stub(isMonthVisible, 'default').returns(true);
          const nextMonth = moment().add(1, 'month');
          const wrapper = shallow(<MonthPicker />);
          wrapper.state().focusedDate = nextMonth;
          expect(wrapper.instance().maybeTransitionPrevYear(today)).to.equal(false);
        });
      });

      describe('arg is not visible', () => {
        beforeEach(() => {
          sinon.stub(MonthPicker.prototype, 'translateFirstMonthPickerForAnimation');
        });

        it('calls `onPrevYearClick`', () => {
          const onPrevYearClickSpy = sinon.spy(MonthPicker.prototype, 'onPrevYearClick');
          sinon.stub(isMonthVisible, 'default').returns(false);
          const nextYear = moment().add(1, 'year');
          const wrapper = shallow(<MonthPicker />);
          wrapper.state().focusedDate = nextYear;
          wrapper.instance().maybeTransitionPrevYear(today);
          expect(onPrevYearClickSpy.callCount).to.equal(1);
        });

        it('returns true', () => {
          sinon.stub(isMonthVisible, 'default').returns(false);
          const nextYear = moment().add(1, 'year');
          const wrapper = shallow(<MonthPicker />);
          wrapper.state().focusedDate = nextYear;
          expect(wrapper.instance().maybeTransitionPrevYear(today)).to.equal(true);
        });
      });
    });
  });

  describe('#multiplyScrollableYears', () => {
    it('increments scrollableYearMultiple', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().multiplyScrollableYears(event);
      expect(wrapper.state().scrollableYearMultiple).to.equal(2);
    });

    it('increments scrollableYearMultiple without an event', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().multiplyScrollableYears();
      expect(wrapper.state().scrollableYearMultiple).to.equal(2);
    });
  });

  describe('#openKeyboardShortcutsPanel', () => {
    it('sets state.showKeyboardShortcuts to true', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.setState({
        showKeyboardShortcuts: false,
      });
      wrapper.instance().openKeyboardShortcutsPanel();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(true);
    });

    it('sets state.onKeyboardShortcutsPanelClose to arg', () => {
      const test = 'FOOBARBAZ';
      const wrapper = shallow(<MonthPicker />);
      wrapper.setState({
        onKeyboardShortcutsPanelClose: null,
      });
      wrapper.instance().openKeyboardShortcutsPanel(test);
      expect(wrapper.state().onKeyboardShortcutsPanelClose).to.equal(test);
    });
  });

  describe('#closeKeyboardShortcutsPanel', () => {
    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });

    it('sets state.onKeyboardShortcutsPanelClose to null', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.setState({
        showKeyboardShortcuts: true,
        onKeyboardShortcutsPanelClose: sinon.stub(),
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      expect(wrapper.state().onKeyboardShortcutsPanelClose).to.equal(null);
    });

    it('calls state.onKeyboardShortcutsPanelClose if exists', () => {
      const onKeyboardShortcutsPanelCloseStub = sinon.stub();
      const wrapper = shallow(<MonthPicker />);
      wrapper.setState({
        showKeyboardShortcuts: true,
        onKeyboardShortcutsPanelClose: onKeyboardShortcutsPanelCloseStub,
      });
      wrapper.instance().closeKeyboardShortcutsPanel();
      expect(onKeyboardShortcutsPanelCloseStub.callCount).to.equal(1);
    });
  });

  const windowWrap = wrap().withGlobal('window', () => ({ getComputedStyle() { return {}; } }));
  const maybeWindowWrap = typeof window === 'undefined' ? windowWrap : global;
  maybeWindowWrap.describe('#initializeMonthPickerWidth()', () => {
    beforeEach(() => {
      sinon.stub(ReactDOM, 'findDOMNode').returns({ querySelector() {} });
    });

    it('executes', () => {
      const wrapper = shallow(<MonthPicker />);
      wrapper.instance().initializeMonthPickerWidth();
    });
  });

  describe.skip('life cycle methods', () => {
    let adjustMonthPickerHeightSpy;
    let initializeMonthPickerWidthSpy;
    beforeEach(() => {
      adjustMonthPickerHeightSpy = sinon.stub(MonthPicker.prototype, 'adjustMonthPickerHeight');
      initializeMonthPickerWidthSpy = sinon.stub(MonthPicker.prototype, 'initializeMonthPickerWidth');
    });

    describe('#componentDidMount', () => {
      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('calls adjustMonthPickerHeight', () => {
          mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(adjustMonthPickerHeightSpy).to.have.property('callCount', 1);
        });

        it('calls initializeMonthPickerWidth', () => {
          mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(initializeMonthPickerWidthSpy).to.have.property('callCount', 1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustMonthPickerHeight', () => {
          mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          expect(adjustMonthPickerHeightSpy.called).to.equal(false);
        });

        it('does not call initializeMonthPickerWidth', () => {
          mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          expect(initializeMonthPickerWidthSpy.called).to.equal(false);
        });
      });
    });

    describe('#componentDidUpdate', () => {
      let updateStateAfterYearTransitionSpy;
      beforeEach(() => {
        updateStateAfterYearTransitionSpy = sinon.stub(
          MonthPicker.prototype,
          'updateStateAfterYearTransition',
        );
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('calls adjustMonthPickerHeight if state.yearTransition is truthy', () => {
          const wrapper = mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            yearTransition: 'foo',
          });
          expect(adjustMonthPickerHeightSpy).to.have.property('callCount', 2);
        });

        it('does not call adjustMonthPickerHeight if state.yearTransition is falsey', () => {
          const wrapper = mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            yearTransition: null,
          });
          expect(adjustMonthPickerHeightSpy.calledTwice).to.equal(false);
        });

        it('calls updateStateAfterYearTransition if state.yearTransition is truthy', () => {
          const wrapper = mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            yearTransition: 'foo',
          });
          expect(updateStateAfterYearTransitionSpy).to.have.property('callCount', 1);
        });

        it('does not call updateStateAfterYearTransition if state.yearTransition is falsey', () => {
          const wrapper = mount(<MonthPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            yearTransition: null,
          });
          expect(updateStateAfterYearTransitionSpy.calledOnce).to.equal(false);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustMonthPickerHeight if state.yearTransition is truthy', () => {
          const wrapper = mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            yearTransition: 'foo',
          });
          expect(adjustMonthPickerHeightSpy.called).to.equal(false);
        });

        it('does not call adjustMonthPickerHeight if state.yearTransition is falsey', () => {
          const wrapper = mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            yearTransition: null,
          });
          expect(adjustMonthPickerHeightSpy.called).to.equal(false);
        });

        it('calls updateStateAfterYearTransition if state.yearTransition is truthy', () => {
          const wrapper = mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            yearTransition: 'foo',
          });
          expect(updateStateAfterYearTransitionSpy).to.have.property('callCount', 1);
        });

        it('does not call updateStateAfterYearTransition if state.yearTransition is falsey', () => {
          const wrapper = mount(<MonthPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            yearTransition: null,
          });
          expect(updateStateAfterYearTransitionSpy.calledOnce).to.equal(false);
        });
      });
    });
  });

  describe('calculateDimension()', () => {
    it('returns 0 for an empty element', () => {
      expect(calculateDimension(null, 'width')).to.equal(0);
      expect(calculateDimension(null, 'width', false)).to.equal(0);
      expect(calculateDimension(null, 'width', true)).to.equal(0);
    });

    describe('borderBox true', () => {
      const el = {
        offsetWidth: 17,
        offsetHeight: 42,
      };

      it('returns el.offsetWidth for "width"', () => {
        expect(calculateDimension(el, 'width', true)).to.equal(el.offsetWidth);
      });

      it('returns el.offsetHeight for "height"', () => {
        expect(calculateDimension(el, 'height', true)).to.equal(el.offsetHeight);
      });
    });

    /* Requires a DOM */
    describe.skip('withMargin false and borderBox true', () => {
      let testElement = null;

      beforeEach(() => {
        testElement = document.createElement('div');

        testElement.style.width = '100px';
        testElement.style.height = '250px';
        testElement.style.padding = '15px 10px';
        testElement.style.border = '1px solid red';
        testElement.style.margin = '3px 6px 5px 2px';
        testElement.boxSizing = 'border-box';
      });

      it('calculates border-box height', () => {
        expect(calculateDimension(testElement, 'height', true)).to.equal(282);
      });

      it('calculates border-box height with margin', () => {
        expect(calculateDimension(testElement, 'height', true, true)).to.equal(290);
      });

      it('calculates border-box width', () => {
        expect(calculateDimension(testElement, 'width', true)).to.equal(122);
      });

      it('calculates border-box width with margin', () => {
        expect(calculateDimension(testElement, 'width', true, true)).to.equal(130);
      });

      it('calculates content-box height', () => {
        expect(calculateDimension(testElement, 'height')).to.equal(250);
      });

      it('calculates content-box height with margin', () => {
        expect(calculateDimension(testElement, 'height', false, true)).to.equal(258);
      });

      it('calculates content-box width', () => {
        expect(calculateDimension(testElement, 'width')).to.equal(100);
      });

      it('calculates content-box width with margin', () => {
        expect(calculateDimension(testElement, 'width', false, true)).to.equal(108);
      });
    });
  });
});
