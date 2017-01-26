import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';

import DateInput from '../../src/components/DateInput';

describe('DateInput', () => {
  describe('#render', () => {
    it('is .DateInput class', () => {
      const wrapper = shallow(<DateInput id="date" />);
      expect(wrapper.is('.DateInput')).to.equal(true);
    });

    describe('props.disabled is falsey', () => {
      it('does not have .DateInput--disabled class ', () => {
        const wrapper = shallow(<DateInput id="date" disabled={false} />);
        expect(wrapper.find('.DateInput--disabled')).to.have.lengthOf(0);
      });
    });

    describe('props.disabled is truthy', () => {
      it('has .DateInput--disabled class', () => {
        const wrapper = shallow(<DateInput id="date" disabled />);
        expect(wrapper.find('.DateInput--disabled')).to.have.lengthOf(1);
      });
    });

    describe('label', () => {
      it('has .DateInput__label class', () => {
        const wrapper = shallow(<DateInput id="date" />);
        expect(wrapper.find('label').is('.DateInput__label')).to.equal(true);
      });

      it('has props.placeholder as content', () => {
        const placeholder = 'placeholder_foo';
        const wrapper = shallow(<DateInput id="date" placeholder={placeholder} />);
        expect(wrapper.find('label').text()).to.equal(placeholder);
      });
    });

    describe('input', () => {
      it('has .DateInput__input class', () => {
        const wrapper = shallow(<DateInput id="date" />);
        expect(wrapper.find('input').is('.DateInput__input')).to.equal(true);
      });

      it('has value === props.inputValue if prop is passed in', () => {
        const INPUT_VALUE = 'foobar';
        const wrapper = shallow(<DateInput id="date" inputValue={INPUT_VALUE} />);
        expect(wrapper.find('input').props().value).to.equal(INPUT_VALUE);
      });

      it('has value === props.displayValue if inputValue is not passed in', () => {
        const DISPLAY_VALUE = 'foobar';
        const wrapper = shallow(<DateInput id="date" displayValue={DISPLAY_VALUE} />);
        expect(wrapper.find('input').props().value).to.equal(DISPLAY_VALUE);
      });

      it('has value === state.dateString if neither inputValue or displayValue are passed in',
        () => {
          const DATE_STRING = 'foobar';
          const wrapper = shallow(<DateInput id="date" />);
          wrapper.setState({
            dateString: DATE_STRING,
          });
          expect(wrapper.find('input').props().value).to.equal(DATE_STRING);
        },
      );
    });

    describe('display text', () => {
      it('has .DateInput__display-text class', () => {
        const wrapper = shallow(<DateInput id="date" />);
        expect(wrapper.find('.DateInput__display-text')).to.have.lengthOf(1);
      });

      describe('props.displayValue is falsey', () => {
        it('does not have .DateInput__display-text__has-input class', () => {
          const wrapper = shallow(<DateInput id="date" displayValue={null} />);
          const hasInputDisplayTextWrapper =
            wrapper.find('.DateInput__display-text--has-input');
          expect(hasInputDisplayTextWrapper).to.have.lengthOf(0);
        });
      });

      describe('props.displayValue is truthy', () => {
        it('has .DateInput__display-text--has-input class', () => {
          const wrapper = shallow(<DateInput id="date" displayValue="1991-07-13" />);
          const hasInputDisplayTextWrapper =
            wrapper.find('.DateInput__display-text--has-input');
          expect(hasInputDisplayTextWrapper).to.have.lengthOf(1);
        });
      });

      describe('props.focused is falsey', () => {
        it('does not have .DateInput__display-text--focused class ', () => {
          const wrapper = shallow(<DateInput id="date" focused={false} />);
          expect(wrapper.find('.DateInput__display-text--focused')).to.have.lengthOf(0);
        });
      });

      describe('props.focused is truthy', () => {
        it('has .DateInput__display-text--focused class', () => {
          const wrapper = shallow(<DateInput id="date" focused />);
          expect(wrapper.find('.DateInput__display-text--focused')).to.have.lengthOf(1);
        });
      });

      describe('props.disabled is falsey', () => {
        it('does not have .DateInput__display-text--disabled class ', () => {
          const wrapper = shallow(<DateInput id="date" disabled={false} />);
          expect(wrapper.find('.DateInput__display-text--disabled')).to.have.lengthOf(0);
        });
      });

      describe('props.disabled is truthy', () => {
        it('has .DateInput__display-text--disabled class', () => {
          const wrapper = shallow(<DateInput id="date" disabled />);
          expect(wrapper.find('.DateInput__display-text--disabled')).to.have.lengthOf(1);
        });
      });
    });
  });

  describe('#onChange', () => {
    const evt = { target: { value: 'foobar' } };
    it('sets state.dateString to e.target.value', () => {
      const wrapper = shallow(<DateInput id="date" />);
      wrapper.instance().onChange(evt);
      expect(wrapper.state().dateString).to.equal('foobar');
    });

    it('calls props.onChange once', () => {
      const onChangeStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onChange={onChangeStub} />);
      wrapper.instance().onChange(evt);
      expect(onChangeStub.callCount).to.equal(1);
    });

    it('calls props.onChange with e.target.value as arg', () => {
      const onChangeStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onChange={onChangeStub} />);
      wrapper.instance().onChange(evt);
      expect(onChangeStub.getCall(0).args[0]).to.equal(evt.target.value);
    });
  });

  describe('#onKeyDown', () => {
    it('calls props.onKeyDownTab if e.key === `Tab` and e.shiftKey === false', () => {
      const onKeyDownTabStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onKeyDownTab={onKeyDownTabStub} />);
      wrapper.instance().onKeyDown({ key: 'Tab', shiftKey: false });
      expect(onKeyDownTabStub.callCount).to.equal(1);
    });

    it('calls props.onKeyDownShiftTab if e.key === `Tab` and e.shiftKey === true', () => {
      const onKeyDownShiftTabStub = sinon.stub();
      const wrapper =
        shallow(<DateInput id="date" onKeyDownShiftTab={onKeyDownShiftTabStub} />);
      wrapper.instance().onKeyDown({ key: 'Tab', shiftKey: true });
      expect(onKeyDownShiftTabStub.callCount).to.equal(1);
    });

    it('does not call props.onKeyDownTab if e.key !== `Tab`', () => {
      const onKeyDownTabStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onKeyDownTab={onKeyDownTabStub} />);
      wrapper.instance().onKeyDown({ key: 'foo' });
      expect(onKeyDownTabStub.callCount).to.equal(0);
    });
  });
});
