import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import DayPickerNavigation from '../../src/components/DayPickerNavigation';
import { VERTICAL_SCROLLABLE } from '../../src/constants';

describe('DayPickerNavigation', () => {
  describe('#render', () => {
    it('renders two buttons', () => {
      const wrapper = shallow(<DayPickerNavigation />).dive();
      expect(wrapper.find('button')).to.have.lengthOf(2);
    });

    it('renders one button when vertically scrollable', () => {
      const wrapper = shallow(<DayPickerNavigation orientation={VERTICAL_SCROLLABLE} />).dive();
      expect(wrapper.find('button')).to.have.lengthOf(1);
    });
  });

  describe('interactions', () => {
    it('props.onPrevMonthClick is triggered by prev month button click', () => {
      const onPrevMonthStub = sinon.stub();
      const prevMonthButton = shallow(<DayPickerNavigation
        onPrevMonthClick={onPrevMonthStub}
      />).dive().find('button').at(0);
      prevMonthButton.simulate('click');
      expect(onPrevMonthStub).to.have.property('callCount', 1);
    });

    it('props.onNextMonthClick is triggered by next month button click', () => {
      const onNextMonthStub = sinon.stub();
      const nextMonthButton = shallow(<DayPickerNavigation
        onNextMonthClick={onNextMonthStub}
      />).dive().find('button').at(1);
      nextMonthButton.simulate('click');
      expect(onNextMonthStub).to.have.property('callCount', 1);
    });
  });
});
