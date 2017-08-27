import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { DayPickerKeyboardShortcutsPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CloseButton from '../svg/close.svg';

export const TOP_LEFT = 'top-left';
export const TOP_RIGHT = 'top-right';
export const BOTTOM_RIGHT = 'bottom-right';

const propTypes = {
  block: PropTypes.bool,
  buttonLocation: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: PropTypes.bool,
  openKeyboardShortcutsPanel: PropTypes.func,
  closeKeyboardShortcutsPanel: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerKeyboardShortcutsPhrases)),
};

const defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel() {},
  closeKeyboardShortcutsPanel() {},
  phrases: DayPickerKeyboardShortcutsPhrases,
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

export default class DayPickerKeyboardShortcuts extends React.Component {
  constructor(...args) {
    super(...args);

    this.onClick = this.onClick.bind(this);
    this.setShowKeyboardShortcutsButtonRef = this.setShowKeyboardShortcutsButtonRef.bind(this);
  }

  onClick() {
    const { openKeyboardShortcutsPanel } = this.props;

    // we want to return focus to this button after closing the keyboard shortcuts panel
    openKeyboardShortcutsPanel(() => { this.showKeyboardShortcutsButton.focus(); });
  }

  setShowKeyboardShortcutsButtonRef(ref) {
    this.showKeyboardShortcutsButton = ref;
  }

  render() {
    const {
      block,
      buttonLocation,
      showKeyboardShortcutsPanel,
      closeKeyboardShortcutsPanel,
      phrases,
    } = this.props;

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
      action: phrases.openThisPanel,
    },
    ];

    const toggleButtonText = showKeyboardShortcutsPanel
      ? phrases.hideKeyboardShortcutsPanel
      : phrases.showKeyboardShortcutsPanel;

    return (
      <div>
        <button
          ref={this.setShowKeyboardShortcutsButtonRef}
          className={cx('DayPickerKeyboardShortcuts__show', {
            'DayPickerKeyboardShortcuts__show--bottom-right': buttonLocation === BOTTOM_RIGHT,
            'DayPickerKeyboardShortcuts__show--top-right': buttonLocation === TOP_RIGHT,
            'DayPickerKeyboardShortcuts__show--top-left': buttonLocation === TOP_LEFT,
          })}
          type="button"
          aria-label={toggleButtonText}
          onClick={this.onClick}
          onMouseUp={(e) => {
            e.currentTarget.blur();
          }}
        >
          <span className="DayPickerKeyboardShortcuts__show_span">?</span>
        </button>

        {showKeyboardShortcutsPanel &&
          <div
            className={cx('DayPickerKeyboardShortcuts__panel', {
              'DayPickerKeyboardShortcuts__panel--block': block,
            })}
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
}

DayPickerKeyboardShortcuts.propTypes = forbidExtraProps(propTypes);
DayPickerKeyboardShortcuts.defaultProps = defaultProps;
