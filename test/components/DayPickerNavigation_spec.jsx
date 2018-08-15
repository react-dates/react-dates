import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import DayPickerNavigation from '../../src/components/DayPickerNavigation';
import { VERTICAL_SCROLLABLE } from '../../src/constants';

describe('DayPickerNavigation', () => {
  describe('#render', () => {
    it('renders two role="button" divs', () => {
      const wrapper = shallow(<DayPickerNavigation />).dive();
      expect(wrapper.find('[role="button"]')).to.have.lengthOf(2);
    });

    it('renders one button when vertically scrollable', () => {
      const wrapper = shallow(<DayPickerNavigation orientation={VERTICAL_SCROLLABLE} />).dive();
      expect(wrapper.find('[role="button"]')).to.have.lengthOf(1);
    });
  });

  describe('interactions', () => {
    it('props.onPrevMonthClick is triggered by prev month button click', () => {
      const onPrevMonthStub = sinon.stub();
      const prevMonthButton = shallow(<DayPickerNavigation
        onPrevMonthClick={onPrevMonthStub}
      />).dive().find('[role="button"]').at(0);
      prevMonthButton.simulate('click');
      expect(onPrevMonthStub).to.have.property('callCount', 1);
    });

    it('props.onNextMonthClick is triggered by next month button click', () => {
      const onNextMonthStub = sinon.stub();
      const nextMonthButton = shallow(<DayPickerNavigation
        onNextMonthClick={onNextMonthStub}
      />).dive().find('[role="button"]').at(1);
      nextMonthButton.simulate('click');
      expect(onNextMonthStub).to.have.property('callCount', 1);
    });

    it('props.onPrevMonthClick is not triggered by prev month disabled click', () => {
      const onPrevMonthStub = sinon.stub();
      const prevMonthButton = shallow(<DayPickerNavigation
        onPrevMonthClick={onPrevMonthStub}
        disablePrev
      />).dive().find('[role="button"]').at(0);
      prevMonthButton.simulate('click');
      expect(onPrevMonthStub).to.have.property('callCount', 0);
    });

    it('props.onNextMonthClick is not triggered by prev month disabled click', () => {
      const onNextMonthStub = sinon.stub();
      const nextMonthButton = shallow(<DayPickerNavigation
        onNextMonthClick={onNextMonthStub}
        disableNext
      />).dive().find('[role="button"]').at(1);
      nextMonthButton.simulate('click');
      expect(onNextMonthStub).to.have.property('callCount', 0);
    });
  });
});
