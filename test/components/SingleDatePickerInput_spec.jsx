import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';

import SingleDatePickerInput from '../../src/components/SingleDatePickerInput';
import DateInput from '../../src/components/DateInput';
import { SingleDatePickerInputPhrases } from '../../src/defaultPhrases';

describe('SingleDatePickerInput', () => {
  describe('render', () => {
    it('should render any children provided', () => {
      const Child = () => <div>CHILD</div>;

      const wrapper = shallow((
        <SingleDatePickerInput id="date">
          <Child />
        </SingleDatePickerInput>
      )).dive();
      expect(wrapper.find(Child)).to.have.lengthOf(1);
    });
  });

  describe('clear date', () => {
    describe('props.showClearDate is falsy', () => {
      it('does not render a clear date button', () => {
        const wrapper = shallow(<SingleDatePickerInput id="date" showClearDate={false} />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(0);
      });
    });

    describe('props.showClearDate is truthy', () => {
      it('has a clear date button', () => {
        const wrapper = shallow(<SingleDatePickerInput id="date" showClearDate />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(1);
      });
    });

    describe('props.customCloseIcon is a React Element', () => {
      it('has custom icon', () => {
        const wrapper = shallow((
          <SingleDatePickerInput
            id="date"
            showClearDate
            customCloseIcon={<span className="custom-close-icon" />}
          />
        )).dive();
        expect(wrapper.find('.custom-close-icon')).to.have.lengthOf(1);
      });
    });
  });

  describe('show calendar icon', () => {
    describe('props.showInputIcon is falsy', () => {
      it('does not have a calendar button', () => {
        const wrapper = shallow((
          <SingleDatePickerInput id="date" showDefaultInputIcon={false} />
        )).dive();
        expect(wrapper.find('button')).to.have.lengthOf(0);
      });
    });

    describe('props.showInputIcon is truthy', () => {
      it('has button', () => {
        const wrapper = shallow(<SingleDatePickerInput id="date" showDefaultInputIcon />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(1);
      });
    });

    describe('props.customInputIcon is a React Element', () => {
      it('has custom icon', () => {
        const wrapper = shallow((
          <SingleDatePickerInput
            id="date"
            customInputIcon={<span className="custom-icon" />}
          />
        )).dive();
        expect(wrapper.find('.custom-icon')).to.have.lengthOf(1);
      });
    });
  });

  describe('clear date interactions', () => {
    describe('onClick', () => {
      it('props.onClearDate gets triggered', () => {
        const onClearDateSpy = sinon.spy();
        const wrapper = shallow((
          <SingleDatePickerInput
            id="date"
            onClearDate={onClearDateSpy}
            showClearDate
          />
        )).dive();
        const clearDateWrapper = wrapper.find('button');
        clearDateWrapper.simulate('click');
        expect(onClearDateSpy).to.have.property('called', true);
      });
    });
  });

  describe('screen reader message', () => {
    describe('props.screenReaderMessage is falsy', () => {
      it('default value is passed to DateInput', () => {
        const wrapper = shallow(<SingleDatePickerInput id="date" />).dive();
        const dateInput = wrapper.find(DateInput);
        expect(dateInput).to.have.lengthOf(1);
        expect(dateInput.props()).to.have.property(
          'screenReaderMessage',
          SingleDatePickerInputPhrases.keyboardForwardNavigationInstructions,
        );
      });
    });

    describe('props.screenReaderMessage is truthy', () => {
      it('prop value is passed to DateInput', () => {
        const message = 'test message';
        const wrapper = shallow((
          <SingleDatePickerInput
            id="date"
            screenReaderMessage={message}
          />
        )).dive();
        const dateInput = wrapper.find(DateInput);
        expect(dateInput).to.have.lengthOf(1);
        expect(dateInput.props()).to.have.property('screenReaderMessage', message);
      });
    });
  });
});
