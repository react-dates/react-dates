import React, { PropTypes } from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';

import { DayPickerKeyboardShortcutsPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CloseButton from '../svg/close.svg';

const propTypes = forbidExtraProps({
  showKeyboardShortcutsPanel: PropTypes.bool,
  toggleKeyboardShortcutsPanel: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerKeyboardShortcutsPhrases)),
});

const defaultProps = {
  showKeyboardShortcutsPanel: false,
  toggleKeyboardShortcutsPanel() {},
  phrases: DayPickerKeyboardShortcutsPhrases,
};

function KeyboardShortcutRow({ unicode, label, action }) {
  return (
    <li className="KeyboardShortcutRow">
      <div
        className="KeyboardShortcutRow__key-container"
      >
        <span className="KeyboardShortcutRow__key" aria-label={label}>
          {unicode}
        </span>
      </div>

      <div className="KeyboardShortcutRow__action">
        {action}
      </div>
    </li>
  );
}

KeyboardShortcutRow.propTypes = {
  unicode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default function DayPickerKeyboardShortcuts({
  showKeyboardShortcutsPanel,
  toggleKeyboardShortcutsPanel,
  phrases,
}) {
  const keyboardShortcuts = [{
    unicode: '↵',
    label: phrases.enterKey,
    action: phrases.selectFocusedDate,
  },
  {
    unicode: '←/→',
    label: phrases.leftArrowRightArrow,
    action: phrases.moveFocusByOneDay,
  },
  {
    unicode: '↑/↓',
    label: phrases.upArrowDownArrow,
    action: phrases.moveFocusByOneWeek,
  },
  {
    unicode: 'PgUp/PgDn',
    label: phrases.pageUpPageDown,
    action: phrases.moveFocusByOneMonth,
  },
  {
    unicode: 'Home/End',
    label: phrases.homeEnd,
    action: phrases.moveFocustoStartAndEndOfWeek,
  },
  {
    unicode: 'Esc',
    label: phrases.escape,
    action: phrases.returnFocusToInput,
  },
  {
    unicode: '?',
    label: phrases.questionMark,
    action: phrases.toggleKeyboardShortcutsPanel,
  },
  ];

  const toggleButtonText =
    showKeyboardShortcutsPanel
    ? phrases.hideKeyboardShortcutsPanel
    : phrases.showKeyboardShortcutsPanel;

  return (
    <div>
      <button
        ref={(ref) => { this.showKeyboardShortcutsButton = ref; }}
        className="DayPickerKeyboardShortcuts__show"
        type="button"
        aria-label={toggleButtonText}
        onClick={toggleKeyboardShortcutsPanel}
        onMouseUp={(e) => {
          e.currentTarget.blur();
        }}
      >
        <span className="DayPickerKeyboardShortcuts__show_span">?</span>
      </button>

      {showKeyboardShortcutsPanel &&
        <div
          className="DayPickerKeyboardShortcuts__panel"
          role="dialog"
          aria-labelledby="DayPickerKeyboardShortcuts__title"
        >
          <div
            id="DayPickerKeyboardShortcuts__title"
            className="DayPickerKeyboardShortcuts__title"
          >
            {phrases.keyboardShortcuts}
          </div>

          <button
            className="DayPickerKeyboardShortcuts__close"
            type="button"
            aria-label={phrases.hideKeyboardShortcutsPanel}
            onClick={toggleKeyboardShortcutsPanel}
          >
            <CloseButton />
          </button>

          <ul className="DayPickerKeyboardShortcuts__list">
            {keyboardShortcuts.map(({ unicode, label, action }) => (
              <KeyboardShortcutRow key={label} unicode={unicode} label={label} action={action} />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

DayPickerKeyboardShortcuts.propTypes = propTypes;
DayPickerKeyboardShortcuts.defaultProps = defaultProps;
