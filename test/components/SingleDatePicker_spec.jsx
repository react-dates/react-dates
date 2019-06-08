import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon-sandbox';
import { Portal } from 'react-portal';

import CloseButton from '../../src/components/CloseButton';
import DayPickerSingleDateController from '../../src/components/DayPickerSingleDateController';
import SingleDatePickerInputController from '../../src/components/SingleDatePickerInputController';
import SingleDatePicker, { PureSingleDatePicker } from '../../src/components/SingleDatePicker';

const describeIfWindow = typeof document === 'undefined' ? describe.skip : describe;

describe('SingleDatePicker', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    describe('SingleDatePickerInputController', () => {
      it('renders a SingleDatePickerInputController', () => {
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
          />
        )).dive();
        expect(wrapper.find(SingleDatePickerInputController)).to.have.lengthOf(1);
      });

      it('renders with a DayPickerSingleDateController child when focused', () => {
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            focused
          />
        )).dive();
        expect(wrapper.find(SingleDatePickerInputController)).to.have.property('children');
        expect(
          wrapper.find(SingleDatePickerInputController).find(DayPickerSingleDateController),
        ).to.have.lengthOf(1);
      });

      describe('props.isOutsideRange is defined', () => {
        it('should pass props.isOutsideRange to <SingleDatePickerInputController>', () => {
          const isOutsideRange = sinon.stub();
          const wrapper = shallow((
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              isOutsideRange={isOutsideRange}
            />
          )).dive();
          expect(wrapper.find(SingleDatePickerInputController).prop('isOutsideRange')).to.equal(isOutsideRange);
        });
      });
    });

    describe('DayPickerSingleDateController', () => {
      describe('props.focused === true', () => {
        it('renders a <DayPickerSingleDateController>', () => {
          const wrapper = shallow((
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
            />
          )).dive();
          expect(wrapper.find(DayPickerSingleDateController)).to.have.lengthOf(1);
        });
      });

      describe('props.focused === false', () => {
        it('does not render a <DayPickerSingleDateController>', () => {
          const wrapper = shallow((
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused={false}
            />
          )).dive();
          expect(wrapper.find(DayPickerSingleDateController)).to.have.lengthOf(0);
        });
      });

      describe('props.onClose is defined', () => {
        it('should pass props.onClose in to <DayPickerSingleDateController>', () => {
          const onCloseStub = sinon.stub();
          const wrapper = shallow((
            <SingleDatePicker
              id="date"
              onDateChange={() => {}}
              onFocusChange={() => {}}
              focused
              onClose={onCloseStub}
            />
          )).dive();
          expect(wrapper.find(DayPickerSingleDateController).prop('onClose')).to.equal(onCloseStub);
        });
      });

      it('should pass onDayPickerBlur as onBlur to <DayPickerSingleDateController>', () => {
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            focused
          />
        )).dive();
        const { onDayPickerBlur } = wrapper.instance();
        expect(wrapper.find(DayPickerSingleDateController).prop('onBlur')).to.equal(onDayPickerBlur);
      });
    });

    describe('props.withPortal is truthy', () => {
      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow((
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withPortal
              focused
            />
          )).dive();

          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered if props.focused is falsy', () => {
          const wrapper = shallow((
            <SingleDatePicker
              onDateChange={() => {}}
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
          <SingleDatePicker
            onDateChange={() => {}}
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
            <SingleDatePicker
              onDateChange={() => {}}
              onFocusChange={() => {}}
              withFullScreenPortal
              focused
            />
          )).dive();
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('is not rendered when props.focused is falsy', () => {
          const wrapper = shallow((
            <SingleDatePicker
              onDateChange={() => {}}
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
        onDateChange: () => {},
        onFocusChange: () => {},
      };

      it('renders <DayPickerSingleDateController> inside <Portal>', () => {
        const wrapper = shallow((
          <SingleDatePicker {...requiredProps} appendToBody focused />
        )).dive();
        const portal = wrapper.find(Portal);
        expect(portal).to.have.length(1);
        expect(portal.find(DayPickerSingleDateController)).to.have.length(1);
      });

      describeIfWindow('mounted', () => {
        let wrapper;
        let instance;
        let onCloseStub;

        beforeEach(() => {
          onCloseStub = sinon.stub();
          wrapper = mount(shallow((
            <SingleDatePicker
              {...requiredProps}
              appendToBody
              focused
              onClose={onCloseStub}
            />
          )).get(0));
          instance = wrapper.instance();
        });

        it('positions <DateRangePickerInputController> using top and transform CSS properties', () => {
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
      onDayPickerFocusSpy = sinon.spy(PureSingleDatePicker.prototype, 'onDayPickerFocus');
      onDayPickerBlurSpy = sinon.spy(PureSingleDatePicker.prototype, 'onDayPickerBlur');
    });

    it('calls props.onFocusChange once', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls props.onFocusChange with { focused: true } as arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <SingleDatePicker id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(true);
    });

    it('calls onDayPickerFocus if withPortal', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          withPortal
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if withFullScreenPortal', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          withFullScreenPortal
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if readOnly', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
          readOnly
        />
      )).dive();
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerFocus if isTouchDevice', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
          onFocusChange={sinon.stub()}
        />
      )).dive();
      wrapper.instance().isTouchDevice = true;
      wrapper.instance().onInputFocus({ focused: true });
      expect(onDayPickerFocusSpy.callCount).to.equal(1);
    });

    it('calls onDayPickerBlur if isTouchDevice and keepFocusOnInput', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
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
          <SingleDatePicker
            onDateChange={sinon.stub()}
            onFocusChange={sinon.stub()}
            focused
          />
        )).dive();
        wrapper.setState({ isDayPickerFocused: true });
        wrapper.instance().onOutsideClick();
        expect(wrapper.state().isDayPickerFocused).to.equal(false);
      });

      it('sets state.isInputFocused to false', () => {
        const wrapper = shallow((
          <SingleDatePicker
            onDateChange={sinon.stub()}
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
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
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
          <SingleDatePicker
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused
          />
        )).dive();
        wrapper.instance().onOutsideClick();
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });

      it('calls props.onClose with { date: "08-06-2019" } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const onCloseStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePicker
            id="date"
            onClose={onCloseStub}
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused
            date="08-06-2019"
          />
        )).dive();
        wrapper.instance().onOutsideClick();
        expect(onCloseStub.getCall(0).args[0].date).to.equal('08-06-2019');
      });
    });
  });

  describe('#onDayPickerFocus', () => {
    it('sets state.isDayPickerFocused to true', () => {
      const wrapper = shallow((
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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
        <SingleDatePicker
          onDateChange={sinon.stub()}
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

  describeIfWindow('#onFocusOut', () => {
    let wrapper;
    let ctrl;
    let onFocusChangeStub;
    let dpcContainsStub;

    beforeEach(() => {
      onFocusChangeStub = sinon.stub();
      dpcContainsStub = sinon.stub();
      wrapper = shallow((
        <SingleDatePicker id="date" onFocusChange={onFocusChangeStub} />
      )).dive();
      ctrl = wrapper.instance();
      ctrl.dayPickerContainer = {
        contains: dpcContainsStub.returns(true),
      };
    });

    afterEach(() => {
      onFocusChangeStub.reset();
      dpcContainsStub.reset();
    });

    it('calls props.onFocusChange with focused: false when dayPickerContainer does not contain the target', () => {
      dpcContainsStub.returns(false);
      ctrl.onFocusOut({});
      expect(onFocusChangeStub.callCount).to.equal(1);
      expect(onFocusChangeStub.getCall(0).args[0]).to.deep.equal({ focused: false });
    });

    it('should not call props.onFocusChange when dayPickerContainer contains the target', () => {
      ctrl.onFocusOut({});
      expect(onFocusChangeStub.callCount).to.equal(0);
    });

    it('should check the target when related target is the same as the document body', () => {
      const event = {
        relatedTarget: document.body,
        target: 'target',
      };
      ctrl.onFocusOut(event);
      expect(dpcContainsStub.getCall(0).args[0]).to.equal(event.target);
    });

    it('should check the target when related target is defined', () => {
      const event = {
        relatedTarget: 'related target',
        target: 'target',
      };
      ctrl.onFocusOut(event);
      expect(dpcContainsStub.getCall(0).args[0]).to.equal(event.relatedTarget);
    });

    it('should check the target when related target is not defined', () => {
      const event = {
        relatedTarget: undefined,
        target: 'target',
      };
      ctrl.onFocusOut(event);
      expect(dpcContainsStub.getCall(0).args[0]).to.equal(event.target);
    });
  });
});
