import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { MonthPickerKeyboardShortcutsPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CloseButton from '../svg/close.svg';

export const TOP_LEFT = 'top-left';
export const TOP_RIGHT = 'top-right';
export const BOTTOM_RIGHT = 'bottom-right';

const propTypes = forbidExtraProps({
  block: PropTypes.bool,
  buttonLocation: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: PropTypes.bool,
  openKeyboardShortcutsPanel: PropTypes.func,
  closeKeyboardShortcutsPanel: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(MonthPickerKeyboardShortcutsPhrases)),
});

const defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel() {},
  closeKeyboardShortcutsPanel() {},
  phrases: MonthPickerKeyboardShortcutsPhrases,
};

export function KeyboardShortcutRow({ unicode, label, action }) {
  return (
    <li className="KeyboardShortcutRow">
      <div
        className="KeyboardShortcutRow__key-container"
      >
        <span
          className="KeyboardShortcutRow__key"
          role="img"
          aria-label={label}
        >
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

export default function MonthPickerKeyboardShortcuts({
  block,
  buttonLocation,
  showKeyboardShortcutsPanel,
  openKeyboardShortcutsPanel,
  closeKeyboardShortcutsPanel,
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
    action: phrases.moveFocusByOneMonth,
  },
  {
    unicode: '↑/↓',
    label: phrases.upArrowDownArrow,
    action: phrases.moveFocusByThreeMonths,
  },
  {
    unicode: 'PgUp/PgDn',
    label: phrases.pageUpPageDown,
    action: phrases.moveFocusByOneYear,
  },
  {
    unicode: 'Home/End',
    label: phrases.homeEnd,
    action: phrases.moveFocustoStartOfMonthsRow,
  },
  {
    unicode: 'Esc',
    label: phrases.escape,
    action: phrases.returnFocusToInput,
  },
  {
    unicode: '?',
    label: phrases.questionMark,
    action: phrases.openThisPanel,
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
        className={cx('MonthPickerKeyboardShortcuts__show', {
          'MonthPickerKeyboardShortcuts__show--bottom-right': buttonLocation === BOTTOM_RIGHT,
          'MonthPickerKeyboardShortcuts__show--top-right': buttonLocation === TOP_RIGHT,
          'MonthPickerKeyboardShortcuts__show--top-left': buttonLocation === TOP_LEFT,
        })}
        type="button"
        aria-label={toggleButtonText}
        onClick={() => {
          // we want to return focus to this button after closing the keyboard shortcuts panel
          openKeyboardShortcutsPanel(() => { this.showKeyboardShortcutsButton.focus(); });
        }}
        onMouseUp={(e) => {
          e.currentTarget.blur();
        }}
      >
        <span className="MonthPickerKeyboardShortcuts__show_span">?</span>
      </button>

      {showKeyboardShortcutsPanel &&
        <div
          className={cx('MonthPickerKeyboardShortcuts__panel', {
            'MonthPickerKeyboardShortcuts__panel--block': block,
          })}
          role="dialog"
          aria-labelledby="MonthPickerKeyboardShortcuts__title"
        >
          <div
            id="MonthPickerKeyboardShortcuts__title"
            className="MonthPickerKeyboardShortcuts__title"
          >
            {phrases.keyboardShortcuts}
          </div>

          <button
            className="MonthPickerKeyboardShortcuts__close"
            type="button"
            aria-label={phrases.hideKeyboardShortcutsPanel}
            onClick={closeKeyboardShortcutsPanel}
            onKeyDown={(e) => {
              // Because the close button is the only focusable element inside of the panel, this
              // amount to a very basic focus trap. The user can exit the panel by "pressing" the
              // close button or hitting escape
              if (e.key === 'Tab') {
                e.preventDefault();
              }
            }}
          >
            <CloseButton />
          </button>

          <ul className="MonthPickerKeyboardShortcuts__list">
            {keyboardShortcuts.map(({ unicode, label, action }) => (
              <KeyboardShortcutRow key={label} unicode={unicode} label={label} action={action} />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

MonthPickerKeyboardShortcuts.propTypes = propTypes;
MonthPickerKeyboardShortcuts.defaultProps = defaultProps;
