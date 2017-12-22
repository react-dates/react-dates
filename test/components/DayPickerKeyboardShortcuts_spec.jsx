import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import { DayPickerKeyboardShortcutsPhrases } from '../../src/defaultPhrases';
import CloseButton from '../../src/components/CloseButton';

import KeyboardShortcutRow from '../../src/components/KeyboardShortcutRow';
import DayPickerKeyboardShortcuts from '../../src/components/DayPickerKeyboardShortcuts';

const event = { preventDefault: sinon.stub(), stopPropagation: sinon.stub() };

describe('DayPickerKeyboardShortcuts', () => {
  describe('#componentWillReceiveProps', () => {
    describe('when the phrases have been updated', () => {
      const prevProps = { phrases: { enterKey: 'foo', escape: 'bar', questionMark: 'baz' } };
      const newProps = { phrases: { enterKey: 'bleep', escape: 'blah', questionMark: 'boop' } };

      it('updates the keyboardShortcuts', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts {...prevProps} />).dive();
        const prevKeyboardShortcuts = wrapper.instance().keyboardShortcuts;
        wrapper.instance().componentWillReceiveProps(newProps);
        const updatedKeyboardShortcuts = wrapper.instance().keyboardShortcuts;
        expect(prevKeyboardShortcuts).to.not.equal(updatedKeyboardShortcuts);
      });
    });

    describe('when the phrases have NOT been updated', () => {
      const prevProps = { phrases: { enterKey: 'foo', escape: 'bar', questionMark: 'baz' } };
      const newProps = { phrases: { enterKey: 'foo', escape: 'bar', questionMark: 'baz' } };

      it('does NOT update the keyboardShortcuts', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts {...prevProps} />).dive();
        const prevKeyboardShortcuts = wrapper.instance().keyboardShortcuts;
        wrapper.instance().componentWillReceiveProps(newProps);
        const updatedKeyboardShortcuts = wrapper.instance().keyboardShortcuts;
        expect(prevKeyboardShortcuts).to.deep.equal(updatedKeyboardShortcuts);
      });
    });
  });

  describe('#componentDidUpdate', () => {
    it('focuses the hideKeyboardShortcutsButton', () => {
      const hideButtonFocusStub = sinon.stub();
      const wrapper = shallow(<DayPickerKeyboardShortcuts />).dive();
      wrapper.instance().setHideKeyboardShortcutsButtonRef({ focus: hideButtonFocusStub });
      wrapper.instance().componentDidUpdate();
      expect(hideButtonFocusStub.callCount).to.equal(1);
    });
  });

  describe('#onShowKeyboardShortcutsButtonClick', () => {
    const openKeyboardShortcutsPanelStub = sinon.stub();
    const showButtonFocusStub = sinon.stub();

    before(() => {
      const wrapper = shallow(<DayPickerKeyboardShortcuts
        openKeyboardShortcutsPanel={openKeyboardShortcutsPanelStub}
      />).dive();
      wrapper.instance().setShowKeyboardShortcutsButtonRef({ focus: showButtonFocusStub });
      wrapper.instance().onShowKeyboardShortcutsButtonClick();
    });

    it('calls props.openKeyboardShortcutsPanel', () => {
      expect(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
    });

    it('sends a callback that focuses the showKeyboardShortcutsButton', () => {
      const callback = openKeyboardShortcutsPanelStub.firstCall.args[0];
      callback();
      expect(showButtonFocusStub.callCount).to.equal(1);
    });
  });

  describe('#render', () => {
    describe('#showKeyboardShortcutsButton', () => {
      it('renders a button', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts />).dive();
        expect(wrapper.children('button')).to.have.lengthOf(1);
      });

      describe('when showKeyboardShortcutsPanel is true', () => {
        it('sets the aria-label to the hideKeyboardShortcutsPanel phrase', () => {
          const hideKeyboardShortcutsPanel = 'Test HIDE Keyboard Shortcuts Panel phrase';
          const phrases = { ...DayPickerKeyboardShortcutsPhrases, hideKeyboardShortcutsPanel };
          const wrapper = shallow(<DayPickerKeyboardShortcuts
            showKeyboardShortcutsPanel
            phrases={phrases}
          />).dive();
          expect(wrapper.children('button').prop('aria-label')).to.equal(hideKeyboardShortcutsPanel);
        });
      });

      describe('when showKeyboardShortcutsPanel is false', () => {
        it('sets the aria-label to the showKeyboardShortcutsPanel phrase', () => {
          const showKeyboardShortcutsPanel = 'Test SHOW Keyboard Shortcuts Panel phrase';
          const phrases = { ...DayPickerKeyboardShortcutsPhrases, showKeyboardShortcutsPanel };
          const wrapper = shallow(<DayPickerKeyboardShortcuts
            showKeyboardShortcutsPanel={false}
            phrases={phrases}
          />).dive();
          expect(wrapper.children('button').prop('aria-label')).to.equal(showKeyboardShortcutsPanel);
        });
      });

      describe('event handlers', () => {
        let openKeyboardShortcutsPanelStub;
        let buttonWrapper;

        beforeEach(() => {
          openKeyboardShortcutsPanelStub = sinon.stub();
          const wrapper = shallow(<DayPickerKeyboardShortcuts
            openKeyboardShortcutsPanel={openKeyboardShortcutsPanelStub}
          />).dive();
          buttonWrapper = wrapper.children('button');
        });

        afterEach(() => {
          openKeyboardShortcutsPanelStub.reset();
        });

        it('onClick calls onShowKeyboardShortcutsButtonClick', () => {
          buttonWrapper.simulate('click');
          expect(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });

        it('onKeyDown Space calls onShowKeyboardShortcutsButtonClick', () => {
          buttonWrapper.prop('onKeyDown')({ ...event, key: 'Space' });
          expect(openKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });

        it('onKeyDown Enter calls e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', () => {
          buttonWrapper.prop('onKeyDown')({ ...event, key: 'Enter' });
          expect(event.preventDefault.callCount).to.equal(1);
          expect(openKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
      });

      describe('when Mouse Up', () => {
        it('blurs the current target', () => {
          const mockEvent = { currentTarget: { blur: sinon.stub() } };
          const wrapper = shallow(<DayPickerKeyboardShortcuts />).dive();
          const buttonWrapper = wrapper.children().find('button');
          buttonWrapper.prop('onMouseUp')(mockEvent);
          expect(mockEvent.currentTarget.blur.callCount).to.equal(1);
        });
      });
    });

    describe('#DayPickerKeyboardShortcuts_panel', () => {
      it('is rendered', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
        />).dive();
        expect(wrapper.find('div[role="dialog"]')).to.have.lengthOf(1);
      });

      it('sets props.phrases.keyboardShortcuts as the aria-labelledby value', () => {
        const keyboardShortcuts = 'FOOBARBAZ';
        const phrases = { ...DayPickerKeyboardShortcutsPhrases, keyboardShortcuts };
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
          phrases={phrases}
        />).dive();
        const ariaLabelledbyId = wrapper.find('div[role="dialog"]').prop('aria-labelledby');
        expect(wrapper.find(`div#${ariaLabelledbyId}`).text()).to.equal(keyboardShortcuts);
      });

      it('sets the unordered list of keyboard shortcuts as the aria-describedby', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
        />).dive();
        const ariaDescribedbyId = wrapper.find('div[role="dialog"]').prop('aria-describedby');
        expect(wrapper.find('ul').prop('id')).to.equal(ariaDescribedbyId);
      });
    });

    describe('Close button', () => {
      it('is rendered', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
        />).dive();
        expect(wrapper.find('div[role="dialog"]').children('button')).to.have.lengthOf(1);
      });

      it('renders a CloseButton', () => {
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
        />).dive();
        expect(wrapper.find(CloseButton)).to.have.lengthOf(1);
      });

      describe('event handlers', () => {
        let closeKeyboardShortcutsPanelStub;
        let closeButton;

        beforeEach(() => {
          closeKeyboardShortcutsPanelStub = sinon.stub();
          const wrapper = shallow(<DayPickerKeyboardShortcuts
            showKeyboardShortcutsPanel
            closeKeyboardShortcutsPanel={closeKeyboardShortcutsPanelStub}
          />).dive();
          closeButton = wrapper.find('div[role="dialog"]').children('button');
        });

        afterEach(() => {
          closeKeyboardShortcutsPanelStub.reset();
          event.stopPropagation.reset();
          event.preventDefault.reset();
        });

        it('onClick calls onShowKeyboardShortcutsButtonClick', () => {
          closeButton.simulate('click');
          expect(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });

        it('onKeyDown Space calls e.stopPropagation and onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: ' ' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });

        it('onKeyDown Escape calls e.stopPropagation and onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'Escape' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });

        it('onKeyDown Enter calls e.stopPropagation and onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'Enter' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.callCount).to.equal(1);
        });

        it('onKeyDown Tab calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'Tab' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(event.preventDefault.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });

        it('onKeyDown Home calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'Home' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(event.preventDefault.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });

        it('onKeyDown End calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'End' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(event.preventDefault.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });

        it('onKeyDown PageUp calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'PageUp' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(event.preventDefault.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });

        it('onKeyDown PageDown calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'PageDown' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(event.preventDefault.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });

        it('onKeyDown ArrowLeft calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'ArrowLeft' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(event.preventDefault.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });

        it('onKeyDown ArrowRight calls e.stopPropagation and e.preventDefault and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'ArrowRight' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(event.preventDefault.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });

        it('onKeyDown ArrowUp calls e.stopPropagation and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'ArrowUp' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });

        it('onKeyDown ArrowDown calls e.stopPropagation and NOT onShowKeyboardShortcutsButtonClick', () => {
          closeButton.prop('onKeyDown')({ ...event, key: 'ArrowDown' });
          expect(event.stopPropagation.callCount).to.equal(1);
          expect(closeKeyboardShortcutsPanelStub.notCalled).to.equal(true);
        });
      });

      it('sets the aria-label to the hideKeyboardShortcutsPanel phrase', () => {
        const hideKeyboardShortcutsPanel = 'Test HIDE Keyboard Shortcuts Panel phrase';
        const phrases = { ...DayPickerKeyboardShortcutsPhrases, hideKeyboardShortcutsPanel };
        const wrapper = shallow(<DayPickerKeyboardShortcuts
          showKeyboardShortcutsPanel
          phrases={phrases}
        />).dive();
        expect(wrapper.find('div[role="dialog"]').children('button')
          .prop('aria-label')).to.equal(hideKeyboardShortcutsPanel);
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
