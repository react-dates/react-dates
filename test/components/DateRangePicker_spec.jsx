import React from 'react';
import moment from 'moment';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow, mount } from 'enzyme';
import { Portal } from 'react-portal';

import DateRangePicker, { PureDateRangePicker } from '../../src/components/DateRangePicker';

import DateRangePickerInputController from '../../src/components/DateRangePickerInputController';
import DayPickerRangeController from '../../src/components/DayPickerRangeController';
import DayPicker from '../../src/components/DayPicker';

import {
  HORIZONTAL_ORIENTATION,
  START_DATE,
} from '../../src/constants';

import describeIfWindow from '../_helpers/describeIfWindow';

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <div>
        <DateRangePicker
          {...this.props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
        />
        <button type="button">
          Dummy button
        </button>
      </div>
    );
  }
}

const requiredProps = {
  onDatesChange: () => {},
  onFocusChange: () => {},
  startDateId: 'startDate',
  endDateId: 'endDate',
};

describe('DateRangePicker', () => {
  describe('#render()', () => {
    it('renders <DateRangePickerInputWithHandlers />', () => {
      const wrapper = shallow((
        <DateRangePicker {...requiredProps} focusedInput={START_DATE} />
      )).dive();
      expect(wrapper.find(DateRangePickerInputController)).to.have.length(1);
    });

    it('renders <DayPickerRangeController />', () => {
      const wrapper = shallow((
        <DateRangePicker {...requiredProps} focusedInput={START_DATE} />
      )).dive();
      expect(wrapper.find(DayPickerRangeController)).to.have.length(1);
    });

    describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
      it('renders <DayPickerRangeController /> with props.numberOfMonths === 2', () => {
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            orientation={HORIZONTAL_ORIENTATION}
            focusedInput={START_DATE}
          />
        )).dive();
        expect(wrapper.find(DayPickerRangeController).props().numberOfMonths).to.equal(2);
      });
    });

    it('should pass onDayPickerBlur as onBlur to <DayPickerRangeController>', () => {
      const wrapper = shallow((
        <DateRangePicker {...requiredProps} focusedInput={START_DATE} />
      )).dive();
      const { onDayPickerBlur } = wrapper.instance();
      expect(wrapper.find(DayPickerRangeController).prop('onBlur')).to.equal(onDayPickerBlur);
    });

    describe('props.withPortal is truthy', () => {
      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow((
            <DateRangePicker
              {...requiredProps}
              withPortal
              focusedInput={START_DATE}
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered if props.focusedInput === null', () => {
          const wrapper = shallow((
            <DateRangePicker {...requiredProps} focusedInput={null} withPortal />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(0);
        });
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('does not render <DayPickerRangeController>', () => {
        const wrapper = shallow(<DateRangePicker {...requiredProps} withFullScreenPortal />).dive();
        expect(wrapper.find(DayPickerRangeController)).to.have.length(0);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow((
            <DateRangePicker {...requiredProps} withFullScreenPortal focusedInput={START_DATE} />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered if props.focusedInput === null', () => {
          const wrapper = shallow((
            <DateRangePicker
              {...requiredProps}
              focusedInput={null}
              withFullScreenPortal
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(0);
        });
      });
    });

    describe('props.isDayBlocked is defined', () => {
      it('should pass props.isDayBlocked to <DateRangePickerInputController>', () => {
        const isDayBlocked = sinon.stub();
        const wrapper = shallow((
          <DateRangePicker {...requiredProps} isDayBlocked={isDayBlocked} />
        )).dive();
        expect(wrapper.find(DateRangePickerInputController).prop('isDayBlocked')).to.equal(isDayBlocked);
      });

      it('is a noop when omitted', () => {
        const wrapper = shallow((
          <DateRangePicker {...requiredProps} />
        )).dive();
        expect(wrapper.find(DateRangePickerInputController).prop('isDayBlocked')).not.to.throw();
      });
    });

    describe('props.appendToBody', () => {
      it('renders <DayPickerRangeController> inside <Portal>', () => {
        const wrapper = shallow((
          <DateRangePicker {...requiredProps} appendToBody focusedInput={START_DATE} />
        )).dive();
        const portal = wrapper.find(Portal);
        expect(portal).to.have.length(1);
        expect(portal.find(DayPickerRangeController)).to.have.length(1);
      });

      describeIfWindow('mounted', () => {
        let wrapper;
        let instance;
        let onCloseStub;

        beforeEach(() => {
          onCloseStub = sinon.stub();
          wrapper = mount(shallow((
            <DateRangePicker
              {...requiredProps}
              appendToBody
              focusedInput={START_DATE}
              onClose={onCloseStub}
            />
          )).get(0));
          instance = wrapper.instance();
        });

        it('positions <DateRangePickerInputController> using top and transform CSS properties', () => {
          const dayPickerEl = instance.dayPickerContainer;
          expect(dayPickerEl.style.top).not.to.equal('');
          expect(dayPickerEl.style.transform).not.to.equal('');
        });

        it('disables scroll', () => {
          expect(instance.enableScroll).to.be.a('function');
        });

        it('ignores click events from inside picker', () => {
          const event = { target: instance.dayPickerContainer };
          instance.onOutsideClick(event);
          expect(onCloseStub.callCount).to.equal(0);
        });

        it('enables scroll when closed', () => {
          const enableScrollSpy = sinon.spy(instance, 'enableScroll');
          wrapper.setProps({ focusedInput: null });
          expect(enableScrollSpy.callCount).to.equal(1);
        });

        it('enables scroll when unmounted', () => {
          const enableScrollSpy = sinon.spy(instance, 'enableScroll');
          wrapper.unmount();
          expect(enableScrollSpy.callCount).to.equal(1);
        });
      });
    });

    describe('props.focusedInput', () => {
      it('renders <DayPickerRangeController> if props.focusedInput != null', () => {
        const wrapper = shallow((
          <DateRangePicker {...requiredProps} focusedInput={START_DATE} />
        )).dive();
        expect(wrapper.find(DayPickerRangeController)).to.have.length(1);
      });

      it('does not render <DayPickerRangeController> if props.focusedInput = null', () => {
        const wrapper = shallow(<DateRangePicker {...requiredProps} focusedInput={null} />).dive();
        expect(wrapper.find(DayPickerRangeController)).to.have.length(0);
      });
    });
  });

  describe('#onOutsideClick', () => {
    it('does not call props.onFocusChange if props.focusedInput = null', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          focusedInput={null}
          onFocusChange={onFocusChangeStub}
        />
      )).dive();
      wrapper.instance().onOutsideClick();
      expect(onFocusChangeStub.callCount).to.equal(0);
    });

    it('calls props.onFocusChange if props.focusedInput != null', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          focusedInput={START_DATE}
          onFocusChange={onFocusChangeStub}
        />
      )).dive();
      wrapper.instance().onOutsideClick();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('sets state.isDateRangePickerInputFocused to false', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          focusedInput={START_DATE}
          onFocusChange={sinon.stub()}
          onDatesChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDateRangePickerInputFocused: true,
      });
      wrapper.instance().onOutsideClick();
      expect(wrapper.state().isDateRangePickerInputFocused).to.equal(false);
    });

    it('sets state.isDayPickerFocused to false', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          focusedInput={START_DATE}
          onFocusChange={sinon.stub()}
          onDatesChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: true,
      });
      wrapper.instance().onOutsideClick();
      expect(wrapper.state().isDayPickerFocused).to.equal(false);
    });

    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          focusedInput={START_DATE}
          onFocusChange={sinon.stub()}
          onDatesChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().onOutsideClick();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });

    it('does not call props.onClose if props.focusedInput = null', () => {
      const onCloseStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          focusedInput={null}
          onClose={onCloseStub}
          onFocusChange={() => null}
        />
      )).dive();
      wrapper.instance().onOutsideClick();
      expect(onCloseStub.callCount).to.equal(0);
    });

    it('calls props.onClose with startDate and endDate if props.focusedInput != null', () => {
      const startDate = moment();
      const endDate = startDate.add(1, 'days');
      const onCloseStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          startDate={startDate}
          endDate={endDate}
          focusedInput={START_DATE}
          onClose={onCloseStub}
          onFocusChange={() => null}
        />
      )).dive();

      wrapper.instance().onOutsideClick();
      expect(onCloseStub.callCount).to.equal(1);
      const args = onCloseStub.getCall(0).args[0];
      expect(args.startDate).to.equal(startDate);
      expect(args.endDate).to.equal(endDate);
    });
  });

  describe('#onDateRangePickerInputFocus', () => {
    it('calls onFocusChange', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={onFocusChangeStub}
        />
      )).dive();
      wrapper.instance().onDateRangePickerInputFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls onFocusChange with arg', () => {
      const test = 'foobar';
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={onFocusChangeStub}
        />
      )).dive();
      wrapper.instance().onDateRangePickerInputFocus(test);
      expect(onFocusChangeStub.getCall(0).args[0]).to.equal(test);
    });

    describe('new focusedInput is truthy', () => {
      let onDayPickerFocusSpy;
      let onDayPickerBlurSpy;
      beforeEach(() => {
        onDayPickerFocusSpy = sinon.spy(PureDateRangePicker.prototype, 'onDayPickerFocus');
        onDayPickerBlurSpy = sinon.spy(PureDateRangePicker.prototype, 'onDayPickerBlur');
      });

      afterEach(() => {
        sinon.restore();
      });

      it('calls onDayPickerFocus if focusedInput and withPortal/withFullScreenPortal', () => {
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            onDatesChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            withPortal
          />
        )).dive();
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerFocusSpy.callCount).to.equal(1);
      });

      it('calls onDayPickerFocus if focusedInput and withFullScreenPortal', () => {
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            onDatesChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            withFullScreenPortal
          />
        )).dive();
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerFocusSpy.callCount).to.equal(1);
      });

      it('calls onDayPickerFocus if focusedInput and readOnly', () => {
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            onDatesChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            readOnly
          />
        )).dive();
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerFocusSpy.callCount).to.equal(1);
      });

      it('calls onDayPickerFocus if focusedInput and isTouchDevice', () => {
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            onDatesChange={sinon.stub()}
            onFocusChange={sinon.stub()}
          />
        )).dive();
        wrapper.instance().isTouchDevice = true;
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerFocusSpy.callCount).to.equal(1);
      });

      it('calls onDayPickerBlur if focusedInput and !withPortal/!withFullScreenPortal/!readOnly and keepFocusOnInput', () => {
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            keepFocusOnInput
          />
        )).dive();
        wrapper.instance().isTouchDevice = true;
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerBlurSpy.callCount).to.equal(1);
      });

      it('calls onDayPickerFocus if focusedInput and withPortal/withFullScreenPortal and keepFocusOnInput', () => {
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            keepFocusOnInput
            withFullScreenPortal
          />
        )).dive();
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerFocusSpy.callCount).to.equal(1);
      });

      it('calls onDayPickerBlur if focusedInput and !withPortal/!withFullScreenPortal/!readOnly', () => {
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            onDatesChange={sinon.stub()}
            onFocusChange={sinon.stub()}
          />
        )).dive();
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerBlurSpy.callCount).to.equal(1);
      });
    });
  });

  describe('#onDayPickerFocus', () => {
    it('sets state.isDateRangePickerInputFocused to false', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDateRangePickerInputFocused: true,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isDateRangePickerInputFocused).to.equal(false);
    });

    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: false,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isDayPickerFocused).to.equal(true);
    });

    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });

    describe('focusedInput is truthy', () => {
      it('does not call onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            focusedInput={START_DATE}
            onDatesChange={sinon.stub()}
            onFocusChange={onFocusChangeStub}
          />
        )).dive();
        wrapper.instance().onDayPickerFocus();
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('focusedInput is falsy', () => {
      it('calls onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            focusedInput={null}
            onDatesChange={sinon.stub()}
            onFocusChange={onFocusChangeStub}
          />
        )).dive();
        wrapper.instance().onDayPickerFocus();
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls onFocusChange with START_DATE as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            focusedInput={null}
            onDatesChange={sinon.stub()}
            onFocusChange={onFocusChangeStub}
          />
        )).dive();
        wrapper.instance().onDayPickerFocus();
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
      });
    });
  });

  describeIfWindow('day picker position', () => {
    it('day picker is opened after the end date input when end date input is focused', () => {
      const wrapper = mount((
        <DateRangePickerWrapper
          startDateId="startDate"
          endDateId="endDate"
        />
      ));
      expect(wrapper.find(DayPicker)).to.have.length(0);
      wrapper.find('input').at(0).simulate('focus'); // when focusing on start date the day picker is rendered after the start date input
      expect(wrapper.find('DateRangePickerInput').children().childAt(1).find(DayPicker)).to.have.length(1);
      wrapper.find('input').at(1).simulate('focus'); // when focusing on end date the day picker is rendered after the end date input
      expect(wrapper.find('DateRangePickerInput').children().childAt(1).find(DayPicker)).to.have.length(0);
      expect(wrapper.find('DateRangePickerInput').children().childAt(3).find(DayPicker)).to.have.length(1);
    });
  });

  describeIfWindow('#onDayPickerBlur', () => {
    it('sets state.isDateRangePickerInputFocused to true', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDateRangePickerInputFocused: false,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isDateRangePickerInputFocused).to.equal(true);
    });

    it('sets state.isDayPickerFocused to false', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: true,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isDayPickerFocused).to.equal(false);
    });

    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });

    it('tabbing out with keyboard behaves as an outside click', () => {
      const target = sinon.stub();
      const onOutsideClick = sinon.stub();
      const dayPickerContainer = {
        addEventListener: sinon.stub(),
        contains: sinon.stub().returns(false),
      };
      const wrapper = shallow((<DateRangePicker {...requiredProps} />)).dive();
      wrapper.instance().setDayPickerContainerRef(dayPickerContainer);
      wrapper.instance().onOutsideClick = onOutsideClick;
      expect(onOutsideClick.callCount).to.equal(0);
      wrapper.instance().onDayPickerFocusOut({ key: 'Tab', shiftKey: false, target });
      expect(onOutsideClick.callCount).to.equal(1);
    });

    it('tabbing within itself does not behave as an outside click', () => {
      const target = sinon.stub();
      const onOutsideClick = sinon.stub();
      const dayPickerContainer = {
        addEventListener: sinon.stub(),
        contains: sinon.stub().returns(true),
      };
      const wrapper = shallow((<DateRangePicker {...requiredProps} />)).dive();
      wrapper.instance().setDayPickerContainerRef(dayPickerContainer);
      wrapper.instance().onOutsideClick = onOutsideClick;
      wrapper.instance().onDayPickerFocusOut({ key: 'Tab', shiftKey: false, target });
      expect(onOutsideClick.callCount).to.equal(0);
    });
  });

  describe('#showKeyboardShortcutsPanel', () => {
    it('sets state.isDateRangePickerInputFocused to false', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDateRangePickerInputFocused: true,
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      expect(wrapper.state().isDateRangePickerInputFocused).to.equal(false);
    });

    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow((
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
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
        <DateRangePicker
          {...requiredProps}
          onDatesChange={sinon.stub()}
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

  describe('initialVisibleMonth', () => {
    describe('initialVisibleMonth is passed in', () => {
      it('DayPickerRangeController.props.initialVisibleMonth is equal to initialVisibleMonth', () => {
        const initialVisibleMonth = () => {};
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            focusedInput={START_DATE}
            initialVisibleMonth={initialVisibleMonth}
          />
        )).dive();
        const dayPicker = wrapper.find(DayPickerRangeController);
        expect(dayPicker.props().initialVisibleMonth).to.equal(initialVisibleMonth);
      });
    });

    describe('initialVisibleMonth is not passed in', () => {
      it('DayPickerRangeController.props.initialVisibleMonth evaluates to startDate', () => {
        const startDate = moment().add(10, 'days');
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            focusedInput={START_DATE}
            startDate={startDate}
          />
        )).dive();
        const dayPicker = wrapper.find(DayPickerRangeController);
        expect(dayPicker.props().initialVisibleMonth()).to.equal(startDate);
      });

      it('DayPickerRangeController.props.initialVisibleMonth evaluates to endDate if !startDate', () => {
        const endDate = moment().add(5, 'days');
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            focusedInput={START_DATE}
            endDate={endDate}
          />
        )).dive();
        const dayPicker = wrapper.find(DayPickerRangeController);
        expect(dayPicker.props().initialVisibleMonth()).to.equal(endDate);
      });

      it('DayPickerRangeController.props.initialVisibleMonth evaluates to today if !startDate && !endDate', () => {
        const today = moment();
        const wrapper = shallow((
          <DateRangePicker {...requiredProps} focusedInput={START_DATE} />
        )).dive();
        const dayPicker = wrapper.find(DayPickerRangeController);
        expect(dayPicker.props().initialVisibleMonth().isSame(today, 'day')).to.equal(true);
      });
    });
  });

  describe('dateOffsets', () => {
    describe('startDateOffset is passed in', () => {
      it('Should pass startDateOffset to DayPickerRangeController', () => {
        const startDate = moment('2018-10-17');
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            startDateOffset={(date) => date.subtract(5, 'days')}
            onDatesChange={onDatesChangeStub}
            focusedInput={START_DATE}
          />
        )).dive();

        const dayPicker = wrapper.find(DayPickerRangeController);
        const dayPickerStartDateOffset = dayPicker.props().startDateOffset(startDate);

        expect(dayPickerStartDateOffset.format()).to.equal(startDate.format());
      });
    });

    describe('endDateOffset is passed in', () => {
      it('Should pass endDateOffset to DayPickerRangeController', () => {
        const endDate = moment('2018-10-17', 'YYYY-MM-DD');
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            endDateOffset={(date) => date.subtract(5, 'days')}
            onDatesChange={onDatesChangeStub}
            focusedInput={START_DATE}
          />
        )).dive();

        const dayPicker = wrapper.find(DayPickerRangeController);
        const dayPickerEndDateOffset = dayPicker.props().endDateOffset(endDate);

        expect(dayPickerEndDateOffset.format()).to.equal(endDate.format());
      });
    });
  });

  describe('minDate and maxDate props', () => {
    describe('minDate is passed in', () => {
      it('Should pass minDate to DayPickerRangeController', () => {
        const minDate = moment('2018-10-19');
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            focusedInput={START_DATE}
            minDate={minDate}
          />
        )).dive();
        expect(wrapper.find(DayPickerRangeController).props().minDate).to.equal(minDate);
      });
    });

    describe('maxDate is passed in', () => {
      it('Should pass maxDate to DayPickerRangeController', () => {
        const maxDate = moment('2018-12-19');
        const wrapper = shallow((
          <DateRangePicker
            {...requiredProps}
            focusedInput={START_DATE}
            maxDate={maxDate}
          />
        )).dive();
        expect(wrapper.find(DayPickerRangeController).props().maxDate).to.equal(maxDate);
      });
    });
  });

  it('should pass noBorder as noBorder to <DayPickerRangeController>', () => {
    const wrapper = shallow((
      <DateRangePicker {...requiredProps} focusedInput={START_DATE} noBorder />
    )).dive();

    expect(wrapper.find(DayPickerRangeController).prop('noBorder')).to.equal(true);
  });
});
