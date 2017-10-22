import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import React from 'react';

import DateInput from '../../src/components/DateInput';
import DateRangePickerInput from '../../src/components/DateRangePickerInput';

describe('DateRangePickerInput', () => {
  describe('#render', () => {
    it('renders 2 <DateInput /> components', () => {
      const wrapper = shallow(<DateRangePickerInput />).dive();
      expect(wrapper.find(DateInput)).to.have.lengthOf(2);
    });

    describe('props.showClearDates', () => {
      it('if true renders clear dates button', () => {
        const wrapper = shallow(<DateRangePickerInput showClearDates />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(1);
      });

      it('if false does not render clear dates', () => {
        const wrapper = shallow(<DateRangePickerInput showClearDates={false} />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(0);
      });
    });

    describe('show calendar icon', () => {
      it('if true renders calendar button', () => {
        const wrapper = shallow(<DateRangePickerInput showDefaultInputIcon />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(1);
      });

      it('if false does not render calendar button', () => {
        const wrapper = shallow(<DateRangePickerInput showDefaultInputIcon={false} />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(0);
      });

      describe('props.customInputIcon is a React Element', () => {
        it('custom icon is rendered', () => {
          const wrapper = shallow((
            <DateRangePickerInput
              customInputIcon={<span className="custom-icon" />}
            />
          )).dive();
          expect(wrapper.find('.custom-icon')).to.have.lengthOf(1);
        });
      });
    });
  });

  describe('props.customArrowIcon', () => {
    it('custom icon is rendered', () => {
      const wrapper = shallow((
        <DateRangePickerInput
          customArrowIcon={<span className="custom-arrow-icon" />}
        />
      )).dive();
      expect(wrapper.find('.custom-arrow-icon')).to.have.lengthOf(1);
    });
  });

  describe('props.customCloseIcon', () => {
    it('custom icon is rendered', () => {
      const wrapper = shallow((
        <DateRangePickerInput
          showClearDates
          customCloseIcon={<span className="custom-close-icon" />}
        />
      )).dive();
      expect(wrapper.find('.custom-close-icon')).to.have.lengthOf(1);
    });
  });

  describe('clear dates interactions', () => {
    describe('onClick', () => {
      it('props.onClearDates gets triggered', () => {
        const onClearDatesSpy = sinon.spy();
        const wrapper = shallow((
          <DateRangePickerInput
            onClearDates={onClearDatesSpy}
            showClearDates
          />
        )).dive();
        const clearDatesWrapper = wrapper.find('button');
        clearDatesWrapper.simulate('click');
        expect(onClearDatesSpy.called).to.equal(true);
      });
    });
  });

  describe('calendar icon interaction', () => {
    describe('onClick', () => {
      it('props.onArrowDown gets triggered', () => {
        const onArrowDownSpy = sinon.spy();
        const wrapper = shallow((
          <DateRangePickerInput
            onArrowDown={onArrowDownSpy}
            showDefaultInputIcon
          />
        )).dive();
        const calendarIconWrapper = wrapper.find('button').at(0);
        calendarIconWrapper.simulate('click');
        expect(onArrowDownSpy.callCount).to.equal(1);
      });
    });
  });
});
