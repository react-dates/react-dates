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

    it('tabindex is present when the default buttons are used', () => {
      const wrapper = shallow(<DayPickerNavigation />).dive();
      const prevMonthButton = wrapper.find('[role="button"]').at(0);
      const nextMonthButton = wrapper.find('[role="button"]').at(1);
      expect(prevMonthButton.prop('tabIndex')).to.equal('0');
      expect(nextMonthButton.prop('tabIndex')).to.equal('0');
    });

    it('tabindex is not present when custom buttons are used', () => {
      const wrapper = shallow(<DayPickerNavigation navNext={<div />} navPrev={<div />} />).dive();
      const prevMonthButton = wrapper.find('[role="button"]').at(0);
      const nextMonthButton = wrapper.find('[role="button"]').at(1);
      expect(prevMonthButton.prop('tabIndex')).to.equal(undefined);
      expect(nextMonthButton.prop('tabIndex')).to.equal(undefined);
    });

    it('tabindex is present when custom buttons are used and provide a tabIndex', () => {
      const wrapper = shallow(
        <DayPickerNavigation
          navNext={<div id="navNext" tabIndex="0" />} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
          navPrev={<div id="navPrev" tabIndex="0" />} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        />,
      ).dive();
      const prevMonthButton = wrapper.find('#navPrev');
      const nextMonthButton = wrapper.find('#navNext');
      expect(prevMonthButton.prop('tabIndex')).to.equal('0');
      expect(nextMonthButton.prop('tabIndex')).to.equal('0');
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
