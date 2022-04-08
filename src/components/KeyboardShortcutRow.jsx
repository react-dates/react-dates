import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { withStyles, withStylesPropTypes } from 'react-with-styles';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  unicode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  block: PropTypes.bool,
});

const defaultProps = {
  block: false,
};

function KeyboardShortcutRow({
  unicode,
  label,
  action,
  block,
  css,
  styles,
}) {
  return (
    <li
      {...css(
        styles.KeyboardShortcutRow,
        block && styles.KeyboardShortcutRow__block,
      )}
    >
      <div
        {...css(
          styles.KeyboardShortcutRow_keyContainer,
          block && styles.KeyboardShortcutRow_keyContainer__block,
        )}
      >
        <span
          {...css(styles.KeyboardShortcutRow_key)}
          role="img"
          aria-label={`${label},`} // add comma so screen readers will pause before reading action
        >
          {unicode}
        </span>
      </div>

      <div {...css(styles.KeyboardShortcutRow_action)}>
        {action}
      </div>
    </li>
  );
}

KeyboardShortcutRow.propTypes = propTypes;
KeyboardShortcutRow.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color } }) => ({
  KeyboardShortcutRow: {
    listStyle: 'none',
    margin: '6px 0',
  },

  KeyboardShortcutRow__block: {
    marginBottom: 16,
  },

  KeyboardShortcutRow_keyContainer: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    textAlign: 'right', // is not handled by isRTL
    marginRight: 6, // is not handled by isRTL
  },

  KeyboardShortcutRow_keyContainer__block: {
    textAlign: 'left', // is not handled by isRTL
    display: 'inline',
  },

  KeyboardShortcutRow_key: {
    fontFamily: 'monospace',
    fontSize: 12,
    textTransform: 'uppercase',
    background: color.core.grayLightest,
    padding: '2px 6px',
  },

  KeyboardShortcutRow_action: {
    display: 'inline',
    wordBreak: 'break-word',
    marginLeft: 8, // is not handled by isRTL
  },
}), { pureComponent: typeof React.PureComponent !== 'undefined' })(KeyboardShortcutRow);
