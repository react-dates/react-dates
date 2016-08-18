import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import moment from 'moment';
import Portal from 'react-portal';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

import DayPicker from '../../src/components/DayPicker';
import OutsideClickHandler from '../../src/components/OutsideClickHandler';
import SingleDatePickerInput from '../../src/components/SingleDatePickerInput';
import SingleDatePicker from '../../src/components/SingleDatePicker';

describe('SingleDatePicker', () => {
  describe('#render', () => {
    it('is .SingleDatePicker class', () => {
      const wrapper = shallow(<SingleDatePicker id="date" />);
      expect(wrapper.is('.SingleDatePicker')).to.equal(true);
    });

    it('renders an OutsideClickHandler', () => {
      const wrapper = shallow(<SingleDatePicker id="date" />);
      expect(wrapper.find(OutsideClickHandler)).to.have.lengthOf(1);
    });

    it('renders a SingleDatePickerInput', () => {
      const wrapper = shallow(<SingleDatePicker id="date" />);
      expect(wrapper.find(SingleDatePickerInput)).to.have.lengthOf(1);
    });

    describe('DayPicker', () => {
      it('renders a DayPicker', () => {
        const wrapper = shallow(<SingleDatePicker id="date" />);
        expect(wrapper.find(DayPicker)).to.have.lengthOf(1);
      });

      it('has .SingleDatePicker__picker class', () => {
        const wrapper = shallow(<SingleDatePicker id="date" />);
        expect(wrapper.find('.SingleDatePicker__picker')).to.have.lengthOf(1);
      });

      describe('props.focused === true', () => {
        it('has .SingleDatePicker__picker--show class', () => {
          const wrapper = shallow(<SingleDatePicker id="date" focused />);
          expect(wrapper.find('.SingleDatePicker__picker--show')).to.have.lengthOf(1);
        });
      });

      describe('props.focused === false', () => {
        it('has .SingleDatePicker__picker--invisible class', () => {
          const wrapper = shallow(<SingleDatePicker id="date" focused={false} />);
          expect(wrapper.find('.SingleDatePicker__picker--invisible')).to.have.lengthOf(1);
        });
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('has .SingleDatePicker__picker--horizontal class', () => {
          const wrapper =
            shallow(<SingleDatePicker id="date" orientation={HORIZONTAL_ORIENTATION} />);
          expect(wrapper.find('.SingleDatePicker__picker--horizontal')).to.have.lengthOf(1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('has .SingleDatePicker__picker--vertical class', () => {
          const wrapper =
            shallow(<SingleDatePicker id="date" orientation={VERTICAL_ORIENTATION} />);
          expect(wrapper.find('.SingleDatePicker__picker--vertical')).to.have.lengthOf(1);
        });
      });

      describe('a valid date is hovered', () => {
        it('has .SingleDatePicker__picker--valid-date-hovered class', () => {
          const wrapper =
            shallow(<SingleDatePicker id="date" orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            hoverDate: moment(),
          });
          expect(wrapper.find('.SingleDatePicker__picker--valid-date-hovered')).to.have.lengthOf(1);
        });
      });
    });

    describe('props.withPortal is truthy', () => {
      it('renders .SingleDatePicker__picker--portal class', () => {
        const wrapper = shallow(<SingleDatePicker withPortal />);
        expect(wrapper.find('.SingleDatePicker__picker--portal')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(<SingleDatePicker withPortal />);
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('isOpened prop is false if props.focused is falsey', () => {
          const wrapper =
            shallow(<SingleDatePicker focusedInput={null} withPortal />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(false);
        });

        it('isOpened prop is true if props.focused is true', () => {
          const wrapper = shallow(<SingleDatePicker withPortal focused />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('renders .SingleDatePicker__picker--portal class', () => {
        const wrapper = shallow(<SingleDatePicker withFullScreenPortal />);
        expect(wrapper.find('.SingleDatePicker__picker--portal')).to.have.length(1);
      });

      it('renders .SingleDatePicker__picker--full-screen-portal class', () => {
        const wrapper = shallow(<SingleDatePicker withFullScreenPortal />);
        expect(wrapper.find('.SingleDatePicker__picker--full-screen-portal')).to.have.length(1);
      });

      it('renders .SingleDatePicker__close class', () => {
        const wrapper = shallow(<SingleDatePicker withFullScreenPortal />);
        expect(wrapper.find('.SingleDatePicker__close')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(<SingleDatePicker withFullScreenPortal />);
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('isOpened prop is false if props.focused is falsey', () => {
          const wrapper =
            shallow(<SingleDatePicker focusedInput={null} withFullScreenPortal />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(false);
        });

        it('isOpened prop is true if props.focused is truthy', () => {
          const wrapper =
            shallow(<SingleDatePicker withFullScreenPortal focused />);
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
        const wrapper = shallow(<SingleDatePicker id="date" onDateChange={onDateChangeStub} />);
        wrapper.instance().onChange(futureDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with date as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onDateChange={onDateChangeStub} />);
        wrapper.instance().onChange(futureDateString);
        expect(onDateChangeStub.getCall(0).args[0].isSame(futureDateString)).to.equal(true);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} />);
        wrapper.instance().onChange(futureDateString);
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} />);
        wrapper.instance().onChange(futureDateString);
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
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
        const wrapper = shallow(<SingleDatePicker id="date" onDateChange={onDateChangeStub} />);
        wrapper.instance().onChange(invalidDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onDateChange={onDateChangeStub} />);
        wrapper.instance().onChange(invalidDateString);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });

      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} />);
        wrapper.instance().onChange(invalidDateString);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('date string outside range', () => {
      const isOutsideRangeStub = sinon.stub().returns(true);
      const today = moment().toISOString();

      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={onDateChangeStub}
            isOutsideRange={isOutsideRangeStub}
          />
        );
        wrapper.instance().onChange(today);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onDateChange={onDateChangeStub}
            isOutsideRange={isOutsideRangeStub}
          />
        );
        wrapper.instance().onChange(today);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });

      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            onFocusChange={onFocusChangeStub}
            isOutsideRange={isOutsideRangeStub}
          />
        );
        wrapper.instance().onChange(today);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });
  });

  describe('#onDayClick', () => {
    describe('day arg is blocked', () => {
      it('props.onDateChange is not called', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onDateChange={onDateChangeStub} />);
        wrapper.instance().onDayClick(moment(), ['blocked']);
        expect(onDateChangeStub.callCount).to.equal(0);
      });

      it('props.onFocusChange is not called', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} />);
        wrapper.instance().onDayClick(moment(), ['blocked']);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('day arg is not blocked', () => {
      it('props.onDateChange is called', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onDateChange={onDateChangeStub} />);
        wrapper.instance().onDayClick(moment(), []);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('props.onFocusChange is called', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} />);
        wrapper.instance().onDayClick(moment(), []);
        expect(onFocusChangeStub.callCount).to.equal(1);
      });
    });
  });

  describe('#onDayMouseEnter', () => {
    it('sets state.hoverDate to day arg', () => {
      const today = moment();
      const wrapper = shallow(<SingleDatePicker id="date" />);
      wrapper.instance().onDayMouseEnter(today);
      expect(wrapper.state().hoverDate).to.equal(today);
    });
  });

  describe('#onDayMouseLeave', () => {
    it('sets state.hoverDate to null', () => {
      const wrapper = shallow(<SingleDatePicker id="date" />);
      wrapper.instance().onDayMouseLeave();
      expect(wrapper.state().hoverDate).to.equal(null);
    });
  });

  describe('#onFocus', () => {
    it('calls props.onFocusChange once', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls props.onFocusChange with { focused: true } as arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(true);
    });

    describe('props.disabled = true', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <SingleDatePicker
            id="date"
            disabled
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
        const wrapper =
          shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} focused={false} />);
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('props.focused = true', () => {
      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper =
          shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} focused />);
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper =
          shallow(<SingleDatePicker id="date" onFocusChange={onFocusChangeStub} focused />);
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });
  });

  describe('#isBlocked', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('returns true if props.isDayBlocked returns true', () => {
      const isDayBlockedStub = sinon.stub().returns(true);
      const isOutsideRangeStub = sinon.stub().returns(false);
      const wrapper = shallow(
        <SingleDatePicker
          id="date"
          isDayBlocked={isDayBlockedStub}
          isOutsideRange={isOutsideRangeStub}
        />
      );
      expect(wrapper.instance().isBlocked()).to.equal(true);
    });

    it('returns true if props.isOutsideRange returns true', () => {
      const isOutsideRangeStub = sinon.stub().returns(true);
      const wrapper = shallow(<SingleDatePicker id="date" isOutsideRange={isOutsideRangeStub} />);
      expect(wrapper.instance().isBlocked()).to.equal(true);
    });

    it('returns false if props.isDayBlocked and props.isOutsideRange both refurns false', () => {
      const isDayBlockedStub = sinon.stub().returns(false);
      const isOutsideRangeStub = sinon.stub().returns(false);
      const wrapper = shallow(
        <SingleDatePicker
          id="date"
          isDayBlocked={isDayBlockedStub}
          isOutsideRange={isOutsideRangeStub}
        />
      );
      expect(wrapper.instance().isBlocked()).to.equal(false);
    });
  });

  describe('#isHovered', () => {
    it('returns true if day arg is equal to state.hoverDate', () => {
      const today = moment();
      const wrapper = shallow(<SingleDatePicker id="date" />);
      wrapper.setState({ hoverDate: today });
      expect(wrapper.instance().isHovered(today)).to.equal(true);
    });

    it('returns false if day arg is not equal to state.hoverDate', () => {
      const today = moment();
      const tomorrow = moment().add(1, 'days');
      const wrapper = shallow(<SingleDatePicker id="date" />);
      wrapper.setState({ hoverDate: today });
      expect(wrapper.instance().isHovered(tomorrow)).to.equal(false);
    });
  });

  describe('#isSelected', () => {
    it('returns true if day arg is equal to props.date', () => {
      const today = moment();
      const wrapper = shallow(<SingleDatePicker id="date" date={today} />);
      expect(wrapper.instance().isSelected(today)).to.equal(true);
    });

    it('returns false if day arg is not equal to props.date', () => {
      const today = moment();
      const tomorrow = moment().add(1, 'days');
      const wrapper = shallow(<SingleDatePicker id="date" date={tomorrow} />);
      expect(wrapper.instance().isSelected(today)).to.equal(false);
    });
  });
});
