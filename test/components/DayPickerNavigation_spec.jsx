import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import DayPickerNavigation from '../../src/components/DayPickerNavigation';
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

describe('DayPickerNavigation', () => {
  describe('#render', () => {
    it('.DayPickerNavigation class exists', () => {
      const wrapper = shallow(<DayPickerNavigation />);
      expect(wrapper.find('.DayPickerNavigation')).to.have.lengthOf(1);
    });

    it('has .DayPickerNavigation--horizontal when not vertical', () => {
      const wrapper = shallow(<DayPickerNavigation orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.find('.DayPickerNavigation--horizontal')).to.have.lengthOf(1);
    });

    it('has .DayPickerNavigation--vertical when vertical', () => {
      const wrapper = shallow(<DayPickerNavigation orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.find('.DayPickerNavigation--vertical')).to.have.lengthOf(1);
    });

    describe('prev month button', () => {
      it('has .DayPickerNavigation__prev class', () => {
        const wrapper = shallow(<DayPickerNavigation />);
        expect(wrapper.find('.DayPickerNavigation__prev')).to.have.lengthOf(1);
      });

      it('has .DayPickerNavigation__prev on custom icon', () => {
        const wrapper = shallow(<DayPickerNavigation navPrev={<span>Prev</span>} />);
        expect(wrapper.find('.DayPickerNavigation__prev')).to.have.lengthOf(1);
      });

      it('has .DayPickerNavigation__prev--default if no custom prev icon', () => {
        const wrapper = shallow(<DayPickerNavigation />);
        expect(wrapper.find('.DayPickerNavigation__prev--default')).to.have.lengthOf(1);
      });

      it('has no .DayPickerNavigation__prev--default if custom prev icon', () => {
        const wrapper = shallow(<DayPickerNavigation navPrev={<span>Prev</span>} />);
        expect(wrapper.find('.DayPickerNavigation__prev--default')).to.have.lengthOf(0);
      });

      it('hidden when vertically scrollable', () => {
        const wrapper = shallow(<DayPickerNavigation orientation={VERTICAL_SCROLLABLE} />);
        expect(wrapper.find('.DayPickerNavigation__prev')).to.have.lengthOf(0);
      });
    });

    describe('next month button', () => {
      it('.DayPickerNavigation__next class exists', () => {
        const wrapper = shallow(<DayPickerNavigation />);
        expect(wrapper.find('.DayPickerNavigation__next')).to.have.lengthOf(1);
      });

      it('has .DayPickerNavigation__next class on custom icon', () => {
        const wrapper = shallow(<DayPickerNavigation navNext={<span>Next</span>} />);
        expect(wrapper.find('.DayPickerNavigation__next')).to.have.lengthOf(1);
      });

      it('has .DayPickerNavigation__next--default if no custom prev icon', () => {
        const wrapper = shallow(<DayPickerNavigation />);
        expect(wrapper.find('.DayPickerNavigation__next--default')).to.have.lengthOf(1);
      });

      it('has no .DayPickerNavigation__next--default if custom next icon', () => {
        const wrapper = shallow(<DayPickerNavigation navNext={<span>Next</span>} />);
        expect(wrapper.find('.DayPickerNavigation__next--default')).to.have.lengthOf(0);
      });
    });
  });

  describe('interactions', () => {
    it('is triggered by prev month button click', () => {
      const onPrevMonthStub = sinon.stub();
      const prevMonthButton = shallow(
        <DayPickerNavigation
          onPrevMonthClick={onPrevMonthStub}
        />,
      ).find('.DayPickerNavigation__prev');
      prevMonthButton.simulate('click');
      expect(onPrevMonthStub).to.have.property('callCount', 1);
    });
  });

  describe('interactions', () => {
    it('is triggered by next month button click', () => {
      const onNextMonthStub = sinon.stub();
      const nextMonthButton = shallow(
        <DayPickerNavigation
          onNextMonthClick={onNextMonthStub}
        />,
      ).find('.DayPickerNavigation__next');
      nextMonthButton.simulate('click');
      expect(onNextMonthStub).to.have.property('callCount', 1);
    });
  });
});
