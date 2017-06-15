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

import DayPickerSingleDateController from '../../src/components/DayPickerSingleDateController';
import SingleDatePickerInput from '../../src/components/SingleDatePickerInput';
import SingleDatePicker from '../../src/components/SingleDatePicker';

import isSameDay from '../../src/utils/isSameDay';

// Set to noon to mimic how days in the picker are configured internally
const today = moment().startOf('day').hours(12);

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

    describe('DayPickerSingleDateController', () => {
      describe('props.focused === true', () => {
        it('renders a <DayPickerSingleDateController>', () => {
          const wrapper = shallow(
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />,
          );
          expect(wrapper.find(DayPickerSingleDateController)).to.have.lengthOf(1);
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
        it('does not render a <DayPickerSingleDateController>', () => {
          const wrapper = shallow(
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused={false}
            />,
          );
          expect(wrapper.find(DayPickerSingleDateController)).to.have.lengthOf(0);
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

      it('calls props.onClose with { date } as arg', () => {
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
        const newDate = onCloseStub.getCall(0).args[0].date;
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
});
