import React from 'react';
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
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find('.DateRangePicker__picker')).to.have.length(1);
    });

    it('renders <DateRangePickerInputWithHandlers />', () => {
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find(DateRangePickerInputController)).to.have.length(1);
    });

    it('renders <DayPickerRangeController />', () => {
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find(DayPickerRangeController)).to.have.length(1);
    });

    describe('props.orientation === VERTICAL_ORIENTATION', () => {
      it('renders .DateRangePicker__picker--vertical class', () => {
        const wrapper = shallow(<DateRangePicker orientation={VERTICAL_ORIENTATION} />);
        expect(wrapper.find('.DateRangePicker__picker--vertical')).to.have.length(1);
      });
    });

    describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
      it('renders .DateRangePicker__picker--horizontal class', () => {
        const wrapper = shallow(<DateRangePicker orientation={HORIZONTAL_ORIENTATION} />);
        expect(wrapper.find('.DateRangePicker__picker--horizontal')).to.have.length(1);
      });

      it('renders <DayPickerRangeController /> with props.numberOfMonths === 2', () => {
        const wrapper = shallow(<DateRangePicker orientation={HORIZONTAL_ORIENTATION} />);
        expect(wrapper.find(DayPickerRangeController).props().numberOfMonths).to.equal(2);
      });
    });

    describe('props.anchorDirection === ANCHOR_LEFT', () => {
      it('renders .DateRangePicker__picker--direction-left class', () => {
        const wrapper = shallow(<DateRangePicker anchorDirection={ANCHOR_LEFT} />);
        expect(wrapper.find('.DateRangePicker__picker--direction-left')).to.have.length(1);
      });
    });

    describe('props.orientation === ANCHOR_RIGHT', () => {
      it('renders .DateRangePicker__picker--direction-right class', () => {
        const wrapper = shallow(<DateRangePicker anchorDirection={ANCHOR_RIGHT} />);
        expect(wrapper.find('.DateRangePicker__picker--direction-right')).to.have.length(1);
      });
    });

    describe('props.withPortal is truthy', () => {
      it('renders .DateRangePicker__picker--portal class', () => {
        const wrapper = shallow(<DateRangePicker withPortal />);
        expect(wrapper.find('.DateRangePicker__picker--portal')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(<DateRangePicker withPortal />);
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('isOpened prop is false if props.focusedInput === null', () => {
          const wrapper =
            shallow(<DateRangePicker focusedInput={null} withPortal />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(false);
        });

        it('isOpened prop is true if props.focusedInput !== null', () => {
          const wrapper = shallow(<DateRangePicker withPortal focusedInput={START_DATE} />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('renders .DateRangePicker__picker--portal class', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
        expect(wrapper.find('.DateRangePicker__picker--portal')).to.have.length(1);
      });

      it('renders .DateRangePicker__picker--full-screen-portal class', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
        expect(wrapper.find('.DateRangePicker__picker--full-screen-portal')).to.have.length(1);
      });

      it('renders .DateRangePicker__close class', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
        expect(wrapper.find('.DateRangePicker__close')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('isOpened prop is false if props.focusedInput === null', () => {
          const wrapper =
            shallow(<DateRangePicker focusedInput={null} withFullScreenPortal />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(false);
        });

        it('isOpened prop is true if props.focusedInput !== null', () => {
          const wrapper =
            shallow(<DateRangePicker withFullScreenPortal focusedInput={START_DATE} />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });

    describe('props.focusedInput', () => {
      it('shows datepicker if props.focusedInput != null', () => {
        const wrapper = shallow(<DateRangePicker focusedInput={START_DATE} />);
        expect(wrapper.find('.DateRangePicker__picker--show')).to.have.length(1);
      });

      it('hides datepicker if props.focusedInput = null', () => {
        const wrapper = shallow(<DateRangePicker focusedInput={null} />);
        expect(wrapper.find('.DateRangePicker__picker--invisible')).to.have.length(1);
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
});
