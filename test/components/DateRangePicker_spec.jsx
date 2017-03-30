import React from 'react';
import moment from 'moment';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import Portal from 'react-portal';

import DateRangePicker from '../../src/components/DateRangePicker';

import DateRangePickerInputController from '../../src/components/DateRangePickerInputController';
import DayPickerRangeController from '../../src/components/DayPickerRangeController';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  START_DATE,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
} from '../../constants';

describe('DateRangePicker', () => {
  describe('#render()', () => {
    it('has .DateRangePicker class', () => {
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find('.DateRangePicker')).to.have.length(1);
    });

    it('renders .DateRangePicker__picker class', () => {
      const wrapper = shallow(<DateRangePicker focusedInput={START_DATE} />);
      expect(wrapper.find('.DateRangePicker__picker')).to.have.length(1);
    });

    it('renders <DateRangePickerInputWithHandlers />', () => {
      const wrapper = shallow(<DateRangePicker focusedInput={START_DATE} />);
      expect(wrapper.find(DateRangePickerInputController)).to.have.length(1);
    });

    it('renders <DayPickerRangeController />', () => {
      const wrapper = shallow(<DateRangePicker focusedInput={START_DATE} />);
      expect(wrapper.find(DayPickerRangeController)).to.have.length(1);
    });

    describe('props.orientation === VERTICAL_ORIENTATION', () => {
      it('renders .DateRangePicker__picker--vertical class', () => {
        const wrapper = shallow(
          <DateRangePicker orientation={VERTICAL_ORIENTATION} focusedInput={START_DATE} />,
        );
        expect(wrapper.find('.DateRangePicker__picker--vertical')).to.have.length(1);
      });
    });

    describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
      it('renders .DateRangePicker__picker--horizontal class', () => {
        const wrapper = shallow(
          <DateRangePicker orientation={HORIZONTAL_ORIENTATION} focusedInput={START_DATE} />,
        );
        expect(wrapper.find('.DateRangePicker__picker--horizontal')).to.have.length(1);
      });

      it('renders <DayPickerRangeController /> with props.numberOfMonths === 2', () => {
        const wrapper = shallow(
          <DateRangePicker orientation={HORIZONTAL_ORIENTATION} focusedInput={START_DATE} />,
        );
        expect(wrapper.find(DayPickerRangeController).props().numberOfMonths).to.equal(2);
      });
    });

    describe('props.anchorDirection === ANCHOR_LEFT', () => {
      it('renders .DateRangePicker__picker--direction-left class', () => {
        const wrapper = shallow(
          <DateRangePicker anchorDirection={ANCHOR_LEFT} focusedInput={START_DATE} />,
        );
        expect(wrapper.find('.DateRangePicker__picker--direction-left')).to.have.length(1);
      });
    });

    describe('props.orientation === ANCHOR_RIGHT', () => {
      it('renders .DateRangePicker__picker--direction-right class', () => {
        const wrapper = shallow(
          <DateRangePicker anchorDirection={ANCHOR_RIGHT} focusedInput={START_DATE} />,
        );
        expect(wrapper.find('.DateRangePicker__picker--direction-right')).to.have.length(1);
      });
    });

    describe('props.withPortal is truthy', () => {
      it('renders .DateRangePicker__picker--portal class', () => {
        const wrapper = shallow(<DateRangePicker withPortal focusedInput={START_DATE} />);
        expect(wrapper.find('.DateRangePicker__picker--portal')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(<DateRangePicker withPortal focusedInput={START_DATE} />);
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered if props.focusedInput === null', () => {
          const wrapper =
            shallow(<DateRangePicker focusedInput={null} withPortal />);
          expect(wrapper.find(Portal)).to.have.length(0);
        });

        it('isOpened prop is true if props.focusedInput !== null', () => {
          const wrapper = shallow(<DateRangePicker withPortal focusedInput={START_DATE} />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('renders .DateRangePicker__picker--portal class', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal focusedInput={START_DATE} />);
        expect(wrapper.find('.DateRangePicker__picker--portal')).to.have.length(1);
      });

      it('renders .DateRangePicker__picker--full-screen-portal class', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal focusedInput={START_DATE} />);
        expect(wrapper.find('.DateRangePicker__picker--full-screen-portal')).to.have.length(1);
      });

      it('does not render <DayPickerRangeController>', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
        expect(wrapper.find(DayPickerRangeController)).to.have.length(0);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <DateRangePicker withFullScreenPortal focusedInput={START_DATE} />,
          );
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered if props.focusedInput === null', () => {
          const wrapper =
            shallow(<DateRangePicker focusedInput={null} withFullScreenPortal />);
          expect(wrapper.find(Portal)).to.have.length(0);
        });

        it('isOpened prop is true if props.focusedInput !== null', () => {
          const wrapper =
            shallow(<DateRangePicker withFullScreenPortal focusedInput={START_DATE} />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });

    describe('props.focusedInput', () => {
      it('renders <DayPickerRangeController> if props.focusedInput != null', () => {
        const wrapper = shallow(<DateRangePicker focusedInput={START_DATE} />);
        expect(wrapper.find(DayPickerRangeController)).to.have.length(1);
      });

      it('does not render <DayPickerRangeController> if props.focusedInput = null', () => {
        const wrapper = shallow(<DateRangePicker focusedInput={null} />);
        expect(wrapper.find(DayPickerRangeController)).to.have.length(0);
      });
    });
  });

  describe('#onOutsideClick', () => {
    it('does not call props.onFocusChange if props.focusedInput = null', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper =
        shallow(<DateRangePicker focusedInput={null} onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onOutsideClick();
      expect(onFocusChangeStub.callCount).to.equal(0);
    });

    it('calls props.onFocusChange if props.focusedInput != null', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper =
        shallow(<DateRangePicker focusedInput={START_DATE} onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onOutsideClick();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });
  });

  describe('#onDateRangePickerInputFocus', () => {
    it('calls onFocusChange', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(
        <DateRangePicker
          onDatesChange={sinon.stub()}
          onFocusChange={onFocusChangeStub}
        />,
      );
      wrapper.instance().onDateRangePickerInputFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls onFocusChange with arg', () => {
      const test = 'foobar';
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(
        <DateRangePicker
          onDatesChange={sinon.stub()}
          onFocusChange={onFocusChangeStub}
        />,
      );
      wrapper.instance().onDateRangePickerInputFocus(test);
      expect(onFocusChangeStub.getCall(0).args[0]).to.equal(test);
    });

    describe('new focusedInput is truthy', () => {
      let onDayPickerFocusSpy;
      beforeEach(() => {
        onDayPickerFocusSpy = sinon.spy(DateRangePicker.prototype, 'onDayPickerFocus');
      });

      afterEach(() => {
        sinon.restore();
      });

      it('calls onDayPickerFocus if focusedInput and withPortal/withFullScreenPortal', () => {
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            withPortal
          />,
        );
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerFocusSpy.callCount).to.equal(1);
      });

      it('calls onDayPickerFocus if focusedInput and withFullScreenPortal', () => {
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            withFullScreenPortal
          />,
        );
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerFocusSpy.callCount).to.equal(1);
      });

      it('calls onDayPickerBlur if focusedInput and !withPortal/!withFullScreenPortal', () => {
        const onDayPickerBlurSpy = sinon.spy(DateRangePicker.prototype, 'onDayPickerBlur');
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={sinon.stub()}
            onFocusChange={sinon.stub()}
          />,
        );
        wrapper.instance().onDateRangePickerInputFocus(START_DATE);
        expect(onDayPickerBlurSpy.callCount).to.equal(1);
      });
    });
  });

  describe('#onDayPickerFocus', () => {
    it('sets state.isDateRangePickerInputFocused to false', () => {
      const wrapper = shallow(
        <DateRangePicker
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        isDateRangePickerInputFocused: true,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isDateRangePickerInputFocused).to.equal(false);
    });

    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow(
        <DateRangePicker
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        isDayPickerFocused: false,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isDayPickerFocused).to.equal(true);
    });
  });

  describe('#onDayPickerBlur', () => {
    it('sets state.isDateRangePickerInputFocused to true', () => {
      const wrapper = shallow(
        <DateRangePicker
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        isDateRangePickerInputFocused: false,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isDateRangePickerInputFocused).to.equal(true);
    });

    it('sets state.isDayPickerFocused to false', () => {
      const wrapper = shallow(
        <DateRangePicker
          onDatesChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />,
      );
      wrapper.setState({
        isDayPickerFocused: true,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isDayPickerFocused).to.equal(false);
    });
  });

  describe('initialVisibleMonth', () => {
    describe('initialVisibleMonth is passed in', () => {
      it('DayPickerRangeController.props.initialVisibleMonth is equal to initialVisibleMonth', () => {
        const initialVisibleMonth = () => {};
        const wrapper = shallow(
          <DateRangePicker focusedInput={START_DATE} initialVisibleMonth={initialVisibleMonth} />,
        );
        const dayPicker = wrapper.find(DayPickerRangeController);
        expect(dayPicker.props().initialVisibleMonth).to.equal(initialVisibleMonth);
      });
    });

    describe('initialVisibleMonth is not passed in', () => {
      it('DayPickerRangeController.props.initialVisibleMonth evaluates to startDate', () => {
        const startDate = moment().add(10, 'days');
        const wrapper =
          shallow(<DateRangePicker focusedInput={START_DATE} startDate={startDate} />);
        const dayPicker = wrapper.find(DayPickerRangeController);
        expect(dayPicker.props().initialVisibleMonth()).to.equal(startDate);
      });

      it('DayPickerRangeController.props.initialVisibleMonth evaluates to endDate if !startDate', () => {
        const endDate = moment().add(5, 'days');
        const wrapper =
          shallow(<DateRangePicker focusedInput={START_DATE} endDate={endDate} />);
        const dayPicker = wrapper.find(DayPickerRangeController);
        expect(dayPicker.props().initialVisibleMonth()).to.equal(endDate);
      });

      it('DayPickerRangeController.props.initialVisibleMonth evaluates to today if !startDate && !endDate', () => {
        const today = moment();
        const wrapper =
          shallow(<DateRangePicker focusedInput={START_DATE} />);
        const dayPicker = wrapper.find(DayPickerRangeController);
        expect(dayPicker.props().initialVisibleMonth().isSame(today, 'day')).to.equal(true);
      });
    });
  });
});
