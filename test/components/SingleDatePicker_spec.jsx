import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import moment from 'moment';
import { Portal } from 'react-portal';

import CloseButton from '../../src/components/CloseButton';
import DayPickerSingleDateController from '../../src/components/DayPickerSingleDateController';
import SingleDatePickerInput from '../../src/components/SingleDatePickerInput';
import SingleDatePicker, { PureSingleDatePicker } from '../../src/components/SingleDatePicker';

import isSameDay from '../../src/utils/isSameDay';

// Set to noon to mimic how days in the picker are configured internally
const today = moment().startOf('day').hours(12);

describe('SingleDatePicker', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    it('renders a SingleDatePickerInput', () => {
      const wrapper = shallow((
        <SingleDatePicker
          id="date"
          onDateChange={() => {}}
          onFocusChange={() => {}}
        />
      )).dive();
      expect(wrapper.find(SingleDatePickerInput)).to.have.lengthOf(1);
    });

    describe('DayPickerSingleDateController', () => {
      describe('props.focused === true', () => {
        it('renders a <DayPickerSingleDateController>', () => {
          const wrapper = shallow((
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />
          )).dive();
          expect(wrapper.find(DayPickerSingleDateController)).to.have.lengthOf(1);
        });
      });

      describe('props.focused === false', () => {
        it('does not render a <DayPickerSingleDateController>', () => {
          const wrapper = shallow((
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused={false}
            />
          )).dive();
          expect(wrapper.find(DayPickerSingleDateController)).to.have.lengthOf(0);
        });
      });

      describe('props.onClose is defined', () => {
        it('should pass props.onClose in to <DayPickerSingleDateController>', () => {
          const onCloseStub = sinon.stub();
          const wrapper = shallow((
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
              onClose={onCloseStub}
            />
          )).dive();
          expect(wrapper.find(DayPickerSingleDateController).prop('onClose')).to.equal(onCloseStub);
        });
      });

      it('should pass onDayPickerBlur as onBlur to <DayPickerSingleDateController>', () => {
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            focused
          />
        )).dive();
        const { onDayPickerBlur } = wrapper.instance();
        expect(wrapper.find(DayPickerSingleDateController).prop('onBlur')).to.equal(onDayPickerBlur);
      });
    });

    describe('props.withPortal is truthy', () => {
      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow((
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withPortal
              focused
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered if props.focused is falsy', () => {
          const wrapper = shallow((
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withPortal
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(0);
        });
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('renders CloseButton', () => {
        const wrapper = shallow((
          <SingleDatePicker
            onDateChange={() => {}}
            onFocusChange={() => {}}
            withFullScreenPortal
            focused
          />
        )).dive();
        expect(wrapper.find(CloseButton)).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow((
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withFullScreenPortal
              focused
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered when props.focused is falsy', () => {
          const wrapper = shallow((
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withFullScreenPortal
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(0);
        });
      });
    });
  });

  describe('#onChange', () => {
    describe('valid future date string', () => {
      const futureDateString = moment().add(10, 'days').format('YYYY-MM-DD');
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
        )).dive();
        wrapper.instance().onChange(futureDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with date as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
        )).dive();
        wrapper.instance().onChange(futureDateString);
        const newDate = onDateChangeStub.getCall(0).args[0];
        expect(isSameDay(newDate, moment(futureDateString))).to.equal(true);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
        )).dive();
        wrapper.instance().onChange(futureDateString);
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
        )).dive();
        wrapper.instance().onChange(futureDateString);
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });

      it('calls props.onClose once', () => {
        const onCloseStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />
        )).dive();
        wrapper.instance().onChange(futureDateString);
        expect(onCloseStub.callCount).to.equal(1);
      });

      it('calls props.onClose with { date } as arg', () => {
        const onCloseStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />
        )).dive();
        wrapper.instance().onChange(futureDateString);
        const newDate = onCloseStub.getCall(0).args[0].date;
        expect(isSameDay(newDate, moment(futureDateString))).to.equal(true);
      });
    });

    describe('matches custom display format', () => {
      const customFormat = 'YY|MM[foobar]DD';
      const customFormatDateString = moment().add(5, 'days').format(customFormat);
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            displayFormat={customFormat}
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
          />
        )).dive();
        wrapper.instance().onChange(customFormatDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with date as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            displayFormat={customFormat}
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
          />
        )).dive();
        wrapper.instance().onChange(customFormatDateString);
        const formattedFirstArg = onDateChangeStub.getCall(0).args[0].format(customFormat);
        expect(formattedFirstArg).to.equal(customFormatDateString);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            displayFormat={customFormat}
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
          />
        )).dive();
        wrapper.instance().onChange(customFormatDateString);
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            displayFormat={customFormat}
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
          />
        )).dive();
        wrapper.instance().onChange(customFormatDateString);
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });

    describe('invalid date string', () => {
      const invalidDateString = 'foobar';
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
        )).dive();
        wrapper.instance().onChange(invalidDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
        )).dive();
        wrapper.instance().onChange(invalidDateString);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });

      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
        )).dive();
        wrapper.instance().onChange(invalidDateString);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('date string outside range', () => {
      const isOutsideRangeStub = sinon.stub().returns(true);
      const todayDateString = today.toISOString();

      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isOutsideRange={isOutsideRangeStub}
          />
        )).dive();
        wrapper.instance().onChange(todayDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isOutsideRange={isOutsideRangeStub}
          />
        )).dive();
        wrapper.instance().onChange(todayDateString);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });

      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            isOutsideRange={isOutsideRangeStub}
          />
        )).dive();
        wrapper.instance().onChange(todayDateString);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });
  });

  describe('#onFocus', () => {
    let onDayPickerFocusSpy;
    beforeEach(() => {
      onDayPickerFocusSpy = sinon.spy(PureSingleDatePicker.prototype, 'onDayPickerFocus');
    });

    it('calls props.onFocusChange once', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
      )).dive();
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls props.onFocusChange with { focused: true } as arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
      )).dive();
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(true);
    });

    it('calls onDayPickerFocus if withPortal', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          withPortal
        />
      )).dive();
      wrapper.instance().onFocus();
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if withFullScreenPortal', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          withFullScreenPortal
        />
      )).dive();
      wrapper.instance().onFocus();
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerBlur if !withPortal/!withFullScreenPortal', () => {
      const onDayPickerBlurSpy = sinon.spy(PureSingleDatePicker.prototype, 'onDayPickerBlur');
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.instance().onFocus();
      expect(onDayPickerBlurSpy.callCount).to.equal(1);
    });

    describe('props.disabled = true', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            disabled
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
          />
        )).dive();
        wrapper.instance().onFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 0);
      });
    });
  });

  describe('#onClearFocus', () => {
    describe('props.focused = false', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused={false}
          />
        )).dive();
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('props.focused = true', () => {
      it('sets state.isDayPickerFocused to false', () => {
        const wrapper = shallow((
          <SingleDatePicker
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            focused
          />
        )).dive();
        wrapper.setState({
          isDayPickerFocused: true,
        });
        wrapper.instance().onClearFocus();
        expect(wrapper.state().isDayPickerFocused).to.equal(false);
      });

      it('sets state.isInputFocused to false', () => {
        const wrapper = shallow((
          <SingleDatePicker
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            focused
          />
        )).dive();
        wrapper.setState({
          isInputFocused: true,
        });
        wrapper.instance().onClearFocus();
        expect(wrapper.state().isInputFocused).to.equal(false);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused
          />
        )).dive();
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused
          />
        )).dive();
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });
  });

  describe('#onDayPickerFocus', () => {
    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: false,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isDayPickerFocused).to.equal(true);
    });

    it('sets state.isInputFocused to false', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isInputFocused: true,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isInputFocused).to.equal(false);
    });

    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
  });

  describe('#onDayPickerBlur', () => {
    it('sets state.isDayPickerFocused to false', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: true,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isDayPickerFocused).to.equal(false);
    });

    it('sets state.isInputFocused to true', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isInputFocused: false,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isInputFocused).to.equal(true);
    });

    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
  });

  describe('#showKeyboardShortcutsPanel', () => {
    it('sets state.isInputFocused to false', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isInputFocused: true,
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      expect(wrapper.state().isInputFocused).to.equal(false);
    });

    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: false,
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      expect(wrapper.state().isDayPickerFocused).to.equal(true);
    });

    it('sets state.showKeyboardShortcuts to true', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: false,
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(true);
    });
  });

  describe('#clearDate', () => {
    describe('props.reopenPickerOnClearDate is truthy', () => {
      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={onFocusChangeStub}
              reopenPickerOnClearDate
            />
          )).dive();
          wrapper.instance().clearDate();
          expect(onFocusChangeStub.callCount).to.equal(1);
        });
      });
    });

    describe('props.reopenPickerOnClearDate is falsy', () => {
      describe('props.onFocusChange', () => {
        it('is not called', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={onFocusChangeStub}
            />
          )).dive();
          wrapper.instance().clearDate();
          expect(onFocusChangeStub.callCount).to.equal(0);
        });
      });
    });

    it('calls props.onDateChange with null date', () => {
      const onDateChangeStub = sinon.stub();
      const wrapper = shallow((
        <SingleDatePicker id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
      )).dive();
      wrapper.instance().clearDate();
      expect(onDateChangeStub.callCount).to.equal(1);
    });
  });
});
