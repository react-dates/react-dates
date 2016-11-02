import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import DayPickerNavigation from '../../src/components/DayPickerNavigation';

describe('DayPickerNavigation', () => {
  describe('#render', () => {
    it('.DayPicker__nav class exists', () => {
      const wrapper = shallow(<DayPickerNavigation />);
      expect(wrapper.find('.DayPicker__nav')).to.have.lengthOf(1);
    });

    describe('prev month button', () => {
      it('has .DayPicker__nav--prev class', () => {
        const wrapper = shallow(<DayPickerNavigation />);
        expect(wrapper.find('.DayPicker__nav--prev')).to.have.lengthOf(1);
      });

      it('has .DayPicker__nav--prev on custom icon', () => {
        const wrapper = shallow(<DayPickerNavigation navPrev={<span>Prev</span>} />);
        expect(wrapper.find('.DayPicker__nav--prev')).to.have.lengthOf(1);
      });

      it('has .DayPicker__nav-prev-default if no custom prev icon', () => {
        const wrapper = shallow(<DayPickerNavigation />);
        expect(wrapper.find('.DayPicker__nav-prev-default')).to.have.lengthOf(1);
      });

      it('has no .DayPicker__nav-prev-default if custom prev icon', () => {
        const wrapper = shallow(<DayPickerNavigation navPrev={<span>Prev</span>} />);
        expect(wrapper.find('.DayPicker__nav-prev-default')).to.have.lengthOf(0);
      });
    });

    describe('next month button', () => {
      it('.DayPicker__nav--next class exists', () => {
        const wrapper = shallow(<DayPickerNavigation />);
        expect(wrapper.find('.DayPicker__nav--next')).to.have.lengthOf(1);
      });

      it('has .DayPicker__nav--next class on custom icon', () => {
        const wrapper = shallow(<DayPickerNavigation navNext={<span>Next</span>} />);
        expect(wrapper.find('.DayPicker__nav--next')).to.have.lengthOf(1);
      });

      it('has .DayPicker__nav-next-default if no custom prev icon', () => {
        const wrapper = shallow(<DayPickerNavigation />);
        expect(wrapper.find('.DayPicker__nav-next-default')).to.have.lengthOf(1);
      });

      it('has no .DayPicker__nav-prev-default if custom next icon', () => {
        const wrapper = shallow(<DayPickerNavigation navNext={<span>Next</span>} />);
        expect(wrapper.find('.DayPicker__nav-next-default')).to.have.lengthOf(0);
      });
    });
  });

  describe('interactions', () => {
    it('is triggered by prev month button click', () => {
      const handlePrevMonthStub = sinon.stub();
      const prevMonthButton = shallow(
        <DayPickerNavigation
          handlePrevMonthClick={handlePrevMonthStub}
        />
      ).find('.DayPicker__nav--prev');
      prevMonthButton.simulate('click');
      expect(handlePrevMonthStub).to.have.property('callCount', 1);
    });
  });

  describe('interactions', () => {
    it('is triggered by next month button click', () => {
      const handleNextMonthStub = sinon.stub();
      const prevMonthButton = shallow(
        <DayPickerNavigation
          handleNextMonthClick={handleNextMonthStub}
        />
      ).find('.DayPicker__nav--next');
      prevMonthButton.simulate('click');
      expect(handleNextMonthStub).to.have.property('callCount', 1);
    });
  });
});
