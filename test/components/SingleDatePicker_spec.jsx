import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import moment from 'moment';
import Portal from 'react-portal';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
} from '../../constants';

import DayPicker from '../../src/components/DayPicker';
import SingleDatePickerInput from '../../src/components/SingleDatePickerInput';
import SingleDatePicker from '../../src/components/SingleDatePicker';

import toISODateString from '../../src/utils/toISODateString';
import toISOMonthString from '../../src/utils/toISOMonthString';
import isSameDay from '../../src/utils/isSameDay';
import * as isDayVisible from '../../src/utils/isDayVisible';

// Set to noon to mimic how days in the picker are configured internally
const today = moment().startOf('day').hours(12);

function getCallsByModifier(stub, modifier) {
  return stub.getCalls().filter(call => call.args[call.args.length - 1] === modifier);
}

describe('SingleDatePicker', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    it('is .SingleDatePicker class', () => {
      const wrapper = shallow(
        <SingleDatePicker
          id="date"
          onDateChange={() => {}}
          onFocusChange={() => {}}
        />,
      );
      expect(wrapper.is('.SingleDatePicker')).to.equal(true);
    });

    it('renders a SingleDatePickerInput', () => {
      const wrapper = shallow(
        <SingleDatePicker
          id="date"
          onDateChange={() => {}}
          onFocusChange={() => {}}
        />,
      );
      expect(wrapper.find(SingleDatePickerInput)).to.have.lengthOf(1);
    });

    describe('DayPicker', () => {
      describe('props.focused === true', () => {
        it('renders a <DayPicker>', () => {
          const wrapper = shallow(
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />,
          );
          expect(wrapper.find(DayPicker)).to.have.lengthOf(1);
        });
      });

      it('has .SingleDatePicker__picker class', () => {
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            focused
          />,
        );
        expect(wrapper.find('.SingleDatePicker__picker')).to.have.lengthOf(1);
      });

      it('has .SingleDatePicker__picker--rtl class', () => {
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            focused
            isRTL
          />,
        );
        expect(wrapper.find('.SingleDatePicker__picker--rtl')).to.have.lengthOf(1);
      });

      describe('props.focused === false', () => {
        it('does not render a <DayPicker>', () => {
          const wrapper = shallow(
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused={false}
            />,
          );
          expect(wrapper.find(DayPicker)).to.have.lengthOf(0);
        });
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('has .SingleDatePicker__picker--horizontal class', () => {
          const wrapper = shallow(
            <SingleDatePicker
              id="date"
              orientation={HORIZONTAL_ORIENTATION}
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />,
          );
          expect(wrapper.find('.SingleDatePicker__picker--horizontal')).to.have.lengthOf(1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('has .SingleDatePicker__picker--vertical class', () => {
          const wrapper = shallow(
            <SingleDatePicker
              id="date"
              orientation={VERTICAL_ORIENTATION}
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />,
          );
          expect(wrapper.find('.SingleDatePicker__picker--vertical')).to.have.lengthOf(1);
        });
      });

      describe('props.anchorDirection === ANCHOR_LEFT', () => {
        it('renders .SingleDatePicker__picker--direction-left class', () => {
          const wrapper = shallow(
            <SingleDatePicker
              anchorDirection={ANCHOR_LEFT}
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />,
          );
          expect(wrapper.find('.SingleDatePicker__picker--direction-left')).to.have.length(1);
        });
      });

      describe('props.orientation === ANCHOR_RIGHT', () => {
        it('renders .SingleDatePicker__picker--direction-right class', () => {
          const wrapper = shallow(
            <SingleDatePicker
              anchorDirection={ANCHOR_RIGHT}
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />,
          );
          expect(wrapper.find('.SingleDatePicker__picker--direction-right')).to.have.length(1);
        });
      });

      describe('a valid date is hovered', () => {
        it('has .SingleDatePicker__picker--valid-date-hovered class', () => {
          const wrapper = shallow(
            <SingleDatePicker
              id="date"
              orientation={VERTICAL_ORIENTATION}
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />,
          );
          wrapper.setState({
            hoverDate: moment(),
          });
          expect(wrapper.find('.SingleDatePicker__picker--valid-date-hovered')).to.have.lengthOf(1);
        });
      });
    });

    describe('props.withPortal is truthy', () => {
      it('renders .SingleDatePicker__picker--portal class', () => {
        const wrapper = shallow(
          <SingleDatePicker
            onDateChange={() => {}}
            onFocusChange={() => {}}
            withPortal
            focused
          />,
        );
        expect(wrapper.find('.SingleDatePicker__picker--portal')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withPortal
              focused
            />,
          );
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered if props.focused is falsey', () => {
          const wrapper = shallow(
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withPortal
            />,
          );
          expect(wrapper.find(Portal)).to.have.length(0);
        });

        it('isOpened prop is true if props.focused is true', () => {
          const wrapper = shallow(
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withPortal
              focused
            />,
          );
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('renders .SingleDatePicker__picker--portal class', () => {
        const wrapper = shallow(
          <SingleDatePicker
            onDateChange={() => {}}
            onFocusChange={() => {}}
            withFullScreenPortal
            focused
          />,
        );
        expect(wrapper.find('.SingleDatePicker__picker--portal')).to.have.length(1);
      });

      it('renders .SingleDatePicker__picker--full-screen-portal class', () => {
        const wrapper = shallow(
          <SingleDatePicker
            onDateChange={() => {}}
            onFocusChange={() => {}}
            withFullScreenPortal
            focused
          />,
        );
        expect(wrapper.find('.SingleDatePicker__picker--full-screen-portal')).to.have.length(1);
      });

      it('renders .SingleDatePicker__close class', () => {
        const wrapper = shallow(
          <SingleDatePicker
            onDateChange={() => {}}
            onFocusChange={() => {}}
            withFullScreenPortal
            focused
          />,
        );
        expect(wrapper.find('.SingleDatePicker__close')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withFullScreenPortal
              focused
            />,
          );
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered when props.focused is falsey', () => {
          const wrapper = shallow(
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withFullScreenPortal
            />,
          );
          expect(wrapper.find(Portal)).to.have.length(0);
        });

        it('isOpened prop is true if props.focused is truthy', () => {
          const wrapper = shallow(
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withFullScreenPortal
              focused
            />,
          );
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });
  });

  describe('#componentWillReceiveProps', () => {
    const props = {
      ...SingleDatePicker.defaultProps,
      onDateChange() {},
      onFocusChange() {},
    };

    describe('modifiers', () => {
      describe('selected modifier', () => {
        describe('props.date did not change', () => {
          it('does not call this.addModifier with `selected', () => {
            const addModifierSpy = sinon.spy(SingleDatePicker.prototype, 'addModifier');
            const date = today;
            const wrapper = shallow(<SingleDatePicker {...props} date={date} />);
            wrapper.instance().componentWillReceiveProps({ ...props, date });
            expect(getCallsByModifier(addModifierSpy, 'selected').length).to.equal(0);
          });

          it('does not call this.deleteModifier with `selected', () => {
            const deleteModifierSpy = sinon.spy(SingleDatePicker.prototype, 'deleteModifier');
            const date = today;
            const wrapper = shallow(<SingleDatePicker {...props} date={date} />);
            wrapper.instance().componentWillReceiveProps({ ...props, date });
            expect(getCallsByModifier(deleteModifierSpy, 'selected').length).to.equal(0);
          });
        });

        describe('props.date changed', () => {
          it('deleteModifier gets called with old date and `selected`', () => {
            const deleteModifierSpy = sinon.spy(SingleDatePicker.prototype, 'deleteModifier');
            const date = today;
            const newDate = moment().add(1, 'day');
            const wrapper = shallow(<SingleDatePicker {...props} date={date} />);
            wrapper.instance().componentWillReceiveProps({ ...props, date: newDate });
            const selectedCalls = getCallsByModifier(deleteModifierSpy, 'selected');
            expect(selectedCalls.length).to.equal(1);
            expect(selectedCalls[0].args[1]).to.equal(date);
          });

          it('addModifier gets called with new startDate and `selected-start`', () => {
            const addModifierSpy = sinon.spy(SingleDatePicker.prototype, 'addModifier');
            const date = today;
            const newDate = moment().add(1, 'day');
            const wrapper = shallow(<SingleDatePicker {...props} date={date} />);
            wrapper.instance().componentWillReceiveProps({ ...props, date: newDate });
            const selectedStartCalls = getCallsByModifier(addModifierSpy, 'selected');
            expect(selectedStartCalls.length).to.equal(1);
            expect(selectedStartCalls[0].args[1]).to.equal(newDate);
          });
        });
      });

      describe('blocked-out-of-range', () => {
        describe('props.focused did not change', () => {
          it('does not call isOutsideRange', () => {
            const isOutsideRangeStub = sinon.stub();
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isOutsideRange: isOutsideRangeStub,
            });
            expect(isOutsideRangeStub.callCount).to.equal(0);
          });
        });

        describe('props.focused changed', () => {
          const visibleDays = {
            [toISOMonthString(today)]: {
              [toISODateString(today)]: [],
              [toISODateString(moment().add(1, 'day'))]: [],
              [toISODateString(moment().add(2, 'day'))]: [],
            },
          };
          const numVisibleDays = 3;

          it('calls isOutsideRange for every visible day', () => {
            const isOutsideRangeStub = sinon.stub();
            const wrapper = shallow(<SingleDatePicker {...props} />);
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
              SingleDatePicker.prototype,
              'addModifier',
            );
            const isOutsideRangeStub = sinon.stub().returns(true);
            const wrapper = shallow(<SingleDatePicker {...props} />);
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
              SingleDatePicker.prototype,
              'deleteModifier',
            );
            const isOutsideRangeStub = sinon.stub().returns(false);
            const wrapper = shallow(<SingleDatePicker {...props} />);
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
          it('does not call isDayBlocked', () => {
            const isDayBlockedStub = sinon.stub();
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isDayBlocked: isDayBlockedStub,
            });
            expect(isDayBlockedStub.callCount).to.equal(0);
          });
        });

        describe('props.focused changed', () => {
          const visibleDays = {
            [toISOMonthString(today)]: {
              [toISODateString(today)]: [],
              [toISODateString(moment().add(1, 'day'))]: [],
              [toISODateString(moment().add(2, 'day'))]: [],
            },
          };
          const numVisibleDays = 3;

          it('calls isDayBlocked for every visible day', () => {
            const isDayBlockedStub = sinon.stub();
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isDayBlocked: isDayBlockedStub,
            });
            expect(isDayBlockedStub.callCount).to.equal(numVisibleDays);
          });

          it('if isDayBlocked(day) is true calls addModifier with `blocked-calendar` for each day', () => {
            const addModifierSpy = sinon.spy(SingleDatePicker.prototype, 'addModifier');
            const isDayBlockedStub = sinon.stub().returns(true);
            const wrapper = shallow(<SingleDatePicker {...props} />);
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
            const deleteModifierSpy =
              sinon.spy(SingleDatePicker.prototype, 'deleteModifier');
            const isDayBlockedStub = sinon.stub().returns(false);
            const wrapper = shallow(<SingleDatePicker {...props} />);
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
          it('does not call isDayHighlighted', () => {
            const isDayHighlightedStub = sinon.stub();
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.instance().componentWillReceiveProps({
              ...props,
              isDayHighlighted: isDayHighlightedStub,
            });
            expect(isDayHighlightedStub.callCount).to.equal(0);
          });
        });

        describe('focusedInput changed', () => {
          const visibleDays = {
            [toISOMonthString(today)]: {
              [toISODateString(today)]: [],
              [toISODateString(moment().add(1, 'day'))]: [],
              [toISODateString(moment().add(2, 'day'))]: [],
            },
          };
          const numVisibleDays = 3;

          it('calls isDayHighlighted for every visible day', () => {
            const isDayHighlightedStub = sinon.stub();
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.setState({ visibleDays });
            wrapper.instance().componentWillReceiveProps({
              ...props,
              focused: true,
              isDayHighlighted: isDayHighlightedStub,
            });
            expect(isDayHighlightedStub.callCount).to.equal(numVisibleDays);
          });

          it('if isDayHighlighted(day) is true calls addModifier with day and `highlighted-calendar`', () => {
            const addModifierSpy = sinon.spy(SingleDatePicker.prototype, 'addModifier');
            const isDayHighlightedStub = sinon.stub().returns(true);
            const wrapper = shallow(<SingleDatePicker {...props} />);
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
            const deleteModifierSpy =
              sinon.spy(SingleDatePicker.prototype, 'deleteModifier');
            const isDayHighlightedStub = sinon.stub().returns(false);
            const wrapper = shallow(<SingleDatePicker {...props} />);
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
            const deleteModifierSpy =
              sinon.spy(SingleDatePicker.prototype, 'deleteModifier');
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.instance().today = today;
            wrapper.instance().componentWillReceiveProps(props);
            const todayCalls = getCallsByModifier(deleteModifierSpy, 'today');
            expect(todayCalls.length).to.equal(0);
          });

          it('does not call addModifier with `today`', () => {
            const addModifierSpy = sinon.spy(SingleDatePicker.prototype, 'addModifier');
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.instance().today = today;
            wrapper.instance().componentWillReceiveProps(props);
            const todayCalls = getCallsByModifier(addModifierSpy, 'today');
            expect(todayCalls.length).to.equal(0);
          });
        });

        describe('this.today is no longer today', () => {
          it('calls deleteModifier with this.today and `today` modifier', () => {
            const deleteModifierSpy =
              sinon.spy(SingleDatePicker.prototype, 'deleteModifier');
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.instance().today = moment().subtract(1, 'day');
            wrapper.instance().componentWillReceiveProps(props);
            const todayCalls = getCallsByModifier(deleteModifierSpy, 'today');
            expect(todayCalls.length).to.equal(1);
          });

          it('calls addModifier with new today and `today` modifiers', () => {
            const addModifierSpy = sinon.spy(SingleDatePicker.prototype, 'addModifier');
            const wrapper = shallow(<SingleDatePicker {...props} />);
            wrapper.instance().today = moment().subtract(1, 'day');
            wrapper.instance().componentWillReceiveProps(props);
            const todayCalls = getCallsByModifier(addModifierSpy, 'today');
            expect(todayCalls.length).to.equal(1);
          });
        });
      });
    });
  });

  describe('#onChange', () => {
    describe('valid future date string', () => {
      const futureDateString = moment().add(10, 'days').format('YYYY-MM-DD');
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />,
        );
        wrapper.instance().onChange(futureDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with date as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />,
        );
        wrapper.instance().onChange(futureDateString);
        const newDate = onDateChangeStub.getCall(0).args[0];
        expect(isSameDay(newDate, moment(futureDateString))).to.equal(true);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />,
        );
        wrapper.instance().onChange(futureDateString);
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />,
        );
        wrapper.instance().onChange(futureDateString);
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });

      it('calls props.onClose once', () => {
        const onCloseStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />,
        );
        wrapper.instance().onChange(futureDateString);
        expect(onCloseStub.callCount).to.equal(1);
      });

      it('calls props.onClose with { startDate, endDate } as arg', () => {
        const startDate = moment();
        const onCloseStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            startDate={startDate}
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />,
        );
        wrapper.instance().onChange(futureDateString);
        expect(onCloseStub.getCall(0).args[0].startDate).to.equal(startDate);

        const newDate = onCloseStub.getCall(0).args[0].endDate;
        expect(isSameDay(newDate, moment(futureDateString))).to.equal(true);
      });
    });

    describe('matches custom display format', () => {
      const customFormat = 'MM[foobar]DD';
      const customFormatDateString = moment().add(5, 'days').format(customFormat);
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker
          id="date"
          displayFormat={customFormat}
          onDateChange={onDateChangeStub}
          onFocusChange={() => {}}
        />);
        wrapper.instance().onChange(customFormatDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with date as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker
          id="date"
          displayFormat={customFormat}
          onDateChange={onDateChangeStub}
          onFocusChange={() => {}}
        />);
        wrapper.instance().onChange(customFormatDateString);
        const formattedFirstArg = onDateChangeStub.getCall(0).args[0].format(customFormat);
        expect(formattedFirstArg).to.equal(customFormatDateString);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker
          id="date"
          displayFormat={customFormat}
          onDateChange={() => {}}
          onFocusChange={onFocusChangeStub}
        />);
        wrapper.instance().onChange(customFormatDateString);
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker
          id="date"
          displayFormat={customFormat}
          onDateChange={() => {}}
          onFocusChange={onFocusChangeStub}
        />);
        wrapper.instance().onChange(customFormatDateString);
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });

    describe('invalid date string', () => {
      const invalidDateString = 'foobar';
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />,
        );
        wrapper.instance().onChange(invalidDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />,
        );
        wrapper.instance().onChange(invalidDateString);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });

      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />,
        );
        wrapper.instance().onChange(invalidDateString);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('date string outside range', () => {
      const isOutsideRangeStub = sinon.stub().returns(true);
      const todayDateString = today.toISOString();

      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        wrapper.instance().onChange(todayDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        wrapper.instance().onChange(todayDateString);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });

      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        wrapper.instance().onChange(todayDateString);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });
  });

  describe('#onDayClick', () => {
    describe('day arg is blocked', () => {
      it('props.onDateChange is not called', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isDayBlocked={() => true}
          />,
        );
        wrapper.instance().onDayClick(moment());
        expect(onDateChangeStub.callCount).to.equal(0);
      });

      it('props.onFocusChange is not called', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            isDayBlocked={() => true}
          />,
        );
        wrapper.instance().onDayClick(moment());
        expect(onFocusChangeStub.callCount).to.equal(0);
      });

      it('props.onClose is not called', () => {
        const onCloseStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
            isDayBlocked={() => true}
          />,
        );
        wrapper.instance().onDayClick(moment());
        expect(onCloseStub.callCount).to.equal(0);
      });

      it('calls props.onClose with { startDate, endDate } as arg', () => {
        const startDate = moment();
        const endDate = moment().add(5, 'days');
        const onCloseStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            startDate={startDate}
            endDate={endDate}
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />,
        );

        wrapper.instance().onDayClick(endDate);
        expect(onCloseStub.getCall(0).args[0].startDate).to.equal(startDate);
        expect(onCloseStub.getCall(0).args[0].endDate).to.equal(endDate);
      });
    });

    describe('day arg is not blocked', () => {
      it('props.onDateChange is called', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />,
        );
        wrapper.instance().onDayClick(moment());
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('props.onFocusChange is called', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />,
        );
        wrapper.instance().onDayClick(moment());
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('props.onClose is called', () => {
        const onCloseStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />,
        );
        wrapper.instance().onDayClick(moment());
        expect(onCloseStub.callCount).to.equal(1);
      });
    });
  });

  describe('#onDayMouseEnter', () => {
    it('sets state.hoverDate to day arg', () => {
      const wrapper = shallow(
        <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={() => {}} />,
      );
      wrapper.instance().onDayMouseEnter(today);
      expect(wrapper.state().hoverDate).to.equal(today);
    });

    describe('modifiers', () => {
      it('calls addModifier', () => {
        const addModifierSpy = sinon.spy(SingleDatePicker.prototype, 'addModifier');
        const wrapper = shallow(
          <SingleDatePicker
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
          />,
        );
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
        const deleteModifierSpy = sinon.spy(SingleDatePicker.prototype, 'deleteModifier');
        const wrapper = shallow(
          <SingleDatePicker
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
          />,
        );
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
      const wrapper = shallow(
        <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={() => {}} />,
      );
      wrapper.instance().onDayMouseLeave();
      expect(wrapper.state().hoverDate).to.equal(null);
    });

    it('calls deleteModifier with hoverDate and `hovered` modifier', () => {
      const deleteModifierSpy = sinon.spy(SingleDatePicker.prototype, 'deleteModifier');
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
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

  describe('#onFocus', () => {
    let onDayPickerFocusSpy;
    beforeEach(() => {
      onDayPickerFocusSpy = sinon.spy(SingleDatePicker.prototype, 'onDayPickerFocus');
    });

    it('calls props.onFocusChange once', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(
        <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />,
      );
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls props.onFocusChange with { focused: true } as arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(
        <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />,
      );
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(true);
    });

    it('calls onDayPickerFocus if withPortal', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          withPortal
        />,
      );
      wrapper.instance().onFocus();
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if withFullScreenPortal', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          withFullScreenPortal
        />,
      );
      wrapper.instance().onFocus();
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerBlur if !withPortal/!withFullScreenPortal', () => {
      const onDayPickerBlurSpy = sinon.spy(SingleDatePicker.prototype, 'onDayPickerBlur');
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.instance().onFocus();
      expect(onDayPickerBlurSpy.callCount).to.equal(1);
    });

    describe('props.disabled = true', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            disabled
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
          />);
        wrapper.instance().onFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 0);
      });
    });
  });

  describe('#onClearFocus', () => {
    describe('props.focused = false', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused={false}
          />,
        );
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('props.focused = true', () => {
      it('sets state.isDayPickerFocused to false', () => {
        const wrapper = shallow(
          <SingleDatePicker
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            focused
          />,
        );
        wrapper.setState({
          isDayPickerFocused: true,
        });
        wrapper.instance().onClearFocus();
        expect(wrapper.state().isDayPickerFocused).to.equal(false);
      });

      it('sets state.isInputFocused to false', () => {
        const wrapper = shallow(
          <SingleDatePicker
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            focused
          />,
        );
        wrapper.setState({
          isInputFocused: true,
        });
        wrapper.instance().onClearFocus();
        expect(wrapper.state().isInputFocused).to.equal(false);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused
          />,
        );
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused
          />,
        );
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });
  });

  describe('#onDayPickerFocus', () => {
    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        isDayPickerFocused: false,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isDayPickerFocused).to.equal(true);
    });

    it('sets state.isInputFocused to false', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        isInputFocused: true,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isInputFocused).to.equal(false);
    });
  });

  describe('#onDayPickerBlur', () => {
    it('sets state.isDayPickerFocused to false', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        isDayPickerFocused: true,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isDayPickerFocused).to.equal(false);
    });

    it('sets state.isInputFocused to true', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        isInputFocused: false,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isInputFocused).to.equal(true);
    });
  });

  describe('#onPrevMonthClick', () => {
    it('updates state.currentMonth to subtract 1 month', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        currentMonth: today,
      });
      wrapper.instance().onPrevMonthClick();
      expect(wrapper.state().currentMonth.month()).to.equal(today.month() - 1);
    });

    it('new visibleDays has previous month', () => {
      const numberOfMonths = 2;
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          numberOfMonths={numberOfMonths}
        />,
      );
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
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          numberOfMonths={numberOfMonths}
        />,
      );
      wrapper.setState({
        currentMonth: today,
      });
      wrapper.instance().onPrevMonthClick();
      const visibleDays = Object.keys(wrapper.state().visibleDays);
      expect(visibleDays).to.not.include(toISOMonthString(moment().add(numberOfMonths, 'months')));
    });

    it('calls this.getModifiers', () => {
      const getModifiersSpy = sinon.spy(SingleDatePicker.prototype, 'getModifiers');
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      getModifiersSpy.reset();
      wrapper.instance().onPrevMonthClick();
      expect(getModifiersSpy.callCount).to.equal(1);
    });

    it('calls props.onPrevMonthClick', () => {
      const onPrevMonthClickStub = sinon.stub();
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          onPrevMonthClick={onPrevMonthClickStub}
        />,
      );
      wrapper.instance().onPrevMonthClick();
      expect(onPrevMonthClickStub.callCount).to.equal(1);
    });
  });

  describe('#onNextMonthClick', () => {
    it('updates state.currentMonth to add 1 month', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        currentMonth: today,
      });
      wrapper.instance().onNextMonthClick();
      expect(wrapper.state().currentMonth.month()).to.equal(today.month() + 1);
    });

    it('new visibleDays has next month', () => {
      const numberOfMonths = 2;
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          numberOfMonths={numberOfMonths}
        />,
      );
      wrapper.setState({
        currentMonth: today,
      });
      const newMonth = moment().add(numberOfMonths + 1, 'months');
      wrapper.instance().onNextMonthClick();
      const visibleDays = Object.keys(wrapper.state().visibleDays);
      expect(visibleDays).to.include(toISOMonthString(newMonth));
    });

    it('new visibleDays does not have current month', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          numberOfMonths={2}
        />,
      );
      wrapper.setState({
        currentMonth: today,
      });
      wrapper.instance().onNextMonthClick();
      const visibleDays = Object.keys(wrapper.state().visibleDays);
      expect(visibleDays).to.not.include(toISOMonthString(today.clone().subtract(1, 'month')));
    });

    it('calls this.getModifiers', () => {
      const getModifiersSpy = sinon.spy(SingleDatePicker.prototype, 'getModifiers');
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      getModifiersSpy.reset();
      wrapper.instance().onNextMonthClick();
      expect(getModifiersSpy.callCount).to.equal(1);
    });

    it('calls props.onNextMonthClick', () => {
      const onNextMonthClickStub = sinon.stub();
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          onNextMonthClick={onNextMonthClickStub}
        />,
      );
      wrapper.instance().onNextMonthClick();
      expect(onNextMonthClickStub.callCount).to.equal(1);
    });
  });

  describe('#getFirstFocusableDay', () => {
    it('returns first day of arg month if not blocked and props.date is falsey', () => {
      sinon.stub(SingleDatePicker.prototype, 'isBlocked').returns(false);
      const wrapper = shallow(
        <SingleDatePicker
          date={null}
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
      expect(firstFocusableDay.isSame(today.clone().startOf('month'), 'day')).to.equal(true);
    });

    it('returns props.date if exists and is not blocked', () => {
      sinon.stub(SingleDatePicker.prototype, 'isBlocked').returns(false);
      const date = today.clone().add(10, 'days');
      const wrapper = shallow(
        <SingleDatePicker
          date={date}
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
      expect(firstFocusableDay.isSame(date, 'day')).to.equal(true);
    });

    describe('desired date is blocked', () => {
      it('returns first unblocked visible day if exists', () => {
        const isBlockedStub = sinon.stub(SingleDatePicker.prototype, 'isBlocked');
        const date = moment().endOf('month').subtract(10, 'days');
        const wrapper = shallow(
          <SingleDatePicker
            date={date}
            onFocusChange={sinon.stub()}
            onDateChange={sinon.stub()}
          />,
        );

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
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().getModifiers(visibleDays);
      expect(Object.keys(modifiers[monthISO]).length).to.equal(visibleDays[monthISO].length);
    });

    it('calls this.getModifiersForDay for each day in input', () => {
      const getModifiersForDaySpy =
        sinon.spy(SingleDatePicker.prototype, 'getModifiersForDay');
      const monthISO = toISOMonthString(today);
      const visibleDays = {
        [monthISO]: [today, moment().add(1, 'day'), moment().add(2, 'days')],
      };
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      getModifiersForDaySpy.reset();
      wrapper.instance().getModifiers(visibleDays);

      expect(getModifiersForDaySpy.callCount).to.equal(visibleDays[monthISO].length);
    });
  });

  describe('#getModifiersForDay', () => {
    it('only contains `valid` if all modifier methods return false', () => {
      sinon.stub(SingleDatePicker.prototype, 'isToday').returns(false);
      sinon.stub(SingleDatePicker.prototype, 'isBlocked').returns(false);
      const isDayBlockedStub = sinon.stub().returns(false);
      const isOutsideRangeStub = sinon.stub().returns(false);
      const isDayHighlightedStub = sinon.stub().returns(false);
      sinon.stub(SingleDatePicker.prototype, 'isSelected').returns(false);
      sinon.stub(SingleDatePicker.prototype, 'isHovered').returns(false);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          isDayBlocked={isDayBlockedStub}
          isOutsideRange={isOutsideRangeStub}
          isDayHighlighted={isDayHighlightedStub}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.size).to.equal(1);
      expect(modifiers.has('valid')).to.equal(true);
    });

    it('contains `today` if this.isToday returns true', () => {
      sinon.stub(SingleDatePicker.prototype, 'isToday').returns(true);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('today')).to.equal(true);
    });

    it('contains `blocked` if this.isBlocked returns true', () => {
      sinon.stub(SingleDatePicker.prototype, 'isBlocked').returns(true);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('blocked')).to.equal(true);
    });

    it('contains `blocked-calendar` if props.isDayBlocked returns true', () => {
      const isDayBlockedStub = sinon.stub().returns(true);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          isDayBlocked={isDayBlockedStub}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('blocked-calendar')).to.equal(true);
    });

    it('contains `blocked-out-of-range` if props.isOutsideRange returns true', () => {
      const isOutsideRangeStub = sinon.stub().returns(true);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          isOutsideRange={isOutsideRangeStub}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('blocked-out-of-range')).to.equal(true);
    });

    it('contains `highlighted-calendar` if props.isDayHighlighted returns true', () => {
      const isDayHighlightedStub = sinon.stub().returns(true);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          isDayHighlighted={isDayHighlightedStub}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('highlighted-calendar')).to.equal(true);
    });

    it('contains `valid` if this.isBlocked returns false', () => {
      sinon.stub(SingleDatePicker.prototype, 'isBlocked').returns(false);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('valid')).to.equal(true);
    });

    it('contains `selected` if this.isSelected returns true', () => {
      sinon.stub(SingleDatePicker.prototype, 'isSelected').returns(true);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('selected')).to.equal(true);
    });

    it('contains `hovered` if this.isHovered returns true', () => {
      sinon.stub(SingleDatePicker.prototype, 'isHovered').returns(true);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().getModifiersForDay(moment());
      expect(modifiers.has('hovered')).to.equal(true);
    });
  });

  describe('#addModifier', () => {
    it('returns first arg if no day given', () => {
      const updatedDays = { foo: 'bar' };
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().addModifier(updatedDays);
      expect(modifiers).to.equal(updatedDays);
    });

    it('returns first arg if day is not visible', () => {
      const updatedDays = { foo: 'bar' };
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      sinon.stub(isDayVisible, 'default').returns(false);
      const modifiers = wrapper.instance().addModifier(updatedDays, moment());
      expect(modifiers).to.equal(updatedDays);
    });

    it('has day args month ISO as key', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().addModifier({}, today);
      expect(Object.keys(modifiers)).to.contain(toISOMonthString(today));
    });

    it('has day ISO as key one layer down', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
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
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().addModifier(updatedDays, today, modifierToAdd);
      expect(Array.from(modifiers[monthISO][todayISO])).to.contain(modifierToAdd);
    });

    it('return value no longer has modifier arg for day if was in state', () => {
      const modifierToAdd = 'foo';
      const monthISO = toISOMonthString(today);
      const todayISO = toISODateString(today);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
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
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().deleteModifier(updatedDays);
      expect(modifiers).to.equal(updatedDays);
    });

    it('returns first arg if day is not visible', () => {
      const updatedDays = { foo: 'bar' };
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      sinon.stub(isDayVisible, 'default').returns(false);
      const modifiers = wrapper.instance().deleteModifier(updatedDays, moment());
      expect(modifiers).to.equal(updatedDays);
    });

    it('has day args month ISO as key', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().deleteModifier({}, today);
      expect(Object.keys(modifiers)).to.contain(toISOMonthString(today));
    });

    it('has day ISO as key one layer down', () => {
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
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
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      const modifiers = wrapper.instance().deleteModifier(updatedDays, today, modifierToDelete);
      expect(Array.from(modifiers[monthISO][todayISO])).to.not.contain(modifierToDelete);
    });

    it('return value no longer has modifier arg for day if was in state', () => {
      const modifierToDelete = 'foo';
      const monthISO = toISOMonthString(today);
      const todayISO = toISODateString(today);
      const wrapper = shallow(
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        visibleDays: {
          [monthISO]: { [todayISO]: new Set([modifierToDelete, 'bar', 'baz']) },
        },
      });
      const modifiers = wrapper.instance().deleteModifier({}, today, modifierToDelete);
      expect(Array.from(modifiers[monthISO][todayISO])).to.not.contain(modifierToDelete);
    });
  });

  describe('#clearDate', () => {
    describe('props.reopenPickerOnClearDate is truthy', () => {
      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow(
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={onFocusChangeStub}
              reopenPickerOnClearDate
            />);
          wrapper.instance().clearDate();
          expect(onFocusChangeStub.callCount).to.equal(1);
        });
      });
    });

    describe('props.reopenPickerOnClearDate is falsy', () => {
      describe('props.onFocusChange', () => {
        it('is not called', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow(
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={onFocusChangeStub}
            />,
          );
          wrapper.instance().clearDate();
          expect(onFocusChangeStub.callCount).to.equal(0);
        });
      });
    });

    it('calls props.onDateChange with null date', () => {
      const onDateChangeStub = sinon.stub();
      const wrapper = shallow(
        <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />,
      );
      wrapper.instance().clearDate();
      expect(onDateChangeStub.callCount).to.equal(1);
    });
  });

  describe('modifiers', () => {
    describe('#isBlocked', () => {
      it('returns true if props.isDayBlocked returns true', () => {
        const isDayBlockedStub = sinon.stub().returns(true);
        const isOutsideRangeStub = sinon.stub().returns(false);
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        expect(wrapper.instance().isBlocked()).to.equal(true);
      });

      it('returns true if props.isOutsideRange returns true', () => {
        const isOutsideRangeStub = sinon.stub().returns(true);
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        expect(wrapper.instance().isBlocked()).to.equal(true);
      });

      it('returns false if props.isDayBlocked and props.isOutsideRange both refurns false', () => {
        const isDayBlockedStub = sinon.stub().returns(false);
        const isOutsideRangeStub = sinon.stub().returns(false);
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        expect(wrapper.instance().isBlocked()).to.equal(false);
      });
    });

    describe('#isHovered', () => {
      it('returns true if day arg is equal to state.hoverDate', () => {
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />,
        );
        wrapper.setState({ hoverDate: today });
        expect(wrapper.instance().isHovered(today)).to.equal(true);
      });

      it('returns false if day arg is not equal to state.hoverDate', () => {
        const tomorrow = moment().add(1, 'days');
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />,
        );
        wrapper.setState({ hoverDate: today });
        expect(wrapper.instance().isHovered(tomorrow)).to.equal(false);
      });
    });

    describe('#isSelected', () => {
      it('returns true if day arg is equal to props.date', () => {
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            date={today}
          />,
        );
        expect(wrapper.instance().isSelected(today)).to.equal(true);
      });

      it('returns false if day arg is not equal to props.date', () => {
        const tomorrow = moment().add(1, 'days');
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            date={tomorrow}
          />,
        );
        expect(wrapper.instance().isSelected(today)).to.equal(false);
      });
    });

    describe('#isToday', () => {
      it('returns true if today', () => {
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />,
        );
        expect(wrapper.instance().isToday(today)).to.equal(true);
      });

      it('returns false if tomorrow', () => {
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />,
        );
        expect(wrapper.instance().isToday(moment(today).add(1, 'days'))).to.equal(false);
      });

      it('returns false if last month', () => {
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />,
        );
        expect(wrapper.instance().isToday(moment(today).subtract(1, 'months'))).to.equal(false);
      });
    });
  });

  describe('initialVisibleMonth', () => {
    describe('initialVisibleMonth is passed in', () => {
      it('DayPicker.props.initialVisibleMonth is equal to initialVisibleMonth', () => {
        const initialVisibleMonth = moment().add(7, 'months');
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            initialVisibleMonth={() => initialVisibleMonth}
            focused
          />,
        );
        const dayPicker = wrapper.find(DayPicker);
        expect(dayPicker.props().initialVisibleMonth()).to.equal(initialVisibleMonth);
      });
    });

    describe('initialVisibleMonth is not passed in', () => {
      it('DayPicker.props.initialVisibleMonth evaluates to date', () => {
        const date = moment().add(10, 'days');
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            date={date}
            focused
          />,
        );
        const dayPicker = wrapper.find(DayPicker);
        expect(dayPicker.props().initialVisibleMonth()).to.equal(date);
      });

      it('SingleDatePicker.props.initialVisibleMonth evaluates to today if !date', () => {
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            focused
          />,
        );
        const dayPicker = wrapper.find(DayPicker);
        expect(dayPicker.props().initialVisibleMonth().isSame(today, 'day')).to.equal(true);
      });
    });
  });
});
