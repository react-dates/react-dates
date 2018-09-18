import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon-sandbox';
import { Portal } from 'react-portal';

import CloseButton from '../../src/components/CloseButton';
import DropDownController, { PureDropDownController } from '../../src/components/DropDownController';

const describeIfWindow = typeof document === 'undefined' ? describe.skip : describe;

describe('DropDownController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    it('renders props.input', () => {
      const input = <div className="unique-input-classname" />;
      const wrapper = shallow((
        <DropDownController
          onFocusChange={() => {}}
          input={input}
        />
      )).dive();
      expect(wrapper.find('.unique-input-classname')).to.have.lengthOf(1);
    });

    describe('props.dropdown', () => {
      describe('props.focused === true', () => {
        it('renders props.dropdown', () => {
          const dropdown = <div className="unique-dropdown-classname" />;
          const wrapper = shallow((
            <DropDownController
              onFocusChange={() => {}}
              dropdown={dropdown}
              focused
            />
          )).dive();
          expect(wrapper.find('.unique-dropdown-classname')).to.have.lengthOf(1);
        });
      });

      describe('props.focused === false', () => {
        it('does not render props.dropdown', () => {
          const dropdown = <div className="unique-dropdown-classname" />;
          const wrapper = shallow((
            <DropDownController
              onFocusChange={() => {}}
              dropdown={dropdown}
              focused={false}
            />
          )).dive();
          expect(wrapper.find('.unique-dropdown-classname')).to.have.lengthOf(0);
        });
      });

      it('should pass onDayPickerBlur as onBlur to props.dropdown', () => {
        const dropdown = <div className="unique-dropdown-classname" />;
        const wrapper = shallow((
          <DropDownController
            onFocusChange={() => {}}
            dropdown={dropdown}
            focused
          />
        )).dive();
        const { onDayPickerBlur } = wrapper.instance();
        expect(wrapper.find('.unique-dropdown-classname').prop('onBlur')).to.equal(onDayPickerBlur);
      });
    });

    describe('props.withPortal is truthy', () => {
      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow((
            <DropDownController
              onFocusChange={() => {}}
              withPortal
              focused
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered if props.focused is falsy', () => {
          const wrapper = shallow((
            <DropDownController
              onFocusChange={() => {}}
              withPortal
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(0);
        });
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('renders CloseButton', () => {
        const wrapper = shallow((
          <DropDownController
            onFocusChange={() => {}}
            withFullScreenPortal
            focused
          />
        )).dive();
        expect(wrapper.find(CloseButton)).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow((
            <DropDownController
              onFocusChange={() => {}}
              withFullScreenPortal
              focused
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered when props.focused is falsy', () => {
          const wrapper = shallow((
            <DropDownController
              onFocusChange={() => {}}
              withFullScreenPortal
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(0);
        });
      });
    });

    describe('props.appendToBody', () => {
      const requiredProps = {
        dropdown: <div className="unique-dropdown-classname" />,
        onFocusChange: () => {},
      };

      it('renders props.dropdown inside <Portal>', () => {
        const wrapper = shallow((
          <DropDownController {...requiredProps} appendToBody focused />
        )).dive();
        const portal = wrapper.find(Portal);
        expect(portal).to.have.length(1);
        expect(portal.find('.unique-dropdown-classname')).to.have.length(1);
      });

      describeIfWindow('mounted', () => {
        let wrapper;
        let instance;
        let onCloseStub;

        beforeEach(() => {
          onCloseStub = sinon.stub();
          wrapper = mount(shallow((
            <DropDownController
              {...requiredProps}
              appendToBody
              focused
              onClose={onCloseStub}
            />
          )).get(0));
          instance = wrapper.instance();
        });

        it('positions daypicker using top and transform CSS properties', () => {
          const dayPickerEl = instance.dayPickerContainer;
          expect(dayPickerEl.style.top).not.to.equal('');
          expect(dayPickerEl.style.transform).not.to.equal('');
        });

        it('disables scroll', () => {
          expect(instance.enableScroll).to.be.a('function');
        });

        it('ignores click events from inside picker', () => {
          const event = { target: instance.dayPickerContainer };
          instance.onOutsideClick(event);
          expect(onCloseStub.callCount).to.equal(0);
        });

        it('enables scroll when closed', () => {
          const enableScrollSpy = sinon.spy(instance, 'enableScroll');
          wrapper.setProps({ focused: false });
          expect(enableScrollSpy.callCount).to.equal(1);
        });

        it('enables scroll when unmounted', () => {
          const enableScrollSpy = sinon.spy(instance, 'enableScroll');
          wrapper.unmount();
          expect(enableScrollSpy.callCount).to.equal(1);
        });
      });
    });
  });

  describe('#onInputFocus', () => {
    let onDayPickerFocusSpy;
    let onDayPickerBlurSpy;
    beforeEach(() => {
      onDayPickerFocusSpy = sinon.spy(PureDropDownController.prototype, 'onDayPickerFocus');
      onDayPickerBlurSpy = sinon.spy(PureDropDownController.prototype, 'onDayPickerBlur');
    });

    it('calls props.onFocusChange once', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DropDownController onFocusChange={onFocusChangeStub} />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls props.onFocusChange with { focused: true } as arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DropDownController onFocusChange={onFocusChangeStub} />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(true);
    });

    it('calls onDayPickerFocus if withPortal', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
          withPortal
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if withFullScreenPortal', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
          withFullScreenPortal
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if readOnly', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
          readOnly
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if isTouchDevice', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.instance().isTouchDevice = true;
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerBlur if isTouchDevice and keepFocusOnInput', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
          keepFocusOnInput
        />
      )).dive();
      wrapper.instance().isTouchDevice = true;
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerBlurSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerBlur if !withPortal/!withFullScreenPortal and keepFocusOnInput', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
          keepFocusOnInput
        />
      )).dive();
      wrapper.instance().isTouchDevice = true;
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerBlurSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if withPortal/withFullScreenPortal and keepFocusOnInput', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
          keepFocusOnInput
          withFullScreenPortal
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if readOnly and keepFocusOnInput', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
          keepFocusOnInput
          withFullScreenPortal
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerBlur if !withPortal/!withFullScreenPortal/!readOnly', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerBlurSpy.callCount).to.equal(1);
    });
  });

  describe('#onOutsideClick', () => {
    describe('props.focused = false', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DropDownController


            onFocusChange={onFocusChangeStub}
            focused={false}
          />
        )).dive();
        wrapper.instance().onOutsideClick();
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('props.focused = true', () => {
      it('sets state.isDayPickerFocused to false', () => {
        const wrapper = shallow((
          <DropDownController
            onFocusChange={sinon.stub()}
            focused
          />
        )).dive();
        wrapper.setState({
          isDayPickerFocused: true,
        });
        wrapper.instance().onOutsideClick();
        expect(wrapper.state().isDayPickerFocused).to.equal(false);
      });

      it('sets state.isInputFocused to false', () => {
        const wrapper = shallow((
          <DropDownController
            onFocusChange={sinon.stub()}
            focused
          />
        )).dive();
        wrapper.setState({
          isInputFocused: true,
        });
        wrapper.instance().onOutsideClick();
        expect(wrapper.state().isInputFocused).to.equal(false);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DropDownController
            onFocusChange={onFocusChangeStub}
            focused
          />
        )).dive();
        wrapper.instance().onOutsideClick();
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DropDownController
            onFocusChange={onFocusChangeStub}
            focused
          />
        )).dive();
        wrapper.instance().onOutsideClick();
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });
  });

  describe('#onDayPickerFocus', () => {
    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: false,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isDayPickerFocused).to.equal(true);
    });

    it('sets state.isInputFocused to false', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isInputFocused: true,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().isInputFocused).to.equal(false);
    });

    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().onDayPickerFocus();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
  });

  describe('#onDayPickerBlur', () => {
    it('sets state.isDayPickerFocused to false', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: true,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isDayPickerFocused).to.equal(false);
    });

    it('sets state.isInputFocused to true', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isInputFocused: false,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().isInputFocused).to.equal(true);
    });

    it('sets state.showKeyboardShortcuts to false', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: true,
      });
      wrapper.instance().onDayPickerBlur();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(false);
    });
  });

  describe('#showKeyboardShortcutsPanel', () => {
    it('sets state.isInputFocused to false', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isInputFocused: true,
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      expect(wrapper.state().isInputFocused).to.equal(false);
    });

    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        isDayPickerFocused: false,
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      expect(wrapper.state().isDayPickerFocused).to.equal(true);
    });

    it('sets state.showKeyboardShortcuts to true', () => {
      const wrapper = shallow((
        <DropDownController
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.setState({
        showKeyboardShortcuts: false,
      });
      wrapper.instance().showKeyboardShortcutsPanel();
      expect(wrapper.state().showKeyboardShortcuts).to.equal(true);
    });
  });
});
