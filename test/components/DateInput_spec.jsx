import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';

import { OPEN_DOWN, OPEN_UP } from '../../constants';

import DateInput from '../../src/components/DateInput';

const event = { preventDefault() {}, stopPropagation() {} };

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

    describe('props.openDirection === OPEN_DOWN', () => {
      it('renders .DateInput--open-down class', () => {
        const wrapper = shallow(<DateInput id="date" openDirection={OPEN_DOWN} />);
        expect(wrapper.find('.DateInput--open-down')).to.have.lengthOf(1);
      });
    });

    describe('props.openDirection === OPEN_UP', () => {
      it('renders .DateInput--open-up class', () => {
        const wrapper = shallow(<DateInput id="date" openDirection={OPEN_UP} />);
        expect(wrapper.find('.DateInput--open-up')).to.have.lengthOf(1);
      });
    });

    describe('input', () => {
      it('has props.placeholder as an aria-label if prop is passed in', () => {
        const placeholder = 'placeholder_foo';
        const wrapper = shallow(<DateInput id="date" placeholder={placeholder} />);
        expect(wrapper.find('input').props()['aria-label']).to.equal(placeholder);
      });

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

      describe('props.readOnly is truthy', () => {
        it('sets readOnly', () => {
          const wrapper = shallow(<DateInput id="date" readOnly />);
          expect(!!wrapper.find('input').prop('readOnly')).to.equal(true);
        });
      });

      describe('props.readOnly is falsey', () => {
        it('does not set readOnly', () => {
          const wrapper = shallow(<DateInput id="date" readOnly={false} />);
          expect(!!wrapper.find('input').prop('readOnly')).to.equal(false);
        });
      });
    });

    describe('screen reader message', () => {
      let wrapper;
      const inputId = 'date';
      const screenReaderMessage = 'My screen reader message';
      const screenReaderMessageId = `DateInput__screen-reader-message-${inputId}`;
      const screenReaderMessageSelector = `#${screenReaderMessageId}`;

      describe('props.screenReaderMessage is truthy', () => {
        beforeEach(() => {
          wrapper = shallow(<DateInput id={inputId} screenReaderMessage={screenReaderMessage} />);
        });

        it('has #DateInput__screen-reader-message id', () => {
          expect(wrapper.find(screenReaderMessageSelector)).to.have.lengthOf(1);
        });

        it('has props.screenReaderMessage as content', () => {
          expect(wrapper.find(screenReaderMessageSelector).text()).to.equal(screenReaderMessage);
        });

        it('has .screen-reader-only class', () => {
          expect(wrapper.find(screenReaderMessageSelector).is('.screen-reader-only')).to.equal(true);
        });

        it('has aria-describedby attribute === screen reader message id', () => {
          expect(wrapper.find(`input[aria-describedby="${screenReaderMessageId}"]`)).to.have.lengthOf(1);
        });
      });

      describe('props.screenReaderMessage is falsey', () => {
        beforeEach(() => {
          wrapper = shallow(<DateInput id={inputId} />);
        });

        it('does not have #DateInput__screen-reader-message id', () => {
          expect(wrapper.find(screenReaderMessageSelector)).to.have.lengthOf(0);
        });

        it('does not have aria-describedby attribute value', () => {
          expect(wrapper.find(`input[aria-describedby="${screenReaderMessageId}"]`)).to.have.lengthOf(0);
        });
      });
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

    it('calls props.onKeyDownQuestionMark if last typed character is ?', () => {
      const onKeyDownQuestionMarkStub = sinon.stub();
      const wrapper = shallow(
        <DateInput
          id="date"
          onKeyDownQuestionMark={onKeyDownQuestionMarkStub}
        />,
      );
      wrapper.instance().onChange({ target: { value: 'foobar?' } });
      expect(onKeyDownQuestionMarkStub.callCount).to.equal(1);
    });
  });

  describe('#onKeyDown', () => {
    it('calls props.onKeyDownTab if e.key === `Tab` and e.shiftKey === false', () => {
      const onKeyDownTabStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onKeyDownTab={onKeyDownTabStub} />);
      wrapper.instance().onKeyDown({ ...event, key: 'Tab', shiftKey: false });
      expect(onKeyDownTabStub.callCount).to.equal(1);
    });

    it('calls props.onKeyDownShiftTab if e.key === `Tab` and e.shiftKey === true', () => {
      const onKeyDownShiftTabStub = sinon.stub();
      const wrapper =
        shallow(<DateInput id="date" onKeyDownShiftTab={onKeyDownShiftTabStub} />);
      wrapper.instance().onKeyDown({ ...event, key: 'Tab', shiftKey: true });
      expect(onKeyDownShiftTabStub.callCount).to.equal(1);
    });

    it('does not call props.onKeyDownTab if e.key !== `Tab`', () => {
      const onKeyDownTabStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onKeyDownTab={onKeyDownTabStub} />);
      wrapper.instance().onKeyDown({ ...event, key: 'foo' });
      expect(onKeyDownTabStub.callCount).to.equal(0);
    });

    it('calls props.onKeyDownArrowDown if e.key === `ArrowDown`', () => {
      const onKeyDownArrowDownStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onKeyDownArrowDown={onKeyDownArrowDownStub} />);
      wrapper.instance().onKeyDown({ ...event, key: 'ArrowDown' });
      expect(onKeyDownArrowDownStub.callCount).to.equal(1);
    });

    it('does not call props.onKeyDownArrowDown if e.key !== `ArrowDown`', () => {
      const onKeyDownArrowDownStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onKeyDownArrowDown={onKeyDownArrowDownStub} />);
      wrapper.instance().onKeyDown({ ...event, key: 'foo' });
      expect(onKeyDownArrowDownStub.callCount).to.equal(0);
    });

    it('calls props.onKeyDownQuestionMark if e.key === `?`', () => {
      const onKeyDownQuestionMarkStub = sinon.stub();
      const wrapper = shallow(
        <DateInput id="date" onKeyDownQuestionMark={onKeyDownQuestionMarkStub} />,
      );
      wrapper.instance().onKeyDown({ ...event, key: '?' });
      expect(onKeyDownQuestionMarkStub.callCount).to.equal(1);
    });

    it('does not call props.onKeyDownQuestionMark if e.key !== `?`', () => {
      const onKeyDownQuestionMarkStub = sinon.stub();
      const wrapper = shallow(
        <DateInput id="date" onKeyDownQuestionMark={onKeyDownQuestionMarkStub} />,
      );
      wrapper.instance().onKeyDown({ ...event, key: 'foo' });
      expect(onKeyDownQuestionMarkStub.callCount).to.equal(0);
    });
  });

  describe('touch device detection', () => {
    it('indicates no touch support on the client', () => {
      const wrapper = shallow(<DateInput id="date" />);
      expect(wrapper.state()).to.contain.keys({ isTouchDevice: false });
    });

    it('sets readOnly to true when no value was provided on a touch device', () => {
      const wrapper = shallow(<DateInput id="date" />);
      wrapper.setState({ isTouchDevice: true });
      wrapper.update();
      expect(!!wrapper.find('input').prop('readOnly')).to.equal(true);
    });

    it('sets readOnly to provided value on a touch device', () => {
      const wrapper = shallow(<DateInput id="date" readOnly={false} />);
      wrapper.setState({ isTouchDevice: true });
      wrapper.update();
      expect(!!wrapper.find('input').prop('readOnly')).to.equal(false);
    });

    describe('focus/isFocused', () => {
      const el = {
        blur() {},
        focus() {},
        select() {},
      };

      beforeEach(() => {
        sinon.spy(el, 'blur');
        sinon.spy(el, 'focus');
        sinon.spy(el, 'select');
      });

      afterEach(() => {
        sinon.restore();
      });

      it('focuses and selects inputRef when becoming focused', () => {
        const wrapper = shallow(
          <DateInput id="date" focused={false} isFocused={false} />,
          { disableLifecycleMethods: false },
        );

        wrapper.instance().inputRef = el;

        wrapper.setProps({ focused: true, isFocused: true });

        expect(el.blur).to.have.property('callCount', 0);
        expect(el.focus).to.have.property('callCount', 1);
        expect(el.select).to.have.property('callCount', 1);
      });

      it('blurs when becoming unfocused', () => {
        const wrapper = shallow(
          <DateInput id="date" focused isFocused />,
          { disableLifecycleMethods: false },
        );

        wrapper.instance().inputRef = el;

        wrapper.setProps({ focused: false, isFocused: false });

        expect(el.blur).to.have.property('callCount', 1);
        expect(el.focus).to.have.property('callCount', 0);
        expect(el.select).to.have.property('callCount', 0);
      });
    });

    /*
      // Skip this test until we can figure out how to use `withTouchSupport` with karma
      wrap()
      .withTouchSupport()
      .it('sets isTouchDevice state when is a touch device', () => {
        const wrapper = shallow(<DateInput id="date" />);
        wrapper.instance().componentDidMount();
        expect(wrapper.state()).to.contain.keys({ isTouchDevice: true });
      });
    */
  });
});
