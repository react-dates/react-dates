import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import DayPickerNavigation from '../../src/components/DayPickerNavigation';
import RightArrow from '../../src/components/RightArrow';
import LeftArrow from '../../src/components/LeftArrow';

describe('DayPickerNavigation', () => {
  describe('#render', () => {
    it('renders two role="button" divs', () => {
      const wrapper = shallow(<DayPickerNavigation />).dive();
      expect(wrapper.find('[role="button"]')).to.have.lengthOf(2);
    });

    it('renders one button when showNavNextButton is false', () => {
      const wrapper = shallow(<DayPickerNavigation showNavNextButton={false} />).dive();
      expect(wrapper.find('[role="button"]')).to.have.lengthOf(1);
    });

    it('renders one button when showNavNextButton is false', () => {
      const wrapper = shallow(<DayPickerNavigation showNavPrevButton={false} />).dive();
      expect(wrapper.find('[role="button"]')).to.have.lengthOf(1);
    });

    it('is null when showNavNextButton and showNavPrevButton are both false', () => {
      const wrapper = shallow(
        <DayPickerNavigation showNavPrevButton={false} showNavNextButton={false} />,
      ).dive();
      expect(wrapper.type()).to.equal(null);
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

    it('uses RightArrow as the default prev icon for RTL', () => {
      const wrapper = shallow(<DayPickerNavigation isRTL />).dive();
      expect(wrapper.childAt(0).find(RightArrow)).to.have.lengthOf(1);
    });

    it('uses LeftArrow as the default next icon for RTL', () => {
      const wrapper = shallow(<DayPickerNavigation isRTL />).dive();
      expect(wrapper.childAt(1).find(LeftArrow)).to.have.lengthOf(1);
    });

    it('calls renderNavPrevButton when custom prev button is used', () => {
      const renderNavPrevButtonStub = sinon.stub().returns(<button type="button">Prev</button>);
      const wrapper = shallow(
        <DayPickerNavigation
          renderNavPrevButton={renderNavPrevButtonStub}
        />,
      ).dive();
      expect(wrapper.childAt(0).find('div[role="button"]')).to.have.lengthOf(0);
      expect(renderNavPrevButtonStub).to.have.property('callCount', 1);
    });

    it('calls renderNavNextButton when custom next button is used', () => {
      const renderNavNextButtonStub = sinon.stub().returns(<button type="button">Next</button>);
      const wrapper = shallow(
        <DayPickerNavigation
          renderNavNextButton={renderNavNextButtonStub}
        />,
      ).dive();
      expect(wrapper.childAt(1).find('div[role="button"]')).to.have.lengthOf(0);
      expect(renderNavNextButtonStub).to.have.property('callCount', 1);
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

    it('props.onPrevMonthClick is triggered by prev month button key up', () => {
      const onPrevMonthStub = sinon.stub();
      const prevMonthButton = shallow(<DayPickerNavigation
        onPrevMonthClick={onPrevMonthStub}
      />).dive().find('[role="button"]').at(0);
      prevMonthButton.simulate('keyup', { key: 'Enter' });
      expect(onPrevMonthStub).to.have.property('callCount', 1);
      prevMonthButton.simulate('keyup', { key: ' ' });
      expect(onPrevMonthStub).to.have.property('callCount', 2);
      prevMonthButton.simulate('keyup', { key: 'k' });
      expect(onPrevMonthStub).to.have.property('callCount', 2);
    });

    it('props.onNextMonthClick is triggered by next month button key up', () => {
      const onNextMonthStub = sinon.stub();
      const nextMonthButton = shallow(<DayPickerNavigation
        onNextMonthClick={onNextMonthStub}
      />).dive().find('[role="button"]').at(1);
      nextMonthButton.simulate('keyup', { key: 'Enter' });
      expect(onNextMonthStub).to.have.property('callCount', 1);
      nextMonthButton.simulate('keyup', { key: ' ' });
      expect(onNextMonthStub).to.have.property('callCount', 2);
      nextMonthButton.simulate('keyup', { key: 'k' });
      expect(onNextMonthStub).to.have.property('callCount', 2);
    });

    it('props.onPrevMonthClick is triggered by custom prev month button click', () => {
      const onPrevMonthStub = sinon.stub();
      const renderNavPrevButtonStub = sinon.stub().onCall(0).callsFake(({ onClick }) => <button onClick={onClick} type="button">Prev</button>);
      const prevMonthButton = shallow(<DayPickerNavigation
        onPrevMonthClick={onPrevMonthStub}
        renderNavPrevButton={renderNavPrevButtonStub}
      />).dive().find('button').at(0);
      prevMonthButton.simulate('click');
      expect(onPrevMonthStub).to.have.property('callCount', 1);
    });

    it('props.onNextMonthClick is triggered by custom next month button click', () => {
      const onNextMonthStub = sinon.stub();
      const renderNavNextButtonStub = sinon.stub().onCall(0).callsFake(({ onClick }) => <button onClick={onClick} type="button">Next</button>);
      const nextMonthButton = shallow(<DayPickerNavigation
        onNextMonthClick={onNextMonthStub}
        renderNavNextButton={renderNavNextButtonStub}
      />).dive().find('button').at(0);
      nextMonthButton.simulate('click');
      expect(onNextMonthStub).to.have.property('callCount', 1);
    });

    it('props.onPrevMonthClick is not triggered by custom prev month disabled click', () => {
      const onPrevMonthStub = sinon.stub();
      const renderNavPrevButtonStub = sinon.stub().onCall(0).callsFake(({ disabled, onClick }) => <button disabled={disabled} onClick={onClick} type="button">Prev</button>);
      const prevMonthButton = shallow(<DayPickerNavigation
        disablePrev
        onPrevMonthClick={onPrevMonthStub}
        renderNavPrevButton={renderNavPrevButtonStub}
      />).dive().find('button').at(0);
      prevMonthButton.simulate('click');
      expect(onPrevMonthStub).to.have.property('callCount', 0);
    });

    it('props.onNextMonthClick is not triggered by custom next month disabled click', () => {
      const onNextMonthStub = sinon.stub();
      const renderNavNextButtonStub = sinon.stub().onCall(0).callsFake(({ disabled, onClick }) => <button disabled={disabled} onClick={onClick} type="button">Next</button>);
      const nextMonthButton = shallow(<DayPickerNavigation
        disableNext
        onNextMonthClick={onNextMonthStub}
        renderNavNextButton={renderNavNextButtonStub}
      />).dive().find('button').at(0);
      nextMonthButton.simulate('click');
      expect(onNextMonthStub).to.have.property('callCount', 0);
    });

    it('props.onPrevMonthClick is triggered by custom prev month button key up', () => {
      const onPrevMonthStub = sinon.stub();
      const renderNavPrevButtonStub = sinon.stub().onCall(0).callsFake(({ onKeyUp }) => <button onKeyUp={onKeyUp} type="button">Prev</button>);
      const prevMonthButton = shallow(<DayPickerNavigation
        onPrevMonthClick={onPrevMonthStub}
        renderNavPrevButton={renderNavPrevButtonStub}
      />).dive().find('button').at(0);
      prevMonthButton.simulate('keyup', { key: 'Enter' });
      expect(onPrevMonthStub).to.have.property('callCount', 1);
      prevMonthButton.simulate('keyup', { key: ' ' });
      expect(onPrevMonthStub).to.have.property('callCount', 2);
      prevMonthButton.simulate('keyup', { key: 'k' });
      expect(onPrevMonthStub).to.have.property('callCount', 2);
    });

    it('props.onNextMonthClick is triggered by custom next month button key up', () => {
      const onNextMonthStub = sinon.stub();
      const renderNavNextButtonStub = sinon.stub().onCall(0).callsFake(({ onKeyUp }) => <button onKeyUp={onKeyUp} type="button">Next</button>);
      const nextMonthButton = shallow(<DayPickerNavigation
        onNextMonthClick={onNextMonthStub}
        renderNavNextButton={renderNavNextButtonStub}
      />).dive().find('button').at(0);
      nextMonthButton.simulate('keyup', { key: 'Enter' });
      expect(onNextMonthStub).to.have.property('callCount', 1);
      nextMonthButton.simulate('keyup', { key: ' ' });
      expect(onNextMonthStub).to.have.property('callCount', 2);
      nextMonthButton.simulate('keyup', { key: 'k' });
      expect(onNextMonthStub).to.have.property('callCount', 2);
    });
  });
});
