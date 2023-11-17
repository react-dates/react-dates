import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';

import DateInput from '../../src/components/DateInput';

const event = { preventDefault() {}, stopPropagation() {} };

describe('DateInput', () => {
  describe('#render', () => {
    describe('input', () => {
      it('has props.ariaLabel as an aria-label if ariaLabel is passed in', () => {
        const ariaLabel = 'ariaLabelExample';
        const wrapper = shallow(<DateInput id="date" ariaLabel={ariaLabel} />).dive();
        expect(wrapper.find('input').props()['aria-label']).to.equal(ariaLabel);
      });

      it('has no aria-label if props.ariaLabel is null', () => {
        const wrapper = shallow(<DateInput id="date" ariaLabel={null} />).dive();
        expect(wrapper.find('input').props()['aria-label']).to.equal(null);
      });

      it('has props.placeholder as an aria-label if ariaLabel is not passed in', () => {
        const placeholder = 'placeholder foo';
        const wrapper = shallow(<DateInput id="date" placeholder={placeholder} />).dive();
        expect(wrapper.find('input').props()['aria-label']).to.equal(placeholder);
      });

      it('has props.titleText as a title attribute if titleText is passed in', () => {
        const titleText = 'titleTextExample';
        const wrapper = shallow(<DateInput id="date" titleText={titleText} />).dive();
        expect(wrapper.find('input').props().title).to.equal(titleText);
      });

      it('has no title attribute if props.titleText is null', () => {
        const wrapper = shallow(<DateInput id="date" titleText={null} />).dive();
        expect(wrapper.find('input').props().title).to.equal(null);
      });

      it('has value === props.displayValue', () => {
        const DISPLAY_VALUE = 'foobar';
        const wrapper = shallow(<DateInput id="date" displayValue={DISPLAY_VALUE} />).dive();
        expect(wrapper.find('input').props().value).to.equal(DISPLAY_VALUE);
      });

      it('has value === state.dateString if displayValue is not passed in', () => {
        const DATE_STRING = 'foobar';
        const wrapper = shallow(<DateInput id="date" />).dive();
        wrapper.setState({
          dateString: DATE_STRING,
        });
        expect(wrapper.find('input').props().value).to.equal(DATE_STRING);
      });

      it('props.displayValue overrides dateString when not null', () => {
        const DATE_STRING = 'foobar';
        const DISPLAY_VALUE = 'display-value';
        const wrapper = shallow(<DateInput id="date" />).dive();
        wrapper.setState({ dateString: DATE_STRING });
        expect(wrapper.find('input').props().value).to.equal(DATE_STRING);
        wrapper.setProps({ displayValue: DISPLAY_VALUE });
        expect(wrapper.find('input').props().value).to.equal(DISPLAY_VALUE);
      });

      describe('props.readOnly is truthy', () => {
        it('sets readOnly', () => {
          const wrapper = shallow(<DateInput id="date" readOnly />).dive();
          expect(!!wrapper.find('input').prop('readOnly')).to.equal(true);
        });
      });

      describe('props.readOnly is falsy', () => {
        it('does not set readOnly', () => {
          const wrapper = shallow(<DateInput id="date" readOnly={false} />).dive();
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
          wrapper = shallow((
            <DateInput id={inputId} screenReaderMessage={screenReaderMessage} />
          )).dive();
        });

        it('has #DateInput__screen-reader-message id', () => {
          expect(wrapper.find(screenReaderMessageSelector)).to.have.lengthOf(1);
        });

        it('has props.screenReaderMessage as content', () => {
          expect(wrapper.find(screenReaderMessageSelector).text()).to.equal(screenReaderMessage);
        });

        it('has aria-describedby attribute === screen reader message id', () => {
          expect(wrapper.find(`input[aria-describedby="${screenReaderMessageId}"]`)).to.have.lengthOf(1);
        });
      });

      describe('props.screenReaderMessage is falsy', () => {
        beforeEach(() => {
          wrapper = shallow(<DateInput id={inputId} />).dive();
        });

        it('does not have #DateInput__screen-reader-message id', () => {
          expect(wrapper.find(screenReaderMessageSelector)).to.have.lengthOf(0);
        });

        it('does not have aria-describedby attribute value', () => {
          expect(wrapper.find(`input[aria-describedby="${screenReaderMessageId}"]`)).to.have.lengthOf(0);
        });
      });
    });
  });

  describe('#UNSAFE_componentWillReceiveProps', () => {
    describe('nextProps.displayValue exists', () => {
      it('sets state.dateString to \'\'', () => {
        const dateString = 'foo123';
        const wrapper = shallow(<DateInput id="date" />).dive();
        wrapper.setState({ dateString });
        wrapper.instance().UNSAFE_componentWillReceiveProps({ displayValue: '1991-07-13' });
        expect(wrapper.state()).to.have.property('dateString', '');
      });
    });

    describe('nextProps.displayValue does not exist', () => {
      it('does not change state.dateString', () => {
        const dateString = 'foo123';
        const wrapper = shallow(<DateInput id="date" />).dive();
        wrapper.setState({ dateString });
        wrapper.instance().UNSAFE_componentWillReceiveProps({ displayValue: null });
        expect(wrapper.state()).to.have.property('dateString', dateString);
      });
    });
  });

  describe('#onChange', () => {
    const evt = { target: { value: 'foobar' } };
    it('sets state.dateString to e.target.value', () => {
      const wrapper = shallow(<DateInput id="date" />).dive();
      wrapper.instance().onChange(evt);
      expect(wrapper.state().dateString).to.equal('foobar');
    });

    it('calls props.onChange once', () => {
      const onChangeStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onChange={onChangeStub} />).dive();
      wrapper.instance().onChange(evt);
      expect(onChangeStub.callCount).to.equal(1);
    });

    it('calls props.onChange with e.target.value as arg', () => {
      const onChangeStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onChange={onChangeStub} />).dive();
      wrapper.instance().onChange(evt);
      expect(onChangeStub.getCall(0).args[0]).to.equal(evt.target.value);
    });

    it('calls props.onKeyDownQuestionMark if last typed character is ?', () => {
      const onKeyDownQuestionMarkStub = sinon.stub();
      const wrapper = shallow((
        <DateInput
          id="date"
          onKeyDownQuestionMark={onKeyDownQuestionMarkStub}
        />
      )).dive();
      wrapper.instance().onChange({ target: { value: 'foobar?' } });
      expect(onKeyDownQuestionMarkStub.callCount).to.equal(1);
    });
  });

  describe('#onKeyDown', () => {
    it('calls props.onKeyDownTab if e.key === `Tab` and e.shiftKey === false', () => {
      const onKeyDownTabStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onKeyDownTab={onKeyDownTabStub} />).dive();
      wrapper.instance().onKeyDown({ ...event, key: 'Tab', shiftKey: false });
      expect(onKeyDownTabStub.callCount).to.equal(1);
    });

    it('calls props.onKeyDownShiftTab if e.key === `Tab` and e.shiftKey === true', () => {
      const onKeyDownShiftTabStub = sinon.stub();
      const wrapper = shallow((
        <DateInput id="date" onKeyDownShiftTab={onKeyDownShiftTabStub} />
      )).dive();
      wrapper.instance().onKeyDown({ ...event, key: 'Tab', shiftKey: true });
      expect(onKeyDownShiftTabStub.callCount).to.equal(1);
    });

    it('does not call props.onKeyDownTab if e.key !== `Tab`', () => {
      const onKeyDownTabStub = sinon.stub();
      const wrapper = shallow(<DateInput id="date" onKeyDownTab={onKeyDownTabStub} />).dive();
      wrapper.instance().onKeyDown({ ...event, key: 'foo' });
      expect(onKeyDownTabStub.callCount).to.equal(0);
    });

    it('calls props.onKeyDownArrowDown if e.key === `ArrowDown`', () => {
      const onKeyDownArrowDownStub = sinon.stub();
      const wrapper = shallow((
        <DateInput id="date" onKeyDownArrowDown={onKeyDownArrowDownStub} />
      )).dive();
      wrapper.instance().onKeyDown({ ...event, key: 'ArrowDown' });
      expect(onKeyDownArrowDownStub.callCount).to.equal(1);
    });

    it('does not call props.onKeyDownArrowDown if e.key !== `ArrowDown`', () => {
      const onKeyDownArrowDownStub = sinon.stub();
      const wrapper = shallow((
        <DateInput id="date" onKeyDownArrowDown={onKeyDownArrowDownStub} />
      )).dive();
      wrapper.instance().onKeyDown({ ...event, key: 'foo' });
      expect(onKeyDownArrowDownStub.callCount).to.equal(0);
    });

    it('calls props.onKeyDownQuestionMark if e.key === `?`', () => {
      const onKeyDownQuestionMarkStub = sinon.stub();
      const wrapper = shallow((
        <DateInput id="date" onKeyDownQuestionMark={onKeyDownQuestionMarkStub} />
      )).dive();
      wrapper.instance().onKeyDown({ ...event, key: '?' });
      expect(onKeyDownQuestionMarkStub.callCount).to.equal(1);
    });

    it('does not call props.onKeyDownQuestionMark if e.key !== `?`', () => {
      const onKeyDownQuestionMarkStub = sinon.stub();
      const wrapper = shallow((
        <DateInput id="date" onKeyDownQuestionMark={onKeyDownQuestionMarkStub} />
      )).dive();
      wrapper.instance().onKeyDown({ ...event, key: 'foo' });
      expect(onKeyDownQuestionMarkStub.callCount).to.equal(0);
    });
  });

  describe('touch device detection', () => {
    it('indicates no touch support on the client', () => {
      const wrapper = shallow(<DateInput id="date" />).dive();
      expect(wrapper.state()).to.contain.keys({ isTouchDevice: false });
    });

    it('sets readOnly to true when no value was provided on a touch device', () => {
      const wrapper = shallow(<DateInput id="date" />).dive();
      wrapper.setState({ isTouchDevice: true });
      wrapper.update();
      expect(!!wrapper.find('input').prop('readOnly')).to.equal(true);
    });

    it('sets readOnly to provided value on a touch device', () => {
      const wrapper = shallow(<DateInput id="date" readOnly={false} />).dive();
      wrapper.setState({ isTouchDevice: true });
      wrapper.update();
      expect(!!wrapper.find('input').prop('readOnly')).to.equal(false);
    });

    describe('focus/isFocused', () => {
      const el = {
        focus() {},
      };

      beforeEach(() => {
        sinon.spy(el, 'focus');
      });

      afterEach(() => {
        sinon.restore();
      });

      it('focuses inputRef when becoming focused', () => {
        const wrapper = shallow(
          <DateInput id="date" focused={false} isFocused={false} />,
          { disableLifecycleMethods: false },
        ).dive();

        wrapper.instance().inputRef = el;

        wrapper.setProps({ focused: true, isFocused: true });

        expect(el.focus).to.have.property('callCount', 1);
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
