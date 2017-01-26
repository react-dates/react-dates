import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import { DayPickerKeyboardShortcutsPhrases } from '../../src/defaultPhrases';
import CloseButton from '../../src/svg/close.svg';

import DayPickerKeyboardShortcuts, { KeyboardShortcutRow } from '../../src/components/DayPickerKeyboardShortcuts';

describe('KeyboardShortcutRow', () => {
  it('is a .KeyboardShortcutRow', () => {
    const wrapper = shallow(
      <KeyboardShortcutRow
        unicode="foo"
        label="bar"
        action="baz"
      />,
    );
    expect(wrapper.is('.KeyboardShortcutRow')).to.equal(true);
  });

  it('is an li', () => {
    const wrapper = shallow(
      <KeyboardShortcutRow
        unicode="foo"
        label="bar"
        action="baz"
      />,
    );
    expect(wrapper.is('li')).to.equal(true);
  });

  describe('.KeyboardShortcutRow__key-container', () => {
    it('is rendered', () => {
      const wrapper = shallow(
        <KeyboardShortcutRow
          unicode="foo"
          label="bar"
          action="baz"
        />,
      );
      expect(wrapper.find('.KeyboardShortcutRow__key-container')).to.have.lengthOf(1);
    });

    describe('.KeyboardShortcutRow__key', () => {
      it('is rendered', () => {
        const wrapper = shallow(
          <KeyboardShortcutRow
            unicode="foo"
            label="bar"
            action="baz"
          />,
        );
        const keyContainer = wrapper.find('.KeyboardShortcutRow__key-container');
        expect(keyContainer.find('.KeyboardShortcutRow__key')).to.have.lengthOf(1);
      });

      it('has role=`img`', () => {
        const wrapper = shallow(
          <KeyboardShortcutRow
            unicode="foo"
            label="bar"
            action="baz"
          />,
        );
        const keyContainer = wrapper.find('.KeyboardShortcutRow__key-container');
        expect(keyContainer.find('.KeyboardShortcutRow__key').props().role).to.equal('img');
      });

      it('has props.unicode as child', () => {
        const unicode = 'UNICODE';
        const wrapper = shallow(
          <KeyboardShortcutRow
            unicode={unicode}
            label="bar"
            action="baz"
          />,
        );
        const keyContainer = wrapper.find('.KeyboardShortcutRow__key-container');
        expect(keyContainer.find('.KeyboardShortcutRow__key').text()).to.equal(unicode);
      });
    });
  });

  describe('.KeyboardShortcutRow__action', () => {
    it('is rendered', () => {
      const wrapper = shallow(
        <KeyboardShortcutRow
          unicode="foo"
          label="bar"
          action="baz"
        />,
      );
      expect(wrapper.find('.KeyboardShortcutRow__action')).to.have.lengthOf(1);
    });

    it('contains props.action as child', () => {
      const action = 'ACTION';
      const wrapper = shallow(
        <KeyboardShortcutRow
          unicode="foo"
          label="bar"
          action={action}
        />,
      );
      expect(wrapper.find('.KeyboardShortcutRow__action').text()).to.equal(action);
    });
  });
});

describe('DayPickerKeyboardShortcuts', () => {
  describe('#render', () => {
    describe('.DayPickerKeyboardShortcuts__show', () => {
      it('is rendered', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts />);
        expect(wrapper.find('.DayPickerKeyboardShortcuts__show')).to.have.lengthOf(1);
      });

      it('is a button', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts />);
        expect(wrapper.find('.DayPickerKeyboardShortcuts__show').is('button')).to.equal(true);
      });

      it('contains .DayPickerKeyboardShortcuts__show_span', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts />);
        const buttonWrapper = wrapper.find('.DayPickerKeyboardShortcuts__show');
        expect(buttonWrapper.find('.DayPickerKeyboardShortcuts__show_span')).to.have.lengthOf(1);
      });

      it('click calls props.openKeyboardShortcutsPanel', () => {
        const openKeyboardShortcutsPanelStub = sinon.stub();
        const wrapper = shallow(
          <DayPickerKeyboardShortcuts
            openKeyboardShortcutsPanel={openKeyboardShortcutsPanelStub}
          />,
        );
        const buttonWrapper = wrapper.find('.DayPickerKeyboardShortcuts__show');
        buttonWrapper.simulate('click');
        expect(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
      });
    });

    describe('.DayPickerKeyboardShortcuts__panel', () => {
      it('is not rendered if props.showKeyboardShortcutsPanel is falsey', () => {
        const wrapper = shallow(
          <DayPickerKeyboardShortcuts
            showKeyboardShortcutsPanel={false}
          />,
        );
        expect(wrapper.find('.DayPickerKeyboardShortcuts__panel')).to.have.lengthOf(0);
      });

      it('is rendered if props.showKeyboardShortcutsPanel is truthy', () => {
        const wrapper = shallow(
          <DayPickerKeyboardShortcuts
            showKeyboardShortcutsPanel
          />,
        );
        expect(wrapper.find('.DayPickerKeyboardShortcuts__panel')).to.have.lengthOf(1);
      });

      it('has role of dialog', () => {
        const wrapper = shallow(
          <DayPickerKeyboardShortcuts
            showKeyboardShortcutsPanel
          />,
        );
        expect(wrapper.find('.DayPickerKeyboardShortcuts__panel').props().role).to.equal('dialog');
      });

      describe('.DayPickerKeyboardShortcuts__title', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.DayPickerKeyboardShortcuts__title')).to.have.lengthOf(1);
        });

        it('has props.phrases.keyboardShortcuts as a child', () => {
          const keyboardShortcuts = 'FOOBARBAZ';
          const phrases = { ...DayPickerKeyboardShortcutsPhrases, keyboardShortcuts };
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
              phrases={phrases}
            />,
          );
          expect(wrapper.find('.DayPickerKeyboardShortcuts__title').text()).to.equal(keyboardShortcuts);
        });
      });

      describe('.DayPickerKeyboardShortcuts__close', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.DayPickerKeyboardShortcuts__close')).to.have.lengthOf(1);
        });

        it('is a button', () => {
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.DayPickerKeyboardShortcuts__close').is('button')).to.equal(true);
        });

        it('renders a CloseButton', () => {
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.DayPickerKeyboardShortcuts__close').find(CloseButton)).to.have.lengthOf(1);
        });

        it('calls props.closeKeyboardShortcutsPanel if clicked', () => {
          const closeKeyboardShortcutsPanelStub = sinon.stub();
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
              closeKeyboardShortcutsPanel={closeKeyboardShortcutsPanelStub}
            />,
          );
          const closeButton = wrapper.find('.DayPickerKeyboardShortcuts__close');
          closeButton.simulate('click');
          expect(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });
      });

      describe('.DayPickerKeyboardShortcuts__list', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.DayPickerKeyboardShortcuts__list')).to.have.lengthOf(1);
        });

        it('is a ul', () => {
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.DayPickerKeyboardShortcuts__list').is('ul')).to.equal(true);
        });

        it('renders 7 KeyboardShortcutRow components', () => {
          const wrapper = shallow(
            <DayPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.DayPickerKeyboardShortcuts__list').find(KeyboardShortcutRow)).to.have.lengthOf(7);
        });
      });
    });
  });
});
