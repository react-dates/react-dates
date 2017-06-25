import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import { MonthPickerKeyboardShortcutsPhrases } from '../../src/defaultPhrases';
import CloseButton from '../../src/svg/close.svg';

import MonthPickerKeyboardShortcuts, { KeyboardShortcutRow } from '../../src/components/MonthPickerKeyboardShortcuts';

describe('MonthPickerKeyboardShortcuts', () => {
  describe('#render', () => {
    describe('.MonthPickerKeyboardShortcuts__show', () => {
      it('is rendered', () => {
        const wrapper = shallow(<MonthPickerKeyboardShortcuts />);
        expect(wrapper.find('.MonthPickerKeyboardShortcuts__show')).to.have.lengthOf(1);
      });

      it('is a button', () => {
        const wrapper = shallow(<MonthPickerKeyboardShortcuts />);
        expect(wrapper.find('.MonthPickerKeyboardShortcuts__show').is('button')).to.equal(true);
      });

      it('contains .MonthPickerKeyboardShortcuts__show_span', () => {
        const wrapper = shallow(<MonthPickerKeyboardShortcuts />);
        const buttonWrapper = wrapper.find('.MonthPickerKeyboardShortcuts__show');
        expect(buttonWrapper.find('.MonthPickerKeyboardShortcuts__show_span')).to.have.lengthOf(1);
      });

      it('click calls props.openKeyboardShortcutsPanel', () => {
        const openKeyboardShortcutsPanelStub = sinon.stub();
        const wrapper = shallow(
          <MonthPickerKeyboardShortcuts
            openKeyboardShortcutsPanel={openKeyboardShortcutsPanelStub}
          />,
        );
        const buttonWrapper = wrapper.find('.MonthPickerKeyboardShortcuts__show');
        buttonWrapper.simulate('click');
        expect(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
      });
    });

    describe('.MonthPickerKeyboardShortcuts__panel', () => {
      it('is not rendered if props.showKeyboardShortcutsPanel is falsey', () => {
        const wrapper = shallow(
          <MonthPickerKeyboardShortcuts
            showKeyboardShortcutsPanel={false}
          />,
        );
        expect(wrapper.find('.MonthPickerKeyboardShortcuts__panel')).to.have.lengthOf(0);
      });

      it('is rendered if props.showKeyboardShortcutsPanel is truthy', () => {
        const wrapper = shallow(
          <MonthPickerKeyboardShortcuts
            showKeyboardShortcutsPanel
          />,
        );
        expect(wrapper.find('.MonthPickerKeyboardShortcuts__panel')).to.have.lengthOf(1);
      });

      it('has role of dialog', () => {
        const wrapper = shallow(
          <MonthPickerKeyboardShortcuts
            showKeyboardShortcutsPanel
          />,
        );
        expect(wrapper.find('.MonthPickerKeyboardShortcuts__panel').props().role).to.equal('dialog');
      });

      describe('.MonthPickerKeyboardShortcuts__title', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.MonthPickerKeyboardShortcuts__title')).to.have.lengthOf(1);
        });

        it('has props.phrases.keyboardShortcuts as a child', () => {
          const keyboardShortcuts = 'FOOBARBAZ';
          const phrases = { ...MonthPickerKeyboardShortcutsPhrases, keyboardShortcuts };
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
              phrases={phrases}
            />,
          );
          expect(wrapper.find('.MonthPickerKeyboardShortcuts__title').text()).to.equal(keyboardShortcuts);
        });
      });

      describe('.MonthPickerKeyboardShortcuts__close', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.MonthPickerKeyboardShortcuts__close')).to.have.lengthOf(1);
        });

        it('is a button', () => {
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.MonthPickerKeyboardShortcuts__close').is('button')).to.equal(true);
        });

        it('renders a CloseButton', () => {
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.MonthPickerKeyboardShortcuts__close').find(CloseButton)).to.have.lengthOf(1);
        });

        it('calls props.closeKeyboardShortcutsPanel if clicked', () => {
          const closeKeyboardShortcutsPanelStub = sinon.stub();
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
              closeKeyboardShortcutsPanel={closeKeyboardShortcutsPanelStub}
            />,
          );
          const closeButton = wrapper.find('.MonthPickerKeyboardShortcuts__close');
          closeButton.simulate('click');
          expect(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });
      });

      describe('.MonthPickerKeyboardShortcuts__list', () => {
        it('is rendered', () => {
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.MonthPickerKeyboardShortcuts__list')).to.have.lengthOf(1);
        });

        it('is a ul', () => {
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.MonthPickerKeyboardShortcuts__list').is('ul')).to.equal(true);
        });

        it('renders 7 KeyboardShortcutRow components', () => {
          const wrapper = shallow(
            <MonthPickerKeyboardShortcuts
              showKeyboardShortcutsPanel
            />,
          );
          expect(wrapper.find('.MonthPickerKeyboardShortcuts__list').find(KeyboardShortcutRow)).to.have.lengthOf(7);
        });
      });
    });
  });
});
