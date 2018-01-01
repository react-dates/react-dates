import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import moment from 'moment';

import DayPicker from '../../src/components/DayPicker';
import DayPickerSingleDateController from '../../src/components/DayPickerSingleDateController';
import OutsideClickHandler from '../../src/components/OutsideClickHandler';

import toISODateString from '../../src/utils/toISODateString';
import toISOMonthString from '../../src/utils/toISOMonthString';
import * as isDayVisible from '../../src/utils/isDayVisible';

// Set to noon to mimic how days in the picker are configured internally
const today = moment().startOf('day').hours(12);

function getCallsByModifier(stub, modifier) {
  return stub.getCalls().filter(call => call.args[call.args.length - 1] === modifier);
}

describe('DayPickerSingleDateController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    it('renders a DayPicker', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={() => {}}
          onFocusChange={() => {}}
          focused
        />
      ));
      expect(wrapper.find(DayPicker)).to.have.lengthOf(1);
    });
  });

  describe('#componentWillReceiveProps', () => {
    const props = {
      ...DayPickerSingleDateController.defaultProps,
      onDateChange() {},
      onFocusChange() {},
    };

    describe('modifiers', () => {
      describe('selected modifier', () => {
        describe('props.date did not change', () => {
          it('does not call this.addModifier with `selected', () => {
            const addModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'addModifier');
            const date = today;
            const wrapper = shallow(<DayPickerSingleDateController {...props} date={date} />);
            wrapper.instance().componentWillReceiveProps({ ...props, date });
            expect(getCallsByModifier(addModifierSpy, 'selected').length).to.equal(0);
          });

          it('does not call this.deleteModifier with `selected', () => {
            const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
            const date = today;
            const wrapper = shallow(<DayPickerSingleDateController {...props} date={date} />);
            wrapper.instance().componentWillReceiveProps({ ...props, date });
            expect(getCallsByModifier(deleteModifierSpy, 'selected').length).to.equal(0);
          });
        });

        describe('props.date changed', () => {
          it('deleteModifier gets called with old date and `selected`', () => {
            const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
            const date = today;
            const newDate = moment().add(1, 'day');
            const wrapper = shallow(<DayPickerSingleDateController {...props} date={date} />);
            wrapper.instance().componentWillReceiveProps({ ...props, date: newDate });
            const selectedCalls = getCallsByModifier(deleteModifierSpy, 'selected');
            expect(selectedCalls.length).to.equal(1);
            expect(selectedCalls[0].args[1]).to.equal(date);
          });

          it('addModifier gets called with new date and `selected-start`', () => {
            const addModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'addModifier');
            const date = today;
            const newDate = moment().add(1, 'day');
            const wrapper = shallow(<DayPickerSingleDateController {...props} date={date} />);
            wrapper.instance().componentWillReceiveProps({ ...props, date: newDate });
            const selectedStartCalls = getCallsByModifier(addModifierSpy, 'selected');
            expect(selectedStartCalls.length).to.equal(1);
            expect(selectedStartCalls[0].args[1]).to.equal(newDate);
          });
        });
      });

      describe('blocked', () => {
        describe('props.focused did not change', () => {
          it('does not call isBlocked', () => {
            const isBlockedStub = sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked');
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            isBlockedStub.reset();
            wrapper.instance().componentWillReceiveProps({
              ...props,
            });
            expect(isBlockedStub.callCount).to.equal(0);
          });
        });

        describe('props.focused changed', () => {
          const numVisibleDays = 3;
          let visibleDays;
          beforeEach(() => {
            const startOfMonth = today.clone().startOf('month');
            visibleDays = {
              [toISOMonthString(startOfMonth)]: {
                [toISODateString(startOfMonth)]: [],
                [toISODateString(startOfMonth.clone().add(1, 'day'))]: [],
                [toISODateString(startOfMonth.clone().add(2, 'days'))]: [],
              },
            };
          });

          it('calls isBlocked for every visible day', () => {
            const isBlockedStub = sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked');
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            isBlockedStub.reset();
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
            });
            expect(isBlockedStub.callCount).to.equal(numVisibleDays);
          });

          it('if isBlocked(day) is true calls addModifier with `blocked` for each day', () => {
            const addModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'addModifier');
            sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked').returns(true);
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
            });
            const blockedOutOfRangeCalls = getCallsByModifier(addModifierSpy, 'blocked');
            expect(blockedOutOfRangeCalls.length).to.equal(numVisibleDays);
          });

          it('if isBlocked(day) is false calls deleteModifier with day and `blocked`', () => {
            const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
            sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked').returns(false);
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
            });
            const blockedOutOfRangeCalls = getCallsByModifier(deleteModifierSpy, 'blocked');
            expect(blockedOutOfRangeCalls.length).to.equal(numVisibleDays);
          });
        });
      });

      describe('blocked-out-of-range', () => {
        describe('props.focused did not change', () => {
          it('does not call isOutsideRange if unchanged', () => {
            const isOutsideRangeStub = sinon.stub();
            const wrapper = shallow((
              <DayPickerSingleDateController
                {...props}
                isOutsideRange={isOutsideRangeStub}
              />
            ));
            const prevCallCount = isOutsideRangeStub.callCount;
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isOutsideRange: isOutsideRangeStub,
            });
            expect(isOutsideRangeStub.callCount).to.equal(prevCallCount);
          });

          it('calls isOutsideRange if changed', () => {
            const isOutsideRangeStub = sinon.stub();
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isOutsideRange: isOutsideRangeStub,
            });
            expect(isOutsideRangeStub.callCount).to.not.equal(0);
          });
        });

        describe('props.focused changed', () => {
          const numVisibleDays = 3;
          let visibleDays;
          beforeEach(() => {
            const startOfMonth = today.clone().startOf('month');
            visibleDays = {
              [toISOMonthString(startOfMonth)]: {
                [toISODateString(startOfMonth)]: [],
                [toISODateString(startOfMonth.clone().add(1, 'day'))]: [],
                [toISODateString(startOfMonth.clone().add(2, 'days'))]: [],
              },
            };
          });

          it('calls isOutsideRange for every visible day', () => {
            const isOutsideRangeStub = sinon.stub();
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isOutsideRange: isOutsideRangeStub,
            });
            expect(isOutsideRangeStub.callCount).to.equal(numVisibleDays);
          });

          it('if isOutsideRange(day) is true calls addModifier with `blocked-out-of-range` for each day', () => {
            const addModifierSpy = sinon.spy(
              DayPickerSingleDateController.prototype,
              'addModifier',
            );
            const isOutsideRangeStub = sinon.stub().returns(true);
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isOutsideRange: isOutsideRangeStub,
            });
            const blockedOutOfRangeCalls = getCallsByModifier(
              addModifierSpy,
              'blocked-out-of-range',
            );
            expect(blockedOutOfRangeCalls.length).to.equal(numVisibleDays);
          });

          it('if isOutsideRange(day) is false calls deleteModifier with day and `blocked-out-of-range`', () => {
            const deleteModifierSpy = sinon.spy(
              DayPickerSingleDateController.prototype,
              'deleteModifier',
            );
            const isOutsideRangeStub = sinon.stub().returns(false);
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isOutsideRange: isOutsideRangeStub,
            });
            const blockedOutOfRangeCalls = getCallsByModifier(
              deleteModifierSpy,
              'blocked-out-of-range',
            );
            expect(blockedOutOfRangeCalls.length).to.equal(numVisibleDays);
          });
        });
      });

      describe('blocked-calendar', () => {
        describe('props.focused did not change', () => {
          it('does not call isDayBlocked if unchanged', () => {
            const isDayBlockedStub = sinon.stub();
            const wrapper = shallow(<DayPickerSingleDateController
              {...props}
              isDayBlocked={isDayBlockedStub}
            />);
            const prevCallCount = isDayBlockedStub.callCount;
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isDayBlocked: isDayBlockedStub,
            });
            expect(isDayBlockedStub.callCount).to.equal(prevCallCount);
          });

          it('calls isDayBlocked if changed', () => {
            const isDayBlockedStub = sinon.stub();
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isDayBlocked: isDayBlockedStub,
            });
            expect(isDayBlockedStub.callCount).to.not.equal(0);
          });
        });

        describe('props.focused changed', () => {
          const numVisibleDays = 3;
          let visibleDays;
          beforeEach(() => {
            const startOfMonth = today.clone().startOf('month');
            visibleDays = {
              [toISOMonthString(startOfMonth)]: {
                [toISODateString(startOfMonth)]: [],
                [toISODateString(startOfMonth.clone().add(1, 'day'))]: [],
                [toISODateString(startOfMonth.clone().add(2, 'days'))]: [],
              },
            };
          });

          it('calls isDayBlocked for every visible day', () => {
            const isDayBlockedStub = sinon.stub();
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isDayBlocked: isDayBlockedStub,
            });
            expect(isDayBlockedStub.callCount).to.equal(numVisibleDays);
          });

          it('if isDayBlocked(day) is true calls addModifier with `blocked-calendar` for each day', () => {
            const addModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'addModifier');
            const isDayBlockedStub = sinon.stub().returns(true);
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isDayBlocked: isDayBlockedStub,
            });
            const blockedCalendarCalls = getCallsByModifier(addModifierSpy, 'blocked-calendar');
            expect(blockedCalendarCalls.length).to.equal(numVisibleDays);
          });

          it('if isDayBlocked(day) is false calls deleteModifier with day and `blocked-calendar`', () => {
            const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
            const isDayBlockedStub = sinon.stub().returns(false);
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isDayBlocked: isDayBlockedStub,
            });
            const blockedCalendarCalls = getCallsByModifier(deleteModifierSpy, 'blocked-calendar');
            expect(blockedCalendarCalls.length).to.equal(numVisibleDays);
          });
        });
      });

      describe('highlighted-calendar', () => {
        describe('focusedInput did not change', () => {
          it('does not call isDayHighlighted if unchanged', () => {
            const isDayHighlightedStub = sinon.stub();
            const wrapper = shallow(<DayPickerSingleDateController
              {...props}
              isDayHighlighted={isDayHighlightedStub}
            />);
            const prevCallCount = isDayHighlightedStub.callCount;
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isDayHighlighted: isDayHighlightedStub,
            });
            expect(isDayHighlightedStub.callCount).to.equal(prevCallCount);
          });

          it('calls isDayHighlighted if changed', () => {
            const isDayHighlightedStub = sinon.stub();
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isDayHighlighted: isDayHighlightedStub,
            });
            expect(isDayHighlightedStub.callCount).to.not.equal(0);
          });
        });

        describe('focusedInput changed', () => {
          const numVisibleDays = 3;
          let visibleDays;
          beforeEach(() => {
            const startOfMonth = today.clone().startOf('month');
            visibleDays = {
              [toISOMonthString(startOfMonth)]: {
                [toISODateString(startOfMonth)]: [],
                [toISODateString(startOfMonth.clone().add(1, 'day'))]: [],
                [toISODateString(startOfMonth.clone().add(2, 'days'))]: [],
              },
            };
          });

          it('calls isDayHighlighted for every visible day', () => {
            const isDayHighlightedStub = sinon.stub();
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isDayHighlighted: isDayHighlightedStub,
            });
            expect(isDayHighlightedStub.callCount).to.equal(numVisibleDays);
          });

          it('if isDayHighlighted(day) is true calls addModifier with day and `highlighted-calendar`', () => {
            const addModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'addModifier');
            const isDayHighlightedStub = sinon.stub().returns(true);
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isDayHighlighted: isDayHighlightedStub,
            });
            const highlightedCalendarCalls = getCallsByModifier(addModifierSpy, 'highlighted-calendar');
            expect(highlightedCalendarCalls.length).to.equal(numVisibleDays);
          });

          it('if isDayHighlighted(day) is false calls deleteModifier with day and `highlighted-calendar`', () => {
            const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
            const isDayHighlightedStub = sinon.stub().returns(false);
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isDayHighlighted: isDayHighlightedStub,
            });
            const highlightedCalendarCalls = getCallsByModifier(deleteModifierSpy, 'highlighted-calendar');
            expect(highlightedCalendarCalls.length).to.equal(numVisibleDays);
          });
        });
      });

      describe('today', () => {
        describe('this.today matches today', () => {
          it('does not call deleteModifier with `today`', () => {
            const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.instance().today = today;
            wrapper.instance().componentWillReceiveProps(props);
            const todayCalls = getCallsByModifier(deleteModifierSpy, 'today');
            expect(todayCalls.length).to.equal(0);
          });

          it('does not call addModifier with `today`', () => {
            const addModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'addModifier');
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.instance().today = today;
            wrapper.instance().componentWillReceiveProps(props);
            const todayCalls = getCallsByModifier(addModifierSpy, 'today');
            expect(todayCalls.length).to.equal(0);
          });
        });

        describe('this.today is no longer today', () => {
          it('calls deleteModifier with this.today and `today` modifier', () => {
            const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.instance().today = moment().subtract(1, 'day');
            wrapper.instance().componentWillReceiveProps(props);
            const todayCalls = getCallsByModifier(deleteModifierSpy, 'today');
            expect(todayCalls.length).to.equal(1);
          });

          it('calls addModifier with new today and `today` modifiers', () => {
            const addModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'addModifier');
            const wrapper = shallow(<DayPickerSingleDateController {...props} />);
            wrapper.instance().today = moment().subtract(1, 'day');
            wrapper.instance().componentWillReceiveProps(props);
            const todayCalls = getCallsByModifier(addModifierSpy, 'today');
            expect(todayCalls.length).to.equal(1);
          });
        });
      });
    });
  });

  describe('#onDayClick', () => {
    describe('day arg is blocked', () => {
      it('props.onDateChange is not called', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isDayBlocked={() => true}
          />
        ));
        wrapper.instance().onDayClick(moment());
        expect(onDateChangeStub.callCount).to.equal(0);
      });

      it('props.onFocusChange is not called', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            isDayBlocked={() => true}
          />
        ));
        wrapper.instance().onDayClick(moment());
        expect(onFocusChangeStub.callCount).to.equal(0);
      });

      it('props.onClose is not called', () => {
        const onCloseStub = sinon.stub();
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
            isDayBlocked={() => true}
          />
        ));
        wrapper.instance().onDayClick(moment());
        expect(onCloseStub.callCount).to.equal(0);
      });

      it('calls props.onClose with { date } as arg', () => {
        const date = moment();
        const onCloseStub = sinon.stub();
        const wrapper = shallow((
          <DayPickerSingleDateController
            date={null}
            onDateChange={() => {}}
            focused
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />
        ));

        wrapper.instance().onDayClick(date);
        expect(onCloseStub.getCall(0).args[0].date).to.equal(date);
      });
    });

    describe('day arg is not blocked', () => {
      it('props.onDateChange is called', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
          />
        ));
        wrapper.instance().onDayClick(moment());
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      describe('props.keepOpenOnDateSelect is false', () => {
        it('props.onFocusChange is called', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DayPickerSingleDateController
              onDateChange={() => {}}
              onFocusChange={onFocusChangeStub}
              keepOpenOnDateSelect={false}
            />
          ));
          wrapper.instance().onDayClick(moment());
          expect(onFocusChangeStub.callCount).to.equal(1);
        });

        it('props.onClose is called', () => {
          const onCloseStub = sinon.stub();
          const wrapper = shallow((
            <DayPickerSingleDateController
              onDateChange={() => {}}
              onFocusChange={() => {}}
              onClose={onCloseStub}
              keepOpenOnDateSelect={false}
            />
          ));
          wrapper.instance().onDayClick(moment());
          expect(onCloseStub.callCount).to.equal(1);
        });
      });

      describe('props.keepOpenOnDateSelect is true', () => {
        it('props.onFocusChange is not called', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DayPickerSingleDateController
              onDateChange={() => {}}
              onFocusChange={onFocusChangeStub}
              keepOpenOnDateSelect
            />
          ));
          wrapper.instance().onDayClick(moment());
          expect(onFocusChangeStub.callCount).to.equal(0);
        });

        it('props.onClose is not called', () => {
          const onCloseStub = sinon.stub();
          const wrapper = shallow((
            <DayPickerSingleDateController
              onDateChange={() => {}}
              onFocusChange={() => {}}
              onClose={onCloseStub}
              keepOpenOnDateSelect
            />
          ));
          wrapper.instance().onDayClick(moment());
          expect(onCloseStub.callCount).to.equal(0);
        });
      });
    });
  });

  describe('#onDayMouseEnter', () => {
    it('sets state.hoverDate to day arg', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={() => {}}
          onFocusChange={() => {}}
        />
      ));
      wrapper.instance().onDayMouseEnter(today);
      expect(wrapper.state().hoverDate).to.equal(today);
    });

    describe('modifiers', () => {
      it('calls addModifier', () => {
        const addModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'addModifier');
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
          />
        ));
        wrapper.setState({
          hoverDate: null,
        });
        addModifierSpy.reset();
        wrapper.instance().onDayMouseEnter(today);
        expect(addModifierSpy.callCount).to.equal(1);
        expect(addModifierSpy.getCall(0).args[1]).to.equal(today);
        expect(addModifierSpy.getCall(0).args[2]).to.equal('hovered');
      });

      it('calls deleteModifier', () => {
        const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
          />
        ));
        wrapper.setState({
          hoverDate: today,
        });
        deleteModifierSpy.reset();
        wrapper.instance().onDayMouseEnter(moment().add(10, 'days'));
        expect(deleteModifierSpy.callCount).to.equal(1);
        expect(deleteModifierSpy.getCall(0).args[1]).to.equal(today);
        expect(deleteModifierSpy.getCall(0).args[2]).to.equal('hovered');
      });
    });
  });

  describe('#onDayMouseLeave', () => {
    it('sets state.hoverDate to null', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={() => {}}
          onFocusChange={() => {}}
        />
      ));
      wrapper.instance().onDayMouseLeave();
      expect(wrapper.state().hoverDate).to.equal(null);
    });

    it('calls deleteModifier with hoverDate and `hovered` modifier', () => {
      const deleteModifierSpy = sinon.spy(DayPickerSingleDateController.prototype, 'deleteModifier');
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      wrapper.setState({
        hoverDate: today,
      });
      deleteModifierSpy.reset();
      wrapper.instance().onDayMouseLeave(today);
      expect(deleteModifierSpy.callCount).to.equal(1);
      expect(deleteModifierSpy.getCall(0).args[1]).to.equal(today);
      expect(deleteModifierSpy.getCall(0).args[2]).to.equal('hovered');
    });
  });

  describe('#onPrevMonthClick', () => {
    it('updates state.currentMonth to subtract 1 month', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      wrapper.setState({
        currentMonth: today,
      });
      wrapper.instance().onPrevMonthClick();
      expect(wrapper.state().currentMonth.month()).to.equal(today.clone().subtract(1, 'month').month());
    });

    it('new visibleDays has previous month', () => {
      const numberOfMonths = 2;
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          numberOfMonths={numberOfMonths}
        />
      ));
      wrapper.setState({
        currentMonth: today,
      });
      const newMonth = moment().subtract(1, 'month');
      wrapper.instance().onPrevMonthClick();
      const visibleDays = Object.keys(wrapper.state().visibleDays);
      expect(visibleDays).to.include(toISOMonthString(newMonth));
    });

    it('new visibleDays does not have current last month', () => {
      const numberOfMonths = 2;
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          numberOfMonths={numberOfMonths}
        />
      ));
      wrapper.setState({
        currentMonth: today,
      });
      wrapper.instance().onPrevMonthClick();
      const visibleDays = Object.keys(wrapper.state().visibleDays);
      expect(visibleDays).to.not.include(toISOMonthString(moment().add(numberOfMonths, 'months')));
    });

    it('calls this.getModifiers', () => {
      const getModifiersSpy = sinon.spy(DayPickerSingleDateController.prototype, 'getModifiers');
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      getModifiersSpy.reset();
      wrapper.instance().onPrevMonthClick();
      expect(getModifiersSpy.callCount).to.equal(1);
    });

    it('calls props.onPrevMonthClick with new month', () => {
      const onPrevMonthClickStub = sinon.stub();
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          onPrevMonthClick={onPrevMonthClickStub}
        />
      ));
      wrapper.setState({
        currentMonth: today,
      });
      const newMonth = moment().subtract(1, 'month');
      wrapper.instance().onPrevMonthClick();
      expect(onPrevMonthClickStub.callCount).to.equal(1);
      expect(onPrevMonthClickStub.firstCall.args[0].year()).to.equal(newMonth.year());
      expect(onPrevMonthClickStub.firstCall.args[0].month()).to.equal(newMonth.month());
    });
  });

  describe('#onNextMonthClick', () => {
    it('updates state.currentMonth to add 1 month', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      wrapper.setState({
        currentMonth: today,
      });
      wrapper.instance().onNextMonthClick();
      expect(wrapper.state().currentMonth.month()).to.equal(today.clone().add(1, 'month').month());
    });

    it('new visibleDays has next month', () => {
      const numberOfMonths = 2;
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          numberOfMonths={numberOfMonths}
        />
      ));
      wrapper.setState({
        currentMonth: today,
      });
      const newMonth = moment().add(numberOfMonths + 1, 'months');
      wrapper.instance().onNextMonthClick();
      const visibleDays = Object.keys(wrapper.state().visibleDays);
      expect(visibleDays).to.include(toISOMonthString(newMonth));
    });

    it('new visibleDays does not have current month', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          numberOfMonths={2}
        />
      ));
      wrapper.setState({
        currentMonth: today,
      });
      wrapper.instance().onNextMonthClick();
      const visibleDays = Object.keys(wrapper.state().visibleDays);
      expect(visibleDays).to.not.include(toISOMonthString(today.clone().subtract(1, 'month')));
    });

    it('calls this.getModifiers', () => {
      const getModifiersSpy = sinon.spy(DayPickerSingleDateController.prototype, 'getModifiers');
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      getModifiersSpy.reset();
      wrapper.instance().onNextMonthClick();
      expect(getModifiersSpy.callCount).to.equal(1);
    });

    it('calls props.onNextMonthClick with new month', () => {
      const onNextMonthClickStub = sinon.stub();
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          onNextMonthClick={onNextMonthClickStub}
        />
      ));
      wrapper.setState({
        currentMonth: today,
      });
      const newMonth = moment().add(1, 'month');
      wrapper.instance().onNextMonthClick();
      expect(onNextMonthClickStub.callCount).to.equal(1);
      expect(onNextMonthClickStub.firstCall.args[0].year()).to.equal(newMonth.year());
      expect(onNextMonthClickStub.firstCall.args[0].month()).to.equal(newMonth.month());
    });
  });

  describe('#getFirstFocusableDay', () => {
    it('returns first day of arg month if not blocked and props.date is falsy', () => {
      sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked').returns(false);
      const wrapper = shallow((
        <DayPickerSingleDateController
          date={null}
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
      expect(firstFocusableDay.isSame(today.clone().startOf('month'), 'day')).to.equal(true);
    });

    it('returns props.date if exists and is not blocked', () => {
      sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked').returns(false);
      const date = today.clone().add(10, 'days');
      const wrapper = shallow((
        <DayPickerSingleDateController
          date={date}
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
      expect(firstFocusableDay.isSame(date, 'day')).to.equal(true);
    });

    describe('desired date is blocked', () => {
      it('returns first unblocked visible day if exists', () => {
        const isBlockedStub = sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked');
        const date = moment().endOf('month').subtract(10, 'days');
        const wrapper = shallow((
          <DayPickerSingleDateController
            date={date}
            onFocusChange={sinon.stub()}
            onDateChange={sinon.stub()}
          />
        ));

        isBlockedStub.reset();
        isBlockedStub.returns(true);
        isBlockedStub.onCall(8).returns(false);
        const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        expect(firstFocusableDay.isSame(date.clone().add(8, 'days'), 'day')).to.equal(true);
      });
    });
  });

  describe('#getModifiers', () => {
    it('return object has the same number of days as input', () => {
      const monthISO = toISOMonthString(today);
      const visibleDays = {
        [monthISO]: [today, moment().add(1, 'day'), moment().add(2, 'days')],
      };
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().getModifiers(visibleDays);
      expect(Object.keys(modifiers[monthISO]).length).to.equal(visibleDays[monthISO].length);
    });

    it('calls this.getModifiersForDay for each day in input', () => {
      const getModifiersForDaySpy = sinon.spy(DayPickerSingleDateController.prototype, 'getModifiersForDay');
      const monthISO = toISOMonthString(today);
      const visibleDays = {
        [monthISO]: [today, moment().add(1, 'day'), moment().add(2, 'days')],
      };
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      getModifiersForDaySpy.reset();
      wrapper.instance().getModifiers(visibleDays);

      expect(getModifiersForDaySpy.callCount).to.equal(visibleDays[monthISO].length);
    });
  });

  describe('#getModifiersForDay', () => {
    it('only contains `valid` if all modifier methods return false', () => {
      sinon.stub(DayPickerSingleDateController.prototype, 'isToday').returns(false);
      sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked').returns(false);
      const isDayBlockedStub = sinon.stub().returns(false);
      const isOutsideRangeStub = sinon.stub().returns(false);
      const isDayHighlightedStub = sinon.stub().returns(false);
      sinon.stub(DayPickerSingleDateController.prototype, 'isSelected').returns(false);
      sinon.stub(DayPickerSingleDateController.prototype, 'isHovered').returns(false);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          isDayBlocked={isDayBlockedStub}
          isOutsideRange={isOutsideRangeStub}
          isDayHighlighted={isDayHighlightedStub}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.size).to.equal(1);
      expect(modifiers.has('valid')).to.equal(true);
    });

    it('contains `today` if this.isToday returns true', () => {
      sinon.stub(DayPickerSingleDateController.prototype, 'isToday').returns(true);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('today')).to.equal(true);
    });

    it('contains `blocked` if this.isBlocked returns true', () => {
      sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked').returns(true);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('blocked')).to.equal(true);
    });

    it('contains `blocked-calendar` if props.isDayBlocked returns true', () => {
      const isDayBlockedStub = sinon.stub().returns(true);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          isDayBlocked={isDayBlockedStub}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('blocked-calendar')).to.equal(true);
    });

    it('contains `blocked-out-of-range` if props.isOutsideRange returns true', () => {
      const isOutsideRangeStub = sinon.stub().returns(true);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          isOutsideRange={isOutsideRangeStub}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('blocked-out-of-range')).to.equal(true);
    });

    it('contains `highlighted-calendar` if props.isDayHighlighted returns true', () => {
      const isDayHighlightedStub = sinon.stub().returns(true);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          isDayHighlighted={isDayHighlightedStub}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('highlighted-calendar')).to.equal(true);
    });

    it('contains `valid` if this.isBlocked returns false', () => {
      sinon.stub(DayPickerSingleDateController.prototype, 'isBlocked').returns(false);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('valid')).to.equal(true);
    });

    it('contains `selected` if this.isSelected returns true', () => {
      sinon.stub(DayPickerSingleDateController.prototype, 'isSelected').returns(true);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('selected')).to.equal(true);
    });

    it('contains `hovered` if this.isHovered returns true', () => {
      sinon.stub(DayPickerSingleDateController.prototype, 'isHovered').returns(true);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('hovered')).to.equal(true);
    });
  });

  describe('#addModifier', () => {
    it('returns first arg if no day given', () => {
      const updatedDays = { foo: 'bar' };
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().addModifier(updatedDays);
      expect(modifiers).to.equal(updatedDays);
    });

    it('returns first arg if day is not visible', () => {
      const updatedDays = { foo: 'bar' };
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      sinon.stub(isDayVisible, 'default').returns(false);
      const modifiers = wrapper.instance().addModifier(updatedDays, moment());
      expect(modifiers).to.equal(updatedDays);
    });

    it('has day args month ISO as key', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().addModifier({}, today);
      expect(Object.keys(modifiers)).to.contain(toISOMonthString(today));
    });

    it('has day ISO as key one layer down', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().addModifier({}, today);
      expect(Object.keys(modifiers[toISOMonthString(today)])).to.contain(toISODateString(today));
    });

    it('return value no longer has modifier arg for day if was in first arg', () => {
      const modifierToAdd = 'foo';
      const monthISO = toISOMonthString(today);
      const todayISO = toISODateString(today);
      const updatedDays = {
        [monthISO]: { [todayISO]: new Set(['bar', 'baz']) },
      };
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().addModifier(updatedDays, today, modifierToAdd);
      expect(Array.from(modifiers[monthISO][todayISO])).to.contain(modifierToAdd);
    });

    it('return value no longer has modifier arg for day if was in state', () => {
      const modifierToAdd = 'foo';
      const monthISO = toISOMonthString(today);
      const todayISO = toISODateString(today);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      wrapper.setState({
        visibleDays: {
          [monthISO]: { [todayISO]: new Set(['bar', 'baz']) },
        },
      });
      const modifiers = wrapper.instance().addModifier({}, today, modifierToAdd);
      expect(Array.from(modifiers[monthISO][todayISO])).to.contain(modifierToAdd);
    });
  });

  describe('#deleteModifier', () => {
    it('returns first arg if no day given', () => {
      const updatedDays = { foo: 'bar' };
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().deleteModifier(updatedDays);
      expect(modifiers).to.equal(updatedDays);
    });

    it('returns first arg if day is not visible', () => {
      const updatedDays = { foo: 'bar' };
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      sinon.stub(isDayVisible, 'default').returns(false);
      const modifiers = wrapper.instance().deleteModifier(updatedDays, moment());
      expect(modifiers).to.equal(updatedDays);
    });

    it('has day args month ISO as key', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().deleteModifier({}, today);
      expect(Object.keys(modifiers)).to.contain(toISOMonthString(today));
    });

    it('has day ISO as key one layer down', () => {
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().addModifier({}, today);
      expect(Object.keys(modifiers[toISOMonthString(today)])).to.contain(toISODateString(today));
    });

    it('return value no longer has modifier arg for day if was in first arg', () => {
      const modifierToDelete = 'foo';
      const monthISO = toISOMonthString(today);
      const todayISO = toISODateString(today);
      const updatedDays = {
        [monthISO]: { [todayISO]: new Set([modifierToDelete, 'bar', 'baz']) },
      };
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      const modifiers = wrapper.instance().deleteModifier(updatedDays, today, modifierToDelete);
      expect(Array.from(modifiers[monthISO][todayISO])).to.not.contain(modifierToDelete);
    });

    it('return value no longer has modifier arg for day if was in state', () => {
      const modifierToDelete = 'foo';
      const monthISO = toISOMonthString(today);
      const todayISO = toISODateString(today);
      const wrapper = shallow((
        <DayPickerSingleDateController
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      ));
      wrapper.setState({
        visibleDays: {
          [monthISO]: { [todayISO]: new Set([modifierToDelete, 'bar', 'baz']) },
        },
      });
      const modifiers = wrapper.instance().deleteModifier({}, today, modifierToDelete);
      expect(Array.from(modifiers[monthISO][todayISO])).to.not.contain(modifierToDelete);
    });
  });

  describe('modifiers', () => {
    describe('#isBlocked', () => {
      it('returns true if props.isDayBlocked returns true', () => {
        const isDayBlockedStub = sinon.stub().returns(true);
        const isOutsideRangeStub = sinon.stub().returns(false);
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />
        ));
        expect(wrapper.instance().isBlocked()).to.equal(true);
      });

      it('returns true if props.isOutsideRange returns true', () => {
        const isOutsideRangeStub = sinon.stub().returns(true);
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            isOutsideRange={isOutsideRangeStub}
          />
        ));
        expect(wrapper.instance().isBlocked()).to.equal(true);
      });

      it('returns false if props.isDayBlocked and props.isOutsideRange both refurns false', () => {
        const isDayBlockedStub = sinon.stub().returns(false);
        const isOutsideRangeStub = sinon.stub().returns(false);
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />
        ));
        expect(wrapper.instance().isBlocked()).to.equal(false);
      });
    });

    describe('#isHovered', () => {
      it('returns true if day arg is equal to state.hoverDate', () => {
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />
        ));
        wrapper.setState({ hoverDate: today });
        expect(wrapper.instance().isHovered(today)).to.equal(true);
      });

      it('returns false if day arg is not equal to state.hoverDate', () => {
        const tomorrow = moment().add(1, 'days');
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />
        ));
        wrapper.setState({ hoverDate: today });
        expect(wrapper.instance().isHovered(tomorrow)).to.equal(false);
      });
    });

    describe('#isSelected', () => {
      it('returns true if day arg is equal to props.date', () => {
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            date={today}
          />
        ));
        expect(wrapper.instance().isSelected(today)).to.equal(true);
      });

      it('returns false if day arg is not equal to props.date', () => {
        const tomorrow = moment().add(1, 'days');
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            date={tomorrow}
          />
        ));
        expect(wrapper.instance().isSelected(today)).to.equal(false);
      });
    });

    describe('#isToday', () => {
      it('returns true if today', () => {
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />
        ));
        expect(wrapper.instance().isToday(today)).to.equal(true);
      });

      it('returns false if tomorrow', () => {
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />
        ));
        expect(wrapper.instance().isToday(moment(today).add(1, 'days'))).to.equal(false);
      });

      it('returns false if last month', () => {
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />
        ));
        expect(wrapper.instance().isToday(moment(today).subtract(1, 'months'))).to.equal(false);
      });
    });
  });

  describe('initialVisibleMonth', () => {
    describe('initialVisibleMonth is passed in', () => {
      it('DayPickerSingleDateController.props.initialVisibleMonth is equal to initialVisibleMonth', () => {
        const initialVisibleMonth = moment().add(7, 'months');
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            initialVisibleMonth={() => initialVisibleMonth}
            focused
          />
        ));
        const dayPicker = wrapper.find(DayPicker);
        const month = dayPicker.props().initialVisibleMonth().month();
        expect(month).to.equal(initialVisibleMonth.month());
      });
    });

    describe('initialVisibleMonth is not passed in', () => {
      it('DayPickerSingleDateController.props.initialVisibleMonth evaluates to date', () => {
        const date = moment().add(10, 'days');
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            date={date}
            focused
          />
        ));
        const dayPicker = wrapper.find(DayPicker);
        expect(dayPicker.props().initialVisibleMonth().month()).to.equal(date.month());
      });

      it('DayPickerSingleDateController.props.initialVisibleMonth evaluates to today if !date', () => {
        const wrapper = shallow((
          <DayPickerSingleDateController
            onDateChange={() => {}}
            onFocusChange={() => {}}
            focused
          />
        ));
        const dayPicker = wrapper.find(DayPicker);
        expect(dayPicker.props().initialVisibleMonth().isSame(today, 'day')).to.equal(true);
      });
    });
  });

  describe('onOutsideClick', () => {
    it('should render OutsideClickHandler as it has onOutsideClick prop', () => {
      const wrapper = shallow(<DayPickerSingleDateController onOutsideClick={() => null} />);
      expect(wrapper.find(OutsideClickHandler)).to.have.lengthOf(1);
    });

    it('should NOT render OutsideClickHandler without onOutsideClick prop', () => {
      const wrapper = shallow(<DayPickerSingleDateController />);
      expect(wrapper.find(OutsideClickHandler)).to.have.lengthOf(0);
    });
  });
});
