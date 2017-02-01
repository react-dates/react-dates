import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import React from 'react';

import DateInput from '../../src/components/DateInput';
import DateRangePickerInput from '../../src/components/DateRangePickerInput';

describe('DateRangePickerInput', () => {
  describe('#render', () => {
    it('is .DateRangePickerInput class', () => {
      const wrapper = shallow(<DateRangePickerInput />);
      expect(wrapper.is('.DateRangePickerInput')).to.equal(true);
    });

    it('renders 2 <DateInput /> components', () => {
      const wrapper = shallow(<DateRangePickerInput />);
      expect(wrapper.find(DateInput)).to.have.lengthOf(2);
    });

    describe('props.disabled is falsey', () => {
      it('does not have .DateRangePickerInput--disabled class ', () => {
        const wrapper = shallow(<DateRangePickerInput id="date" disabled={false} />);
        expect(wrapper.find('.DateRangePickerInput--disabled')).to.have.lengthOf(0);
      });
    });

    describe('props.disabled is truthy', () => {
      it('has .DateRangePickerInput--disabled class', () => {
        const wrapper = shallow(<DateRangePickerInput id="date" disabled />);
        expect(wrapper.find('.DateRangePickerInput--disabled')).to.have.lengthOf(1);
      });
    });

    it('has .DateRangePickerInput__arrow class', () => {
      const wrapper = shallow(<DateRangePickerInput />);
      expect(wrapper.find('.DateRangePickerInput__arrow')).to.have.lengthOf(1);
    });

    describe('clear dates', () => {
      describe('props.showClearDates is falsey', () => {
        it('does not have .DateRangePickerInput__clear-dates class', () => {
          const wrapper = shallow(<DateRangePickerInput showClearDates={false} />);
          expect(wrapper.find('.DateRangePickerInput__clear-dates')).to.have.lengthOf(0);
        });
      });

      describe('props.showClearDates is truthy', () => {
        it('has .DateRangePickerInput__clear-dates class', () => {
          const wrapper = shallow(<DateRangePickerInput showClearDates />);
          expect(wrapper.find('.DateRangePickerInput__clear-dates')).to.have.lengthOf(1);
        });

        it('has .DateRangePickerInput__clear-dates--hover class if state.isClearDatesHovered',
          () => {
            const wrapper = shallow(<DateRangePickerInput showClearDates />);
            wrapper.setState({ isClearDatesHovered: true });
            expect(wrapper.find('.DateRangePickerInput__clear-dates--hover')).to.have.lengthOf(1);
          });

        it('no .DateRangePickerInput__clear-dates--hover class if !state.isClearDatesHovered',
          () => {
            const wrapper = shallow(<DateRangePickerInput showClearDates />);
            wrapper.setState({ isClearDatesHovered: false });
            expect(wrapper.find('.DateRangePickerInput__clear-dates--hover')).to.have.lengthOf(0);
          });

        it('has .DateRangePickerInput__clear-dates--hide class if there are no dates',
          () => {
            const wrapper = shallow(
              <DateRangePickerInput showClearDates startDate={null} endDate={null} />,
            );
            expect(wrapper.find('.DateRangePickerInput__clear-dates--hide')).to.have.lengthOf(1);
          });

        it('does not have .DateRangePickerInput__clear-dates--hide class if there are dates',
          () => {
            const wrapper = shallow(<DateRangePickerInput showClearDates startDate="2016-07-13" />);
            expect(wrapper.find('.DateRangePickerInput__clear-dates--hide')).to.have.lengthOf(0);
          });
      });
    });

    describe('show calendar icon', () => {
      describe('props.showInputIcon is falsey', () => {
        it('does not have .DateRangePickerInput__calendar-icon class', () => {
          const wrapper = shallow(<DateRangePickerInput showDefaultInputIcon={false} />);
          expect(wrapper.find('.DateRangePickerInput__calendar-icon')).to.have.lengthOf(0);
        });
      });

      describe('props.showInputIcon is truthy', () => {
        it('has .DateRangePickerInput__calendar-icon class', () => {
          const wrapper = shallow(<DateRangePickerInput showDefaultInputIcon />);
          expect(wrapper.find('.DateRangePickerInput__calendar-icon')).to.have.lengthOf(1);
        });
      });
      describe('props.customInputIcon is a React Element', () => {
        it('has custom icon', () => {
          const wrapper = shallow(
            <DateRangePickerInput
              customInputIcon={<span className="custom-icon" />}
            />);
          expect(wrapper.find('.DateRangePickerInput__calendar-icon .custom-icon'));
        });
      });
    });
  });

  describe('props.customArrowIcon is a React Element', () => {
    it('has custom icon', () => {
      const wrapper = shallow(
        <DateRangePickerInput
          customArrowIcon={<span className="custom-arrow-icon" />}
        />);
      expect(wrapper.find('.DateRangePickerInput__calendar-icon .custom-arrow-icon'));
    });
  });

  describe('#onClearDatesMouseEnter', () => {
    it('sets state.isClearDatesHovered to true', () => {
      const wrapper = shallow(<DateRangePickerInput />);
      wrapper.setState({ isClearDatesHovered: false });
      wrapper.instance().onClearDatesMouseEnter();
      expect(wrapper.state().isClearDatesHovered).to.equal(true);
    });
  });

  describe('#onClearDatesMouseLeave', () => {
    it('sets state.isClearDatesHovered to false', () => {
      const wrapper = shallow(<DateRangePickerInput />);
      wrapper.setState({ isClearDatesHovered: true });
      wrapper.instance().onClearDatesMouseLeave();
      expect(wrapper.state().isClearDatesHovered).to.equal(false);
    });
  });

  describe('clear dates interactions', () => {
    describe('onClick', () => {
      it('props.onClearDates gets triggered', () => {
        const onClearDatesSpy = sinon.spy();
        const wrapper = shallow(
          <DateRangePickerInput
            onClearDates={onClearDatesSpy}
            showClearDates
          />,
        );
        const clearDatesWrapper = wrapper.find('.DateRangePickerInput__clear-dates');
        clearDatesWrapper.simulate('click');
        expect(onClearDatesSpy.called).to.equal(true);
      });
    });

    describe('onMouseEnter', () => {
      it('onClearDatesMouseEnter gets triggered', () => {
        const onClearDatesMouseEnterSpy = sinon.spy(
          DateRangePickerInput.prototype,
          'onClearDatesMouseEnter',
        );
        const wrapper = shallow(<DateRangePickerInput showClearDates />);
        const clearDatesWrapper = wrapper.find('.DateRangePickerInput__clear-dates');

        clearDatesWrapper.simulate('mouseEnter');

        expect(onClearDatesMouseEnterSpy.called).to.equal(true);
      });
    });

    describe('onMouseLeave', () => {
      it('onClearDatesMouseLeave gets triggered', () => {
        const onClearDatesMouseLeaveSpy = sinon.spy(
          DateRangePickerInput.prototype,
          'onClearDatesMouseLeave',
        );
        const wrapper = shallow(<DateRangePickerInput showClearDates />);
        const clearDatesWrapper = wrapper.find('.DateRangePickerInput__clear-dates');

        clearDatesWrapper.simulate('mouseLeave');

        expect(onClearDatesMouseLeaveSpy.called).to.equal(true);
      });
    });
  });

  describe('calendar icon interaction', () => {
    describe('onClick', () => {
      it('props.onStartDateFocus gets triggered', () => {
        const onStartDateFocusSpy = sinon.spy();
        const wrapper = shallow(
          <DateRangePickerInput
            onStartDateFocus={onStartDateFocusSpy}
            showDefaultInputIcon
          />);
        const calendarIconWrapper = wrapper.find('.DateRangePickerInput__calendar-icon');
        calendarIconWrapper.simulate('click');
        expect(onStartDateFocusSpy.called).to.equal(true);
      });
    });
  });
});
