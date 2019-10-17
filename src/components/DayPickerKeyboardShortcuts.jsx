import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import { DayPickerKeyboardShortcutsPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import KeyboardShortcutRow from './KeyboardShortcutRow';
import CloseButton from './CloseButton';

export const TOP_LEFT = 'top-left';
export const TOP_RIGHT = 'top-right';
export const BOTTOM_RIGHT = 'bottom-right';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  block: PropTypes.bool,
  // TODO: rename button location to be direction-agnostic
  buttonLocation: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT]),
  showKeyboardShortcutsPanel: PropTypes.bool,
  openKeyboardShortcutsPanel: PropTypes.func,
  closeKeyboardShortcutsPanel: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerKeyboardShortcutsPhrases)),
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,
});

const defaultProps = {
  block: false,
  buttonLocation: BOTTOM_RIGHT,
  showKeyboardShortcutsPanel: false,
  openKeyboardShortcutsPanel() {},
  closeKeyboardShortcutsPanel() {},
  phrases: DayPickerKeyboardShortcutsPhrases,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
};

function getKeyboardShortcuts(phrases) {
  return [
    {
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
}

class DayPickerKeyboardShortcuts extends React.PureComponent {
  constructor(...args) {
    super(...args);

    const { phrases } = this.props;
    this.keyboardShortcuts = getKeyboardShortcuts(phrases);

    this.onShowKeyboardShortcutsButtonClick = this.onShowKeyboardShortcutsButtonClick.bind(this);
    this.setShowKeyboardShortcutsButtonRef = this.setShowKeyboardShortcutsButtonRef.bind(this);
    this.setHideKeyboardShortcutsButtonRef = this.setHideKeyboardShortcutsButtonRef.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { phrases } = this.props;
    if (nextProps.phrases !== phrases) {
      this.keyboardShortcuts = getKeyboardShortcuts(nextProps.phrases);
    }
  }

  componentDidUpdate() {
    this.handleFocus();
  }

  onKeyDown(e) {
    e.stopPropagation();

    const { closeKeyboardShortcutsPanel } = this.props;
    // Because the close button is the only focusable element inside of the panel, this
    // amounts to a very basic focus trap. The user can exit the panel by "pressing" the
    // close button or hitting escape
    switch (e.key) {
      case 'Escape':
        closeKeyboardShortcutsPanel();
        break;

      // do nothing - this allows the up and down arrows continue their
      // default behavior of scrolling the content of the Keyboard Shortcuts Panel
      // which is needed when only a single month is shown for instance.
      case 'ArrowUp':
      case 'ArrowDown':
        break;

      // completely block the rest of the keys that have functionality outside of this panel
      case 'Tab':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        e.preventDefault();
        break;

      default:
        break;
    }
  }

  onShowKeyboardShortcutsButtonClick() {
    const { openKeyboardShortcutsPanel } = this.props;

    // we want to return focus to this button after closing the keyboard shortcuts panel
    openKeyboardShortcutsPanel(() => { this.showKeyboardShortcutsButton.focus(); });
  }

  setShowKeyboardShortcutsButtonRef(ref) {
    this.showKeyboardShortcutsButton = ref;
  }

  setHideKeyboardShortcutsButtonRef(ref) {
    this.hideKeyboardShortcutsButton = ref;
  }

  handleFocus() {
    if (this.hideKeyboardShortcutsButton) {
      // automatically move focus into the dialog by moving
      // to the only interactive element, the hide button
      this.hideKeyboardShortcutsButton.focus();
    }
  }

  render() {
    const {
      block,
      buttonLocation,
      showKeyboardShortcutsPanel,
      closeKeyboardShortcutsPanel,
      styles,
      phrases,
      renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel,
    } = this.props;

    const toggleButtonText = showKeyboardShortcutsPanel
      ? phrases.hideKeyboardShortcutsPanel
      : phrases.showKeyboardShortcutsPanel;

    const bottomRight = buttonLocation === BOTTOM_RIGHT;
    const topRight = buttonLocation === TOP_RIGHT;
    const topLeft = buttonLocation === TOP_LEFT;

    return (
      <div>
        {renderKeyboardShortcutsButton
          && renderKeyboardShortcutsButton({
            // passing in context-specific props
            ref: this.setShowKeyboardShortcutsButtonRef,
            onClick: this.onShowKeyboardShortcutsButtonClick,
            ariaLabel: toggleButtonText,
          })}
        {renderKeyboardShortcutsButton || (
          <button
            ref={this.setShowKeyboardShortcutsButtonRef}
            {...css(
              styles.DayPickerKeyboardShortcuts_buttonReset,
              styles.DayPickerKeyboardShortcuts_show,
              bottomRight && styles.DayPickerKeyboardShortcuts_show__bottomRight,
              topRight && styles.DayPickerKeyboardShortcuts_show__topRight,
              topLeft && styles.DayPickerKeyboardShortcuts_show__topLeft,
            )}
            type="button"
            aria-label={toggleButtonText}
            onClick={this.onShowKeyboardShortcutsButtonClick}
            onMouseUp={(e) => {
              e.currentTarget.blur();
            }}
          >
            <span
              {...css(
                styles.DayPickerKeyboardShortcuts_showSpan,
                bottomRight && styles.DayPickerKeyboardShortcuts_showSpan__bottomRight,
                topRight && styles.DayPickerKeyboardShortcuts_showSpan__topRight,
                topLeft && styles.DayPickerKeyboardShortcuts_showSpan__topLeft,
              )}
            >
            ?
            </span>
          </button>
        )}
        {showKeyboardShortcutsPanel && (
          renderKeyboardShortcutsPanel ? (
            renderKeyboardShortcutsPanel({
              closeButtonAriaLabel: phrases.hideKeyboardShortcutsPanel,
              keyboardShortcuts: this.keyboardShortcuts,
              onCloseButtonClick: closeKeyboardShortcutsPanel,
              onKeyDown: this.onKeyDown,
              title: phrases.keyboardShortcuts,
            })
          ) : (
            <div
              {...css(styles.DayPickerKeyboardShortcuts_panel)}
              role="dialog"
              aria-labelledby="DayPickerKeyboardShortcuts_title"
              aria-describedby="DayPickerKeyboardShortcuts_description"
            >
              <div
                {...css(styles.DayPickerKeyboardShortcuts_title)}
                id="DayPickerKeyboardShortcuts_title"
              >
                {phrases.keyboardShortcuts}
              </div>

              <button
                ref={this.setHideKeyboardShortcutsButtonRef}
                {...css(
                  styles.DayPickerKeyboardShortcuts_buttonReset,
                  styles.DayPickerKeyboardShortcuts_close,
                )}
                type="button"
                tabIndex="0"
                aria-label={phrases.hideKeyboardShortcutsPanel}
                onClick={closeKeyboardShortcutsPanel}
                onKeyDown={this.onKeyDown}
              >
                <CloseButton {...css(styles.DayPickerKeyboardShortcuts_closeSvg)} />
              </button>

              <ul
                {...css(styles.DayPickerKeyboardShortcuts_list)}
                id="DayPickerKeyboardShortcuts_description"
              >
                {this.keyboardShortcuts.map(({ unicode, label, action }) => (
                  <KeyboardShortcutRow
                    key={label}
                    unicode={unicode}
                    label={label}
                    action={action}
                    block={block}
                  />
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    );
  }
}

DayPickerKeyboardShortcuts.propTypes = propTypes;
DayPickerKeyboardShortcuts.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color, font, zIndex } }) => ({
  DayPickerKeyboardShortcuts_buttonReset: {
    background: 'none',
    border: 0,
    borderRadius: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    padding: 0,
    cursor: 'pointer',
    fontSize: font.size,

    ':active': {
      outline: 'none',
    },
  },

  DayPickerKeyboardShortcuts_show: {
    width: 33,
    height: 26,
    position: 'absolute',
    zIndex: zIndex + 2,

    '::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
    },
  },

  DayPickerKeyboardShortcuts_show__bottomRight: {
    bottom: 0,
    right: 0,

    '::before': {
      borderTop: '26px solid transparent',
      borderRight: `33px solid ${color.core.primary}`,
      bottom: 0,
      right: 0,
    },

    ':hover::before': {
      borderRight: `33px solid ${color.core.primary_dark}`,
    },
  },

  DayPickerKeyboardShortcuts_show__topRight: {
    top: 0,
    right: 0,

    '::before': {
      borderBottom: '26px solid transparent',
      borderRight: `33px solid ${color.core.primary}`,
      top: 0,
      right: 0,
    },

    ':hover::before': {
      borderRight: `33px solid ${color.core.primary_dark}`,
    },
  },

  DayPickerKeyboardShortcuts_show__topLeft: {
    top: 0,
    left: 0,

    '::before': {
      borderBottom: '26px solid transparent',
      borderLeft: `33px solid ${color.core.primary}`,
      top: 0,
      left: 0,
    },

    ':hover::before': {
      borderLeft: `33px solid ${color.core.primary_dark}`,
    },
  },

  DayPickerKeyboardShortcuts_showSpan: {
    color: color.core.white,
    position: 'absolute',
  },

  DayPickerKeyboardShortcuts_showSpan__bottomRight: {
    bottom: 0,
    right: 5,
  },

  DayPickerKeyboardShortcuts_showSpan__topRight: {
    top: 1,
    right: 5,
  },

  DayPickerKeyboardShortcuts_showSpan__topLeft: {
    top: 1,
    left: 5,
  },

  DayPickerKeyboardShortcuts_panel: {
    overflow: 'auto',
    background: color.background,
    border: `1px solid ${color.core.border}`,
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: zIndex + 2,
    padding: 22,
    margin: 33,
    textAlign: 'left', // TODO: investigate use of text-align throughout the library
  },

  DayPickerKeyboardShortcuts_title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 0,
  },

  DayPickerKeyboardShortcuts_list: {
    listStyle: 'none',
    padding: 0,
    fontSize: font.size,
  },

  DayPickerKeyboardShortcuts_close: {
    position: 'absolute',
    right: 22,
    top: 22,
    zIndex: zIndex + 2,

    ':active': {
      outline: 'none',
    },
  },

  DayPickerKeyboardShortcuts_closeSvg: {
    height: 15,
    width: 15,
    fill: color.core.grayLighter,

    ':hover': {
      fill: color.core.grayLight,
    },

    ':focus': {
      fill: color.core.grayLight,
    },
  },
}), { pureComponent: typeof React.PureComponent !== 'undefined' })(DayPickerKeyboardShortcuts);
