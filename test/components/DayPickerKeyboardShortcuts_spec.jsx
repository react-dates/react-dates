import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import { DayPickerKeyboardShortcutsPhrases } from '../../src/defaultPhrases';
import CloseButton from '../../src/components/CloseButton';

import KeyboardShortcutRow from '../../src/components/KeyboardShortcutRow';
import DayPickerKeyboardShortcuts from '../../src/components/DayPickerKeyboardShortcuts';

describe('DayPickerKeyboardShortcuts', () => {
  describe('#render', () => {
    it('renders a button', () => {
      const wrapper = shallow(<DayPickerKeyboardShortcuts />).dive();
      expect(wrapper.find('button')).to.have.lengthOf(1);
    });

    it('click calls props.openKeyboardShortcutsPanel', () => {
      const openKeyboardShortcutsPanelStub = sinon.stub();
      const wrapper = shallow(<DayPickerKeyboardShortcuts
        openKeyboardShortcutsPanel={openKeyboardShortcutsPanelStub}
      />).dive();
      const buttonWrapper = wrapper.find('button');
      buttonWrapper.simulate('click');
      expect(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
    });

    describe('#DayPickerKeyboardShortcuts__title', () => {
      it('has props.phrases.keyboardShortcuts as a child', () => {
        const keyboardShortcuts = 'FOOBARBAZ';
        const phrases = { ...DayPickerKeyboardShortcutsPhrases, keyboardShortcuts };
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
          phrases={phrases}
        />).dive();
        expect(wrapper.find('#DayPickerKeyboardShortcuts__title').text()).to.equal(keyboardShortcuts);
      });
    });

    describe('Close button', () => {
      it('is rendered', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
        />).dive();
        expect(wrapper.find('button')).to.have.lengthOf(2);
      });

      it('renders a CloseButton', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
        />).dive();
        expect(wrapper.find(CloseButton)).to.have.lengthOf(1);
      });

      it('calls props.closeKeyboardShortcutsPanel if clicked', () => {
        const closeKeyboardShortcutsPanelStub = sinon.stub();
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
          closeKeyboardShortcutsPanel={closeKeyboardShortcutsPanelStub}
        />).dive();
        const closeButton = wrapper.find('button').at(1);
        closeButton.simulate('click');
        expect(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
      });
    });

    describe('KeyboardShortcutRow list', () => {
      it('is rendered', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
        />).dive();
        expect(wrapper.find('ul')).to.have.lengthOf(1);
      });

      it('renders 7 KeyboardShortcutRow components', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
        />).dive();
        expect(wrapper.find('ul').find(KeyboardShortcutRow)).to.have.lengthOf(7);
      });
    });
  });
});
